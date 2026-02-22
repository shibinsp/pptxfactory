import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  File, 
  Trash2, 
  Loader2, 
  FolderOpen, 
  Plus, 
  Eye, 
  X,
  Check,
  Star,
  Layout
} from 'lucide-react'

const API_URL = 'http://localhost:8000'

function Templates() {
  const [templates, setTemplates] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [uploadData, setUploadData] = useState({
    name: '',
    description: ''
  })
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [previewData, setPreviewData] = useState(null)

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

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    
    if (!file.name.endsWith('.pptx')) {
      setMessage({ type: 'error', text: 'Please upload a .pptx file' })
      return
    }

    setUploading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', uploadData.name || file.name)
    formData.append('description', uploadData.description)

    try {
      const response = await axios.post(`${API_URL}/api/templates/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Template uploaded successfully!' })
        setUploadData({ name: '', description: '' })
        fetchTemplates()
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error uploading template. Please try again.' })
      console.error(error)
    } finally {
      setUploading(false)
    }
  }, [uploadData])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    multiple: false
  })

  const deleteTemplate = async (id, isBuiltin) => {
    if (isBuiltin) {
      setMessage({ type: 'error', text: 'Built-in templates cannot be deleted' })
      return
    }
    
    if (!window.confirm('Are you sure you want to delete this template?')) return

    try {
      await axios.delete(`${API_URL}/api/templates/${id}`)
      setMessage({ type: 'success', text: 'Template deleted successfully!' })
      fetchTemplates()
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Error deleting template.' })
      console.error(error)
    }
  }

  const openPreview = async (template) => {
    setPreviewTemplate(template)
    try {
      const response = await axios.get(`${API_URL}/api/templates/${template.id}/preview`)
      setPreviewData(response.data)
    } catch (error) {
      console.error('Error loading preview:', error)
    }
  }

  const closePreview = () => {
    setPreviewTemplate(null)
    setPreviewData(null)
  }

  // Group templates into built-in and custom
  const builtinTemplates = templates.filter(t => t.is_builtin)
  const customTemplates = templates.filter(t => !t.is_builtin)

  return (
    <div className="animate-fadeIn">
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.5rem' }}>
        <span className="gradient-text">Templates</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Choose from our professional templates or upload your own for consistent branding.
      </p>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Upload Section */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          Upload New Template
        </h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            className="input"
            placeholder="Template name..."
            value={uploadData.name}
            onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
            style={{ marginBottom: '0.75rem' }}
          />
          <input
            type="text"
            className="input"
            placeholder="Description (optional)..."
            value={uploadData.description}
            onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
          />
        </div>

        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div>
              <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Uploading...</p>
            </div>
          ) : (
            <div>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1rem',
                background: 'var(--gradient-primary)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Upload size={32} color="white" />
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                {isDragActive ? 'Drop the file here' : 'Drag & drop a .pptx file here'}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                or click to select file
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sample Templates */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={20} style={{ color: 'var(--primary)' }} />
          Sample Templates ({builtinTemplates.length})
        </h3>
        
        {builtinTemplates.length === 0 ? (
          <div style={{ 
            color: 'var(--text-muted)', 
            textAlign: 'center', 
            padding: '3rem',
            border: '2px dashed var(--border)',
            borderRadius: '12px'
          }}>
            <File size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No built-in templates available.</p>
          </div>
        ) : (
          <div className="template-grid">
            {builtinTemplates.map((template) => (
              <div key={template.id} className="template-card builtin">
                <button 
                  className="template-preview-btn"
                  onClick={() => openPreview(template)}
                  title="Preview Template"
                >
                  <Eye size={16} />
                </button>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--gradient-primary)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Layout size={20} color="white" />
                  </div>
                  <h4 style={{ margin: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {template.name}
                  </h4>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', minHeight: '40px' }}>
                  {template.description || 'No description'}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  background: 'rgba(212, 165, 116, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  color: 'var(--primary)'
                }}>
                  <Star size={14} />
                  <span>Built-in Template</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Your Templates - Only User Created */}
      {customTemplates.length > 0 && (
        <div className="card">
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderOpen size={20} />
            Your Templates ({customTemplates.length})
          </h3>
          
          <div className="template-grid">
            {customTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <button 
                  className="template-preview-btn"
                  onClick={() => openPreview(template)}
                  title="Preview Template"
                >
                  <Eye size={16} />
                </button>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--gradient-primary)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <File size={20} color="white" />
                  </div>
                  <h4 style={{ margin: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {template.name}
                  </h4>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', minHeight: '40px' }}>
                  {template.description || 'No description'}
                </p>
                
                <button
                  onClick={() => deleteTemplate(template.id, template.is_builtin)}
                  className="button button-danger"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="template-preview-modal" onClick={closePreview}>
          <div className="template-preview-content" onClick={e => e.stopPropagation()}>
            <div className="template-preview-header">
              <h3>{previewTemplate.name}</h3>
              <button onClick={closePreview} className="close-btn">
                <X size={24} />
              </button>
            </div>
            
            <div className="template-preview-body">
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {previewTemplate.description}
              </p>
              
              {previewData ? (
                <div className="template-preview-info">
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      background: 'var(--bg-input)',
                      padding: '1rem',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {previewData.slide_count || '10+'}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Slides</div>
                    </div>
                    <div style={{
                      background: 'var(--bg-input)',
                      padding: '1rem',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {previewTemplate.is_builtin ? 'Built-in' : 'Custom'}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type</div>
                    </div>
                  </div>
                  
                  <h4 style={{ marginBottom: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                    Sample Slide Layouts
                  </h4>
                  
                  <div className="template-preview-slides">
                    <div className="template-preview-slide">
                      <h4>Title Slide</h4>
                      <p>Main presentation title and subtitle</p>
                    </div>
                    <div className="template-preview-slide">
                      <h4>Content Slide</h4>
                      <p>Title with bullet points and content area</p>
                    </div>
                    <div className="template-preview-slide">
                      <h4>Section Header</h4>
                      <p>Divider slide for new sections</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
                  <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading preview...</p>
                </div>
              )}
            </div>
            
            <div className="template-preview-footer">
              <button className="button button-secondary" onClick={closePreview}>
                <X size={16} style={{ marginRight: '0.5rem' }} />
                Close
              </button>
              <button className="button" onClick={closePreview}>
                <Check size={16} style={{ marginRight: '0.5rem' }} />
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Templates
