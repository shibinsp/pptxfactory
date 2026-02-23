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
  Layers,
  Eye,
  Image as ImageIcon,
  Check
} from 'lucide-react'
import SlideEditor from '../components/SlideEditor'
import PreviewModal from '../components/PreviewModal'

const API_URL = 'http://localhost:8000'

function AIGenerate() {
  const [prompt, setPrompt] = useState('')
  const [numSlides, setNumSlides] = useState(5)
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [includeImages, setIncludeImages] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [generatedPPT, setGeneratedPPT] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

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
    setShowPreview(false)

    try {
      const response = await axios.post(`${API_URL}/api/ppt/generate-ai`, {
        prompt,
        num_slides: numSlides,
        template_id: selectedTemplate,
        theme: 'default',
        include_images: includeImages
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

  // Preview Modal
  if (showPreview && generatedPPT) {
    return (
      <PreviewModal 
        ppt={generatedPPT}
        onClose={() => setShowPreview(false)}
        onEdit={() => {
          setShowPreview(false)
          setShowEditor(true)
        }}
        onDownload={downloadPPT}
      />
    )
  }

  if (showEditor && generatedPPT) {
    return (
      <div className="animate-fadeIn">
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Edit3 size={24} className="gradient-text" />
            <span className="gradient-text">Edit Presentation</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem', fontSize: '0.9rem' }}>
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
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ 
          width: '72px', 
          height: '72px', 
          margin: '0 auto 1.25rem',
          background: 'var(--gradient-primary)',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="./logo.png" alt="Bee" style={{ width: '48px', height: '48px', borderRadius: '10px' }} />
        </div>
        
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', marginBottom: '0.875rem' }}>
          <span className="gradient-text">AI Presentation Generator</span>
        </h2>
        
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 1.75rem' }}>
          Describe your presentation idea and let our AI create a professional, engaging slide deck in seconds.
        </p>

        {message && (
          <div className={`alert alert-${message.type}`} style={{ maxWidth: '650px', margin: '0 auto 1.25rem' }}>
            {message.text}
          </div>
        )}

        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <textarea
            className="textarea"
            placeholder="Example: Create a presentation about the benefits of artificial intelligence in healthcare, covering diagnosis accuracy, personalized treatment, and future trends..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ 
              minHeight: '100px', 
              marginBottom: '1.25rem',
              fontSize: '1rem'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '1.25rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <Layers size={14} style={{ display: 'inline', marginRight: '0.375rem' }} />
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
              <label style={{ display: 'block', marginBottom: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <FileText size={14} style={{ display: 'inline', marginRight: '0.375rem' }} />
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
                    {template.name} {template.is_builtin ? '★' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Include Images Toggle */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            padding: '0.875rem',
            background: 'var(--bg-input)',
            borderRadius: '10px',
            border: '1px solid var(--border)'
          }}>
            <button
              onClick={() => setIncludeImages(!includeImages)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: includeImages ? 'rgba(212, 165, 116, 0.2)' : 'transparent',
                border: `1px solid ${includeImages ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                color: includeImages ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem'
              }}
            >
              <ImageIcon size={18} />
              {includeImages ? (
                <>
                  <Check size={14} />
                  Images Enabled
                </>
              ) : (
                'Include Images'
              )}
            </button>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              AI will search and add relevant images to slides
            </span>
          </div>

          <button
            className="button"
            onClick={generateWithAI}
            disabled={loading}
            style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }}
          >
            {loading ? (
              <>
                <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
                Generating with AI...
              </>
            ) : (
              <>
                <Wand2 size={22} />
                Generate Presentation
              </>
            )}
          </button>
        </div>
      </div>

      {generatedPPT && (
        <div className="card animate-slideIn">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.35rem', marginBottom: '0.375rem' }}>
                {generatedPPT.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {generatedPPT.slides_count} slides • {generatedPPT.ai_generated ? 'AI Generated' : 'Smart Template'}
                {includeImages && ' • With Images'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              <button 
                className="button button-secondary"
                onClick={() => setShowPreview(true)}
              >
                <Eye size={16} style={{ marginRight: '0.375rem' }} />
                Preview
              </button>
              <button 
                className="button button-secondary"
                onClick={openEditor}
              >
                <Edit3 size={16} style={{ marginRight: '0.375rem' }} />
                Edit
              </button>
              <button 
                className="button button-success"
                onClick={downloadPPT}
              >
                <Download size={16} style={{ marginRight: '0.375rem' }} />
                Download
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '0.875rem',
            marginTop: '1.25rem'
          }}>
            {generatedPPT.slides?.map((slide, index) => (
              <div 
                key={slide.id} 
                className="slide-thumbnail"
                style={{ cursor: 'default' }}
              >
                <div className="slide-thumbnail-number">{index + 1}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {slide.title}
                </div>
                <div className="slide-thumbnail-content">
                  {slide.content?.substring(0, 70)}...
                </div>
                {slide.image_url && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img 
                      src={slide.image_url} 
                      alt="" 
                      style={{ 
                        width: '100%', 
                        height: '60px', 
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Zap size={36} style={{ color: 'var(--primary)', marginBottom: '0.875rem' }} />
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.05rem' }}>Lightning Fast</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Generate complete presentations in seconds with our advanced AI.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Edit3 size={36} style={{ color: 'var(--primary-light)', marginBottom: '0.875rem' }} />
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.05rem' }}>Full Control</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Edit every slide with our Canva-like editor before downloading.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Sparkles size={36} style={{ color: 'var(--secondary)', marginBottom: '0.875rem' }} />
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.05rem' }}>Professional Quality</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            AI-generated content that's engaging, accurate, and ready to present.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.875rem', fontSize: '1.15rem' }}>
          💡 Example Prompts
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem' }}>
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
              style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '0.7rem' }}
            >
              <ChevronRight size={16} style={{ marginRight: '0.375rem', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem' }}>{example}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIGenerate
