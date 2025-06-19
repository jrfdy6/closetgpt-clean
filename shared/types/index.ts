// Export responses
export * from './responses';

// Export wardrobe types
export {
  ClothingItemSchema,
  OutfitSchema,
  OutfitGeneratedOutfitSchema,
  OpenAIClothingAnalysisSchema,
  UserProfileSchema,
  ColorSchema,
  VisualAttributesSchema,
  ItemMetadataSchema,
  BasicMetadataSchema,
  ColorAnalysisSchema,
  MetadataSchema,
  SeasonEnum,
  StyleTagEnum,
  ClothingTypeEnum
} from './wardrobe';

export type {
  ClothingItem,
  Outfit,
  OutfitGeneratedOutfit,
  OpenAIClothingAnalysis,
  Color,
  VisualAttributes,
  ItemMetadata,
  BasicMetadata,
  ColorAnalysis,
  Metadata,
  Season,
  StyleTag,
  ClothingType
} from './wardrobe';

// Export user types
export {
  UserProfileSchema
} from './user';

export type {
  UserProfile
} from './user';

// Export outfit types
export {
  OutfitSchema
} from './outfit';

export type {
  Outfit
} from './outfit';

// Re-export common types
export type { 
  ApiResponse, 
  AppError,
  ProcessImagesResult,
  ProcessImagesResponse
} from './responses';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StyleProfile {
  userId: string;
  preferences: {
    colors: string[];
    styles: string[];
    occasions: string[];
  };
  measurements: {
    height: number;
    weight: number;
    bodyType: string;
  };
}

export enum ClothingCategory {
  TOPS = 'tops',
  BOTTOMS = 'bottoms',
  DRESSES = 'dresses',
  OUTERWEAR = 'outerwear',
  SHOES = 'shoes',
  ACCESSORIES = 'accessories',
} 