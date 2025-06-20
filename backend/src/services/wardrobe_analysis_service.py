from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from firebase_admin import firestore
from ..types.wardrobe import ClothingItem
from ..types.outfit import OutfitGeneratedOutfit
from ..types.profile import UserProfile

class WardrobeAnalysisService:
    def __init__(self):
        self.db = firestore.client()
    
    async def get_wardrobe_gaps(self, user_id: str) -> Dict[str, Any]:
        """Analyze wardrobe gaps based on outfit generation history and current wardrobe."""
        
        # Get user's wardrobe
        wardrobe = await self._get_user_wardrobe(user_id)
        
        # Get outfit generation history
        outfit_history = await self._get_outfit_history(user_id)
        
        # Get validation errors
        validation_errors = await self._get_validation_errors(user_id)
        
        # Get trending styles
        trending_styles = await self._get_trending_styles()
        
        # Analyze gaps
        gaps = self._analyze_gaps(wardrobe, outfit_history, validation_errors, trending_styles)
        
        # Calculate coverage metrics
        coverage = self._calculate_coverage(wardrobe, gaps)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(wardrobe, gaps, validation_errors, trending_styles)
        
        return {
            "gaps": gaps,
            "coverage": coverage,
            "recommendations": recommendations,
            "trending_styles": trending_styles,
            "wardrobe_stats": self._get_wardrobe_stats(wardrobe),
            "analysis_timestamp": datetime.now().isoformat()
        }
    
    async def _get_user_wardrobe(self, user_id: str) -> List[ClothingItem]:
        """Get user's complete wardrobe from Firestore."""
        try:
            print(f"Getting wardrobe for user ID: {user_id}")
            wardrobe_ref = self.db.collection('wardrobe').where('userId', '==', user_id)
            docs = wardrobe_ref.stream()
            
            wardrobe = []
            doc_count = 0
            for doc in docs:
                doc_count += 1
                item_data = doc.to_dict()
                print(f"Processing doc {doc_count}: {doc.id}")
                print(f"Item data keys: {list(item_data.keys())}")
                print(f"Item type: {item_data.get('type', 'N/A')}")
                print(f"Item brand: {item_data.get('brand', 'N/A')}")
                
                # Convert Firestore timestamp to datetime if needed
                if 'createdAt' in item_data and hasattr(item_data['createdAt'], 'timestamp'):
                    item_data['createdAt'] = item_data['createdAt'].timestamp()
                if 'updatedAt' in item_data and hasattr(item_data['updatedAt'], 'timestamp'):
                    item_data['updatedAt'] = item_data['updatedAt'].timestamp()
                
                try:
                    wardrobe.append(ClothingItem(**item_data))
                except Exception as e:
                    print(f"Error parsing wardrobe item {doc.id}: {e}")
                    # Skip malformed items
                    continue
            
            print(f"Found {len(wardrobe)} wardrobe items for user {user_id}")
            print(f"Total documents processed: {doc_count}")
            
            # Also check if there are any items without userId field
            all_wardrobe_ref = self.db.collection('wardrobe')
            all_docs = all_wardrobe_ref.stream()
            total_items = 0
            for doc in all_docs:
                total_items += 1
                item_data = doc.to_dict()
                if 'userId' not in item_data:
                    print(f"Found item without userId: {doc.id}")
            
            print(f"Total items in wardrobe collection: {total_items}")
            
            return wardrobe
        except Exception as e:
            print(f"Error getting wardrobe: {e}")
            return []
    
    async def _get_outfit_history(self, user_id: str, days: int = 30) -> List[Dict[str, Any]]:
        """Get outfit generation history for the user."""
        try:
            # Get outfits from the last N days
            cutoff_date = datetime.now() - timedelta(days=days)
            
            outfits_ref = self.db.collection('outfits').where('userId', '==', user_id)
            docs = outfits_ref.stream()
            
            history = []
            for doc in docs:
                outfit_data = doc.to_dict()
                
                # Convert timestamp
                if 'createdAt' in outfit_data and hasattr(outfit_data['createdAt'], 'timestamp'):
                    created_at = datetime.fromtimestamp(outfit_data['createdAt'].timestamp())
                    if created_at >= cutoff_date:
                        history.append(outfit_data)
            
            return history
        except Exception as e:
            print(f"Error getting outfit history: {e}")
            return []
    
    async def _get_validation_errors(self, user_id: str, days: int = 30) -> List[Dict[str, Any]]:
        """Get validation errors from outfit generation attempts."""
        try:
            # Get logs that contain validation errors
            cutoff_date = datetime.now() - timedelta(days=days)
            
            logs_ref = self.db.collection('logs').where('userId', '==', user_id)
            docs = logs_ref.stream()
            
            errors = []
            for doc in docs:
                log_data = doc.to_dict()
                
                # Check if this log has validation errors
                if 'validationErrors' in log_data and log_data['validationErrors']:
                    # Convert timestamp
                    if 'timestamp' in log_data and hasattr(log_data['timestamp'], 'timestamp'):
                        log_time = datetime.fromtimestamp(log_data['timestamp'].timestamp())
                        if log_time >= cutoff_date:
                            errors.append(log_data)
            
            return errors
        except Exception as e:
            print(f"Error getting validation errors: {e}")
            return []
    
    async def _get_trending_styles(self) -> List[Dict[str, Any]]:
        """Get trending styles from social media and fashion data."""
        try:
            # For now, we'll use a curated list of trending styles
            # In production, this would come from a fashion API or social media analysis
            trending_styles = [
                {
                    "name": "Coastal Grandmother",
                    "description": "Relaxed, sophisticated beach-inspired style",
                    "popularity": 85,
                    "key_items": ["Linen dresses", "Straw hats", "Boat shoes", "Light cardigans"],
                    "colors": ["Beige", "White", "Navy", "Sage"]
                },
                {
                    "name": "Dark Academia",
                    "description": "Intellectual, vintage-inspired dark aesthetic",
                    "popularity": 78,
                    "key_items": ["Tweed blazers", "Pleated skirts", "Oxford shoes", "Turtlenecks"],
                    "colors": ["Black", "Brown", "Burgundy", "Navy"]
                },
                {
                    "name": "Cottagecore",
                    "description": "Romantic, rural-inspired feminine style",
                    "popularity": 72,
                    "key_items": ["Floral dresses", "Aprons", "Mary Jane shoes", "Puff sleeves"],
                    "colors": ["Pink", "Mint", "Lavender", "Cream"]
                },
                {
                    "name": "Y2K Revival",
                    "description": "Early 2000s nostalgic fashion",
                    "popularity": 68,
                    "key_items": ["Low-rise jeans", "Crop tops", "Platform shoes", "Mini skirts"],
                    "colors": ["Pink", "Purple", "Silver", "Neon"]
                },
                {
                    "name": "Minimalist Luxury",
                    "description": "Clean, high-quality essentials",
                    "popularity": 82,
                    "key_items": ["Cashmere sweaters", "Tailored pants", "Leather bags", "Simple jewelry"],
                    "colors": ["Black", "White", "Beige", "Gray"]
                }
            ]
            return trending_styles
        except Exception as e:
            print(f"Error getting trending styles: {e}")
            return []
    
    def _get_wardrobe_stats(self, wardrobe: List[ClothingItem]) -> Dict[str, Any]:
        """Get comprehensive statistics about the user's wardrobe."""
        if not wardrobe:
            return {
                "total_items": 0,
                "item_types": {},
                "colors": {},
                "styles": {},
                "seasons": {},
                "brands": {},
                "price_range": {"min": 0, "max": 0, "avg": 0}
            }
        
        # Count item types
        item_types = {}
        colors = {}
        styles = {}
        seasons = {}
        brands = {}
        prices = []
        
        for item in wardrobe:
            # Item types
            item_types[item.type] = item_types.get(item.type, 0) + 1
            
            # Colors
            if item.color:
                colors[item.color] = colors.get(item.color, 0) + 1
            
            # Styles
            if item.style:
                for style in item.style:
                    styles[style] = styles.get(style, 0) + 1
            
            # Seasons
            if item.season:
                for season in item.season:
                    seasons[season] = seasons.get(season, 0) + 1
            
            # Brands
            if hasattr(item, 'brand') and item.brand:
                brands[item.brand] = brands.get(item.brand, 0) + 1
            
            # Prices (if available)
            if hasattr(item, 'price') and item.price:
                prices.append(float(item.price))
        
        # Calculate price statistics
        price_stats = {"min": 0, "max": 0, "avg": 0}
        if prices:
            price_stats = {
                "min": min(prices),
                "max": max(prices),
                "avg": sum(prices) / len(prices)
            }
        
        return {
            "total_items": len(wardrobe),
            "item_types": item_types,
            "colors": colors,
            "styles": styles,
            "seasons": seasons,
            "brands": brands,
            "price_range": price_stats
        }
    
    def _analyze_gaps(self, wardrobe: List[ClothingItem], outfit_history: List[Dict], validation_errors: List[Dict], trending_styles: List[Dict]) -> List[Dict[str, Any]]:
        """Analyze wardrobe gaps based on multiple factors."""
        gaps = []
        
        # 1. Essential item gaps
        essential_gaps = self._analyze_essential_items(wardrobe)
        gaps.extend(essential_gaps)
        
        # 2. Occasion-based gaps
        occasion_gaps = self._analyze_occasion_coverage(wardrobe)
        gaps.extend(occasion_gaps)
        
        # 3. Style-based gaps
        style_gaps = self._analyze_style_coverage(wardrobe)
        gaps.extend(style_gaps)
        
        # 4. Trending style gaps
        trending_gaps = self._analyze_trending_style_gaps(wardrobe, trending_styles)
        gaps.extend(trending_gaps)
        
        # 5. Validation error-based gaps
        validation_gaps = self._analyze_validation_errors(validation_errors)
        gaps.extend(validation_gaps)
        
        # 6. Outfit generation failure gaps
        failure_gaps = self._analyze_outfit_failures(outfit_history)
        gaps.extend(failure_gaps)
        
        return gaps
    
    def _analyze_essential_items(self, wardrobe: List[ClothingItem]) -> List[Dict[str, Any]]:
        """Analyze missing essential wardrobe items."""
        gaps = []
        
        item_types = [item.type for item in wardrobe]
        
        essential_requirements = {
            'shirt': {'min': 3, 'name': 'Tops/Shirts', 'priority': 'high'},
            'pants': {'min': 2, 'name': 'Bottoms', 'priority': 'high'},
            'shoes': {'min': 2, 'name': 'Shoes', 'priority': 'high'},
            'jacket': {'min': 1, 'name': 'Outerwear', 'priority': 'medium'},
            'sweater': {'min': 1, 'name': 'Sweaters', 'priority': 'medium'}
        }
        
        for item_type, requirement in essential_requirements.items():
            count = item_types.count(item_type)
            if count < requirement['min']:
                gaps.append({
                    'id': f'essential-{item_type}',
                    'type': 'essential',
                    'category': 'Essentials',
                    'title': f"Missing {requirement['name']}",
                    'description': f"You have {count} {requirement['name'].lower()}, but need at least {requirement['min']} for a complete wardrobe.",
                    'severity': 'high' if count == 0 else 'medium',
                    'suggestedItems': self._get_suggestions_for_type(item_type),
                    'priority': requirement['min'] - count,
                    'data': {
                        'current_count': count,
                        'required_count': requirement['min'],
                        'item_type': item_type
                    }
                })
        
        return gaps
    
    def _analyze_occasion_coverage(self, wardrobe: List[ClothingItem]) -> List[Dict[str, Any]]:
        """Analyze wardrobe coverage for different occasions."""
        gaps = []
        
        occasion_requirements = {
            'casual': {
                'required_types': ['shirt', 'pants', 'shoes'],
                'suggested_styles': ['Casual', 'Comfortable'],
                'priority': 'medium'
            },
            'business': {
                'required_types': ['shirt', 'pants', 'shoes', 'jacket'],
                'suggested_styles': ['Business', 'Professional', 'Business Casual'],
                'priority': 'high'
            },
            'formal': {
                'required_types': ['shirt', 'pants', 'shoes', 'jacket'],
                'suggested_styles': ['Formal', 'Classic'],
                'priority': 'medium'
            }
        }
        
        for occasion, requirements in occasion_requirements.items():
            # Check if user has items for this occasion
            suitable_items = []
            for item in wardrobe:
                if (item.type in requirements['required_types'] and 
                    item.style and 
                    any(style in requirements['suggested_styles'] for style in item.style)):
                    suitable_items.append(item)
            
            if len(suitable_items) < len(requirements['required_types']):
                gaps.append({
                    'id': f'occasion-{occasion}',
                    'type': 'occasion',
                    'category': 'Occasions',
                    'title': f"Limited {occasion} wardrobe",
                    'description': f"You have {len(suitable_items)} suitable items for {occasion} occasions, but need more variety.",
                    'severity': 'high' if len(suitable_items) == 0 else 'medium',
                    'suggestedItems': self._get_suggestions_for_occasion(occasion),
                    'priority': len(requirements['required_types']) - len(suitable_items),
                    'data': {
                        'suitable_items': len(suitable_items),
                        'required_types': requirements['required_types'],
                        'occasion': occasion
                    }
                })
        
        return gaps
    
    def _analyze_style_coverage(self, wardrobe: List[ClothingItem]) -> List[Dict[str, Any]]:
        """Analyze coverage across different styles."""
        gaps = []
        
        # Extract all styles from wardrobe
        all_styles = set()
        for item in wardrobe:
            if item.style:
                all_styles.update(item.style)
        
        popular_styles = ['Casual', 'Business Casual', 'Formal', 'Classic', 'Preppy', 'Minimalist']
        
        for style in popular_styles:
            items_with_style = [item for item in wardrobe if item.style and style in item.style]
            
            if len(items_with_style) < 2:
                gaps.append({
                    'id': f'style-{style.lower().replace(" ", "-")}',
                    'type': 'style',
                    'category': 'Styles',
                    'title': f"Limited {style} items",
                    'description': f"You have {len(items_with_style)} {style.lower()} items. Consider adding more for variety.",
                    'severity': 'high' if len(items_with_style) == 0 else 'medium',
                    'suggestedItems': self._get_suggestions_for_style(style),
                    'priority': 2 - len(items_with_style),
                    'data': {
                        'style': style,
                        'item_count': len(items_with_style),
                        'available_styles': list(all_styles)
                    }
                })
        
        return gaps
    
    def _analyze_validation_errors(self, validation_errors: List[Dict]) -> List[Dict[str, Any]]:
        """Analyze patterns in validation errors to identify gaps."""
        gaps = []
        
        if not validation_errors:
            return gaps
        
        # Count error types
        error_counts = {}
        for error_log in validation_errors:
            errors = error_log.get('validationErrors', [])
            for error in errors:
                error_counts[error] = error_counts.get(error, 0) + 1
        
        # Identify frequent errors
        for error, count in error_counts.items():
            if count >= 2:  # Error occurs frequently
                gaps.append({
                    'id': f'validation-{error.lower().replace(" ", "-")}',
                    'type': 'validation',
                    'category': 'Validation Errors',
                    'title': f"Frequent error: {error}",
                    'description': f"This error occurred {count} times in recent outfit generations.",
                    'severity': 'high' if count >= 5 else 'medium',
                    'suggestedItems': self._get_suggestions_for_validation_error(error),
                    'priority': count,
                    'data': {
                        'error_type': error,
                        'occurrence_count': count,
                        'last_occurrence': validation_errors[-1].get('timestamp', 'unknown')
                    }
                })
        
        return gaps
    
    def _analyze_outfit_failures(self, outfit_history: List[Dict]) -> List[Dict[str, Any]]:
        """Analyze outfit generation failures to identify gaps."""
        gaps = []
        
        if not outfit_history:
            return gaps
        
        # Count failed vs successful outfits
        failed_outfits = [outfit for outfit in outfit_history if not outfit.get('wasSuccessful', True)]
        successful_outfits = [outfit for outfit in outfit_history if outfit.get('wasSuccessful', True)]
        
        failure_rate = len(failed_outfits) / len(outfit_history) if outfit_history else 0
        
        if failure_rate > 0.3:  # More than 30% failure rate
            gaps.append({
                'id': 'outfit-failure-rate',
                'type': 'validation',
                'category': 'Outfit Generation',
                'title': 'High outfit generation failure rate',
                'description': f"{(failure_rate * 100):.1f}% of outfit generation attempts failed. This suggests missing essential items.",
                'severity': 'high' if failure_rate > 0.5 else 'medium',
                'suggestedItems': ['Basic t-shirt', 'Jeans', 'Sneakers', 'Dress shirt', 'Dress pants'],
                'priority': int(failure_rate * 10),
                'data': {
                    'failure_rate': failure_rate,
                    'total_attempts': len(outfit_history),
                    'failed_attempts': len(failed_outfits),
                    'successful_attempts': len(successful_outfits)
                }
            })
        
        return gaps
    
    def _analyze_trending_style_gaps(self, wardrobe: List[ClothingItem], trending_styles: List[Dict]) -> List[Dict[str, Any]]:
        """Analyze gaps in trending styles."""
        gaps = []
        
        for trend in trending_styles:
            trend_name = trend["name"]
            key_items = trend["key_items"]
            trend_colors = trend["colors"]
            
            # Check if user has items that match this trend
            matching_items = []
            for item in wardrobe:
                # Check if item name matches any key items
                item_name_lower = item.name.lower() if hasattr(item, 'name') and item.name else ""
                matches_key_item = any(key_item.lower() in item_name_lower for key_item in key_items)
                
                # Check if item color matches trend colors
                matches_color = item.color in trend_colors if item.color else False
                
                # Check if item style might match trend
                matches_style = False
                if item.style:
                    style_keywords = {
                        "Coastal Grandmother": ["linen", "beach", "relaxed", "sophisticated"],
                        "Dark Academia": ["tweed", "vintage", "intellectual", "dark"],
                        "Cottagecore": ["floral", "romantic", "feminine", "rural"],
                        "Y2K Revival": ["retro", "nostalgic", "bold", "fun"],
                        "Minimalist Luxury": ["minimal", "luxury", "clean", "simple"]
                    }
                    trend_keywords = style_keywords.get(trend_name, [])
                    matches_style = any(keyword in style.lower() for style in item.style for keyword in trend_keywords)
                
                if matches_key_item or matches_color or matches_style:
                    matching_items.append(item)
            
            # If user has less than 2 items matching this trend, it's a gap
            if len(matching_items) < 2:
                gaps.append({
                    'id': f'trending-{trend_name.lower().replace(" ", "-")}',
                    'type': 'trending',
                    'category': 'Trending Styles',
                    'title': f"Limited {trend_name} items",
                    'description': f"You have {len(matching_items)} items that match the trending '{trend_name}' style. This style is {trend['popularity']}% popular right now.",
                    'severity': 'medium' if len(matching_items) == 1 else 'low',
                    'suggestedItems': trend["key_items"],
                    'priority': trend["popularity"] // 10,
                    'data': {
                        'trend_name': trend_name,
                        'trend_popularity': trend["popularity"],
                        'matching_items': len(matching_items),
                        'trend_colors': trend_colors,
                        'key_items': key_items
                    }
                })
        
        return gaps
    
    def _calculate_coverage(self, wardrobe: List[ClothingItem], gaps: List[Dict]) -> Dict[str, int]:
        """Calculate coverage percentages for different categories."""
        total_essentials = 5  # shirt, pants, shoes, jacket, sweater
        total_occasions = 3   # casual, business, formal
        total_styles = 6      # popular styles
        total_seasons = 4     # seasons
        
        essential_gaps = len([g for g in gaps if g['type'] == 'essential'])
        occasion_gaps = len([g for g in gaps if g['type'] == 'occasion'])
        style_gaps = len([g for g in gaps if g['type'] == 'style'])
        season_gaps = len([g for g in gaps if g['type'] == 'season'])
        
        return {
            'essentials': max(0, round(((total_essentials - essential_gaps) / total_essentials) * 100)),
            'occasions': max(0, round(((total_occasions - occasion_gaps) / total_occasions) * 100)),
            'styles': max(0, round(((total_styles - style_gaps) / total_styles) * 100)),
            'seasons': max(0, round(((total_seasons - season_gaps) / total_seasons) * 100))
        }
    
    def _generate_recommendations(self, wardrobe: List[ClothingItem], gaps: List[Dict], validation_errors: List[Dict], trending_styles: List[Dict]) -> List[str]:
        """Generate smart recommendations based on analysis."""
        recommendations = []
        
        # Analyze color diversity
        colors = set(item.color for item in wardrobe if item.color)
        if len(colors) < 5:
            recommendations.append("Consider adding more color variety to your wardrobe for better outfit combinations.")
        
        # Check for layering pieces
        layering_items = [item for item in wardrobe if item.type in ['sweater', 'jacket']]
        if len(layering_items) < 2:
            recommendations.append("Add more layering pieces to create versatile outfits for different temperatures.")
        
        # Check for seasonal coverage
        seasons = set()
        for item in wardrobe:
            if item.season:
                seasons.update(item.season)
        
        if len(seasons) < 3:
            recommendations.append("Your wardrobe could benefit from more seasonal variety.")
        
        # Check for style diversity
        all_styles = set()
        for item in wardrobe:
            if item.style:
                all_styles.update(item.style)
        
        if len(all_styles) < 3:
            recommendations.append("Consider adding items in different styles for more outfit variety.")
        
        # Check for validation errors
        if validation_errors:
            recommendations.append("Recent outfit generation errors suggest adding more essential items to your wardrobe.")
        
        # Check for trending styles
        if trending_styles:
            recommendations.append("Consider adding items that match the trending styles.")
        
        return recommendations
    
    def _get_suggestions_for_type(self, item_type: str) -> List[str]:
        """Get suggested items for a specific type."""
        suggestions = {
            'shirt': ['Basic t-shirt', 'Button-up shirt', 'Polo shirt', 'Dress shirt'],
            'pants': ['Jeans', 'Dress pants', 'Chinos', 'Khakis'],
            'shoes': ['Casual sneakers', 'Dress shoes', 'Boots', 'Loafers'],
            'jacket': ['Blazer', 'Cardigan', 'Light jacket', 'Suit jacket'],
            'sweater': ['Pullover sweater', 'Cardigan', 'Turtleneck', 'Cable knit sweater']
        }
        return suggestions.get(item_type, [])
    
    def _get_suggestions_for_occasion(self, occasion: str) -> List[str]:
        """Get suggested items for a specific occasion."""
        suggestions = {
            'casual': ['Casual t-shirt', 'Jeans', 'Sneakers', 'Hoodie'],
            'business': ['Dress shirt', 'Dress pants', 'Dress shoes', 'Blazer'],
            'formal': ['Formal shirt', 'Suit pants', 'Oxford shoes', 'Suit jacket']
        }
        return suggestions.get(occasion, [])
    
    def _get_suggestions_for_style(self, style: str) -> List[str]:
        """Get suggested items for a specific style."""
        suggestions = {
            'Casual': ['Casual shirt', 'Jeans', 'Sneakers'],
            'Business Casual': ['Button-up shirt', 'Chinos', 'Loafers'],
            'Formal': ['Dress shirt', 'Suit pants', 'Dress shoes'],
            'Classic': ['Classic shirt', 'Dress pants', 'Oxford shoes'],
            'Preppy': ['Polo shirt', 'Khakis', 'Loafers'],
            'Minimalist': ['Basic t-shirt', 'Simple pants', 'Clean sneakers']
        }
        return suggestions.get(style, [])
    
    def _get_suggestions_for_validation_error(self, error: str) -> List[str]:
        """Get suggested items based on validation error."""
        error_suggestions = {
            'missing shoes': ['Casual sneakers', 'Dress shoes', 'Boots'],
            'missing pants': ['Jeans', 'Dress pants', 'Chinos'],
            'missing shirt': ['T-shirt', 'Button-up shirt', 'Polo shirt'],
            'incompatible colors': ['Neutral colored items', 'Black basics', 'White basics'],
            'inappropriate for occasion': ['Dress shirt', 'Dress pants', 'Formal shoes']
        }
        
        for error_key, suggestions in error_suggestions.items():
            if error_key in error.lower():
                return suggestions
        
        return ['Basic wardrobe essentials']

    def _analyze_error_patterns(self, validation_errors: List[Dict], outfit_history: List[Dict]) -> Dict[str, Any]:
        """Analyze patterns in validation errors and outfit failures."""
        if not validation_errors and not outfit_history:
            return {
                "common_errors": [],
                "error_frequency": {},
                "failure_reasons": [],
                "improvement_areas": []
            }
        
        # Analyze validation errors
        error_types = {}
        for error in validation_errors:
            error_type = error.get("type", "unknown")
            error_types[error_type] = error_types.get(error_type, 0) + 1
        
        # Analyze outfit failures
        failure_reasons = []
        for outfit in outfit_history:
            if not outfit.get("success", True):
                reason = outfit.get("error", "Unknown failure")
                failure_reasons.append(reason)
        
        # Find most common errors
        common_errors = sorted(error_types.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # Identify improvement areas
        improvement_areas = []
        if error_types.get("missing_items", 0) > 0:
            improvement_areas.append("Add missing essential items")
        if error_types.get("style_mismatch", 0) > 0:
            improvement_areas.append("Improve style coordination")
        if error_types.get("color_clash", 0) > 0:
            improvement_areas.append("Add more versatile color options")
        if error_types.get("seasonal_mismatch", 0) > 0:
            improvement_areas.append("Improve seasonal coverage")
        
        return {
            "common_errors": common_errors,
            "error_frequency": error_types,
            "failure_reasons": failure_reasons,
            "improvement_areas": improvement_areas,
            "total_errors": len(validation_errors),
            "failure_rate": len([o for o in outfit_history if not o.get("success", True)]) / max(len(outfit_history), 1) * 100
        } 