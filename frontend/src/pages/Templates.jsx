import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { Upload, File, Trash2, Loader2 } from 'lucide-react'

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
    <div>
      <h2>Templates</h2>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <h3>Upload New Template</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            className="input"
            placeholder="Template name..."
            value={uploadData.name}
            onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
            style={{ marginBottom: '0.5rem' }}
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
              <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
              <p>Uploading...</p>
            </div>
          ) : (
            <div>
              <Upload size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <p>Drag & drop a .pptx file here, or click to select</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Your Templates ({templates.length})</h3>
        
        {templates.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            No templates yet. Upload your first template above!
          </p>
        ) : (
          <div className="template-grid">
            {templates.map((template) => (
              <div key={template.id} className="template-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <File size={20} style={{ color: '#667eea' }} />
                  <h4 style={{ margin: 0 }}>{template.name}</h4>
                </div>
                
                <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {template.description || 'No description'}
                </p>
                
                <button
                  onClick={() => deleteTemplate(template.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <Trash2 size={16} />
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