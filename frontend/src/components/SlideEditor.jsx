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
  Palette,
  Search,
  Eye,
  Undo,
  Redo,
  Copy,
  Sparkles,
  MonitorPlay
} from 'lucide-react'
import PreviewModal from './PreviewModal'
import PowerPointRibbon from './PowerPointRibbon'

const API_URL = 'http://localhost:8000'

function SlideEditor({ pptId, onClose, onSave }) {
  const [ppt, setPpt] = useState(null)
  const [selectedSlideId, setSelectedSlideId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [draggedSlide, setDraggedSlide] = useState(null)
  const [showImageSearch, setShowImageSearch] = useState(false)
  const [imageSearchQuery, setImageSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  useEffect(() => {
    fetchPPT()
  }, [pptId])

  // Save state to history for undo/redo
  const saveToHistory = (newPpt) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(newPpt)))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const fetchPPT = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/ppt/${pptId}`)
      setPpt(response.data)
      if (response.data.slides.length > 0) {
        setSelectedSlideId(response.data.slides[0].id)
      }
      // Initialize history
      setHistory([JSON.parse(JSON.stringify(response.data))])
      setHistoryIndex(0)
      setLoading(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load presentation' })
      setLoading(false)
    }
  }

  const selectedSlide = ppt?.slides.find(s => s.id === selectedSlideId)

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPpt(JSON.parse(JSON.stringify(history[historyIndex - 1])))
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPpt(JSON.parse(JSON.stringify(history[historyIndex + 1])))
    }
  }

  const duplicateSlide = (slideId) => {
    const slideToDuplicate = ppt.slides.find(s => s.id === slideId)
    if (slideToDuplicate) {
      const newSlide = {
        ...slideToDuplicate,
        id: `temp-${Date.now()}`,
        order: slideToDuplicate.order + 1
      }
      const newSlides = [...ppt.slides]
      const index = newSlides.findIndex(s => s.id === slideId)
      newSlides.splice(index + 1, 0, newSlide)
      // Reorder
      newSlides.forEach((s, i) => s.order = i)
      const newPpt = { ...ppt, slides: newSlides }
      setPpt(newPpt)
      saveToHistory(newPpt)
      setSelectedSlideId(newSlide.id)
    }
  }

  const updateSlide = (slideId, updates) => {
    const newPpt = {
      ...ppt,
      slides: ppt.slides.map(s => 
        s.id === slideId ? { ...s, ...updates } : s
      )
    }
    setPpt(newPpt)
    saveToHistory(newPpt)
  }

  const addSlide = () => {
    const newSlide = {
      id: `temp-${Date.now()}`,
      title: 'New Slide',
      content: '• Add your content here',
      order: ppt.slides.length
    }
    const newPpt = {
      ...ppt,
      slides: [...ppt.slides, newSlide]
    }
    setPpt(newPpt)
    saveToHistory(newPpt)
    setSelectedSlideId(newSlide.id)
  }

  const deleteSlide = (slideId) => {
    if (ppt.slides.length <= 1) {
      setMessage({ type: 'error', text: 'Cannot delete the last slide' })
      return
    }
    
    const newSlides = ppt.slides.filter(s => s.id !== slideId)
    newSlides.forEach((s, i) => s.order = i)
    
    const newPpt = { ...ppt, slides: newSlides }
    setPpt(newPpt)
    saveToHistory(newPpt)
    
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
    
    const tempOrder = newSlides[index].order
    newSlides[index].order = newSlides[targetIndex].order
    newSlides[targetIndex].order = tempOrder
    
    newSlides.sort((a, b) => a.order - b.order)
    
    const newPpt = { ...ppt, slides: newSlides }
    setPpt(newPpt)
    saveToHistory(newPpt)
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

    const tempOrder = newSlides[draggedIndex].order
    newSlides[draggedIndex].order = newSlides[targetIndex].order
    newSlides[targetIndex].order = tempOrder

    newSlides.sort((a, b) => a.order - b.order)
    setPpt({ ...ppt, slides: newSlides })
  }

  const handleDrop = () => {
    setDraggedSlide(null)
    saveToHistory(ppt)
  }

  const searchImages = async () => {
    if (!imageSearchQuery.trim()) return
    setSearching(true)
    try {
      const response = await axios.get(`${API_URL}/api/images/search?query=${encodeURIComponent(imageSearchQuery)}&count=8`)
      setSearchResults(response.data.images)
    } catch (error) {
      console.error('Error searching images:', error)
    }
    setSearching(false)
  }

  const addImageToSlide = (imageUrl) => {
    if (selectedSlide) {
      updateSlide(selectedSlide.id, { image_url: imageUrl })
      setShowImageSearch(false)
    }
  }

  const removeImageFromSlide = () => {
    if (selectedSlide) {
      updateSlide(selectedSlide.id, { image_url: null })
    }
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
          order: s.order,
          image_url: s.image_url
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

  const generateAIImage = async () => {
    if (!selectedSlide) return
    setSearching(true)
    // Use slide title as search query
    const query = selectedSlide.title
    try {
      const response = await axios.get(`${API_URL}/api/images/search?query=${encodeURIComponent(query)}&count=4`)
      setSearchResults(response.data.images)
      setImageSearchQuery(query)
      setShowImageSearch(true)
    } catch (error) {
      console.error('Error generating AI images:', error)
    }
    setSearching(false)
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  // Preview Modal
  if (showPreviewModal) {
    return (
      <PreviewModal 
        ppt={ppt}
        onClose={() => setShowPreviewModal(false)}
        onEdit={() => setShowPreviewModal(false)}
        onDownload={() => window.open(`${API_URL}/api/ppt/download/${pptId}`, '_blank')}
      />
    )
  }

  return (
    <div className="editor-container animate-fadeIn">
      {/* PowerPoint-style Ribbon */}
      <PowerPointRibbon
        ppt={ppt}
        onSave={savePPT}
        onDownload={downloadPPT}
        onPreview={() => setShowPreviewModal(true)}
        onClose={onClose}
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        selectedSlide={selectedSlide}
        onAddSlide={addSlide}
        onDeleteSlide={() => selectedSlide && deleteSlide(selectedSlide.id)}
        onDuplicateSlide={() => selectedSlide && duplicateSlide(selectedSlide.id)}
        onUpdateSlide={updateSlide}
        onShowImageSearch={() => setShowImageSearch(true)}
        onGenerateAIImage={generateAIImage}
        onInsertChart={() => alert('Chart insertion - Coming soon!')}
        onInsertTable={() => alert('Table insertion - Coming soon!')}
        onInsertShape={() => alert('Shape insertion - Coming soon!')}
        onInsertVideo={() => alert('Video insertion - Coming soon!')}
        onChangeTemplate={() => alert('Template change - Coming soon!')}
      />

      {/* Left Sidebar - Slide Thumbnails */}
      <div className="editor-sidebar">
        <div className="sidebar-header">
          <h3>Slides</h3>
          <button className="add-slide-btn-small" onClick={addSlide} title="Add Slide">
            <Plus size={16} />
          </button>
        </div>

        <div className="slides-list">
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
              <div className="slide-thumbnail-content-wrapper">
                <div className="slide-thumbnail-title">{slide.title}</div>
                <div className="slide-thumbnail-text">
                  {slide.content.substring(0, 40)}...
                </div>
              </div>
              {slide.image_url && (
                <div className="slide-thumbnail-has-image">
                  <ImageIcon size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center - Preview Canvas */}
      <div className="editor-canvas">
        {selectedSlide ? (
          <div className="canvas-slide animate-fadeIn">
            <div className="canvas-slide-header">
              <span className="canvas-slide-number">
                Slide {ppt.slides.findIndex(s => s.id === selectedSlide.id) + 1} of {ppt.slides.length}
              </span>
              <div className="canvas-slide-actions">
                <button 
                  className="canvas-action-btn"
                  onClick={() => duplicateSlide(selectedSlide.id)}
                  title="Duplicate Slide"
                >
                  <Copy size={14} />
                </button>
                <button 
                  className="canvas-action-btn delete"
                  onClick={() => deleteSlide(selectedSlide.id)}
                  title="Delete Slide"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="canvas-slide-content">
              <h2 className="canvas-slide-title">{selectedSlide.title}</h2>
              <div className="canvas-slide-body">
                {selectedSlide.content.split('\n').map((line, i) => (
                  <p key={i} className="canvas-slide-line">{line}</p>
                ))}
              </div>
              {selectedSlide.image_url && (
                <div className="canvas-slide-image-wrapper">
                  <img 
                    src={selectedSlide.image_url} 
                    alt="Slide" 
                    className="canvas-slide-image"
                  />
                  <button 
                    className="remove-image-btn"
                    onClick={removeImageFromSlide}
                    title="Remove Image"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="canvas-empty">
            <Layout size={48} />
            <p>Select a slide to preview</p>
          </div>
        )}
      </div>

      {/* Right Sidebar - Properties */}
      <div className="editor-properties">
        <div className="properties-header">
          <h3>Edit Slide</h3>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {selectedSlide ? (
          <div className="properties-content animate-slideIn">
            <div className="property-group">
              <label className="property-label">
                <Type size={14} />
                Slide Title
              </label>
              <input
                type="text"
                className="input"
                value={selectedSlide.title}
                onChange={(e) => updateSlide(selectedSlide.id, { title: e.target.value })}
                placeholder="Enter slide title..."
              />
            </div>

            <div className="property-group">
              <label className="property-label">
                <Layout size={14} />
                Content
              </label>
              <textarea
                className="textarea"
                value={selectedSlide.content}
                onChange={(e) => updateSlide(selectedSlide.id, { content: e.target.value })}
                placeholder="Enter slide content..."
                rows={8}
              />
            </div>

            <div className="property-group">
              <label className="property-label">
                <ImageIcon size={14} />
                Image
              </label>
              {selectedSlide.image_url ? (
                <div className="current-image">
                  <img src={selectedSlide.image_url} alt="Current" />
                  <div className="current-image-actions">
                    <button onClick={() => setShowImageSearch(true)}>
                      <Search size={14} /> Change
                    </button>
                    <button onClick={removeImageFromSlide} className="remove">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="image-actions">
                  <button 
                    className="image-action-btn"
                    onClick={() => setShowImageSearch(true)}
                  >
                    <Search size={16} />
                    Search Images
                  </button>
                  <button 
                    className="image-action-btn ai"
                    onClick={generateAIImage}
                  >
                    <Sparkles size={16} />
                    AI Suggest
                  </button>
                </div>
              )}
            </div>

            <div className="property-group">
              <label className="property-label">Reorder</label>
              <div className="reorder-buttons">
                <button 
                  className="reorder-btn"
                  onClick={() => moveSlide(selectedSlide.id, 'up')}
                  disabled={ppt.slides.findIndex(s => s.id === selectedSlide.id) === 0}
                >
                  <ChevronUp size={18} />
                  Move Up
                </button>
                <button 
                  className="reorder-btn"
                  onClick={() => moveSlide(selectedSlide.id, 'down')}
                  disabled={ppt.slides.findIndex(s => s.id === selectedSlide.id) === ppt.slides.length - 1}
                >
                  <ChevronDown size={18} />
                  Move Down
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="properties-empty">
            <Palette size={48} />
            <p>Select a slide to edit</p>
          </div>
        )}

        <div className="properties-footer">
          <button 
            className="button save-btn"
            onClick={savePPT}
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>

          <button 
            className="button download-btn"
            onClick={downloadPPT}
          >
            <Download size={16} />
            Download PPT
          </button>
        </div>
      </div>

      {/* Image Search Modal */}
      {showImageSearch && (
        <div className="image-search-modal" onClick={() => setShowImageSearch(false)}>
          <div className="image-search-content" onClick={e => e.stopPropagation()}>
            <div className="image-search-header">
              <h3>
                <ImageIcon size={20} />
                Search Images
              </h3>
              <button onClick={() => setShowImageSearch(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="image-search-input">
              <input
                type="text"
                className="input"
                value={imageSearchQuery}
                onChange={(e) => setImageSearchQuery(e.target.value)}
                placeholder="Search for images..."
                onKeyPress={(e) => e.key === 'Enter' && searchImages()}
              />
              <button 
                className="button"
                onClick={searchImages}
                disabled={searching}
              >
                {searching ? (
                  <div className="spinner" style={{ width: 16, height: 16 }} />
                ) : (
                  <Search size={18} />
                )}
              </button>
            </div>
            <div className="image-search-results">
              {searchResults.map((image) => (
                <div 
                  key={image.id} 
                  className="image-result"
                  onClick={() => addImageToSlide(image.url)}
                >
                  <img src={image.thumbnail} alt={imageSearchQuery} loading="lazy" />
                  <div className="image-result-overlay">
                    <span>Click to select</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SlideEditor
