import React, { useState } from 'react'
import { X, Check, ChevronLeft, ChevronRight, Layout, FileText, Type, Image as ImageIcon, Star, Palette, Waves, Circle, Square, Hexagon } from 'lucide-react'

function TemplatePreviewModal({ template, onClose, onUse }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Get template-specific preview slides based on template name
  const getTemplateSlides = (templateName) => {
    const name = templateName?.toLowerCase() || ''
    
    if (name.includes('business')) {
      return {
        color: '#1e3c72',
        accentColor: '#2a5298',
        bgColor: '#f8f9fa',
        slides: [
          { id: 'title', title: 'Business Strategy', content: 'Q4 2024 Strategic Planning\nCorporate Overview', icon: <Type size={20} />, layout: 'sidebar' },
          { id: 'content', title: 'Market Analysis', content: '• Revenue Growth: +25%\n• Market Share Expansion\n• Competitive Advantage\n• Strategic Partnerships', icon: <FileText size={20} />, layout: 'standard' },
          { id: 'data', title: 'Financial Overview', content: 'Q3 Performance Metrics\nRevenue | Expenses | Profit', icon: <Layout size={20} />, layout: 'split' },
          { id: 'team', title: 'Leadership Team', content: 'Executive Board Members\nVision & Direction', icon: <ImageIcon size={20} />, layout: 'cards' },
          { id: 'next', title: 'Next Steps', content: 'Implementation Timeline\nQ1 2025 Objectives', icon: <Layout size={20} />, layout: 'timeline' }
        ]
      }
    }
    
    if (name.includes('dark')) {
      return {
        color: '#00ffc8',
        accentColor: '#1e1e24',
        bgColor: '#2a2a30',
        slides: [
          { id: 'title', title: 'Tech Innovation', content: 'AI-Powered Solutions\nFuture of Technology', icon: <Type size={20} />, layout: 'neon' },
          { id: 'content', title: 'Product Features', content: '• Machine Learning\n• Neural Networks\n• Cloud Integration\n• Real-time Analytics', icon: <FileText size={20} />, layout: 'dark-card' },
          { id: 'code', title: 'Architecture', content: 'System Design\nMicroservices & APIs', icon: <Layout size={20} />, layout: 'code' },
          { id: 'stats', title: 'Performance', content: '99.9% Uptime\n<50ms Latency', icon: <ImageIcon size={20} />, layout: 'metrics' },
          { id: 'future', title: 'Roadmap', content: '2024 Development Plan\nNext Generation Tech', icon: <Layout size={20} />, layout: 'futuristic' }
        ]
      }
    }
    
    if (name.includes('minimal')) {
      return {
        color: '#333333',
        accentColor: '#e0e0e0',
        bgColor: '#ffffff',
        slides: [
          { id: 'title', title: 'Less is More', content: 'Minimalist Design\nPure & Simple', icon: <Type size={20} />, layout: 'centered' },
          { id: 'content', title: 'Core Values', content: 'Clarity\nSimplicity\nFocus\nPurpose', icon: <FileText size={20} />, layout: 'minimal-list' },
          { id: 'concept', title: 'Design Philosophy', content: 'White Space\nTypography\nBalance', icon: <Layout size={20} />, layout: 'zen' },
          { id: 'work', title: 'Selected Work', content: 'Portfolio Showcase\nClean Presentation', icon: <ImageIcon size={20} />, layout: 'gallery' },
          { id: 'contact', title: 'Get in Touch', content: 'hello@minimal.com\nSimple Communication', icon: <Layout size={20} />, layout: 'clean' }
        ]
      }
    }
    
    if (name.includes('nature') || name.includes('green')) {
      return {
        color: '#228b22',
        accentColor: '#90ee90',
        bgColor: '#f0fff0',
        slides: [
          { id: 'title', title: 'Sustainability', content: 'Eco-Friendly Solutions\nGreen Future', icon: <Type size={20} />, layout: 'organic' },
          { id: 'content', title: 'Environmental Impact', content: '• Carbon Neutral\n• Renewable Energy\n• Waste Reduction\n• Biodiversity', icon: <FileText size={20} />, layout: 'leaf' },
          { id: 'initiatives', title: 'Green Initiatives', content: 'Forest Conservation\nOcean Protection', icon: <Layout size={20} />, layout: 'earth' },
          { id: 'results', title: 'Our Impact', content: '1M Trees Planted\n50% Carbon Reduced', icon: <ImageIcon size={20} />, layout: 'stats-green' },
          { id: 'join', title: 'Join the Movement', content: 'Together for Earth\nSustainable Tomorrow', icon: <Layout size={20} />, layout: 'nature-footer' }
        ]
      }
    }
    
    if (name.includes('purple') || name.includes('creative')) {
      return {
        color: '#8a2be2',
        accentColor: '#da70d6',
        bgColor: '#faf5ff',
        slides: [
          { id: 'title', title: 'Creative Vision', content: 'Bold Ideas\nArtistic Expression', icon: <Type size={20} />, layout: 'bold-split' },
          { id: 'content', title: 'Design Process', content: '• Inspiration\n• Concept Development\n• Visual Design\n• Final Execution', icon: <FileText size={20} />, layout: 'creative-cards' },
          { id: 'portfolio', title: 'Our Work', content: 'Brand Identity\nDigital Experiences', icon: <Layout size={20} />, layout: 'mosaic' },
          { id: 'awards', title: 'Recognition', content: 'Design Awards 2024\nCreative Excellence', icon: <ImageIcon size={20} />, layout: 'trophy' },
          { id: 'start', title: 'Start Creating', content: 'Your Vision\nOur Expertise', icon: <Layout size={20} />, layout: 'creative-cta' }
        ]
      }
    }
    
    if (name.includes('orange') || name.includes('sunset')) {
      return {
        color: '#ff8c00',
        accentColor: '#ffd700',
        bgColor: '#fff8f0',
        slides: [
          { id: 'title', title: 'Energy & Passion', content: 'Drive Results\nInspire Action', icon: <Type size={20} />, layout: 'warm-glow' },
          { id: 'content', title: 'Sales Performance', content: '• 150% Target Achieved\n• New Market Entry\n• Customer Growth\n• Revenue Boost', icon: <FileText size={20} />, layout: 'fire' },
          { id: 'motivation', title: 'Team Spirit', content: 'Together We Rise\nChampions Mindset', icon: <Layout size={20} />, layout: 'sunburst' },
          { id: 'goals', title: '2024 Goals', content: 'Ambitious Targets\nUnstoppable Drive', icon: <ImageIcon size={20} />, layout: 'target' },
          { id: 'win', title: 'Victory', content: 'Success Awaits\nGo Get It!', icon: <Layout size={20} />, layout: 'celebration' }
        ]
      }
    }
    
    if (name.includes('blue') || name.includes('ocean')) {
      return {
        color: '#006994',
        accentColor: '#4db8ff',
        bgColor: '#f0f8ff',
        slides: [
          { id: 'title', title: 'Deep Dive', content: 'Ocean of Opportunities\nCalm & Professional', icon: <Type size={20} />, layout: 'waves' },
          { id: 'content', title: 'Market Research', content: '• Industry Analysis\n• Consumer Insights\n• Trend Forecasting\n• Growth Potential', icon: <FileText size={20} />, layout: 'flow' },
          { id: 'strategy', title: 'Blue Ocean Strategy', content: 'Untapped Markets\nCompetitive Edge', icon: <Layout size={20} />, layout: 'depth' },
          { id: 'trust', title: 'Why Choose Us', content: '15 Years Experience\nTrusted Partner', icon: <ImageIcon size={20} />, layout: 'anchor' },
          { id: 'future', title: 'Smooth Sailing', content: 'Navigate Success\nSteady Growth', icon: <Layout size={20} />, layout: 'horizon' }
        ]
      }
    }
    
    if (name.includes('gold') || name.includes('executive')) {
      return {
        color: '#b8860b',
        accentColor: '#ffd700',
        bgColor: '#fffaf0',
        slides: [
          { id: 'title', title: 'Excellence', content: 'Premium Quality\nLuxury Standards', icon: <Type size={20} />, layout: 'elegant' },
          { id: 'content', title: 'Board Overview', content: '• Q4 Financial Results\n• Strategic Investments\n• Shareholder Value\n• Market Leadership', icon: <FileText size={20} />, layout: 'premium' },
          { id: 'portfolio', title: 'Investment Portfolio', content: 'Diversified Assets\nWealth Management', icon: <Layout size={20} />, layout: 'gold-cards' },
          { id: 'legacy', title: 'Our Legacy', content: '50 Years of Excellence\nTrusted Excellence', icon: <ImageIcon size={20} />, layout: 'heritage' },
          { id: 'partner', title: 'Partnership', content: 'Premium Service\nExclusive Benefits', icon: <Layout size={20} />, layout: 'vip' }
        ]
      }
    }
    
    if (name.includes('startup') || name.includes('modern')) {
      return {
        color: '#6441a5',
        accentColor: '#ff6b6b',
        bgColor: '#f8f8ff',
        slides: [
          { id: 'title', title: 'Disrupt', content: 'Innovate & Scale\nStartup Mindset', icon: <Type size={20} />, layout: 'dynamic' },
          { id: 'problem', title: 'The Problem', content: 'Market Gap Identified\nSolution Ready', icon: <FileText size={20} />, layout: 'pitch' },
          { id: 'solution', title: 'Our Solution', content: 'Product Demo\nKey Features', icon: <Layout size={20} />, layout: 'showcase' },
          { id: 'traction', title: 'Traction', content: '10K Users\n$1M Revenue', icon: <ImageIcon size={20} />, layout: 'growth' },
          { id: 'invest', title: 'Invest', content: 'Seed Round Open\nJoin the Journey', icon: <Layout size={20} />, layout: 'funding' }
        ]
      }
    }
    
    if (name.includes('health') || name.includes('medical')) {
      return {
        color: '#00b3b3',
        accentColor: '#80e5e5',
        bgColor: '#f0ffff',
        slides: [
          { id: 'title', title: 'Care First', content: 'Patient Centered\nMedical Excellence', icon: <Type size={20} />, layout: 'clinical' },
          { id: 'services', title: 'Our Services', content: '• Primary Care\n• Specialist Consultation\n• Emergency Services\n• Preventive Care', icon: <FileText size={20} />, layout: 'medical-list' },
          { id: 'technology', title: 'Medical Tech', content: 'Latest Equipment\nAdvanced Diagnostics', icon: <Layout size={20} />, layout: 'tech-med' },
          { id: 'doctors', title: 'Expert Team', content: 'Board Certified\nExperienced Physicians', icon: <ImageIcon size={20} />, layout: 'team-med' },
          { id: 'book', title: 'Book Appointment', content: 'Easy Scheduling\nQuality Care', icon: <Layout size={20} />, layout: 'contact-med' }
        ]
      }
    }
    
    // Default fallback
    return {
      color: '#d4a574',
      accentColor: '#b8935f',
      bgColor: '#faf8f5',
      slides: [
        { id: 'title', title: template.name || 'Presentation', content: 'Welcome\nProfessional Template', icon: <Type size={20} />, layout: 'standard' },
        { id: 'content', title: 'Key Points', content: '• First Point\n• Second Point\n• Third Point\n• Fourth Point', icon: <FileText size={20} />, layout: 'standard' },
        { id: 'details', title: 'Details', content: 'More Information\nAbout This Topic', icon: <Layout size={20} />, layout: 'standard' },
        { id: 'visual', title: 'Visual', content: 'Charts & Graphs\nData Visualization', icon: <ImageIcon size={20} />, layout: 'standard' },
        { id: 'summary', title: 'Summary', content: 'Key Takeaways\nNext Steps', icon: <Layout size={20} />, layout: 'standard' }
      ]
    }
  }

  const templateData = getTemplateSlides(template.name)
  const sampleSlides = templateData.slides
  const themeColor = templateData.color
  const accentColor = templateData.accentColor
  const bgColor = templateData.bgColor

  const currentSlide = sampleSlides[currentSlideIndex]
  const totalSlides = sampleSlides.length

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index)
    }
  }

  const goToPrevious = () => goToSlide(currentSlideIndex - 1)
  const goToNext = () => goToSlide(currentSlideIndex + 1)

  // Get slide preview style based on layout
  const getSlidePreviewStyle = () => {
    const layout = currentSlide.layout
    const baseStyle = {
      background: bgColor,
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column'
    }
    
    return baseStyle
  }

  const getHeaderStyle = () => {
    const layout = currentSlide.layout
    
    if (layout === 'neon' || layout === 'dark-card' || layout === 'futuristic') {
      return { background: '#1e1e24', color: '#00ffc8', borderBottom: '1px solid #333' }
    }
    if (layout === 'sidebar' || layout === 'standard') {
      return { background: '#1e3c72', color: '#fff' }
    }
    if (layout === 'organic' || layout === 'leaf') {
      return { background: '#228b22', color: '#fff' }
    }
    if (layout === 'bold-split' || layout === 'creative-cards') {
      return { background: '#8a2be2', color: '#fff' }
    }
    if (layout === 'warm-glow' || layout === 'fire') {
      return { background: '#ff8c00', color: '#fff' }
    }
    if (layout === 'waves' || layout === 'flow') {
      return { background: '#006994', color: '#fff' }
    }
    if (layout === 'elegant' || layout === 'premium') {
      return { background: '#b8860b', color: '#fff' }
    }
    if (layout === 'dynamic' || layout === 'pitch') {
      return { background: '#6441a5', color: '#fff' }
    }
    if (layout === 'clinical' || layout === 'medical-list') {
      return { background: '#00b3b3', color: '#fff' }
    }
    if (layout === 'centered' || layout === 'minimal-list' || layout === 'zen') {
      return { background: '#f5f5f5', color: '#333', borderBottom: '1px solid #e0e0e0' }
    }
    
    return { background: themeColor, color: '#fff' }
  }

  const getContentStyle = () => {
    const layout = currentSlide.layout
    
    if (layout === 'neon' || layout === 'dark-card' || layout === 'code' || layout === 'futuristic') {
      return { 
        background: '#2a2a30', 
        color: '#e0e0e0',
        fontFamily: 'monospace'
      }
    }
    if (layout === 'centered' || layout === 'minimal-list' || layout === 'zen' || layout === 'clean') {
      return { background: '#ffffff', color: '#333' }
    }
    if (layout === 'organic' || layout === 'leaf' || layout === 'earth') {
      return { background: '#f0fff0', color: '#2d5a2d' }
    }
    if (layout === 'bold-split' || layout === 'creative-cards' || layout === 'mosaic') {
      return { background: '#faf5ff', color: '#4a148c' }
    }
    if (layout === 'warm-glow' || layout === 'fire' || layout === 'sunburst') {
      return { background: '#fff8f0', color: '#8b4513' }
    }
    if (layout === 'waves' || layout === 'flow' || layout === 'depth') {
      return { background: '#f0f8ff', color: '#003366' }
    }
    if (layout === 'elegant' || layout === 'premium' || layout === 'gold-cards') {
      return { background: '#fffaf0', color: '#5c4b00' }
    }
    if (layout === 'dynamic' || layout === 'pitch' || layout === 'showcase') {
      return { background: '#f8f8ff', color: '#3d2b5a' }
    }
    if (layout === 'clinical' || layout === 'medical-list' || layout === 'tech-med') {
      return { background: '#f0ffff', color: '#006666' }
    }
    
    return { background: '#ffffff', color: '#333' }
  }

  const headerStyle = getHeaderStyle()
  const contentStyle = getContentStyle()

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="preview-header">
          <div className="preview-header-info">
            <h3>{template.name}</h3>
            <span>Template Preview • Slide {currentSlideIndex + 1} of {totalSlides}</span>
          </div>
          <div className="preview-header-actions">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.75rem',
              background: 'rgba(212, 165, 116, 0.1)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'var(--primary)'
            }}>
              <Star size={14} />
              <span>Sample Template</span>
            </div>
            <button className="preview-btn-primary" onClick={onUse}>
              <Check size={16} />
              Use Template
            </button>
            <button className="preview-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="preview-body">
          {/* Left Sidebar - Slide Types */}
          <div className="preview-sidebar">
            <div className="preview-sidebar-header">
              <span>Slide Layouts</span>
            </div>
            <div className="preview-thumbnails">
              {sampleSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`preview-thumbnail ${index === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="preview-thumbnail-number" style={{ 
                    background: index === currentSlideIndex ? themeColor : 'var(--gradient-primary)',
                    color: index === currentSlideIndex ? '#fff' : '#1A1510'
                  }}>
                    {slide.icon}
                  </div>
                  <div className="preview-thumbnail-content">
                    <div className="preview-thumbnail-title">{slide.title}</div>
                    <div className="preview-thumbnail-text">
                      {slide.content.substring(0, 25)}...
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Main Preview */}
          <div className="preview-main">
            <div className="preview-slide-wrapper">
              <div className="preview-slide-canvas" style={getSlidePreviewStyle()}>
                {/* Slide Header */}
                <div 
                  className="preview-slide-header-bar" 
                  style={{ 
                    background: headerStyle.background,
                    color: headerStyle.color,
                    borderBottom: headerStyle.borderBottom || 'none'
                  }}
                >
                  <span 
                    className="preview-slide-number-badge"
                    style={{ 
                      background: currentSlideIndex === 0 ? 'rgba(255,255,255,0.2)' : themeColor,
                      color: '#fff'
                    }}
                  >
                    {currentSlideIndex + 1}
                  </span>
                  <span className="preview-slide-title-text">{currentSlide.title}</span>
                </div>
                
                {/* Slide Content */}
                <div 
                  className="preview-slide-body" 
                  style={{ 
                    background: contentStyle.background,
                    color: contentStyle.color,
                    fontFamily: contentStyle.fontFamily || 'inherit'
                  }}
                >
                  <h2 
                    className="preview-slide-heading"
                    style={{ 
                      color: contentStyle.color,
                      borderBottom: `2px solid ${themeColor}`
                    }}
                  >
                    {currentSlide.title}
                  </h2>
                  <div className="preview-slide-content-text">
                    {currentSlide.content.split('\n').map((line, i) => (
                      <p 
                        key={i} 
                        className="preview-slide-line"
                        style={{ color: contentStyle.color }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              className="preview-nav-arrow preview-nav-prev" 
              onClick={goToPrevious}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="preview-nav-arrow preview-nav-next" 
              onClick={goToNext}
              disabled={currentSlideIndex === totalSlides - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="preview-footer">
          <div className="preview-footer-info">
            <span>{template.name}</span>
            <span>•</span>
            <span>{template.description}</span>
          </div>
          <div className="preview-footer-nav">
            <button onClick={goToPrevious} disabled={currentSlideIndex === 0}>
              <ChevronLeft size={16} />
              Previous
            </button>
            <span>{currentSlideIndex + 1} / {totalSlides}</span>
            <button onClick={goToNext} disabled={currentSlideIndex === totalSlides - 1}>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplatePreviewModal
