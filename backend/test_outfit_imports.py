#!/usr/bin/env python3
"""
Test script to check outfit generation imports
"""

import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

def test_imports():
    """Test all the imports needed for outfit generation"""
    try:
        print("Testing imports...")
        
        # Test basic imports
        print("✓ Testing basic imports...")
        from src.config.firebase import db
        print("✓ Firebase config imported")
        
        from src.types.outfit import Outfit, OutfitPiece, OutfitGeneratedOutfit
        print("✓ Outfit types imported")
        
        from src.types.wardrobe import ClothingType, ClothingItem
        print("✓ Wardrobe types imported")
        
        from src.types.weather import WeatherData
        print("✓ Weather types imported")
        
        from src.types.profile import UserProfile
        print("✓ Profile types imported")
        
        # Test outfit rules imports
        print("✓ Testing outfit rules imports...")
        from src.types.outfit_rules import (
            LAYERING_RULES, 
            OCCASION_RULES, 
            MOOD_RULES, 
            get_weather_rule, 
            get_occasion_rule, 
            get_mood_rule
        )
        print("✓ Outfit rules imported")
        
        # Test utility imports
        print("✓ Testing utility imports...")
        from src.utils.pairability import average_pairability
        print("✓ Pairability utility imported")
        
        # Test service import
        print("✓ Testing service import...")
        from src.services.outfit_service import OutfitService
        print("✓ Outfit service imported")
        
        print("\n🎉 All imports successful!")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = test_imports()
    sys.exit(0 if success else 1) 