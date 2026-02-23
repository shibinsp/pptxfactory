import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageSquare, 
  X, 
  Send, 
  Paperclip, 
  Image, 
  FileText, 
  Mic,
  MoreVertical,
  Trash2,
  HelpCircle,
  Sparkles,
  Plus,
  Layout,
  Type,
  Palette,
  Download
} from 'lucide-react'
import axios from 'axios'
import './ChatAgent.css'

const API_URL = 'http://localhost:8000'

function ChatAgent({ pptId, currentSlide, onAction }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hi! I\'m your AI presentation assistant. I can help you:\n\n• Add/edit slides\n• Insert images & videos\n• Improve writing\n• Change styles\n• Upload documents\n\nWhat would you like to do?',
      actions: [],
      suggestions: ['Add a slide', 'Insert image', 'Upload document']
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showUploadMenu, setShowUploadMenu] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text = inputMessage) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await axios.post(`${API_URL}/api/chat/message`, {
        message: text,
        ppt_id: pptId,
        slide_id: currentSlide?.id,
        context: {
          current_slide: currentSlide,
          total_slides: currentSlide?.total || 1
        }
      })

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        actions: response.data.actions || [],
        suggestions: response.data.suggestions || []
      }

      setMessages(prev => [...prev, assistantMessage])

      // Execute actions if any
      if (response.data.actions && response.data.actions.length > 0) {
        executeActions(response.data.actions)
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        actions: [],
        suggestions: ['Try again', 'Help']
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const executeActions = async (actions) => {
    for (const action of actions) {
      try {
        switch (action.type) {
          case 'add_slide':
            onAction?.('add_slide', action)
            break
          case 'delete_slide':
            onAction?.('delete_slide', action)
            break
          case 'duplicate_slide':
            onAction?.('duplicate_slide', action)
            break
          case 'edit_content':
            onAction?.('edit_content', action)
            break
          case 'insert_media':
            await handleMediaInsertion(action)
            break
          case 'insert_chart':
            onAction?.('insert_chart', action)
            break
          case 'insert_table':
            onAction?.('insert_table', action)
            break
          case 'change_style':
            onAction?.('change_style', action)
            break
          case 'change_template':
            onAction?.('change_template', action)
            break
          case 'export':
            onAction?.('export', action)
            break
          default:
            console.log('Unknown action:', action)
        }
      } catch (error) {
        console.error('Action execution error:', error)
      }
    }
  }

  const handleMediaInsertion = async (action) => {
    if (!pptId || !currentSlide?.id) {
      alert('Please select a slide first')
      return
    }

    try {
      await axios.post(`${API_URL}/api/ppt/${pptId}/slides/${currentSlide.id}/media`, {
        media_type: action.media_type,
        source: action.source,
        position: action.position,
        properties: action.properties
      })
      
      onAction?.('media_inserted', action)
    } catch (error) {
      console.error('Media insertion error:', error)
    }
  }

  const handleFileUpload = async (event, fileType) => {
    const file = event.target.files[0]
    if (!file) return

    setShowUploadMenu(false)
    
    // Add user message about upload
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: `Uploading ${file.name}...`
    }])

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(`${API_URL}/api/documents/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data.success) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `✅ Successfully processed **${file.name}**\n\n${response.data.summary || 'Document ready for conversion.'}`,
          actions: [
            { type: 'convert_document', file_id: response.data.file_id }
          ],
          suggestions: ['Convert to presentation', 'Extract key points', 'Summarize']
        }])
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `❌ Failed to process file: ${response.data.error}`
        }])
      }
    } catch (error) {
      console.error('Upload error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Upload failed. Please try again.'
      }])
    }
  }

  const handleQuickAction = (action) => {
    setShowQuickActions(false)
    
    const actionMessages = {
      'add_slide': 'Add a new slide',
      'insert_image': 'Insert an image',
      'insert_chart': 'Add a chart',
      'change_template': 'Change template',
      'improve_writing': 'Improve writing',
      'export': 'Export presentation'
    }
    
    sendMessage(actionMessages[action] || action)
  }

  const clearHistory = async () => {
    try {
      await axios.post(`${API_URL}/api/chat/clear`)
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '👋 Chat history cleared! How can I help you?',
        actions: [],
        suggestions: ['Add a slide', 'Insert image', 'Upload document']
      }])
    } catch (error) {
      console.error('Clear history error:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-agent-container">
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Sparkles size={20} />
              </div>
              <div className="chat-header-text">
                <h3>AI Assistant</h3>
                <p>Always here to help</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button 
                className="chat-header-btn"
                onClick={() => setShowQuickActions(!showQuickActions)}
              >
                <MoreVertical size={18} />
              </button>
              <button 
                className="chat-header-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Actions Panel */}
          {showQuickActions && (
            <div className="chat-quick-actions">
              <h4>Quick Actions</h4>
              <div className="chat-quick-action" onClick={() => handleQuickAction('add_slide')}>
                <Plus size={16} />
                <span>Add Slide</span>
              </div>
              <div className="chat-quick-action" onClick={() => handleQuickAction('insert_image')}>
                <Image size={16} />
                <span>Insert Image</span>
              </div>
              <div className="chat-quick-action" onClick={() => handleQuickAction('insert_chart')}>
                <Layout size={16} />
                <span>Add Chart</span>
              </div>
              <div className="chat-quick-action" onClick={() => handleQuickAction('change_template')}>
                <Palette size={16} />
                <span>Change Template</span>
              </div>
              <div className="chat-quick-action" onClick={() => handleQuickAction('improve_writing')}>
                <Type size={16} />
                <span>Improve Writing</span>
              </div>
              <div className="chat-quick-action" onClick={() => handleQuickAction('export')}>
                <Download size={16} />
                <span>Export</span>
              </div>
              <hr style={{ margin: '8px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
              <div className="chat-quick-action" onClick={clearHistory}>
                <Trash2 size={16} />
                <span>Clear History</span>
              </div>
              <div className="chat-quick-action" onClick={() => sendMessage('Help')}>
                <HelpCircle size={16} />
                <span>Help</span>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="chat-message-avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="chat-message-content">
                  <div dangerouslySetInnerHTML={{ 
                    __html: msg.content.replace(/\n/g, '<br/>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  }} />
                  
                  {/* Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="chat-actions">
                      {msg.actions.map((action, idx) => (
                        <button 
                          key={idx}
                          className="chat-action-btn"
                          onClick={() => executeActions([action])}
                        >
                          {action.type.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message assistant">
                <div className="chat-message-avatar">🤖</div>
                <div className="chat-message-content">
                  <div className="chat-typing">
                    <div className="chat-typing-dot"></div>
                    <div className="chat-typing-dot"></div>
                    <div className="chat-typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length > 0 && messages[messages.length - 1].suggestions && (
            <div className="chat-suggestions">
              {messages[messages.length - 1].suggestions.map((suggestion, idx) => (
                <button 
                  key={idx}
                  className="chat-suggestion-btn"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask me to edit your presentation..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="chat-input-actions">
                <button 
                  className="chat-input-btn"
                  onClick={() => setShowUploadMenu(!showUploadMenu)}
                >
                  <Paperclip size={18} />
                </button>
                <button className="chat-input-btn">
                  <Mic size={18} />
                </button>
              </div>
            </div>
            <button 
              className="chat-send-btn"
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>

          {/* Upload Menu */}
          {showUploadMenu && (
            <div className="chat-upload-menu">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.webp"
                onChange={(e) => handleFileUpload(e, 'document')}
              />
              <div 
                className="chat-upload-option"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText size={18} />
                <span>Upload Document</span>
              </div>
              <div 
                className="chat-upload-option"
                onClick={() => {
                  fileInputRef.current.accept = "image/*"
                  fileInputRef.current?.click()
                }}
              >
                <Image size={18} />
                <span>Upload Image</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatAgent
