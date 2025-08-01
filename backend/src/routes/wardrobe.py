from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from firebase_admin import firestore
import uuid
import time
from datetime import datetime

from ..custom_types.wardrobe import ClothingItem, ClothingType, Color
from ..custom_types.profile import UserProfile
from ..services.metadata_enhancement_service import MetadataEnhancementService
from ..core.logging import get_logger
from ..models.analytics_event import AnalyticsEvent
from ..services.analytics_service import log_analytics_event
from ..auth.auth_service import get_current_user

router = APIRouter(prefix="/api/wardrobe", tags=["wardrobe"])

# Initialize Firestore
db = firestore.client()
metadata_service = MetadataEnhancementService()
logger = get_logger("wardrobe")

@router.post("/add")
async def add_wardrobe_item(
    item_data: Dict[str, Any],
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Add a new wardrobe item for the current user.
    
    Expected fields:
    - name: str
    - type: str (clothing type)
    - color: str
    - style: str or List[str]
    - occasion: str or List[str]
    - season: str or List[str]
    - imageUrl: str (optional)
    """
    try:
        # Validate required fields
        required_fields = ['name', 'type', 'color']
        for field in required_fields:
            if field not in item_data:
                raise HTTPException(status_code=400, detail=f"Missing required field: {field}")
        
        # Create item ID
        item_id = str(uuid.uuid4())
        
        # Prepare item data
        wardrobe_item = {
            "id": item_id,
            "userId": current_user.id,
            "name": item_data["name"],
            "type": item_data["type"],
            "color": item_data["color"],
            "style": item_data.get("style", []),
            "occasion": item_data.get("occasion", []),
            "season": item_data.get("season", ["all"]),
            "imageUrl": item_data.get("imageUrl", ""),
            "dominantColors": [{"name": item_data["color"], "hex": "#000000", "rgb": [0, 0, 0]}],
            "matchingColors": [],
            "tags": item_data.get("tags", []),
            "createdAt": int(time.time()),
            "updatedAt": int(time.time()),
            "metadata": {
                "analysisTimestamp": int(time.time()),
                "originalType": item_data["type"],
                "styleTags": item_data.get("style", []),
                "occasionTags": item_data.get("occasion", []),
                "colorAnalysis": {
                    "dominant": [item_data["color"]],
                    "matching": []
                },
                "visualAttributes": {
                    "pattern": "solid",
                    "formalLevel": "casual",
                    "fit": "regular",
                    "material": "cotton",
                    "fabricWeight": "medium"
                },
                "itemMetadata": {
                    "tags": item_data.get("tags", []),
                    "careInstructions": "Check care label"
                }
            }
        }
        
        # Save to Firestore
        doc_ref = db.collection('wardrobe').document(item_id)
        doc_ref.set(wardrobe_item)
        
        # Log analytics event
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_item_added",
            metadata={
                "item_id": item_id,
                "item_type": item_data["type"],
                "has_image": bool(item_data.get("imageUrl")),
                "style_count": len(item_data.get("style", [])),
                "occasion_count": len(item_data.get("occasion", []))
            }
        )
        log_analytics_event(analytics_event)
        
        logger.info(f"Wardrobe item added: {item_id} for user {current_user.id}")
        
        return {
            "success": True,
            "message": "Wardrobe item added successfully",
            "item": wardrobe_item
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error adding wardrobe item: {e}")
        raise HTTPException(status_code=500, detail=f"Error adding wardrobe item: {str(e)}")

@router.get("/")
async def get_wardrobe_items(
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """Get all wardrobe items for the current user."""
    try:
        # Query Firestore for user's wardrobe items
        docs = db.collection('wardrobe').where('userId', '==', current_user.id).stream()
        
        items = []
        for doc in docs:
            item_data = doc.to_dict()
            item_data['id'] = doc.id
            items.append(item_data)
        
        # Log analytics event
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_items_listed",
            metadata={
                "item_count": len(items),
                "has_items": len(items) > 0
            }
        )
        log_analytics_event(analytics_event)
        
        return {
            "success": True,
            "items": items,
            "count": len(items)
        }
        
    except Exception as e:
        logger.error(f"Error retrieving wardrobe items: {e}")
        raise HTTPException(status_code=500, detail=f"Error retrieving wardrobe items: {str(e)}")

@router.get("/{item_id}")
async def get_wardrobe_item(
    item_id: str,
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Get a specific wardrobe item by ID.
    """
    try:
        doc_ref = db.collection('wardrobe').document(item_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Wardrobe item not found")
        
        item_data = doc.to_dict()
        item_data['id'] = doc.id
        
        # Check if user owns this item
        if item_data.get('userId') != current_user.id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        # Log analytics event
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_item_viewed",
            metadata={
                "item_id": item_id,
                "item_type": item_data.get("type")
            }
        )
        log_analytics_event(analytics_event)
        
        return item_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting wardrobe item: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get wardrobe item"
        )

@router.put("/{item_id}")
async def update_wardrobe_item(
    item_id: str,
    item_data: Dict[str, Any],
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """Update a wardrobe item."""
    try:
        # Check if item exists and belongs to user
        doc_ref = db.collection('wardrobe').document(item_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Wardrobe item not found")
        
        item = doc.to_dict()
        if item.get('userId') != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized to update this item")
        
        # Update item data
        update_data = {
            **item_data,
            "updatedAt": int(time.time())
        }
        
        # Update in Firestore
        doc_ref.update(update_data)
        
        # Log analytics event
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_item_updated",
            metadata={
                "item_id": item_id,
                "updated_fields": list(item_data.keys()),
                "item_type": item.get("type")
            }
        )
        log_analytics_event(analytics_event)
        
        logger.info(f"Wardrobe item updated: {item_id}")
        
        return {
            "success": True,
            "message": "Wardrobe item updated successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating wardrobe item: {e}")
        raise HTTPException(status_code=500, detail=f"Error updating wardrobe item: {str(e)}")

@router.delete("/{item_id}")
async def delete_wardrobe_item(
    item_id: str,
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """Delete a wardrobe item."""
    try:
        # Check if item exists and belongs to user
        doc_ref = db.collection('wardrobe').document(item_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Wardrobe item not found")
        
        item = doc.to_dict()
        if item.get('userId') != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this item")
        
        # Log analytics event before deletion
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_item_deleted",
            metadata={
                "item_id": item_id,
                "item_type": item.get("type"),
                "item_name": item.get("name")
            }
        )
        log_analytics_event(analytics_event)
        
        # Delete from Firestore
        doc_ref.delete()
        
        logger.info(f"Wardrobe item deleted: {item_id}")
        
        return {
            "success": True,
            "message": "Wardrobe item deleted successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting wardrobe item: {e}")
        raise HTTPException(status_code=500, detail=f"Error deleting wardrobe item: {str(e)}")

@router.post("/enhance-metadata")
async def enhance_wardrobe_metadata(
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """Enhance metadata for all user's wardrobe items."""
    try:
        # Get user's wardrobe items
        docs = db.collection('wardrobe').where('userId', '==', current_user.id).stream()
        
        items = []
        for doc in docs:
            item_data = doc.to_dict()
            item_data['id'] = doc.id
            items.append(item_data)
        
        if not items:
            return {
                "success": True,
                "message": "No wardrobe items to enhance",
                "enhanced_count": 0
            }
        
        # Enhance metadata for each item
        enhanced_count = 0
        for item in items:
            try:
                enhanced_metadata = await metadata_service.enhance_item_metadata(item)
                
                # Update item in Firestore
                doc_ref = db.collection('wardrobe').document(item['id'])
                doc_ref.update({
                    'metadata': enhanced_metadata,
                    'updatedAt': int(time.time())
                })
                
                enhanced_count += 1
                
            except Exception as e:
                logger.error(f"Failed to enhance metadata for item {item['id']}: {e}")
                continue
        
        # Log analytics event
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_metadata_enhanced",
            metadata={
                "total_items": len(items),
                "enhanced_count": enhanced_count,
                "success_rate": enhanced_count / len(items) if items else 0
            }
        )
        log_analytics_event(analytics_event)
        
        logger.info(f"Enhanced metadata for {enhanced_count}/{len(items)} items")
        
        return {
            "success": True,
            "message": f"Enhanced metadata for {enhanced_count} items",
            "enhanced_count": enhanced_count,
            "total_items": len(items)
        }
        
    except Exception as e:
        logger.error(f"Error enhancing wardrobe metadata: {e}")
        raise HTTPException(status_code=500, detail=f"Error enhancing metadata: {str(e)}")

@router.post("/{item_id}/increment-wear")
async def increment_wardrobe_item_wear_count(
    item_id: str,
    current_user: UserProfile = Depends(get_current_user)
) -> Dict[str, Any]:
    """Increment the wear count for a specific wardrobe item."""
    try:
        # Check if item exists and belongs to user
        doc_ref = db.collection('wardrobe').document(item_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Wardrobe item not found")
        
        item = doc.to_dict()
        if item.get('userId') != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized to update this item")
        
        # Get current wear count and increment it
        current_wear_count = item.get('wearCount', 0)
        new_wear_count = current_wear_count + 1
        current_timestamp = int(time.time())
        
        # Update wear count and last worn timestamp
        update_data = {
            'wearCount': new_wear_count,
            'lastWorn': current_timestamp,
            'updatedAt': current_timestamp
        }
        
        doc_ref.update(update_data)
        
        # Log analytics event
        analytics_event = AnalyticsEvent(
            user_id=current_user.id,
            event_type="wardrobe_item_wear_incremented",
            metadata={
                "item_id": item_id,
                "item_type": item.get("type"),
                "previous_wear_count": current_wear_count,
                "new_wear_count": new_wear_count
            }
        )
        log_analytics_event(analytics_event)
        
        logger.info(f"Wear count incremented for item {item_id}: {current_wear_count} -> {new_wear_count}")
        
        return {
            "success": True,
            "message": "Wear count incremented successfully",
            "data": {
                "itemId": item_id,
                "previousWearCount": current_wear_count,
                "newWearCount": new_wear_count,
                "lastWorn": current_timestamp
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error incrementing wear count for item {item_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Error incrementing wear count: {str(e)}") 