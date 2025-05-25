export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
  },
  
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
    STYLE_PROFILE: `${API_BASE_URL}/users/style-profile`,
  },
  
  // Wardrobe endpoints
  WARDROBE: {
    ITEMS: `${API_BASE_URL}/wardrobe/items`,
    ITEM: (id: string) => `${API_BASE_URL}/wardrobe/items/${id}`,
    UPLOAD: `${API_BASE_URL}/wardrobe/upload`,
    CATEGORIES: `${API_BASE_URL}/wardrobe/categories`,
  },
  
  // Outfit endpoints
  OUTFITS: {
    LIST: `${API_BASE_URL}/outfits`,
    CREATE: `${API_BASE_URL}/outfits`,
    GET: (id: string) => `${API_BASE_URL}/outfits/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/outfits/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/outfits/${id}`,
    RECOMMENDATIONS: `${API_BASE_URL}/outfits/recommendations`,
  },
  
  // AI endpoints
  AI: {
    STYLE_ADVICE: `${API_BASE_URL}/ai/style-advice`,
    OUTFIT_RECOMMENDATIONS: `${API_BASE_URL}/ai/outfit-recommendations`,
    COLOR_ANALYSIS: `${API_BASE_URL}/ai/color-analysis`,
  },
}; 