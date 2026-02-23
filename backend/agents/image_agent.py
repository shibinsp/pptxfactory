"""
Image Research Agent - Finds and suggests relevant images
"""

import requests
import json
from typing import Dict, List, Optional
from urllib.parse import quote


class ImageResearchAgent:
    """
    Research and suggest images for presentations
    Supports: Unsplash, Pexels, AI generation
    """
    
    def __init__(self, unsplash_key: str = None, pexels_key: str = None):
        self.unsplash_key = unsplash_key
        self.pexels_key = pexels_key
        self.unsplash_url = "https://api.unsplash.com"
        self.pexels_url = "https://api.pexels.com/v1"
    
    def search_images(self, query: str, count: int = 5, 
                      orientation: str = 'landscape') -> List[Dict]:
        """
        Search for images based on query
        
        Returns:
            List of image objects with url, attribution, etc.
        """
        results = []
        
        # Try Unsplash first
        if self.unsplash_key:
            unsplash_results = self._search_unsplash(query, count, orientation)
            results.extend(unsplash_results)
        
        # Try Pexels if needed
        if len(results) < count and self.pexels_key:
            pexels_results = self._search_pexels(query, count - len(results), orientation)
            results.extend(pexels_results)
        
        return results[:count]
    
    def _search_unsplash(self, query: str, count: int, orientation: str) -> List[Dict]:
        """Search Unsplash API"""
        try:
            headers = {"Authorization": f"Client-ID {self.unsplash_key}"}
            params = {
                "query": query,
                "per_page": count,
                "orientation": orientation
            }
            
            response = requests.get(
                f"{self.unsplash_url}/search/photos",
                headers=headers,
                params=params,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                return [
                    {
                        "id": img['id'],
                        "url": img['urls']['regular'],
                        "thumb": img['urls']['small'],
                        "source": "unsplash",
                        "author": img['user']['name'],
                        "author_url": img['user']['links']['html'],
                        "description": img.get('description', ''),
                        "width": img['width'],
                        "height": img['height']
                    }
                    for img in data.get('results', [])
                ]
        except Exception as e:
            print(f"Unsplash search error: {e}")
        
        return []
    
    def _search_pexels(self, query: str, count: int, orientation: str) -> List[Dict]:
        """Search Pexels API"""
        try:
            headers = {"Authorization": self.pexels_key}
            params = {
                "query": query,
                "per_page": count,
                "orientation": orientation
            }
            
            response = requests.get(
                f"{self.pexels_url}/search",
                headers=headers,
                params=params,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                return [
                    {
                        "id": f"pexels_{img['id']}",
                        "url": img['src']['large'],
                        "thumb": img['src']['medium'],
                        "source": "pexels",
                        "author": img['photographer'],
                        "author_url": img['photographer_url'],
                        "description": img.get('alt', ''),
                        "width": img['width'],
                        "height": img['height']
                    }
                    for img in data.get('photos', [])
                ]
        except Exception as e:
            print(f"Pexels search error: {e}")
        
        return []
    
    def suggest_images_for_slide(self, slide_title: str, slide_content: str,
                                  count: int = 3) -> List[Dict]:
        """Suggest relevant images for a slide"""
        
        # Create search query from slide content
        keywords = self._extract_keywords(slide_title, slide_content)
        query = " ".join(keywords[:3])  # Use top 3 keywords
        
        return self.search_images(query, count)
    
    def _extract_keywords(self, title: str, content: str) -> List[str]:
        """Extract relevant keywords from slide content"""
        combined = f"{title} {content}".lower()
        
        # Remove common words
        stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with'}
        words = [w for w in combined.split() if w not in stop_words and len(w) > 2]
        
        # Return unique words
        return list(dict.fromkeys(words))
    
    def get_placeholder_suggestions(self, slide_type: str) -> List[Dict]:
        """Get image suggestions based on slide type"""
        suggestions = {
            'title': [
                {'query': 'abstract background modern', 'description': 'Modern abstract background'},
                {'query': 'business professional office', 'description': 'Professional setting'},
                {'query': 'technology digital futuristic', 'description': 'Tech-inspired background'}
            ],
            'content': [
                {'query': 'business team meeting', 'description': 'Team collaboration'},
                {'query': 'data analytics chart', 'description': 'Data visualization'},
                {'query': 'innovation lightbulb', 'description': 'Innovation concept'}
            ],
            'section': [
                {'query': 'transition gradient abstract', 'description': 'Section divider'},
                {'query': 'minimal geometric pattern', 'description': 'Clean transition'}
            ],
            'closing': [
                {'query': 'success celebration business', 'description': 'Success imagery'},
                {'query': 'thank you calligraphy', 'description': 'Appreciation theme'}
            ]
        }
        
        return suggestions.get(slide_type, suggestions['content'])
    
    def generate_ai_image_prompt(self, slide_title: str, slide_content: str,
                                  style: str = 'professional') -> str:
        """Generate a prompt for AI image generation"""
        
        base_prompt = f"Professional presentation image about: {slide_title}. "
        
        style_modifiers = {
            'professional': 'clean, corporate, business style, high quality',
            'creative': 'artistic, colorful, innovative design',
            'minimal': 'minimalist, simple, clean lines, white background',
            'tech': 'futuristic, digital, technology, modern',
            'abstract': 'abstract, geometric, modern art style'
        }
        
        modifier = style_modifiers.get(style, style_modifiers['professional'])
        
        return f"{base_prompt}{modifier}. No text, suitable for business presentation."
