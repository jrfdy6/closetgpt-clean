"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitSchema = exports.OutfitGenerationContextSchema = exports.WeatherDataSchema = void 0;
const zod_1 = require("zod");
const wardrobe_1 = require("./wardrobe");
exports.WeatherDataSchema = zod_1.z.object({
    temperature: zod_1.z.number(),
    condition: zod_1.z.string(),
    location: zod_1.z.string(),
    humidity: zod_1.z.number(),
    wind_speed: zod_1.z.number(),
    precipitation: zod_1.z.number()
});
exports.OutfitGenerationContextSchema = zod_1.z.object({
    baseItem: wardrobe_1.ClothingItemSchema.optional(),
    wardrobe: zod_1.z.array(wardrobe_1.ClothingItemSchema),
    weather: exports.WeatherDataSchema,
    occasion: zod_1.z.string(),
    userProfile: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        gender: zod_1.z.enum(["male", "female"]).optional(),
        preferences: zod_1.z.object({
            style: zod_1.z.array(zod_1.z.string()),
            colors: zod_1.z.array(zod_1.z.string()),
            occasions: zod_1.z.array(zod_1.z.string()),
        }),
        measurements: zod_1.z.object({
            height: zod_1.z.number(),
            weight: zod_1.z.number(),
            bodyType: zod_1.z.string(),
            skinTone: zod_1.z.string().optional(),
        }),
        stylePreferences: zod_1.z.array(zod_1.z.string()),
        bodyType: zod_1.z.string(),
        skinTone: zod_1.z.string().optional(),
        fitPreference: zod_1.z.enum(["fitted", "relaxed", "oversized", "loose"]).optional(),
        createdAt: zod_1.z.number(),
        updatedAt: zod_1.z.number(),
    }),
    likedOutfits: zod_1.z.array(zod_1.z.string()),
    trendingStyles: zod_1.z.array(zod_1.z.string())
});
exports.OutfitSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    userId: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    items: zod_1.z.array(wardrobe_1.ClothingItemSchema),
    occasion: zod_1.z.array(zod_1.z.string()),
    season: zod_1.z.array(zod_1.z.enum(['spring', 'summer', 'fall', 'winter'])),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
