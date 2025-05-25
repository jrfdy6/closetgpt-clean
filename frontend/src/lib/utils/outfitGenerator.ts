import { OpenAI } from "openai";

// Types
export interface ClothingItem {
  id: string;
  userId: string;
  name: string;
  type: "shirt" | "pants" | "dress" | "skirt" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
  subType?: string;
  color: string;
  colorName?: string;
  season: string[];
  imageUrl: string;
  tags: string[];
  style: string[];
  dominantColors: { name: string; hex: string; rgb: [number, number, number] }[];
  matchingColors: { name: string; hex: string; rgb: [number, number, number] }[];
  occasion: string[];
  brand?: string;
  material?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  bodyType: string;
  skinTone: string;
  stylePreferences: string[];
  fitPreference: string;
  preferences?: {
    colorPreferences: string[];
    patternPreferences: string[];
    fabricPreferences: string[];
    brandPreferences: string[];
    priceRange: "Budget" | "Mid-Range" | "Luxury";
    sustainability: boolean;
  };
  measurements?: {
    height: number;
    weight: number;
    chest?: number;
    waist?: number;
    hips?: number;
    inseam?: number;
    shoulder?: number;
    sleeve?: number;
  };
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

export interface OutfitGenerationContext {
  baseItem?: ClothingItem;
  wardrobe: ClothingItem[];
  weather: WeatherData;
  occasion: string;
  userProfile: UserProfile;
  likedOutfits: string[];
  trendingStyles: string[];
}

export interface GeneratedOutfit {
  name: string;
  pieces: {
    itemId: string;
    reason: string;
  }[];
  styleTags: string[];
  explanation: string;
}

// Constants
export const BODY_TYPES = [
  "Athletic",
  "Curvy",
  "Rectangular",
  "Hourglass",
  "Pear",
  "Apple",
  "Inverted Triangle",
];

export const SKIN_TONES = [
  "Warm",
  "Cool",
  "Neutral",
  "Olive",
  "Deep",
  "Medium",
  "Fair",
];

export const TRENDING_STYLES = [
  "Minimal Luxe",
  "Gorpcore",
  "Boho",
  "Streetwear",
  "Old Money",
  "Clean Girl",
  "Korean Core",
  "Y2K",
  "Coastal Grandmother",
  "Dark Academia",
];

// Helper Functions
function buildPrompt(context: OutfitGenerationContext): string {
  const { baseItem, wardrobe, weather, occasion, userProfile, likedOutfits, trendingStyles } = context;

  return `You are a top-tier fashion assistant for a digital wardrobe app.

The user has a wardrobe of ${wardrobe.length} items, including:
${wardrobe.map(item => `- ${item.name} (${item.type}, ${item.color})`).join('\n')}

They are attending a ${occasion} in ${weather.condition} weather in ${weather.location}. 
Their skin tone is ${userProfile.skinTone} and their body type is ${userProfile.bodyType}.
Their style preferences include: ${userProfile.stylePreferences.join(', ')}.

They tend to like outfits with these styles: ${likedOutfits.join(', ')}.

Current trending styles include: ${trendingStyles.join(', ')}.

Your task:
- Pick 3 complementary items from their wardrobe to go with this base item: ${baseItem ? `${baseItem.name} (${baseItem.type}, ${baseItem.color})` : 'any item'}.
- Match colors based on color theory.
- Optimize the silhouette for their body type.
- Ensure the outfit is appropriate for the weather and event.
- Match with at least one of the trending styles.

Return the outfit suggestion in JSON format:
{
  "name": "Outfit Name",
  "pieces": [
    {"itemId": "id", "reason": "Why this piece works"},
    ...
  ],
  "styleTags": ["style1", "style2"],
  "explanation": "Detailed explanation of the outfit"
}`;
}

// Main Generation Function
export async function generateSmartOutfit(
  context: OutfitGenerationContext
): Promise<GeneratedOutfit> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const prompt = buildPrompt(context);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from OpenAI");

    return JSON.parse(content) as GeneratedOutfit;
  } catch (error) {
    console.error("Error generating outfit:", error);
    throw error;
  }
}

// Weather API Integration
export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();

    return {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      location: data.name,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Style Analysis
export function analyzeStylePreferences(outfits: GeneratedOutfit[]): string[] {
  const styleCounts = new Map<string, number>();
  
  outfits.forEach(outfit => {
    outfit.styleTags.forEach(tag => {
      styleCounts.set(tag, (styleCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(styleCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([style]) => style);
}

// Color Compatibility
export function getCompatibleColors(color: string): string[] {
  const colorWheel: Record<string, string[]> = {
    "Red": ["Green", "Blue", "Purple"],
    "Blue": ["Orange", "Red", "Purple"],
    "Yellow": ["Purple", "Blue", "Green"],
    "Green": ["Red", "Purple", "Orange"],
    "Purple": ["Yellow", "Green", "Orange"],
    "Orange": ["Blue", "Purple", "Green"],
    "Black": ["White", "Gray", "Red", "Blue", "Green"],
    "White": ["Black", "Gray", "Navy", "Red"],
    "Gray": ["Black", "White", "Navy", "Red"],
  };

  return colorWheel[color] || [];
}

// Body Type Optimization
export function getOptimalSilhouette(bodyType: string): string[] {
  const silhouettes: Record<string, string[]> = {
    "Athletic": ["Fitted", "Structured", "Layered"],
    "Curvy": ["A-line", "Wrap", "Empire"],
    "Rectangular": ["Belted", "Layered", "A-line"],
    "Hourglass": ["Fitted", "Wrap", "Belted"],
    "Pear": ["A-line", "Empire", "Structured top"],
    "Apple": ["A-line", "Empire", "Layered"],
    "Inverted Triangle": ["A-line", "Wrap", "Layered bottom"],
  };

  return silhouettes[bodyType] || [];
} 