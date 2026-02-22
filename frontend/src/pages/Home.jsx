import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Zap, Palette, Sparkles, ArrowRight, Star } from 'lucide-react'

function Home() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="card" style={{ 
        textAlign: 'center', 
        padding: '5rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '50px',
            padding: '0.5rem 1.25rem',
            marginBottom: '2rem'
          }}>
            <Star size={16} style={{ color: 'var(--primary-light)' }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Powered by Mistral AI
            </span>
          </div>

          <h1 style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Create Stunning
            <br />
            <span className="gradient-text">Presentations with AI</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '2.5rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Generate professional slide decks in seconds. Edit with our Canva-like editor. 
            Download and present with confidence.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ai-generate">
              <button className="button" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                <Sparkles size={22} style={{ marginRight: '0.5rem' }} />
                Generate with AI
                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
            </Link>
            
            <Link to="/create">
              <button className="button button-secondary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                <Palette size={22} style={{ marginRight: '0.5rem' }} />
                Create Manually
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={32} style={{ color: 'var(--primary-light)' }} />
          </div>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.75rem' }}>
            AI Generation
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Simply describe what you want, and our AI will generate a complete, professional presentation for you.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Palette size={32} style={{ color: 'var(--secondary)' }} />
          </div>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.75rem' }}>
            Visual Editor
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Edit your slides with our Canva-like editor. Drag, drop, and customize every detail.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={32} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.75rem' }}>
            Templates
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Upload your own PowerPoint templates or use our defaults for consistent branding.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={32} style={{ color: '#10b981' }} />
          </div>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '0.75rem' }}>
            Lightning Fast
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Generate presentations in seconds. No design skills needed. Just describe and download.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', textAlign: 'center', marginBottom: '2rem' }}>
          How It <span className="gradient-text">Works</span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            { step: '01', title: 'Describe', desc: 'Tell our AI what you want to present' },
            { step: '02', title: 'Generate', desc: 'AI creates your presentation in seconds' },
            { step: '03', title: 'Edit', desc: 'Fine-tune slides in our visual editor' },
            { step: '04', title: 'Download', desc: 'Export as PowerPoint and present' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '3rem',
                fontWeight: 800,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {item.step}
              </div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        textAlign: 'center',
        background: 'var(--gradient-glow)'
      }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '1rem' }}>
          Ready to Create Your Presentation?
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Join thousands of users creating stunning presentations with AI.
        </p>
        <Link to="/ai-generate">
          <button className="button" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            <Sparkles size={22} style={{ marginRight: '0.5rem' }} />
            Start Creating Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
