from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from datetime import datetime
from .services.real_image_analysis_service import real_analyzer

# Create FastAPI app
app = FastAPI(
    title="ClosetGPT API",
    description="AI-powered wardrobe management and outfit generation API",
    version="1.0.0"
)

# Configure CORS
allowed_origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://closetgpt-frontend.vercel.app",
    "https://closetgpt-clean.vercel.app",
    "https://closetgpt-clean-git-main-jrfdy6.vercel.app",
    "https://closetgpt-clean-jrfdy6.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint for Railway deployment"""
    try:
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "environment": os.getenv("ENVIRONMENT", "development"),
            "version": "1.0.0",
            "message": "Progressive app with GPT-4 Vision is working"
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

@app.get("/")
async def root():
    return {"message": "Progressive app with GPT-4 Vision API working"}

@app.get("/api/health")
async def api_health():
    return {"status": "ok", "api": "working", "features": ["gpt4_vision", "wardrobe", "outfits", "weather", "analytics"]}

# Real GPT-4 Vision image analysis endpoint
@app.post("/api/analyze-image")
async def analyze_image(image: dict):
    """Real GPT-4 Vision image analysis endpoint"""
    try:
        image_url = image.get("image")
        if not image_url:
            return {"error": "No image provided"}
        
        # Use real GPT-4 Vision analysis
        analysis_result = await real_analyzer.analyze_clothing_item(image_url)
        
        return analysis_result
    except Exception as e:
        return {"error": f"Failed to analyze image: {str(e)}"}

# Step 2: Add basic wardrobe endpoints
@app.get("/api/wardrobe")
async def get_wardrobe():
    """Get wardrobe items"""
    return {"items": [], "message": "Wardrobe endpoint (progressive with GPT-4)"}

@app.post("/api/wardrobe")
async def add_wardrobe_item(item: dict):
    """Add wardrobe item"""
    return {"message": "Item added (progressive with GPT-4)", "item": item}

# Step 3: Add basic outfits endpoints
@app.get("/api/outfits")
async def get_outfits():
    """Get outfits"""
    return {"outfits": [], "message": "Outfits endpoint (progressive with GPT-4)"}

@app.post("/api/outfits")
async def create_outfit(outfit: dict):
    """Create outfit"""
    return {"message": "Outfit created (progressive with GPT-4)", "outfit": outfit}

# Step 4: Add weather endpoint
@app.get("/api/weather")
async def get_weather():
    """Get weather data"""
    return {"weather": "sunny", "temperature": 72, "message": "Weather endpoint (progressive with GPT-4)"}

# Step 5: Add analytics endpoint
@app.get("/api/analytics")
async def get_analytics():
    """Get analytics data"""
    return {"analytics": {}, "message": "Analytics endpoint (progressive with GPT-4)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080) 