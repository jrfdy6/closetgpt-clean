import { z } from 'zod';
export declare const ColorSchema: z.ZodObject<{
    name: z.ZodString;
    hex: z.ZodString;
    rgb: z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
}, "strip", z.ZodTypeAny, {
    name: string;
    hex: string;
    rgb: [number, number, number];
}, {
    name: string;
    hex: string;
    rgb: [number, number, number];
}>;
export declare const VisualAttributesSchema: z.ZodObject<{
    material: z.ZodOptional<z.ZodString>;
    fit: z.ZodOptional<z.ZodString>;
    pattern: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    material?: string | undefined;
    fit?: string | undefined;
    pattern?: string | undefined;
}, {
    material?: string | undefined;
    fit?: string | undefined;
    pattern?: string | undefined;
}>;
export declare const ItemMetadataSchema: z.ZodObject<{
    visualAttributes: z.ZodOptional<z.ZodObject<{
        material: z.ZodOptional<z.ZodString>;
        fit: z.ZodOptional<z.ZodString>;
        pattern: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        material?: string | undefined;
        fit?: string | undefined;
        pattern?: string | undefined;
    }, {
        material?: string | undefined;
        fit?: string | undefined;
        pattern?: string | undefined;
    }>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    care: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    visualAttributes?: {
        material?: string | undefined;
        fit?: string | undefined;
        pattern?: string | undefined;
    } | undefined;
    tags?: string[] | undefined;
    care?: string[] | undefined;
}, {
    visualAttributes?: {
        material?: string | undefined;
        fit?: string | undefined;
        pattern?: string | undefined;
    } | undefined;
    tags?: string[] | undefined;
    care?: string[] | undefined;
}>;
export declare const BasicMetadataSchema: z.ZodObject<{
    brand: z.ZodOptional<z.ZodString>;
    material: z.ZodOptional<z.ZodString>;
    pattern: z.ZodOptional<z.ZodString>;
    fit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    material?: string | undefined;
    fit?: string | undefined;
    pattern?: string | undefined;
    brand?: string | undefined;
}, {
    material?: string | undefined;
    fit?: string | undefined;
    pattern?: string | undefined;
    brand?: string | undefined;
}>;
export declare const ColorAnalysisSchema: z.ZodObject<{
    dominant: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    matching: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    dominant?: string[] | undefined;
    matching?: string[] | undefined;
}, {
    dominant?: string[] | undefined;
    matching?: string[] | undefined;
}>;
export declare const MetadataSchema: z.ZodObject<{
    colorAnalysis: z.ZodOptional<z.ZodObject<{
        dominant: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        matching: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        dominant?: string[] | undefined;
        matching?: string[] | undefined;
    }, {
        dominant?: string[] | undefined;
        matching?: string[] | undefined;
    }>>;
    brand: z.ZodOptional<z.ZodString>;
    material: z.ZodOptional<z.ZodString>;
    pattern: z.ZodOptional<z.ZodString>;
    fit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    material?: string | undefined;
    fit?: string | undefined;
    pattern?: string | undefined;
    brand?: string | undefined;
    colorAnalysis?: {
        dominant?: string[] | undefined;
        matching?: string[] | undefined;
    } | undefined;
}, {
    material?: string | undefined;
    fit?: string | undefined;
    pattern?: string | undefined;
    brand?: string | undefined;
    colorAnalysis?: {
        dominant?: string[] | undefined;
        matching?: string[] | undefined;
    } | undefined;
}>;
export declare const SeasonEnum: z.ZodEnum<["spring", "summer", "fall", "winter"]>;
export declare const StyleTagEnum: z.ZodEnum<["classic", "casual", "formal", "sporty", "bohemian", "minimalist", "vintage", "streetwear", "business", "elegant"]>;
export declare const ClothingTypeEnum: z.ZodEnum<["shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "accessory", "other"]>;
export declare const ClothingItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodString;
    color: z.ZodString;
    style: z.ZodArray<z.ZodString, "many">;
    occasion: z.ZodArray<z.ZodString, "many">;
    material: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodString;
    metadata: z.ZodObject<{
        visualAttributes: z.ZodOptional<z.ZodObject<{
            material: z.ZodOptional<z.ZodString>;
            fit: z.ZodOptional<z.ZodString>;
            pattern: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            material?: string | undefined;
            fit?: string | undefined;
            pattern?: string | undefined;
        }, {
            material?: string | undefined;
            fit?: string | undefined;
            pattern?: string | undefined;
        }>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        care: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        visualAttributes?: {
            material?: string | undefined;
            fit?: string | undefined;
            pattern?: string | undefined;
        } | undefined;
        tags?: string[] | undefined;
        care?: string[] | undefined;
    }, {
        visualAttributes?: {
            material?: string | undefined;
            fit?: string | undefined;
            pattern?: string | undefined;
        } | undefined;
        tags?: string[] | undefined;
        care?: string[] | undefined;
    }>;
    dominantColors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        hex: z.ZodString;
        rgb: z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }, {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }>, "many">>;
    matchingColors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        hex: z.ZodString;
        rgb: z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }, {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }>, "many">>;
    embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: string;
    id: string;
    color: string;
    style: string[];
    occasion: string[];
    imageUrl: string;
    metadata: {
        visualAttributes?: {
            material?: string | undefined;
            fit?: string | undefined;
            pattern?: string | undefined;
        } | undefined;
        tags?: string[] | undefined;
        care?: string[] | undefined;
    };
    material?: string | undefined;
    dominantColors?: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[] | undefined;
    matchingColors?: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[] | undefined;
    embedding?: number[] | undefined;
}, {
    name: string;
    type: string;
    id: string;
    color: string;
    style: string[];
    occasion: string[];
    imageUrl: string;
    metadata: {
        visualAttributes?: {
            material?: string | undefined;
            fit?: string | undefined;
            pattern?: string | undefined;
        } | undefined;
        tags?: string[] | undefined;
        care?: string[] | undefined;
    };
    material?: string | undefined;
    dominantColors?: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[] | undefined;
    matchingColors?: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[] | undefined;
    embedding?: number[] | undefined;
}>;
export declare const OutfitSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodString;
        color: z.ZodString;
        style: z.ZodArray<z.ZodString, "many">;
        occasion: z.ZodArray<z.ZodString, "many">;
        material: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodString;
        metadata: z.ZodObject<{
            visualAttributes: z.ZodOptional<z.ZodObject<{
                material: z.ZodOptional<z.ZodString>;
                fit: z.ZodOptional<z.ZodString>;
                pattern: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            }, {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            }>>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            care: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            visualAttributes?: {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            } | undefined;
            tags?: string[] | undefined;
            care?: string[] | undefined;
        }, {
            visualAttributes?: {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            } | undefined;
            tags?: string[] | undefined;
            care?: string[] | undefined;
        }>;
        dominantColors: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            hex: z.ZodString;
            rgb: z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }, {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }>, "many">>;
        matchingColors: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            hex: z.ZodString;
            rgb: z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }, {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }>, "many">>;
        embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: string;
        id: string;
        color: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        metadata: {
            visualAttributes?: {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            } | undefined;
            tags?: string[] | undefined;
            care?: string[] | undefined;
        };
        material?: string | undefined;
        dominantColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        matchingColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        embedding?: number[] | undefined;
    }, {
        name: string;
        type: string;
        id: string;
        color: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        metadata: {
            visualAttributes?: {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            } | undefined;
            tags?: string[] | undefined;
            care?: string[] | undefined;
        };
        material?: string | undefined;
        dominantColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        matchingColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        embedding?: number[] | undefined;
    }>, "many">;
    occasion: z.ZodString;
    season: z.ZodString;
    style: z.ZodString;
    styleTags: z.ZodArray<z.ZodString, "many">;
    colorHarmony: z.ZodString;
    styleNotes: z.ZodString;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    style: string;
    occasion: string;
    description: string;
    items: {
        name: string;
        type: string;
        id: string;
        color: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        metadata: {
            visualAttributes?: {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            } | undefined;
            tags?: string[] | undefined;
            care?: string[] | undefined;
        };
        material?: string | undefined;
        dominantColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        matchingColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        embedding?: number[] | undefined;
    }[];
    season: string;
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
    createdAt: number;
    updatedAt: number;
}, {
    name: string;
    id: string;
    style: string;
    occasion: string;
    description: string;
    items: {
        name: string;
        type: string;
        id: string;
        color: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        metadata: {
            visualAttributes?: {
                material?: string | undefined;
                fit?: string | undefined;
                pattern?: string | undefined;
            } | undefined;
            tags?: string[] | undefined;
            care?: string[] | undefined;
        };
        material?: string | undefined;
        dominantColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        matchingColors?: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[] | undefined;
        embedding?: number[] | undefined;
    }[];
    season: string;
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
    createdAt: number;
    updatedAt: number;
}>;
export declare const OutfitGeneratedOutfitSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    explanation: z.ZodString;
    pieces: z.ZodArray<z.ZodObject<{
        itemId: z.ZodString;
        name: z.ZodString;
        type: z.ZodString;
        reason: z.ZodString;
        dominantColors: z.ZodArray<z.ZodString, "many">;
        style: z.ZodArray<z.ZodString, "many">;
        occasion: z.ZodArray<z.ZodString, "many">;
        imageUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        dominantColors: string[];
        itemId: string;
        reason: string;
    }, {
        name: string;
        type: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        dominantColors: string[];
        itemId: string;
        reason: string;
    }>, "many">;
    styleTags: z.ZodArray<z.ZodString, "many">;
    colorHarmony: z.ZodString;
    styleNotes: z.ZodString;
    occasion: z.ZodString;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    occasion: string;
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
    createdAt: number;
    updatedAt: number;
    explanation: string;
    pieces: {
        name: string;
        type: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        dominantColors: string[];
        itemId: string;
        reason: string;
    }[];
}, {
    name: string;
    id: string;
    occasion: string;
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
    createdAt: number;
    updatedAt: number;
    explanation: string;
    pieces: {
        name: string;
        type: string;
        style: string[];
        occasion: string[];
        imageUrl: string;
        dominantColors: string[];
        itemId: string;
        reason: string;
    }[];
}>;
export declare const OpenAIClothingAnalysisSchema: z.ZodObject<{
    itemId: z.ZodString;
    analysis: z.ZodObject<{
        style: z.ZodArray<z.ZodString, "many">;
        occasion: z.ZodArray<z.ZodString, "many">;
        colors: z.ZodArray<z.ZodString, "many">;
        materials: z.ZodArray<z.ZodString, "many">;
        patterns: z.ZodArray<z.ZodString, "many">;
        fit: z.ZodString;
        season: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fit: string;
        style: string[];
        occasion: string[];
        season: string[];
        colors: string[];
        materials: string[];
        patterns: string[];
        notes: string;
    }, {
        fit: string;
        style: string[];
        occasion: string[];
        season: string[];
        colors: string[];
        materials: string[];
        patterns: string[];
        notes: string;
    }>;
}, "strip", z.ZodTypeAny, {
    itemId: string;
    analysis: {
        fit: string;
        style: string[];
        occasion: string[];
        season: string[];
        colors: string[];
        materials: string[];
        patterns: string[];
        notes: string;
    };
}, {
    itemId: string;
    analysis: {
        fit: string;
        style: string[];
        occasion: string[];
        season: string[];
        colors: string[];
        materials: string[];
        patterns: string[];
        notes: string;
    };
}>;
