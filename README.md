# 🎯 PPT SaaS Application

A full-stack SaaS application for creating PowerPoint presentations with AI assistance.

## Features

- ✅ **Upload PPT Templates** - Upload and reuse your existing PowerPoint templates
- ✅ **AI-Powered Generation** - Generate presentations from text prompts
- ✅ **Custom Slide Editor** - Create presentations from scratch
- ✅ **Web Application** - React-based modern UI
- ✅ **Desktop Application** - Electron app for Windows, Mac, and Linux
- ✅ **FastAPI Backend** - High-performance Python backend

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: FastAPI (Python)
- **Desktop**: Electron
- **PPT Generation**: python-pptx

## Project Structure

```
ppt-saas-app/
├── backend/          # FastAPI backend
│   ├── main.py      # Main API
│   ├── requirements.txt
│   └── venv/        # Python virtual environment
├── frontend/        # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── desktop/         # Electron desktop app
│   ├── main.js
│   ├── preload.js
│   └── package.json
└── start.sh         # Startup script
```

## Quick Start

### 1. Start the Application

```bash
cd /root/.openclaw/workspace/ppt-saas-app
./start.sh
```

This will start:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

### 2. Access the Application

- **Web App**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

### 3. Build for Production

```bash
# Build frontend
cd frontend
npm run build

# Build desktop app
cd ../desktop
npm install
npm run build
```

## API Endpoints

- `POST /api/ppt/generate` - Generate PPT from content
- `GET /api/ppt/download/{ppt_id}` - Download generated PPT
- `POST /api/templates/upload` - Upload PPT template
- `GET /api/templates` - List all templates
- `DELETE /api/templates/{template_id}` - Delete template

## Deployment

The application is ready to deploy to your server. The backend runs on port 8000 and the frontend on port 3000.

For production deployment:
1. Build the frontend: `cd frontend && npm run build`
2. Serve static files from `frontend/dist/`
3. Run backend with: `cd backend && source venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000`

## License

MIT