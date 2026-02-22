import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Wand2, 
  Download, 
  Loader2, 
  Sparkles, 
  FileText, 
  Edit3,
  ChevronRight,
  Zap,
  Layers
} from 'lucide-react'
import SlideEditor from '../components/SlideEditor'

const API_URL = 'http://localhost:8000'

function AIGenerate() {
  const [prompt, setPrompt] = useState('')
  const [numSlides, setNumSlides] = useState(5)
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

  const generateWithAI = async () => {
    if (!prompt.trim()) {
      setMessage({ type: 'error', text: 'Please enter a prompt for the AI' })
      return
    }

    setLoading(true)
    setMessage(null)
    setGeneratedPPT(null)
    setShowEditor(false)

    try {
      const response = await axios.post(`${API_URL}/api/ppt/generate-ai`, {
        prompt,
        num_slides: numSlides,
        template_id: selectedTemplate,
        theme: 'default'
      })

      if (response.data.success) {
        setGeneratedPPT(response.data)
        setMessage({ 
          type: 'success', 
          text: response.data.ai_generated 
            ? `✨ Presentation "${response.data.title}" generated with AI!` 
            : `📋 Presentation "${response.data.title}" generated with smart templates`
        })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error generating presentation. Please try again.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const downloadPPT = () => {
    if (generatedPPT) {
      window.open(`${API_URL}${generatedPPT.download_url}`, '_blank')
    }
  }

  const openEditor = () => {
    setShowEditor(true)
  }

  const closeEditor = () => {
    setShowEditor(false)
  }

  const handleSave = (updatedPPT) => {
    setGeneratedPPT(prev => ({
      ...prev,
      title: updatedPPT.title,
      slides: updatedPPT.slides
    }))
    setMessage({ type: 'success', text: 'Presentation updated successfully!' })
  }

  if (showEditor && generatedPPT) {
    return (
      <div className="animate-fadeIn">
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Edit3 size={28} className="gradient-text" />
            <span className="gradient-text">Edit Presentation</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {generatedPPT.title}
          </p>
        </div>
        <SlideEditor 
          pptId={generatedPPT.ppt_id} 
          onClose={closeEditor}
          onSave={handleSave}
        />
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <div className="card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          margin: '0 auto 1.5rem',
          background: 'var(--gradient-primary)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={40} color="white" />
        </div>
        
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2.5rem', marginBottom: '1rem' }}>
          <span className="gradient-text">AI Presentation Generator</span>
        </h2>
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Describe your presentation idea and let our AI create a professional, engaging slide deck in seconds.
        </p>

        {message && (
          <div className={`alert alert-${message.type}`} style={{ maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            {message.text}
          </div>
        )}

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <textarea
            className="textarea"
            placeholder="Example: Create a presentation about the benefits of artificial intelligence in healthcare, covering diagnosis accuracy, personalized treatment, and future trends..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ 
              minHeight: '120px', 
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Layers size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Number of Slides
              </label>
              <input
                type="number"
                className="input"
                min="3"
                max="15"
                value={numSlides}
                onChange={(e) => setNumSlides(parseInt(e.target.value) || 5)}
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <FileText size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Template (Optional)
              </label>
              <select 
                className="input"
                value={selectedTemplate || ''}
                onChange={(e) => setSelectedTemplate(e.target.value || null)}
              >
                <option value="">Default Template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="button"
            onClick={generateWithAI}
            disabled={loading}
            style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}
          >
            {loading ? (
              <>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
                Generating with AI...
              </>
            ) : (
              <>
                <Wand2 size={24} />
                Generate Presentation
              </>
            )}
          </button>
        </div>
      </div>

      {generatedPPT && (
        <div className="card animate-slideIn">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {generatedPPT.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                {generatedPPT.slides_count} slides • {generatedPPT.ai_generated ? 'AI Generated' : 'Smart Template'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="button button-secondary"
                onClick={openEditor}
              >
                <Edit3 size={18} style={{ marginRight: '0.5rem' }} />
                Edit
              </button>
              <button 
                className="button button-success"
                onClick={downloadPPT}
              >
                <Download size={18} style={{ marginRight: '0.5rem' }} />
                Download
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            {generatedPPT.slides?.map((slide, index) => (
              <div 
                key={slide.id} 
                className="slide-thumbnail"
                style={{ cursor: 'default' }}
              >
                <div className="slide-thumbnail-number">{index + 1}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {slide.title}
                </div>
                <div className="slide-thumbnail-content">
                  {slide.content?.substring(0, 80)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Zap size={40} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
          <h3>Lightning Fast</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Generate complete presentations in seconds with our advanced AI.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Edit3 size={40} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
          <h3>Full Control</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Edit every slide with our Canva-like editor before downloading.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Sparkles size={40} style={{ color: 'var(--primary-light)', marginBottom: '1rem' }} />
          <h3>Professional Quality</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            AI-generated content that's engaging, accurate, and ready to present.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem' }}>
          💡 Example Prompts
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            "Renewable energy benefits and future",
            "Digital marketing strategies for startups",
            "AI in healthcare: Transforming patient care",
            "Cybersecurity best practices for remote work",
            "Sustainable business growth strategies",
            "The future of electric vehicles"
          ].map((example, i) => (
            <button
              key={i}
              className="button button-secondary"
              onClick={() => setPrompt(example)}
              style={{ justifyContent: 'flex-start', textAlign: 'left' }}
            >
              <ChevronRight size={16} style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIGenerate
