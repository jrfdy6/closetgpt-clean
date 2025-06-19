import { useState, useEffect } from "react";
import { useFirebase } from "@/lib/firebase-context";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export interface Trend {
  id: string;
  name: string;
  category: string;
  subCategories: string[];
  season: string;
  popularity: number;
  description: string;
  keyItems: string[];
  createdAt: Date;
  updatedAt: Date;
  gender: string;
  priceRange: string;
  sustainability: string;
  culturalInfluence: string;
  colorPalette: string[];
  fabricTypes: string[];
  imageUrl: string;
}

export interface TrendAnalytics {
  totalItems: number;
  averagePrice: number;
  sustainabilityScore: number;
  popularityTrend: number;
}

export function useTrends() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useFirebase();

  useEffect(() => {
    if (!user) return;

    const fetchTrends = async () => {
      if (!db) {
        setError(new Error("Firestore is not initialized"));
        setLoading(false);
        return;
      }

      try {
        const trendsRef = collection(db, "trends");
        const q = query(trendsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const trendsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Trend[];
        setTrends(trendsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch trends"));
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [user]);

  const addTrend = async (trend: Omit<Trend, "id">) => {
    if (!db) {
      throw new Error("Firestore is not initialized");
    }

    try {
      const trendsRef = collection(db, "trends");
      const docRef = await addDoc(trendsRef, {
        ...trend,
        userId: user?.uid,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to add trend");
    }
  };

  const getTrendsByCategory = async (category: string): Promise<Trend[]> => {
    try {
      const trendsRef = collection(db, "trends");
      const q = query(trendsRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        imageUrl: "",
        ...doc.data()
      })) as Trend[];
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to fetch trends by category");
    }
  };

  const getTrendAnalytics = async (trendId: string): Promise<TrendAnalytics> => {
    try {
      const trend = trends.find(t => t.id === trendId);
      if (!trend) {
        throw new Error("Trend not found");
      }
      return {
        totalItems: trend.keyItems.length,
        averagePrice: 0,
        sustainabilityScore: trend.sustainability === "High" ? 90 : trend.sustainability === "Medium" ? 60 : 30,
        popularityTrend: trend.popularity
      };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to get trend analytics");
    }
  };

  const getTrendingItems = async (): Promise<Trend[]> => {
    return trends
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
  };

  return {
    trends,
    loading,
    error,
    getTrendsByCategory,
    getTrendAnalytics,
    getTrendingItems,
    addTrend
  };
} 