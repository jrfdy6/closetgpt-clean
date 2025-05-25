"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOutfitGenerator } from "@/hooks/useOutfitGenerator";
import { useStorage } from "@/hooks/useStorage";
import { useTrends } from "@/hooks/useTrends";
import { Wand2, Plus, Filter, X, Heart, RefreshCw, MapPin, Cloud, TrendingUp, BarChart2 } from "lucide-react";
import type { ClothingItem, GeneratedOutfit } from "@/lib/utils/outfitGenerator";
import { 
  TREND_CATEGORIES,
  TREND_SUBCATEGORIES,
  SEASONS,
  PRICE_RANGES,
} from "@/lib/utils/trendManager";
import type { 
  TrendCategory, 
  TrendSubCategory, 
  TrendSeason, 
  TrendFilter,
} from "@/lib/utils/trendManager";

// Constants
const OCCASIONS = [
  "Casual",
  "Work",
  "Party",
  "Formal",
  "Date Night",
  "Brunch",
  "Travel",
  "Gym",
  "Beach",
  "Outdoor",
];

// Sample user profile (replace with actual user data)
const SAMPLE_USER_PROFILE = {
  id: "user1",
  bodyType: "Athletic",
  skinTone: "Warm",
  stylePreferences: ["Streetwear", "Minimal", "Athletic"],
  fitPreference: "Fitted",
};

export default function OutfitsPage() {
  const router = useRouter();
  const { getItems } = useStorage();
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState("Casual");
  const [selectedBaseItem, setSelectedBaseItem] = useState<ClothingItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [location, setLocation] = useState("New York");
  const [savedOutfits, setSavedOutfits] = useState<GeneratedOutfit[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TrendCategory | "All">("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState<TrendSubCategory | "All">("All");
  const [selectedSeason, setSelectedSeason] = useState<TrendSeason | "All">("All");
  const [selectedGender, setSelectedGender] = useState<"Men" | "Women" | "Unisex" | "All">("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof PRICE_RANGES[number] | "All">("All");
  const [showSustainability, setShowSustainability] = useState(false);
  const [minPopularity, setMinPopularity] = useState(0);

  const {
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
  } = useOutfitGenerator({
    userProfile: SAMPLE_USER_PROFILE,
    wardrobe,
    location,
  });

  const {
    trends,
    analytics,
    recommendedTrends,
    isLoading: isLoadingTrends,
    error: trendsError,
    getTrendsByCategory,
    getTrendAnalytics,
    getTrendingItems,
  } = useTrends({
    userProfile: SAMPLE_USER_PROFILE,
    wardrobe,
  });

  // Fetch wardrobe items
  useEffect(() => {
    const fetchWardrobe = async () => {
      const items = await getItems();
      setWardrobe(items);
    };
    fetchWardrobe();
  }, [getItems]);

  // Fetch weather on mount
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Handle outfit generation
  const handleGenerateOutfit = async () => {
    await generateOutfit(selectedBaseItem || undefined, selectedOccasion);
  };

  // Handle saving outfit
  const handleSaveOutfit = (outfit: GeneratedOutfit) => {
    setSavedOutfits((prev) => [...prev, outfit]);
    likeOutfit(outfit);
  };

  // Get style recommendations
  const styleRecommendations = getStyleRecommendations(savedOutfits);

  // Get filtered trends
  const filteredTrends = trends.filter(trend => {
    if (selectedCategory !== "All" && trend.category !== selectedCategory) return false;
    if (selectedSubCategory !== "All" && !trend.subCategories.includes(selectedSubCategory)) return false;
    if (selectedSeason !== "All" && trend.season !== selectedSeason) return false;
    if (selectedGender !== "All" && trend.gender !== selectedGender) return false;
    if (selectedPriceRange !== "All" && trend.priceRange !== selectedPriceRange) return false;
    if (showSustainability && !trend.sustainability) return false;
    if (trend.popularity < minPopularity) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div>
        <div>
          <h1>Outfit Generator</h1>
          <p>
            Get AI-powered outfit suggestions based on your wardrobe and preferences
          </p>
        </div>
        <div>
          <button onClick={() => setShowFilters(!showFilters)}>
            <Filter />
            Filters
          </button>
          <button onClick={() => router.push("/wardrobe/add")}>
            <Plus />
            Add Item
          </button>
        </div>
      </div>

      {/* Weather and Location */}
      {weather && (
        <div>
          <div>
            <div>
              <MapPin />
              <span>{weather.location}</span>
            </div>
            <div>
              <Cloud />
              <span>
                {weather.condition}, {Math.round(weather.temperature)}°C
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div>
          <div>
            <div>
              {/* Occasion Filter */}
              <div>
                <label>
                  Occasion
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                >
                  {OCCASIONS.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>

              {/* Base Item Filter */}
              <div>
                <label>
                  Base Item (Optional)
                </label>
                <select
                  value={selectedBaseItem?.id || ""}
                  onChange={(e) => {
                    const item = wardrobe.find(
                      (item) => item.id === e.target.value
                    );
                    setSelectedBaseItem(item || null);
                  }}
                >
                  <option value="">Select a base item</option>
                  {wardrobe.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Input */}
              <div>
                <label>
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Outfit */}
      {generatedOutfit && (
        <div>
          <div>
            <h2>Generated Outfit</h2>
            <div>
              {generatedOutfit.items.map((item) => (
                <div key={item.id}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.type} • {item.color}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3>Style Tags</h3>
              <div>
                {generatedOutfit.styleTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <h3>Explanation</h3>
              <p>{generatedOutfit.explanation}</p>
            </div>
            <button onClick={() => handleSaveOutfit(generatedOutfit)}>
              <Heart />
              Save Outfit
            </button>
          </div>
        </div>
      )}

      {/* Fashion Trends */}
      <div>
        <div>
          <h2>Fashion Trends</h2>
          <button onClick={() => setShowFilters(!showFilters)}>
            <Filter />
            Filter Trends
          </button>
        </div>
        <div>
          {filteredTrends.map((trend) => (
            <div key={trend.id}>
              <img src={trend.imageUrl} alt={trend.name} />
              <div>
                <h3>{trend.name}</h3>
                <p>{trend.description}</p>
                <div>
                  <span>{trend.category}</span>
                  <span>{trend.season}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div>
        <button onClick={handleGenerateOutfit} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <RefreshCw />
              Generating...
            </>
          ) : (
            <>
              <Wand2 />
              Generate Outfit
            </>
          )}
        </button>
      </div>

      {error && <div>{error}</div>}
    </div>
  );
} 