import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Download, Loader2 } from 'lucide-react'

const API_URL = 'http://localhost:8000'

function CreatePPT() {
  const [title, setTitle] = useState('')
  const [slides, setSlides] = useState([{ title: '', content: '' }])
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

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
    setSlides([...slides, { title: '', content: '' }])
  }

  const removeSlide = (index) => {
    if (slides.length > 1) {
      setSlides(slides.filter((_, i) => i !== index))
    }
  }

  const updateSlide = (index, field, value) => {
    const newSlides = [...slides]
    newSlides[index][field] = value
    setSlides(newSlides)
  }

  const generatePPT = async () => {
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a presentation title' })
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
        setMessage({ type: 'success', text: 'Presentation generated successfully!' })
        // Trigger download
        const downloadUrl = `${API_URL}${response.data.download_url}`
        window.open(downloadUrl, '_blank')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error generating presentation. Please try again.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Create Presentation</h2>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <h3>Presentation Title</h3>
        <input
          type="text"
          className="input"
          placeholder="Enter presentation title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {templates.length > 0 && (
        <div className="card">
          <h3>Select Template (Optional)</h3>
          <div className="template-grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(
                  selectedTemplate === template.id ? null : template.id
                )}
              >
                <h4>{template.name}</h4>
                <p style={{ color: '#666', fontSize: '0.875rem' }}>{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h3>Slides</h3>
        
        {slides.map((slide, index) => (
          <div key={index} className="slide-editor">
            <div className="slide-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="slide-number">{index + 1}</div>
                <span>Slide {index + 1}</span>
              </div>
              
              {slides.length > 1 && (
                <button
                  onClick={() => removeSlide(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444'
                  }}
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
            
            <input
              type="text"
              className="input"
              placeholder="Slide title..."
              value={slide.title}
              onChange={(e) => updateSlide(index, 'title', e.target.value)}
              style={{ marginBottom: '0.5rem' }}
            />
            
            <textarea
              className="textarea"
              placeholder="Slide content..."
              value={slide.content}
              onChange={(e) => updateSlide(index, 'content', e.target.value)}
            />
          </div>
        ))}
        
        <button className="add-slide-btn" onClick={addSlide}>
          <Plus size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Add Slide
        </button>
      </div>

      <button
        className="button"
        onClick={generatePPT}
        disabled={loading}
        style={{ width: '100%', fontSize: '1.25rem' }}
      >
        {loading ? (
          <>
            <Loader2 size={20} style={{ display: 'inline', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
            Generating...
          </>
        ) : (
          <>
            <Download size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Generate Presentation
          </>
        )}
      </button>
    </div>
  )
}

export default CreatePPT