from typing import List, Optional, Dict, Any
from ..config.firebase import db
from ..types.outfit import Outfit, OutfitPiece, OutfitGeneratedOutfit
from ..types.wardrobe import ClothingType, ClothingItem
from ..types.outfit_rules import LAYERING_RULES, OCCASION_RULES, MOOD_RULES, get_weather_rule, get_occasion_rule, get_mood_rule
from ..types.weather import WeatherData
from ..types.profile import UserProfile
import random
import time
from ..utils.pairability import average_pairability
import uuid

class OutfitService:
    def __init__(self):
        self.collection = db.collection('outfits')
        self.wardrobe_collection = db.collection('wardrobe')

    def to_dict_recursive(self, obj):
        """Recursively convert Pydantic models to dictionaries for Firestore serialization."""
        if hasattr(obj, 'dict'):
            # Pydantic model
            return obj.dict()
        elif isinstance(obj, dict):
            # Dictionary - recursively convert values
            return {key: self.to_dict_recursive(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            # List - recursively convert items
            return [self.to_dict_recursive(item) for item in obj]
        elif hasattr(obj, '__dict__'):
            # Object with __dict__ - convert to dict
            return {key: self.to_dict_recursive(value) for key, value in obj.__dict__.items()}
        else:
            # Primitive type - return as is
            return obj

    async def get_outfits(self) -> List[OutfitGeneratedOutfit]:
        """Get all outfits from Firestore."""
        try:
            outfits = []
            docs = self.collection.stream()
            for doc in docs:
                outfit_data = doc.to_dict()
                outfit_data['id'] = doc.id
                
                try:
                    # Try to validate as OutfitGeneratedOutfit first
                    outfits.append(OutfitGeneratedOutfit(**outfit_data))
                except Exception as e:
                    print(f"Failed to validate outfit {doc.id} as OutfitGeneratedOutfit: {e}")
                    # If that fails, try to convert from old Outfit format
                    try:
                        # Convert old Outfit format to OutfitGeneratedOutfit format
                        converted_data = self._convert_old_outfit_format(outfit_data)
                        outfits.append(OutfitGeneratedOutfit(**converted_data))
                    except Exception as e2:
                        print(f"Failed to convert old outfit format for {doc.id}: {e2}")
                        # If conversion fails, delete the problematic outfit
                        print(f"Deleting problematic outfit {doc.id}")
                        self.collection.document(doc.id).delete()
                        continue
            
            return outfits
        except Exception as e:
            print(f"Error getting outfits: {e}")
            raise

    async def get_outfit(self, outfit_id: str) -> Optional[OutfitGeneratedOutfit]:
        """Get a single outfit by ID from Firestore."""
        try:
            doc = self.collection.document(outfit_id).get()
            if not doc.exists:
                return None
            
            outfit_data = doc.to_dict()
            outfit_data['id'] = doc.id
            
            try:
                # Try to validate as OutfitGeneratedOutfit first
                return OutfitGeneratedOutfit(**outfit_data)
            except Exception as e:
                print(f"Failed to validate as OutfitGeneratedOutfit: {e}")
                # If that fails, try to convert from old Outfit format
                try:
                    # Convert old Outfit format to OutfitGeneratedOutfit format
                    converted_data = self._convert_old_outfit_format(outfit_data)
                    return OutfitGeneratedOutfit(**converted_data)
                except Exception as e2:
                    print(f"Failed to convert old outfit format: {e2}")
                    # If conversion fails, delete the problematic outfit
                    print(f"Deleting problematic outfit {outfit_id}")
                    self.collection.document(outfit_id).delete()
                    return None
                    
        except Exception as e:
            print(f"Error getting outfit {outfit_id}: {e}")
            raise

    def _convert_old_outfit_format(self, old_outfit_data: dict) -> dict:
        """Convert old Outfit format to OutfitGeneratedOutfit format."""
        # Create a copy to avoid modifying the original
        new_data = old_outfit_data.copy()
        
        # If items are in OutfitPiece format, convert them to ClothingItem format
        if 'items' in new_data and isinstance(new_data['items'], list):
            converted_items = []
            for item in new_data['items']:
                if isinstance(item, dict):
                    # Check if this is an OutfitPiece (has itemId and reason)
                    if 'itemId' in item and 'reason' in item:
                        # This is an OutfitPiece, we need to convert it to ClothingItem format
                        # For now, we'll create a minimal ClothingItem structure
                        converted_item = {
                            'id': item.get('itemId', 'unknown'),
                            'name': item.get('name', 'Unknown Item'),
                            'type': item.get('type', 'other'),
                            'color': 'unknown',
                            'season': ['all'],
                            'style': item.get('style', []),
                            'imageUrl': item.get('imageUrl', ''),
                            'tags': [],
                            'dominantColors': item.get('dominantColors', []),
                            'matchingColors': [],
                            'occasion': item.get('occasion', []),
                            'createdAt': int(time.time()),
                            'updatedAt': int(time.time()),
                            'userId': 'unknown'
                        }
                        converted_items.append(converted_item)
                    else:
                        # This is already a ClothingItem, keep as is
                        converted_items.append(item)
                else:
                    converted_items.append(item)
            
            new_data['items'] = converted_items
        
        # Ensure all required fields are present
        required_fields = {
            'explanation': new_data.get('explanation', 'Generated outfit'),
            'pieces': new_data.get('pieces', []),
            'styleTags': new_data.get('styleTags', []),
            'colorHarmony': new_data.get('colorHarmony', ''),
            'styleNotes': new_data.get('styleNotes', ''),
            'metadata': new_data.get('metadata', {})
        }
        
        new_data.update(required_fields)
        
        return new_data

    async def generate_outfit(
        self,
        occasion: str,
        weather: WeatherData,
        wardrobe: List[ClothingItem],
        user_profile: UserProfile,
        likedOutfits: List[str],
        trendingStyles: List[str],
        preferences: Optional[Dict[str, Any]] = None,
        outfitHistory: Optional[List[Dict[str, Any]]] = None,
        randomSeed: Optional[float] = None,
        season: Optional[str] = None,
        style: Optional[str] = None,
        baseItem: Optional[ClothingItem] = None
    ) -> OutfitGeneratedOutfit:
        """Generate a new outfit based on context and preferences with enhanced analysis insights."""
        try:
            # Get rules for the occasion and weather
            occasion_rule = get_occasion_rule(occasion)
            weather_rule = get_weather_rule(weather.temperature)
            
            # Get layering rule based on temperature
            layering_rule = get_weather_rule(weather.temperature)

            # Initialize selected items list
            selected_items = []
            print(f"DEBUG: generate_outfit - Starting with {len(wardrobe)} wardrobe items")
            print(f"DEBUG: generate_outfit - Occasion: {occasion}, Style: {style}")
            
            # If baseItem is provided, start with it
            if baseItem:
                print(f"DEBUG: generate_outfit - Using base item: {baseItem.name}")
                selected_items.append(baseItem)
                # Get complementary items based on the base item using enhanced analysis
                complementary_items = self._get_complementary_items_enhanced(baseItem, wardrobe, style)
                print(f"DEBUG: generate_outfit - Found {len(complementary_items)} complementary items")
                selected_items.extend(complementary_items)
            else:
                # Start with essential items for the occasion using enhanced analysis
                print(f"DEBUG: generate_outfit - No base item, looking for essential items")
                essential_items = self._get_essential_items_enhanced(occasion, wardrobe, style)
                print(f"DEBUG: generate_outfit - Found {len(essential_items)} essential items")
                selected_items.extend(essential_items)

            # Apply style preferences with enhanced analysis insights
            if style:
                print(f"DEBUG: generate_outfit - Looking for style items: {style}")
                style_items = self._get_style_items_enhanced(style, wardrobe)
                print(f"DEBUG: generate_outfit - Found {len(style_items)} style items")
                selected_items.extend(style_items)

            # Consider trending styles
            if trendingStyles:
                print(f"DEBUG: generate_outfit - Looking for trending items: {trendingStyles}")
                trending_items = self._get_trending_items(trendingStyles, wardrobe)
                print(f"DEBUG: generate_outfit - Found {len(trending_items)} trending items")
                selected_items.extend(trending_items)

            # Consider user's liked outfits
            if likedOutfits:
                print(f"DEBUG: generate_outfit - Looking for liked items: {likedOutfits}")
                liked_items = self._get_liked_items(likedOutfits, wardrobe)
                print(f"DEBUG: generate_outfit - Found {len(liked_items)} liked items")
                selected_items.extend(liked_items)

            print(f"DEBUG: generate_outfit - Total items before weather adjustment: {len(selected_items)}")
            print(f"DEBUG: generate_outfit - Selected items: {[item.name for item in selected_items]}")

            # Apply weather-appropriate adjustments using enhanced temperature compatibility
            selected_items = self._adjust_for_weather_enhanced(selected_items, weather)
            print(f"DEBUG: generate_outfit - Items after weather adjustment: {len(selected_items)}")
            print(f"DEBUG: generate_outfit - Final selected items: {[item.name for item in selected_items]}")

            # Calculate color harmony with enhanced color analysis
            color_harmony = self._calculate_color_harmony_enhanced(selected_items)

            # Generate style notes using enhanced analysis insights
            style_notes = self._generate_style_notes_enhanced(selected_items, occasion, style)

            # Create outfit pieces
            outfit_pieces = [
                OutfitPiece(
                    itemId=item.id,
                    name=item.name,
                    type=item.type,
                    reason=self._generate_item_reason_enhanced(item, occasion, style),
                    dominantColors=[getattr(color, 'name', str(color)) for color in item.dominantColors],
                    style=item.style,
                    occasion=item.occasion,
                    imageUrl=item.imageUrl
                )
                for item in selected_items
            ]

            # Calculate enhanced scores
            pairability_score = self._calculate_pairability_score_enhanced(selected_items)
            style_compliance = self._calculate_style_compliance_enhanced(selected_items, style)
            weather_appropriateness = self._calculate_weather_appropriateness_enhanced(selected_items, weather)
            occasion_appropriateness = self._calculate_occasion_appropriateness_enhanced(selected_items, occasion)

            # Create outfit document
            outfit_data = {
                "id": str(uuid.uuid4()),
                "name": f"{style or 'Stylish'} {occasion} Outfit",
                "description": f"A {style or 'stylish'} outfit for {occasion}",
                "items": [self.to_dict_recursive(item) for item in selected_items],
                "explanation": f"A {style or 'stylish'} outfit for {occasion}",
                "pieces": [piece.dict() for piece in outfit_pieces],
                "styleTags": self._generate_style_tags_enhanced(selected_items, style),
                "colorHarmony": color_harmony,
                "styleNotes": style_notes,
                "occasion": occasion,
                "season": self._determine_season(weather.temperature, occasion),
                "style": style or "Stylish",
                "createdAt": int(time.time()),
                "updatedAt": int(time.time()),
                "metadata": {
                    "pairabilityScore": pairability_score,
                    "styleCompliance": style_compliance,
                    "weatherAppropriateness": weather_appropriateness,
                    "occasionAppropriateness": occasion_appropriateness,
                    "enhancedAnalysis": True,
                    "clipInsights": self._extract_clip_insights(selected_items),
                    "styleCompatibility": self._get_style_compatibility_summary(selected_items)
                }
            }

            # Save to Firestore
            doc_ref = self.collection.document(outfit_data["id"])
            print(f"DEBUG: Saving outfit data: {outfit_data}")
            print(f"DEBUG: Items type: {type(outfit_data['items'])}")
            print(f"DEBUG: Items content: {outfit_data['items']}")
            doc_ref.set(outfit_data)
            print(f"Outfit saved with ID: {outfit_data['id']}")

            return OutfitGeneratedOutfit(**outfit_data)

        except Exception as e:
            print(f"Error generating outfit: {e}")
            raise

    def _get_complementary_items_enhanced(self, base_item: ClothingItem, wardrobe: List[ClothingItem], style: Optional[str]) -> List[ClothingItem]:
        """Get items that complement the base item using enhanced analysis insights."""
        complementary_items = []
        
        # Get enhanced style compatibility data
        base_style_compatibility = getattr(base_item.metadata, 'styleCompatibility', {}) if base_item.metadata else {}
        compatible_styles = base_style_compatibility.get("compatibleStyles", []) if base_style_compatibility else []
        avoid_styles = base_style_compatibility.get("avoidStyles", []) if base_style_compatibility else []
        
        for item in wardrobe:
            if item.id != base_item.id:
                # Check if items are compatible using enhanced analysis
                if self._items_are_compatible_enhanced(base_item, item, compatible_styles, avoid_styles, style):
                    complementary_items.append(item)
        
        return complementary_items

    def _get_essential_items_enhanced(self, occasion: str, wardrobe: List[ClothingItem], style: Optional[str]) -> List[ClothingItem]:
        """Get essential items for the given occasion using enhanced analysis."""
        essential_items = []
        print(f"DEBUG: _get_essential_items_enhanced - Looking for {occasion} items from {len(wardrobe)} wardrobe items")
        
        for item in wardrobe:
            print(f"DEBUG: Checking item {item.name} (id: {item.id})")
            print(f"DEBUG:   - Item occasions: {item.occasion}")
            print(f"DEBUG:   - Looking for occasion: {occasion}")
            
            # Check occasion compatibility
            if occasion in item.occasion:
                print(f"DEBUG:   ✓ Item matches occasion {occasion}")
                # Use enhanced occasion tags if available
                enhanced_occasions = getattr(item.metadata, 'enhancedOccasions', None)
                if enhanced_occasions is None and item.metadata and hasattr(item.metadata, 'dict'):
                    enhanced_occasions = item.metadata.dict().get('enhancedOccasions', item.occasion) if item.metadata and hasattr(item.metadata, 'dict') else item.occasion
                if enhanced_occasions is None:
                    enhanced_occasions = item.occasion
                print(f"DEBUG:   - Enhanced occasions: {enhanced_occasions}")
                if occasion in enhanced_occasions:
                    print(f"DEBUG:   ✓ Item added to essential items")
                    essential_items.append(item)
                else:
                    print(f"DEBUG:   ✗ Item filtered out by enhanced occasions")
            else:
                print(f"DEBUG:   ✗ Item doesn't match occasion {occasion}")
        
        print(f"DEBUG: _get_essential_items_enhanced - Found {len(essential_items)} essential items")
        return essential_items

    def _get_style_items_enhanced(self, style: str, wardrobe: List[ClothingItem]) -> List[ClothingItem]:
        """Get items matching the style using enhanced analysis insights."""
        style_items = []
        print(f"DEBUG: _get_style_items_enhanced - Looking for {style} items from {len(wardrobe)} wardrobe items")
        
        for item in wardrobe:
            print(f"DEBUG: Checking item {item.name} (id: {item.id}) for style {style}")
            print(f"DEBUG:   - Item styles: {item.style}")
            
            # Check primary style from CLIP analysis
            clip_analysis = getattr(item.metadata, 'clipAnalysis', None)
            clip_primary_style = clip_analysis.get("primaryStyle") if clip_analysis else None
            print(f"DEBUG:   - CLIP primary style: {clip_primary_style}")
            if clip_primary_style and clip_primary_style.lower() == style.lower():
                print(f"DEBUG:   ✓ Item matches CLIP style")
                style_items.append(item)
                continue
            
            # Check enhanced style tags
            enhanced_styles = getattr(item.metadata, 'enhancedStyles', None)
            if enhanced_styles is None and item.metadata and hasattr(item.metadata, 'dict'):
                enhanced_styles = item.metadata.dict().get('enhancedStyles', item.style) if item.metadata and hasattr(item.metadata, 'dict') else item.style
            if enhanced_styles is None:
                enhanced_styles = item.style
            print(f"DEBUG:   - Enhanced styles: {enhanced_styles}")
            if style.lower() in [s.lower() for s in enhanced_styles]:
                print(f"DEBUG:   ✓ Item matches enhanced styles")
                style_items.append(item)
                continue
            
            # Check style compatibility
            style_compatibility = getattr(item.metadata, 'styleCompatibility', None)
            compatible_styles = style_compatibility.get("compatibleStyles", []) if style_compatibility else []
            print(f"DEBUG:   - Compatible styles: {compatible_styles}")
            if style.lower() in [s.lower() for s in compatible_styles]:
                print(f"DEBUG:   ✓ Item matches compatible styles")
                style_items.append(item)
            else:
                print(f"DEBUG:   ✗ Item doesn't match any style criteria")
        
        print(f"DEBUG: _get_style_items_enhanced - Found {len(style_items)} style items")
        return style_items

    def _adjust_for_weather_enhanced(self, items: List[ClothingItem], weather: WeatherData) -> List[ClothingItem]:
        """Apply weather-appropriate adjustments using enhanced temperature compatibility."""
        adjusted_items = []
        
        for item in items:
            # Get enhanced temperature compatibility data
            visual_attrs = getattr(item.metadata, 'visualAttributes', None)
            if visual_attrs is None:
                temp_compatibility = {}
            elif isinstance(visual_attrs, dict):
                temp_compatibility = visual_attrs.get("temperatureCompatibility", {})
            else:
                temp_compatibility = getattr(visual_attrs, 'temperatureCompatibility', {})
            
            # Handle both dict and Pydantic model for temp_compatibility
            if isinstance(temp_compatibility, dict):
                min_temp = temp_compatibility.get("minTemp", 32)
                max_temp = temp_compatibility.get("maxTemp", 75)
            else:
                # Pydantic model - use getattr
                min_temp = getattr(temp_compatibility, "minTemp", 32)
                max_temp = getattr(temp_compatibility, "maxTemp", 75)
            
            # Check if item is appropriate for current temperature
            if min_temp <= weather.temperature <= max_temp:
                adjusted_items.append(item)
        
        return adjusted_items

    def _calculate_color_harmony_enhanced(self, items: List[ClothingItem]) -> str:
        """Calculate color harmony using enhanced color analysis."""
        if not items:
            return "No items to analyze"
        
        # Extract enhanced color data
        dominant_colors = []
        matching_colors = []
        
        for item in items:
            # Use enhanced color analysis if available
            enhanced_colors = getattr(item.metadata, 'enhancedColorAnalysis', {})
            if enhanced_colors:
                dominant_colors.extend(enhanced_colors.get("dominant", item.dominantColors) if enhanced_colors else item.dominantColors)
                matching_colors.extend(enhanced_colors.get("matching", item.matchingColors) if enhanced_colors else item.matchingColors)
            else:
                dominant_colors.extend(item.dominantColors)
                matching_colors.extend(item.matchingColors)
        
        # Analyze color harmony
        if len(dominant_colors) == 0:
            return "No color data available"
        
        # Support both dict and Pydantic model for color
        def get_color_name(color):
            if isinstance(color, dict):
                return color.get("name", "").lower() if color else ""
            return getattr(color, "name", "").lower()
        
        color_names = [get_color_name(color) for color in dominant_colors]
        
        # Check for monochromatic
        if len(set(color_names)) == 1:
            return f"Monochromatic {color_names[0]} palette"
        
        # Check for complementary colors
        if len(color_names) == 2:
            return f"Complementary {color_names[0]} and {color_names[1]} palette"
        
        # Check for analogous colors
        if len(color_names) <= 3:
            return f"Analogous {', '.join(color_names)} palette"
        
        return f"Multi-color palette with {len(set(color_names))} distinct colors"

    def _generate_style_notes_enhanced(self, items: List[ClothingItem], occasion: str, style: Optional[str]) -> str:
        """Generate style notes using enhanced analysis insights."""
        if not items:
            return "No items selected"
        
        notes = []
        
        # Extract CLIP insights
        clip_insights = []
        for item in items:
            clip_analysis = getattr(item.metadata, 'clipAnalysis', {})
            if clip_analysis:
                primary_style = clip_analysis.get("primaryStyle") if clip_analysis else None
                confidence = clip_analysis.get("styleConfidence", 0) if clip_analysis else 0
                if primary_style and confidence > 0.3:
                    clip_insights.append(f"{primary_style} ({confidence:.1%} confidence)")
        
        if clip_insights:
            notes.append(f"Style analysis: {', '.join(clip_insights)}")
        
        # Extract style compatibility insights
        style_compatibility_notes = []
        for item in items:
            style_compat = getattr(item.metadata, 'styleCompatibility', {})
            if style_compat:
                compatible = style_compat.get("compatibleStyles", []) if style_compat else []
                avoid = style_compat.get("avoidStyles", []) if style_compat else []
                if compatible:
                    style_compatibility_notes.append(f"Works well with: {', '.join(compatible[:2])}")
                if avoid:
                    style_compatibility_notes.append(f"Avoid pairing with: {', '.join(avoid[:2])}")
        
        if style_compatibility_notes:
            notes.append("Style compatibility: " + "; ".join(style_compatibility_notes))
        
        # Add occasion and weather notes
        notes.append(f"Perfect for {occasion}")
        
        return ". ".join(notes)

    def _generate_item_reason_enhanced(self, item: ClothingItem, occasion: str, style: Optional[str]) -> str:
        """Generate reason for including an item using enhanced analysis."""
        reasons = []
        
        # Check CLIP analysis
        clip_analysis = getattr(item.metadata, 'clipAnalysis', {})
        if clip_analysis:
            primary_style = clip_analysis.get("primaryStyle") if clip_analysis else None
            confidence = clip_analysis.get("styleConfidence", 0) if clip_analysis else 0
            if primary_style and confidence > 0.3:
                reasons.append(f"Strong {primary_style} aesthetic")
        
        # Check style compatibility
        style_compat = getattr(item.metadata, 'styleCompatibility', {})
        if style_compat and style:
            compatible_styles = style_compat.get("compatibleStyles", []) if style_compat else []
            if style in compatible_styles:
                reasons.append(f"Compatible with {style} style")
        
        # Check occasion appropriateness
        if occasion in item.occasion:
            reasons.append(f"Perfect for {occasion}")
        
        if not reasons:
            reasons.append(f"Stylish choice for {occasion}")
        
        return "; ".join(reasons)

    def _calculate_pairability_score_enhanced(self, items: List[ClothingItem]) -> float:
        """Calculate enhanced pairability score using style compatibility data."""
        if len(items) < 2:
            return 1.0
        
        total_score = 0
        comparisons = 0
        
        for i, item1 in enumerate(items):
            for j, item2 in enumerate(items[i+1:], i+1):
                # Get style compatibility data
                style_compat1 = getattr(item1.metadata, 'styleCompatibility', {})
                style_compat2 = getattr(item2.metadata, 'styleCompatibility', {})
                
                # Check if items are compatible
                compatible_styles1 = style_compat1.get("compatibleStyles", []) if style_compat1 else []
                compatible_styles2 = style_compat2.get("compatibleStyles", []) if style_compat2 else []
                
                # Calculate compatibility score
                score = 0.5  # Base score
                
                # Check for style overlap
                item1_styles = set(item1.style + compatible_styles1)
                item2_styles = set(item2.style + compatible_styles2)
                style_overlap = len(item1_styles.intersection(item2_styles))
                
                if style_overlap > 0:
                    score += 0.3
                
                # Check for color compatibility
                if self._colors_are_compatible(item1.dominantColors, item2.dominantColors):
                    score += 0.2
                
                total_score += score
                comparisons += 1
        
        return total_score / comparisons if comparisons > 0 else 1.0

    def _calculate_style_compliance_enhanced(self, items: List[ClothingItem], style: Optional[str]) -> float:
        """Calculate enhanced style compliance using CLIP analysis."""
        if not style or not items:
            return 0.8
        
        total_confidence = 0
        style_matches = 0
        
        for item in items:
            clip_analysis = getattr(item.metadata, 'clipAnalysis', {})
            if clip_analysis:
                primary_style = clip_analysis.get("primaryStyle") if clip_analysis else None
                confidence = clip_analysis.get("styleConfidence", 0) if clip_analysis else 0
                
                if primary_style and primary_style.lower() == style.lower():
                    total_confidence += confidence
                    style_matches += 1
        
        if style_matches == 0:
            return 0.5  # Neutral score if no CLIP data
        
        return total_confidence / style_matches

    def _calculate_weather_appropriateness_enhanced(self, items: List[ClothingItem], weather: WeatherData) -> float:
        """Calculate enhanced weather appropriateness using temperature compatibility."""
        if not items:
            return 0.8
        
        appropriate_items = 0
        
        for item in items:
            visual_attrs = getattr(item.metadata, 'visualAttributes', None)
            if visual_attrs is None:
                temp_compatibility = {}
            elif isinstance(visual_attrs, dict):
                temp_compatibility = visual_attrs.get("temperatureCompatibility", {})
            else:
                temp_compatibility = getattr(visual_attrs, 'temperatureCompatibility', {})
            
            # Handle both dict and Pydantic model for temp_compatibility
            if isinstance(temp_compatibility, dict):
                min_temp = temp_compatibility.get("minTemp", 32)
                max_temp = temp_compatibility.get("maxTemp", 75)
            else:
                # Pydantic model - use getattr
                min_temp = getattr(temp_compatibility, "minTemp", 32)
                max_temp = getattr(temp_compatibility, "maxTemp", 75)
            
            if min_temp <= weather.temperature <= max_temp:
                appropriate_items += 1
        
        return appropriate_items / len(items)

    def _calculate_occasion_appropriateness_enhanced(self, items: List[ClothingItem], occasion: str) -> float:
        """Calculate enhanced occasion appropriateness."""
        if not items:
            return 0.8
        
        appropriate_items = 0
        
        for item in items:
            # Check both regular and enhanced occasion tags
            occasions = item.occasion + getattr(item.metadata, 'enhancedOccasions', [])
            if occasion in occasions:
                appropriate_items += 1
        
        return appropriate_items / len(items)

    def _generate_style_tags_enhanced(self, items: List[ClothingItem], style: Optional[str]) -> List[str]:
        """Generate enhanced style tags using CLIP analysis."""
        tags = set()
        
        if style:
            tags.add(style)
        
        for item in items:
            # Add enhanced style tags
            enhanced_styles = getattr(item.metadata, 'enhancedStyles', None)
            if enhanced_styles is None and item.metadata and hasattr(item.metadata, 'dict'):
                enhanced_styles = item.metadata.dict().get('enhancedStyles', item.style) if item.metadata and hasattr(item.metadata, 'dict') else item.style
            if enhanced_styles is None:
                enhanced_styles = item.style
            tags.update(enhanced_styles)
            
            # Add CLIP primary style if high confidence
            clip_analysis = getattr(item.metadata, 'clipAnalysis', {})
            if clip_analysis:
                primary_style = clip_analysis.get("primaryStyle") if clip_analysis else None
                confidence = clip_analysis.get("styleConfidence", 0) if clip_analysis else 0
                if primary_style and confidence > 0.3:
                    tags.add(primary_style)
        
        return list(tags)

    def _items_are_compatible_enhanced(self, item1: ClothingItem, item2: ClothingItem, 
                                     compatible_styles: List[str], avoid_styles: List[str], 
                                     target_style: Optional[str]) -> bool:
        """Check if two items are compatible using enhanced analysis."""
        # Check style compatibility
        item2_styles = set(item2.style)
        if any(style in item2_styles for style in avoid_styles):
            return False
        
        if compatible_styles and not any(style in item2_styles for style in compatible_styles):
            return False
        
        # Check color compatibility
        if not self._colors_are_compatible(item1.dominantColors, item2.dominantColors):
            return False
        
        # Check occasion compatibility
        if not set(item1.occasion).intersection(set(item2.occasion)):
            return False
        
        return True

    def _colors_are_compatible(self, colors1: List[dict], colors2: List[dict]) -> bool:
        """Check if two color sets are compatible."""
        if not colors1 or not colors2:
            return True
        
        # Support both dict and Pydantic model for color
        def get_color_name(color):
            if isinstance(color, dict):
                return color.get("name", "").lower() if color else ""
            return getattr(color, "name", "").lower()
        
        color_names1 = {get_color_name(color) for color in colors1}
        color_names2 = {get_color_name(color) for color in colors2}
        
        # Check for neutral colors
        neutral_colors = {"black", "white", "gray", "beige", "navy", "brown"}
        
        # If one item has neutral colors, they're compatible
        if color_names1.intersection(neutral_colors) or color_names2.intersection(neutral_colors):
            return True
        
        # Check for color harmony (simple check)
        return len(color_names1.intersection(color_names2)) > 0

    def _extract_clip_insights(self, items: List[ClothingItem]) -> Dict[str, Any]:
        """Extract CLIP analysis insights from items."""
        insights = {
            "primaryStyles": [],
            "averageConfidence": 0,
            "styleBreakdown": {}
        }
        
        total_confidence = 0
        confidence_count = 0
        
        for item in items:
            clip_analysis = getattr(item.metadata, 'clipAnalysis', {})
            if clip_analysis:
                primary_style = clip_analysis.get("primaryStyle") if clip_analysis else None
                confidence = clip_analysis.get("styleConfidence", 0) if clip_analysis else 0
                
                if primary_style:
                    insights["primaryStyles"].append(primary_style)
                    insights["styleBreakdown"][primary_style] = insights["styleBreakdown"].get(primary_style, 0) + 1 if insights["styleBreakdown"] else 1
                
                if confidence > 0:
                    total_confidence += confidence
                    confidence_count += 1
        
        if confidence_count > 0:
            insights["averageConfidence"] = total_confidence / confidence_count
        
        return insights

    def _get_style_compatibility_summary(self, items: List[ClothingItem]) -> Dict[str, Any]:
        """Get summary of style compatibility across items."""
        summary = {
            "compatibleStyles": set(),
            "avoidStyles": set(),
            "styleNotes": []
        }
        
        for item in items:
            style_compat = getattr(item.metadata, 'styleCompatibility', {})
            if style_compat:
                summary["compatibleStyles"].update(style_compat.get("compatibleStyles", []) if style_compat else [])
                summary["avoidStyles"].update(style_compat.get("avoidStyles", []) if style_compat else [])
                
                style_note = style_compat.get("styleNotes") if style_compat else None
                if style_note:
                    summary["styleNotes"].append(style_note)
        
        return {
            "compatibleStyles": list(summary["compatibleStyles"]),
            "avoidStyles": list(summary["avoidStyles"]),
            "styleNotes": summary["styleNotes"]
        }

    # Legacy methods for backward compatibility
    def _get_complementary_items(self, base_item: ClothingItem, wardrobe: List[ClothingItem]) -> List[ClothingItem]:
        """Get items that complement the base item."""
        return self._get_complementary_items_enhanced(base_item, wardrobe, None)

    def _get_essential_items(self, occasion: str, wardrobe: List[ClothingItem]) -> List[ClothingItem]:
        """Get essential items for the given occasion."""
        return self._get_essential_items_enhanced(occasion, wardrobe, None)

    def _get_style_items(self, style: str, wardrobe: List[ClothingItem]) -> List[ClothingItem]:
        """Get items matching the style."""
        return self._get_style_items_enhanced(style, wardrobe)

    def _adjust_for_weather(self, items: List[ClothingItem], weather: WeatherData) -> List[ClothingItem]:
        """Apply weather-appropriate adjustments."""
        return self._adjust_for_weather_enhanced(items, weather)

    def _calculate_color_harmony(self, items: List[ClothingItem]) -> str:
        """Calculate color harmony."""
        return self._calculate_color_harmony_enhanced(items)

    def _generate_style_notes(self, items: List[ClothingItem], occasion: str, style: Optional[str]) -> str:
        """Generate style notes."""
        return self._generate_style_notes_enhanced(items, occasion, style)

    def _generate_item_reason(self, item: ClothingItem, occasion: str, style: Optional[str]) -> str:
        """Generate reason for including an item."""
        return self._generate_item_reason_enhanced(item, occasion, style)

    def _calculate_pairability_score(self, items: List[ClothingItem]) -> float:
        """Calculate pairability score."""
        return self._calculate_pairability_score_enhanced(items)

    def _calculate_style_compliance(self, items: List[ClothingItem], style: Optional[str]) -> float:
        """Calculate style compliance score."""
        return self._calculate_style_compliance_enhanced(items, style)

    def _calculate_weather_appropriateness(self, items: List[ClothingItem], weather: WeatherData) -> float:
        """Calculate weather appropriateness score."""
        return self._calculate_weather_appropriateness_enhanced(items, weather)

    def _calculate_occasion_appropriateness(self, items: List[ClothingItem], occasion: str) -> float:
        """Calculate occasion appropriateness score."""
        return self._calculate_occasion_appropriateness_enhanced(items, occasion)

    def _generate_style_tags(self, items: List[ClothingItem], style: Optional[str]) -> List[str]:
        """Generate style tags."""
        return self._generate_style_tags_enhanced(items, style)

    def _items_are_compatible(self, item1: ClothingItem, item2: ClothingItem) -> bool:
        """Check if two items are compatible."""
        return self._items_are_compatible_enhanced(item1, item2, [], [], None)

    def _get_trending_items(self, trendingStyles: List[str], wardrobe: List[ClothingItem]) -> List[ClothingItem]:
        """Get trending items."""
        trending_items = []
        for item in wardrobe:
            if any(style in item.style for style in trendingStyles):
                trending_items.append(item)
        return trending_items

    def _get_liked_items(self, likedOutfits: List[str], wardrobe: List[ClothingItem]) -> List[ClothingItem]:
        """Get liked items."""
        liked_items = []
        for item in wardrobe:
            if item.id in likedOutfits:
                liked_items.append(item)
        return liked_items

    def _determine_season(self, temperature: float, occasion: str) -> str:
        """Determine the season based on temperature and occasion."""
        if temperature < 50:
            return "Winter"
        elif temperature < 65:
            return "Fall"
        elif temperature < 80:
            return "Spring"
        else:
            return "Summer" 