import { z } from 'zod';
export declare const UserProfileSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    gender: z.ZodOptional<z.ZodEnum<["male", "female"]>>;
    preferences: z.ZodObject<{
        style: z.ZodArray<z.ZodString, "many">;
        colors: z.ZodArray<z.ZodString, "many">;
        occasions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        style: string[];
        colors: string[];
        occasions: string[];
    }, {
        style: string[];
        colors: string[];
        occasions: string[];
    }>;
    measurements: z.ZodObject<{
        height: z.ZodNumber;
        weight: z.ZodNumber;
        bodyType: z.ZodString;
        skinTone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        height: number;
        weight: number;
        bodyType: string;
        skinTone?: string | undefined;
    }, {
        height: number;
        weight: number;
        bodyType: string;
        skinTone?: string | undefined;
    }>;
    stylePreferences: z.ZodArray<z.ZodString, "many">;
    bodyType: z.ZodString;
    skinTone: z.ZodOptional<z.ZodString>;
    fitPreference: z.ZodOptional<z.ZodEnum<["fitted", "relaxed", "oversized", "loose"]>>;
    favoriteColors: z.ZodArray<z.ZodString, "many">;
    favoriteSeasons: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    email: string;
    preferences: {
        style: string[];
        colors: string[];
        occasions: string[];
    };
    measurements: {
        height: number;
        weight: number;
        bodyType: string;
        skinTone?: string | undefined;
    };
    bodyType: string;
    stylePreferences: string[];
    favoriteColors: string[];
    favoriteSeasons: string[];
    gender?: "male" | "female" | undefined;
    skinTone?: string | undefined;
    fitPreference?: "fitted" | "relaxed" | "oversized" | "loose" | undefined;
}, {
    name: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    email: string;
    preferences: {
        style: string[];
        colors: string[];
        occasions: string[];
    };
    measurements: {
        height: number;
        weight: number;
        bodyType: string;
        skinTone?: string | undefined;
    };
    bodyType: string;
    stylePreferences: string[];
    favoriteColors: string[];
    favoriteSeasons: string[];
    gender?: "male" | "female" | undefined;
    skinTone?: string | undefined;
    fitPreference?: "fitted" | "relaxed" | "oversized" | "loose" | undefined;
}>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
