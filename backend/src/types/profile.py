from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, validator

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    gender: Optional[str] = None
    preferences: Dict[str, List[str]] = Field(default_factory=lambda: {
        "style": [],
        "colors": [],
        "occasions": []
    })
    measurements: Dict[str, Any] = Field(default_factory=lambda: {
        "height": 0,
        "weight": 0,
        "bodyType": "",
        "skinTone": None
    })
    stylePreferences: List[str] = Field(default_factory=list)
    bodyType: str
    skinTone: Optional[str] = None
    fitPreference: Optional[str] = None
    createdAt: int
    updatedAt: int

    class Config:
        use_enum_values = True
        arbitrary_types_allowed = True

    @validator('preferences', pre=True)
    def validate_preferences(cls, v):
        if v is None:
            return {"style": [], "colors": [], "occasions": []}
        return v

    @validator('measurements', pre=True)
    def validate_measurements(cls, v):
        if v is None:
            return {
                "height": 0,
                "weight": 0,
                "bodyType": "",
                "skinTone": None
            }
        return v

    @validator('stylePreferences', pre=True)
    def validate_style_preferences(cls, v):
        if v is None:
            return []
        return v

# Export types for use in other backend modules
__all__ = ['UserProfile'] 