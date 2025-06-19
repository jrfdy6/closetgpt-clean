# This file makes the src directory a Python package
from .types.profile import UserProfile
from .types.outfit import WeatherData, OutfitContext, OutfitGeneratedOutfit, OutfitPiece
from .types.wardrobe import (
    ClothingType,
    Season,
    StyleTag,
    Color,
    VisualAttributes,
    ItemMetadata,
    BasicMetadata,
    ColorAnalysis,
    Metadata,
    ClothingItem,
    Outfit,
    GeneratedOutfit as WardrobeGeneratedOutfit
)

__all__ = [
    'UserProfile',
    'WeatherData',
    'OutfitContext',
    'OutfitGeneratedOutfit',
    'OutfitPiece',
    'ClothingType',
    'Season',
    'StyleTag',
    'Color',
    'VisualAttributes',
    'ItemMetadata',
    'BasicMetadata',
    'ColorAnalysis',
    'Metadata',
    'ClothingItem',
    'Outfit',
    'WardrobeGeneratedOutfit'
] 