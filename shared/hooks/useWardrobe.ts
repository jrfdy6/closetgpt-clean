import { useState, useEffect } from 'react';
import { ClothingItem } from '../types';
import { ApiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { validateFile } from '../utils';

export const useWardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().get<ClothingItem[]>(API_ENDPOINTS.WARDROBE.ITEMS);
      if (response.data) {
        setItems(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wardrobe items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<ClothingItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, imageFile: File) => {
    try {
      setLoading(true);
      setError(null);

      // Validate file
      const validation = validateFile(imageFile);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Upload image first
      const formData = new FormData();
      formData.append('image', imageFile);
      const uploadResponse = await ApiClient.getInstance().uploadFile<{ imageUrl: string }>(
        API_ENDPOINTS.WARDROBE.UPLOAD,
        formData
      );

      if (!uploadResponse.data?.imageUrl) {
        throw new Error('Failed to upload image');
      }

      // Create item with image URL
      const response = await ApiClient.getInstance().post<ClothingItem>(
        API_ENDPOINTS.WARDROBE.ITEMS,
        {
          ...item,
          imageUrl: uploadResponse.data.imageUrl,
        }
      );

      if (response.data) {
        setItems((prev) => [...prev, response.data!]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<ClothingItem>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().put<ClothingItem>(
        `${API_ENDPOINTS.WARDROBE.ITEM.replace(':id', id)}`,
        updates
      );

      if (response.data) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? response.data! : item))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ApiClient.getInstance().delete(
        `${API_ENDPOINTS.WARDROBE.ITEM.replace(':id', id)}`
      );
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getItemById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().get<ClothingItem>(
        `${API_ENDPOINTS.WARDROBE.ITEM.replace(':id', id)}`
      );
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    refreshItems: fetchItems,
  };
}; 