#!/bin/bash

echo "🚀 Starting PropExchange Development Environment..."

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
pg_isready -h localhost -p 5432

# Create database if it doesn't exist
echo "🗄️  Setting up database..."
psql -h localhost -U postgres -c "CREATE DATABASE propexchange;" 2>/dev/null || true

# Activate virtual environment if it exists, create if it doesn't
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install backend dependencies
echo "📦 Installing backend dependencies..."
pip install -r requirements.txt

# Run database migrations
echo "🔄 Running database migrations..."
cd backend && alembic upgrade head && cd ..

# Start backend server
echo "🌐 Starting backend server..."
cd backend && uvicorn app.main:app --reload &
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install

# Start frontend server
echo "🌐 Starting frontend server..."
npm run dev &
cd ..

echo "✨ Development environment is ready!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"

# Wait for all background processes
wait 