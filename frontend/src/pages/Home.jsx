import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Zap, Palette } from 'lucide-react'

function Home() {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
          Create Beautiful Presentations with AI
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
          Upload templates, generate slides from prompts, or create from scratch.
          <br />
          Your all-in-one presentation solution.
        </p>
        
        <Link to="/create">
          <button className="button" style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
            Get Started
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <FileText size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
          <h3>Upload Templates</h3>
          <p>Upload your existing PowerPoint templates and reuse them for new presentations.</p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Zap size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
          <h3>AI Generation</h3>
          <p>Simply describe what you want, and our AI will generate the presentation for you.</p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Palette size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
          <h3>Custom Design</h3>
          <p>Create presentations from scratch with our intuitive slide editor.</p>
        </div>
      </div>
    </div>
  )
}

export default Home