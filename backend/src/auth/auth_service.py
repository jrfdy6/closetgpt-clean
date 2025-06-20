from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from ..types.profile import UserProfile

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UserProfile:
    """
    Mock authentication function for development.
    In production, this would validate JWT tokens and fetch user from database.
    """
    try:
        # For development, we'll use a mock user
        # In production, you would decode the JWT token and fetch user from database
        mock_user = UserProfile(
            id="dANqjiI0CKgaitxzYtw1bhtvQrG3",  # Real user ID from your database
            name="Test User",
            email="test@example.com",
            preferences={
                "style": ["Casual", "Business Casual"],
                "colors": ["Black", "White", "Blue"],
                "occasions": ["Casual", "Business"]
            },
            measurements={
                "height": 175,
                "weight": 70,
                "bodyType": "average"
            },
            stylePreferences=[],
            bodyType="average",
            createdAt=1234567890,
            updatedAt=1234567890
        )
        return mock_user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Alternative function that doesn't require authentication for testing
async def get_current_user_optional() -> Optional[UserProfile]:
    """
    Optional authentication function for testing endpoints without auth.
    """
    try:
        mock_user = UserProfile(
            id="dANqjiI0CKgaitxzYtw1bhtvQrG3",  # Real user ID from your database
            name="Test User",
            email="test@example.com",
            preferences={
                "style": ["Casual", "Business Casual"],
                "colors": ["Black", "White", "Blue"],
                "occasions": ["Casual", "Business"]
            },
            measurements={
                "height": 175,
                "weight": 70,
                "bodyType": "average"
            },
            stylePreferences=[],
            bodyType="average",
            createdAt=1234567890,
            updatedAt=1234567890
        )
        return mock_user
    except Exception as e:
        print(f"Error creating mock user: {e}")
        return None 