#!/bin/bash

# Store the root directory
ROOT_DIR=$(pwd)

echo "🚀 Starting Development Environment..."

# Install backend dependencies if not already installed
if [ ! -d ".venv" ]; then
    echo "📦 Installing backend dependencies..."
    python3.11 -m venv .venv
    source .venv/bin/activate
    pip install -r backend/requirements.txt
else
    source .venv/bin/activate
fi

# Add the current directory to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)

# Install frontend dependencies if not already installed
echo "📦 Installing frontend dependencies..."
cd "$ROOT_DIR/frontend" && npm install --legacy-peer-deps
cd "$ROOT_DIR"

# Start backend server
echo "🌐 Starting backend server..."
cd "$ROOT_DIR" && uvicorn backend.main:app --reload &
cd "$ROOT_DIR"

# Start frontend server
echo "🌐 Starting frontend server..."
cd "$ROOT_DIR/frontend" && npm run dev &
cd "$ROOT_DIR"

echo "✨ Development environment is ready!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:8000"

# Wait for all background processes
wait 