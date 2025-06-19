from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from pydantic import validator
from .style_engine import StyleAttributes, Fit, Silhouette, Material, Neckline, Detail, Accessory

class Season(str, Enum):
    SPRING = "spring"
    SUMMER = "summer"
    FALL = "fall"
    WINTER = "winter"

class ClothingType(str, Enum):
    SHIRT = "shirt"
    DRESS_SHIRT = "dress_shirt"
    PANTS = "pants"
    SHORTS = "shorts"
    SKIRT = "skirt"
    DRESS = "dress"
    JACKET = "jacket"
    SWEATER = "sweater"
    SHOES = "shoes"
    DRESS_SHOES = "dress_shoes"
    LOAFERS = "loafers"
    SNEAKERS = "sneakers"
    ACCESSORY = "accessory"
    OTHER = "other"

class StyleType(str, Enum):
    CASUAL = "Casual"
    FORMAL = "Formal"
    SPORTS = "Sports"
    TRENDY = "Trendy"
    VINTAGE = "Vintage"
    STATEMENT = "Statement"
    SMART_CASUAL = "Smart Casual"
    BUSINESS = "Business"
    LUXURY = "Luxury"
    STREETWEAR = "Streetwear"
    MINIMALIST = "Minimalist"
    BOHEMIAN = "Bohemian"
    CLASSIC = "Classic"
    ELEGANT = "Elegant"
    ATHLETIC = "Athletic"
    PREPPY = "Preppy"
    GOTHIC = "Gothic"
    PUNK = "Punk"
    HIPSTER = "Hipster"
    RETRO = "Retro"

# Alias StyleType as StyleTag for compatibility
StyleTag = StyleType

class StyleSubtype(str, Enum):
    # --- CASUAL ---
    EVERYDAY = "Everyday"
    RELAXED = "Relaxed"
    COMFY = "Comfy"
    LOUNGEWEAR = "Loungewear"
    WEEKEND = "Weekend"
    DENIM_CASUAL = "Denim Casual"
    SUMMER_CASUAL = "Summer Casual"

    # --- FORMAL ---
    BLACK_TIE = "Black Tie"
    COCKTAIL = "Cocktail"
    EVENING_GOWN = "Evening Gown"
    TUXEDO = "Tuxedo"
    BRIDAL = "Bridal"
    GALA = "Gala"

    # --- SPORTS / ATHLETIC ---
    ACTIVEWEAR = "Activewear"
    GYM_WEAR = "Gym Wear"
    RUNNING = "Running"
    CYCLING = "Cycling"
    SWIMWEAR = "Swimwear"
    TENNISCORE = "Tenniscore"
    ATHLEISURE = "Athleisure"

    # --- TRENDY ---
    Y2K = "Y2K"
    FUTURISTIC = "Futuristic"
    COTTAGECORE = "Cottagecore"
    COASTAL_GRANDMA = "Coastal Grandma"
    GENDER_FLUID = "Gender Fluid"
    ECLECTIC = "Eclectic"
    CLEAN_GIRL = "Clean Girl"
    DARK_ACADEMIA = "Dark Academia"
    LIGHT_ACADEMIA = "Light Academia"

    # --- VINTAGE / RETRO ---
    SEVENTIES = "70s"
    EIGHTIES = "80s"
    NINETIES = "90s"
    MOD = "Mod"
    PINUP = "Pinup"
    OLD_MONEY = "Old Money"
    VINTAGE_CHANEL = "Vintage Chanel"

    # --- STATEMENT / ARTISTIC ---
    COLORBLOCK = "Colorblock"
    MAXIMALIST = "Maximalist"
    PRINT_ON_PRINT = "Print on Print"
    ART_POP = "Art Pop"
    BOLD_GRAPHICS = "Bold Graphics"
    AVANT_GARDE = "Avant-Garde"

    # --- SMART CASUAL / BUSINESS ---
    BUSINESS_CASUAL = "Business Casual"
    OFFICE_CHIC = "Office Chic"
    MONOCHROME_MINIMAL = "Monochrome Minimal"
    CLEAN_LINES = "Clean Lines"
    URBAN_PROFESSIONAL = "Urban Professional"

    # --- LUXURY / ELEGANT ---
    DESIGNER = "Designer"
    HIGH_FASHION = "High Fashion"
    SOPHISTICATED = "Sophisticated"
    FRENCH_GIRL = "French Girl"
    RED_CARPET = "Red Carpet"

    # --- STREETWEAR ---
    SKATE = "Skate"
    URBAN = "Urban"
    TECHWEAR = "Techwear"
    HYPEBEAST = "Hypebeast"
    GRUNGE = "Grunge"
    WORKWEAR = "Workwear"
    MILITARY = "Military Inspired"

    # --- BOHEMIAN ---
    FESTIVAL = "Festival"
    FOLK = "Folk"
    LAYERED = "Layered"
    ETHNIC_INFLUENCE = "Ethnic Influence"
    EARTH_TONES = "Earth Tones"

    # --- SUBCULTURE / NICHE ---
    PREPPY = "Preppy"
    GOTHIC = "Gothic"
    PUNK = "Punk"
    HIPSTER = "Hipster"
    EMO = "Emo"
    SCENE = "Scene"
    ALT = "Alt"

    # --- CLASSIC / MINIMALIST ---
    CLASSIC_CHIC = "Classic Chic"
    TIMELESS = "Timeless"
    JAPANESE_MINIMALISM = "Japanese Minimalism"
    SCANDI = "Scandinavian Minimalism"
    MONOCHROME = "Monochrome"
    MODERN_BASIC = "Modern Basic"

class Color(BaseModel):
    name: str
    hex: str
    rgb: List[int] = Field(default_factory=lambda: [0, 0, 0])

    @classmethod
    def from_string(cls, color_name: str) -> "Color":
        """Create a Color instance from a string name."""
        # Normalize color name to snake_case
        normalized_name = color_name.lower().replace(' ', '_')
        # Generate a default hex value based on the color name
        # This is a simple mapping, you might want to use a more sophisticated color mapping
        hex_value = "#000000"  # Default black
        rgb_value = [0, 0, 0]  # Default black RGB
        return cls(name=normalized_name, hex=hex_value, rgb=rgb_value)

    class Config:
        arbitrary_types_allowed = True

class TemperatureRange(str, Enum):
    VERY_COLD = "very_cold"
    COLD = "cold"
    COOL = "cool"
    MILD = "mild"
    WARM = "warm"
    HOT = "hot"
    VERY_HOT = "very_hot"

class Material(str, Enum):
    COTTON = "cotton"
    WOOL = "wool"
    SILK = "silk"
    LINEN = "linen"
    DENIM = "denim"
    LEATHER = "leather"
    SYNTHETIC = "synthetic"
    KNIT = "knit"
    FLEECE = "fleece"
    OTHER = "other"

class BodyType(str, Enum):
    HOURGLASS = "hourglass"
    PEAR = "pear"
    APPLE = "apple"
    RECTANGLE = "rectangle"
    INVERTED_TRIANGLE = "inverted_triangle"

class SkinTone(str, Enum):
    WARM = "warm"
    COOL = "cool"
    NEUTRAL = "neutral"

class TemperatureCompatibility(BaseModel):
    minTemp: float
    maxTemp: float
    recommendedLayers: List[str]
    materialPreferences: List[Material]

class MaterialCompatibility(BaseModel):
    compatibleMaterials: List[Material]
    weatherAppropriate: Dict[str, List[Material]]

class BodyTypeCompatibility(BaseModel):
    recommendedFits: Dict[BodyType, List[str]]
    styleRecommendations: Dict[BodyType, List[str]]

class SkinToneCompatibility(BaseModel):
    compatibleColors: Dict[SkinTone, List[str]]
    recommendedPalettes: Dict[SkinTone, List[str]]

class OutfitScoring(BaseModel):
    versatility: float = Field(ge=0, le=10)
    seasonality: float = Field(ge=0, le=10)
    formality: float = Field(ge=0, le=10)
    trendiness: float = Field(ge=0, le=10)
    quality: float = Field(ge=0, le=10)

class VisualAttributes(BaseModel):
    material: Optional[str] = None
    pattern: Optional[str] = None
    textureStyle: Optional[str] = None
    fabricWeight: Optional[str] = None
    fit: Optional[str] = None
    silhouette: Optional[str] = None
    length: Optional[str] = None
    genderTarget: Optional[str] = None
    sleeveLength: Optional[str] = None
    hangerPresent: Optional[bool] = None
    backgroundRemoved: Optional[bool] = None
    wearLayer: Optional[str] = None
    formalLevel: Optional[str] = None
    temperatureCompatibility: Optional[TemperatureCompatibility] = None
    materialCompatibility: Optional[MaterialCompatibility] = None
    bodyTypeCompatibility: Optional[BodyTypeCompatibility] = None
    skinToneCompatibility: Optional[SkinToneCompatibility] = None
    outfitScoring: Optional[OutfitScoring] = None

    class Config:
        arbitrary_types_allowed = True

class ItemMetadata(BaseModel):
    priceEstimate: Optional[str] = None
    careInstructions: Optional[str] = None
    tags: List[str] = Field(default_factory=list)

    class Config:
        arbitrary_types_allowed = True

class BasicMetadata(BaseModel):
    width: Optional[int] = None
    height: Optional[int] = None
    orientation: Optional[str] = None
    dateTaken: Optional[str] = None
    deviceModel: Optional[str] = None
    gps: Optional[str] = None
    flashUsed: Optional[bool] = None

    class Config:
        arbitrary_types_allowed = True

class ColorAnalysis(BaseModel):
    dominant: List[Color] = Field(default_factory=list)
    matching: List[Color] = Field(default_factory=list)

    @validator('dominant', 'matching', pre=True)
    def convert_strings_to_colors(cls, v):
        if isinstance(v, list):
            return [Color.from_string(c) if isinstance(c, str) else c for c in v]
        return v

    class Config:
        arbitrary_types_allowed = True

class Metadata(BaseModel):
    analysisTimestamp: int
    originalType: str
    originalSubType: Optional[str] = None
    styleTags: List[str] = Field(default_factory=list)
    occasionTags: List[str] = Field(default_factory=list)
    brand: Optional[str] = None
    imageHash: Optional[str] = None
    colorAnalysis: ColorAnalysis
    basicMetadata: Optional[BasicMetadata] = None
    visualAttributes: Optional[VisualAttributes] = None
    itemMetadata: Optional[ItemMetadata] = None
    naturalDescription: Optional[str] = None
    temperatureCompatibility: Optional[TemperatureCompatibility] = None
    materialCompatibility: Optional[MaterialCompatibility] = None
    bodyTypeCompatibility: Optional[BodyTypeCompatibility] = None
    skinToneCompatibility: Optional[SkinToneCompatibility] = None
    outfitScoring: Optional[OutfitScoring] = None

    @validator('colorAnalysis', pre=True)
    def convert_color_analysis(cls, v):
        if isinstance(v, dict):
            if 'dominant' in v:
                v['dominant'] = [
                    Color.from_string(c) if isinstance(c, str) else c
                    for c in v['dominant']
                ]
            if 'matching' in v:
                v['matching'] = [
                    Color.from_string(c) if isinstance(c, str) else c
                    for c in v['matching']
                ]
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "analysisTimestamp": 1234567890,
                "originalType": "jacket",
                "originalSubType": "denim",
                "styleTags": ["casual", "streetwear"],
                "occasionTags": ["daily", "casual"],
                "brand": "",
                "imageHash": "abc123",
                "colorAnalysis": {
                    "dominant": ["blue", "navy"],
                    "matching": ["white", "gray"]
                },
                "basicMetadata": {
                    "width": 800,
                    "height": 600,
                    "orientation": "portrait",
                    "dateTaken": "2024-03-20T12:00:00Z",
                    "deviceModel": "iPhone 12",
                    "gps": "37.7749,-122.4194",
                    "flashUsed": False
                },
                "visualAttributes": {
                    "pattern": "solid",
                    "formalLevel": "casual",
                    "fit": "regular",
                    "length": "regular",
                    "sleeveLength": "",
                    "genderTarget": "unisex",
                    "textureStyle": "denim",
                    "backgroundRemoved": False,
                    "silhouette": "regular",
                    "hangerPresent": False,
                    "wearLayer": "outer",
                    "material": "denim",
                    "fabricWeight": "medium"
                },
                "itemMetadata": {
                    "careInstructions": "Machine wash cold",
                    "tags": ["denim", "jacket"],
                    "priceEstimate": "89.99"
                },
                "naturalDescription": "A classic blue denim jacket"
            }
        }
        arbitrary_types_allowed = True

class ClothingItem(BaseModel):
    id: str
    name: str
    type: ClothingType
    color: str
    season: List[str]
    imageUrl: str
    tags: List[str]
    style: List[str] = Field(default_factory=list)
    userId: str
    dominantColors: List[Color]
    matchingColors: List[Color]
    occasion: List[str]
    brand: Optional[str] = None
    createdAt: int
    updatedAt: int
    subType: Optional[str] = None
    colorName: Optional[str] = None
    backgroundRemoved: Optional[bool] = None
    embedding: Optional[List[float]] = None
    metadata: Optional[Metadata] = None

    @validator('metadata', pre=True)
    def convert_metadata_colors(cls, v):
        if v is None:
            return v
        if isinstance(v, dict):
            if 'colorAnalysis' in v:
                if isinstance(v['colorAnalysis'], dict):
                    if 'dominant' in v['colorAnalysis']:
                        v['colorAnalysis']['dominant'] = [
                            Color.from_string(c) if isinstance(c, str) else c
                            for c in v['colorAnalysis']['dominant']
                        ]
                    if 'matching' in v['colorAnalysis']:
                        v['colorAnalysis']['matching'] = [
                            Color.from_string(c) if isinstance(c, str) else c
                            for c in v['colorAnalysis']['matching']
                        ]
        return v

    def get_style_compatibility(self, other_item: 'ClothingItem') -> float:
        """Calculate style compatibility score between two items."""
        score = 0.0
        total_factors = 0

        # Color harmony
        if self.metadata and other_item.metadata:
            color_harmony = analyze_color_harmony(
                self.metadata.colorAnalysis.dominant,
                other_item.metadata.colorAnalysis.dominant
            )
            score += color_harmony
            total_factors += 1

        # Style tag overlap
        common_styles = set(self.style) & set(other_item.style)
        style_score = len(common_styles) / max(len(self.style), len(other_item.style)) if self.style and other_item.style else 0
        score += style_score
        total_factors += 1

        # Occasion compatibility
        common_occasions = set(self.occasion) & set(other_item.occasion)
        occasion_score = len(common_occasions) / max(len(self.occasion), len(other_item.occasion)) if self.occasion and other_item.occasion else 0
        score += occasion_score
        total_factors += 1

        # Season overlap
        common_seasons = set(self.season) & set(other_item.season)
        season_score = len(common_seasons) / max(len(self.season), len(other_item.season)) if self.season and other_item.season else 0
        score += season_score
        total_factors += 1

        return score / total_factors if total_factors > 0 else 0.0

    class Config:
        arbitrary_types_allowed = True

class Outfit(BaseModel):
    id: str
    name: str
    description: str
    items: List[ClothingItem]
    occasion: str
    season: str
    style: str
    styleTags: List[str] = Field(default_factory=list)
    colorHarmony: str
    styleNotes: str
    createdAt: int
    updatedAt: int
    metadata: Optional[Dict[str, Any]] = None

class GeneratedOutfit(Outfit):
    """A generated outfit with additional metadata."""
    pass

# Export types for use in other backend modules
__all__ = [
    'Season',
    'ClothingType',
    'StyleType',
    'StyleTag',
    'StyleSubtype',
    'Color',
    'VisualAttributes',
    'ItemMetadata',
    'BasicMetadata',
    'ColorAnalysis',
    'Metadata',
    'ClothingItem',
    'Outfit',
    'GeneratedOutfit',
    'TemperatureRange',
    'Material',
    'BodyType',
    'SkinTone',
    'TemperatureCompatibility',
    'MaterialCompatibility',
    'BodyTypeCompatibility',
    'SkinToneCompatibility',
    'OutfitScoring'
] 