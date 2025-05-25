import { z } from 'zod';
import {
  ClothingItem,
  ClothingItemSchema,
  OpenAIClothingAnalysis,
  OpenAIClothingAnalysisSchema,
  ApiResponse,
  AppError
} from './types';

// Validation functions
export const validateClothingItem = (data: unknown): ClothingItem => {
  return ClothingItemSchema.parse(data);
};

export const validateOpenAIAnalysis = (data: unknown): OpenAIClothingAnalysis => {
  return OpenAIClothingAnalysisSchema.parse(data);
};

// API response helpers
export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data
});

export const createErrorResponse = (error: string): ApiResponse<never> => ({
  success: false,
  error
});

// Error handling
export const createAppError = (code: string, message: string, details?: unknown): AppError => ({
  code,
  message,
  details
});

// Data transformation
export const convertOpenAIAnalysisToClothingItem = (
  analysis: OpenAIClothingAnalysis,
  userId: string,
  imageUrl: string
): Omit<ClothingItem, 'id'> => {
  const now = Date.now();
  return {
    userId,
    type: analysis.type as ClothingItem['type'],
    subType: analysis.subType,
    dominantColors: analysis.dominantColors,
    matchingColors: analysis.matchingColors,
    style: analysis.style,
    brand: analysis.brand,
    season: analysis.season,
    occasion: analysis.occasion,
    imageUrl,
    createdAt: now,
    updatedAt: now
  };
};

// Color utilities
export const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex color');
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Date utilities
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toISOString();
};

// Validation helpers
export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
  } catch {
    return false;
  }
};

export const isValidUserId = (userId: string): boolean => {
  return typeof userId === 'string' && userId.length > 0;
}; 