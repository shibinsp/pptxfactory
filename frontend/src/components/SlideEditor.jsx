import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  GripVertical, 
  Trash2, 
  Plus, 
  ChevronUp, 
  ChevronDown,
  Save,
  Download,
  X,
  Type,
  Layout,
  Image as ImageIcon,
  Palette
} from 'lucide-react'

const API_URL = 'http://localhost:8000'

function SlideEditor({ pptId, onClose, onSave }) {
  const [ppt, setPpt] = useState(null)
  const [selectedSlideId, setSelectedSlideId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [draggedSlide, setDraggedSlide] = useState(null)

  useEffect(() => {
    fetchPPT()
  }, [pptId])

  const fetchPPT = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/ppt/${pptId}`)
      setPpt(response.data)
      if (response.data.slides.length > 0) {
        setSelectedSlideId(response.data.slides[0].id)
      }
      setLoading(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load presentation' })
      setLoading(false)
    }
  }

  const selectedSlide = ppt?.slides.find(s => s.id === selectedSlideId)

  const updateSlide = (slideId, updates) => {
    setPpt(prev => ({
      ...prev,
      slides: prev.slides.map(s => 
        s.id === slideId ? { ...s, ...updates } : s
      )
    }))
  }

  const addSlide = () => {
    const newSlide = {
      id: `temp-${Date.now()}`,
      title: 'New Slide',
      content: '• Add your content here',
      order: ppt.slides.length
    }
    setPpt(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }))
    setSelectedSlideId(newSlide.id)
  }

  const deleteSlide = (slideId) => {
    if (ppt.slides.length <= 1) {
      setMessage({ type: 'error', text: 'Cannot delete the last slide' })
      return
    }
    
    const newSlides = ppt.slides.filter(s => s.id !== slideId)
    // Reorder remaining slides
    newSlides.forEach((s, i) => s.order = i)
    
    setPpt(prev => ({ ...prev, slides: newSlides }))
    
    if (selectedSlideId === slideId) {
      setSelectedSlideId(newSlides[0]?.id)
    }
  }

  const moveSlide = (slideId, direction) => {
    const index = ppt.slides.findIndex(s => s.id === slideId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === ppt.slides.length - 1)
    ) {
      return
    }

    const newSlides = [...ppt.slides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap orders
    const tempOrder = newSlides[index].order
    newSlides[index].order = newSlides[targetIndex].order
    newSlides[targetIndex].order = tempOrder
    
    // Sort by order
    newSlides.sort((a, b) => a.order - b.order)
    
    setPpt(prev => ({ ...prev, slides: newSlides }))
  }

  const handleDragStart = (slide) => {
    setDraggedSlide(slide)
  }

  const handleDragOver = (e, targetSlide) => {
    e.preventDefault()
    if (!draggedSlide || draggedSlide.id === targetSlide.id) return

    const newSlides = [...ppt.slides]
    const draggedIndex = newSlides.findIndex(s => s.id === draggedSlide.id)
    const targetIndex = newSlides.findIndex(s => s.id === targetSlide.id)

    // Swap orders
    const tempOrder = newSlides[draggedIndex].order
    newSlides[draggedIndex].order = newSlides[targetIndex].order
    newSlides[targetIndex].order = tempOrder

    newSlides.sort((a, b) => a.order - b.order)
    setPpt(prev => ({ ...prev, slides: newSlides }))
  }

  const handleDrop = () => {
    setDraggedSlide(null)
  }

  const savePPT = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await axios.put(`${API_URL}/api/ppt/${pptId}`, {
        title: ppt.title,
        slides: ppt.slides.map(s => ({
          id: s.id,
          title: s.title,
          content: s.content,
          order: s.order
        }))
      })

      setMessage({ type: 'success', text: 'Presentation saved successfully!' })
      if (onSave) onSave(response.data)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save presentation' })
    } finally {
      setSaving(false)
    }
  }

  const downloadPPT = () => {
    window.open(`${API_URL}/api/ppt/download/${pptId}`, '_blank')
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="editor-container animate-fadeIn">
      {/* Left Sidebar - Slide Thumbnails */}
      <div className="editor-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem' }}>Slides</h3>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {ppt.slides.length} slides
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {ppt.slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide-thumbnail ${selectedSlideId === slide.id ? 'active' : ''}`}
              onClick={() => setSelectedSlideId(slide.id)}
              draggable
              onDragStart={() => handleDragStart(slide)}
              onDragOver={(e) => handleDragOver(e, slide)}
              onDrop={handleDrop}
            >
              <div className="slide-thumbnail-number">{index + 1}</div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                {slide.title}
              </div>
              <div className="slide-thumbnail-content">
                {slide.content.substring(0, 50)}...
              </div>
            </div>
          ))}
        </div>

        <button 
          className="add-slide-btn" 
          onClick={addSlide}
          style={{ marginTop: '1rem' }}
        >
          <Plus size={20} />
          Add Slide
        </button>
      </div>

      {/* Center - Preview Canvas */}
      <div className="editor-canvas">
        {selectedSlide ? (
          <div className="preview-slide animate-fadeIn">
            <div className="preview-slide-title">
              {selectedSlide.title}
            </div>
            <div className="preview-slide-content">
              {selectedSlide.content}
            </div>
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
            Select a slide to preview
          </div>
        )}
      </div>

      {/* Right Sidebar - Properties */}
      <div className="editor-properties">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem' }}>Properties</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`} style={{ marginBottom: '1rem' }}>
            {message.text}
          </div>
        )}

        {selectedSlide ? (
          <div className="animate-slideIn">
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Type size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Slide Title
              </label>
              <input
                type="text"
                className="input"
                value={selectedSlide.title}
                onChange={(e) => updateSlide(selectedSlide.id, { title: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Layout size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Content
              </label>
              <textarea
                className="textarea"
                value={selectedSlide.content}
                onChange={(e) => updateSlide(selectedSlide.id, { content: e.target.value })}
                style={{ minHeight: '200px' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Reorder Slide
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="button button-secondary"
                  onClick={() => moveSlide(selectedSlide.id, 'up')}
                  style={{ flex: 1, padding: '0.5rem' }}
                >
                  <ChevronUp size={18} />
                </button>
                <button 
                  className="button button-secondary"
                  onClick={() => moveSlide(selectedSlide.id, 'down')}
                  style={{ flex: 1, padding: '0.5rem' }}
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            <button 
              className="button button-danger"
              onClick={() => deleteSlide(selectedSlide.id)}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <Trash2 size={18} style={{ marginRight: '0.5rem' }} />
              Delete Slide
            </button>
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            Select a slide to edit
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
          <button 
            className="button"
            onClick={savePPT}
            disabled={saving}
            style={{ width: '100%', marginBottom: '0.75rem' }}
          >
            {saving ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2, marginRight: '0.5rem' }} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} style={{ marginRight: '0.5rem' }} />
                Save Changes
              </>
            )}
          </button>

          <button 
            className="button button-success"
            onClick={downloadPPT}
            style={{ width: '100%' }}
          >
            <Download size={18} style={{ marginRight: '0.5rem' }} />
            Download PPT
          </button>
        </div>
      </div>
    </div>
  )
}

export default SlideEditor
