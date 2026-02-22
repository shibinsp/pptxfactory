#!/bin/bash

# PPT SaaS Application Startup Script

cd /root/.openclaw/workspace/ppt-saas-app

echo "🚀 Starting PPT SaaS Application..."

# Start Backend
echo "📦 Starting Backend (FastAPI)..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

echo "✅ Backend started on http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"

# Start Frontend
echo "🎨 Starting Frontend (React)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Frontend started on http://localhost:3000"

echo ""
echo "🎯 Application is running!"
echo "   Web App: http://localhost:3000"
echo "   API: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait