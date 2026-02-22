import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  History, 
  Trash2, 
  Download, 
  Edit3, 
  FileText,
  Clock,
  Wand2,
  Plus,
  X,
  Loader2,
  Calendar,
  ChevronRight
} from 'lucide-react'

const API_URL = 'http://localhost:8000'

function HistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/history`)
      setHistory(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching history:', error)
      setLoading(false)
    }
  }

  const deleteHistoryEntry = async (id) => {
    if (!window.confirm('Delete this history entry?')) return
    
    try {
      await axios.delete(`${API_URL}/api/history/${id}`)
      setMessage({ type: 'success', text: 'History entry deleted' })
      fetchHistory()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete entry' })
    }
  }

  const clearAllHistory = async () => {
    if (!window.confirm('Clear all history? This cannot be undone.')) return
    
    try {
      // Delete all entries one by one
      for (const entry of history) {
        await axios.delete(`${API_URL}/api/history/${entry.id}`)
      }
      setMessage({ type: 'success', text: 'All history cleared' })
      fetchHistory()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to clear history' })
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'created':
        return <Plus size={20} />
      case 'ai_generated':
        return <Wand2 size={20} />
      case 'edited':
        return <Edit3 size={20} />
      case 'deleted':
        return <Trash2 size={20} />
      default:
        return <FileText size={20} />
    }
  }

  const getActionLabel = (action) => {
    switch (action) {
      case 'created':
        return 'Created'
      case 'ai_generated':
        return 'AI Generated'
      case 'edited':
        return 'Edited'
      case 'deleted':
        return 'Deleted'
      default:
        return action
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'created':
        return '#5BC78B'
      case 'ai_generated':
        return '#D4A574'
      case 'edited':
        return '#6B8DD6'
      case 'deleted':
        return '#C75B5B'
      default:
        return 'var(--text-muted)'
    }
  }

  if (loading) {
    return (
      <div className="animate-fadeIn">
        <div className="loading">
          <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.5rem' }}>
            <span className="gradient-text">History</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Track all your presentation activities
          </p>
        </div>
        
        {history.length > 0 && (
          <button 
            className="button button-danger"
            onClick={clearAllHistory}
            style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
          >
            <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
            Clear All
          </button>
        )}
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        {history.length === 0 ? (
          <div style={{ 
            color: 'var(--text-muted)', 
            textAlign: 'center', 
            padding: '4rem 2rem'
          }}>
            <History size={64} style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              No History Yet
            </h3>
            <p>
              Your presentation activities will appear here once you start creating!
            </p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((entry) => (
              <div key={entry.id} className="history-item">
                <div 
                  className="history-icon"
                  style={{ background: getActionColor(entry.action) }}
                >
                  {getActionIcon(entry.action)}
                </div>
                
                <div className="history-content">
                  <div className="history-title">
                    {entry.title}
                  </div>
                  <div className="history-meta">
                    <span style={{ 
                      color: getActionColor(entry.action),
                      fontWeight: 500
                    }}>
                      {getActionLabel(entry.action)}
                    </span>
                    {' • '}
                    {entry.slides_count > 0 && (
                      <>
                        {entry.slides_count} slides
                        {' • '}
                      </>
                    )}
                    {formatDate(entry.timestamp)}
                  </div>
                </div>
                
                <div className="history-actions">
                  <button 
                    className="history-action-btn"
                    onClick={() => deleteHistoryEntry(entry.id)}
                    title="Delete from history"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Summary */}
      {history.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <FileText size={32} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {history.filter(h => h.action !== 'deleted').length}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Total Presentations
            </div>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <Wand2 size={32} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {history.filter(h => h.action === 'ai_generated').length}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              AI Generated
            </div>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <Edit3 size={32} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {history.filter(h => h.action === 'edited').length}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Edits Made
            </div>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <Calendar size={32} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {new Set(history.map(h => h.timestamp.split('T')[0])).size}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Active Days
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HistoryPage
