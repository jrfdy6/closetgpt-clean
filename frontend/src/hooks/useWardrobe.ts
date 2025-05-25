import { useState, useCallback, useEffect } from "react";
import { useFirebase } from "@/lib/firebase-context";
import {
  getWardrobeItems,
  getWardrobeItem,
  addWardrobeItem,
  updateWardrobeItem,
  deleteWardrobeItem,
  getWardrobeItemsByCategory,
  getWardrobeItemsBySeason,
  processAndAddImages,
  deleteMultipleWardrobeItems,
} from "@/lib/firebase/wardrobeService";
import type { ClothingItem } from "@/lib/utils/outfitGenerator";

export function useWardrobe() {
  const { user, loading: authLoading } = useFirebase();
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingImages, setProcessingImages] = useState(false);

  // Fetch all wardrobe items
  const fetchItems = useCallback(async () => {
    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await getWardrobeItems(user.uid);
      if (response.success && response.data) {
        // Transform each item to match the ClothingItem type expected by the frontend
        const transformed = response.data.map((item: any) => ({
          id: item.id,
          userId: item.userId,
          name: item.subType || item.type || '',
          type: item.type,
          color: item.dominantColors?.[0]?.name || '',
          season: item.season || [],
          imageUrl: item.imageUrl,
          tags: item.style || [],
          style: item.style || [],
          dominantColors: item.dominantColors || [],
          matchingColors: item.matchingColors || [],
          occasion: item.occasion || [],
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date(item.createdAt).toISOString(),
          updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : new Date(item.updatedAt).toISOString(),
          metadata: item.metadata || {},
        }));
        setItems(transformed);
      } else {
        console.error("Failed to fetch wardrobe items:", response.error);
        setError(response.error || "Failed to fetch wardrobe items");
        setItems([]);
      }
    } catch (err) {
      console.error("Error in fetchItems:", err);
      setError("Failed to fetch wardrobe items");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Get a specific wardrobe item
  const getItem = useCallback(async (itemId: string) => {
    try {
      return await getWardrobeItem(itemId);
    } catch (err) {
      console.error("Error fetching item:", err);
      return null;
    }
  }, []);

  // Add a new wardrobe item
  const addItem = useCallback(async (item: Omit<ClothingItem, "id">) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      // Ensure season is valid and createdAt/updatedAt are numbers
      const validSeasons = ["spring", "summer", "fall", "winter"];
      const mappedItem = {
        ...item,
        season: (item.season || []).filter((s): s is "spring" | "summer" | "fall" | "winter" => validSeasons.includes(s)),
        createdAt: typeof item.createdAt === 'string' ? Date.parse(item.createdAt) : item.createdAt,
        updatedAt: typeof item.updatedAt === 'string' ? Date.parse(item.updatedAt) : item.updatedAt,
      };
      await addWardrobeItem(mappedItem);
      await fetchItems();
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchItems]);

  // Update a wardrobe item
  const updateItem = useCallback(async (itemId: string, updates: Partial<ClothingItem>) => {
    try {
      setIsLoading(true);
      setError(null);
      const validSeasons = ["spring", "summer", "fall", "winter"];
      const mappedUpdates = {
        ...updates,
        season: updates.season
          ? updates.season.filter((s): s is "spring" | "summer" | "fall" | "winter" => validSeasons.includes(s))
          : undefined,
        createdAt: (typeof updates.createdAt === 'string')
          ? (isNaN(Date.parse(updates.createdAt)) ? undefined : Date.parse(updates.createdAt))
          : (typeof updates.createdAt === 'number' ? updates.createdAt : undefined),
        updatedAt: (typeof updates.updatedAt === 'string')
          ? (isNaN(Date.parse(updates.updatedAt)) ? undefined : Date.parse(updates.updatedAt))
          : (typeof updates.updatedAt === 'number' ? updates.updatedAt : undefined),
      };
      await updateWardrobeItem(itemId, mappedUpdates);
      await fetchItems();
    } catch (err) {
      setError("Failed to update item");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchItems]);

  // Delete a wardrobe item
  const deleteItem = useCallback(async (itemId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteWardrobeItem(itemId);
      await fetchItems();
    } catch (err) {
      setError("Failed to delete item");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchItems]);

  // Delete multiple wardrobe items
  const deleteItems = useCallback(async (itemIds: string[]) => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      await deleteMultipleWardrobeItems(user.uid, itemIds);
      await fetchItems();
    } catch (err) {
      setError("Failed to delete items");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchItems]);

  // Process and add multiple images
  const processImages = useCallback(async (files: File[]) => {
    if (!user) return;

    try {
      setProcessingImages(true);
      setError(null);
      const response = await processAndAddImages(user.uid, files);
      if (response.success && response.data) {
        await fetchItems();
        return response;
      } else {
        throw new Error(response.error || 'Failed to process images');
      }
    } catch (err) {
      setError("Failed to process images");
      console.error(err);
      throw err;
    } finally {
      setProcessingImages(false);
    }
  }, [user, fetchItems]);

  // Fetch items on mount and when auth state changes
  useEffect(() => {
    if (!authLoading) {
      fetchItems();
    }
  }, [fetchItems, authLoading]);

  return {
    items,
    isLoading: isLoading || authLoading,
    error,
    processingImages,
    addItem,
    updateItem,
    deleteItem,
    deleteItems,
    getItem,
    processImages,
    refreshItems: fetchItems,
  };
} 