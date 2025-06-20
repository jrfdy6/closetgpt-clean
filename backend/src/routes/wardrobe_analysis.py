from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from ..services.wardrobe_analysis_service import WardrobeAnalysisService
from ..auth.auth_service import get_current_user_optional
from ..types.profile import UserProfile

router = APIRouter(prefix="/api/wardrobe", tags=["wardrobe-analysis"])

@router.get("/gaps")
async def get_wardrobe_gaps(current_user: UserProfile = Depends(get_current_user_optional)) -> Dict[str, Any]:
    """
    Get comprehensive wardrobe gap analysis for the current user.
    
    This endpoint analyzes the user's wardrobe and identifies:
    - Missing essential items
    - Gaps in occasion coverage
    - Style diversity issues
    - Validation error patterns
    - Outfit generation failures
    
    Returns detailed analysis with prioritized recommendations.
    """
    try:
        if not current_user:
            raise HTTPException(status_code=400, detail="User not found")
            
        analysis_service = WardrobeAnalysisService()
        analysis = await analysis_service.get_wardrobe_gaps(current_user.id)
        
        return {
            "success": True,
            "data": analysis,
            "message": "Wardrobe gap analysis completed successfully"
        }
    except Exception as e:
        print(f"Error in wardrobe gap analysis: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze wardrobe gaps"
        )

@router.get("/coverage")
async def get_wardrobe_coverage(current_user: UserProfile = Depends(get_current_user_optional)) -> Dict[str, Any]:
    """
    Get wardrobe coverage metrics for the current user.
    
    Returns coverage percentages for:
    - Essential items
    - Occasion types
    - Style categories
    - Seasonal coverage
    """
    try:
        if not current_user:
            raise HTTPException(status_code=400, detail="User not found")
            
        analysis_service = WardrobeAnalysisService()
        analysis = await analysis_service.get_wardrobe_gaps(current_user.id)
        
        return {
            "success": True,
            "data": {
                "coverage": analysis["coverage"],
                "total_items": len(analysis.get("gaps", [])),
                "high_priority_gaps": len([g for g in analysis.get("gaps", []) if g["severity"] == "high"]),
                "medium_priority_gaps": len([g for g in analysis.get("gaps", []) if g["severity"] == "medium"]),
                "low_priority_gaps": len([g for g in analysis.get("gaps", []) if g["severity"] == "low"])
            },
            "message": "Wardrobe coverage analysis completed successfully"
        }
    except Exception as e:
        print(f"Error in wardrobe coverage analysis: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze wardrobe coverage"
        )

@router.get("/recommendations")
async def get_wardrobe_recommendations(current_user: UserProfile = Depends(get_current_user_optional)) -> Dict[str, Any]:
    """
    Get personalized wardrobe recommendations for the current user.
    
    Returns:
    - Smart recommendations based on current wardrobe
    - Suggested items to add
    - Style and occasion improvements
    """
    try:
        if not current_user:
            raise HTTPException(status_code=400, detail="User not found")
            
        analysis_service = WardrobeAnalysisService()
        analysis = await analysis_service.get_wardrobe_gaps(current_user.id)
        
        # Extract high-priority recommendations
        high_priority_gaps = [g for g in analysis.get("gaps", []) if g["severity"] == "high"]
        suggested_items = []
        
        for gap in high_priority_gaps[:5]:  # Top 5 high-priority gaps
            suggested_items.extend(gap.get("suggestedItems", []))
        
        # Remove duplicates
        suggested_items = list(set(suggested_items))
        
        return {
            "success": True,
            "data": {
                "recommendations": analysis.get("recommendations", []),
                "suggested_items": suggested_items,
                "priority_gaps": high_priority_gaps[:3],  # Top 3 gaps
                "total_gaps": len(analysis.get("gaps", []))
            },
            "message": "Wardrobe recommendations generated successfully"
        }
    except Exception as e:
        print(f"Error in wardrobe recommendations: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to generate wardrobe recommendations"
        )

@router.get("/validation-errors")
async def get_validation_errors(current_user: UserProfile = Depends(get_current_user_optional)) -> Dict[str, Any]:
    """
    Get validation errors and outfit generation failures for the current user.
    
    Returns:
    - Recent validation errors
    - Outfit generation failures
    - Error patterns and trends
    """
    try:
        if not current_user:
            raise HTTPException(status_code=400, detail="User not found")
            
        analysis_service = WardrobeAnalysisService()
        validation_errors = await analysis_service._get_validation_errors(current_user.id)
        outfit_history = await analysis_service._get_outfit_history(current_user.id)
        
        # Analyze error patterns
        error_patterns = analysis_service._analyze_error_patterns(validation_errors, outfit_history)
        
        return {
            "success": True,
            "data": {
                "validation_errors": validation_errors,
                "outfit_failures": [outfit for outfit in outfit_history if not outfit.get("success", True)],
                "error_patterns": error_patterns,
                "total_errors": len(validation_errors),
                "failure_rate": len([o for o in outfit_history if not o.get("success", True)]) / max(len(outfit_history), 1) * 100
            },
            "message": "Validation error analysis completed successfully"
        }
    except Exception as e:
        print(f"Error in validation error analysis: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze validation errors"
        )

@router.get("/trending-styles")
async def get_trending_styles() -> Dict[str, Any]:
    """
    Get current trending styles and fashion trends.
    
    Returns:
    - Trending style names and descriptions
    - Popularity scores
    - Key items for each trend
    - Color palettes
    """
    try:
        analysis_service = WardrobeAnalysisService()
        trending_styles = await analysis_service._get_trending_styles()
        
        return {
            "success": True,
            "data": {
                "trending_styles": trending_styles,
                "total_trends": len(trending_styles),
                "most_popular": max(trending_styles, key=lambda x: x["popularity"]) if trending_styles else None
            },
            "message": "Trending styles retrieved successfully"
        }
    except Exception as e:
        print(f"Error getting trending styles: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get trending styles"
        )

@router.get("/wardrobe-stats")
async def get_wardrobe_stats(current_user: UserProfile = Depends(get_current_user_optional)) -> Dict[str, Any]:
    """
    Get comprehensive wardrobe statistics for the current user.
    
    Returns:
    - Item type distribution
    - Color analysis
    - Style breakdown
    - Seasonal coverage
    - Brand preferences
    - Price analysis
    """
    try:
        if not current_user:
            raise HTTPException(status_code=400, detail="User not found")
            
        analysis_service = WardrobeAnalysisService()
        wardrobe = await analysis_service._get_user_wardrobe(current_user.id)
        stats = analysis_service._get_wardrobe_stats(wardrobe)
        
        return {
            "success": True,
            "data": stats,
            "message": "Wardrobe statistics retrieved successfully"
        }
    except Exception as e:
        print(f"Error getting wardrobe stats: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get wardrobe statistics"
        ) 