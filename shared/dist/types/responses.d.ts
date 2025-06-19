import { ClothingItem } from './wardrobe';
export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    error?: string;
    message?: string;
};
export type AppError = {
    code: string;
    message: string;
    details?: unknown;
};
export type ProcessImagesResult = {
    newItems: ClothingItem[];
    duplicates: string[];
    similarImages: Array<{
        file: File;
        existingItem: ClothingItem;
        similarity: number;
    }>;
};
export type ProcessImagesResponse = ApiResponse<ProcessImagesResult>;
export type WardrobeItemResponse = ApiResponse<ClothingItem>;
export type WardrobeItemsResponse = ApiResponse<ClothingItem[]>;
export type ImageAnalysisResult = {
    name: string;
    type: string;
    color: string;
    seasons: string[];
    tags: string[];
    occasion: string[];
};
export type ImageAnalysisResponse = ApiResponse<ImageAnalysisResult>;
export type SuccessResponse<T> = {
    success: true;
    data: T;
    message?: string;
    error?: never;
};
export type ErrorResponse = {
    success: false;
    data: null;
    error: string;
    message?: never;
};
export declare function isSuccessResponse<T>(response: ApiResponse<T>): response is SuccessResponse<T>;
export declare function isErrorResponse<T>(response: ApiResponse<T>): response is ErrorResponse;
