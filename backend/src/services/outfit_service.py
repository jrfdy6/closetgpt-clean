from typing import List, Optional, Dict, Any, Union
from ..config.firebase import db
from ..types.outfit import Outfit, OutfitPiece, OutfitGeneratedOutfit, OutfitGenerationRequest
from ..types.wardrobe import ClothingType, ClothingItem, Season, StyleTag, Color
from ..types.outfit_rules import get_weather_rule, get_occasion_rule, LayeringRule, ClothingType as RuleClothingType, get_mood_rule
from ..types.weather import WeatherData
from ..types.profile import UserProfile
from ..types.style_engine import Material
import random
import time
import uuid
from ..utils.pairability import average_pairability

class OutfitService:
    def __init__(self):
        self.db = db
        self.collection = self.db.collection('outfits')
        self.wardrobe_collection = self.db.collection('wardrobe')

    def to_dict_recursive(self, obj, depth=0, visited=None):
        """Recursively convert Pydantic models to dictionaries for Firestore serialization."""
        # Prevent infinite recursion
        if depth > 10:
            return str(obj)
        
        if visited is None:
            visited = set()
        
        # Prevent circular references
        obj_id = id(obj)
        if obj_id in visited:
            return str(obj)
        visited.add(obj_id)
        
        try:
            if hasattr(obj, 'dict'):
                # Pydantic model
                return obj.dict()
            elif isinstance(obj, dict):
                # Dictionary - recursively convert values
                return {key: self.to_dict_recursive(value, depth + 1, visited) for key, value in obj.items()}
            elif isinstance(obj, list):
                # List - recursively convert items
                return [self.to_dict_recursive(item, depth + 1, visited) for item in obj]
            elif hasattr(obj, '__dict__') and not isinstance(obj, (str, int, float, bool, type(None))):
                # Object with __dict__ - convert to dict, but be careful
                try:
                    return {key: self.to_dict_recursive(value, depth + 1, visited) 
                           for key, value in obj.__dict__.items() 
                           if not key.startswith('_')}  # Skip private attributes
                except:
                    return str(obj)
            else:
                # Primitive type - return as is
                return obj
        except Exception as e:
            # If anything goes wrong, return string representation
            return str(obj)

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
            'metadata': new_data.get('metadata', {}),
            # Add new tracking fields with default values
            'wasSuccessful': new_data.get('wasSuccessful', True),
            'baseItemId': new_data.get('baseItemId', None),
            'validationErrors': new_data.get('validationErrors', []),
            'userFeedback': new_data.get('userFeedback', None)
        }
        
        new_data.update(required_fields)
        
        return new_data

    def _get_layering_rule(self, temperature: float) -> LayeringRule:
        """Get the appropriate layering rule based on temperature."""
        return get_weather_rule(temperature)

    def _select_items_for_layering(self, wardrobe: List[ClothingItem], layering_rule: LayeringRule, 
                                 occasion: str, style: Optional[str] = None) -> List[ClothingItem]:
        """Select items that meet layering requirements for the given temperature."""
        selected_items = []
        required_layers = layering_rule.required_layers
        # Convert layer_types to string values for comparison
        layer_types = [lt.value if hasattr(lt, 'value') else str(lt) for lt in layering_rule.layer_types]
        material_preferences = layering_rule.material_preferences
        
        print(f"DEBUG: _select_items_for_layering - Required layers: {required_layers}")
        print(f"DEBUG: _select_items_for_layering - Layer types: {layer_types}")
        print(f"DEBUG: _select_items_for_layering - Material preferences: {material_preferences}")
        print(f"DEBUG: _select_items_for_layering - Wardrobe item types: {[item.type for item in wardrobe]}")
        
        # Group wardrobe items by type for easier selection
        items_by_type = {}
        for item in wardrobe:
            item_type_str = item.type.value if hasattr(item.type, 'value') else str(item.type)
            if item_type_str not in items_by_type:
                items_by_type[item_type_str] = []
            items_by_type[item_type_str].append(item)
        
        # Select items for each required layer
        for layer_index in range(required_layers):
            layer_type = layer_types[layer_index] if layer_index < len(layer_types) else layer_types[0]
            
            print(f"DEBUG: _select_items_for_layering - Selecting for layer {layer_index + 1}: {layer_type} (type: {type(layer_type)})")
            
            # Get items of the required type
            available_items = items_by_type.get(layer_type, [])
            print(f"DEBUG: _select_items_for_layering - Available items for {layer_type}: {[item.name for item in available_items]}")
            
            if not available_items:
                print(f"DEBUG: _select_items_for_layering - No items available for type {layer_type}")
                continue
            
            # Filter by material preferences
            preferred_items = []
            for item in available_items:
                # Check if item has material information
                if hasattr(item, 'material') and item.material:
                    if item.material in material_preferences:
                        preferred_items.append((item, 2))  # Higher priority for preferred materials
                    else:
                        preferred_items.append((item, 1))  # Lower priority for non-preferred materials
                else:
                    # If no material info, give medium priority
                    preferred_items.append((item, 1))
            
            # Sort by priority and select the best item
            preferred_items.sort(key=lambda x: x[1], reverse=True)
            
            if preferred_items:
                best_item = preferred_items[0][0]
                print(f"DEBUG: _select_items_for_layering - Selected {best_item.name} for layer {layer_index + 1}")
                selected_items.append(best_item)
                
                # Remove the selected item from available items to avoid duplicates
                available_items.remove(best_item)
        
        # If we don't have enough layers, try to add additional items
        if len(selected_items) < required_layers:
            print(f"DEBUG: _select_items_for_layering - Only got {len(selected_items)} layers, need {required_layers}")
            
            # Try to add additional items that could work as layers
            for item in wardrobe:
                item_type_str = item.type.value if hasattr(item.type, 'value') else str(item.type)
                if item not in selected_items and item_type_str in layer_types:
                    print(f"DEBUG: _select_items_for_layering - Adding additional layer: {item.name} (type: {item_type_str})")
                    selected_items.append(item)
                    if len(selected_items) >= required_layers:
                        break
        
        print(f"DEBUG: _select_items_for_layering - Final selected items: {[item.name for item in selected_items]}")
        return selected_items

    def _validate_layering_compliance(self, items: List[ClothingItem], layering_rule: LayeringRule) -> Dict[str, Any]:
        """Validate if the selected items meet layering requirements."""
        validation = {
            "is_compliant": True,
            "layer_count": 0,
            "missing_layers": [],
            "suggestions": []
        }
        # Convert layer_types to string values for comparison
        layer_types = [lt.value if hasattr(lt, 'value') else str(lt) for lt in layering_rule.layer_types]
        print(f"DEBUG: _validate_layering_compliance - Layer types: {layer_types}")
        print(f"DEBUG: _validate_layering_compliance - Selected item types: {[item.type for item in items]}")
        for item in items:
            item_type_str = item.type.value if hasattr(item.type, 'value') else str(item.type)
            print(f"DEBUG: _validate_layering_compliance - Comparing item.type: {item_type_str} (type: {type(item.type)}) with layer_types: {layer_types}")
            if item_type_str in layer_types:
                validation["layer_count"] += 1
        
        # Check if we have enough layers
        if validation["layer_count"] < layering_rule.required_layers:
            validation["is_compliant"] = False
            missing_count = layering_rule.required_layers - validation["layer_count"]
            validation["missing_layers"].append(f"Need {missing_count} more layer(s)")
            validation["suggestions"].append(f"Add {missing_count} more clothing item(s) for proper layering")
        
        # Check material preferences
        material_matches = 0
        for item in items:
            if hasattr(item, 'material') and item.material in layering_rule.material_preferences:
                material_matches += 1
        
        if material_matches < len(items) * 0.5:  # At least 50% should match preferred materials
            validation["suggestions"].append("Consider items with preferred materials for better temperature regulation")
        
        return validation

    def _enhance_outfit_with_layering_insights(self, items: List[ClothingItem], layering_rule: LayeringRule, 
                                             weather: WeatherData) -> Dict[str, Any]:
        """Generate layering-specific insights and recommendations."""
        insights = {
            "layering_analysis": {
                "temperature_range": f"{layering_rule.min_temperature}°F - {layering_rule.max_temperature}°F",
                "required_layers": layering_rule.required_layers,
                "actual_layers": len([item for item in items if item.type in layering_rule.layer_types]),
                "layer_types": [item.type for item in items if item.type in layering_rule.layer_types],
                "material_coverage": 0,
                "layering_notes": layering_rule.notes
            },
            "temperature_appropriateness": "optimal",
            "comfort_prediction": "high",
            "style_coherence": "good"
        }
        
        # Calculate material coverage
        preferred_materials = set(layering_rule.material_preferences)
        item_materials = []
        for item in items:
            if hasattr(item, 'material') and item.material:
                item_materials.append(item.material)
        
        if item_materials:
            material_matches = sum(1 for material in item_materials if material in preferred_materials)
            insights["layering_analysis"]["material_coverage"] = material_matches / len(item_materials)
        
        # Adjust temperature appropriateness based on layering
        actual_layers = insights["layering_analysis"]["actual_layers"]
        if actual_layers < layering_rule.required_layers:
            insights["temperature_appropriateness"] = "insufficient"
            insights["comfort_prediction"] = "low"
        elif actual_layers > layering_rule.required_layers + 1:
            insights["temperature_appropriateness"] = "excessive"
            insights["comfort_prediction"] = "medium"
        
        return insights

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
        baseItem: Optional[ClothingItem] = None,
        mood: Optional[str] = None
    ) -> OutfitGeneratedOutfit:
        """Generate a new outfit based on context and preferences with enhanced layering logic."""
        # Initialize tracking variables
        was_successful = True
        validation_errors = []
        base_item_id = baseItem.id if baseItem else None
        
        try:
            print("✅ Step 1: Starting generate_outfit")
            
            # Get rules for the occasion and weather
            occasion_rule = get_occasion_rule(occasion)
            layering_rule = self._get_layering_rule(weather.temperature)
            
            # Get mood rule if mood is specified
            mood_rule = None
            if mood:
                mood_rule = get_mood_rule(mood)
            
            print(f"DEBUG: generate_outfit - Starting with {len(wardrobe)} wardrobe items")
            print(f"DEBUG: generate_outfit - Temperature: {weather.temperature}°F, Layering rule: {layering_rule.required_layers} layers")
            print(f"DEBUG: generate_outfit - Occasion: {occasion}, Style: {style}, Mood: {mood}")
            print(f"DEBUG: generate_outfit - User body type: {user_profile.bodyType}, Skin tone: {user_profile.skinTone}")
            print(f"DEBUG: generate_outfit - Base item: {base_item_id}")
            
            # Step 1: Compose outfit with proper limits using the new composition logic
            print("✅ Step 2: Starting _compose_outfit_with_limits")
            selected_items = self._compose_outfit_with_limits(
                wardrobe=wardrobe,
                occasion=occasion,
                style=style,
                mood_rule=mood_rule,
                user_profile=user_profile,
                layering_rule=layering_rule,
                trendingStyles=trendingStyles,
                likedOutfits=likedOutfits,
                baseItem=baseItem
            )
            print("✅ Step 2: Finished _compose_outfit_with_limits")
            print(f"🔍 selected_items: {selected_items}")
            print(f"🔍 selected_items type: {type(selected_items)}")
            print(f"🔍 selected_items length: {len(selected_items) if selected_items else 'None'}")
            
            # Validate that we have items selected
            if not selected_items:
                validation_errors.append("No items were selected for the outfit")
                was_successful = False
                print(f"DEBUG: generate_outfit - No items selected, marking as failed")
            
            print("✅ Step 3: Starting validation checks")
            
            # Step 2: Validate layering compliance
            print("🔍 Before _validate_layering_compliance")
            print(f"🔍 selected_items: {selected_items}")
            print(f"🔍 layering_rule: {layering_rule}")
            layering_validation = self._validate_layering_compliance(selected_items, layering_rule)
            print("✅ Step 3: Finished _validate_layering_compliance")
            print(f"🔍 layering_validation: {layering_validation}")
            
            if not layering_validation["is_compliant"]:
                # Use the correct keys from the validation dict
                missing_layers = layering_validation.get('missing_layers', [])
                suggestions = layering_validation.get('suggestions', [])
                validation_errors.append(f"Layering requirements not met: {missing_layers}; {suggestions}")
                print(f"DEBUG: generate_outfit - Layering validation failed: {missing_layers}; {suggestions}")
            
            # Step 3: Generate outfit insights and analysis
            print("✅ Step 4: Starting _enhance_outfit_with_layering_insights")
            layering_insights = self._enhance_outfit_with_layering_insights(selected_items, layering_rule, weather)
            print("✅ Step 4: Finished _enhance_outfit_with_layering_insights")
            print(f"🔍 layering_insights: {layering_insights}")
            
            # Step 4: Calculate scores and generate content
            print("✅ Step 5: Starting score calculations")
            print("🔍 Before _calculate_pairability_score_enhanced")
            pairability_score = self._calculate_pairability_score_enhanced(selected_items)
            print(f"🔍 pairability_score: {pairability_score}")
            
            print("🔍 Before _calculate_style_compliance_enhanced")
            style_compliance = self._calculate_style_compliance_enhanced(selected_items, style)
            print(f"🔍 style_compliance: {style_compliance}")
            
            print("🔍 Before _calculate_weather_appropriateness_enhanced")
            weather_appropriateness = self._calculate_weather_appropriateness_enhanced(selected_items, weather)
            print(f"🔍 weather_appropriateness: {weather_appropriateness}")
            
            print("🔍 Before _calculate_occasion_appropriateness_enhanced")
            occasion_appropriateness = self._calculate_occasion_appropriateness_enhanced(selected_items, occasion)
            print(f"🔍 occasion_appropriateness: {occasion_appropriateness}")
            print("✅ Step 5: Finished score calculations")
            
            # Step 5: Generate outfit content
            print("✅ Step 6: Starting content generation")
            print("🔍 Before _calculate_color_harmony_enhanced")
            color_harmony = self._calculate_color_harmony_enhanced(selected_items)
            print(f"🔍 color_harmony: {color_harmony}")
            
            print("🔍 Before _generate_style_notes_enhanced")
            style_notes = self._generate_style_notes_enhanced(selected_items, occasion, style)
            print(f"🔍 style_notes: {style_notes}")
            
            print("🔍 Before _generate_style_tags_enhanced")
            style_tags = self._generate_style_tags_enhanced(selected_items, style)
            print(f"🔍 style_tags: {style_tags}")
            print("✅ Step 6: Finished content generation")
            
            # Step 6: Create outfit pieces
            print("✅ Step 7: Starting outfit pieces creation")
            outfit_pieces = []
            for i, item in enumerate(selected_items):
                print(f"🔍 Processing item {i+1}: {item.name}")
                print(f"🔍 item.dominantColors: {item.dominantColors}")
                print(f"🔍 item.style: {item.style}")
                print(f"🔍 item.occasion: {item.occasion}")
                
                reason = self._generate_item_reason_enhanced(item, occasion, style)
                print(f"🔍 reason: {reason}")
                
                # Safe handling of dominantColors
                dominant_colors = []
                if item.dominantColors:
                    for color in item.dominantColors:
                        if hasattr(color, 'name'):
                            dominant_colors.append(color.name)
                        else:
                            dominant_colors.append(str(color))
                
                piece = OutfitPiece(
                    itemId=item.id,
                    name=item.name,
                    type=item.type,
                    reason=reason,
                    dominantColors=dominant_colors,
                    style=item.style or [],
                    occasion=item.occasion or [],
                    imageUrl=item.imageUrl or ""
                )
                outfit_pieces.append(piece)
                print(f"🔍 Created piece: {piece.name}")
            print("✅ Step 7: Finished outfit pieces creation")
            
            # Step 7: Create outfit data
            print("✅ Step 8: Starting outfit_data creation")
            outfit_data = {
                "id": str(uuid.uuid4()),
                "name": f"{style or 'Stylish'} {occasion} Outfit",
                "description": f"A {style or 'stylish'} outfit for {occasion} with {layering_rule.required_layers} layers for {weather.temperature}°F weather",
                "items": selected_items,  # Save original ClothingItem objects
                "explanation": f"Generated outfit with {len(selected_items)} items for {occasion} occasion",
                "pieces": [piece.dict() for piece in outfit_pieces],
                "styleTags": style_tags,
                "colorHarmony": color_harmony,
                "styleNotes": style_notes,
                "occasion": occasion,
                "season": self._determine_season(weather.temperature, occasion),
                "style": style or "Stylish",
                "createdAt": int(time.time()),
                "updatedAt": int(time.time()),
                "wasSuccessful": was_successful,
                "baseItemId": base_item_id,
                "validationErrors": validation_errors,
                "userFeedback": None,  # Will be populated when user provides feedback
                "metadata": {
                    "pairabilityScore": pairability_score,
                    "styleCompliance": style_compliance,
                    "weatherAppropriateness": weather_appropriateness,
                    "occasionAppropriateness": occasion_appropriateness,
                    "enhancedAnalysis": True,
                    "clipInsights": self._extract_clip_insights(selected_items),
                    "styleCompatibility": self._get_style_compatibility_summary(selected_items),
                    "layeringAnalysis": layering_insights,
                    "layeringCompliance": layering_validation,
                    "temperatureRange": f"{layering_rule.min_temperature}°F - {layering_rule.max_temperature}°F",
                    "requiredLayers": layering_rule.required_layers,
                    "actualLayers": layering_validation["layer_count"],
                    "moodConsideration": mood,
                    "bodyTypeConsideration": user_profile.bodyType,
                    "skinToneConsideration": user_profile.skinTone
                }
            }
            print("✅ Step 8: Finished outfit_data creation")
            print(f"🔍 outfit_data keys: {list(outfit_data.keys())}")

            # Save to Firestore
            print("✅ Step 9: Starting Firestore save")
            doc_ref = self.collection.document(outfit_data["id"])
            # Convert the outfit data to dict for Firestore storage
            firestore_data = self.to_dict_recursive(outfit_data)
            doc_ref.set(firestore_data)
            print("✅ Step 9: Finished Firestore save")
            
            print(f"DEBUG: generate_outfit - Outfit saved with ID: {outfit_data['id']}")
            print(f"DEBUG: generate_outfit - Success: {was_successful}")
            print(f"DEBUG: generate_outfit - Base item ID: {base_item_id}")
            print(f"DEBUG: generate_outfit - Validation errors: {validation_errors}")
            print(f"DEBUG: generate_outfit - Layering compliance: {layering_validation['is_compliant']}")
            
            # Debug: Print the outfit_data dict to see what's in it
            print(f"DEBUG: generate_outfit - outfit_data keys: {list(outfit_data.keys())}")
            print(f"DEBUG: generate_outfit - wasSuccessful in dict: {outfit_data.get('wasSuccessful', 'NOT FOUND')}")
            print(f"DEBUG: generate_outfit - baseItemId in dict: {outfit_data.get('baseItemId', 'NOT FOUND')}")
            print(f"DEBUG: generate_outfit - validationErrors in dict: {outfit_data.get('validationErrors', 'NOT FOUND')}")
            
            # Debug: Print the full outfit_data dict
            print("DEBUG: generate_outfit - Full outfit_data dict:")
            import json
            print(json.dumps(outfit_data, indent=2, default=str))
            
            print("✅ Step 10: Creating OutfitGeneratedOutfit object")
            result = OutfitGeneratedOutfit(**outfit_data)
            print("✅ Step 10: Finished creating OutfitGeneratedOutfit object")
            print("✅ SUCCESS: generate_outfit completed successfully!")
            
            return result
            
        except Exception as e:
            print(f"❌ ERROR in generate_outfit: {e}")
            import traceback
            print(f"❌ TRACEBACK:")
            print(traceback.format_exc())
            
            # Mark as failed and capture the error
            was_successful = False
            validation_errors.append(f"Generation failed: {str(e)}")
            
            # Create a minimal outfit data for failed generation
            outfit_data = {
                "id": str(uuid.uuid4()),
                "name": f"Failed {occasion} Outfit",
                "description": f"Failed to generate outfit for {occasion}",
                "items": [],
                "explanation": f"Outfit generation failed: {str(e)}",
                "pieces": [],
                "styleTags": [],
                "colorHarmony": "",
                "styleNotes": "",
                "occasion": occasion,
                "season": self._determine_season(weather.temperature, occasion),
                "style": style or "Unknown",
                "createdAt": int(time.time()),
                "updatedAt": int(time.time()),
                "wasSuccessful": was_successful,
                "baseItemId": base_item_id,
                "validationErrors": validation_errors,
                "userFeedback": None,
                "metadata": {
                    "error": str(e),
                    "enhancedAnalysis": False
                }
            }
            
            # Save failed outfit to Firestore for tracking
            try:
                doc_ref = self.collection.document(outfit_data["id"])
                # Convert the outfit data to dict for Firestore storage
                firestore_data = self.to_dict_recursive(outfit_data)
                doc_ref.set(firestore_data)
                print(f"DEBUG: generate_outfit - Failed outfit saved with ID: {outfit_data['id']}")
            except Exception as save_error:
                print(f"Error saving failed outfit: {save_error}")
            
            return OutfitGeneratedOutfit(**outfit_data)

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
        """Get essential items for the given occasion using enhanced analysis and outfit rules."""
        essential_items = []
        print(f"DEBUG: _get_essential_items_enhanced - Looking for {occasion} items from {len(wardrobe)} wardrobe items")
        
        # Get the occasion rule to know what item types are required
        from ..types.outfit_rules import get_occasion_rule
        occasion_rule = get_occasion_rule(occasion)
        required_item_types = []
        if occasion_rule:
            required_item_types = [item_type.value.lower() for item_type in occasion_rule.required_items]
            print(f"DEBUG: _get_essential_items_enhanced - Required item types for {occasion}: {required_item_types}")
        else:
            print(f"DEBUG: _get_essential_items_enhanced - No occasion rule found for {occasion}")
        
        # First, try to find items that match the occasion
        occasion_matching_items = []
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
                    print(f"DEBUG:   ✓ Item added to occasion matching items")
                    occasion_matching_items.append(item)
                else:
                    print(f"DEBUG:   ✗ Item filtered out by enhanced occasions")
            else:
                print(f"DEBUG:   ✗ Item doesn't match occasion {occasion}")
        
        # Now ensure we have at least one item of each required type
        selected_by_type = {}
        for item in occasion_matching_items:
            item_type = item.type.lower()
            for required_type in required_item_types:
                if required_type in item_type and required_type not in selected_by_type:
                    selected_by_type[required_type] = item
                    essential_items.append(item)
                    print(f"DEBUG: _get_essential_items_enhanced - Added {required_type}: {item.name}")
                    break
        
        # If we don't have all required types, add items that match the required types
        missing_types = set(required_item_types) - set(selected_by_type.keys())
        if missing_types:
            print(f"DEBUG: _get_essential_items_enhanced - Missing required types: {missing_types}")
            for missing_type in missing_types:
                for item in wardrobe:
                    if item not in essential_items:  # Don't add duplicates
                        item_type = item.type.lower()
                        if missing_type in item_type:
                            essential_items.append(item)
                            print(f"DEBUG: _get_essential_items_enhanced - Added missing {missing_type}: {item.name}")
                            break
        
        print(f"DEBUG: _get_essential_items_enhanced - Found {len(essential_items)} essential items")
        print(f"DEBUG: _get_essential_items_enhanced - Selected items: {[item.name for item in essential_items]}")
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
            return "winter"
        elif temperature < 70:
            return "spring"
        elif temperature < 85:
            return "summer"
        else:
            return "fall"

    def _filter_items_by_mood(self, items: List[ClothingItem], mood_rule) -> List[ClothingItem]:
        """Filter items based on mood requirements."""
        filtered_items = []
        
        for item in items:
            # Check if item's colors match mood color palette
            item_colors = [getattr(color, 'name', str(color)).lower() for color in item.dominantColors]
            mood_colors = [color.lower() for color in mood_rule.color_palette]
            
            # Check if item's style matches mood style preferences
            item_styles = [style.lower() for style in item.style]
            mood_styles = [style.lower() for style in mood_rule.style_preferences]
            
            # Check if item's material matches mood material preferences
            item_material = getattr(item, 'material', None)
            mood_materials = [material.value if hasattr(material, 'value') else str(material) for material in mood_rule.material_preferences]
            
            # Score the item based on mood compatibility
            color_score = sum(1 for color in item_colors if any(mood_color in color or color in mood_color for mood_color in mood_colors))
            style_score = sum(1 for style in item_styles if any(mood_style in style or style in mood_style for mood_style in mood_styles))
            material_score = 1 if item_material and str(item_material).lower() in [m.lower() for m in mood_materials] else 0
            
            total_score = color_score + style_score + material_score
            
            # Include item if it has some mood compatibility
            if total_score > 0:
                filtered_items.append(item)
        
        # If no items match mood, return original items
        if not filtered_items:
            print(f"DEBUG: _filter_items_by_mood - No items match mood {mood_rule.mood}, returning original items")
            return items
        
        return filtered_items

    def _filter_items_by_body_and_skin(self, items: List[ClothingItem], user_profile: UserProfile) -> List[ClothingItem]:
        """Filter items based on body type and skin tone compatibility."""
        filtered_items = []
        
        for item in items:
            # Check body type compatibility
            body_compatible = self._check_body_type_compatibility(item, user_profile.bodyType)
            
            # Check skin tone compatibility
            skin_compatible = self._check_skin_tone_compatibility(item, user_profile.skinTone)
            
            # Include item if it's compatible with both body type and skin tone
            if body_compatible and skin_compatible:
                filtered_items.append(item)
        
        # If no items match body/skin criteria, return original items
        if not filtered_items:
            print(f"DEBUG: _filter_items_by_body_and_skin - No items match body type {user_profile.bodyType} or skin tone {user_profile.skinTone}, returning original items")
            return items
        
        return filtered_items

    def _check_body_type_compatibility(self, item: ClothingItem, body_type: str) -> bool:
        """Check if an item is compatible with the user's body type."""
        if not body_type or body_type == "average":
            return True  # Default to compatible if no specific body type
        
        # Get body type compatibility from item metadata
        if hasattr(item, 'metadata') and item.metadata:
            metadata = item.metadata.dict() if hasattr(item.metadata, 'dict') else item.metadata
            
            # Check visual attributes for body type compatibility
            if 'visualAttributes' in metadata:
                visual_attrs = metadata['visualAttributes']
                # Add null check for visual_attrs
                if visual_attrs is not None and 'bodyTypeCompatibility' in visual_attrs:
                    body_comp = visual_attrs['bodyTypeCompatibility']
                    if isinstance(body_comp, dict):
                        # Check if the body type is in the recommended fits
                        recommended_fits = body_comp.get('recommendedFits', {})
                        if body_type in recommended_fits:
                            return True
                        
                        # Check if the body type is in the style recommendations
                        style_recs = body_comp.get('styleRecommendations', {})
                        if body_type in style_recs:
                            return True
        
        # Default to compatible if no specific compatibility data
        return True

    def _check_skin_tone_compatibility(self, item: ClothingItem, skin_tone: str) -> bool:
        """Check if an item is compatible with the user's skin tone."""
        if not skin_tone:
            return True  # Default to compatible if no specific skin tone
        
        # Get skin tone compatibility from item metadata
        if hasattr(item, 'metadata') and item.metadata:
            metadata = item.metadata.dict() if hasattr(item.metadata, 'dict') else item.metadata
            
            # Check visual attributes for skin tone compatibility
            if 'visualAttributes' in metadata:
                visual_attrs = metadata['visualAttributes']
                # Add null check for visual_attrs
                if visual_attrs is not None and 'skinToneCompatibility' in visual_attrs:
                    skin_comp = visual_attrs['skinToneCompatibility']
                    if isinstance(skin_comp, dict):
                        # Check if the skin tone is in the compatible colors
                        compatible_colors = skin_comp.get('compatibleColors', {})
                        if skin_tone in compatible_colors:
                            return True
                        
                        # Check if the skin tone is in the recommended palettes
                        recommended_palettes = skin_comp.get('recommendedPalettes', {})
                        if skin_tone in recommended_palettes:
                            return True
        
        # Default to compatible if no specific compatibility data
        return True

    def _compose_outfit_with_limits(self, wardrobe: List[ClothingItem], occasion: str, style: Optional[str], 
                                   mood_rule, user_profile: UserProfile, layering_rule: LayeringRule,
                                   trendingStyles: List[str], likedOutfits: List[str], 
                                   baseItem: Optional[ClothingItem] = None) -> List[ClothingItem]:
        """Compose an outfit with proper limits to create a cohesive look."""
        selected_items = []
        
        # Step 1: Start with base item if provided
        if baseItem:
            selected_items.append(baseItem)
            print(f"DEBUG: _compose_outfit_with_limits - Added base item: {baseItem.name}")
        
        # Step 2: Add essential items for the occasion (limit to 2-3 items)
        if not baseItem:
            print(f"DEBUG: _compose_outfit_with_limits - Looking for essential items")
            essential_items = self._get_essential_items_enhanced(occasion, wardrobe, style)
            print(f"DEBUG: _compose_outfit_with_limits - Found {len(essential_items)} essential items")
            
            # Limit essential items to 2-3 most important pieces
            essential_items = essential_items[:3]  # Take first 3
            for item in essential_items:
                if item not in selected_items:
                    selected_items.append(item)
                    print(f"DEBUG: _compose_outfit_with_limits - Added essential item: {item.name}")
        
        # Step 3: Add style items (limit to 2-3 items)
        if style:
            print(f"DEBUG: _compose_outfit_with_limits - Looking for style items: {style}")
            style_items = self._get_style_items_enhanced(style, wardrobe)
            print(f"DEBUG: _compose_outfit_with_limits - Found {len(style_items)} style items")
            
            # Limit style items to 2-3 pieces
            style_items = style_items[:3]  # Take first 3
            for item in style_items:
                if item not in selected_items:
                    selected_items.append(item)
                    print(f"DEBUG: _compose_outfit_with_limits - Added style item: {item.name}")
        
        # Step 4: Apply mood-based filtering
        if mood_rule and selected_items:
            print(f"DEBUG: _compose_outfit_with_limits - Applying mood rule: {mood_rule.mood}")
            mood_filtered_items = self._filter_items_by_mood(selected_items, mood_rule)
            print(f"DEBUG: _compose_outfit_with_limits - Mood filtering: {len(selected_items)} -> {len(mood_filtered_items)} items")
            selected_items = mood_filtered_items
        
        # Step 5: Apply body type and skin tone considerations
        if selected_items:
            print(f"DEBUG: _compose_outfit_with_limits - Applying body type and skin tone considerations")
            body_skin_filtered_items = self._filter_items_by_body_and_skin(selected_items, user_profile)
            print(f"DEBUG: _compose_outfit_with_limits - Body/skin filtering: {len(selected_items)} -> {len(body_skin_filtered_items)} items")
            selected_items = body_skin_filtered_items
        
        # Step 6: Add trending items (limit to 1-2 items)
        if trendingStyles and len(selected_items) < 5:  # Only add if we have room
            print(f"DEBUG: _compose_outfit_with_limits - Looking for trending items: {trendingStyles}")
            trending_items = self._get_trending_items(trendingStyles, wardrobe)
            print(f"DEBUG: _compose_outfit_with_limits - Found {len(trending_items)} trending items")
            
            # Limit trending items to 1-2 pieces
            trending_items = trending_items[:2]  # Take first 2
            for item in trending_items:
                if item not in selected_items and len(selected_items) < 5:
                    selected_items.append(item)
                    print(f"DEBUG: _compose_outfit_with_limits - Added trending item: {item.name}")
        
        # Step 7: Add liked items (limit to 1-2 items)
        if likedOutfits and len(selected_items) < 5:  # Only add if we have room
            print(f"DEBUG: _compose_outfit_with_limits - Looking for liked items: {likedOutfits}")
            liked_items = self._get_liked_items(likedOutfits, wardrobe)
            print(f"DEBUG: _compose_outfit_with_limits - Found {len(liked_items)} liked items")
            
            # Limit liked items to 1-2 pieces
            liked_items = liked_items[:2]  # Take first 2
            for item in liked_items:
                if item not in selected_items and len(selected_items) < 5:
                    selected_items.append(item)
                    print(f"DEBUG: _compose_outfit_with_limits - Added liked item: {item.name}")
        
        # Step 8: Ensure we have a proper outfit structure
        selected_items = self._ensure_outfit_structure(selected_items, wardrobe, layering_rule)
        
        # Step 9: Limit total items to layering rule requirements
        max_items = min(layering_rule.required_layers + 2, 5)  # Cap at 5 items maximum, allow 2 extra for accessories
        if len(selected_items) > max_items:
            selected_items = selected_items[:max_items]
            print(f"DEBUG: _compose_outfit_with_limits - Limited to {max_items} items based on layering rule")
        
        print(f"DEBUG: _compose_outfit_with_limits - Final outfit composition: {len(selected_items)} items")
        print(f"DEBUG: _compose_outfit_with_limits - Selected items: {[item.name for item in selected_items]}")
        
        return selected_items
    
    def _ensure_outfit_structure(self, selected_items: List[ClothingItem], wardrobe: List[ClothingItem], 
                                layering_rule: LayeringRule) -> List[ClothingItem]:
        """Ensure the outfit has a proper structure (top, bottom, shoes, etc.)."""
        if not selected_items:
            return selected_items
        
        # Define required categories for a complete outfit
        required_categories = {
            'top': ['shirt', 't-shirt', 'blouse', 'sweater', 'jacket', 'coat'],
            'bottom': ['pants', 'jeans', 'shorts', 'skirt'],
            'shoes': ['shoes', 'sneakers', 'boots', 'sandals'],
            'accessory': ['belt', 'watch', 'necklace', 'bracelet', 'earrings']
        }
        
        # Check what categories we have
        current_categories = set()
        for item in selected_items:
            item_type = item.type.lower()
            for category, types in required_categories.items():
                if any(t in item_type for t in types):
                    current_categories.add(category)
                    break
        
        # Add missing essential categories if we have room
        missing_categories = set(required_categories.keys()) - current_categories
        max_additional = (layering_rule.required_layers + 2) - len(selected_items)  # Allow 2 extra for accessories
        
        for category in list(missing_categories)[:max_additional]:
            # Find items in the missing category
            category_items = []
            for item in wardrobe:
                if item not in selected_items:
                    item_type = item.type.lower()
                    category_types = required_categories[category]
                    if any(t in item_type for t in category_types):
                        category_items.append(item)
            
            # Add the best matching item from this category
            if category_items:
                best_item = category_items[0]  # Take the first one for now
                selected_items.append(best_item)
                print(f"DEBUG: _ensure_outfit_structure - Added missing {category}: {best_item.name}")
        
        return selected_items 

    async def update_outfit_feedback(self, outfit_id: str, feedback: Dict[str, Any]) -> bool:
        """Update user feedback for an outfit."""
        try:
            # Validate feedback structure
            required_fields = ["liked", "rating"]
            for field in required_fields:
                if field not in feedback:
                    raise ValueError(f"Missing required feedback field: {field}")
            
            # Validate rating range
            rating = feedback.get("rating")
            if not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
                raise ValueError("Rating must be a number between 1 and 5")
            
            # Validate liked field
            liked = feedback.get("liked")
            if not isinstance(liked, bool):
                raise ValueError("Liked field must be a boolean")
            
            # Get the outfit document
            doc_ref = self.collection.document(outfit_id)
            doc = doc_ref.get()
            
            if not doc.exists:
                raise ValueError(f"Outfit with ID {outfit_id} not found")
            
            # Update the outfit with feedback
            feedback_data = {
                "liked": liked,
                "rating": rating,
                "comment": feedback.get("comment", ""),
                "timestamp": int(time.time())
            }
            
            doc_ref.update({
                "userFeedback": feedback_data,
                "updatedAt": int(time.time())
            })
            
            print(f"DEBUG: update_outfit_feedback - Feedback updated for outfit {outfit_id}")
            print(f"DEBUG: update_outfit_feedback - Feedback: {feedback_data}")
            
            return True
            
        except Exception as e:
            print(f"Error updating outfit feedback: {e}")
            return False

    async def get_outfit_analytics(self, user_id: str = None, start_date: int = None, end_date: int = None) -> Dict[str, Any]:
        """Get analytics about outfit generation success/failure patterns."""
        try:
            # Build query
            query = self.collection
            
            if user_id:
                # Note: This assumes outfits have a user_id field
                # You may need to adjust based on your data structure
                query = query.where("user_id", "==", user_id)
            
            if start_date:
                query = query.where("createdAt", ">=", start_date)
            
            if end_date:
                query = query.where("createdAt", "<=", end_date)
            
            # Get all outfits
            docs = query.stream()
            
            total_outfits = 0
            successful_outfits = 0
            failed_outfits = 0
            base_item_outfits = 0
            validation_errors = {}
            feedback_stats = {
                "total_feedback": 0,
                "positive_feedback": 0,
                "average_rating": 0,
                "total_rating": 0
            }
            
            for doc in docs:
                data = doc.to_dict()
                total_outfits += 1
                
                # Track success/failure
                was_successful = data.get("wasSuccessful", True)
                if was_successful:
                    successful_outfits += 1
                else:
                    failed_outfits += 1
                
                # Track base item usage
                if data.get("baseItemId"):
                    base_item_outfits += 1
                
                # Track validation errors
                errors = data.get("validationErrors", [])
                for error in errors:
                    validation_errors[error] = validation_errors.get(error, 0) + 1
                
                # Track feedback
                user_feedback = data.get("userFeedback")
                if user_feedback:
                    feedback_stats["total_feedback"] += 1
                    if user_feedback.get("liked", False):
                        feedback_stats["positive_feedback"] += 1
                    
                    rating = user_feedback.get("rating", 0)
                    if rating > 0:
                        feedback_stats["total_rating"] += rating
            
            # Calculate averages
            if feedback_stats["total_feedback"] > 0:
                feedback_stats["average_rating"] = feedback_stats["total_rating"] / feedback_stats["total_feedback"]
            
            analytics = {
                "total_outfits": total_outfits,
                "successful_outfits": successful_outfits,
                "failed_outfits": failed_outfits,
                "success_rate": (successful_outfits / total_outfits * 100) if total_outfits > 0 else 0,
                "base_item_outfits": base_item_outfits,
                "base_item_usage_rate": (base_item_outfits / total_outfits * 100) if total_outfits > 0 else 0,
                "validation_errors": validation_errors,
                "feedback_stats": feedback_stats
            }
            
            print(f"DEBUG: get_outfit_analytics - Generated analytics for {total_outfits} outfits")
            return analytics
            
        except Exception as e:
            print(f"Error getting outfit analytics: {e}")
            return {} 