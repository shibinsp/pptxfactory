"""
Template Selector Agent - Intelligent template matching
"""

import json
from typing import Dict, List, Optional
from difflib import SequenceMatcher


class TemplateSelectorAgent:
    """
    AI-powered template selection based on content analysis
    """
    
    def __init__(self, templates_data: List[Dict] = None):
        self.templates = templates_data or []
        self.category_keywords = {
            'Business': ['business', 'corporate', 'company', 'strategy', 'meeting', 'report', 'finance', 'sales', 'marketing'],
            'Creative': ['creative', 'design', 'portfolio', 'art', 'brand', 'innovation', 'concept'],
            'Technology': ['technology', 'tech', 'software', 'app', 'digital', 'ai', 'data', 'code', 'startup'],
            'Education': ['education', 'learning', 'training', 'course', 'academic', 'school', 'university', 'teaching'],
            'Healthcare': ['health', 'medical', 'healthcare', 'doctor', 'patient', 'wellness', 'fitness'],
            'Nature': ['nature', 'environment', 'green', 'eco', 'sustainability', 'climate', 'organic'],
            'Events': ['event', 'conference', 'wedding', 'party', 'celebration', 'ceremony'],
            'Lifestyle': ['lifestyle', 'fashion', 'food', 'travel', 'hobby', 'personal'],
            'Industry': ['industry', 'manufacturing', 'construction', 'real estate', 'hospitality'],
            'Seasonal': ['christmas', 'holiday', 'summer', 'winter', 'spring', 'autumn', 'seasonal']
        }
    
    def select_template(self, prompt: str, content_summary: str = "") -> Dict:
        """
        Select best template based on prompt and content
        
        Returns:
            {
                "template_id": str,
                "template_name": str,
                "confidence": float,
                "reasoning": str,
                "alternatives": List[Dict]
            }
        """
        combined_text = f"{prompt} {content_summary}".lower()
        
        # Score each template
        scored_templates = []
        
        for template in self.templates:
            score = self._calculate_match_score(template, combined_text)
            scored_templates.append((template, score))
        
        # Sort by score
        scored_templates.sort(key=lambda x: x[1], reverse=True)
        
        # Get best match
        best_match = scored_templates[0] if scored_templates else (None, 0)
        alternatives = scored_templates[1:4] if len(scored_templates) > 1 else []
        
        if best_match[0]:
            return {
                "template_id": best_match[0].get('id'),
                "template_name": best_match[0].get('name'),
                "confidence": best_match[1],
                "reasoning": self._generate_reasoning(best_match[0], combined_text),
                "alternatives": [
                    {
                        "template_id": t.get('id'),
                        "template_name": t.get('name'),
                        "confidence": s
                    }
                    for t, s in alternatives
                ]
            }
        
        return {
            "template_id": "business_professional",
            "template_name": "Business Professional",
            "confidence": 0.5,
            "reasoning": "Default template selected",
            "alternatives": []
        }
    
    def _calculate_match_score(self, template: Dict, text: str) -> float:
        """Calculate how well template matches the text"""
        score = 0.0
        
        # Category match
        category = template.get('category', '')
        keywords = self.category_keywords.get(category, [])
        
        for keyword in keywords:
            if keyword in text:
                score += 0.2
        
        # Template name/description match
        name = template.get('name', '').lower()
        description = template.get('description', '').lower()
        
        # Use fuzzy matching
        name_similarity = SequenceMatcher(None, name, text).ratio()
        desc_similarity = SequenceMatcher(None, description, text).ratio()
        
        score += name_similarity * 0.3
        score += desc_similarity * 0.2
        
        # Style matching
        style = template.get('style', '').lower()
        style_keywords = {
            'corporate': ['business', 'professional', 'formal', 'company'],
            'creative': ['design', 'art', 'colorful', 'bold'],
            'minimal': ['simple', 'clean', 'minimal', 'modern'],
            'tech': ['technology', 'digital', 'futuristic', 'modern'],
            'elegant': ['elegant', 'luxury', 'premium', 'sophisticated']
        }
        
        for style_key, style_words in style_keywords.items():
            if style == style_key:
                for word in style_words:
                    if word in text:
                        score += 0.1
        
        return min(score, 1.0)  # Cap at 1.0
    
    def _generate_reasoning(self, template: Dict, text: str) -> str:
        """Generate human-readable reasoning for selection"""
        reasons = []
        
        category = template.get('category', '')
        if category:
            reasons.append(f"Category '{category}' matches your content")
        
        style = template.get('style', '')
        if style:
            reasons.append(f"{style.capitalize()} style suits your presentation")
        
        return "; ".join(reasons) if reasons else "Best overall match"
    
    def get_templates_by_category(self, category: str) -> List[Dict]:
        """Get all templates in a category"""
        return [t for t in self.templates if t.get('category') == category]
    
    def get_recommendations(self, current_template_id: str, 
                           presentation_context: str) -> List[Dict]:
        """Get alternative template recommendations"""
        current = next((t for t in self.templates if t.get('id') == current_template_id), None)
        
        if not current:
            return []
        
        # Find similar templates
        similar = []
        for template in self.templates:
            if template.get('id') != current_template_id:
                # Same category
                if template.get('category') == current.get('category'):
                    similar.append(template)
                # Similar style
                elif template.get('style') == current.get('style'):
                    similar.append(template)
        
        return similar[:3]
    
    def suggest_color_adjustments(self, template_id: str, 
                                   brand_colors: List[str]) -> Dict:
        """Suggest color adjustments for brand compliance"""
        template = next((t for t in self.templates if t.get('id') == template_id), None)
        
        if not template or not brand_colors:
            return {}
        
        current_colors = template.get('colors', {})
        
        suggestions = {
            "primary": brand_colors[0] if brand_colors else current_colors.get('primary'),
            "accent": brand_colors[1] if len(brand_colors) > 1 else current_colors.get('accent'),
            "keep_background": True,
            "reasoning": "Applied brand colors while maintaining template aesthetic"
        }
        
        return suggestions
