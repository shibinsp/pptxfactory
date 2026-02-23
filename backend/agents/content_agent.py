"""
Content Generation Agent - Advanced content creation and enhancement
"""

import json
import re
from typing import Dict, List, Optional
from datetime import datetime


class ContentGenerationAgent:
    """
    Advanced content generation for presentations
    Includes: writing, rewriting, summarization, expansion
    """
    
    def __init__(self, mistral_client=None):
        self.mistral_client = mistral_client
        self.writing_styles = {
            'professional': 'Formal business tone with clear, concise language',
            'casual': 'Conversational and approachable tone',
            'academic': 'Scholarly tone with technical vocabulary',
            'creative': 'Engaging and imaginative tone',
            'persuasive': 'Compelling tone focused on convincing the audience',
            'minimal': 'Ultra-concise, bullet-point focused'
        }
    
    def generate_slide_content(self, topic: str, slide_type: str = 'content', 
                               num_bullets: int = 3, style: str = 'professional') -> Dict:
        """Generate complete slide content"""
        
        if not self.mistral_client:
            return self._fallback_content_generation(topic, slide_type, num_bullets)
        
        try:
            style_desc = self.writing_styles.get(style, self.writing_styles['professional'])
            
            prompt = f"""Create {slide_type} slide content for: "{topic}"
            
Style: {style_desc}
Number of bullet points: {num_bullets}

Return JSON format:
{{
    "title": "Slide title (max 10 words)",
    "bullets": ["point 1", "point 2", ...],
    "speaker_notes": "Detailed notes for presenter (2-3 sentences)",
    "suggested_image": "Description of relevant image"
}}

Response:"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            content = response.choices[0].message.content
            
            # Extract JSON
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            
            return self._fallback_content_generation(topic, slide_type, num_bullets)
            
        except Exception as e:
            return self._fallback_content_generation(topic, slide_type, num_bullets)
    
    def _fallback_content_generation(self, topic: str, slide_type: str, num_bullets: int) -> Dict:
        """Fallback content when AI is unavailable"""
        return {
            "title": topic,
            "bullets": [f"Key point {i+1} about {topic}" for i in range(num_bullets)],
            "speaker_notes": f"Discuss the main aspects of {topic}.",
            "suggested_image": f"{topic} concept"
        }
    
    def improve_writing(self, text: str, style: str = 'professional', 
                        make_shorter: bool = False) -> str:
        """Improve existing text"""
        
        if not self.mistral_client:
            return text
        
        try:
            length_instruction = "Make it more concise and punchy." if make_shorter else "Keep similar length."
            style_desc = self.writing_styles.get(style, self.writing_styles['professional'])
            
            prompt = f"""Improve this text for a presentation.

Style: {style_desc}
{length_instruction}

Original text:
{text}

Improved version (return only the improved text, no explanations):"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            return text
    
    def expand_bullet_points(self, bullets: List[str], detail_level: str = 'medium') -> List[str]:
        """Expand bullet points with more detail"""
        
        if not self.mistral_client:
            return bullets
        
        try:
            bullets_text = '\n'.join([f"• {b}" for b in bullets])
            
            prompt = f"""Expand these bullet points with {detail_level} detail for a presentation.
Make them more informative and impactful.

Original bullets:
{bullets_text}

Expanded bullets (return as a JSON array of strings):"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            content = response.choices[0].message.content
            
            # Try to extract JSON array
            json_match = re.search(r'\[.*\]', content, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            
            return bullets
            
        except Exception as e:
            return bullets
    
    def condense_content(self, text: str, max_words: int = 50) -> str:
        """Condense long text to fit on slide"""
        
        words = text.split()
        if len(words) <= max_words:
            return text
        
        if not self.mistral_client:
            return ' '.join(words[:max_words]) + '...'
        
        try:
            prompt = f"""Condense this text to {max_words} words or less while keeping the key message.
Make it punchy and suitable for a presentation slide.

Original:
{text}

Condensed version:"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            return ' '.join(words[:max_words]) + '...'
    
    def generate_speaker_notes(self, slide_title: str, slide_content: str,
                                presentation_context: str = "") -> str:
        """Generate speaker notes for a slide"""
        
        if not self.mistral_client:
            return f"Discuss: {slide_title}"
        
        try:
            context_str = f"Context: {presentation_context}\n" if presentation_context else ""
            
            prompt = f"""Generate speaker notes for this presentation slide.
{context_str}
Slide Title: {slide_title}
Slide Content: {slide_content}

Create 2-3 sentences of speaking notes that expand on the slide content.
Include a transition phrase and key points to emphasize.

Speaker notes:"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            return f"Discuss: {slide_title}"
    
    def suggest_visuals(self, slide_title: str, slide_content: str) -> List[Dict]:
        """Suggest visual elements for a slide"""
        
        suggestions = []
        content_lower = slide_content.lower()
        
        # Data/chart suggestions
        if any(word in content_lower for word in ['percent', '%', 'growth', 'increase', 'decrease', 'statistics', 'data']):
            suggestions.append({
                "type": "chart",
                "chart_type": "bar",
                "reason": "Data comparison"
            })
        
        if any(word in content_lower for word in ['timeline', 'history', 'progress', 'over time']):
            suggestions.append({
                "type": "chart",
                "chart_type": "line",
                "reason": "Trend visualization"
            })
        
        if any(word in content_lower for word in ['share', 'distribution', 'breakdown', 'proportion']):
            suggestions.append({
                "type": "chart",
                "chart_type": "pie",
                "reason": "Part-to-whole relationship"
            })
        
        # Image suggestions
        if any(word in content_lower for word in ['team', 'people', 'customer', 'user']):
            suggestions.append({
                "type": "image",
                "search_term": "professional team collaboration",
                "reason": "Human element"
            })
        
        if any(word in content_lower for word in ['technology', 'digital', 'software', 'app']):
            suggestions.append({
                "type": "image",
                "search_term": "modern technology abstract",
                "reason": "Tech visualization"
            })
        
        # Icon suggestions
        suggestions.append({
            "type": "icon",
            "suggestions": ["lightbulb", "chart", "rocket", "target"],
            "reason": "Visual emphasis"
        })
        
        return suggestions
    
    def create_outline(self, topic: str, num_slides: int = 5, 
                       presentation_type: str = 'informative') -> List[Dict]:
        """Create presentation outline"""
        
        if not self.mistral_client:
            return self._fallback_outline(topic, num_slides)
        
        try:
            prompt = f"""Create a {num_slides}-slide presentation outline for: "{topic}"
Presentation type: {presentation_type}

Return JSON array with slide objects containing:
- slide_number
- title
- content_type (title/content/chart/closing)
- key_points (array of 2-3 points)

JSON format:"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            content = response.choices[0].message.content
            
            # Extract JSON
            json_match = re.search(r'\[.*\]', content, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            
            return self._fallback_outline(topic, num_slides)
            
        except Exception as e:
            return self._fallback_outline(topic, num_slides)
    
    def _fallback_outline(self, topic: str, num_slides: int) -> List[Dict]:
        """Fallback outline generation"""
        outline = [
            {
                "slide_number": 1,
                "title": topic,
                "content_type": "title",
                "key_points": ["Introduction to the topic"]
            }
        ]
        
        for i in range(2, num_slides):
            outline.append({
                "slide_number": i,
                "title": f"Key Aspect {i-1}",
                "content_type": "content",
                "key_points": [f"Point A about aspect {i-1}", f"Point B about aspect {i-1}"]
            })
        
        outline.append({
            "slide_number": num_slides,
            "title": "Thank You",
            "content_type": "closing",
            "key_points": ["Summary", "Call to action"]
        })
        
        return outline
    
    def generate_qa_predictions(self, presentation_title: str, 
                                 slides_content: List[str]) -> List[Dict]:
        """Predict likely Q&A questions"""
        
        if not self.mistral_client:
            return [{"question": "Can you tell us more?", "answer": "Certainly!"}]
        
        try:
            content_summary = '\n'.join(slides_content[:3])  # First 3 slides
            
            prompt = f"""Based on this presentation, predict 3 likely audience questions and provide brief answers.

Presentation: {presentation_title}
Content summary:
{content_summary}

Return JSON array with objects containing 'question' and 'answer'.

Predicted Q&A:"""
            
            response = self.mistral_client.chat.complete(
                model="mistral-tiny",
                messages=[{"role": "user", "content": prompt}]
            )
            
            content = response.choices[0].message.content
            
            # Extract JSON
            json_match = re.search(r'\[.*\]', content, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            
            return [{"question": "Can you tell us more?", "answer": "Certainly!"}]
            
        except Exception as e:
            return [{"question": "Can you tell us more?", "answer": "Certainly!"}]
