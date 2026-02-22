import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CreatePPT from './pages/CreatePPT'
import Templates from './pages/Templates'
import AIGenerate from './pages/AIGenerate'
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
  const location = useLocation()
  
  return (
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ai-generate">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>🤖</span>
          <span>AI Generate</span>
        </span>
      </NavLink>
      <NavLink to="/create">Create PPT</NavLink>
      <NavLink to="/templates">Templates</NavLink>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>🎯 PPT SaaS</h1>
          </Link>
          <Navigation />
        </header>
        
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-generate" element={<AIGenerate />} />
            <Route path="/create" element={<CreatePPT />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
