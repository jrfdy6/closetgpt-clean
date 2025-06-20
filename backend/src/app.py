from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import outfit, image_processing, image_analysis, weather, style_analysis, wardrobe_analysis

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(outfit.router, prefix="/api/outfit", tags=["outfits"])
app.include_router(image_processing.router, prefix="/api/image", tags=["images"])
app.include_router(image_analysis.router)  # No prefix needed as it's already in the router
app.include_router(weather.router, prefix="/api", tags=["weather"])
app.include_router(style_analysis.router, prefix="/api", tags=["style-analysis"])
app.include_router(wardrobe_analysis.router)  # Prefix is already in the router

@app.get("/health")
async def health_check():
    return {"status": "ok"} 