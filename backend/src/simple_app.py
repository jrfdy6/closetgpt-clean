from fastapi import FastAPI
import os

app = FastAPI(
    title="ClosetGPT API - Simple Test",
    description="Minimal test version",
    version="1.0.0"
)

@app.get("/health")
async def health_check():
    """Simple health check endpoint"""
    return {
        "status": "healthy",
        "message": "Simple app is running",
        "port": os.getenv("PORT", "3001")
    }

@app.get("/")
async def root():
    return {"message": "ClosetGPT API is running", "status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001) 