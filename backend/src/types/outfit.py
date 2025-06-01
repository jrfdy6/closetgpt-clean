from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from .wardrobe import ClothingItem, ClothingType, Season
from datetime import datetime
from pydantic import validator

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    gender: Optional[str] = None
    preferences: Dict[str, List[str]]
    measurements: Dict[str, Any]
    stylePreferences: List[str]
    bodyType: str
    skinTone: Optional[str] = None
    fitPreference: Optional[str] = None
    createdAt: int
    updatedAt: int

class WeatherData(BaseModel):
    temperature: float
    condition: str
    humidity: float
    wind_speed: float
    location: str
    precipitation: float = 0.0

class OutfitPiece(BaseModel):
    itemId: str
    reason: str

class OutfitContext(BaseModel):
    wardrobe: List[ClothingItem]
    weather: WeatherData
    occasion: str
    user_profile: UserProfile
    season: str
    baseItem: Optional[ClothingItem] = None
    likedOutfits: List[str] = []
    trendingStyles: List[str] = []

    class Config:
        use_enum_values = True

    @validator('wardrobe', pre=True)
    def validate_wardrobe(cls, v):
        if isinstance(v, list):
            return [ClothingItem(**item) if isinstance(item, dict) else item for item in v]
        return v

class GeneratedOutfit(BaseModel):
    id: str
    name: str
    description: str
    items: List[ClothingItem]  # Changed from List[dict] to List[ClothingItem]
    occasion: str
    season: str
    style: str
    styleTags: List[str]
    createdAt: int
    updatedAt: int

# Export types for use in other backend modules
__all__ = [
    'UserProfile',
    'WeatherData',
    'OutfitContext',
    'GeneratedOutfit',
    'OutfitPiece'
] 