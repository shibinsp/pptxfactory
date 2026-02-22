<div align="center">

<img src="logo.png" alt="PPT SaaS Logo" width="150" style="border-radius: 20px; margin-bottom: 20px;">

# 🎯 PPT SaaS

### **AI-Powered Presentation Generator**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Mistral AI](https://img.shields.io/badge/Mistral%20AI-Powered-FF6B6B?style=flat)](https://mistral.ai/)
[![License](https://img.shields.io/badge/License-MIT-8B5CF6.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-6366f1.svg)](https://github.com/shibinsp/pptxfactory/releases)

**Create stunning presentations in seconds with AI. Edit like a pro with our Canva-like editor.**

[🚀 Live Demo](http://localhost:3000) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [📦 Releases](https://github.com/shibinsp/pptxfactory/releases)

</div>

---

## 📋 About

**PPT SaaS** is a modern, AI-powered presentation generation platform that helps users create professional PowerPoint presentations effortlessly. Built with cutting-edge technologies like React, FastAPI, and Mistral AI, it offers a seamless experience from idea to presentation.

### Why PPT SaaS?

- 🚀 **Lightning Fast** - Generate complete presentations in seconds
- 🤖 **AI-Powered** - Leverages Mistral AI for intelligent content generation
- 🎨 **Visual Editor** - Canva-like interface for intuitive slide editing
- 🌙 **Modern UI** - Futuristic dark theme with glass morphism design
- 📱 **Responsive** - Works seamlessly across devices
- 💾 **Export Ready** - Download as standard PowerPoint (.pptx) files

---

## ✨ Features

### 🤖 AI-Powered Generation
- **Mistral AI Integration** - Generate professional presentations from simple text prompts
- **Smart Templates** - Fallback to topic-specific templates when AI quota is exceeded
- **Custom Slide Count** - Choose between 3-15 slides per presentation

### 🎨 Canva-Like Editor
- **Visual Slide Editor** - 3-panel layout (thumbnails, preview, properties)
- **Drag & Drop** - Reorder slides with intuitive drag and drop
- **Live Preview** - See changes in real-time as you edit
- **Full Control** - Add, delete, reorder, and customize every slide

### 🌌 Futuristic UI
- **Dark Theme** - Sleek dark interface with neon accents
- **Glass Morphism** - Modern translucent design elements
- **Smooth Animations** - Polished transitions and hover effects
- **Responsive Design** - Works seamlessly on desktop and mobile

### 📊 Presentation Management
- **Template System** - Upload and reuse custom PowerPoint templates
- **Export to PPTX** - Download presentations in standard PowerPoint format
- **Edit & Save** - Modify presentations anytime after creation

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

## 📸 Screenshots

<div align="center">

### AI Generation Interface
<img src="https://via.placeholder.com/800x450/0a0a0f/6366f1?text=AI+Generation+Interface" alt="AI Generation" width="800">

### Canva-Like Editor
<img src="https://via.placeholder.com/800x450/0a0a0f/ec4899?text=Visual+Editor" alt="Editor" width="800">

### Template Management
<img src="https://via.placeholder.com/800x450/0a0a0f/06b6d4?text=Template+Management" alt="Templates" width="800">

</div>

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **Mistral AI** - State-of-the-art language model for content generation
- **python-pptx** - PowerPoint file manipulation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Desktop (Optional)
- **Electron** - Cross-platform desktop applications

---

## 📚 API Documentation

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

## 🎨 Customization

### Themes
The application supports custom themes via CSS variables:

```css
:root {
  --primary: #6366f1;
  --secondary: #ec4899;
  --accent: #06b6d4;
  --bg-dark: #0a0a0f;
  --bg-card: #12121a;
}
```

### Templates
Upload your own `.pptx` templates to maintain consistent branding across presentations.

---

## 🚀 Deployment

### Docker (Coming Soon)
```bash
docker-compose up -d
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 📦 Version History

| Version | Date | Changes |
|---------|------|---------|
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

---

<div align="center">

**Made with ❤️ and ☕**

[⬆ Back to Top](#-ppt-saas)

</div>
