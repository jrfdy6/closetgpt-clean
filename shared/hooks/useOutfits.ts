import { useState, useEffect } from 'react';
import { Outfit, ClothingItem } from '../types';
import { ApiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const useOutfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().get<Outfit[]>(API_ENDPOINTS.OUTFIT.LIST);
      if (response.data) {
        setOutfits(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch outfits');
    } finally {
      setLoading(false);
    }
  };

  const createOutfit = async (outfit: Omit<Outfit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().post<Outfit>(
        API_ENDPOINTS.OUTFIT.CREATE,
        outfit
      );

      if (response.data) {
        setOutfits((prev) => [...prev, response.data!]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create outfit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOutfit = async (id: string, updates: Partial<Outfit>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().put<Outfit>(
        `${API_ENDPOINTS.OUTFIT.UPDATE(id)}`,
        updates
      );

      if (response.data) {
        setOutfits((prev) =>
          prev.map((outfit) => (outfit.id === id ? response.data! : outfit))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update outfit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteOutfit = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ApiClient.getInstance().delete(API_ENDPOINTS.OUTFIT.DELETE(id));
      setOutfits((prev) => prev.filter((outfit) => outfit.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete outfit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOutfitById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().get<Outfit>(
        API_ENDPOINTS.OUTFIT.GET(id)
      );
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch outfit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOutfitRecommendations = async (occasion?: string, season?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().get<Outfit[]>(
        API_ENDPOINTS.OUTFIT.RECOMMENDATIONS,
        { params: { occasion, season } }
      );
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get outfit recommendations');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const validateOutfit = (outfit: Outfit): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!outfit.name) {
      errors.push('Outfit name is required');
    }

    if (!outfit.items || outfit.items.length === 0) {
      errors.push('At least one item is required');
    }

    if (outfit.items && outfit.items.length > 0) {
      const categories = new Set(outfit.items.map((item) => item.category));
      if (categories.size < 2) {
        errors.push('Outfit should include items from at least 2 different categories');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return {
    outfits,
    loading,
    error,
    createOutfit,
    updateOutfit,
    deleteOutfit,
    getOutfitById,
    getOutfitRecommendations,
    validateOutfit,
    refreshOutfits: fetchOutfits,
  };
}; 