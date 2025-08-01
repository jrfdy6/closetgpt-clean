print("=== ultra_minimal.py is being executed ===")
print("=== DEPLOYMENT TRIGGERED AT:", __import__('datetime').datetime.now().isoformat(), "===")
from fastapi import FastAPI
import os

app = FastAPI(title="ClosetGPT API", version="1.0.0")

@app.get("/health")
async def health():
    """Health check endpoint"""
    print("=== HEALTH CHECK HIT ===")
    return {"status": "ok"}

@app.get("/")
async def root():
    print("=== ROOT ENDPOINT HIT ===")
    return {"message": "ClosetGPT API is running"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port) 