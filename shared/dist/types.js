"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessImagesResult = exports.OutfitGeneratedOutfitSchema = exports.WeatherSchema = exports.FeedbackSchema = exports.UserProfileSchema = exports.OutfitSchema = exports.OpenAIClothingAnalysisSchema = exports.ClothingItemSchema = exports.MetadataSchema = exports.ColorAnalysisSchema = exports.BasicMetadataSchema = exports.ItemMetadataSchema = exports.VisualAttributesSchema = exports.CoreCategoryEnum = exports.WarmthFactorEnum = exports.LayerLevelEnum = exports.OutfitScoringSchema = exports.SkinToneCompatibilitySchema = exports.BodyTypeCompatibilitySchema = exports.MaterialCompatibilitySchema = exports.TemperatureCompatibilitySchema = exports.SkinToneEnum = exports.BodyTypeEnum = exports.MaterialEnum = exports.TemperatureRangeEnum = exports.ColorSchema = exports.OccasionTypeEnum = exports.StyleTagEnum = exports.SeasonEnum = exports.ClothingTypeEnum = void 0;
const zod_1 = require("zod");
// Base enums
exports.ClothingTypeEnum = zod_1.z.enum([
    'shirt',
    'dress_shirt',
    'pants',
    'shorts',
    'skirt',
    'dress',
    'jacket',
    'sweater',
    'shoes',
    'dress_shoes',
    'loafers',
    'sneakers',
    'accessory',
    'other',
    't-shirt',
    'blouse',
    'tank_top',
    'crop_top',
    'polo',
    'hoodie',
    'cardigan',
    'blazer',
    'coat',
    'vest',
    'jeans',
    'chinos',
    'slacks',
    'joggers',
    'sweatpants',
    'mini_skirt',
    'midi_skirt',
    'maxi_skirt',
    'pencil_skirt',
    'sundress',
    'cocktail_dress',
    'maxi_dress',
    'mini_dress',
    'boots',
    'sandals',
    'heels',
    'flats',
    'hat',
    'scarf',
    'belt',
    'jewelry',
    'bag',
    'watch'
]);
exports.SeasonEnum = zod_1.z.enum(['spring', 'summer', 'fall', 'winter']);
exports.StyleTagEnum = zod_1.z.enum([
    'Dark Academia',
    'Old Money',
    'Streetwear',
    'Y2K',
    'Minimalist',
    'Boho',
    'Preppy',
    'Grunge',
    'Classic',
    'Techwear',
    'Androgynous',
    'Coastal Chic',
    'Business Casual',
    'Avant-Garde',
    'Cottagecore',
    'Edgy',
    'Athleisure',
    'Casual Cool',
    'Romantic',
    'Artsy'
]);
exports.OccasionTypeEnum = zod_1.z.enum([
    'Casual',
    'Business Casual',
    'Formal',
    'Gala',
    'Party',
    'Date Night',
    'Work',
    'Interview',
    'Brunch',
    'Wedding Guest',
    'Cocktail',
    'Travel',
    'Airport',
    'Loungewear',
    'Beach',
    'Vacation',
    'Festival',
    'Rainy Day',
    'Snow Day',
    'Hot Weather',
    'Cold Weather',
    'Night Out',
    'Athletic / Gym',
    'School',
    'Holiday',
    'Concert',
    'Errands',
    'Chilly Evening',
    'Museum / Gallery',
    'First Date',
    'Business Formal',
    'Funeral / Memorial',
    'Fashion Event',
    'Outdoor Gathering'
]);
exports.ColorSchema = zod_1.z.object({
    name: zod_1.z.string(),
    hex: zod_1.z.string(),
    rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
});
// New enums for compatibility
exports.TemperatureRangeEnum = zod_1.z.enum(['very_cold', 'cold', 'cool', 'mild', 'warm', 'hot', 'very_hot']);
exports.MaterialEnum = zod_1.z.enum(['cotton', 'wool', 'silk', 'linen', 'denim', 'leather', 'synthetic', 'knit', 'fleece', 'other']);
exports.BodyTypeEnum = zod_1.z.enum(['hourglass', 'pear', 'apple', 'rectangle', 'inverted_triangle']);
exports.SkinToneEnum = zod_1.z.enum(['warm', 'cool', 'neutral']);
// New compatibility schemas
exports.TemperatureCompatibilitySchema = zod_1.z.object({
    minTemp: zod_1.z.number(),
    maxTemp: zod_1.z.number(),
    recommendedLayers: zod_1.z.array(zod_1.z.string()),
    materialPreferences: zod_1.z.array(exports.MaterialEnum)
});
exports.MaterialCompatibilitySchema = zod_1.z.object({
    compatibleMaterials: zod_1.z.array(exports.MaterialEnum),
    weatherAppropriate: zod_1.z.record(zod_1.z.array(exports.MaterialEnum))
});
exports.BodyTypeCompatibilitySchema = zod_1.z.object({
    recommendedFits: zod_1.z.record(exports.BodyTypeEnum, zod_1.z.array(zod_1.z.string())),
    styleRecommendations: zod_1.z.record(exports.BodyTypeEnum, zod_1.z.array(zod_1.z.string()))
});
exports.SkinToneCompatibilitySchema = zod_1.z.object({
    compatibleColors: zod_1.z.record(exports.SkinToneEnum, zod_1.z.array(zod_1.z.string())),
    recommendedPalettes: zod_1.z.record(exports.SkinToneEnum, zod_1.z.array(zod_1.z.string()))
});
exports.OutfitScoringSchema = zod_1.z.object({
    versatility: zod_1.z.number().min(0).max(10),
    seasonality: zod_1.z.number().min(0).max(10),
    formality: zod_1.z.number().min(0).max(10),
    trendiness: zod_1.z.number().min(0).max(10),
    quality: zod_1.z.number().min(0).max(10)
});
// New layering-specific enums
exports.LayerLevelEnum = zod_1.z.enum(['base', 'inner', 'middle', 'outer']);
exports.WarmthFactorEnum = zod_1.z.enum(['light', 'medium', 'heavy']);
exports.CoreCategoryEnum = zod_1.z.enum(['top', 'bottom', 'dress', 'outerwear', 'shoes', 'accessory']);
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
    formalLevel: zod_1.z.enum(["casual", "semi-formal", "formal"]).nullable().optional(),
    // New layering properties
    layerLevel: exports.LayerLevelEnum.optional(),
    warmthFactor: exports.WarmthFactorEnum.optional(),
    coreCategory: exports.CoreCategoryEnum.optional(),
    canLayer: zod_1.z.boolean().optional(),
    maxLayers: zod_1.z.number().min(1).max(5).optional(),
    // Add new compatibility attributes
    temperatureCompatibility: exports.TemperatureCompatibilitySchema.optional(),
    materialCompatibility: exports.MaterialCompatibilitySchema.optional(),
    bodyTypeCompatibility: exports.BodyTypeCompatibilitySchema.optional(),
    skinToneCompatibility: exports.SkinToneCompatibilitySchema.optional(),
    outfitScoring: exports.OutfitScoringSchema.optional()
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
    naturalDescription: zod_1.z.string().nullable().optional(),
    // Add new compatibility attributes
    temperatureCompatibility: exports.TemperatureCompatibilitySchema.optional(),
    materialCompatibility: exports.MaterialCompatibilitySchema.optional(),
    bodyTypeCompatibility: exports.BodyTypeCompatibilitySchema.optional(),
    skinToneCompatibility: exports.SkinToneCompatibilitySchema.optional(),
    outfitScoring: exports.OutfitScoringSchema.optional()
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
    backgroundRemoved: zod_1.z.boolean().optional(),
    favorite: zod_1.z.boolean().optional(),
    // Wear tracking fields
    wearCount: zod_1.z.number().default(0).optional(),
    lastWorn: zod_1.z.number().nullable().optional()
});
// OpenAI Analysis types
exports.OpenAIClothingAnalysisSchema = zod_1.z.object({
    type: zod_1.z.string(),
    subType: zod_1.z.string().nullable().optional(),
    name: zod_1.z.string().optional(),
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
        analysisTimestamp: zod_1.z.number().optional(),
        originalType: zod_1.z.string().optional(),
        originalSubType: zod_1.z.string().optional(),
        styleTags: zod_1.z.array(zod_1.z.string()).optional(),
        occasionTags: zod_1.z.array(zod_1.z.string()).optional(),
        colorAnalysis: zod_1.z.object({
            dominant: zod_1.z.array(zod_1.z.object({
                name: zod_1.z.string(),
                hex: zod_1.z.string(),
                rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
            })),
            matching: zod_1.z.array(zod_1.z.object({
                name: zod_1.z.string(),
                hex: zod_1.z.string(),
                rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
            }))
        }).optional(),
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
            fabricWeight: zod_1.z.string().nullable().optional(),
            fit: zod_1.z.string().nullable().optional(),
            silhouette: zod_1.z.string().nullable().optional(),
            length: zod_1.z.string().nullable().optional(),
            genderTarget: zod_1.z.string().nullable().optional(),
            sleeveLength: zod_1.z.string().nullable().optional(),
            hangerPresent: zod_1.z.boolean().nullable().optional(),
            backgroundRemoved: zod_1.z.boolean().nullable().optional(),
            wearLayer: zod_1.z.string().nullable().optional(),
            formalLevel: zod_1.z.string().nullable().optional(),
            // Enhanced analysis fields
            temperatureCompatibility: zod_1.z.object({
                minTemp: zod_1.z.number(),
                maxTemp: zod_1.z.number(),
                recommendedLayers: zod_1.z.array(zod_1.z.string()),
                materialPreferences: zod_1.z.array(zod_1.z.string())
            }).optional(),
            materialCompatibility: zod_1.z.object({
                compatibleMaterials: zod_1.z.array(zod_1.z.string()),
                weatherAppropriate: zod_1.z.object({
                    spring: zod_1.z.array(zod_1.z.string()),
                    summer: zod_1.z.array(zod_1.z.string()),
                    fall: zod_1.z.array(zod_1.z.string()),
                    winter: zod_1.z.array(zod_1.z.string())
                })
            }).optional(),
            bodyTypeCompatibility: zod_1.z.object({
                hourglass: zod_1.z.object({
                    recommendedFits: zod_1.z.array(zod_1.z.string()),
                    styleRecommendations: zod_1.z.array(zod_1.z.string())
                }),
                pear: zod_1.z.object({
                    recommendedFits: zod_1.z.array(zod_1.z.string()),
                    styleRecommendations: zod_1.z.array(zod_1.z.string())
                }),
                apple: zod_1.z.object({
                    recommendedFits: zod_1.z.array(zod_1.z.string()),
                    styleRecommendations: zod_1.z.array(zod_1.z.string())
                }),
                rectangle: zod_1.z.object({
                    recommendedFits: zod_1.z.array(zod_1.z.string()),
                    styleRecommendations: zod_1.z.array(zod_1.z.string())
                }),
                inverted_triangle: zod_1.z.object({
                    recommendedFits: zod_1.z.array(zod_1.z.string()),
                    styleRecommendations: zod_1.z.array(zod_1.z.string())
                })
            }).optional(),
            skinToneCompatibility: zod_1.z.object({
                warm: zod_1.z.object({
                    compatibleColors: zod_1.z.array(zod_1.z.string()),
                    recommendedColorPalette: zod_1.z.array(zod_1.z.string())
                }),
                cool: zod_1.z.object({
                    compatibleColors: zod_1.z.array(zod_1.z.string()),
                    recommendedColorPalette: zod_1.z.array(zod_1.z.string())
                }),
                neutral: zod_1.z.object({
                    compatibleColors: zod_1.z.array(zod_1.z.string()),
                    recommendedColorPalette: zod_1.z.array(zod_1.z.string())
                })
            }).optional()
        }).optional(),
        itemMetadata: zod_1.z.object({
            priceEstimate: zod_1.z.string().nullable().optional(),
            careInstructions: zod_1.z.string().nullable().optional(),
            tags: zod_1.z.array(zod_1.z.string()).optional()
        }).optional(),
        naturalDescription: zod_1.z.string().nullable().optional(),
        // Enhanced analysis metadata
        clipAnalysis: zod_1.z.object({
            primaryStyle: zod_1.z.string().nullable().optional(),
            styleConfidence: zod_1.z.number().optional(),
            topStyles: zod_1.z.array(zod_1.z.string()).optional(),
            styleBreakdown: zod_1.z.record(zod_1.z.number()).optional(),
            analysisMethod: zod_1.z.string().optional()
        }).nullable().optional(),
        confidenceScores: zod_1.z.object({
            styleAnalysis: zod_1.z.number(),
            gptAnalysis: zod_1.z.number(),
            overallConfidence: zod_1.z.number()
        }).optional(),
        styleCompatibility: zod_1.z.object({
            primaryStyle: zod_1.z.string().nullable().optional(),
            compatibleStyles: zod_1.z.array(zod_1.z.string()),
            avoidStyles: zod_1.z.array(zod_1.z.string()),
            styleNotes: zod_1.z.string()
        }).optional(),
        enhancedStyles: zod_1.z.array(zod_1.z.string()).optional(),
        enhancedOccasions: zod_1.z.array(zod_1.z.string()).optional(),
        enhancedColorAnalysis: zod_1.z.object({
            dominant: zod_1.z.array(zod_1.z.object({
                name: zod_1.z.string(),
                hex: zod_1.z.string(),
                rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
            })),
            matching: zod_1.z.array(zod_1.z.object({
                name: zod_1.z.string(),
                hex: zod_1.z.string(),
                rgb: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number(), zod_1.z.number()])
            }))
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
exports.OutfitGeneratedOutfitSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    items: zod_1.z.array(zod_1.z.union([zod_1.z.string(), exports.ClothingItemSchema])),
    occasion: zod_1.z.string(),
    season: zod_1.z.string(),
    style: zod_1.z.string(),
    styleTags: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number(),
    // NEW: Add validation and warning fields
    wasSuccessful: zod_1.z.boolean().optional(),
    validationErrors: zod_1.z.array(zod_1.z.string()).optional(),
    warnings: zod_1.z.array(zod_1.z.string()).optional(),
    validation_details: zod_1.z.object({
        errors: zod_1.z.array(zod_1.z.string()).optional(),
        warnings: zod_1.z.array(zod_1.z.string()).optional(),
        fixes: zod_1.z.array(zod_1.z.object({
            method: zod_1.z.string(),
            original_error: zod_1.z.string(),
            applied: zod_1.z.boolean()
        })).optional()
    }).optional(),
    metadata: zod_1.z.object({
        colorHarmony: zod_1.z.string().optional(),
        styleNotes: zod_1.z.string().optional(),
        feedback: zod_1.z.string().optional(),
        // NEW: Add validation metadata
        validation_summary: zod_1.z.object({
            total_errors: zod_1.z.number().optional(),
            total_warnings: zod_1.z.number().optional(),
            success_rate: zod_1.z.number().optional()
        }).optional()
    }).optional()
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
