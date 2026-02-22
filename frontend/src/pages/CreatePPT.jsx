import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Download, Loader2, FileText, Layers, GripVertical } from 'lucide-react'
import SlideEditor from '../components/SlideEditor'

const API_URL = 'http://localhost:8000'

function CreatePPT() {
  const [title, setTitle] = useState('')
  const [slides, setSlides] = useState([{ id: '1', title: '', content: '', order: 0 }])
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [generatedPPT, setGeneratedPPT] = useState(null)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/templates`)
      setTemplates(response.data)
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const addSlide = () => {
    setSlides([...slides, { 
      id: Date.now().toString(), 
      title: '', 
      content: '', 
      order: slides.length 
    }])
  }

  const removeSlide = (id) => {
    if (slides.length > 1) {
      const newSlides = slides.filter(s => s.id !== id)
      // Reorder
      newSlides.forEach((s, i) => s.order = i)
      setSlides(newSlides)
    }
  }

  const updateSlide = (id, field, value) => {
    setSlides(slides.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const moveSlide = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === slides.length - 1)
    ) {
      return
    }

    const newSlides = [...slides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap orders
    const tempOrder = newSlides[index].order
    newSlides[index].order = newSlides[targetIndex].order
    newSlides[targetIndex].order = tempOrder
    
    // Sort by order
    newSlides.sort((a, b) => a.order - b.order)
    setSlides(newSlides)
  }

  const generatePPT = async () => {
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a presentation title' })
      return
    }

    // Validate slides
    const hasEmptySlides = slides.some(s => !s.title.trim() || !s.content.trim())
    if (hasEmptySlides) {
      setMessage({ type: 'error', text: 'Please fill in all slide titles and content' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await axios.post(`${API_URL}/api/ppt/generate`, {
        title,
        slides: slides.map(s => ({
          title: s.title,
          content: s.content,
          layout: 'title_and_content'
        })),
        template_id: selectedTemplate,
        theme: 'default'
      })

      if (response.data.success) {
        setGeneratedPPT(response.data)
        setMessage({ type: 'success', text: 'Presentation generated successfully!' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error generating presentation. Please try again.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const openEditor = () => {
    setShowEditor(true)
  }

  const closeEditor = () => {
    setShowEditor(false)
  }

  if (showEditor && generatedPPT) {
    return (
      <div className="animate-fadeIn">
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="gradient-text">Edit Presentation</span>
          </h2>
        </div>
        <SlideEditor 
          pptId={generatedPPT.ppt_id} 
          onClose={closeEditor}
          onSave={() => setMessage({ type: 'success', text: 'Saved!' })}
        />
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.5rem' }}>
        <span className="gradient-text">Create Presentation</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Build your presentation slide by slide with full control over content.
      </p>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} />
          Presentation Title
        </h3>
        <input
          type="text"
          className="input"
          placeholder="Enter presentation title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {templates.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem' }}>
            Select Template (Optional)
          </h3>
          <div className="template-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {templates.map((template) => (
              <div
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(
                  selectedTemplate === template.id ? null : template.id
                )}
              >
                <h4>{template.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} />
          Slides ({slides.length})
        </h3>
        
        {slides.sort((a, b) => a.order - b.order).map((slide, index) => (
          <div key={slide.id} className="slide-editor">
            <div className="slide-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="slide-number">{index + 1}</div>
                <span style={{ color: 'var(--text-secondary)' }}>Slide {index + 1}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => moveSlide(index, 'up')}
                  disabled={index === 0}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    color: index === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                    padding: '0.25rem'
                  }}
                >
                  ▲
                </button>
                <button
                  onClick={() => moveSlide(index, 'down')}
                  disabled={index === slides.length - 1}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: index === slides.length - 1 ? 'not-allowed' : 'pointer',
                    color: index === slides.length - 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
                    padding: '0.25rem'
                  }}
                >
                  ▼
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={() => removeSlide(slide.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      padding: '0.25rem'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
            
            <input
              type="text"
              className="input"
              placeholder="Slide title..."
              value={slide.title}
              onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
              style={{ marginBottom: '0.75rem' }}
            />
            
            <textarea
              className="textarea"
              placeholder="Slide content (use • for bullet points)..."
              value={slide.content}
              onChange={(e) => updateSlide(slide.id, 'content', e.target.value)}
              style={{ minHeight: '100px' }}
            />
          </div>
        ))}
        
        <button className="add-slide-btn" onClick={addSlide}>
          <Plus size={20} />
          Add Slide
        </button>
      </div>

      {generatedPPT ? (
        <div className="card animate-fadeIn" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', color: '#10b981' }}>
            ✅ Presentation Created!
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="button" onClick={openEditor} style={{ flex: 1 }}>
              Edit Presentation
            </button>
            <button 
              className="button button-success" 
              onClick={() => window.open(`${API_URL}${generatedPPT.download_url}`, '_blank')}
              style={{ flex: 1 }}
            >
              <Download size={18} style={{ marginRight: '0.5rem' }} />
              Download
            </button>
          </div>
        </div>
      ) : (
        <button
          className="button"
          onClick={generatePPT}
          disabled={loading}
          style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}
        >
          {loading ? (
            <>
              <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
              Generating...
            </>
          ) : (
            <>
              <Download size={22} style={{ marginRight: '0.5rem' }} />
              Generate Presentation
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default CreatePPT
