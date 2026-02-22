import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  FileText,
  Wand2,
  Download,
  Edit3,
  ChevronRight,
  Star,
  Users,
  Clock
} from 'lucide-react'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <Link to="/" className="landing-logo">
            <img src="/logo.png" alt="PPT SaaS" />
            <span>PPT SaaS</span>
          </Link>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#templates">Templates</a>
          </div>
          <div className="landing-nav-actions">
            <Link to="/ai-generate" className="landing-btn-primary">
              <Sparkles size={18} />
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-bg">
          <div className="landing-hero-glow landing-glow-1"></div>
          <div className="landing-hero-glow landing-glow-2"></div>
          <div className="landing-hero-glow landing-glow-3"></div>
        </div>
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <Sparkles size={14} />
            <span>AI-Powered Presentations</span>
          </div>
          <h1 className="landing-hero-title">
            Your presentations,<br />
            <span className="gradient-text">reimagined with AI.</span>
          </h1>
          <p className="landing-hero-subtitle">
            Create stunning, professional presentations in seconds. 
            Let AI handle the design while you focus on your message.
          </p>
          <div className="landing-hero-actions">
            <Link to="/ai-generate" className="landing-hero-btn-primary">
              <Wand2 size={20} />
              Create with AI
              <ArrowRight size={18} />
            </Link>
            <Link to="/templates" className="landing-hero-btn-secondary">
              <FileText size={20} />
              Browse Templates
            </Link>
          </div>
          <div className="landing-hero-stats">
            <div className="landing-stat">
              <span className="landing-stat-number">10K+</span>
              <span className="landing-stat-label">Presentations Created</span>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <span className="landing-stat-number">50+</span>
              <span className="landing-stat-label">Professional Templates</span>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <span className="landing-stat-number">5min</span>
              <span className="landing-stat-label">Average Creation Time</span>
            </div>
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-hero-card">
            <div className="landing-card-header">
              <div className="landing-card-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="landing-card-title">AI Presentation Generator</span>
            </div>
            <div className="landing-card-content">
              <div className="landing-card-input">
                <span className="landing-cursor">|</span>
                Create a presentation about renewable energy...
              </div>
              <div className="landing-card-slides">
                <div className="landing-mini-slide landing-slide-1">
                  <div className="landing-mini-header"></div>
                  <div className="landing-mini-body"></div>
                </div>
                <div className="landing-mini-slide landing-slide-2">
                  <div className="landing-mini-header"></div>
                  <div className="landing-mini-body"></div>
                </div>
                <div className="landing-mini-slide landing-slide-3">
                  <div className="landing-mini-header"></div>
                  <div className="landing-mini-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="landing-logos">
        <p>Trusted by professionals worldwide</p>
        <div className="landing-logos-grid">
          <div className="landing-logo-item">
            <Star size={24} />
            <span>Fortune 500</span>
          </div>
          <div className="landing-logo-item">
            <Users size={24} />
            <span>Startups</span>
          </div>
          <div className="landing-logo-item">
            <Globe size={24} />
            <span>Agencies</span>
          </div>
          <div className="landing-logo-item">
            <Clock size={24} />
            <span>Consultants</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="landing-features">
        <div className="landing-section-header">
          <span className="landing-section-badge">Features</span>
          <h2 className="landing-section-title">
            Everything you need to<br />
            <span className="gradient-text">create amazing presentations.</span>
          </h2>
        </div>
        <div className="landing-features-grid">
          <div className="landing-feature-card landing-feature-large">
            <div className="landing-feature-icon landing-icon-primary">
              <Wand2 size={28} />
            </div>
            <h3>AI-Powered Generation</h3>
            <p>Simply describe your topic and let our AI create a complete presentation with compelling content and professional design.</p>
            <div className="landing-feature-visual">
              <div className="landing-ai-demo">
                <div className="landing-ai-input">"Create a pitch deck for my startup"</div>
                <div className="landing-ai-arrow">→</div>
                <div className="landing-ai-output">
                  <div className="landing-ai-slide"></div>
                  <div className="landing-ai-slide"></div>
                  <div className="landing-ai-slide"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon landing-icon-secondary">
              <Edit3 size={24} />
            </div>
            <h3>Canva-Style Editor</h3>
            <p>Edit every slide with our intuitive drag-and-drop editor. Full control over text, images, and layout.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon landing-icon-tertiary">
              <FileText size={24} />
            </div>
            <h3>10+ Professional Templates</h3>
            <p>Choose from business, creative, minimalist, and more. Each template is crafted by professional designers.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon landing-icon-quaternary">
              <Download size={24} />
            </div>
            <h3>Export to PowerPoint</h3>
            <p>Download your presentations as .pptx files. Compatible with Microsoft PowerPoint, Google Slides, and Keynote.</p>
          </div>
          <div className="landing-feature-card landing-feature-large">
            <div className="landing-feature-icon landing-icon-primary">
              <Zap size={28} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Generate complete presentations in seconds, not hours. Save time and focus on what matters most.</p>
            <div className="landing-speed-demo">
              <div className="landing-speed-bar">
                <div className="landing-speed-fill"></div>
              </div>
              <span>5 slides generated in 3 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="landing-how">
        <div className="landing-section-header">
          <span className="landing-section-badge">How it Works</span>
          <h2 className="landing-section-title">
            Create presentations<br />
            <span className="gradient-text">in three simple steps.</span>
          </h2>
        </div>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <div className="landing-step-content">
              <h3>Describe Your Topic</h3>
              <p>Tell our AI what your presentation is about. Be as specific or as general as you like.</p>
            </div>
          </div>
          <div className="landing-step-arrow">
            <ChevronRight size={32} />
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <div className="landing-step-content">
              <h3>AI Generates Content</h3>
              <p>Our AI creates slides with titles, bullet points, and even suggests relevant images.</p>
            </div>
          </div>
          <div className="landing-step-arrow">
            <ChevronRight size={32} />
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <div className="landing-step-content">
              <h3>Edit & Download</h3>
              <p>Customize in our editor, then export to PowerPoint. Your presentation is ready to present!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="landing-templates">
        <div className="landing-section-header">
          <span className="landing-section-badge">Templates</span>
          <h2 className="landing-section-title">
            Professional designs<br />
            <span className="gradient-text">for every occasion.</span>
          </h2>
        </div>
        <div className="landing-templates-grid">
          <div className="landing-template-card landing-template-business">
            <div className="landing-template-preview">
              <div className="landing-tp-header"></div>
              <div className="landing-tp-body"></div>
            </div>
            <h4>Business Professional</h4>
            <p>Corporate presentations</p>
          </div>
          <div className="landing-template-card landing-template-creative">
            <div className="landing-template-preview">
              <div className="landing-tp-header"></div>
              <div className="landing-tp-body"></div>
            </div>
            <h4>Creative Purple</h4>
            <p>Artistic & bold</p>
          </div>
          <div className="landing-template-card landing-template-minimal">
            <div className="landing-template-preview">
              <div className="landing-tp-header"></div>
              <div className="landing-tp-body"></div>
            </div>
            <h4>Minimalist</h4>
            <p>Clean & simple</p>
          </div>
          <div className="landing-template-card landing-template-nature">
            <div className="landing-template-preview">
              <div className="landing-tp-header"></div>
              <div className="landing-tp-body"></div>
            </div>
            <h4>Nature Green</h4>
            <p>Eco-friendly</p>
          </div>
        </div>
        <div className="landing-templates-cta">
          <Link to="/templates" className="landing-btn-outline">
            View All Templates
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-cta-bg">
          <div className="landing-cta-glow"></div>
        </div>
        <div className="landing-cta-content">
          <h2>Ready to transform your presentations?</h2>
          <p>Join thousands of professionals creating stunning presentations with AI.</p>
          <Link to="/ai-generate" className="landing-cta-btn">
            <Sparkles size={20} />
            Start Creating Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="landing-footer-brand">
            <Link to="/" className="landing-logo">
              <img src="/logo.png" alt="PPT SaaS" />
              <span>PPT SaaS</span>
            </Link>
            <p>AI-powered presentation creation for everyone.</p>
          </div>
          <div className="landing-footer-links">
            <div className="landing-footer-column">
              <h4>Product</h4>
              <Link to="/ai-generate">AI Generate</Link>
              <Link to="/templates">Templates</Link>
              <Link to="/create">Create PPT</Link>
            </div>
            <div className="landing-footer-column">
              <h4>Resources</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#templates">Templates</a>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <p>© 2024 PPT SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
