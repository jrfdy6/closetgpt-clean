#!/bin/bash

# Force set the port to 3001, ignoring any $PORT variable
export PORT=3001

echo "Starting ClosetGPT API on port 3001"
echo "Current directory: $(pwd)"
echo "Files in current directory: $(ls -la)"

# Start the FastAPI application
cd /app/src
uvicorn app:app --host 0.0.0.0 --port 3001 