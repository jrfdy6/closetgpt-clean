import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../constants';
import { ClothingItem, Outfit } from '../types';

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size is 5MB.',
    };
  }

  return { isValid: true };
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getSeasonFromDate = (date: Date = new Date()): string => {
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
};

export const calculateOutfitScore = (outfit: Outfit): number => {
  // This is a simple scoring system that can be enhanced with more sophisticated logic
  let score = 0;
  
  // Check if outfit has items
  if (outfit.items.length > 0) {
    score += 10;
  }

  // Check if outfit has appropriate number of items
  if (outfit.items.length >= 2 && outfit.items.length <= 5) {
    score += 10;
  }

  // Check if outfit has occasion and season
  if (outfit.occasion) score += 5;
  if (outfit.season) score += 5;

  // Check if outfit has tags
  if (outfit.tags && outfit.tags.length > 0) {
    score += outfit.tags.length * 2;
  }

  return Math.min(score, 100); // Cap score at 100
};

export const getColorContrast = (hexColor: string): 'light' | 'dark' => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'dark' : 'light';
};

export const groupClothingByCategory = (items: ClothingItem[]): Record<string, ClothingItem[]> => {
  return items.reduce((acc, item) => {
    const category = item.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ClothingItem[]>);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export * from './dom';
export * from './formatting';
export * from './validation'; 