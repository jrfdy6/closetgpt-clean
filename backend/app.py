from fastapi import FastAPI, HTTPException, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any, Set, Tuple
from datetime import datetime
import uuid
import os
from openai import OpenAI
from dotenv import load_dotenv
import json
from pathlib import Path
import httpx
from src.types.outfit import UserProfile, WeatherData, OutfitContext, OutfitPiece
from src.types.wardrobe import ClothingItem
from src.utils.clip_embedding import embedder
from src.routes.image_processing import router as image_router
from src.config.firebase import db  # Import Firebase configuration
import logging
from enum import Enum
from PIL import Image
import io
import numpy as np
import colorsys
import time
import traceback
from src.utils.validation import validate_clothing_item, normalize_clothing_type, normalize_subtype

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get the absolute path to the backend directory
BACKEND_DIR = Path(__file__).resolve().parent
ENV_PATH = BACKEND_DIR / '.env'

# Load environment variables with explicit path
load_dotenv(dotenv_path=ENV_PATH)

# Get API key with better error handling
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError(f"No OpenAI API key found in environment variables. Please check {ENV_PATH}")

# Debug: Print the API key (first few characters)
logger.info(f"API Key loaded (first 10 chars): {api_key[:10]}...")
logger.info(f"Loading .env from: {ENV_PATH}")

# Weather API configuration
WEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not WEATHER_API_KEY:
    raise ValueError("No OpenWeather API key found in environment variables")

WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(image_router)

# Initialize OpenAI client with explicit API key
client = OpenAI(api_key=api_key)

class ImageAnalysisRequest(BaseModel):
    image: str

class WeatherRequest(BaseModel):
    location: str

class ClothingType(str, Enum):
    SHIRT = "shirt"
    PANTS = "pants"
    SKIRT = "skirt"
    DRESS = "dress"
    JACKET = "jacket"
    SWEATER = "sweater"
    SHOES = "shoes"
    ACCESSORY = "accessory"
    OTHER = "other"

class Color(BaseModel):
    name: str
    hex: str
    rgb: List[int]

class StyleTag(str, Enum):
    CASUAL = "Casual"
    FORMAL = "Formal"
    BUSINESS = "Business"
    SPORTS = "Sports"
    TRENDY = "Trendy"
    VINTAGE = "Vintage"
    STATEMENT = "Statement"
    SMART_CASUAL = "Smart Casual"

class Season(str, Enum):
    SPRING = "spring"
    SUMMER = "summer"
    FALL = "fall"
    WINTER = "winter"

class ClothingItem(BaseModel):
    id: Optional[str] = None
    name: str
    type: ClothingType
    subType: Optional[str] = None
    color: str
    colorName: Optional[str] = None
    season: List[Season]
    imageUrl: str
    tags: List[str] = Field(default_factory=list)
    style: List[str] = Field(default_factory=list)
    userId: str
    dominantColors: List[Color] = Field(default_factory=list)
    matchingColors: List[Color] = Field(default_factory=list)
    occasion: List[str] = Field(default_factory=list)
    brand: Optional[str] = None
    createdAt: int
    updatedAt: int
    metadata: Optional[Dict[str, Any]] = None

    @validator('subType', pre=True)
    def validate_subtype(cls, v):
        if v is None or v == "":
            return None
        # Remove special characters and normalize
        v = ''.join(c for c in str(v) if c.isalnum() or c.isspace() or c == '-')
        return v.strip()

    @validator('type', pre=True)
    def validate_type(cls, v):
        if isinstance(v, ClothingType):
            return v.value  # Return the string value of the enum
        if isinstance(v, str):
            if not v.strip():
                logger.warning("Empty type string, defaulting to OTHER")
                return ClothingType.OTHER.value
            try:
                # First try direct conversion to enum
                return ClothingType(v.lower()).value
            except ValueError:
                # If direct conversion fails, use normalize_item_type
                try:
                    normalized_type = normalize_item_type(v)
                    logger.info(f"Normalized type '{v}' to '{normalized_type}'")
                    return normalized_type.value
                except Exception as e:
                    logger.error(f"Error normalizing type '{v}': {str(e)}")
                    return ClothingType.OTHER.value
        if v is None:
            logger.warning("Type is None, defaulting to OTHER")
            return ClothingType.OTHER.value
        logger.error(f"Invalid type value: {v}")
        return ClothingType.OTHER.value

    @validator('style')
    def validate_style(cls, v):
        return [s for s in v if s in [t.value for t in StyleTag]]

    @validator('season')
    def validate_season(cls, v):
        return [s for s in v if s in [t.value for t in Season]]

class OutfitPiece(BaseModel):
    itemId: str
    name: str
    type: ClothingType
    reason: str

class GeneratedOutfit(BaseModel):
    id: str
    name: str
    description: str
    items: List[ClothingItem]
    occasion: str
    season: Season
    style: str
    styleTags: List[str]
    createdAt: int
    updatedAt: int

    @validator('items')
    def validate_items(cls, v):
        # Ensure no duplicate types
        types = set()
        for item in v:
            if item.type in types:
                raise ValueError(f"Duplicate item type found: {item.type}")
            types.add(item.type)
        return v

class FilteringResult(BaseModel):
    filtered_items: List[ClothingItem]
    filtered_out: Dict[str, int] = Field(default_factory=dict)
    warnings: List[str] = Field(default_factory=list)

# Constants for filtering and fallback
MINIMUM_ITEMS = 6
REQUIRED_ITEM_TYPES = {
    "top": {ClothingType.SHIRT, ClothingType.SWEATER},
    "bottom": {ClothingType.PANTS, ClothingType.SKIRT},
    "outerwear": {ClothingType.JACKET},
    "footwear": {ClothingType.SHOES}
}

def analyze_wardrobe_gaps(wardrobe: List[ClothingItem]) -> Dict[str, List[str]]:
    """Analyze wardrobe for missing essential item types and provide suggestions."""
    gaps = {
        "missing_types": [],
        "suggestions": [],
        "type_counts": {type_: 0 for type_ in ClothingType}
    }
    
    # Count items by type
    for item in wardrobe:
        gaps["type_counts"][item.type] += 1
    
    # Check for missing essential types
    if not any(gaps["type_counts"][t] for t in REQUIRED_ITEM_TYPES["top"]):
        gaps["missing_types"].append("tops")
        gaps["suggestions"].append("Add some shirts or sweaters for layering")
    
    if not any(gaps["type_counts"][t] for t in REQUIRED_ITEM_TYPES["bottom"]):
        gaps["missing_types"].append("bottoms")
        gaps["suggestions"].append("Add some pants or skirts for complete outfits")
    
    if not any(gaps["type_counts"][t] for t in REQUIRED_ITEM_TYPES["outerwear"]):
        gaps["missing_types"].append("outerwear")
        gaps["suggestions"].append("Consider adding a jacket for layering")
    
    if not any(gaps["type_counts"][t] for t in REQUIRED_ITEM_TYPES["footwear"]):
        gaps["missing_types"].append("footwear")
        gaps["suggestions"].append("Add some shoes to complete your outfits")
    
    return gaps

def get_fallback_strategy(
    wardrobe: List[ClothingItem],
    season: Season,
    style_preferences: List[str],
    filtering_result: FilteringResult
) -> Tuple[List[ClothingItem], str, Dict[str, Any]]:
    """Determine the best fallback strategy based on wardrobe analysis."""
    gaps = analyze_wardrobe_gaps(wardrobe)
    strategy = {
        "name": "standard",
        "reason": "",
        "relaxed_constraints": [],
        "gaps": gaps
    }
    
    # If we have very few items, use the most versatile ones
    if len(filtering_result.filtered_items) < 3:
        strategy["name"] = "versatile_items"
        strategy["reason"] = "Using most versatile items due to limited wardrobe"
        # Score items by versatility (number of seasons, style tags, etc.)
        scored_items = [(item, score_item_versatility(item)) for item in wardrobe]
        scored_items.sort(key=lambda x: x[1], reverse=True)
        return [item for item, _ in scored_items[:MINIMUM_ITEMS]], strategy["name"], strategy
    
    # If we're missing essential types, relax type constraints
    if gaps["missing_types"]:
        strategy["name"] = "relaxed_types"
        strategy["reason"] = f"Relaxing type constraints due to missing {', '.join(gaps['missing_types'])}"
        strategy["relaxed_constraints"].append("type")
        # Include items that might not perfectly match type requirements
        return [item for item in wardrobe if score_item(item, season, style_preferences) > 0], strategy["name"], strategy
    
    # If we have enough items but they don't match season/style, relax those constraints
    if filtering_result.filtered_out["season_mismatch"] > 0 or filtering_result.filtered_out["style_mismatch"] > 0:
        strategy["name"] = "relaxed_season_style"
        strategy["reason"] = "Relaxing season and style constraints to create a practical outfit"
        strategy["relaxed_constraints"].extend(["season", "style"])
        # Include items from adjacent seasons and similar styles
        return [item for item in wardrobe if score_item(item, season, style_preferences) >= 1], strategy["name"], strategy
    
    return filtering_result.filtered_items, strategy["name"], strategy

def score_item_versatility(item: ClothingItem) -> int:
    """Score an item based on its versatility across seasons and styles."""
    score = 0
    # More seasons = more versatile
    score += len(item.season) * 2
    # More style tags = more versatile
    score += len(item.style)
    # Common base types are more versatile
    if item.type in COMMON_BASE_TYPES:
        score += 3
    # Neutral colors are more versatile
    if item.color.lower() in {"black", "white", "gray", "navy", "beige"}:
        score += 2
    return score

# Style tag mapping for normalization
STYLE_TAG_MAPPING = {
    # Business variations
    'Business Casual': 'Smart Casual',
    'Business-Casual': 'Smart Casual',
    'Smart-Casual': 'Smart Casual',
    'Smart Casual': 'Smart Casual',
    
    # Sports variations
    'Sporty': 'Sports',
    'Athletic': 'Sports',
    'Active': 'Sports',
    
    # Casual variations
    'Basic': 'Casual',
    'Everyday': 'Casual',
    'Utility': 'Casual',
    'Western': 'Casual',
    'Streetwear': 'Casual',
    'Urban': 'Trendy',
    
    # Formal variations
    'Luxury': 'Formal',
    'Luxe': 'Formal',
    'Elegant': 'Formal',
    
    # Statement variations
    'Edgy': 'Statement',
    'Bold': 'Statement',
    'Dramatic': 'Statement',
    
    # Vintage variations
    'Retro': 'Vintage',
    'Classic': 'Vintage',
    'Heritage': 'Vintage',
    
    # Trendy variations
    'Modern': 'Trendy',
    'Contemporary': 'Trendy',
    'Fashion-forward': 'Trendy'
}

def normalize_style_tags(styles: List[str]) -> List[str]:
    """Normalize style tags to valid enum values."""
    valid_styles = [s.value for s in StyleTag]
    normalized_styles = []
    
    for style in styles:
        # Map to valid style if in mapping
        if style in STYLE_TAG_MAPPING:
            style = STYLE_TAG_MAPPING[style]
        # Only add if it's a valid style
        if style in valid_styles:
            normalized_styles.append(style)
        else:
            logger.warning(f"Invalid style tag: {style}. Must be one of {valid_styles}")
            # Default to Casual for unknown styles
            normalized_styles.append('Casual')
    
    return normalized_styles

def filter_items_by_season_style(
    wardrobe: List[ClothingItem], 
    season: Season, 
    style_preferences: List[str]
) -> FilteringResult:
    """Filter wardrobe items based on season and style preferences with enhanced fallback strategies."""
    if not wardrobe:
        logger.warning("Empty wardrobe provided")
        return FilteringResult(
            filtered_items=[],
            filtered_out={"season_mismatch": 0, "style_mismatch": 0, "invalid_style_tags": 0},
            warnings=["No items in wardrobe"]
        )

    result = FilteringResult(filtered_items=[])
    season_mismatch = 0
    style_mismatch = 0
    invalid_style_tags = 0

    # Normalize style preferences
    normalized_style_prefs = normalize_style_tags(style_preferences)
    
    # First pass: Filter by season
    season_filtered = []
    for item in wardrobe:
        item_seasons = [s.value if isinstance(s, Season) else s for s in item.season]
        if season.value in item_seasons:
            season_filtered.append(item)
        else:
            season_mismatch += 1

    # If we have too few items after season filtering, include adjacent seasons
    if len(season_filtered) < MINIMUM_ITEMS:
        adjacent_seasons = {
            Season.SPRING: [Season.SUMMER, Season.FALL],
            Season.SUMMER: [Season.SPRING, Season.FALL],
            Season.FALL: [Season.SUMMER, Season.WINTER],
            Season.WINTER: [Season.FALL, Season.SPRING]
        }
        
        for item in wardrobe:
            if item not in season_filtered:
                item_seasons = [s.value if isinstance(s, Season) else s for s in item.season]
                if any(adj.value in item_seasons for adj in adjacent_seasons[season]):
                    season_filtered.append(item)
                    result.warnings.append(f"Included {item.name} from adjacent season")

    # Second pass: Filter by style if we have enough items
    if len(season_filtered) >= MINIMUM_ITEMS and normalized_style_prefs:
        for item in season_filtered:
            item_styles = normalize_style_tags(item.style)
            if any(tag in item_styles for tag in normalized_style_prefs):
                result.filtered_items.append(item)
            else:
                style_mismatch += 1
    else:
        # If we have too few items or no style preferences, use fallback strategy
        if len(season_filtered) < MINIMUM_ITEMS:
            result.filtered_items, strategy_name, strategy_info = get_fallback_strategy(
                wardrobe, season, normalized_style_prefs, result
            )
            result.warnings.append(strategy_info["reason"])
            if strategy_info["gaps"]["suggestions"]:
                result.warnings.extend(strategy_info["gaps"]["suggestions"])
        else:
            result.filtered_items = season_filtered
            if not normalized_style_prefs:
                result.warnings.append("No style preferences specified, using all season-appropriate items")

    # Update filtering statistics
    result.filtered_out = {
        "season_mismatch": season_mismatch,
        "style_mismatch": style_mismatch,
        "invalid_style_tags": invalid_style_tags
    }

    return result

def normalize_item_type(item_type: str, sub_type: Optional[str] = None) -> ClothingType:
    """
    Normalize item type to match ClothingType enum values.
    Returns the normalized ClothingType.
    """
    try:
        # Handle None values
        if item_type is None:
            return ClothingType.OTHER
            
        # If we have a subType, use that for normalization
        if sub_type:
            item_type = sub_type
            
        # Convert to lowercase and remove special characters
        item_type = ''.join(c for c in str(item_type).lower() if c.isalnum() or c.isspace() or c == '-')
        item_type = item_type.strip()
        
        if not item_type:
            return ClothingType.OTHER
        
        # Split on hyphens and spaces to handle compound types
        type_parts = [part.strip() for part in item_type.replace('-', ' ').split()]
        
        # Direct mapping for common types
        type_mapping = {
            "shirt": ClothingType.SHIRT,
            "pants": ClothingType.PANTS,
            "skirt": ClothingType.SKIRT,
            "dress": ClothingType.DRESS,
            "jacket": ClothingType.JACKET,
            "sweater": ClothingType.SWEATER,
            "shoes": ClothingType.SHOES,
            "accessory": ClothingType.ACCESSORY,
            "other": ClothingType.OTHER
        }
        
        # Try direct mapping first
        if item_type in type_mapping:
            return type_mapping[item_type]
            
        # Check each part of the compound type
        for part in type_parts:
            if part in type_mapping:
                return type_mapping[part]
            
        # Handle special cases and variations
        if any(word in item_type for word in ["shirt", "top", "blouse", "t-shirt", "tshirt", "tee"]):
            return ClothingType.SHIRT
        elif any(word in item_type for word in ["pants", "trousers", "jeans", "slacks", "shorts"]):
            return ClothingType.PANTS
        elif any(word in item_type for word in ["skirt", "mini", "maxi"]):
            return ClothingType.SKIRT
        elif any(word in item_type for word in ["dress", "gown"]):
            return ClothingType.DRESS
        elif any(word in item_type for word in ["jacket", "coat", "blazer"]):
            return ClothingType.JACKET
        elif any(word in item_type for word in ["sweater", "sweatshirt", "hoodie", "jumper"]):
            return ClothingType.SWEATER
        elif any(word in item_type for word in ["shoes", "boots", "sneakers", "sandals", "heels", "footwear", "sneaker"]):
            return ClothingType.SHOES
        elif any(word in item_type for word in ["accessory", "bag", "hat", "scarf", "jewelry", "watch"]):
            return ClothingType.ACCESSORY
            
        # If we can't determine the type, log it and return OTHER
        logger.warning(f"Could not determine type for: {item_type}")
        return ClothingType.OTHER
        
    except Exception as e:
        logger.error(f"Error normalizing item type '{item_type}': {str(e)}")
        return ClothingType.OTHER

def analyze_color_harmony(colors1: List[Color], colors2: List[Color]) -> float:
    """Analyze color harmony between two sets of colors using color theory principles."""
    if not colors1 or not colors2:
        return 0.0
    
    harmony_scores = []
    for c1 in colors1:
        for c2 in colors2:
            # Convert hex to RGB
            rgb1 = c1.rgb
            rgb2 = c2.rgb
            
            # Calculate color harmony based on:
            # 1. Complementary colors (opposite on color wheel)
            # 2. Analogous colors (adjacent on color wheel)
            # 3. Triadic colors (equally spaced on color wheel)
            # 4. Split-complementary colors
            # 5. Monochromatic colors (same hue, different saturation/brightness)
            
            # Convert RGB to HSV for better color analysis
            hsv1 = colorsys.rgb_to_hsv(rgb1[0]/255, rgb1[1]/255, rgb1[2]/255)
            hsv2 = colorsys.rgb_to_hsv(rgb2[0]/255, rgb2[1]/255, rgb2[2]/255)
            
            # Calculate hue difference (0-1)
            hue_diff = abs(hsv1[0] - hsv2[0])
            
            # Calculate saturation and value differences
            sat_diff = abs(hsv1[1] - hsv2[1])
            val_diff = abs(hsv1[2] - hsv2[2])
            
            # Score based on color harmony rules
            score = 0.0
            
            # Complementary colors (hue difference ≈ 0.5)
            if 0.45 <= hue_diff <= 0.55:
                score += 0.8
            # Analogous colors (hue difference < 0.1)
            elif hue_diff < 0.1:
                score += 0.7
            # Triadic colors (hue difference ≈ 0.33 or 0.67)
            elif (0.3 <= hue_diff <= 0.36) or (0.64 <= hue_diff <= 0.7):
                score += 0.6
            # Split-complementary (hue difference ≈ 0.4 or 0.6)
            elif (0.38 <= hue_diff <= 0.42) or (0.58 <= hue_diff <= 0.62):
                score += 0.5
            
            # Penalize large saturation/value differences
            score -= (sat_diff + val_diff) * 0.2
            
            harmony_scores.append(max(0.0, min(1.0, score)))
    
    return max(harmony_scores) if harmony_scores else 0.0

def get_visual_style_attributes(item: ClothingItem) -> Dict[str, Any]:
    """Extract visual style attributes from an item's metadata."""
    if not item.metadata:
        return {}
    
    visual_attrs = item.metadata.visualAttributes if item.metadata.visualAttributes else {}
    return {
        'material': visual_attrs.material if visual_attrs and visual_attrs.material else 'unknown',
        'pattern': visual_attrs.pattern if visual_attrs and visual_attrs.pattern else 'solid',
        'texture': visual_attrs.textureStyle if visual_attrs and visual_attrs.textureStyle else 'smooth',
        'fit': visual_attrs.fit if visual_attrs and visual_attrs.fit else 'regular',
        'silhouette': visual_attrs.silhouette if visual_attrs and visual_attrs.silhouette else 'standard',
        'formal_level': visual_attrs.formalLevel if visual_attrs and visual_attrs.formalLevel else 'casual',
        'wear_layer': visual_attrs.wearLayer if visual_attrs and visual_attrs.wearLayer else 'base'
    }

def build_outfit_prompt(context: OutfitContext) -> str:
    """Build a prompt for outfit generation with enhanced visual analysis."""
    # Format wardrobe items with essential data including CLIP embeddings
    wardrobe_items = []
    for item in context.wardrobe:
        # Get visual style attributes
        visual_attrs = get_visual_style_attributes(item)
        
        # Get color harmony information (simplified)
        color_harmony = {}
        if item.dominantColors:
            for other_item in context.wardrobe:
                if other_item.id != item.id and other_item.dominantColors:
                    harmony_score = analyze_color_harmony(item.dominantColors, other_item.dominantColors)
                    if harmony_score > 0.7:  # Only include strong color harmonies
                        color_harmony[other_item.id] = harmony_score
        
        item_data = {
            "id": item.id,
            "name": item.name,
            "type": item.type,
            "subType": item.subType,
            "seasons": item.season,
            "colors": [{"name": c.name, "hex": c.hex} for c in item.dominantColors] if item.dominantColors else [],
            "style": item.style,
            "formal_level": visual_attrs.get('formal_level'),
            "wear_layer": visual_attrs.get('wear_layer'),
            "embedding": item.embedding if item.embedding else None,
            "color_harmony": color_harmony
        }
        wardrobe_items.append(item_data)

    # Build the prompt
    prompt = f"""Create an outfit based on:

User Profile:
- Style: {', '.join(context.user_profile.preferences.get('style', [])) if context.user_profile.preferences else 'None'}
- Body Type: {context.user_profile.bodyType}
- Colors: {', '.join(context.user_profile.preferences.get('colors', [])) if context.user_profile.preferences else 'None'}

Occasion: {context.occasion}
Weather: {context.weather.condition}, {context.weather.temperature}°C

Available Items:
{json.dumps(wardrobe_items, indent=2)}

Requirements:
1. Select items for occasion and weather
2. Match user's style and body type
3. Use CLIP embeddings for visual harmony
4. Ensure color harmony
5. Create cohesive look
6. Consider formal level and layering

Return JSON:
{{
    "name": "Outfit name",
    "explanation": "Brief explanation",
    "styleTags": ["tag1", "tag2"],
    "pieces": [
        {{
            "itemId": "id",
            "name": "name",
            "type": "type",
            "reason": "Why chosen",
            "visualHarmony": {{
                "withItemId": "reason"
            }}
        }}
    ]
}}"""

    return prompt

@app.post("/api/analyze-image")
async def analyze_image(request: ImageAnalysisRequest):
    """Analyze a clothing item image using OpenAI's vision model."""
    try:
        if not request.image:
            raise HTTPException(status_code=400, detail="No image provided")

        print(f"Analyzing image: {request.image}")

        try:
            # Call OpenAI API to analyze the image
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": """Analyze this clothing item and provide the following information in JSON format:
{
    "type": "One of: shirt, pants, dress, skirt, jacket, sweater, shoes, accessory, other",
    "subType": "More specific type (e.g., 't-shirt', 'jeans', 'sundress')",
    "dominantColors": [
        {
            "name": "Color name",
            "hex": "Hex color code",
            "rgb": [R, G, B]
        }
    ],
    "matchingColors": [
        {
            "name": "Color name",
            "hex": "Hex color code",
            "rgb": [R, G, B]
        }
    ],
    "style": ["Array of style tags like: Casual, Formal, Sporty, etc."],
    "brand": "Brand name if visible (optional)",
    "season": ["Array of applicable seasons: spring, summer, fall, winter"],
    "occasion": ["Array of occasions like: Casual, Formal, Business, etc."],
    "metadata": {
        "basicMetadata": {
            "width": "Image width in pixels",
            "height": "Image height in pixels",
            "orientation": "EXIF orientation tag",
            "dateTaken": "When the image was captured",
            "deviceModel": "Camera/device model",
            "gps": "Latitude & longitude if available",
            "flashUsed": "Whether flash was on"
        },
        "visualAttributes": {
            "material": "Cotton, denim, leather, etc.",
            "pattern": "Solid, striped, polka dots, etc.",
            "textureStyle": "Smooth, ribbed, fuzzy, etc.",
            "fabricWeight": "Light, medium, heavy",
            "fit": "Loose, slim, oversized",
            "silhouette": "A-line, boxy, tapered",
            "length": "Cropped, mid-length, maxi",
            "genderTarget": "Men's, women's, unisex",
            "sleeveLength": "Sleeveless, short, long",
            "hangerPresent": "Boolean indicating if hanger is visible",
            "backgroundRemoved": "Boolean indicating if background is removed",
            "wearLayer": "Inner, outer, base",
            "formalLevel": "Casual, semi-formal, formal"
        },
        "itemMetadata": {
            "priceEstimate": "Estimated price range",
            "careInstructions": "Wash cold, dry clean, etc.",
            "tags": ["Any additional user-defined metadata"]
        }
    }
}

IMPORTANT: All fields must be present in the response, even if empty. For example:
- dominantColors must be an array (can be empty)
- matchingColors must be an array (can be empty)
- style must be an array (can be empty)
- season must be an array (can be empty)
- occasion must be an array (can be empty)
- metadata fields should be null if information is not available

Please ensure the response is valid JSON with all fields present."""
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": request.image
                                }
                            }
                        ]
                    }
                ],
                max_tokens=1000
            )

            # Parse the response
            try:
                content = response.choices[0].message.content
                print(f"Raw response content: {content}")
                
                # Strip markdown formatting if present
                if content.startswith("```json"):
                    content = content[7:]  # Remove ```json
                if content.endswith("```"):
                    content = content[:-3]  # Remove ```
                content = content.strip()  # Remove any extra whitespace
                
                print(f"Cleaned content: {content}")
                analysis = json.loads(content)
                
                # Transform the response into the expected format
                transformed_analysis = {
                    "type": analysis.get("type", "other"),
                    "subType": analysis.get("subType", "Unnamed Item"),
                    "dominantColors": analysis.get("dominantColors", []),
                    "matchingColors": analysis.get("matchingColors", []),
                    "style": analysis.get("style", []),
                    "brand": analysis.get("brand", ""),
                    "season": analysis.get("season", []),
                    "occasion": analysis.get("occasion", []),
                    "metadata": analysis.get("metadata", {}),
                    "color": analysis.get("dominantColors", [{}])[0].get("name", "Unknown") if analysis.get("dominantColors") else "Unknown",
                    "colorName": analysis.get("dominantColors", [{}])[0].get("name", "Unknown") if analysis.get("dominantColors") else "Unknown"
                }
                
                print(f"Transformed analysis: {transformed_analysis}")
                return transformed_analysis
            except json.JSONDecodeError as e:
                print(f"JSON parsing error: {str(e)}")
                print(f"Failed to parse content: {content}")
                raise HTTPException(status_code=500, detail=f"Failed to parse OpenAI response: {str(e)}")
            except Exception as e:
                print(f"Unexpected error during parsing: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Failed to parse OpenAI response: {str(e)}")

        except Exception as e:
            print(f"OpenAI API error: {str(e)}")
            if hasattr(e, 'response'):
                print(f"OpenAI API response: {e.response}")
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

    except Exception as e:
        print(f"Error during image analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/weather", response_model=WeatherData)
async def get_weather(request: WeatherRequest):
    """Get current weather data for a location."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                WEATHER_API_BASE_URL,
                params={
                    "q": request.location,
                    "appid": WEATHER_API_KEY,
                    "units": "metric"  # Use metric units
                }
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch weather data"
                )
            
            data = response.json()
            
            return WeatherData(
                temperature=data["main"]["temp"],
                condition=data["weather"][0]["main"],
                humidity=data["main"]["humidity"],
                wind_speed=data["wind"]["speed"],
                location=request.location,
                precipitation=data.get("rain", {}).get("1h", 0)  # Get precipitation from rain data if available
            )
            
    except Exception as e:
        logger.error(f"Error fetching weather data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/outfit/generate")
async def generate_outfit(request: Request) -> GeneratedOutfit:
    try:
        data = await request.json()
        logger.info("Received outfit generation request")
        logger.info(f"Request data: {json.dumps(data, indent=2)}")
        
        wardrobe = data.get("wardrobe", [])
        weather = data.get("weather", {})
        occasion = data.get("occasion", "")
        user_profile = data.get("userProfile", {})

        if not wardrobe or not weather or not occasion or not user_profile:
            logger.error("Missing required data in request")
            logger.error(f"Wardrobe: {bool(wardrobe)}, Weather: {bool(weather)}, Occasion: {bool(occasion)}, User Profile: {bool(user_profile)}")
            raise HTTPException(status_code=400, detail="Missing required data")

        # Validate and normalize wardrobe items
        validated_items = []
        for item in wardrobe:
            try:
                # Create a copy of the item to modify
                item_data = item.copy()
                logger.info(f"Processing item: {item_data.get('name')}")
                logger.info(f"Original type: {item_data.get('type')}")
                logger.info(f"SubType: {item_data.get('subType')}")
                
                # Normalize the type using both type and subType
                item_data["type"] = normalize_item_type(
                    item_data.get("type", ""),
                    item_data.get("subType")
                )
                
                logger.info(f"Normalized type: {item_data['type']}")
                validated_items.append(item_data)
                
            except Exception as e:
                logger.error(f"Error processing item {item.get('name', 'unknown')}: {str(e)}")
                logger.error(f"Item data: {json.dumps(item, indent=2)}")
                continue

        if not validated_items:
            logger.error("No valid items after validation")
            raise HTTPException(status_code=400, detail="No valid items in wardrobe")

        # Log validated items
        logger.info(f"Validated items: {json.dumps([{'name': item['name'], 'type': item['type']} for item in validated_items], indent=2)}")

        # Get season from weather
        season = get_season_from_weather(WeatherData(**weather))

        # Build context for GPT
        context = OutfitContext(
            wardrobe=validated_items,
            weather=WeatherData(**weather),
            occasion=occasion,
            user_profile=user_profile,
            season=season
        )

        # Generate outfit using GPT
        prompt = build_outfit_prompt(context)
        try:
            # Create the completion request
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            
            # Get the response content
            if not completion.choices or not completion.choices[0].message:
                raise Exception("No response from OpenAI API")
                
            content = completion.choices[0].message.content
            logger.info(f"Received response from OpenAI: {content[:200]}...")  # Log first 200 chars
            
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            logger.error(f"Error traceback: {traceback.format_exc()}")
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

        # Parse GPT response
        try:
            outfit_data = json.loads(content)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse GPT response as JSON: {str(e)}")
            logger.error(f"Raw response: {content}")
            raise HTTPException(status_code=500, detail="Failed to generate outfit")

        # Match selected items with wardrobe items
        selected_items = []
        for piece in outfit_data["pieces"]:
            matching_item = next(
                (item for item in validated_items if item["id"] == piece["itemId"]),
                None
            )
            if matching_item:
                selected_items.append(matching_item)

        if not selected_items:
            raise HTTPException(status_code=500, detail="No matching items found")

        # Create generated outfit
        outfit = GeneratedOutfit(
            id=str(uuid.uuid4()),
            name=outfit_data["name"],
            description=outfit_data["explanation"],
            items=selected_items,
            occasion=occasion,
            season=season,
            style=outfit_data.get("styleTags", ["Casual"])[0],
            styleTags=outfit_data.get("styleTags", ["Casual"]),
            createdAt=int(time.time() * 1000),
            updatedAt=int(time.time() * 1000)
        )

        return outfit
        
    except Exception as e:
        logger.error(f"Error generating outfit: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        logger.error(f"Error traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

def get_season_from_weather(weather: WeatherData) -> Season:
    """Determine the season based on weather data."""
    # Get the current month
    current_month = datetime.now().month
    
    # Determine season based on month
    if current_month in [12, 1, 2]:
        return Season.WINTER
    elif current_month in [3, 4, 5]:
        return Season.SPRING
    elif current_month in [6, 7, 8]:
        return Season.SUMMER
    else:  # 9, 10, 11
        return Season.FALL

@app.post("/api/test/ingestion")
async def test_ingestion():
    """Test endpoint to verify the ingestion phase and data storage."""
    try:
        # Create a test clothing item with all possible metadata
        test_item = {
            "id": str(uuid.uuid4()),
            "name": "Test Item",
            "type": "shirt",
            "subType": "t-shirt",
            "color": "blue",
            "colorName": "navy blue",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/test.jpg",
            "tags": ["casual", "basic"],
            "style": ["Casual", "Basic"],
            "userId": "test_user",
            "dominantColors": [
                {
                    "name": "navy blue",
                    "hex": "#000080",
                    "rgb": [0, 0, 128]
                }
            ],
            "matchingColors": [
                {
                    "name": "white",
                    "hex": "#FFFFFF",
                    "rgb": [255, 255, 255]
                }
            ],
            "occasion": ["Casual", "Everyday"],
            "brand": "Test Brand",
            "createdAt": int(datetime.now().timestamp()),
            "updatedAt": int(datetime.now().timestamp()),
            "metadata": {
                "basicMetadata": {
                    "width": 800,
                    "height": 600,
                    "orientation": "portrait",
                    "dateTaken": "2024-03-20T10:00:00Z",
                    "deviceModel": "iPhone 14",
                    "gps": {
                        "latitude": 37.7749,
                        "longitude": -122.4194
                    },
                    "flashUsed": False
                },
                "visualAttributes": {
                    "material": "cotton",
                    "pattern": "solid",
                    "textureStyle": "smooth",
                    "fabricWeight": "light",
                    "fit": "regular",
                    "silhouette": "relaxed",
                    "length": "regular",
                    "genderTarget": "unisex",
                    "sleeveLength": "short",
                    "hangerPresent": False,
                    "backgroundRemoved": True,
                    "wearLayer": "base",
                    "formalLevel": "casual"
                },
                "itemMetadata": {
                    "priceEstimate": "$20-30",
                    "careInstructions": "Machine wash cold, tumble dry low",
                    "tags": ["cotton", "basic", "everyday"]
                }
            }
        }

        # Validate the test item against our schema
        try:
            validated_item = ClothingItem(**test_item)
            logger.info("Test item validation successful")
        except Exception as e:
            logger.error(f"Validation error: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Validation error: {str(e)}")

        # Log the test item structure
        logger.info("Test item structure:")
        logger.info(json.dumps(test_item, indent=2))

        # Return the test item for verification
        return {
            "success": True,
            "message": "Test item created and validated successfully",
            "item": test_item,
            "validation": {
                "schema": "ClothingItem",
                "status": "valid",
                "fields": {
                    "required": ["id", "name", "type", "color", "season", "imageUrl", "userId", "createdAt", "updatedAt"],
                    "optional": ["subType", "brand", "colorName", "metadata"],
                    "arrays": ["tags", "style", "dominantColors", "matchingColors", "occasion"],
                    "metadata": {
                        "basicMetadata": ["width", "height", "orientation", "dateTaken", "deviceModel", "gps", "flashUsed"],
                        "visualAttributes": ["material", "pattern", "textureStyle", "fabricWeight", "fit", "silhouette", "length", "genderTarget", "sleeveLength", "hangerPresent", "backgroundRemoved", "wearLayer", "formalLevel"],
                        "itemMetadata": ["priceEstimate", "careInstructions", "tags"]
                    }
                }
            }
        }

    except Exception as e:
        logger.error(f"Error in test ingestion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

class EmbeddingRequest(BaseModel):
    item_id: str

@app.post("/api/embed")
async def generate_embedding(
    item_id: str,
    image: UploadFile = File(...)
):
    """
    Generate a CLIP embedding for a clothing item image and update the item in the database
    """
    try:
        # Read and validate the image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        
        # Generate embedding
        embedding = embedder.get_embedding(img)
        if not embedding:
            raise HTTPException(status_code=500, detail="Failed to generate embedding")
            
        # Get the item from the database
        item_ref = db.collection('clothing_items').document(item_id)
        item = item_ref.get()
        
        if not item.exists:
            raise HTTPException(status_code=404, detail="Item not found")
            
        # Update the item with the embedding
        item_ref.update({
            'embedding': embedding,
            'updatedAt': int(datetime.now().timestamp())
        })
        
        return {"success": True, "message": "Embedding generated and stored successfully"}
        
    except Exception as e:
        logger.error(f"Error in generate_embedding: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Wardrobe routes
@app.get("/api/wardrobe")
async def get_wardrobe(user_id: str):
    try:
        docs = db.collection("wardrobe").where("userId", "==", user_id).stream()
        items = []
        for doc in docs:
            item_data = doc.to_dict()
            validated_item = validate_clothing_item(item_data)
            items.append(validated_item.dict())
        return items
    except Exception as e:
        logger.error(f"Error getting wardrobe: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/wardrobe")
async def add_clothing_item(item: dict):
    try:
        # Validate and normalize the item
        validated_item = validate_clothing_item(item)
        
        # Log the normalization results
        logger.info(f"Original type: {item.get('type')}")
        logger.info(f"Original subType: {item.get('subType')}")
        logger.info(f"Normalized type: {validated_item.type}")
        logger.info(f"Normalized subType: {validated_item.subType}")
        
        # Add to database
        item_id = str(uuid.uuid4())
        validated_item.id = item_id
        validated_item.createdAt = int(time.time())
        validated_item.updatedAt = int(time.time())
        
        # Store in database
        db.collection("wardrobe").document(item_id).set(validated_item.dict())
        
        return validated_item.dict()
    except Exception as e:
        logger.error(f"Error adding clothing item: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/wardrobe/{item_id}")
async def get_clothing_item(item_id: str):
    try:
        doc = db.collection("wardrobe").document(item_id).get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Item not found")
        
        item_data = doc.to_dict()
        validated_item = validate_clothing_item(item_data)
        return validated_item.dict()
    except Exception as e:
        logger.error(f"Error getting clothing item: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/api/wardrobe/{item_id}")
async def update_clothing_item(item_id: str, item: dict):
    try:
        # Validate and normalize the item
        validated_item = validate_clothing_item(item)
        
        # Log the normalization results
        logger.info(f"Original type: {item.get('type')}")
        logger.info(f"Original subType: {item.get('subType')}")
        logger.info(f"Normalized type: {validated_item.type}")
        logger.info(f"Normalized subType: {validated_item.subType}")
        
        # Update timestamps
        validated_item.updatedAt = int(time.time())
        
        # Update in database
        db.collection("wardrobe").document(item_id).update(validated_item.dict(exclude_unset=True))
        
        return validated_item.dict()
    except Exception as e:
        logger.error(f"Error updating clothing item: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/wardrobe/{item_id}")
async def delete_clothing_item(item_id: str):
    try:
        db.collection("wardrobe").document(item_id).delete()
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Error deleting clothing item: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# User profile routes
@app.get("/api/user/profile")
async def get_user_profile():
    """Get the user's profile."""
    try:
        # Get the user ID from the request
        # TODO: Implement user authentication
        user_id = "test_user"
        
        # Get user profile from Firebase
        profile_ref = db.reference(f'users/{user_id}/profile')
        profile_data = profile_ref.get()
        
        if not profile_data:
            raise HTTPException(status_code=404, detail="User profile not found")
            
        return profile_data
    except Exception as e:
        logger.error(f"Error fetching user profile: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Outfit routes
@app.get("/api/outfits")
async def get_outfits():
    """Get all outfits."""
    try:
        # Get the user ID from the request
        # TODO: Implement user authentication
        user_id = "test_user"
        
        # Get outfits from Firebase
        outfits_ref = db.reference(f'outfits/{user_id}')
        outfits_data = outfits_ref.get()
        
        if not outfits_data:
            return []
            
        # Convert the data to GeneratedOutfit objects
        outfits = []
        for outfit_id, outfit_data in outfits_data.items():
            outfit_data['id'] = outfit_id
            try:
                outfits.append(GeneratedOutfit(**outfit_data))
            except Exception as e:
                logger.error(f"Error parsing outfit {outfit_id}: {str(e)}")
                continue
                
        return outfits
    except Exception as e:
        logger.error(f"Error fetching outfits: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/outfits")
async def create_outfit(outfit: GeneratedOutfit):
    """Create a new outfit."""
    try:
        # Get the user ID from the request
        # TODO: Implement user authentication
        user_id = "test_user"
        
        # Add the outfit to Firebase
        outfits_ref = db.reference(f'outfits/{user_id}')
        outfit_data = outfit.dict()
        new_outfit_ref = outfits_ref.push(outfit_data)
        
        # Get the created outfit
        created_outfit = outfits_ref.child(new_outfit_ref.key).get()
        created_outfit['id'] = new_outfit_ref.key
        
        return GeneratedOutfit(**created_outfit)
    except Exception as e:
        logger.error(f"Error creating outfit: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/test/validate-wardrobe")
async def test_validate_wardrobe():
    """Test endpoint to verify wardrobe item validation with edge cases."""
    test_cases = [
        # Original test cases
        {
            "name": "Blue Shirt",
            "type": "shirt",
            "subType": "t-shirt",
            "color": "blue",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/shirt.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Running Shoes",
            "type": "shoes-sneakers",
            "subType": "sneakers",
            "color": "black",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/shoes.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Denim Jacket",
            "type": "JACKET",
            "subType": "denim",
            "color": "blue",
            "season": ["fall", "winter"],
            "imageUrl": "https://example.com/jacket.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Leather Boots",
            "type": "invalid",
            "subType": "boots",
            "color": "brown",
            "season": ["fall", "winter"],
            "imageUrl": "https://example.com/boots.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Mystery Item",
            "type": None,
            "subType": None,
            "color": "gray",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/item.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Empty Type Item",
            "type": "",
            "subType": "",
            "color": "red",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/item.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Space Type Item",
            "type": "t shirt",
            "subType": "v neck",
            "color": "white",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/item.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Special Char Item",
            "type": "t-shirt!",
            "subType": "v-neck",
            "color": "black",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/item.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        # Additional test cases
        {
            "name": "Mixed Case SubType",
            "type": "shirt",
            "subType": "V-NECK",
            "color": "white",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/shirt.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Multiple Special Chars",
            "type": "shirt",
            "subType": "v-neck!@#$%^&*()",
            "color": "blue",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/shirt.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Very Long SubType",
            "type": "shirt",
            "subType": "v-neck-with-extra-long-description-and-multiple-hyphens",
            "color": "red",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/shirt.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        },
        {
            "name": "Unicode SubType",
            "type": "shirt",
            "subType": "v-neck-éèêë",
            "color": "green",
            "season": ["spring", "summer"],
            "imageUrl": "https://example.com/shirt.jpg",
            "userId": "test_user",
            "createdAt": 1234567890,
            "updatedAt": 1234567890
        }
    ]

    results = []
    for i, test_case in enumerate(test_cases, 1):
        try:
            # Create a copy of the test case to modify
            item_data = test_case.copy()
            
            # Log original values
            logger.info(f"\nTest Case {i}:")
            logger.info(f"Original type: {item_data.get('type')}")
            logger.info(f"Original subType: {item_data.get('subType')}")
            
            # Normalize the type
            normalized_type = normalize_item_type(
                item_data.get("type", ""),
                item_data.get("subType")
            )
            
            # Create ClothingItem instance
            item_data["type"] = normalized_type
            validated_item = ClothingItem(**item_data)
            
            results.append({
                "case": i,
                "name": test_case["name"],
                "original_type": test_case["type"],
                "original_subType": test_case["subType"],
                "normalized_type": normalized_type.value,
                "status": "success",
                "error": None
            })
            
        except Exception as e:
            results.append({
                "case": i,
                "name": test_case["name"],
                "original_type": test_case["type"],
                "original_subType": test_case["subType"],
                "normalized_type": None,
                "status": "error",
                "error": str(e)
            })
            logger.error(f"Error in test case {i}: {str(e)}")

    return {
        "test_results": results,
        "summary": {
            "total_cases": len(test_cases),
            "successful": len([r for r in results if r["status"] == "success"]),
            "failed": len([r for r in results if r["status"] == "error"])
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001) 