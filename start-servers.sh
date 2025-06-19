#!/bin/bash

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $1 is already in use. Please free up the port and try again."
        exit 1
    fi
}

# Check if ports are available
check_port 3000
check_port 3001

# Clean up old virtual environments
echo "Cleaning up old virtual environments..."
rm -rf backend/venv
rm -rf backend/env

# Start backend server
echo "Starting backend server..."
cd backend
if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python3.11 -m venv .venv
    source .venv/bin/activate
    # Install weather-specific requirements
    pip install -r requirements-weather.txt
    pip install -r requirements-test.txt
else
    source .venv/bin/activate
    # Update requirements if needed
    pip install -r requirements-weather.txt
    pip install -r requirements-test.txt
fi

# Start backend in background
python run.py &
BACKEND_PID=$!

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Set up trap to catch termination signal
trap cleanup SIGINT SIGTERM

# Keep script running
echo "Servers are running. Press Ctrl+C to stop."
wait 