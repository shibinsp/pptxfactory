from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List
import os
import uuid
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
import json

app = FastAPI(title="PPT SaaS API", version="1.0.0")

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

# Models
class SlideContent(BaseModel):
    title: str
    content: str
    layout: Optional[str] = "title_and_content"

class PPTRequest(BaseModel):
    title: str
    slides: List[SlideContent]
    template_id: Optional[str] = None
    theme: Optional[str] = "default"

class TemplateInfo(BaseModel):
    id: str
    name: str
    description: Optional[str] = ""
    thumbnail: Optional[str] = None

# Helper functions
def generate_ppt_from_template(request: PPTRequest, template_path: str = None):
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
    
    # Add slides
    for slide_data in request.slides:
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
    output_id = str(uuid.uuid4())
    output_path = os.path.join(OUTPUT_DIR, f"{output_id}.pptx")
    prs.save(output_path)
    
    return output_path, output_id

# Routes
@app.get("/")
def read_root():
    return {"message": "PPT SaaS API", "version": "1.0.0"}

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
        
        # Save metadata
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
        # Delete PPT file
        ppt_path = os.path.join(TEMPLATE_DIR, f"{template_id}.pptx")
        if os.path.exists(ppt_path):
            os.remove(ppt_path)
        
        # Delete metadata
        json_path = os.path.join(TEMPLATE_DIR, f"{template_id}.json")
        if os.path.exists(json_path):
            os.remove(json_path)
        
        return {"success": True, "message": "Template deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)