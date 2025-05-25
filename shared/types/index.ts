export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClothingItem {
  id: string;
  userId: string;
  name: string;
  category: ClothingCategory;
  color: string;
  material: string;
  brand?: string;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Outfit {
  id: string;
  userId: string;
  name: string;
  description: string;
  items: ClothingItem[];
  occasion?: string;
  season?: string;
  tags: string[];
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

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  message: string;
} 