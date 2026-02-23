import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Palette, FileText, Zap, ArrowRight, Star, Wand2 } from 'lucide-react'

function Home() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="card" style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(212, 165, 116, 0.1)',
            border: '1px solid rgba(212, 165, 116, 0.25)',
            borderRadius: '50px',
            padding: '0.5rem 1.25rem',
            marginBottom: '1.75rem'
          }}>
            <img src="./logo.png" alt="Bee" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Powered by Mistral AI
            </span>
          </div>

          <h1 style={{ 
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.2
          }}>
            Create Beautiful
            <br />
            <span className="gradient-text">Presentations with AI</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '2rem',
            maxWidth: '550px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Generate professional slide decks in seconds. Edit with our Canva-like editor. 
            Download and present with confidence.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ai-generate">
              <button className="button" style={{ fontSize: '1rem', padding: '0.9rem 1.75rem' }}>
                <Wand2 size={20} style={{ marginRight: '0.5rem' }} />
                Generate with AI
                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
            </Link>
            
            <Link to="/create">
              <button className="button button-secondary" style={{ fontSize: '1rem', padding: '0.9rem 1.75rem' }}>
                <Palette size={20} style={{ marginRight: '0.5rem' }} />
                Create Manually
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '1.25rem',
        marginTop: '1.75rem'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.25rem',
            background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.2) 0%, rgba(139, 105, 20, 0.2) 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.1rem' }}>
            AI Generation
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Simply describe what you want, and our AI will generate a complete, professional presentation for you.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.25rem',
            background: 'linear-gradient(135deg, rgba(184, 147, 95, 0.2) 0%, rgba(139, 105, 20, 0.2) 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Palette size={28} style={{ color: 'var(--primary-light)' }} />
          </div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.1rem' }}>
            Visual Editor
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Edit your slides with our Canva-like editor. Drag, drop, and customize every detail.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.25rem',
            background: 'linear-gradient(135deg, rgba(139, 105, 20, 0.2) 0%, rgba(212, 165, 116, 0.2) 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={28} style={{ color: 'var(--secondary)' }} />
          </div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.1rem' }}>
            Templates
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Upload your own PowerPoint templates or use our defaults for consistent branding.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.25rem',
            background: 'linear-gradient(135deg, rgba(244, 228, 193, 0.15) 0%, rgba(212, 165, 116, 0.2) 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={28} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.625rem', fontSize: '1.1rem' }}>
            Lightning Fast
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Generate presentations in seconds. No design skills needed. Just describe and download.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="card" style={{ marginTop: '1.75rem' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', marginBottom: '1.75rem', fontSize: '1.5rem' }}>
          How It <span className="gradient-text">Works</span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '1.5rem'
        }}>
          {[
            { step: '01', title: 'Describe', desc: 'Tell our AI what you want to present' },
            { step: '02', title: 'Generate', desc: 'AI creates your presentation in seconds' },
            { step: '03', title: 'Edit', desc: 'Fine-tune slides in our visual editor' },
            { step: '04', title: 'Download', desc: 'Export as PowerPoint and present' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.5rem',
                fontWeight: 800,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.375rem'
              }}>
                {item.step}
              </div>
              <h4 style={{ marginBottom: '0.375rem', color: 'var(--text-primary)', fontSize: '1rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card" style={{ 
        marginTop: '1.75rem', 
        textAlign: 'center',
        background: 'var(--gradient-glow)'
      }}>
        <img src="./logo.png" alt="Bee" style={{ width: '64px', height: '64px', borderRadius: '16px', marginBottom: '1rem' }} />
        <h2 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.75rem', fontSize: '1.5rem' }}>
          Ready to Create Your Presentation?
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          Join thousands of users creating stunning presentations with AI.
        </p>
        <Link to="/ai-generate">
          <button className="button" style={{ fontSize: '1rem', padding: '0.9rem 1.75rem' }}>
            <Sparkles size={20} style={{ marginRight: '0.5rem' }} />
            Start Creating Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
