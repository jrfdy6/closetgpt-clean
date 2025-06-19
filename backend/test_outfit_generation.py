#!/usr/bin/env python3
"""
Test script to test outfit generation functionality
"""

import sys
import os
import asyncio
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

async def test_outfit_generation():
    """Test outfit generation with sample data"""
    try:
        print("Testing outfit generation...")
        
        # Import required modules
        from src.services.outfit_service import OutfitService
        from src.types.wardrobe import ClothingItem, ClothingType
        from src.types.weather import WeatherData
        from src.types.profile import UserProfile
        
        # Create sample data
        sample_wardrobe = [
            ClothingItem(
                id="test1",
                name="Test Shirt",
                type=ClothingType.SHIRT,
                color="Blue",
                season=["spring", "summer"],
                imageUrl="https://example.com/shirt.jpg",
                tags=["casual"],
                style=["Casual"],
                userId="test_user",
                dominantColors=[],
                matchingColors=[],
                occasion=["Casual"],
                brand=None,
                createdAt=1234567890,
                updatedAt=1234567890,
                subType=None,
                colorName=None,
                backgroundRemoved=False,
                embedding=None,
                metadata=None
            ),
            ClothingItem(
                id="test2",
                name="Test Pants",
                type=ClothingType.PANTS,
                color="Black",
                season=["all"],
                imageUrl="https://example.com/pants.jpg",
                tags=["casual"],
                style=["Casual"],
                userId="test_user",
                dominantColors=[],
                matchingColors=[],
                occasion=["Casual"],
                brand=None,
                createdAt=1234567890,
                updatedAt=1234567890,
                subType=None,
                colorName=None,
                backgroundRemoved=False,
                embedding=None,
                metadata=None
            )
        ]
        
        weather = WeatherData(
            temperature=70,
            condition="sunny",
            location="test",
            humidity=50,
            wind_speed=5,
            precipitation=0
        )
        
        user_profile = UserProfile(
            id="test_user",
            name="Test User",
            email="test@example.com",
            preferences={
                "style": ["casual"],
                "colors": ["blue", "black"],
                "occasions": ["casual"]
            },
            measurements={
                "height": 70,
                "weight": 150,
                "bodyType": "average",
                "skinTone": "neutral"
            },
            stylePreferences=["casual"],
            bodyType="average",
            skinTone="neutral",
            createdAt=1234567890,
            updatedAt=1234567890
        )
        
        # Test outfit generation
        outfit_service = OutfitService()
        
        print("✓ Sample data created")
        print(f"✓ Wardrobe items: {len(sample_wardrobe)}")
        print(f"✓ Weather: {weather.temperature}°F, {weather.condition}")
        print(f"✓ User: {user_profile.name}")
        
        # Try to generate outfit
        print("\nGenerating outfit...")
        outfit = await outfit_service.generate_outfit(
            occasion="Casual",
            weather=weather,
            wardrobe=sample_wardrobe,
            user_profile=user_profile,
            likedOutfits=[],
            trendingStyles=[],
            style="Casual"
        )
        
        print(f"✓ Outfit generated successfully!")
        print(f"✓ Outfit name: {outfit.name}")
        print(f"✓ Outfit pieces: {len(outfit.pieces)}")
        print(f"✓ Style tags: {outfit.styleTags}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error generating outfit: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_outfit_generation())
    sys.exit(0 if success else 1) 