from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class Season(str, Enum):
    SPRING = "spring"
    SUMMER = "summer"
    FALL = "fall"
    WINTER = "winter"

class ClothingType(str, Enum):
    SHIRT = "shirt"
    PANTS = "pants"
    DRESS = "dress"
    SKIRT = "skirt"
    JACKET = "jacket"
    SWEATER = "sweater"
    SHOES = "shoes"
    ACCESSORY = "accessory"
    OTHER = "other"

class Color(BaseModel):
    name: str
    hex: str
    rgb: List[int]

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

class ItemMetadata(BaseModel):
    priceEstimate: Optional[str] = None
    careInstructions: Optional[str] = None
    tags: Optional[List[str]] = None

class BasicMetadata(BaseModel):
    width: Optional[int] = None
    height: Optional[int] = None
    orientation: Optional[str] = None
    dateTaken: Optional[str] = None
    deviceModel: Optional[str] = None
    gps: Optional[str] = None
    flashUsed: Optional[bool] = None

class ColorAnalysis(BaseModel):
    dominant: List[Color]
    matching: List[Color]

class Metadata(BaseModel):
    brand: Optional[str] = None
    analysisTimestamp: int
    originalType: str
    originalSubType: Optional[str] = None
    styleTags: List[str]
    occasionTags: List[str]
    imageHash: Optional[str] = None
    colorAnalysis: ColorAnalysis
    basicMetadata: Optional[BasicMetadata] = None
    visualAttributes: Optional[VisualAttributes] = None
    itemMetadata: Optional[ItemMetadata] = None
    naturalDescription: Optional[str] = None

class ClothingItemModel(BaseModel):
    id: str
    name: str
    type: ClothingType
    color: str
    season: List[Season]
    imageUrl: str
    tags: List[str]
    style: List[str]
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

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123",
                "name": "Blue Denim Jacket",
                "type": "jacket",
                "color": "blue",
                "season": ["spring", "fall"],
                "imageUrl": "https://example.com/jacket.jpg",
                "tags": ["casual", "denim"],
                "style": ["casual", "streetwear"],
                "userId": "user123",
                "dominantColors": [
                    {
                        "name": "blue",
                        "hex": "#0000FF",
                        "rgb": [0, 0, 255]
                    }
                ],
                "matchingColors": [
                    {
                        "name": "white",
                        "hex": "#FFFFFF",
                        "rgb": [255, 255, 255]
                    }
                ],
                "occasion": ["casual", "daily"],
                "createdAt": 1234567890,
                "updatedAt": 1234567890,
                "subType": "denim",
                "brand": "Levi's",
                "colorName": "navy blue"
            }
        }

# Export types for use in other backend modules
__all__ = ['ClothingItem', 'ClothingItemSchema', 'ClothingItemModel'] 