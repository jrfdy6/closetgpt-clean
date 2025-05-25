import { useState, useCallback } from "react";
import {
  generateSmartOutfit,
  getWeatherData,
  analyzeStylePreferences,
  getCompatibleColors,
  getOptimalSilhouette,
  type OutfitGenerationContext,
  type GeneratedOutfit,
  type ClothingItem,
  type UserProfile,
  type WeatherData,
} from "@/lib/utils/outfitGenerator";

interface UseOutfitGeneratorProps {
  userProfile: UserProfile;
  wardrobe: ClothingItem[];
  location: string;
}

export function useOutfitGenerator({
  userProfile,
  wardrobe,
  location,
}: UseOutfitGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [generatedOutfit, setGeneratedOutfit] = useState<GeneratedOutfit | null>(null);
  const [likedOutfits, setLikedOutfits] = useState<string[]>([]);
  const [trendingStyles] = useState([
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
  ]);

  // Fetch weather data
  const fetchWeather = useCallback(async () => {
    try {
      const weatherData = await getWeatherData(location);
      setWeather(weatherData);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    }
  }, [location]);

  // Generate outfit
  const generateOutfit = useCallback(
    async (baseItem?: ClothingItem, occasion: string = "Casual") => {
      if (!weather) {
        await fetchWeather();
      }

      setIsGenerating(true);
      setError(null);

      try {
        const context: OutfitGenerationContext = {
          baseItem,
          wardrobe,
          weather: weather!,
          occasion,
          userProfile,
          likedOutfits,
          trendingStyles,
        };

        const outfit = await generateSmartOutfit(context);
        setGeneratedOutfit(outfit);
      } catch (err) {
        setError("Failed to generate outfit");
        console.error(err);
      } finally {
        setIsGenerating(false);
      }
    },
    [weather, wardrobe, userProfile, likedOutfits, trendingStyles, fetchWeather]
  );

  // Get compatible items for a base item
  const getCompatibleItems = useCallback(
    (baseItem: ClothingItem) => {
      const compatibleColors = getCompatibleColors(baseItem.color);
      const optimalSilhouettes = getOptimalSilhouette(userProfile.bodyType);

      return wardrobe.filter((item) => {
        const colorMatch = compatibleColors.includes(item.color);
        const silhouetteMatch = item.tags?.some((tag) =>
          optimalSilhouettes.includes(tag)
        );
        const seasonMatch = item.season.some((season) =>
          baseItem.season.includes(season)
        );

        return colorMatch && (silhouetteMatch || seasonMatch);
      });
    },
    [wardrobe, userProfile.bodyType]
  );

  // Like an outfit
  const likeOutfit = useCallback((outfit: GeneratedOutfit) => {
    setLikedOutfits((prev) => [...prev, ...outfit.styleTags]);
  }, []);

  // Get style recommendations
  const getStyleRecommendations = useCallback(
    (outfits: GeneratedOutfit[]) => {
      return analyzeStylePreferences(outfits);
    },
    []
  );

  return {
    isGenerating,
    error,
    weather,
    generatedOutfit,
    likedOutfits,
    trendingStyles,
    generateOutfit,
    getCompatibleItems,
    likeOutfit,
    getStyleRecommendations,
    fetchWeather,
  };
} 