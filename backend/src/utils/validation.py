from typing import Optional, Dict, List, Any, Union
from unidecode import unidecode
import re
from difflib import SequenceMatcher
from ..types.wardrobe import ClothingType, ClothingItem

# Maximum lengths for strings
MAX_TYPE_LENGTH = 32
MAX_SUBTYPE_LENGTH = 64

# Canonical type mappings with synonyms
TYPE_MAPPINGS: Dict[str, List[str]] = {
    "shirt": [
        "t-shirt", "tee", "tshirt", "tee shirt", "v neck", "v-neck", "vneck", 
        "tank top", "polo", "blouse", "button down", "button-down", "button up",
        "button-up", "oxford", "dress shirt", "casual shirt", "formal shirt"
    ],
    "pants": [
        "jeans", "trousers", "slacks", "chinos", "khakis", "leggings", "joggers",
        "cargo pants", "dress pants", "formal pants", "casual pants", "shorts",
        "bermuda shorts", "capri pants", "culottes", "palazzo pants"
    ],
    "dress": [
        "gown", "frock", "sundress", "cocktail dress", "maxi", "mini",
        "evening dress", "formal dress", "casual dress", "party dress",
        "shift dress", "a-line dress", "bodycon dress", "wrap dress"
    ],
    "skirt": [
        "mini skirt", "maxi skirt", "pleated", "a-line", "pencil skirt",
        "midi skirt", "circle skirt", "wrap skirt", "denim skirt", "leather skirt"
    ],
    "jacket": [
        "denim", "blazer", "bomber", "parka", "windbreaker", "coat", "raincoat",
        "leather jacket", "suit jacket", "sports jacket", "cardigan", "sweater jacket",
        "puffer jacket", "down jacket", "fleece jacket", "vest", "waistcoat"
    ],
    "sweater": [
        "sweatshirt", "hoodie", "cardigan", "pullover", "jumper",
        "turtleneck", "mock neck", "crew neck", "v-neck sweater",
        "cable knit", "fisherman sweater", "chunky knit", "cashmere"
    ],
    "shoes": [
        "sneakers", "boots", "loafers", "sandals", "heels", "flats", "pumps",
        "oxfords", "derby", "mules", "espadrilles", "moccasins", "slip-ons",
        "ankle boots", "knee-high boots", "chelsea boots", "running shoes",
        "athletic shoes", "trainers", "stilettos", "wedges", "platforms"
    ],
    "accessory": [
        "bag", "purse", "scarf", "hat", "belt", "jewelry", "watch",
        "sunglasses", "gloves", "mittens", "socks", "tights", "stockings",
        "handbag", "backpack", "tote", "clutch", "necklace", "bracelet",
        "earrings", "ring", "tie", "bow tie", "pocket square", "cufflinks"
    ],
    "other": []
}

# Additional subtype mappings for common variations
SUBTYPE_MAPPINGS: Dict[str, List[str]] = {
    "shirt": [
        "v-neck", "crew neck", "turtle neck", "mock neck", "polo",
        "button-down", "button-up", "oxford", "dress", "casual"
    ],
    "pants": [
        "skinny", "straight", "bootcut", "wide leg", "flared",
        "cargo", "dress", "casual", "formal", "denim", "leather"
    ],
    "dress": [
        "maxi", "mini", "midi", "a-line", "bodycon", "shift",
        "wrap", "cocktail", "evening", "casual", "formal"
    ],
    "skirt": [
        "mini", "maxi", "midi", "a-line", "pencil", "pleated",
        "circle", "wrap", "denim", "leather"
    ],
    "jacket": [
        "denim", "leather", "bomber", "blazer", "parka", "windbreaker",
        "rain", "puffer", "down", "fleece", "vest"
    ],
    "sweater": [
        "v-neck", "crew neck", "turtle neck", "mock neck", "cardigan",
        "pullover", "hoodie", "cable knit", "chunky", "cashmere"
    ],
    "shoes": [
        "sneakers", "boots", "loafers", "sandals", "heels", "flats",
        "pumps", "oxfords", "derby", "mules", "espadrilles"
    ]
}

def normalize_string(input_str: Optional[str]) -> str:
    """Normalize a string by converting to lowercase, removing special characters, etc."""
    if not input_str:
        return ""
    
    # Convert to lowercase and normalize unicode
    normalized = unidecode(input_str.lower().strip())
    
    # Remove special characters but keep spaces and hyphens
    normalized = re.sub(r'[^a-z0-9\s-]', '', normalized)
    
    # Collapse multiple spaces and hyphens
    normalized = re.sub(r'[\s-]+', ' ', normalized)
    
    return normalized

def calculate_similarity(str1: str, str2: str) -> float:
    """Calculate similarity between two strings using SequenceMatcher."""
    return SequenceMatcher(None, str1, str2).ratio()

def find_closest_match(input_str: str, options: List[str], threshold: float = 0.8) -> Optional[str]:
    """Find the closest match from a list of options using string similarity."""
    if not input_str or not options:
        return None
    
    normalized_input = normalize_string(input_str)
    best_match = None
    best_score = threshold
    
    for option in options:
        normalized_option = normalize_string(option)
        score = calculate_similarity(normalized_input, normalized_option)
        
        if score > best_score:
            best_score = score
            best_match = option
    
    return best_match

def normalize_clothing_type(type_str: Optional[str], subtype_str: Optional[str] = None) -> ClothingType:
    """Normalize a clothing type string to a canonical type."""
    if not type_str:
        return ClothingType.OTHER
    
    normalized = normalize_string(type_str)
    if not normalized:
        return ClothingType.OTHER
    
    # Check direct matches first
    if normalized in TYPE_MAPPINGS:
        return ClothingType(normalized)
    
    # Check all synonyms
    for canonical_type, synonyms in TYPE_MAPPINGS.items():
        if normalized in synonyms:
            return ClothingType(canonical_type)
    
    # Check for compound types (e.g., "denim jacket" -> "jacket")
    words = normalized.split()
    for word in words:
        if word in TYPE_MAPPINGS:
            return ClothingType(word)
        for canonical_type, synonyms in TYPE_MAPPINGS.items():
            if word in synonyms:
                return ClothingType(canonical_type)
    
    # If we have a subtype, try to use it to determine the type
    if subtype_str:
        normalized_subtype = normalize_string(subtype_str)
        # Check if subtype is actually a type
        if normalized_subtype in TYPE_MAPPINGS:
            return ClothingType(normalized_subtype)
        # Check if subtype is a synonym of a type
        for canonical_type, synonyms in TYPE_MAPPINGS.items():
            if normalized_subtype in synonyms:
                return ClothingType(canonical_type)
        # Check if subtype matches any known subtypes
        for canonical_type, subtypes in SUBTYPE_MAPPINGS.items():
            if normalized_subtype in subtypes:
                return ClothingType(canonical_type)
    
    # Try fuzzy matching
    all_options = list(TYPE_MAPPINGS.keys()) + [syn for syns in TYPE_MAPPINGS.values() for syn in syns]
    match = find_closest_match(normalized, all_options)
    
    if match:
        # Find the canonical type for the matched synonym
        for canonical_type, synonyms in TYPE_MAPPINGS.items():
            if match in synonyms:
                return ClothingType(canonical_type)
        # If match is a canonical type
        if match in TYPE_MAPPINGS:
            return ClothingType(match)
    
    return ClothingType.OTHER

def normalize_subtype(type_str: Optional[str], subtype_str: Optional[str]) -> Optional[str]:
    """Normalize a clothing subtype string."""
    if not subtype_str:
        return None
    
    normalized = normalize_string(subtype_str)
    if not normalized:
        return None
    
    # If the subtype is actually a type, return None
    if normalized in TYPE_MAPPINGS:
        return None
    
    # Check if the subtype is a synonym of the main type
    if type_str and type_str in TYPE_MAPPINGS and normalized in TYPE_MAPPINGS[type_str]:
        return None
    
    # Check if the subtype matches any known subtypes for the given type
    if type_str and type_str in SUBTYPE_MAPPINGS:
        for known_subtype in SUBTYPE_MAPPINGS[type_str]:
            if normalized == normalize_string(known_subtype):
                return known_subtype
    
    # Try fuzzy matching with known subtypes
    if type_str and type_str in SUBTYPE_MAPPINGS:
        match = find_closest_match(normalized, SUBTYPE_MAPPINGS[type_str])
        if match:
            return match
    
    return normalized[:MAX_SUBTYPE_LENGTH]

def validate_clothing_item(item: Dict[str, Any]) -> ClothingItem:
    """Validate and normalize a clothing item."""
    # First normalize the type and subtype
    normalized_item = {
        **item,
        "type": normalize_clothing_type(item.get("type"), item.get("subType")),
        "subType": normalize_subtype(item.get("type"), item.get("subType"))
    }
    
    # Then validate using Pydantic model
    return ClothingItem(**normalized_item)

def is_clothing_item(item: Any) -> bool:
    """Type guard to check if an object is a valid clothing item."""
    try:
        validate_clothing_item(item)
        return True
    except Exception:
        return False 