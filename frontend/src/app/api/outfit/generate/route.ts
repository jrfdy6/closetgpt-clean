import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const OCCASIONS = ["casual", "formal", "business", "sports", "party"];
const MOODS = ["energetic", "relaxed", "confident", "playful", "elegant"];
const STYLES = ["classic", "modern", "vintage", "streetwear", "bohemian"];

// Helper function to convert wardrobe items for backend compatibility
function convertWardrobeForBackend(wardrobe: any[]): any[] {
  return wardrobe.map(item => {
    const now = Math.floor(Date.now() / 1000);
    
    // Ensure dominantColors are proper Color objects
    const dominantColors = Array.isArray(item.dominantColors) 
      ? item.dominantColors.map((color: any) => {
          if (typeof color === 'string') {
            // Convert string color to Color object
            return { 
              name: color, 
              hex: "#000000", // Default hex
              rgb: [0, 0, 0]  // Default RGB
            };
          } else if (color && typeof color === 'object' && color.name) {
            // Ensure it has the required structure
            return {
              name: color.name,
              hex: color.hex || "#000000",
              rgb: color.rgb || [0, 0, 0]
            };
          } else {
            // Fallback
            return { name: "Unknown", hex: "#000000", rgb: [0, 0, 0] };
          }
        })
      : [];

    // Ensure matchingColors are proper Color objects
    const matchingColors = Array.isArray(item.matchingColors) 
      ? item.matchingColors.map((color: any) => {
          if (typeof color === 'string') {
            return { 
              name: color, 
              hex: "#000000", 
              rgb: [0, 0, 0] 
            };
          } else if (color && typeof color === 'object' && color.name) {
            return {
              name: color.name,
              hex: color.hex || "#000000",
              rgb: color.rgb || [0, 0, 0]
            };
          } else {
            return { name: "Unknown", hex: "#000000", rgb: [0, 0, 0] };
          }
        })
      : [];

    // Ensure all required fields are present
    return {
      id: item.id || item.itemId || `item-${Date.now()}-${Math.random()}`,
      name: item.name || "Unknown Item",
      type: item.type || "other",
      color: item.color || item.colorName || "Unknown",
      season: Array.isArray(item.season) ? item.season : ["spring", "summer", "fall", "winter"],
      imageUrl: item.imageUrl || item.image || "",
      tags: Array.isArray(item.tags) ? item.tags : [],
      style: Array.isArray(item.style) ? item.style : [],
      userId: item.userId || "default-user",
      dominantColors: dominantColors,
      matchingColors: matchingColors,
      occasion: Array.isArray(item.occasion) ? item.occasion : ["Casual"],
      createdAt: typeof item.createdAt === 'object' && item.createdAt?.seconds 
        ? item.createdAt.seconds 
        : typeof item.createdAt === 'number' 
          ? item.createdAt 
          : now,
      updatedAt: typeof item.updatedAt === 'object' && item.updatedAt?.seconds 
        ? item.updatedAt.seconds 
        : typeof item.updatedAt === 'number' 
          ? item.updatedAt 
          : now,
      subType: item.subType || null,
      brand: item.brand || null,
      colorName: item.colorName || item.color || null,
      metadata: item.metadata || {
        visualAttributes: {
          material: item.material || null,
          pattern: null,
          textureStyle: null,
          fabricWeight: null,
          fit: null,
          silhouette: null,
          length: null,
          genderTarget: null,
          sleeveLength: null,
          hangerPresent: null,
          backgroundRemoved: null,
          wearLayer: null,
          formalLevel: null
        },
        itemMetadata: {
          priceEstimate: null,
          careInstructions: null,
          tags: Array.isArray(item.tags) ? item.tags : []
        },
        colorAnalysis: {
          dominant: dominantColors,
          matching: matchingColors
        },
        originalType: item.type || "other",
        analysisTimestamp: now,
        naturalDescription: null
      },
      embedding: Array.isArray(item.embedding) ? item.embedding : undefined,
      backgroundRemoved: typeof item.backgroundRemoved === 'boolean' ? item.backgroundRemoved : undefined
    };
  });
}

// Helper function to convert user profile for backend compatibility
function convertUserProfileForBackend(userProfile: any): any {
  const now = Math.floor(Date.now() / 1000);
  return {
    id: userProfile?.id || 'default-user',
    name: userProfile?.name || userProfile?.displayName || 'User',
    email: userProfile?.email || 'user@example.com',
    gender: userProfile?.gender || null,
    preferences: {
      style: userProfile?.stylePreferences || [],
      colors: userProfile?.colorPreferences || [],
      occasions: userProfile?.occasionPreferences || []
    },
    measurements: {
      height: userProfile?.measurements?.height || 0,
      weight: userProfile?.measurements?.weight || 0,
      bodyType: userProfile?.bodyType || 'athletic',
      skinTone: userProfile?.skinTone || null
    },
    stylePreferences: userProfile?.stylePreferences || [],
    bodyType: userProfile?.bodyType || 'athletic',
    skinTone: userProfile?.skinTone || null,
    fitPreference: userProfile?.fitPreference || null,
    createdAt: now,
    updatedAt: now
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { 
      occasion, 
      mood, 
      style, 
      description,
      wardrobe,
      weather,
      userProfile,
      likedOutfits,
      trendingStyles 
    } = body;

    // If any field is empty, randomize it
    occasion = occasion || OCCASIONS[Math.floor(Math.random() * OCCASIONS.length)];
    mood = mood || MOODS[Math.floor(Math.random() * MOODS.length)];
    style = style || STYLES[Math.floor(Math.random() * STYLES.length)];

    // Convert wardrobe items for backend compatibility
    const convertedWardrobe = convertWardrobeForBackend(wardrobe || []);

    // Log the payload for debugging
    console.log('Outfit Generation Payload:', {
      occasion,
      mood,
      style,
      description,
      wardrobeSize: convertedWardrobe?.length,
      weather,
      userProfile: {
        id: userProfile?.id,
        stylePreferences: userProfile?.stylePreferences,
        bodyType: userProfile?.bodyType
      }
    });

    // Forward the request to the backend
    const response = await fetch(`${API_URL}/api/outfit/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        occasion,
        mood,
        style,
        description: description || "",
        wardrobe: convertedWardrobe,
        weather,
        user_profile: convertUserProfileForBackend(userProfile),
        likedOutfits: likedOutfits || [],
        trendingStyles: trendingStyles || []
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to parse error response' }));
      console.error("Backend error:", errorData);
      throw new Error(errorData.detail || errorData.message || 'Failed to generate outfit');
    }

    const data = await response.json();
    
    // Log the response for debugging
    console.log('Generated Outfit:', {
      id: data.id,
      name: data.name,
      occasion: data.occasion,
      style: data.style,
      items: data.items?.map((item: any) => ({
        name: item.name,
        type: item.type,
        style: item.style
      }))
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating outfit:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate outfit",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 