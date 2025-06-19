from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from openai import OpenAI
import os
import logging
from dotenv import load_dotenv
import requests
from io import BytesIO
from PIL import Image
import pillow_heif
import tempfile
import mimetypes
import base64
import json
from ..services.openai_service import analyze_image_with_gpt4
from ..services.enhanced_image_analysis_service import enhanced_analyzer
from ..services.style_analysis_service import style_analyzer
from typing import List

# Set up logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api", tags=["image-analysis"])

class ImageAnalysisRequest(BaseModel):
    image: dict[str, str]

def convert_to_jpeg(image_url: str) -> str:
    """Convert image to JPEG format for analysis"""
    try:
        # Download the image
        response = requests.get(image_url)
        response.raise_for_status()
        
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            # Check if it's a HEIC image
            if image_url.lower().endswith('.heic'):
                try:
                    heif_file = pillow_heif.read_heif(response.content)
                    image = Image.frombytes(
                        heif_file.mode,
                        heif_file.size,
                        heif_file.data,
                        "raw",
                    )
                    image.save(temp_file.name, "JPEG")
                except Exception as e:
                    logger.warning(f"Failed to convert HEIC: {str(e)}")
                    # Fallback: save as is
                    temp_file.write(response.content)
            else:
                # For other formats, try to convert to JPEG
                try:
                    image = Image.open(BytesIO(response.content))
                    if image.mode != 'RGB':
                        image = image.convert('RGB')
                    image.save(temp_file.name, "JPEG")
                except Exception as e:
                    logger.warning(f"Failed to convert image: {str(e)}")
                    # Fallback: save as is
                    temp_file.write(response.content)
            
            return temp_file.name
            
    except Exception as e:
        logger.error(f"Error converting image: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to process image: {str(e)}")

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Enhanced image analysis using both GPT-4 Vision and CLIP style analysis
    """
    try:
        # Create a temporary file to store the uploaded image
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        # Convert HEIC to JPEG if necessary
        if file.filename.lower().endswith('.heic'):
            try:
                heif_file = pillow_heif.read_heif(temp_file_path)
                image = Image.frombytes(
                    heif_file.mode,
                    heif_file.size,
                    heif_file.data,
                    "raw",
                )
                # Create a new temporary file for the JPEG
                jpeg_path = temp_file_path.replace('.heic', '.jpg')
                image.save(jpeg_path, "JPEG")
                # Update the path to use the JPEG file
                os.unlink(temp_file_path)
                temp_file_path = jpeg_path
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Failed to convert HEIC image: {str(e)}")

        # Process the image for analysis
        processed_image = process_image_for_analysis(temp_file_path)
        
        # Use enhanced analysis (GPT-4 + CLIP)
        logger.info("Starting enhanced analysis with GPT-4 Vision and CLIP")
        analysis = await enhanced_analyzer.analyze_clothing_item(processed_image)
        
        # Clean up temporary files
        os.unlink(temp_file_path)
        if processed_image != temp_file_path:
            try:
                os.unlink(processed_image)
            except:
                pass
        
        return {"analysis": analysis}
    except Exception as e:
        # Clean up temporary files in case of error
        if 'temp_file_path' in locals():
            try:
                os.unlink(temp_file_path)
            except:
                pass
        if 'processed_image' in locals() and processed_image != temp_file_path:
            try:
                os.unlink(processed_image)
            except:
                pass
        logger.error(f"Enhanced analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-image")
async def analyze_single_image(image: dict):
    """
    Enhanced single image analysis using GPT-4 Vision + CLIP
    """
    try:
        image_url = image.get("url")
        if not image_url:
            raise HTTPException(status_code=400, detail="Image URL is required")
        
        # Download image to temporary file
        response = requests.get(image_url)
        response.raise_for_status()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(response.content)
            temp_path = temp_file.name
        
        try:
            # Use enhanced analysis (GPT-4 + CLIP)
            analysis = await enhanced_analyzer.analyze_clothing_item(temp_path)
            return {"analysis": analysis}
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-image-legacy")
async def analyze_single_image_legacy(image: dict):
    """
    Legacy single image analysis using only GPT-4 Vision
    """
    try:
        image_url = image.get("url")
        if not image_url:
            raise HTTPException(status_code=400, detail="Image URL is required")
        
        # Download image to temporary file
        response = requests.get(image_url)
        response.raise_for_status()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(response.content)
            temp_path = temp_file.name
        
        try:
            # Use legacy analysis (GPT-4 only)
            analysis = await analyze_image_with_gpt4(temp_path)
            return {"analysis": analysis}
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-image-clip-only")
async def analyze_single_image_clip_only(image: dict):
    """
    CLIP-only image analysis for style insights
    """
    try:
        image_url = image.get("url")
        if not image_url:
            raise HTTPException(status_code=400, detail="Image URL is required")
        
        # Download image to temporary file
        response = requests.get(image_url)
        response.raise_for_status()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(response.content)
            temp_path = temp_file.name
        
        try:
            # Use CLIP analysis only
            with Image.open(temp_path) as img:
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                style_matches = style_analyzer.analyze_style(img)
                top_styles = style_analyzer.get_top_styles(img, top_k=5)
                style_breakdown = style_analyzer.get_style_breakdown(img)
                
                analysis = {
                    "clip_style_analysis": {
                        "top_matches": style_matches,
                        "top_5_styles": top_styles,
                        "full_breakdown": style_breakdown,
                        "primary_style": style_matches[0] if style_matches else None,
                        "style_confidence": style_matches[0][1] if style_matches else 0.0
                    }
                }
                
                return {"analysis": analysis}
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-batch")
async def analyze_batch_images(images: List[dict]):
    """
    Enhanced batch image analysis using GPT-4 Vision + CLIP
    """
    try:
        if not images:
            raise HTTPException(status_code=400, detail="Images list is required")
        
        results = []
        
        for i, image_data in enumerate(images):
            try:
                image_url = image_data.get("url")
                if not image_url:
                    results.append({"error": "Image URL is required", "index": i})
                    continue
                
                # Download image to temporary file
                response = requests.get(image_url)
                response.raise_for_status()
                
                with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                    temp_file.write(response.content)
                    temp_path = temp_file.name
                
                try:
                    # Use enhanced analysis
                    analysis = await enhanced_analyzer.analyze_clothing_item(temp_path)
                    results.append({
                        "index": i,
                        "image_url": image_url,
                        "analysis": analysis,
                        "success": True
                    })
                finally:
                    # Clean up temporary file
                    os.unlink(temp_path)
                    
            except Exception as e:
                results.append({
                    "index": i,
                    "image_url": image_data.get("url", "unknown"),
                    "error": str(e),
                    "success": False
                })
        
        return {"results": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-batch-legacy")
async def analyze_batch_images_legacy(images: List[dict]):
    """
    Legacy batch image analysis using only GPT-4 Vision
    """
    try:
        if not images:
            raise HTTPException(status_code=400, detail="Images list is required")
        
        results = []
        
        for i, image_data in enumerate(images):
            try:
                image_url = image_data.get("url")
                if not image_url:
                    results.append({"error": "Image URL is required", "index": i})
                    continue
                
                # Download image to temporary file
                response = requests.get(image_url)
                response.raise_for_status()
                
                with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                    temp_file.write(response.content)
                    temp_path = temp_file.name
                
                try:
                    # Use legacy analysis
                    analysis = await analyze_image_with_gpt4(temp_path)
                    results.append({
                        "index": i,
                        "image_url": image_url,
                        "analysis": analysis,
                        "success": True
                    })
                finally:
                    # Clean up temporary file
                    os.unlink(temp_path)
                    
            except Exception as e:
                results.append({
                    "index": i,
                    "image_url": image_data.get("url", "unknown"),
                    "error": str(e),
                    "success": False
                })
        
        return {"results": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 