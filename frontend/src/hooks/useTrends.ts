import { useState, useCallback, useEffect } from "react";
import {
  getAllTrends,
  getTrendsByFilter,
  getTrendingItems as getTrendingItemsService,
  getTrendsBySeason,
  type FashionTrend,
  type TrendCategory,
  type TrendSubCategory,
  type TrendSeason,
  type TrendFilter,
} from "@/lib/firebase/trendService";
import type { UserProfile, ClothingItem } from "@/lib/utils/outfitGenerator";

interface UseTrendsProps {
  userProfile: UserProfile;
  wardrobe: ClothingItem[];
}

interface TrendAnalytics {
  trendId: string;
  popularity: number;
  engagement: number;
  userFeedback: {
    positive: number;
    negative: number;
    neutral: number;
  };
  lastUpdated: Date;
}

export function useTrends({ userProfile, wardrobe }: UseTrendsProps) {
  const [trends, setTrends] = useState<FashionTrend[]>([]);
  const [analytics, setAnalytics] = useState<TrendAnalytics[]>([]);
  const [recommendedTrends, setRecommendedTrends] = useState<FashionTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trends
  const fetchTrends = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTrends = await getAllTrends();
      setTrends(fetchedTrends);
    } catch (err) {
      setError("Failed to fetch trends");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get recommended trends
  const getRecommendations = useCallback(async () => {
    try {
      const recommendations = await getTrendingItemsService(5);
      setRecommendedTrends(recommendations);
    } catch (err) {
      console.error("Error getting recommendations:", err);
    }
  }, []);

  // Filter trends by category
  const getTrendsByCategory = useCallback(
    async (category: TrendCategory): Promise<FashionTrend[]> => {
      try {
        const filteredTrends = await getTrendsByFilter({ category });
        return filteredTrends;
      } catch (err) {
        console.error("Error filtering trends by category:", err);
        return [];
      }
    },
    []
  );

  // Filter trends by season
  const getTrendsBySeason = useCallback(
    async (season: TrendSeason): Promise<FashionTrend[]> => {
      try {
        return await getTrendsBySeason(season);
      } catch (err) {
        console.error("Error filtering trends by season:", err);
        return [];
      }
    },
    []
  );

  // Get trend analytics
  const getTrendAnalytics = useCallback(
    (trendId: string): TrendAnalytics | undefined => {
      return analytics.find((a) => a.trendId === trendId);
    },
    [analytics]
  );

  // Get trending items for a trend
  const getTrendingItems = useCallback(
    async (trendId: string): Promise<string[]> => {
      try {
        const items = await getTrendingItemsService(5);
        const trend = items.find(item => item.id === trendId);
        return trend?.keyItems || [];
      } catch (err) {
        console.error("Error getting trending items:", err);
        return [];
      }
    },
    []
  );

  // Initial fetch
  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  // Update recommendations when trends or wardrobe changes
  useEffect(() => {
    if (trends.length > 0) {
      getRecommendations();
    }
  }, [trends, wardrobe, getRecommendations]);

  return {
    trends,
    analytics,
    recommendedTrends,
    isLoading,
    error,
    fetchTrends,
    getTrendsByCategory,
    getTrendsBySeason,
    getTrendAnalytics,
    getTrendingItems,
  };
} 