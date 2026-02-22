import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { Upload, File, Trash2, Loader2, FolderOpen, Plus } from 'lucide-react'

const API_URL = 'http://localhost:8000'

function Templates() {
  const [templates, setTemplates] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [uploadData, setUploadData] = useState({
    name: '',
    description: ''
  })

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

  const deleteTemplate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return

    try {
      await axios.delete(`${API_URL}/api/templates/${id}`)
      setMessage({ type: 'success', text: 'Template deleted successfully!' })
      fetchTemplates()
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting template.' })
      console.error(error)
    }
  }

  return (
    <div className="animate-fadeIn">
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.5rem' }}>
        <span className="gradient-text">Templates</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Upload and manage your PowerPoint templates for consistent branding.
      </p>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

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

      <div className="card">
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FolderOpen size={20} />
          Your Templates ({templates.length})
        </h3>
        
        {templates.length === 0 ? (
          <div style={{ 
            color: 'var(--text-muted)', 
            textAlign: 'center', 
            padding: '3rem',
            border: '2px dashed var(--border)',
            borderRadius: '12px'
          }}>
            <File size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No templates yet. Upload your first template above!</p>
          </div>
        ) : (
          <div className="template-grid">
            {templates.map((template) => (
              <div key={template.id} className="template-card" style={{ position: 'relative' }}>
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
                  onClick={() => deleteTemplate(template.id)}
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
        )}
      </div>
    </div>
  )
}

export default Templates
