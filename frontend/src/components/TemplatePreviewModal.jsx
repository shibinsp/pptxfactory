import React, { useState } from 'react'
import { X, Check, ChevronLeft, ChevronRight, Layout, FileText, Type, Image as ImageIcon, Star } from 'lucide-react'

function TemplatePreviewModal({ template, onClose, onUse }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Sample slides for template preview
  const sampleSlides = [
    {
      id: 'title',
      title: 'Title Slide',
      content: 'Presentation Title\nSubtitle or description goes here',
      icon: <Type size={20} />
    },
    {
      id: 'content',
      title: 'Content Slide',
      content: '• Main point one with details\n• Main point two with supporting info\n• Main point three for emphasis\n• Key takeaway and conclusion',
      icon: <FileText size={20} />
    },
    {
      id: 'twocolumn',
      title: 'Two Column Layout',
      content: 'Left Column:\n• Feature one\n• Feature two\n\nRight Column:\n• Benefit one\n• Benefit two',
      icon: <Layout size={20} />
    },
    {
      id: 'image',
      title: 'Visual Content',
      content: 'Perfect for showcasing images, diagrams, or visual data alongside descriptive text.',
      icon: <ImageIcon size={20} />
    },
    {
      id: 'section',
      title: 'Section Divider',
      content: 'New Section\nTransition to a new topic or chapter',
      icon: <Layout size={20} />
    }
  ]

  const currentSlide = sampleSlides[currentSlideIndex]
  const totalSlides = sampleSlides.length

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index)
    }
  }

  const goToPrevious = () => goToSlide(currentSlideIndex - 1)
  const goToNext = () => goToSlide(currentSlideIndex + 1)

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
                  <div className="preview-thumbnail-number">{slide.icon}</div>
                  <div className="preview-thumbnail-content">
                    <div className="preview-thumbnail-title">{slide.title}</div>
                    <div className="preview-thumbnail-text">
                      {slide.content.substring(0, 30)}...
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Main Preview */}
          <div className="preview-main">
            <div className="preview-slide-wrapper">
              <div className="preview-slide-canvas">
                {/* Slide Header */}
                <div className="preview-slide-header-bar">
                  <span className="preview-slide-number-badge">{currentSlideIndex + 1}</span>
                  <span className="preview-slide-title-text">{currentSlide.title}</span>
                </div>
                
                {/* Slide Content */}
                <div className="preview-slide-body">
                  <h2 className="preview-slide-heading">{currentSlide.title}</h2>
                  <div className="preview-slide-content-text">
                    {currentSlide.content.split('\n').map((line, i) => (
                      <p key={i} className="preview-slide-line">{line}</p>
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
