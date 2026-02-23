# 🎯 PPT SaaS Application - Deployment Guide

## 🌐 Deployment Options

### Option 1: GitHub Pages (Frontend Only) - RECOMMENDED

The frontend is deployed to **GitHub Pages** and accessible at:

**🔗 Live URL: https://shibinsp.github.io/pptxfactory/**

#### Deploy to GitHub Pages

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Or use the combined command:
```bash
cd frontend && npm run deploy
```

#### GitHub Pages Setup

1. Go to your GitHub repository: `https://github.com/shibinsp/pptxfactory`
2. Click **Settings** → **Pages**
3. Source: Select **Deploy from a branch**
4. Branch: Select **gh-pages** / **root**
5. Click **Save**
6. Wait 2-3 minutes for deployment

---

### Option 2: Full Stack Deployment (Backend + Frontend)

For full functionality including AI generation, document processing, and PPT generation, deploy the backend separately.

#### Requirements
- VPS/Server with Python 3.9+
- Node.js 18+ (for building frontend)
- Domain (optional)

#### Backend Deployment

```bash
# Clone repository
git clone https://github.com/shibinsp/pptxfactory.git
cd pptxfactory/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend Build

```bash
cd frontend
npm install
npm run build

# Copy dist folder to your web server
cp -r dist/* /var/www/html/
```

#### Using PM2 (Production)

```bash
# Install PM2
npm install -g pm2

# Start backend with PM2
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8000" --name ppt-backend

# Save PM2 config
pm2 save
pm2 startup
```

#### Using Docker

```bash
# Build Docker image
docker build -t ppt-saas .

# Run container
docker run -d -p 8000:8000 -p 3000:3000 ppt-saas
```

---

## 📁 Project Structure

```
pptxfactory/
├── backend/              # FastAPI backend
│   ├── agents/          # AI Agents (Chat, Content, Design, etc.)
│   ├── templates/       # 58+ PPT templates
│   ├── main.py          # FastAPI application
│   └── requirements.txt # Python dependencies
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   │   └── ChatAgent/    # AI Chat Agent UI
│   │   └── pages/       # Page components
│   ├── dist/           # Production build
│   └── package.json
├── desktop/            # Electron desktop app
└── README.md
```

---

## 🚀 Quick Start (Local Development)

```bash
# Clone repository
git clone https://github.com/shibinsp/pptxfactory.git
cd pptxfactory

# Start all services
./start.sh
```

### Manual Start

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Access URLs (Local)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

---

## ✨ Deployed Features

### GitHub Pages (Frontend)
- ✅ Landing Page with Mistral AI-style design
- ✅ Template Gallery (58+ templates)
- ✅ AI Generation Interface
- ✅ Canva-like Editor UI
- ✅ AI Chat Agent Interface
- ✅ Responsive Design

### Full Stack (Backend + Frontend)
- ✅ All GitHub Pages features
- ✅ AI-Powered Content Generation (Mistral AI)
- ✅ Document Upload (PDF, Word, Images)
- ✅ PPT Generation & Download
- ✅ AI Chat Agent with Natural Language Commands
- ✅ Media Insertion (Images, YouTube, Charts, Tables)
- ✅ Template Processing
- ✅ User History Tracking

---

## 🔧 Environment Variables

Create `.env` file in backend directory:

```env
# Mistral AI API Key
MISTRAL_API_KEY=your_api_key_here

# Optional: Unsplash API for images
UNSPLASH_ACCESS_KEY=your_unsplash_key

# Optional: Pexels API for images
PEXELS_API_KEY=your_pexels_key
```

---

## 📦 Version History

| Version | Date | Changes |
|---------|------|---------|
| v2.0.0 | 2026-02-23 | GitHub Pages deployment, AI Chat Agent, 58+ templates |
| v1.0.0 | 2026-02-22 | Initial release with AI generation and Canva-like editor |

---

## 🆘 Troubleshooting

### GitHub Pages Issues

**404 Error on refresh:**
- This is expected for SPAs on GitHub Pages
- Add `404.html` redirect (already configured)

**Assets not loading:**
- Check `vite.config.js` base path: `base: '/pptxfactory/'`
- Verify repository name matches base path

**Changes not appearing:**
- Clear browser cache
- Wait 2-3 minutes for GitHub Pages to update
- Check Actions tab for deployment status

### Backend Issues

```bash
# Check if backend is running
curl http://localhost:8000/health

# Check logs
journalctl -u ppt-backend -f

# Restart backend
pm2 restart ppt-backend
```

### CORS Issues

If frontend can't connect to backend:
```python
# In backend/main.py, ensure CORS is configured:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shibinsp.github.io", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 Deployment Checklist

- [ ] Update `vite.config.js` base path
- [ ] Update `package.json` homepage
- [ ] Install `gh-pages` dependency
- [ ] Build frontend: `npm run build`
- [ ] Deploy: `npm run deploy`
- [ ] Configure GitHub Pages in repository settings
- [ ] Verify deployment at `https://shibinsp.github.io/pptxfactory/`
- [ ] Test all features
- [ ] Update README with live URL

---

## 🎯 Next Steps

1. **Visit the live site**: https://shibinsp.github.io/pptxfactory/
2. **Test the AI Chat Agent**: Click the chat button in bottom-right
3. **Try document upload**: Upload a PDF or Word document
4. **Explore templates**: Browse 58+ professional templates
5. **Deploy backend**: For full AI functionality, deploy the backend separately

---

**Deployment Status**: ✅ LIVE on GitHub Pages  
**Live URL**: https://shibinsp.github.io/pptxfactory/  
**Last Updated**: 2026-02-23
