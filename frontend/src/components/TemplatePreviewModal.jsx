import React, { useState } from 'react'
import { X, Check, ChevronLeft, ChevronRight, Type, FileText, Layout, Image as ImageIcon, Star, BarChart3, Users, Target, Lightbulb, Rocket, Award } from 'lucide-react'

function TemplatePreviewModal({ template, onClose, onUse }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Get template-specific preview slides - 10 unique slides per template
  const getTemplateSlides = (templateName) => {
    const name = templateName?.toLowerCase() || ''
    
    if (name.includes('business')) {
      return {
        color: '#1e3c72',
        accentColor: '#2a5298',
        slides: [
          { id: 1, title: 'Business Strategy 2024', content: 'Corporate Overview\nStrategic Planning & Execution', icon: <Type size={18} />, headerColor: '#1e3c72', bgColor: '#ffffff', textColor: '#1e3c72', layout: 'title-navy' },
          { id: 2, title: 'Executive Summary', content: '• Revenue Growth: +25% YoY\n• Market Expansion Success\n• Operational Excellence\n• Sustainable Competitive Advantage', icon: <FileText size={18} />, headerColor: '#1e3c72', bgColor: '#f8f9fa', textColor: '#333333', layout: 'sidebar-navy' },
          { id: 3, title: 'Market Analysis', content: 'Industry Leadership Position\nMarket Share: 35%', icon: <BarChart3 size={18} />, headerColor: '#1e3c72', bgColor: '#ffffff', textColor: '#1e3c72', layout: 'chart-navy' },
          { id: 4, title: 'Financial Performance', content: 'Q3 2024 Results\nRevenue: $50M | Profit: $12M', icon: <Layout size={18} />, headerColor: '#1e3c72', bgColor: '#f0f4f8', textColor: '#1e3c72', layout: 'split-navy' },
          { id: 5, title: 'Our Leadership', content: 'Executive Board\nVision & Strategic Direction', icon: <Users size={18} />, headerColor: '#1e3c72', bgColor: '#ffffff', textColor: '#333333', layout: 'team-navy' },
          { id: 6, title: 'Product Portfolio', content: 'Diversified Revenue Streams\nCore Products & Services', icon: <Layout size={18} />, headerColor: '#1e3c72', bgColor: '#f8f9fa', textColor: '#1e3c72', layout: 'grid-navy' },
          { id: 7, title: 'Global Presence', content: 'Operating in 25+ Countries\nInternational Expansion', icon: <Target size={18} />, headerColor: '#1e3c72', bgColor: '#ffffff', textColor: '#333333', layout: 'map-navy' },
          { id: 8, title: 'Innovation Pipeline', content: 'R&D Investment: $5M\nNext-Gen Solutions', icon: <Lightbulb size={18} />, headerColor: '#1e3c72', bgColor: '#f0f4f8', textColor: '#1e3c72', layout: 'innovation-navy' },
          { id: 9, title: 'Risk Management', content: 'Mitigation Strategies\nCompliance & Governance', icon: <FileText size={18} />, headerColor: '#1e3c72', bgColor: '#ffffff', textColor: '#333333', layout: 'list-navy' },
          { id: 10, title: 'Next Steps', content: 'Q4 2024 Objectives\nImplementation Roadmap', icon: <Rocket size={18} />, headerColor: '#1e3c72', bgColor: '#1e3c72', textColor: '#ffffff', layout: 'cta-navy' }
        ]
      }
    }
    
    if (name.includes('dark')) {
      return {
        color: '#00ffc8',
        accentColor: '#1e1e24',
        slides: [
          { id: 1, title: 'Tech Innovation Hub', content: 'AI-Powered Solutions\nBuilding the Future', icon: <Type size={18} />, headerColor: '#1e1e24', bgColor: '#2a2a30', textColor: '#00ffc8', layout: 'neon-title' },
          { id: 2, title: 'Product Architecture', content: '• Microservices Design\n• Cloud-Native Infrastructure\n• Real-time Processing\n• Scalable Systems', icon: <FileText size={18} />, headerColor: '#1e1e24', bgColor: '#25252a', textColor: '#e0e0e0', layout: 'dark-card' },
          { id: 3, title: 'AI Capabilities', content: 'Neural Networks & ML\nDeep Learning Models', icon: <Layout size={18} />, headerColor: '#1e1e24', bgColor: '#2a2a30', textColor: '#00ffc8', layout: 'tech-grid' },
          { id: 4, title: 'Performance Metrics', content: '99.9% Uptime\n<50ms Response Time', icon: <BarChart3 size={18} />, headerColor: '#1e1e24', bgColor: '#1e1e24', textColor: '#00ffc8', layout: 'metrics-neon' },
          { id: 5, title: 'Security First', content: 'End-to-End Encryption\nZero Trust Architecture', icon: <Target size={18} />, headerColor: '#1e1e24', bgColor: '#25252a', textColor: '#e0e0e0', layout: 'security-dark' },
          { id: 6, title: 'Developer Experience', content: 'API-First Design\nComprehensive Documentation', icon: <Layout size={18} />, headerColor: '#1e1e24', bgColor: '#2a2a30', textColor: '#00ffc8', layout: 'code-dark' },
          { id: 7, title: 'Integration Ecosystem', content: '100+ Integrations\nSeamless Connectivity', icon: <Layout size={18} />, headerColor: '#1e1e24', bgColor: '#25252a', textColor: '#e0e0e0', layout: 'ecosystem-dark' },
          { id: 8, title: 'Customer Success', content: '10K+ Active Users\n98% Satisfaction Rate', icon: <Users size={18} />, headerColor: '#1e1e24', bgColor: '#2a2a30', textColor: '#00ffc8', layout: 'users-neon' },
          { id: 9, title: 'Roadmap 2024', content: 'Feature Releases\nPlatform Enhancements', icon: <Rocket size={18} />, headerColor: '#1e1e24', bgColor: '#25252a', textColor: '#e0e0e0', layout: 'roadmap-dark' },
          { id: 10, title: 'Get Started', content: 'Deploy in Minutes\nStart Building Today', icon: <Rocket size={18} />, headerColor: '#00ffc8', bgColor: '#1e1e24', textColor: '#00ffc8', layout: 'cta-neon' }
        ]
      }
    }
    
    if (name.includes('minimal')) {
      return {
        color: '#333333',
        accentColor: '#e0e0e0',
        slides: [
          { id: 1, title: 'Less is More', content: 'Minimalist Design Philosophy\nClarity Through Simplicity', icon: <Type size={18} />, headerColor: '#ffffff', bgColor: '#ffffff', textColor: '#333333', layout: 'minimal-title' },
          { id: 2, title: 'Our Approach', content: 'White Space\nTypography\nBalance\nHarmony', icon: <FileText size={18} />, headerColor: '#ffffff', bgColor: '#fafafa', textColor: '#555555', layout: 'minimal-list' },
          { id: 3, title: 'Design Principles', content: 'Form Follows Function\nEvery Element Has Purpose', icon: <Layout size={18} />, headerColor: '#ffffff', bgColor: '#ffffff', textColor: '#333333', layout: 'minimal-principles' },
          { id: 4, title: 'Typography', content: 'Clean Fonts\nPerfect Hierarchy', icon: <Type size={18} />, headerColor: '#ffffff', bgColor: '#f5f5f5', textColor: '#333333', layout: 'minimal-type' },
          { id: 5, title: 'Color Palette', content: 'Monochrome\nSubtle Accents', icon: <Layout size={18} />, headerColor: '#ffffff', bgColor: '#ffffff', textColor: '#555555', layout: 'minimal-color' },
          { id: 6, title: 'Selected Work', content: 'Portfolio Showcase\nClean Presentations', icon: <ImageIcon size={18} />, headerColor: '#ffffff', bgColor: '#fafafa', textColor: '#333333', layout: 'minimal-gallery' },
          { id: 7, title: 'Process', content: 'Research\nDesign\nRefine\nDeliver', icon: <Layout size={18} />, headerColor: '#ffffff', bgColor: '#ffffff', textColor: '#555555', layout: 'minimal-process' },
          { id: 8, title: 'Testimonials', content: 'Client Feedback\nSatisfied Partners', icon: <Users size={18} />, headerColor: '#ffffff', bgColor: '#f5f5f5', textColor: '#333333', layout: 'minimal-quote' },
          { id: 9, title: 'Services', content: 'Brand Identity\nVisual Design\nConsulting', icon: <FileText size={18} />, headerColor: '#ffffff', bgColor: '#ffffff', textColor: '#555555', layout: 'minimal-services' },
          { id: 10, title: 'Contact', content: 'hello@minimal.com\nLet\'s Create Together', icon: <Type size={18} />, headerColor: '#333333', bgColor: '#ffffff', textColor: '#333333', layout: 'minimal-contact' }
        ]
      }
    }
    
    if (name.includes('nature') || name.includes('green')) {
      return {
        color: '#228b22',
        accentColor: '#90ee90',
        slides: [
          { id: 1, title: 'Sustainability First', content: 'Eco-Friendly Solutions\nFor a Better Tomorrow', icon: <Type size={18} />, headerColor: '#228b22', bgColor: '#f0fff0', textColor: '#1a5c1a', layout: 'nature-title' },
          { id: 2, title: 'Our Mission', content: '• Carbon Neutral by 2030\n• 100% Renewable Energy\n• Zero Waste Initiative\n• Biodiversity Protection', icon: <FileText size={18} />, headerColor: '#228b22', bgColor: '#ffffff', textColor: '#2d5a2d', layout: 'nature-list' },
          { id: 3, title: 'Environmental Impact', content: '1M Trees Planted\n50% Carbon Reduced', icon: <BarChart3 size={18} />, headerColor: '#228b22', bgColor: '#f0fff0', textColor: '#1a5c1a', layout: 'nature-stats' },
          { id: 4, title: 'Green Initiatives', content: 'Forest Conservation\nOcean Protection Programs', icon: <Layout size={18} />, headerColor: '#228b22', bgColor: '#ffffff', textColor: '#2d5a2d', layout: 'nature-grid' },
          { id: 5, title: 'Renewable Energy', content: 'Solar & Wind Power\nClean Energy Solutions', icon: <Lightbulb size={18} />, headerColor: '#228b22', bgColor: '#f0fff0', textColor: '#1a5c1a', layout: 'nature-energy' },
          { id: 6, title: 'Sustainable Products', content: 'Eco-Friendly Materials\nBiodegradable Packaging', icon: <Layout size={18} />, headerColor: '#228b22', bgColor: '#ffffff', textColor: '#2d5a2d', layout: 'nature-products' },
          { id: 7, title: 'Community Programs', content: 'Local Engagement\nEducation & Awareness', icon: <Users size={18} />, headerColor: '#228b22', bgColor: '#f0fff0', textColor: '#1a5c1a', layout: 'nature-community' },
          { id: 8, title: 'Certifications', content: 'ISO 14001\nLEED Platinum', icon: <Award size={18} />, headerColor: '#228b22', bgColor: '#ffffff', textColor: '#2d5a2d', layout: 'nature-awards' },
          { id: 9, title: 'Partners', content: 'Environmental Organizations\nGlobal Alliances', icon: <Target size={18} />, headerColor: '#228b22', bgColor: '#f0fff0', textColor: '#1a5c1a', layout: 'nature-partners' },
          { id: 10, title: 'Join the Movement', content: 'Together for Earth\nSustainable Future', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#228b22', textColor: '#ffffff', layout: 'nature-cta' }
        ]
      }
    }
    
    if (name.includes('purple') || name.includes('creative')) {
      return {
        color: '#8a2be2',
        accentColor: '#da70d6',
        slides: [
          { id: 1, title: 'Creative Vision', content: 'Bold Ideas\nArtistic Expression', icon: <Type size={18} />, headerColor: '#8a2be2', bgColor: '#faf5ff', textColor: '#4a148c', layout: 'creative-title' },
          { id: 2, title: 'Design Process', content: '• Inspiration & Research\n• Concept Development\n• Visual Exploration\n• Final Execution', icon: <FileText size={18} />, headerColor: '#8a2be2', bgColor: '#ffffff', textColor: '#6a1b9a', layout: 'creative-process' },
          { id: 3, title: 'Brand Identity', content: 'Logo Design\nVisual Systems', icon: <Layout size={18} />, headerColor: '#8a2be2', bgColor: '#faf5ff', textColor: '#4a148c', layout: 'creative-brand' },
          { id: 4, title: 'Digital Experiences', content: 'Web Design\nApp Interfaces', icon: <Layout size={18} />, headerColor: '#8a2be2', bgColor: '#ffffff', textColor: '#6a1b9a', layout: 'creative-digital' },
          { id: 5, title: 'Print & Packaging', content: 'Editorial Design\nProduct Packaging', icon: <ImageIcon size={18} />, headerColor: '#8a2be2', bgColor: '#faf5ff', textColor: '#4a148c', layout: 'creative-print' },
          { id: 6, title: 'Motion Graphics', content: 'Animation\nVideo Production', icon: <Layout size={18} />, headerColor: '#8a2be2', bgColor: '#ffffff', textColor: '#6a1b9a', layout: 'creative-motion' },
          { id: 7, title: 'Selected Work', content: 'Portfolio Highlights\nCase Studies', icon: <ImageIcon size={18} />, headerColor: '#8a2be2', bgColor: '#faf5ff', textColor: '#4a148c', layout: 'creative-portfolio' },
          { id: 8, title: 'Awards', content: 'Design Excellence 2024\nCreative Innovation', icon: <Award size={18} />, headerColor: '#8a2be2', bgColor: '#ffffff', textColor: '#6a1b9a', layout: 'creative-awards' },
          { id: 9, title: 'Our Team', content: 'Creative Minds\nDesign Experts', icon: <Users size={18} />, headerColor: '#8a2be2', bgColor: '#faf5ff', textColor: '#4a148c', layout: 'creative-team' },
          { id: 10, title: 'Start Creating', content: 'Your Vision\nOur Expertise', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#8a2be2', textColor: '#ffffff', layout: 'creative-cta' }
        ]
      }
    }
    
    if (name.includes('orange') || name.includes('sunset')) {
      return {
        color: '#ff8c00',
        accentColor: '#ffd700',
        slides: [
          { id: 1, title: 'Ignite Success', content: 'Energy & Passion\nDrive Results', icon: <Type size={18} />, headerColor: '#ff8c00', bgColor: '#fff8f0', textColor: '#8b4513', layout: 'sunset-title' },
          { id: 2, title: 'Sales Performance', content: '• 150% Target Achieved\n• New Market Entry\n• Customer Acquisition\n• Revenue Growth', icon: <FileText size={18} />, headerColor: '#ff8c00', bgColor: '#ffffff', textColor: '#a0522d', layout: 'sunset-sales' },
          { id: 3, title: 'Growth Metrics', content: 'Q3 Performance\nRecord Breaking Numbers', icon: <BarChart3 size={18} />, headerColor: '#ff8c00', bgColor: '#fff8f0', textColor: '#8b4513', layout: 'sunset-chart' },
          { id: 4, title: 'Team Spirit', content: 'Together We Rise\nChampions Mindset', icon: <Users size={18} />, headerColor: '#ff8c00', bgColor: '#ffffff', textColor: '#a0522d', layout: 'sunset-team' },
          { id: 5, title: 'Motivation', content: 'Inspire Action\nAchieve Greatness', icon: <Lightbulb size={18} />, headerColor: '#ff8c00', bgColor: '#fff8f0', textColor: '#8b4513', layout: 'sunset-motivation' },
          { id: 6, title: 'Goals 2024', content: 'Ambitious Targets\nUnstoppable Drive', icon: <Target size={18} />, headerColor: '#ff8c00', bgColor: '#ffffff', textColor: '#a0522d', layout: 'sunset-goals' },
          { id: 7, title: 'Success Stories', content: 'Client Wins\nTestimonials', icon: <Award size={18} />, headerColor: '#ff8c00', bgColor: '#fff8f0', textColor: '#8b4513', layout: 'sunset-stories' },
          { id: 8, title: 'Training Programs', content: 'Skill Development\nLeadership Growth', icon: <Layout size={18} />, headerColor: '#ff8c00', bgColor: '#ffffff', textColor: '#a0522d', layout: 'sunset-training' },
          { id: 9, title: 'Events', content: 'Annual Conference\nTeam Building', icon: <Layout size={18} />, headerColor: '#ff8c00', bgColor: '#fff8f0', textColor: '#8b4513', layout: 'sunset-events' },
          { id: 10, title: 'Victory', content: 'Success Awaits\nGo Get It!', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#ff8c00', textColor: '#ffffff', layout: 'sunset-cta' }
        ]
      }
    }
    
    if (name.includes('blue') || name.includes('ocean')) {
      return {
        color: '#006994',
        accentColor: '#4db8ff',
        slides: [
          { id: 1, title: 'Deep Dive Analysis', content: 'Ocean of Opportunities\nStrategic Insights', icon: <Type size={18} />, headerColor: '#006994', bgColor: '#f0f8ff', textColor: '#003366', layout: 'ocean-title' },
          { id: 2, title: 'Market Research', content: '• Industry Analysis\n• Consumer Insights\n• Trend Forecasting\n• Growth Potential', icon: <FileText size={18} />, headerColor: '#006994', bgColor: '#ffffff', textColor: '#004080', layout: 'ocean-research' },
          { id: 3, title: 'Blue Ocean Strategy', content: 'Untapped Markets\nCompetitive Advantage', icon: <Target size={18} />, headerColor: '#006994', bgColor: '#f0f8ff', textColor: '#003366', layout: 'ocean-strategy' },
          { id: 4, title: 'Global Reach', content: '25+ Countries\nInternational Presence', icon: <Layout size={18} />, headerColor: '#006994', bgColor: '#ffffff', textColor: '#004080', layout: 'ocean-global' },
          { id: 5, title: 'Trust & Reliability', content: '15 Years Experience\nTrusted Partner', icon: <Award size={18} />, headerColor: '#006994', bgColor: '#f0f8ff', textColor: '#003366', layout: 'ocean-trust' },
          { id: 6, title: 'Solutions', content: 'Consulting Services\nImplementation Support', icon: <Layout size={18} />, headerColor: '#006994', bgColor: '#ffffff', textColor: '#004080', layout: 'ocean-solutions' },
          { id: 7, title: 'Expert Team', content: 'Industry Experts\nThought Leaders', icon: <Users size={18} />, headerColor: '#006994', bgColor: '#f0f8ff', textColor: '#003366', layout: 'ocean-team' },
          { id: 8, title: 'Case Studies', content: 'Success Stories\nClient Results', icon: <FileText size={18} />, headerColor: '#006994', bgColor: '#ffffff', textColor: '#004080', layout: 'ocean-cases' },
          { id: 9, title: 'Methodology', content: 'Proven Framework\nData-Driven Approach', icon: <Layout size={18} />, headerColor: '#006994', bgColor: '#f0f8ff', textColor: '#003366', layout: 'ocean-method' },
          { id: 10, title: 'Smooth Sailing', content: 'Navigate Success\nSteady Growth', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#006994', textColor: '#ffffff', layout: 'ocean-cta' }
        ]
      }
    }
    
    if (name.includes('gold') || name.includes('executive')) {
      return {
        color: '#b8860b',
        accentColor: '#ffd700',
        slides: [
          { id: 1, title: 'Excellence Defined', content: 'Premium Quality\nLuxury Standards', icon: <Type size={18} />, headerColor: '#b8860b', bgColor: '#fffaf0', textColor: '#5c4b00', layout: 'gold-title' },
          { id: 2, title: 'Board Overview', content: '• Q4 Financial Results\n• Strategic Investments\n• Shareholder Value\n• Market Leadership', icon: <FileText size={18} />, headerColor: '#b8860b', bgColor: '#ffffff', textColor: '#6b5a1a', layout: 'gold-board' },
          { id: 3, title: 'Investment Portfolio', content: 'Diversified Assets\nWealth Management', icon: <BarChart3 size={18} />, headerColor: '#b8860b', bgColor: '#fffaf0', textColor: '#5c4b00', layout: 'gold-portfolio' },
          { id: 4, title: 'Private Banking', content: 'Exclusive Services\nPersonal Attention', icon: <Users size={18} />, headerColor: '#b8860b', bgColor: '#ffffff', textColor: '#6b5a1a', layout: 'gold-banking' },
          { id: 5, title: 'Our Legacy', content: '50 Years of Excellence\nHeritage & Trust', icon: <Award size={18} />, headerColor: '#b8860b', bgColor: '#fffaf0', textColor: '#5c4b00', layout: 'gold-legacy' },
          { id: 6, title: 'Premium Services', content: 'Concierge\nBespoke Solutions', icon: <Layout size={18} />, headerColor: '#b8860b', bgColor: '#ffffff', textColor: '#6b5a1a', layout: 'gold-services' },
          { id: 7, title: 'Global Network', content: 'International Offices\nLocal Expertise', icon: <Target size={18} />, headerColor: '#b8860b', bgColor: '#fffaf0', textColor: '#5c4b00', layout: 'gold-network' },
          { id: 8, title: 'Advisory', content: 'Expert Counsel\nStrategic Guidance', icon: <Lightbulb size={18} />, headerColor: '#b8860b', bgColor: '#ffffff', textColor: '#6b5a1a', layout: 'gold-advisory' },
          { id: 9, title: 'Membership', content: 'Exclusive Benefits\nVIP Access', icon: <Award size={18} />, headerColor: '#b8860b', bgColor: '#fffaf0', textColor: '#5c4b00', layout: 'gold-vip' },
          { id: 10, title: 'Partnership', content: 'Premium Service\nLasting Relationships', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#b8860b', textColor: '#ffffff', layout: 'gold-cta' }
        ]
      }
    }
    
    if (name.includes('startup') || name.includes('modern')) {
      return {
        color: '#6441a5',
        accentColor: '#ff6b6b',
        slides: [
          { id: 1, title: 'Disrupt the Status Quo', content: 'Innovate & Scale\nStartup Mindset', icon: <Type size={18} />, headerColor: '#6441a5', bgColor: '#f8f8ff', textColor: '#3d2b5a', layout: 'startup-title' },
          { id: 2, title: 'The Problem', content: 'Market Gap Identified\nPain Points Addressed', icon: <Target size={18} />, headerColor: '#6441a5', bgColor: '#ffffff', textColor: '#4a3b6e', layout: 'startup-problem' },
          { id: 3, title: 'Our Solution', content: 'Product Demo\nKey Features & Benefits', icon: <Lightbulb size={18} />, headerColor: '#6441a5', bgColor: '#f8f8ff', textColor: '#3d2b5a', layout: 'startup-solution' },
          { id: 4, title: 'Market Opportunity', content: '$10B Market Size\nHigh Growth Potential', icon: <BarChart3 size={18} />, headerColor: '#6441a5', bgColor: '#ffffff', textColor: '#4a3b6e', layout: 'startup-market' },
          { id: 5, title: 'Traction', content: '10K Active Users\n$1M ARR', icon: <Rocket size={18} />, headerColor: '#6441a5', bgColor: '#f8f8ff', textColor: '#3d2b5a', layout: 'startup-traction' },
          { id: 6, title: 'Business Model', content: 'Revenue Streams\nPricing Strategy', icon: <Layout size={18} />, headerColor: '#6441a5', bgColor: '#ffffff', textColor: '#4a3b6e', layout: 'startup-model' },
          { id: 7, title: 'Competitive Edge', content: 'Differentiation\nMoat & Barriers', icon: <Award size={18} />, headerColor: '#6441a5', bgColor: '#f8f8ff', textColor: '#3d2b5a', layout: 'startup-competition' },
          { id: 8, title: 'Team', content: 'Founders & Key Hires\nIndustry Experts', icon: <Users size={18} />, headerColor: '#6441a5', bgColor: '#ffffff', textColor: '#4a3b6e', layout: 'startup-team' },
          { id: 9, title: 'Roadmap', content: 'Product Timeline\nMilestones & Goals', icon: <Layout size={18} />, headerColor: '#6441a5', bgColor: '#f8f8ff', textColor: '#3d2b5a', layout: 'startup-roadmap' },
          { id: 10, title: 'Invest', content: 'Seed Round Open\nJoin the Journey', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#6441a5', textColor: '#ffffff', layout: 'startup-cta' }
        ]
      }
    }
    
    if (name.includes('health') || name.includes('medical')) {
      return {
        color: '#00b3b3',
        accentColor: '#80e5e5',
        slides: [
          { id: 1, title: 'Patient Care First', content: 'Medical Excellence\nCompassionate Service', icon: <Type size={18} />, headerColor: '#00b3b3', bgColor: '#f0ffff', textColor: '#006666', layout: 'medical-title' },
          { id: 2, title: 'Our Services', content: '• Primary Care\n• Specialist Consultation\n• Emergency Services\n• Preventive Care', icon: <FileText size={18} />, headerColor: '#00b3b3', bgColor: '#ffffff', textColor: '#007777', layout: 'medical-services' },
          { id: 3, title: 'Medical Technology', content: 'Latest Equipment\nAdvanced Diagnostics', icon: <Layout size={18} />, headerColor: '#00b3b3', bgColor: '#f0ffff', textColor: '#006666', layout: 'medical-tech' },
          { id: 4, title: 'Expert Physicians', content: 'Board Certified\nExperienced Doctors', icon: <Users size={18} />, headerColor: '#00b3b3', bgColor: '#ffffff', textColor: '#007777', layout: 'medical-doctors' },
          { id: 5, title: 'Patient Outcomes', content: '98% Satisfaction\nSuccessful Treatments', icon: <Award size={18} />, headerColor: '#00b3b3', bgColor: '#f0ffff', textColor: '#006666', layout: 'medical-outcomes' },
          { id: 6, title: 'Facilities', content: 'State-of-Art Centers\nModern Infrastructure', icon: <Layout size={18} />, headerColor: '#00b3b3', bgColor: '#ffffff', textColor: '#007777', layout: 'medical-facilities' },
          { id: 7, title: 'Insurance', content: 'Accepted Plans\nCoverage Options', icon: <FileText size={18} />, headerColor: '#00b3b3', bgColor: '#f0ffff', textColor: '#006666', layout: 'medical-insurance' },
          { id: 8, title: 'Research', content: 'Clinical Trials\nMedical Innovation', icon: <Lightbulb size={18} />, headerColor: '#00b3b3', bgColor: '#ffffff', textColor: '#007777', layout: 'medical-research' },
          { id: 9, title: 'Locations', content: 'Multiple Clinics\nEasy Accessibility', icon: <Target size={18} />, headerColor: '#00b3b3', bgColor: '#f0ffff', textColor: '#006666', layout: 'medical-locations' },
          { id: 10, title: 'Book Appointment', content: 'Easy Scheduling\nQuality Care', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#00b3b3', textColor: '#ffffff', layout: 'medical-cta' }
        ]
      }
    }
    
    // Default fallback
    return {
      color: '#d4a574',
      accentColor: '#b8935f',
      slides: [
        { id: 1, title: template.name || 'Presentation', content: 'Welcome\nProfessional Template', icon: <Type size={18} />, headerColor: '#d4a574', bgColor: '#faf8f5', textColor: '#5a4a3a', layout: 'default-title' },
        { id: 2, title: 'Introduction', content: '• First Point\n• Second Point\n• Third Point\n• Fourth Point', icon: <FileText size={18} />, headerColor: '#d4a574', bgColor: '#ffffff', textColor: '#5a4a3a', layout: 'default-list' },
        { id: 3, title: 'Overview', content: 'Key Information\nMain Highlights', icon: <Layout size={18} />, headerColor: '#d4a574', bgColor: '#faf8f5', textColor: '#5a4a3a', layout: 'default-overview' },
        { id: 4, title: 'Details', content: 'In-depth Analysis\nComprehensive Data', icon: <FileText size={18} />, headerColor: '#d4a574', bgColor: '#ffffff', textColor: '#5a4a3a', layout: 'default-details' },
        { id: 5, title: 'Visual Data', content: 'Charts & Graphs\nData Visualization', icon: <BarChart3 size={18} />, headerColor: '#d4a574', bgColor: '#faf8f5', textColor: '#5a4a3a', layout: 'default-chart' },
        { id: 6, title: 'Features', content: 'Key Capabilities\nCore Functions', icon: <Layout size={18} />, headerColor: '#d4a574', bgColor: '#ffffff', textColor: '#5a4a3a', layout: 'default-features' },
        { id: 7, title: 'Benefits', content: 'Advantages\nValue Proposition', icon: <Award size={18} />, headerColor: '#d4a574', bgColor: '#faf8f5', textColor: '#5a4a3a', layout: 'default-benefits' },
        { id: 8, title: 'Use Cases', content: 'Applications\nReal-world Examples', icon: <Target size={18} />, headerColor: '#d4a574', bgColor: '#ffffff', textColor: '#5a4a3a', layout: 'default-cases' },
        { id: 9, title: 'Implementation', content: 'Getting Started\nSetup Guide', icon: <Layout size={18} />, headerColor: '#d4a574', bgColor: '#faf8f5', textColor: '#5a4a3a', layout: 'default-implementation' },
        { id: 10, title: 'Next Steps', content: 'Summary\nCall to Action', icon: <Rocket size={18} />, headerColor: '#ffffff', bgColor: '#d4a574', textColor: '#ffffff', layout: 'default-cta' }
      ]
    }
  }

  const templateData = getTemplateSlides(template.name)
  const sampleSlides = templateData.slides
  const themeColor = templateData.color

  const currentSlide = sampleSlides[currentSlideIndex]
  const totalSlides = sampleSlides.length

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index)
    }
  }

  const goToPrevious = () => goToSlide(currentSlideIndex - 1)
  const goToNext = () => goToSlide(currentSlideIndex + 1)

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="preview-header">
          <div className="preview-header-info">
            <h3>{template.name}</h3>
            <span>Template Preview • Slide {currentSlideIndex + 1} of {totalSlides}</span>
          </div>
          <div className="preview-header-actions">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.75rem',
              background: 'rgba(212, 165, 116, 0.1)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'var(--primary)'
            }}>
              <Star size={14} />
              <span>Sample Template</span>
            </div>
            <button className="preview-btn-primary" onClick={onUse}>
              <Check size={16} />
              Use Template
            </button>
            <button className="preview-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="preview-body">
          {/* Left Sidebar - Slide Types */}
          <div className="preview-sidebar">
            <div className="preview-sidebar-header">
              <span>10 Slide Layouts</span>
            </div>
            <div className="preview-thumbnails" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
              {sampleSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`preview-thumbnail ${index === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  style={{
                    borderColor: index === currentSlideIndex ? themeColor : 'transparent',
                    background: index === currentSlideIndex ? `${themeColor}15` : undefined
                  }}
                >
                  <div 
                    className="preview-thumbnail-number" 
                    style={{ 
                      background: index === currentSlideIndex ? themeColor : 'var(--gradient-primary)',
                      color: index === currentSlideIndex ? '#fff' : '#1A1510'
                    }}
                  >
                    {slide.icon}
                  </div>
                  <div className="preview-thumbnail-content">
                    <div className="preview-thumbnail-title">{slide.title}</div>
                    <div className="preview-thumbnail-text">
                      Slide {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Main Preview */}
          <div className="preview-main">
            <div className="preview-slide-wrapper">
              <div 
                className="preview-slide-canvas" 
                style={{
                  background: currentSlide.bgColor,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Slide Header */}
                <div 
                  className="preview-slide-header-bar" 
                  style={{ 
                    background: currentSlide.headerColor,
                    color: '#fff',
                    padding: '0.75rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span 
                    className="preview-slide-number-badge"
                    style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {currentSlideIndex + 1}
                  </span>
                  <span className="preview-slide-title-text" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {currentSlide.title}
                  </span>
                </div>
                
                {/* Slide Content */}
                <div 
                  className="preview-slide-body" 
                  style={{ 
                    background: currentSlide.bgColor,
                    color: currentSlide.textColor,
                    padding: '1.5rem 2rem',
                    flex: 1,
                    overflowY: 'auto'
                  }}
                >
                  <h2 
                    className="preview-slide-heading"
                    style={{ 
                      color: currentSlide.textColor,
                      borderBottom: `2px solid ${themeColor}`,
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      fontSize: '1.5rem',
                      fontWeight: 700
                    }}
                  >
                    {currentSlide.title}
                  </h2>
                  <div className="preview-slide-content-text" style={{ lineHeight: 1.7 }}>
                    {currentSlide.content.split('\n').map((line, i) => (
                      <p 
                        key={i} 
                        className="preview-slide-line"
                        style={{ 
                          color: currentSlide.textColor,
                          marginBottom: '0.5rem',
                          fontSize: '0.95rem'
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              className="preview-nav-arrow preview-nav-prev" 
              onClick={goToPrevious}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="preview-nav-arrow preview-nav-next" 
              onClick={goToNext}
              disabled={currentSlideIndex === totalSlides - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="preview-footer">
          <div className="preview-footer-info">
            <span>{template.name}</span>
            <span>•</span>
            <span>{template.description}</span>
          </div>
          <div className="preview-footer-nav">
            <button onClick={goToPrevious} disabled={currentSlideIndex === 0}>
              <ChevronLeft size={16} />
              Previous
            </button>
            <span>{currentSlideIndex + 1} / {totalSlides}</span>
            <button onClick={goToNext} disabled={currentSlideIndex === totalSlides - 1}>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplatePreviewModal
