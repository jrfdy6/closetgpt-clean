"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIClothingAnalysisSchema = exports.OutfitGeneratedOutfitSchema = exports.OutfitSchema = exports.ClothingItemSchema = exports.ClothingTypeEnum = exports.StyleTagEnum = exports.SeasonEnum = exports.MetadataSchema = exports.ColorAnalysisSchema = exports.BasicMetadataSchema = exports.ItemMetadataSchema = exports.VisualAttributesSchema = exports.ColorSchema = void 0;
const zod_1 = require("zod");
// Basic schemas
exports.ColorSchema = zod_1.z.object({
    name: zod_1.z.string(),
    hex: zod_1.z.string(),
    rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
});
exports.VisualAttributesSchema = zod_1.z.object({
    material: zod_1.z.string().optional(),
    fit: zod_1.z.string().optional(),
    pattern: zod_1.z.string().optional()
});
exports.ItemMetadataSchema = zod_1.z.object({
    visualAttributes: exports.VisualAttributesSchema.optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    care: zod_1.z.array(zod_1.z.string()).optional()
});
exports.BasicMetadataSchema = zod_1.z.object({
    brand: zod_1.z.string().optional(),
    material: zod_1.z.string().optional(),
    pattern: zod_1.z.string().optional(),
    fit: zod_1.z.string().optional()
});
exports.ColorAnalysisSchema = zod_1.z.object({
    dominant: zod_1.z.array(zod_1.z.string()).optional(),
    matching: zod_1.z.array(zod_1.z.string()).optional()
});
exports.MetadataSchema = zod_1.z.object({
    ...exports.BasicMetadataSchema.shape,
    colorAnalysis: exports.ColorAnalysisSchema.optional()
});
// Enums
exports.SeasonEnum = zod_1.z.enum(['spring', 'summer', 'fall', 'winter']);
exports.StyleTagEnum = zod_1.z.enum([
    'classic',
    'casual',
    'formal',
    'sporty',
    'bohemian',
    'minimalist',
    'vintage',
    'streetwear',
    'business',
    'elegant'
]);
exports.ClothingTypeEnum = zod_1.z.enum([
    'shirt',
    'pants',
    'shorts',
    'skirt',
    'dress',
    'jacket',
    'sweater',
    'shoes',
    'accessory',
    'other'
]);
// Complex schemas
exports.ClothingItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    color: zod_1.z.string(),
    style: zod_1.z.array(zod_1.z.string()),
    occasion: zod_1.z.array(zod_1.z.string()),
    material: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string(),
    metadata: exports.ItemMetadataSchema,
    dominantColors: zod_1.z.array(exports.ColorSchema).optional(),
    matchingColors: zod_1.z.array(exports.ColorSchema).optional(),
    embedding: zod_1.z.array(zod_1.z.number()).optional()
});
exports.OutfitSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    items: zod_1.z.array(exports.ClothingItemSchema),
    occasion: zod_1.z.string(),
    season: zod_1.z.string(),
    style: zod_1.z.string(),
    styleTags: zod_1.z.array(zod_1.z.string()),
    colorHarmony: zod_1.z.string(),
    styleNotes: zod_1.z.string(),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number()
});
exports.OutfitGeneratedOutfitSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    explanation: zod_1.z.string(),
    pieces: zod_1.z.array(zod_1.z.object({
        itemId: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.string(),
        reason: zod_1.z.string(),
        dominantColors: zod_1.z.array(zod_1.z.string()),
        style: zod_1.z.array(zod_1.z.string()),
        occasion: zod_1.z.array(zod_1.z.string()),
        imageUrl: zod_1.z.string()
    })),
    styleTags: zod_1.z.array(zod_1.z.string()),
    colorHarmony: zod_1.z.string(),
    styleNotes: zod_1.z.string(),
    occasion: zod_1.z.string(),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number()
});
exports.OpenAIClothingAnalysisSchema = zod_1.z.object({
    itemId: zod_1.z.string(),
    analysis: zod_1.z.object({
        style: zod_1.z.array(zod_1.z.string()),
        occasion: zod_1.z.array(zod_1.z.string()),
        colors: zod_1.z.array(zod_1.z.string()),
        materials: zod_1.z.array(zod_1.z.string()),
        patterns: zod_1.z.array(zod_1.z.string()),
        fit: zod_1.z.string(),
        season: zod_1.z.array(zod_1.z.string()),
        notes: zod_1.z.string()
    })
});
