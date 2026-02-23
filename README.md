<div align="center">

<img src="logo.png" alt="PPT SaaS Logo" width="150" style="border-radius: 20px; margin-bottom: 20px;">

# 🎯 PPT SaaS

### **AI-Powered Presentation Generator with Chat Agent**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Mistral AI](https://img.shields.io/badge/Mistral%20AI-Powered-FF6B6B?style=flat)](https://mistral.ai/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-222222?logo=github)](https://shibinsp.github.io/pptxfactory/)
[![License](https://img.shields.io/badge/License-MIT-8B5CF6.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0.0-6366f1.svg)](https://github.com/shibinsp/pptxfactory/releases)

**Create stunning presentations in seconds with AI. Chat with our AI agent to edit, upload documents, and insert media effortlessly.**

[🚀 Live Demo](https://shibinsp.github.io/pptxfactory/) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [📦 Releases](https://github.com/shibinsp/pptxfactory/releases)

</div>

---

## 📋 About

**PPT SaaS** is a modern, AI-powered presentation generation platform that helps users create professional PowerPoint presentations effortlessly. Built with cutting-edge technologies like React, FastAPI, and Mistral AI, it offers a seamless experience from idea to presentation.

### Why PPT SaaS?

- 🚀 **Lightning Fast** - Generate complete presentations in seconds
- 🤖 **AI Chat Agent** - Natural language editing with intelligent assistance
- 📄 **Document Upload** - Convert PDF, Word, and images to presentations
- 🎬 **Media Insertion** - Add images, videos, YouTube, charts, and tables via chat
- 🎨 **Visual Editor** - Canva-like interface for intuitive slide editing
- 🎭 **58+ Templates** - Professional templates across 11 categories
- 🌙 **Modern UI** - Futuristic dark theme with glass morphism design
- 📱 **Responsive** - Works seamlessly across devices
- 💾 **Export Ready** - Download as standard PowerPoint (.pptx) files

---

## ✨ Features

### 🤖 AI Chat Agent
- **Natural Language Editing** - Edit presentations by chatting with AI
- **Smart Commands** - "Add a slide", "Insert image", "Change template"
- **Document Upload** - Upload PDF, Word, TXT, and images for conversion
- **Media Insertion** - Insert images, YouTube videos, charts, tables via chat
- **Writing Enhancement** - AI-powered grammar and style improvements
- **Design Analysis** - Get suggestions for better slide design

### 🤖 AI-Powered Generation
- **Mistral AI Integration** - Generate professional presentations from simple text prompts
- **Smart Templates** - AI automatically selects the best template for your content
- **Custom Slide Count** - Choose between 3-15 slides per presentation
- **Speaker Notes** - Auto-generated speaking notes for each slide

### 🎨 Canva-Like Editor
- **Visual Slide Editor** - 3-panel layout (thumbnails, preview, properties)
- **Drag & Drop** - Reorder slides with intuitive drag and drop
- **Live Preview** - See changes in real-time as you edit
- **Full Control** - Add, delete, reorder, and customize every slide

### 📄 Document Processing
- **PDF Support** - Extract text and convert to slides
- **Word Documents** - Parse DOCX files with tables and formatting
- **Image OCR** - Extract text from uploaded images
- **Auto-Structure** - AI suggests slide organization from documents

### 🎬 Media & Content
- **Image Search** - Find relevant images from Unsplash
- **YouTube Embed** - Insert YouTube videos directly into slides
- **Charts & Graphs** - Add bar, pie, line, and column charts
- **Tables** - Create customizable tables
- **Shapes & Icons** - Insert geometric shapes and icons

### 🎭 Template Gallery (58+ Templates)
- **Business** (8) - Professional, Executive, Corporate, Financial, etc.
- **Creative** (8) - Purple, Gradient, Typography, Portfolio, Neon, etc.
- **Technology** (6) - Dark, AI, Blockchain, Data Science, Cyber Security
- **Nature** (6) - Green, Ocean, Sunset, Forest, Tropical, Mountain
- **Education** (5) - Classic, Modern, Science, University, Kids
- **Healthcare** (4) - Medical, Pharma, Wellness, Mental Health
- **Lifestyle** (4) - Fashion, Food, Travel, Wedding
- **Events** (4) - Christmas, New Year, Birthday, Corporate
- **Industry** (5) - Real Estate, Restaurant, Sports, Nonprofit, Construction
- **Seasonal** (4) - Spring, Summer, Autumn, Winter
- **Special** (4) - Monochrome, Gradient Mesh, Paper Craft, Glass Morphism

### 🌌 Futuristic UI
- **Dark Theme** - Sleek dark interface with neon accents
- **Glass Morphism** - Modern translucent design elements
- **Smooth Animations** - Polished transitions and hover effects
- **Responsive Design** - Works seamlessly on desktop and mobile

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shibinsp/pptxfactory.git
cd pptxfactory

# Setup Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup Frontend
cd ../frontend
npm install

# Start the application
cd ..
./start.sh
```

### Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| Web App | http://localhost:3000 | React Frontend |
| API | http://localhost:8000 | FastAPI Backend |
| API Docs | http://localhost:8000/docs | Swagger Documentation |

---

## 💬 AI Chat Agent Usage

### Natural Language Commands

The AI Chat Agent understands natural language commands for editing presentations:

| Command | Action |
|---------|--------|
| "Add a new slide" | Creates a new content slide |
| "Add title slide about AI" | Creates a title slide |
| "Change title to 'New Title'" | Updates slide title |
| "Insert image of robot" | Searches and adds image |
| "Add YouTube video [URL]" | Embeds YouTube video |
| "Create a bar chart" | Inserts chart placeholder |
| "Add table 3x4" | Creates 3x4 table |
| "Make text bold" | Applies bold formatting |
| "Change to Business template" | Switches template |
| "Upload my document.pdf" | Processes and converts document |
| "Improve writing" | Enhances text with AI |
| "Export as PDF" | Exports presentation |

### Document Upload

Upload documents directly in chat:
- **PDF** - Extracts text and suggests slide structure
- **Word (DOCX)** - Parses content, tables, and images
- **Text/Markdown** - Converts to presentation format
- **Images** - OCR text extraction and image insertion

---

## 📸 Screenshots

<div align="center">

### AI Chat Agent
<img src="https://via.placeholder.com/800x450/0a0a0f/D4A574?text=AI+Chat+Agent" alt="AI Chat Agent" width="800">

### AI Generation Interface
<img src="https://via.placeholder.com/800x450/0a0a0f/6366f1?text=AI+Generation+Interface" alt="AI Generation" width="800">

### Canva-Like Editor
<img src="https://via.placeholder.com/800x450/0a0a0f/ec4899?text=Visual+Editor" alt="Editor" width="800">

### Template Gallery
<img src="https://via.placeholder.com/800x450/0a0a0f/06b6d4?text=Template+Gallery" alt="Templates" width="800">

</div>

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **Mistral AI** - State-of-the-art language model for content generation
- **python-pptx** - PowerPoint file manipulation
- **AI Agents** - 6 specialized agents for content, design, templates, images, chat, and documents
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### AI Agents System
- **ChatAgent** - Natural language interface for PPT editing
- **ContentAgent** - Generate and improve slide content
- **TemplateAgent** - Smart template selection
- **ImageAgent** - Image search and suggestions
- **DesignAgent** - Auto-optimize slide design
- **DocumentProcessor** - Extract content from PDF, Word, Images

---

## 📚 API Documentation

### AI Chat Agent
```http
POST /api/chat/message
Content-Type: application/json

{
  "message": "Add a new slide about AI Technology",
  "ppt_id": "optional-ppt-id",
  "slide_id": "optional-slide-id"
}
```

### Generate Presentation with AI
```http
POST /api/ppt/generate-ai
Content-Type: application/json

{
  "prompt": "Benefits of renewable energy",
  "num_slides": 5,
  "template_id": "optional-template-id"
}
```

### Upload Document
```http
POST /api/documents/upload
Content-Type: multipart/form-data

file: <your-file.pdf>
```

### Insert Media
```http
POST /api/ppt/{ppt_id}/slides/{slide_id}/media
Content-Type: application/json

{
  "media_type": "image",  // image, video, youtube, chart, table, shape
  "source": "https://example.com/image.jpg",
  "position": {"x": 1, "y": 2, "width": 8, "height": 4}
}
```

### Get Presentation for Editing
```http
GET /api/ppt/{ppt_id}
```

### Update Presentation
```http
PUT /api/ppt/{ppt_id}
Content-Type: application/json

{
  "title": "Updated Title",
  "slides": [
    {
      "id": "slide-1",
      "title": "New Title",
      "content": "New content",
      "order": 0
    }
  ]
}
```

### Download Presentation
```http
GET /api/ppt/download/{ppt_id}
```

---

## 🚀 Deployment

### GitHub Pages (Frontend Only)

The frontend is deployed to GitHub Pages:

```bash
# Build for production
cd frontend
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Live URL:** https://shibinsp.github.io/pptxfactory/

### Full Deployment (Backend + Frontend)

#### Using Docker (Coming Soon)
```bash
docker-compose up -d
```

#### Manual Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🎨 Customization

### Themes
The application supports custom themes via CSS variables:

```css
:root {
  --bee-primary: #D4A574;
  --bee-primary-dark: #B8935F;
  --bee-secondary: #8B6914;
  --bee-accent: #F4E4C1;
  --bg-primary: #0D0B09;
  --bg-secondary: #1A1510;
  --bg-tertiary: #252018;
  --text-primary: #FFFFFF;
  --text-secondary: #B8B0A8;
}
```

### Templates
Upload your own `.pptx` templates to maintain consistent branding across presentations.

---

## 📦 Version History

| Version | Date | Changes |
|---------|------|---------|
| **v2.0.0** | 2026-02-22 | Added AI Chat Agent, document upload, 58+ templates, media insertion |
| **v1.0.0** | 2026-02-22 | Initial release with AI generation, Canva-like editor, and futuristic UI |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Mistral AI](https://mistral.ai/) for providing the AI capabilities
- [FastAPI](https://fastapi.tiangolo.com/) for the amazing backend framework
- [React](https://reactjs.org/) for the frontend library
- [python-pptx](https://python-pptx.readthedocs.io/) for PowerPoint manipulation
- [Unsplash](https://unsplash.com/) for image API

---

<div align="center">

**Made with ❤️ and ☕**

[⬆ Back to Top](#-ppt-saas)

</div>
