from fastapi import FastAPI

app = FastAPI(title="ClosetGPT API")

@app.get("/")
def read_root():
    return {"message": "Hello World", "status": "success"}

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080) 