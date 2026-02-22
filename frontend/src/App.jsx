import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CreatePPT from './pages/CreatePPT'
import Templates from './pages/Templates'
import AIGenerate from './pages/AIGenerate'
import HistoryPage from './pages/History'
import LandingPage from './pages/LandingPage'
import './index.css'

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link to={to} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  )
}

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ai-generate">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>✨</span>
          <span>AI Generate</span>
        </span>
      </NavLink>
      <NavLink to="/create">Create PPT</NavLink>
      <NavLink to="/templates">Templates</NavLink>
      <NavLink to="/history">History</NavLink>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo-container">
              <img src="/logo.png" alt="PPT SaaS Logo" />
              <span className="logo-text">PPT SaaS</span>
            </div>
          </Link>
          <Navigation />
        </header>
        
        <main className="main" style={{ padding: 0, maxWidth: '100%' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ai-generate" element={<AIGenerate />} />
            <Route path="/create" element={<CreatePPT />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
