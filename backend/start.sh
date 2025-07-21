#!/bin/bash

# Wait a moment for the system to be ready
sleep 10

# Debug: Print the PORT variable
echo "PORT variable: $PORT"

# Set default port if not provided
if [ -z "$PORT" ]; then
    PORT=8000
    echo "PORT not set, using default: $PORT"
fi

echo "Starting app on port: $PORT"

# Start the FastAPI application with more verbose output
python -m uvicorn src.app:app --host 0.0.0.0 --port $PORT --workers 1 --log-level debug 