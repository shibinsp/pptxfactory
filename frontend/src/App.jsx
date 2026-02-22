import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePPT from './pages/CreatePPT'
import Templates from './pages/Templates'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>🎯 PPT SaaS</h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/create">Create PPT</Link>
            <Link to="/templates">Templates</Link>
          </nav>
        </header>
        
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePPT />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App