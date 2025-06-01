from typing import List, Optional, Dict, Any, Literal, Union
from pydantic import BaseModel, Field, validator
from datetime import datetime
from enum import Enum

# Enums matching the shared types
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

Season = Literal['spring', 'summer', 'fall', 'winter']

class Color(BaseModel):
    name: str
    hex: str
    rgb: List[int]

class VisualAttributes(BaseModel):
    material: Optional[str] = None
    pattern: Optional[str] = None
    textureStyle: Optional[str] = None
    fabricWeight: Optional[Literal["light", "medium", "heavy"]] = None
    fit: Optional[Literal["loose", "slim", "oversized"]] = None
    silhouette: Optional[str] = None
    length: Optional[str] = None
    genderTarget: Optional[Literal["men", "women", "unisex"]] = None
    sleeveLength: Optional[str] = None
    hangerPresent: Optional[bool] = None
    backgroundRemoved: Optional[bool] = None
    wearLayer: Optional[Literal["inner", "outer", "base"]] = None
    formalLevel: Optional[Literal["casual", "semi-formal", "formal"]] = None

    @validator('fit', pre=True)
    def normalize_fit(cls, v):
        if not v:
            return None
        v = str(v).lower()
        if v == "regular":
            return "slim"
        if v in ["loose", "slim", "oversized"]:
            return v
        return None

    @classmethod
    def normalize_enum_values(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize enum values to lowercase."""
        if values.get('fabricWeight'):
            values['fabricWeight'] = values['fabricWeight'].lower()
        if values.get('genderTarget'):
            values['genderTarget'] = values['genderTarget'].lower()
        if values.get('wearLayer'):
            values['wearLayer'] = values['wearLayer'].lower()
        if values.get('formalLevel'):
            values['formalLevel'] = values['formalLevel'].lower()
        return values

class ItemMetadata(BaseModel):
    priceEstimate: Optional[str] = None
    careInstructions: Optional[str] = None
    tags: Optional[List[str]] = None

class BasicMetadata(BaseModel):
    width: Optional[Union[int, None]] = None
    height: Optional[Union[int, None]] = None
    orientation: Optional[Union[str, None]] = None
    dateTaken: Optional[Union[str, None]] = None
    deviceModel: Optional[Union[str, None]] = None
    gps: Optional[Union[str, None]] = None
    flashUsed: Optional[Union[bool, None]] = None

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

class ClothingItem(BaseModel):
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
        use_enum_values = True

__all__ = ['ClothingItem', 'Color', 'Metadata', 'BasicMetadata', 'VisualAttributes', 'ItemMetadata'] 