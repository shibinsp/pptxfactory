import React, { useState } from 'react'
import { X, Edit3, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

function PreviewModal({ ppt, onClose, onEdit, onDownload }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [zoom, setZoom] = useState(100)

  if (!ppt || !ppt.slides) return null

  const currentSlide = ppt.slides[currentSlideIndex]
  const totalSlides = ppt.slides.length

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index)
    }
  }

  const goToPrevious = () => goToSlide(currentSlideIndex - 1)
  const goToNext = () => goToSlide(currentSlideIndex + 1)

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 150))
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50))

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="preview-header">
          <div className="preview-header-info">
            <h3>{ppt.title}</h3>
            <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
          </div>
          <div className="preview-header-actions">
            <div className="preview-zoom-controls">
              <button onClick={handleZoomOut} title="Zoom Out">
                <ZoomOut size={18} />
              </button>
              <span>{zoom}%</span>
              <button onClick={handleZoomIn} title="Zoom In">
                <ZoomIn size={18} />
              </button>
            </div>
            <button className="preview-btn-secondary" onClick={onEdit}>
              <Edit3 size={16} />
              Edit
            </button>
            <button className="preview-btn-primary" onClick={onDownload}>
              <Download size={16} />
              Download
            </button>
            <button className="preview-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="preview-body">
          {/* Left Sidebar - Thumbnails */}
          <div className="preview-sidebar">
            <div className="preview-sidebar-header">
              <span>Slides</span>
            </div>
            <div className="preview-thumbnails">
              {ppt.slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`preview-thumbnail ${index === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="preview-thumbnail-number">{index + 1}</div>
                  <div className="preview-thumbnail-content">
                    <div className="preview-thumbnail-title">{slide.title}</div>
                    <div className="preview-thumbnail-text">
                      {slide.content?.substring(0, 40)}...
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Main Preview */}
          <div className="preview-main">
            <div className="preview-slide-wrapper" style={{ transform: `scale(${zoom / 100})` }}>
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
                    {currentSlide.content?.split('\n').map((line, i) => (
                      <p key={i} className="preview-slide-line">{line}</p>
                    ))}
                  </div>
                  {currentSlide.image_url && (
                    <div className="preview-slide-image-container">
                      <img src={currentSlide.image_url} alt={currentSlide.title} />
                    </div>
                  )}
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
            <span>{ppt.title}</span>
            <span>•</span>
            <span>{totalSlides} slides</span>
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

export default PreviewModal
