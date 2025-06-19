"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessImagesResult = exports.OutfitGeneratedOutfitSchema = exports.OutfitPieceSchema = exports.WeatherSchema = exports.FeedbackSchema = exports.UserProfileSchema = exports.OutfitSchema = exports.OpenAIClothingAnalysisSchema = exports.ClothingItemSchema = exports.MetadataSchema = exports.ColorAnalysisSchema = exports.BasicMetadataSchema = exports.ItemMetadataSchema = exports.VisualAttributesSchema = exports.ColorSchema = exports.StyleTagEnum = exports.SeasonEnum = exports.ClothingTypeEnum = void 0;
const zod_1 = require("zod");
// Base enums
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
exports.SeasonEnum = zod_1.z.enum(['spring', 'summer', 'fall', 'winter']);
exports.StyleTagEnum = zod_1.z.enum([
    'Casual',
    'Formal',
    'Business',
    'Sports',
    'Trendy',
    'Vintage',
    'Statement',
    'Smart Casual'
]);
exports.ColorSchema = zod_1.z.object({
    name: zod_1.z.string(),
    hex: zod_1.z.string(),
    rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
});
// Metadata schemas
exports.VisualAttributesSchema = zod_1.z.object({
    material: zod_1.z.string().nullable().optional(),
    pattern: zod_1.z.string().nullable().optional(),
    textureStyle: zod_1.z.string().nullable().optional(),
    fabricWeight: zod_1.z.enum(["light", "medium", "heavy"]).nullable().optional(),
    fit: zod_1.z.enum(["slim", "loose", "oversized"]).nullable().optional(),
    silhouette: zod_1.z.string().nullable().optional(),
    length: zod_1.z.string().nullable().optional(),
    genderTarget: zod_1.z.string().nullable().optional(),
    sleeveLength: zod_1.z.string().nullable().optional(),
    hangerPresent: zod_1.z.boolean().nullable().optional(),
    backgroundRemoved: zod_1.z.boolean().nullable().optional(),
    wearLayer: zod_1.z.enum(["inner", "outer", "base"]).nullable().optional(),
    formalLevel: zod_1.z.enum(["casual", "semi-formal", "formal"]).nullable().optional()
});
exports.ItemMetadataSchema = zod_1.z.object({
    priceEstimate: zod_1.z.number().nullable().optional(),
    careInstructions: zod_1.z.string().nullable().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    brand: zod_1.z.string().nullable().optional()
});
exports.BasicMetadataSchema = zod_1.z.object({
    width: zod_1.z.number().nullable().optional(),
    height: zod_1.z.number().nullable().optional(),
    orientation: zod_1.z.string().nullable().optional(),
    dateTaken: zod_1.z.string().nullable().optional(),
    deviceModel: zod_1.z.string().nullable().optional(),
    gps: zod_1.z.object({
        latitude: zod_1.z.number(),
        longitude: zod_1.z.number()
    }).nullable().optional(),
    flashUsed: zod_1.z.boolean().nullable().optional(),
    imageHash: zod_1.z.string().nullable().optional()
});
exports.ColorAnalysisSchema = zod_1.z.object({
    dominant: zod_1.z.array(exports.ColorSchema),
    matching: zod_1.z.array(exports.ColorSchema)
});
exports.MetadataSchema = zod_1.z.object({
    originalType: zod_1.z.string(),
    analysisTimestamp: zod_1.z.number(),
    basicMetadata: exports.BasicMetadataSchema.optional(),
    visualAttributes: exports.VisualAttributesSchema.optional(),
    itemMetadata: exports.ItemMetadataSchema.optional(),
    colorAnalysis: exports.ColorAnalysisSchema,
    naturalDescription: zod_1.z.string().nullable().optional()
});
// Clothing item types
exports.ClothingItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: exports.ClothingTypeEnum,
    color: zod_1.z.string(),
    season: zod_1.z.array(exports.SeasonEnum),
    imageUrl: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    style: zod_1.z.array(zod_1.z.string()),
    userId: zod_1.z.string(),
    dominantColors: zod_1.z.array(exports.ColorSchema),
    matchingColors: zod_1.z.array(exports.ColorSchema),
    occasion: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number(),
    subType: zod_1.z.string().nullable().optional(),
    brand: zod_1.z.string().nullable().optional(),
    colorName: zod_1.z.string().nullable().optional(),
    metadata: exports.MetadataSchema.optional(),
    embedding: zod_1.z.array(zod_1.z.number()).optional(),
    backgroundRemoved: zod_1.z.boolean().optional()
});
// OpenAI Analysis types
exports.OpenAIClothingAnalysisSchema = zod_1.z.object({
    type: zod_1.z.string(),
    subType: zod_1.z.string().nullable().optional(),
    dominantColors: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        hex: zod_1.z.string(),
        rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
    })),
    matchingColors: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        hex: zod_1.z.string(),
        rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
    })),
    style: zod_1.z.array(zod_1.z.string()),
    brand: zod_1.z.string().nullable().optional(),
    season: zod_1.z.array(zod_1.z.enum(['spring', 'summer', 'fall', 'winter'])),
    occasion: zod_1.z.array(zod_1.z.string()),
    suggestedOutfits: zod_1.z.array(zod_1.z.object({
        description: zod_1.z.string(),
        items: zod_1.z.array(zod_1.z.string())
    })).optional(),
    metadata: zod_1.z.object({
        basicMetadata: zod_1.z.object({
            width: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform(val => typeof val === 'string' ? parseInt(val, 10) : val).nullable().optional(),
            height: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform(val => typeof val === 'string' ? parseInt(val, 10) : val).nullable().optional(),
            orientation: zod_1.z.string().nullable().optional(),
            dateTaken: zod_1.z.string().nullable().optional(),
            deviceModel: zod_1.z.string().nullable().optional(),
            gps: zod_1.z.object({
                latitude: zod_1.z.number(),
                longitude: zod_1.z.number()
            }).nullable().optional(),
            flashUsed: zod_1.z.boolean().nullable().optional()
        }).optional(),
        visualAttributes: zod_1.z.object({
            material: zod_1.z.string().nullable().optional(),
            pattern: zod_1.z.string().nullable().optional(),
            textureStyle: zod_1.z.string().nullable().optional(),
            fabricWeight: zod_1.z.string().transform(val => {
                if (!val)
                    return null;
                const valLower = val.toLowerCase();
                return valLower === 'light' || valLower === 'medium' || valLower === 'heavy' ? valLower : null;
            }).nullable().optional(),
            fit: zod_1.z.string().transform(val => {
                if (!val)
                    return null;
                const valLower = val.toLowerCase();
                if (valLower === 'standard' || valLower === 'regular')
                    return 'slim';
                return valLower === 'loose' || valLower === 'slim' || valLower === 'oversized' ? valLower : null;
            }).nullable().optional(),
            silhouette: zod_1.z.string().nullable().optional(),
            length: zod_1.z.string().nullable().optional(),
            genderTarget: zod_1.z.string().transform(val => {
                if (!val)
                    return null;
                const valLower = val.toLowerCase();
                return valLower === 'men' || valLower === 'women' || valLower === 'unisex' ? valLower : null;
            }).nullable().optional(),
            sleeveLength: zod_1.z.string().nullable().optional(),
            hangerPresent: zod_1.z.boolean().nullable().optional(),
            backgroundRemoved: zod_1.z.boolean().nullable().optional(),
            wearLayer: zod_1.z.string().transform(val => {
                if (!val)
                    return null;
                const valLower = val.toLowerCase();
                return valLower === 'inner' || valLower === 'outer' || valLower === 'base' ? valLower : null;
            }).nullable().optional(),
            formalLevel: zod_1.z.string().transform(val => {
                if (!val)
                    return null;
                const valLower = val.toLowerCase();
                return valLower === 'casual' || valLower === 'semi-formal' || valLower === 'formal' ? valLower : null;
            }).nullable().optional()
        }).optional(),
        itemMetadata: zod_1.z.object({
            priceEstimate: zod_1.z.number().nullable().optional(),
            careInstructions: zod_1.z.string().nullable().optional(),
            tags: zod_1.z.array(zod_1.z.string()).optional()
        }).optional()
    }).optional()
});
// Outfit types
exports.OutfitSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    userId: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    items: zod_1.z.array(exports.ClothingItemSchema),
    occasion: zod_1.z.array(zod_1.z.string()),
    season: zod_1.z.array(zod_1.z.enum(['spring', 'summer', 'fall', 'winter'])),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
// User Profile types
exports.UserProfileSchema = zod_1.z.object({
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
    sizePreference: zod_1.z.enum(["XS", "S", "M", "L", "XL", "XXL", "Custom"]).optional(),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number(),
});
// Feedback types
exports.FeedbackSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    userId: zod_1.z.string(),
    targetId: zod_1.z.string(), // ID of the item/outfit being rated
    targetType: zod_1.z.enum(['item', 'outfit']),
    rating: zod_1.z.number().min(1).max(5),
    comment: zod_1.z.string().optional(),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number()
});
// Weather types
exports.WeatherSchema = zod_1.z.object({
    temperature: zod_1.z.number(),
    condition: zod_1.z.string(),
    humidity: zod_1.z.number(),
    windSpeed: zod_1.z.number(),
    location: zod_1.z.string(),
    timestamp: zod_1.z.number(),
});
// Generated Outfit types
exports.OutfitPieceSchema = zod_1.z.object({
    itemId: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    reason: zod_1.z.string(),
    dominantColors: zod_1.z.array(zod_1.z.string()),
    style: zod_1.z.array(zod_1.z.string()),
    occasion: zod_1.z.array(zod_1.z.string()),
    imageUrl: zod_1.z.string()
});
exports.OutfitGeneratedOutfitSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    explanation: zod_1.z.string(),
    pieces: zod_1.z.array(exports.OutfitPieceSchema),
    styleTags: zod_1.z.array(zod_1.z.string()),
    colorHarmony: zod_1.z.string(),
    styleNotes: zod_1.z.string(),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number()
});
exports.ProcessImagesResult = zod_1.z.object({
    success: zod_1.z.boolean(),
    error: zod_1.z.string().optional(),
    data: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.enum(["shirt", "pants", "shorts", "dress", "skirt", "jacket", "sweater", "shoes", "accessory", "other"]),
        color: zod_1.z.string(),
        season: zod_1.z.array(zod_1.z.enum(["spring", "summer", "fall", "winter"])),
        imageUrl: zod_1.z.string(),
        tags: zod_1.z.array(zod_1.z.string()),
        style: zod_1.z.array(zod_1.z.string()),
        userId: zod_1.z.string(),
        dominantColors: zod_1.z.array(zod_1.z.object({
            hex: zod_1.z.string(),
            name: zod_1.z.string(),
            rgb: zod_1.z.array(zod_1.z.number())
        })),
        matchingColors: zod_1.z.array(zod_1.z.object({
            hex: zod_1.z.string(),
            name: zod_1.z.string(),
            rgb: zod_1.z.array(zod_1.z.number())
        })),
        occasion: zod_1.z.array(zod_1.z.string()),
        createdAt: zod_1.z.number(),
        updatedAt: zod_1.z.number(),
        subType: zod_1.z.string().nullable().optional(),
        brand: zod_1.z.string().nullable().optional(),
        colorName: zod_1.z.string().nullable().optional(),
        metadata: zod_1.z.object({
            basicMetadata: zod_1.z.object({
                width: zod_1.z.number().nullable().optional(),
                height: zod_1.z.number().nullable().optional(),
                orientation: zod_1.z.string().nullable().optional(),
                dateTaken: zod_1.z.string().nullable().optional(),
                deviceModel: zod_1.z.string().nullable().optional(),
                gps: zod_1.z.object({
                    latitude: zod_1.z.number(),
                    longitude: zod_1.z.number()
                }).nullable().optional(),
                flashUsed: zod_1.z.boolean().nullable().optional()
            }).optional(),
            visualAttributes: zod_1.z.object({
                material: zod_1.z.string().nullable().optional(),
                pattern: zod_1.z.string().nullable().optional(),
                textureStyle: zod_1.z.string().nullable().optional(),
                fabricWeight: zod_1.z.enum(["light", "medium", "heavy"]).nullable().optional(),
                fit: zod_1.z.enum(["slim", "loose", "oversized"]).nullable().optional(),
                silhouette: zod_1.z.string().nullable().optional(),
                length: zod_1.z.string().nullable().optional(),
                genderTarget: zod_1.z.enum(["men", "women", "unisex"]).nullable().optional(),
                sleeveLength: zod_1.z.string().nullable().optional(),
                hangerPresent: zod_1.z.boolean().nullable().optional(),
                backgroundRemoved: zod_1.z.boolean().nullable().optional(),
                wearLayer: zod_1.z.enum(["inner", "outer", "base"]).nullable().optional(),
                formalLevel: zod_1.z.enum(["casual", "semi-formal", "formal"]).nullable().optional()
            }).optional(),
            itemMetadata: zod_1.z.object({
                priceEstimate: zod_1.z.number().nullable().optional(),
                careInstructions: zod_1.z.string().nullable().optional(),
                tags: zod_1.z.array(zod_1.z.string()).optional()
            }).optional()
        }).optional(),
        embedding: zod_1.z.array(zod_1.z.number()).optional(),
        backgroundRemoved: zod_1.z.boolean().optional()
    })).optional()
});
