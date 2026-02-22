from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List
import os
import uuid
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import json
import re
from mistralai import Mistral

app = FastAPI(title="PPT SaaS API", version="2.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
UPLOAD_DIR = "uploads"
TEMPLATE_DIR = "templates"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMPLATE_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Configure Mistral API
MISTRAL_API_KEY = "sztcTEpBuK6tjxaWkkvXjp7sUQgofXAd"
mistral_client = Mistral(api_key=MISTRAL_API_KEY)

# Models
class SlideContent(BaseModel):
    id: Optional[str] = None
    title: str
    content: str
    layout: Optional[str] = "title_and_content"
    order: Optional[int] = 0

class SlideUpdate(BaseModel):
    id: str
    title: Optional[str] = None
    content: Optional[str] = None
    order: Optional[int] = None

class PPTRequest(BaseModel):
    title: str
    slides: List[SlideContent]
    template_id: Optional[str] = None
    theme: Optional[str] = "default"

class PPTUpdateRequest(BaseModel):
    title: Optional[str] = None
    slides: Optional[List[SlideUpdate]] = None

class AIGenerateRequest(BaseModel):
    prompt: str
    num_slides: Optional[int] = 5
    template_id: Optional[str] = None
    theme: Optional[str] = "default"

class TemplateInfo(BaseModel):
    id: str
    name: str
    description: Optional[str] = ""
    thumbnail: Optional[str] = None

# Helper functions
def generate_ppt_from_template(request: PPTRequest, template_path: str = None, output_id: str = None):
    """Generate PPT from template or create new"""
    if template_path and os.path.exists(template_path):
        prs = Presentation(template_path)
    else:
        prs = Presentation()
    
    # Clear existing slides if using template
    if template_path:
        while len(prs.slides) > 0:
            rId = prs.slides._sldIdLst[0].rId
            prs.part.drop_rel(rId)
            del prs.slides._sldIdLst[0]
    
    # Sort slides by order
    sorted_slides = sorted(request.slides, key=lambda x: x.order or 0)
    
    # Add slides
    for slide_data in sorted_slides:
        slide_layout = prs.slide_layouts[1]  # Title and Content
        slide = prs.slides.add_slide(slide_layout)
        
        # Set title
        if slide.shapes.title:
            slide.shapes.title.text = slide_data.title
        
        # Set content
        if len(slide.placeholders) > 1:
            body_shape = slide.placeholders[1]
            tf = body_shape.text_frame
            tf.text = slide_data.content
    
    # Save
    if not output_id:
        output_id = str(uuid.uuid4())
    output_path = os.path.join(OUTPUT_DIR, f"{output_id}.pptx")
    prs.save(output_path)
    
    # Save metadata for editing
    metadata = {
        "id": output_id,
        "title": request.title,
        "slides": [{"id": s.id or str(uuid.uuid4()), "title": s.title, "content": s.content, "order": s.order or i} for i, s in enumerate(sorted_slides)],
        "template_id": request.template_id,
        "theme": request.theme
    }
    with open(os.path.join(OUTPUT_DIR, f"{output_id}.json"), "w") as f:
        json.dump(metadata, f)
    
    return output_path, output_id

def extract_json_from_text(text: str):
    """Extract JSON object from text"""
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    text = text.strip()
    
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if match:
        return match.group(0)
    return text

def generate_ppt_content_with_ai(prompt: str, num_slides: int = 5):
    """Use Mistral AI to generate PPT content"""
    try:
        system_prompt = f"""You are a professional presentation creator. Create a PowerPoint presentation about the user's topic.

Create exactly {num_slides} slides. You must respond with ONLY a valid JSON object in this exact format (no markdown, no explanation, just raw JSON):

{{"title": "Presentation Title", "slides": [{{"title": "Slide 1 Title", "content": "Bullet point 1\\nBullet point 2\\nBullet point 3"}}, {{"title": "Slide 2 Title", "content": "Content here"}}]}}

Rules:
- Return ONLY the JSON object, nothing else
- Use \\n for newlines in content
- Make content professional and engaging
- Each slide should have 3-5 bullet points"""

        response = mistral_client.chat.complete(
            model="mistral-tiny",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Create a presentation about: {prompt}"}
            ]
        )
        
        response_text = response.choices[0].message.content.strip()
        json_text = extract_json_from_text(response_text)
        
        ppt_data = json.loads(json_text)
        
        if "title" not in ppt_data or "slides" not in ppt_data:
            raise ValueError("Invalid response structure from AI")
        
        if not isinstance(ppt_data["slides"], list):
            raise ValueError("Slides must be a list")
        
        slides = []
        for i, slide in enumerate(ppt_data["slides"]):
            content = slide.get("content", "")
            content = content.replace("\\n", "\n")
            slides.append(SlideContent(
                id=str(uuid.uuid4()),
                title=slide.get("title", "Untitled"),
                content=content,
                layout=slide.get("layout", "title_and_content"),
                order=i
            ))
        
        return PPTRequest(
            title=ppt_data["title"],
            slides=slides,
            theme="default"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

def generate_mock_ai_content(prompt: str, num_slides: int = 5):
    """Generate mock AI content when API fails"""
    topic = prompt.lower()
    
    if "healthcare" in topic or "medical" in topic or "health" in topic:
        title = "AI in Healthcare: Transforming Patient Care"
        slides_data = [
            ("Introduction", "• Artificial Intelligence is revolutionizing healthcare\n• From diagnosis to treatment planning\n• Improving patient outcomes and efficiency"),
            ("Diagnostic Accuracy", "• AI algorithms detect diseases with high precision\n• Early detection of cancer, diabetes, and heart conditions\n• Reducing human error in medical imaging"),
            ("Personalized Treatment", "• Tailored treatment plans based on patient data\n• Predictive analytics for disease progression\n• Optimizing medication dosages"),
            ("Operational Efficiency", "• Automated administrative tasks\n• Streamlined patient scheduling\n• Reduced wait times and costs"),
            ("Future Outlook", "• Continued integration of AI in healthcare\n• Ethical considerations and data privacy\n• Collaboration between AI and healthcare professionals")
        ]
    elif "business" in topic or "marketing" in topic or "sales" in topic:
        title = "Strategic Business Growth"
        slides_data = [
            ("Executive Summary", "• Overview of business growth strategies\n• Market analysis and opportunities\n• Key performance indicators"),
            ("Market Analysis", "• Current market trends\n• Competitor landscape\n• Target audience demographics"),
            ("Growth Strategies", "• Product diversification\n• Market expansion opportunities\n• Strategic partnerships"),
            ("Implementation Plan", "• Timeline and milestones\n• Resource allocation\n• Risk mitigation strategies"),
            ("Expected Outcomes", "• Revenue projections\n• Market share growth\n• Long-term sustainability")
        ]
    elif "technology" in topic or "tech" in topic or "digital" in topic:
        title = "Digital Transformation"
        slides_data = [
            ("The Digital Era", "• Rapid technological advancement\n• Impact on industries and society\n• Opportunities and challenges"),
            ("Key Technologies", "• Artificial Intelligence and Machine Learning\n• Cloud Computing and IoT\n• Blockchain and Cybersecurity"),
            ("Transformation Benefits", "• Increased efficiency and productivity\n• Enhanced customer experiences\n• Data-driven decision making"),
            ("Implementation Challenges", "• Legacy system integration\n• Workforce training and adaptation\n• Security and privacy concerns"),
            ("Roadmap Forward", "• Strategic technology adoption\n• Continuous innovation\n• Building digital capabilities")
        ]
    elif "renewable" in topic or "energy" in topic or "solar" in topic or "wind" in topic:
        title = "Renewable Energy: Powering a Sustainable Future"
        slides_data = [
            ("Introduction to Renewable Energy", "• Clean, sustainable energy sources\n• Solar, wind, hydro, and geothermal power\n• Reducing carbon footprint and climate impact"),
            ("Solar Energy", "• Abundant and freely available\n• Declining costs of solar panels\n• Residential and commercial applications"),
            ("Wind Power", "• Highly efficient energy generation\n• Onshore and offshore wind farms\n• Minimal environmental impact"),
            ("Economic Benefits", "• Job creation in green energy sector\n• Energy independence and security\n• Long-term cost savings"),
            ("Future of Clean Energy", "• Technological advancements\n• Government incentives and policies\n• Global transition to renewables")
        ]
    else:
        title = f"Presentation: {prompt[:50]}"
        slides_data = [
            ("Introduction", f"• Overview of {prompt}\n• Key concepts and definitions\n• Importance and relevance"),
            ("Background", "• Historical context\n• Current state of the field\n• Key stakeholders involved"),
            ("Main Points", "• Critical analysis of the topic\n• Supporting evidence and data\n• Case studies and examples"),
            ("Challenges & Solutions", "• Identified challenges\n• Proposed solutions\n• Best practices"),
            ("Conclusion", "• Summary of key points\n• Recommendations\n• Next steps and future outlook")
        ]
    
    while len(slides_data) < num_slides:
        slides_data.append((f"Additional Point {len(slides_data) - 4}", "• Supporting information\n• Additional context\n• Related considerations"))
    
    slides_data = slides_data[:num_slides]
    
    slides = []
    for i, (slide_title, content) in enumerate(slides_data):
        slides.append(SlideContent(
            id=str(uuid.uuid4()),
            title=slide_title,
            content=content,
            order=i
        ))
    
    return PPTRequest(title=title, slides=slides, theme="default")

# Routes
@app.get("/")
def read_root():
    return {"message": "PPT SaaS API", "version": "2.0.0"}

@app.post("/api/ppt/generate")
async def generate_ppt(request: PPTRequest):
    """Generate PPT from prompt/content"""
    try:
        template_path = None
        if request.template_id:
            template_path = os.path.join(TEMPLATE_DIR, f"{request.template_id}.pptx")
        
        output_path, output_id = generate_ppt_from_template(request, template_path)
        
        return {
            "success": True,
            "ppt_id": output_id,
            "download_url": f"/api/ppt/download/{output_id}",
            "message": "PPT generated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ppt/generate-ai")
async def generate_ppt_with_ai(request: AIGenerateRequest):
    """Generate PPT using AI (Mistral)"""
    try:
        try:
            ppt_request = generate_ppt_content_with_ai(request.prompt, request.num_slides)
            ai_used = True
        except Exception as e:
            ppt_request = generate_mock_ai_content(request.prompt, request.num_slides)
            ai_used = False
        
        template_path = None
        if request.template_id:
            template_path = os.path.join(TEMPLATE_DIR, f"{request.template_id}.pptx")
        ppt_request.template_id = request.template_id
        
        output_path, output_id = generate_ppt_from_template(ppt_request, template_path)
        
        # Load metadata for response
        metadata_path = os.path.join(OUTPUT_DIR, f"{output_id}.json")
        with open(metadata_path, "r") as f:
            metadata = json.load(f)
        
        return {
            "success": True,
            "ppt_id": output_id,
            "download_url": f"/api/ppt/download/{output_id}",
            "title": ppt_request.title,
            "slides_count": len(ppt_request.slides),
            "ai_generated": ai_used,
            "slides": metadata["slides"],
            "message": "PPT generated successfully with Mistral AI" if ai_used else "PPT generated (AI fallback - using smart templates)"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ppt/{ppt_id}")
async def get_ppt(ppt_id: str):
    """Get PPT metadata for editing"""
    metadata_path = os.path.join(OUTPUT_DIR, f"{ppt_id}.json")
    if not os.path.exists(metadata_path):
        raise HTTPException(status_code=404, detail="PPT not found")
    
    with open(metadata_path, "r") as f:
        metadata = json.load(f)
    
    return metadata

@app.put("/api/ppt/{ppt_id}")
async def update_ppt(ppt_id: str, request: PPTUpdateRequest):
    """Update PPT slides"""
    try:
        metadata_path = os.path.join(OUTPUT_DIR, f"{ppt_id}.json")
        if not os.path.exists(metadata_path):
            raise HTTPException(status_code=404, detail="PPT not found")
        
        with open(metadata_path, "r") as f:
            metadata = json.load(f)
        
        # Update title if provided
        if request.title:
            metadata["title"] = request.title
        
        # Update slides if provided
        if request.slides:
            slides_dict = {s["id"]: s for s in metadata["slides"]}
            for update in request.slides:
                if update.id in slides_dict:
                    if update.title is not None:
                        slides_dict[update.id]["title"] = update.title
                    if update.content is not None:
                        slides_dict[update.id]["content"] = update.content
                    if update.order is not None:
                        slides_dict[update.id]["order"] = update.order
            
            # Convert back to list and sort by order
            metadata["slides"] = sorted(slides_dict.values(), key=lambda x: x.get("order", 0))
        
        # Save updated metadata
        with open(metadata_path, "w") as f:
            json.dump(metadata, f)
        
        # Regenerate PPT file
        ppt_request = PPTRequest(
            title=metadata["title"],
            slides=[SlideContent(**s) for s in metadata["slides"]],
            template_id=metadata.get("template_id"),
            theme=metadata.get("theme", "default")
        )
        
        template_path = None
        if ppt_request.template_id:
            template_path = os.path.join(TEMPLATE_DIR, f"{ppt_request.template_id}.pptx")
        
        output_path, _ = generate_ppt_from_template(ppt_request, template_path, ppt_id)
        
        return {
            "success": True,
            "ppt_id": ppt_id,
            "download_url": f"/api/ppt/download/{ppt_id}",
            "title": metadata["title"],
            "slides": metadata["slides"],
            "message": "PPT updated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/ppt/{ppt_id}")
async def delete_ppt(ppt_id: str):
    """Delete a PPT"""
    try:
        ppt_path = os.path.join(OUTPUT_DIR, f"{ppt_id}.pptx")
        metadata_path = os.path.join(OUTPUT_DIR, f"{ppt_id}.json")
        
        if os.path.exists(ppt_path):
            os.remove(ppt_path)
        if os.path.exists(metadata_path):
            os.remove(metadata_path)
        
        return {"success": True, "message": "PPT deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ppt/download/{ppt_id}")
async def download_ppt(ppt_id: str):
    """Download generated PPT"""
    file_path = os.path.join(OUTPUT_DIR, f"{ppt_id}.pptx")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="PPT not found")
    
    return FileResponse(
        file_path,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        filename=f"presentation_{ppt_id}.pptx"
    )

@app.get("/api/ppt/list")
async def list_ppts():
    """List all generated PPTs"""
    ppts = []
    for filename in os.listdir(OUTPUT_DIR):
        if filename.endswith(".json"):
            with open(os.path.join(OUTPUT_DIR, filename), "r") as f:
                data = json.load(f)
                ppts.append({
                    "id": data["id"],
                    "title": data["title"],
                    "slides_count": len(data["slides"]),
                    "created": os.path.getctime(os.path.join(OUTPUT_DIR, filename))
                })
    return sorted(ppts, key=lambda x: x["created"], reverse=True)

@app.post("/api/templates/upload")
async def upload_template(
    file: UploadFile = File(...),
    name: str = "",
    description: str = ""
):
    """Upload a PPT template"""
    try:
        template_id = str(uuid.uuid4())
        file_path = os.path.join(TEMPLATE_DIR, f"{template_id}.pptx")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        metadata = {
            "id": template_id,
            "name": name or file.filename,
            "description": description,
            "filename": file.filename
        }
        
        with open(os.path.join(TEMPLATE_DIR, f"{template_id}.json"), "w") as f:
            json.dump(metadata, f)
        
        return {
            "success": True,
            "template_id": template_id,
            "message": "Template uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/templates", response_model=List[TemplateInfo])
async def list_templates():
    """List all available templates"""
    templates = []
    
    for filename in os.listdir(TEMPLATE_DIR):
        if filename.endswith(".json"):
            with open(os.path.join(TEMPLATE_DIR, filename), "r") as f:
                data = json.load(f)
                templates.append(TemplateInfo(**data))
    
    return templates

@app.get("/api/templates/{template_id}")
async def get_template(template_id: str):
    """Get template details"""
    metadata_path = os.path.join(TEMPLATE_DIR, f"{template_id}.json")
    
    if not os.path.exists(metadata_path):
        raise HTTPException(status_code=404, detail="Template not found")
    
    with open(metadata_path, "r") as f:
        return json.load(f)

@app.delete("/api/templates/{template_id}")
async def delete_template(template_id: str):
    """Delete a template"""
    try:
        ppt_path = os.path.join(TEMPLATE_DIR, f"{template_id}.pptx")
        if os.path.exists(ppt_path):
            os.remove(ppt_path)
        
        json_path = os.path.join(TEMPLATE_DIR, f"{template_id}.json")
        if os.path.exists(json_path):
            os.remove(json_path)
        
        return {"success": True, "message": "Template deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
