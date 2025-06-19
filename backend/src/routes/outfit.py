from fastapi import APIRouter, HTTPException
from typing import List, Optional, Dict, Any
from ..types.outfit import Outfit, OutfitGenerationRequest, OutfitGeneratedOutfit
from ..types.wardrobe import ClothingItem
from ..types.weather import WeatherData
from ..types.profile import UserProfile
from pydantic import BaseModel
from ..services.outfit_service import OutfitService

router = APIRouter()
outfit_service = OutfitService()

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

@router.get("/", response_model=List[OutfitGeneratedOutfit])
async def get_outfits():
    try:
        return await outfit_service.get_outfits()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{outfit_id}", response_model=OutfitGeneratedOutfit)
async def get_outfit(outfit_id: str):
    try:
        outfit = await outfit_service.get_outfit(outfit_id)
        if not outfit:
            raise HTTPException(status_code=404, detail="Outfit not found")
        return outfit
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate", response_model=OutfitGeneratedOutfit)
async def generate_outfit(request: OutfitGenerationRequest):
    try:
        return await outfit_service.generate_outfit(
            occasion=request.occasion,
            weather=request.weather,
            wardrobe=request.wardrobe,
            user_profile=request.user_profile,
            likedOutfits=request.likedOutfits,
            trendingStyles=request.trendingStyles,
            preferences=request.preferences,
            outfitHistory=request.outfitHistory,
            randomSeed=request.randomSeed,
            season=request.season,
            style=request.style,
            baseItem=request.baseItem
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 