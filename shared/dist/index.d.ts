export * from './responses';
export * from './wardrobe';
export * from './user';
export type { ApiResponse, AppError, ProcessImagesResult, ProcessImagesResponse } from './responses';
import type { ClothingItem } from './wardrobe';
import type { UserProfile } from './user';
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
export declare enum ClothingCategory {
    TOPS = "tops",
    BOTTOMS = "bottoms",
    DRESSES = "dresses",
    OUTERWEAR = "outerwear",
    SHOES = "shoes",
    ACCESSORIES = "accessories"
}
export type StyleType = "Classic" | "Business Casual" | "Streetwear" | "Casual Cool" | "Edgy" | "Minimalist" | "Bold" | "Playful" | "Grunge";
export interface OutfitPiece {
    itemId: string;
    name: string;
    type: string;
    reason: string;
    dominantColors: string[];
    style: string[];
    occasion: string[];
    imageUrl: string;
}
export interface OutfitGeneratedOutfit {
    id: string;
    name: string;
    explanation: string;
    pieces: OutfitPiece[];
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
    occasion: string;
    createdAt: number;
    updatedAt: number;
}
export interface OutfitGenerationContext {
    wardrobe: ClothingItem[];
    weather: WeatherData;
    occasion: string;
    user_profile: UserProfile;
    baseItem?: ClothingItem;
    likedOutfits?: string[];
    trendingStyles?: string[];
}
export interface WeatherData {
    temperature: number;
    condition: string;
    location: string;
    humidity: number;
    wind_speed: number;
    precipitation: number;
}
