import { z } from 'zod';

// Base types
export type UserId = string;
export type ImageUrl = string;
export type Timestamp = number;

// Color types
export type Color = {
  name: string;
  hex: string;
  rgb: [number, number, number];
};

// Clothing item types
export const ClothingItemSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.enum([
    'shirt',
    'pants',
    'dress',
    'skirt',
    'jacket',
    'sweater',
    'shoes',
    'accessory',
    'other'
  ]),
  subType: z.string().optional(),
  dominantColors: z.array(z.object({
    name: z.string(),
    hex: z.string(),
    rgb: z.tuple([z.number(), z.number(), z.number()])
  })),
  matchingColors: z.array(z.object({
    name: z.string(),
    hex: z.string(),
    rgb: z.tuple([z.number(), z.number(), z.number()])
  })),
  style: z.array(z.string()),
  brand: z.string().optional(),
  material: z.string().optional(),
  colorName: z.string().optional(),
  season: z.array(z.enum(['spring', 'summer', 'fall', 'winter'])),
  occasion: z.array(z.string()),
  imageUrl: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  metadata: z.record(z.unknown()).optional()
});

export type ClothingItem = z.infer<typeof ClothingItemSchema>;

// Outfit types
export const OutfitSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  items: z.array(ClothingItemSchema),
  occasion: z.array(z.string()),
  season: z.array(z.enum(['spring', 'summer', 'fall', 'winter'])),
  createdAt: z.number(),
  updatedAt: z.number(),
  metadata: z.record(z.unknown()).optional()
});

export type Outfit = z.infer<typeof OutfitSchema>;

// Feedback types
export const FeedbackSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  targetId: z.string(), // ID of the item/outfit being rated
  targetType: z.enum(['item', 'outfit']),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number()
});

export type Feedback = z.infer<typeof FeedbackSchema>;

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// OpenAI Response types
export const OpenAIClothingAnalysisSchema = z.object({
  type: z.string(),
  subType: z.string().optional(),
  dominantColors: z.array(z.object({
    name: z.string(),
    hex: z.string(),
    rgb: z.tuple([z.number(), z.number(), z.number()])
  })),
  matchingColors: z.array(z.object({
    name: z.string(),
    hex: z.string(),
    rgb: z.tuple([z.number(), z.number(), z.number()])
  })),
  style: z.array(z.string()),
  brand: z.string().optional(),
  season: z.array(z.enum(['spring', 'summer', 'fall', 'winter'])),
  occasion: z.array(z.string()),
  suggestedOutfits: z.array(z.object({
    description: z.string(),
    items: z.array(z.string())
  })).optional()
});

export type OpenAIClothingAnalysis = z.infer<typeof OpenAIClothingAnalysisSchema>;

// Error types
export type AppError = {
  code: string;
  message: string;
  details?: unknown;
}; 