#!/bin/bash

# Wait a moment for the system to be ready
sleep 10

# Start the FastAPI application with more verbose output
python -m uvicorn src.app:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1 --log-level debug 