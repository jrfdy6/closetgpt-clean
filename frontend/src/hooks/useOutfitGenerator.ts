import { useState } from 'react';
import { OutfitGeneratedOutfit, ClothingItem, UserProfile } from '@shared/types';
import { WeatherData } from '@/types/weather';

interface GenerateOutfitParams {
  wardrobe: ClothingItem[];
  weather: WeatherData;
  occasion: string;
  userProfile: UserProfile;
  style?: string;
  mood?: string;
  baseItem?: ClothingItem;
}

export function useOutfitGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateOutfit = async (params: GenerateOutfitParams): Promise<OutfitGeneratedOutfit> => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        occasion: params.occasion,
        weather: params.weather,
        wardrobe: params.wardrobe,
        user_profile: {
          id: params.userProfile.id,
          name: params.userProfile.name,
          email: params.userProfile.email,
          bodyType: params.userProfile.bodyType,
          skinTone: params.userProfile.skinTone || 'medium',
          height: params.userProfile.measurements?.height || 175,
          weight: params.userProfile.measurements?.weight || 70,
          preferences: {
            style: params.userProfile.preferences?.style || ['classic'],
            colors: params.userProfile.preferences?.colors || ['blue', 'white', 'black'],
            occasions: params.userProfile.preferences?.occasions || ['casual']
          },
          stylePreferences: params.userProfile.stylePreferences || [],
          fitPreference: params.userProfile.fitPreference || 'fitted',
          createdAt: params.userProfile.createdAt,
          updatedAt: params.userProfile.updatedAt
        },
        likedOutfits: [],
        trendingStyles: [],
        style: params.style,
        mood: params.mood,
        baseItem: params.baseItem
      };

      const response = await fetch("/api/outfit/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Outfit Generation Error:', data);
        throw new Error(data.details || data.error || "Failed to generate outfit");
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateOutfit,
    loading,
    error,
    clearError: () => setError(null)
  };
} 