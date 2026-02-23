import React, { useState } from 'react'
import {
  Undo,
  Redo,
  Save,
  FileDown,
  Copy,
  Clipboard,
  Scissors,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Image,
  Layout,
  Table,
  BarChart3,
  Shapes,
  Film,
  Sparkles,
  MonitorPlay,
  Wand2,
  ChevronDown,
  Plus,
  Trash2,
  Eye,
  Download,
  X
} from 'lucide-react'
import './PowerPointRibbon.css'

const TABS = [
  { id: 'file', label: 'File' },
  { id: 'home', label: 'Home' },
  { id: 'insert', label: 'Insert' },
  { id: 'design', label: 'Design' },
  { id: 'transitions', label: 'Transitions' },
  { id: 'animations', label: 'Animations' },
  { id: 'view', label: 'View' }
]

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
const FONT_FAMILIES = ['Arial', 'Calibri', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana']

function PowerPointRibbon({
  ppt,
  onSave,
  onDownload,
  onPreview,
  onClose,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  selectedSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
  onUpdateSlide,
  onShowImageSearch,
  onGenerateAIImage,
  onInsertChart,
  onInsertTable,
  onInsertShape,
  onInsertVideo,
  onChangeTemplate,
  onApplyTransition,
  onApplyAnimation
}) {
  const [activeTab, setActiveTab] = useState('home')
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)

  const renderHomeTab = () => (
    <>
      {/* Clipboard Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn" onClick={onDuplicateSlide} title="Copy Slide">
            <Copy size={20} />
            <span>Copy</span>
          </button>
          <button className="ribbon-btn" title="Paste">
            <Clipboard size={20} />
            <span>Paste</span>
          </button>
          <button className="ribbon-btn" onClick={onDeleteSlide} title="Delete Slide">
            <Scissors size={20} />
            <span>Cut</span>
          </button>
        </div>
        <span className="ribbon-group-title">Clipboard</span>
      </div>

      {/* Slides Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onAddSlide} title="New Slide">
            <Plus size={24} />
            <span>New Slide</span>
          </button>
          <button className="ribbon-btn" onClick={onDuplicateSlide} title="Duplicate Slide">
            <Copy size={20} />
            <span>Duplicate</span>
          </button>
          <button className="ribbon-btn" onClick={onDeleteSlide} title="Delete Slide">
            <Trash2 size={20} />
            <span>Delete</span>
          </button>
        </div>
        <span className="ribbon-group-title">Slides</span>
      </div>

      {/* Font Group */}
      <div className="ribbon-group">
        <div className="ribbon-font-controls">
          <div className="ribbon-font-row">
            <select 
              value="Arial" 
              onChange={(e) => selectedSlide && onUpdateSlide(selectedSlide.id, { fontFamily: e.target.value })}
            >
              {FONT_FAMILIES.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
            <select 
              value={24}
              onChange={(e) => selectedSlide && onUpdateSlide(selectedSlide.id, { fontSize: parseInt(e.target.value) })}
            >
              {FONT_SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="ribbon-buttons">
            <button className="ribbon-btn" title="Bold">
              <Bold size={18} />
            </button>
            <button className="ribbon-btn" title="Italic">
              <Italic size={18} />
            </button>
            <button className="ribbon-btn" title="Underline">
              <Underline size={18} />
            </button>
          </div>
          <div className="ribbon-buttons">
            <button className="ribbon-btn" title="Align Left">
              <AlignLeft size={18} />
            </button>
            <button className="ribbon-btn" title="Align Center">
              <AlignCenter size={18} />
            </button>
            <button className="ribbon-btn" title="Align Right">
              <AlignRight size={18} />
            </button>
          </div>
        </div>
        <span className="ribbon-group-title">Font</span>
      </div>

      {/* Paragraph Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn" title="Bullets">
            <Layout size={20} />
            <span>Bullets</span>
          </button>
          <button className="ribbon-btn" title="Numbering">
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>1.</span>
            <span>Numbering</span>
          </button>
        </div>
        <span className="ribbon-group-title">Paragraph</span>
      </div>

      {/* Drawing Group */}
      <div className="ribbon-group">
        <div className="ribbon-color-picker">
          <div className="ribbon-color-row">
            {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#D4A574', '#8B6914'].map(color => (
              <button
                key={color}
                className="ribbon-color-btn"
                style={{ backgroundColor: color }}
                onClick={() => selectedSlide && onUpdateSlide(selectedSlide.id, { color })}
                title={color}
              />
            ))}
          </div>
        </div>
        <span className="ribbon-group-title">Drawing</span>
      </div>

      {/* AI Tools Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onGenerateAIImage} title="AI Image">
            <Sparkles size={24} />
            <span>AI Image</span>
          </button>
          <button className="ribbon-btn large" title="AI Improve">
            <Wand2 size={24} />
            <span>Improve</span>
          </button>
        </div>
        <span className="ribbon-group-title">AI Tools</span>
      </div>
    </>
  )

  const renderInsertTab = () => (
    <>
      {/* Images Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onShowImageSearch} title="Pictures">
            <Image size={24} />
            <span>Pictures</span>
          </button>
          <button className="ribbon-btn large" onClick={onGenerateAIImage} title="AI Images">
            <Sparkles size={24} />
            <span>AI Images</span>
          </button>
        </div>
        <span className="ribbon-group-title">Images</span>
      </div>

      {/* Illustrations Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onInsertChart} title="Chart">
            <BarChart3 size={24} />
            <span>Chart</span>
          </button>
          <button className="ribbon-btn large" onClick={onInsertTable} title="Table">
            <Table size={24} />
            <span>Table</span>
          </button>
          <button className="ribbon-btn large" onClick={onInsertShape} title="Shapes">
            <Shapes size={24} />
            <span>Shapes</span>
          </button>
        </div>
        <span className="ribbon-group-title">Illustrations</span>
      </div>

      {/* Media Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onInsertVideo} title="Video">
            <Film size={24} />
            <span>Video</span>
          </button>
          <button className="ribbon-btn large" title="Audio">
            <MonitorPlay size={24} />
            <span>Audio</span>
          </button>
        </div>
        <span className="ribbon-group-title">Media</span>
      </div>
    </>
  )

  const renderDesignTab = () => (
    <>
      {/* Themes Group */}
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onChangeTemplate} title="Templates">
            <Layout size={24} />
            <span>Templates</span>
          </button>
        </div>
        <span className="ribbon-group-title">Themes</span>
      </div>

      {/* Variants Group */}
      <div className="ribbon-group">
        <div className="ribbon-color-picker">
          <div className="ribbon-color-row">
            {['#1E3A5F', '#2D5A27', '#6B2C91', '#D35400', '#006994', '#8B0000', '#2C3E50', '#0D1B2A'].map(color => (
              <button
                key={color}
                className="ribbon-color-btn"
                style={{ backgroundColor: color, width: 32, height: 32 }}
                onClick={() => selectedSlide && onUpdateSlide(selectedSlide.id, { themeColor: color })}
                title={color}
              />
            ))}
          </div>
        </div>
        <span className="ribbon-group-title">Variants</span>
      </div>
    </>
  )

  const renderTransitionsTab = () => (
    <>
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          {['None', 'Fade', 'Push', 'Wipe', 'Split', 'Reveal', 'Random'].map(transition => (
            <button 
              key={transition}
              className="ribbon-btn" 
              onClick={() => onApplyTransition && onApplyTransition(transition.toLowerCase())}
              title={transition}
            >
              <MonitorPlay size={20} />
              <span>{transition}</span>
            </button>
          ))}
        </div>
        <span className="ribbon-group-title">Transitions</span>
      </div>
    </>
  )

  const renderAnimationsTab = () => (
    <>
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          {['None', 'Appear', 'Fade', 'Fly In', 'Float In', 'Split', 'Wipe', 'Zoom'].map(animation => (
            <button 
              key={animation}
              className="ribbon-btn" 
              onClick={() => onApplyAnimation && onApplyAnimation(animation.toLowerCase().replace(' ', '-'))}
              title={animation}
            >
              <Sparkles size={20} />
              <span>{animation}</span>
            </button>
          ))}
        </div>
        <span className="ribbon-group-title">Animations</span>
      </div>
    </>
  )

  const renderViewTab = () => (
    <>
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onPreview} title="Presentation View">
            <MonitorPlay size={24} />
            <span>Present</span>
          </button>
        </div>
        <span className="ribbon-group-title">Presentation Views</span>
      </div>
    </>
  )

  const renderFileTab = () => (
    <>
      <div className="ribbon-group">
        <div className="ribbon-buttons">
          <button className="ribbon-btn large" onClick={onSave} title="Save">
            <Save size={24} />
            <span>Save</span>
          </button>
          <button className="ribbon-btn large" onClick={onDownload} title="Download">
            <FileDown size={24} />
            <span>Download</span>
          </button>
        </div>
        <span className="ribbon-group-title">File</span>
      </div>
    </>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab()
      case 'insert': return renderInsertTab()
      case 'design': return renderDesignTab()
      case 'transitions': return renderTransitionsTab()
      case 'animations': return renderAnimationsTab()
      case 'view': return renderViewTab()
      case 'file': return renderFileTab()
      default: return renderHomeTab()
    }
  }

  return (
    <div className="ribbon-container">
      {/* Quick Access Toolbar */}
      <div className="ribbon-quick-access">
        <button 
          className="ribbon-quick-btn" 
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button 
          className="ribbon-quick-btn" 
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo size={18} />
        </button>
        <div className="ribbon-quick-divider" />
        <button className="ribbon-quick-btn" onClick={onSave} title="Save">
          <Save size={18} />
        </button>
        <div className="ribbon-quick-divider" />
        <button className="ribbon-quick-btn" onClick={onPreview} title="Preview">
          <Eye size={18} />
        </button>
        <button className="ribbon-quick-btn" onClick={onDownload} title="Download">
          <Download size={18} />
        </button>
        <div style={{ flex: 1 }} />
        <span className="ribbon-ppt-title">{ppt?.title || 'Untitled Presentation'}</span>
        <span className="ribbon-slide-count">({ppt?.slides?.length || 0} slides)</span>
        <div style={{ flex: 1 }} />
        <button className="ribbon-quick-btn" onClick={onClose} title="Close">
          <X size={18} />
        </button>
      </div>

      {/* Ribbon Tabs */}
      <div className="ribbon-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`ribbon-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="ribbon-content">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default PowerPointRibbon
