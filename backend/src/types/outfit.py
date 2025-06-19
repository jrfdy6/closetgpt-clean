from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field
from .wardrobe import ClothingItem, ClothingType, Season, StyleTag, Color
from datetime import datetime
from pydantic import validator
from .profile import UserProfile
from .weather import WeatherData
import uuid
import time
from .style_types import StyleType

class OutfitPiece(BaseModel):
    itemId: str
    name: str
    type: str
    reason: str
    dominantColors: List[str]
    style: List[str]
    occasion: List[str]
    imageUrl: str

class OutfitContext(BaseModel):
    wardrobe: List[ClothingItem]
    weather: WeatherData
    occasion: str
    user_profile: UserProfile
    season: Optional[Season] = None
    baseItem: Optional[ClothingItem] = None
    likedOutfits: List[str] = []
    trendingStyles: List[str] = []
    style_profile: Optional[Dict[str, Any]] = None

    @validator('wardrobe', pre=True)
    def convert_wardrobe_colors(cls, v):
        if not isinstance(v, list):
            return v
        
        converted_items = []
        for item in v:
            if isinstance(item, dict):
                # Create a copy of the item to avoid modifying the original
                item_copy = item.copy()
                
                # Handle colorAnalysis in metadata
                if 'metadata' in item_copy and 'colorAnalysis' in item_copy['metadata']:
                    color_analysis = item_copy['metadata']['colorAnalysis']
                    
                    # Convert dominant colors
                    if 'dominant' in color_analysis:
                        color_analysis['dominant'] = [
                            {"name": color, "hex": "#000000", "rgb": [0, 0, 0]} 
                            if isinstance(color, str) else color 
                            for color in color_analysis['dominant']
                        ]
                    
                    # Convert matching colors
                    if 'matching' in color_analysis:
                        color_analysis['matching'] = [
                            {"name": color, "hex": "#000000", "rgb": [0, 0, 0]} 
                            if isinstance(color, str) else color 
                            for color in color_analysis['matching']
                        ]
                
                converted_items.append(item_copy)
            else:
                converted_items.append(item)
        
        return converted_items

    class Config:
        use_enum_values = True
        arbitrary_types_allowed = True

class Outfit(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    items: List[OutfitPiece]
    occasion: str
    season: str
    style: str
    styleTags: List[str]
    colorHarmony: str
    styleNotes: str
    createdAt: int = Field(default_factory=lambda: int(time.time()))
    updatedAt: int = Field(default_factory=lambda: int(time.time()))

class OutfitGeneratedOutfit(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    items: List[Union[str, ClothingItem]]  # Allow either strings (IDs) or full ClothingItem objects
    explanation: str
    pieces: List[OutfitPiece]
    styleTags: List[str]
    colorHarmony: str
    styleNotes: str
    occasion: str
    season: str
    style: str
    createdAt: int = Field(default_factory=lambda: int(time.time()))
    updatedAt: int = Field(default_factory=lambda: int(time.time()))
    metadata: Optional[Dict[str, Any]] = None

class OutfitGenerationRequest(BaseModel):
    occasion: str
    weather: WeatherData
    wardrobe: List[ClothingItem]
    user_profile: UserProfile
    likedOutfits: List[str]
    trendingStyles: List[str]
    preferences: Optional[Dict[str, Any]] = None
    outfitHistory: Optional[List[Dict[str, Any]]] = None
    randomSeed: Optional[float] = None
    season: Optional[str] = None
    style: Optional[str] = None
    baseItem: Optional[ClothingItem] = None

    @validator('wardrobe', pre=True)
    def validate_wardrobe_items(cls, v):
        if not isinstance(v, list):
            return v
        
        validated_items = []
        for item in v:
            if isinstance(item, dict):
                # Convert type to lowercase if it's a string
                if 'type' in item and isinstance(item['type'], str):
                    item['type'] = item['type'].lower()
                validated_items.append(ClothingItem(**item))
            else:
                validated_items.append(item)
        return validated_items

    @property
    def user_id(self) -> str:
        return self.user_profile.id

# Export types for use in other backend modules
__all__ = [
    'OutfitContext',
    'OutfitGeneratedOutfit',
    'OutfitPiece',
    'OutfitGenerationRequest',
    'WeatherData',
    'Outfit'
] 
