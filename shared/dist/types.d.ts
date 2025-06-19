import { z } from 'zod';
export type UserId = string;
export type ImageUrl = string;
export type Timestamp = number;
export declare const ClothingTypeEnum: z.ZodEnum<["shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "accessory", "other"]>;
export declare const SeasonEnum: z.ZodEnum<["spring", "summer", "fall", "winter"]>;
export declare const StyleTagEnum: z.ZodEnum<["Casual", "Formal", "Business", "Sports", "Trendy", "Vintage", "Statement", "Smart Casual"]>;
export type Color = {
    name: string;
    hex: string;
    rgb: [number, number, number];
};
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
    material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    textureStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodEnum<["light", "medium", "heavy"]>>>;
    fit: z.ZodOptional<z.ZodNullable<z.ZodEnum<["slim", "loose", "oversized"]>>>;
    silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    genderTarget: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    wearLayer: z.ZodOptional<z.ZodNullable<z.ZodEnum<["inner", "outer", "base"]>>>;
    formalLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<["casual", "semi-formal", "formal"]>>>;
}, "strip", z.ZodTypeAny, {
    length?: string | null | undefined;
    material?: string | null | undefined;
    pattern?: string | null | undefined;
    textureStyle?: string | null | undefined;
    fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
    fit?: "slim" | "loose" | "oversized" | null | undefined;
    silhouette?: string | null | undefined;
    genderTarget?: string | null | undefined;
    sleeveLength?: string | null | undefined;
    hangerPresent?: boolean | null | undefined;
    backgroundRemoved?: boolean | null | undefined;
    wearLayer?: "inner" | "outer" | "base" | null | undefined;
    formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
}, {
    length?: string | null | undefined;
    material?: string | null | undefined;
    pattern?: string | null | undefined;
    textureStyle?: string | null | undefined;
    fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
    fit?: "slim" | "loose" | "oversized" | null | undefined;
    silhouette?: string | null | undefined;
    genderTarget?: string | null | undefined;
    sleeveLength?: string | null | undefined;
    hangerPresent?: boolean | null | undefined;
    backgroundRemoved?: boolean | null | undefined;
    wearLayer?: "inner" | "outer" | "base" | null | undefined;
    formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
}>;
export declare const ItemMetadataSchema: z.ZodObject<{
    priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    priceEstimate?: number | null | undefined;
    careInstructions?: string | null | undefined;
    tags?: string[] | undefined;
    brand?: string | null | undefined;
}, {
    priceEstimate?: number | null | undefined;
    careInstructions?: string | null | undefined;
    tags?: string[] | undefined;
    brand?: string | null | undefined;
}>;
export declare const BasicMetadataSchema: z.ZodObject<{
    width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    orientation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dateTaken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deviceModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gps: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>>>;
    flashUsed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    width?: number | null | undefined;
    height?: number | null | undefined;
    orientation?: string | null | undefined;
    dateTaken?: string | null | undefined;
    deviceModel?: string | null | undefined;
    gps?: {
        latitude: number;
        longitude: number;
    } | null | undefined;
    flashUsed?: boolean | null | undefined;
    imageHash?: string | null | undefined;
}, {
    width?: number | null | undefined;
    height?: number | null | undefined;
    orientation?: string | null | undefined;
    dateTaken?: string | null | undefined;
    deviceModel?: string | null | undefined;
    gps?: {
        latitude: number;
        longitude: number;
    } | null | undefined;
    flashUsed?: boolean | null | undefined;
    imageHash?: string | null | undefined;
}>;
export declare const ColorAnalysisSchema: z.ZodObject<{
    dominant: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    matching: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    dominant: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    matching: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
}, {
    dominant: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    matching: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
}>;
export declare const MetadataSchema: z.ZodObject<{
    originalType: z.ZodString;
    analysisTimestamp: z.ZodNumber;
    basicMetadata: z.ZodOptional<z.ZodObject<{
        width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        orientation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        dateTaken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        deviceModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        gps: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>>;
        flashUsed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        width?: number | null | undefined;
        height?: number | null | undefined;
        orientation?: string | null | undefined;
        dateTaken?: string | null | undefined;
        deviceModel?: string | null | undefined;
        gps?: {
            latitude: number;
            longitude: number;
        } | null | undefined;
        flashUsed?: boolean | null | undefined;
        imageHash?: string | null | undefined;
    }, {
        width?: number | null | undefined;
        height?: number | null | undefined;
        orientation?: string | null | undefined;
        dateTaken?: string | null | undefined;
        deviceModel?: string | null | undefined;
        gps?: {
            latitude: number;
            longitude: number;
        } | null | undefined;
        flashUsed?: boolean | null | undefined;
        imageHash?: string | null | undefined;
    }>>;
    visualAttributes: z.ZodOptional<z.ZodObject<{
        material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        textureStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodEnum<["light", "medium", "heavy"]>>>;
        fit: z.ZodOptional<z.ZodNullable<z.ZodEnum<["slim", "loose", "oversized"]>>>;
        silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        genderTarget: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        wearLayer: z.ZodOptional<z.ZodNullable<z.ZodEnum<["inner", "outer", "base"]>>>;
        formalLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<["casual", "semi-formal", "formal"]>>>;
    }, "strip", z.ZodTypeAny, {
        length?: string | null | undefined;
        material?: string | null | undefined;
        pattern?: string | null | undefined;
        textureStyle?: string | null | undefined;
        fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
        fit?: "slim" | "loose" | "oversized" | null | undefined;
        silhouette?: string | null | undefined;
        genderTarget?: string | null | undefined;
        sleeveLength?: string | null | undefined;
        hangerPresent?: boolean | null | undefined;
        backgroundRemoved?: boolean | null | undefined;
        wearLayer?: "inner" | "outer" | "base" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
    }, {
        length?: string | null | undefined;
        material?: string | null | undefined;
        pattern?: string | null | undefined;
        textureStyle?: string | null | undefined;
        fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
        fit?: "slim" | "loose" | "oversized" | null | undefined;
        silhouette?: string | null | undefined;
        genderTarget?: string | null | undefined;
        sleeveLength?: string | null | undefined;
        hangerPresent?: boolean | null | undefined;
        backgroundRemoved?: boolean | null | undefined;
        wearLayer?: "inner" | "outer" | "base" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
    }>>;
    itemMetadata: z.ZodOptional<z.ZodObject<{
        priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        priceEstimate?: number | null | undefined;
        careInstructions?: string | null | undefined;
        tags?: string[] | undefined;
        brand?: string | null | undefined;
    }, {
        priceEstimate?: number | null | undefined;
        careInstructions?: string | null | undefined;
        tags?: string[] | undefined;
        brand?: string | null | undefined;
    }>>;
    colorAnalysis: z.ZodObject<{
        dominant: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
        matching: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        dominant: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matching: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
    }, {
        dominant: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matching: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
    }>;
    naturalDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    originalType: string;
    analysisTimestamp: number;
    colorAnalysis: {
        dominant: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matching: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
    };
    basicMetadata?: {
        width?: number | null | undefined;
        height?: number | null | undefined;
        orientation?: string | null | undefined;
        dateTaken?: string | null | undefined;
        deviceModel?: string | null | undefined;
        gps?: {
            latitude: number;
            longitude: number;
        } | null | undefined;
        flashUsed?: boolean | null | undefined;
        imageHash?: string | null | undefined;
    } | undefined;
    visualAttributes?: {
        length?: string | null | undefined;
        material?: string | null | undefined;
        pattern?: string | null | undefined;
        textureStyle?: string | null | undefined;
        fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
        fit?: "slim" | "loose" | "oversized" | null | undefined;
        silhouette?: string | null | undefined;
        genderTarget?: string | null | undefined;
        sleeveLength?: string | null | undefined;
        hangerPresent?: boolean | null | undefined;
        backgroundRemoved?: boolean | null | undefined;
        wearLayer?: "inner" | "outer" | "base" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
    } | undefined;
    itemMetadata?: {
        priceEstimate?: number | null | undefined;
        careInstructions?: string | null | undefined;
        tags?: string[] | undefined;
        brand?: string | null | undefined;
    } | undefined;
    naturalDescription?: string | null | undefined;
}, {
    originalType: string;
    analysisTimestamp: number;
    colorAnalysis: {
        dominant: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matching: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
    };
    basicMetadata?: {
        width?: number | null | undefined;
        height?: number | null | undefined;
        orientation?: string | null | undefined;
        dateTaken?: string | null | undefined;
        deviceModel?: string | null | undefined;
        gps?: {
            latitude: number;
            longitude: number;
        } | null | undefined;
        flashUsed?: boolean | null | undefined;
        imageHash?: string | null | undefined;
    } | undefined;
    visualAttributes?: {
        length?: string | null | undefined;
        material?: string | null | undefined;
        pattern?: string | null | undefined;
        textureStyle?: string | null | undefined;
        fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
        fit?: "slim" | "loose" | "oversized" | null | undefined;
        silhouette?: string | null | undefined;
        genderTarget?: string | null | undefined;
        sleeveLength?: string | null | undefined;
        hangerPresent?: boolean | null | undefined;
        backgroundRemoved?: boolean | null | undefined;
        wearLayer?: "inner" | "outer" | "base" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
    } | undefined;
    itemMetadata?: {
        priceEstimate?: number | null | undefined;
        careInstructions?: string | null | undefined;
        tags?: string[] | undefined;
        brand?: string | null | undefined;
    } | undefined;
    naturalDescription?: string | null | undefined;
}>;
export declare const ClothingItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "accessory", "other"]>;
    color: z.ZodString;
    season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
    imageUrl: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
    style: z.ZodArray<z.ZodString, "many">;
    userId: z.ZodString;
    dominantColors: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    matchingColors: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    occasion: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    colorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodObject<{
        originalType: z.ZodString;
        analysisTimestamp: z.ZodNumber;
        basicMetadata: z.ZodOptional<z.ZodObject<{
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            orientation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            dateTaken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            deviceModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            gps: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>>;
            flashUsed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
            imageHash?: string | null | undefined;
        }, {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
            imageHash?: string | null | undefined;
        }>>;
        visualAttributes: z.ZodOptional<z.ZodObject<{
            material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            textureStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodEnum<["light", "medium", "heavy"]>>>;
            fit: z.ZodOptional<z.ZodNullable<z.ZodEnum<["slim", "loose", "oversized"]>>>;
            silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            genderTarget: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            wearLayer: z.ZodOptional<z.ZodNullable<z.ZodEnum<["inner", "outer", "base"]>>>;
            formalLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<["casual", "semi-formal", "formal"]>>>;
        }, "strip", z.ZodTypeAny, {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        }, {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        }>>;
        itemMetadata: z.ZodOptional<z.ZodObject<{
            priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
            brand?: string | null | undefined;
        }, {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
            brand?: string | null | undefined;
        }>>;
        colorAnalysis: z.ZodObject<{
            dominant: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
            matching: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            dominant: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
            matching: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
        }, {
            dominant: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
            matching: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
        }>;
        naturalDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        originalType: string;
        analysisTimestamp: number;
        colorAnalysis: {
            dominant: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
            matching: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
        };
        basicMetadata?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
            imageHash?: string | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
            brand?: string | null | undefined;
        } | undefined;
        naturalDescription?: string | null | undefined;
    }, {
        originalType: string;
        analysisTimestamp: number;
        colorAnalysis: {
            dominant: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
            matching: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
        };
        basicMetadata?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
            imageHash?: string | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
            brand?: string | null | undefined;
        } | undefined;
        naturalDescription?: string | null | undefined;
    }>>;
    embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    backgroundRemoved: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
    tags: string[];
    id: string;
    color: string;
    season: ("spring" | "summer" | "fall" | "winter")[];
    imageUrl: string;
    style: string[];
    userId: string;
    dominantColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    matchingColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    occasion: string[];
    createdAt: number;
    updatedAt: number;
    backgroundRemoved?: boolean | undefined;
    brand?: string | null | undefined;
    subType?: string | null | undefined;
    colorName?: string | null | undefined;
    metadata?: {
        originalType: string;
        analysisTimestamp: number;
        colorAnalysis: {
            dominant: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
            matching: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
        };
        basicMetadata?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
            imageHash?: string | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
            brand?: string | null | undefined;
        } | undefined;
        naturalDescription?: string | null | undefined;
    } | undefined;
    embedding?: number[] | undefined;
}, {
    name: string;
    type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
    tags: string[];
    id: string;
    color: string;
    season: ("spring" | "summer" | "fall" | "winter")[];
    imageUrl: string;
    style: string[];
    userId: string;
    dominantColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    matchingColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    occasion: string[];
    createdAt: number;
    updatedAt: number;
    backgroundRemoved?: boolean | undefined;
    brand?: string | null | undefined;
    subType?: string | null | undefined;
    colorName?: string | null | undefined;
    metadata?: {
        originalType: string;
        analysisTimestamp: number;
        colorAnalysis: {
            dominant: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
            matching: {
                name: string;
                hex: string;
                rgb: [number, number, number];
            }[];
        };
        basicMetadata?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
            imageHash?: string | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
            brand?: string | null | undefined;
        } | undefined;
        naturalDescription?: string | null | undefined;
    } | undefined;
    embedding?: number[] | undefined;
}>;
export type Season = z.infer<typeof SeasonEnum>;
export type StyleTag = z.infer<typeof StyleTagEnum>;
export type VisualAttributes = z.infer<typeof VisualAttributesSchema>;
export type ItemMetadata = z.infer<typeof ItemMetadataSchema>;
export type BasicMetadata = z.infer<typeof BasicMetadataSchema>;
export type ColorAnalysis = z.infer<typeof ColorAnalysisSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type ClothingItem = z.infer<typeof ClothingItemSchema>;
export declare const OpenAIClothingAnalysisSchema: z.ZodObject<{
    type: z.ZodString;
    subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dominantColors: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    matchingColors: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    style: z.ZodArray<z.ZodString, "many">;
    brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
    occasion: z.ZodArray<z.ZodString, "many">;
    suggestedOutfits: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        items: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        description: string;
        items: string[];
    }, {
        description: string;
        items: string[];
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodObject<{
        basicMetadata: z.ZodOptional<z.ZodObject<{
            width: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, number, string | number>>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, number, string | number>>>;
            orientation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            dateTaken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            deviceModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            gps: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>>;
            flashUsed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
        }, {
            width?: string | number | null | undefined;
            height?: string | number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
        }>>;
        visualAttributes: z.ZodOptional<z.ZodObject<{
            material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            textureStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, "light" | "medium" | "heavy" | null, string>>>;
            fit: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, "slim" | "loose" | "oversized" | null, string>>>;
            silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            genderTarget: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, "men" | "women" | "unisex" | null, string>>>;
            sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            wearLayer: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, "inner" | "outer" | "base" | null, string>>>;
            formalLevel: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, "casual" | "semi-formal" | "formal" | null, string>>>;
        }, "strip", z.ZodTypeAny, {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: "men" | "women" | "unisex" | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        }, {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: string | null | undefined;
            fit?: string | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: string | null | undefined;
            formalLevel?: string | null | undefined;
        }>>;
        itemMetadata: z.ZodOptional<z.ZodObject<{
            priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        }, {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        basicMetadata?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: "men" | "women" | "unisex" | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
    }, {
        basicMetadata?: {
            width?: string | number | null | undefined;
            height?: string | number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: string | null | undefined;
            fit?: string | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: string | null | undefined;
            formalLevel?: string | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    season: ("spring" | "summer" | "fall" | "winter")[];
    style: string[];
    dominantColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    matchingColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    occasion: string[];
    brand?: string | null | undefined;
    subType?: string | null | undefined;
    metadata?: {
        basicMetadata?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
            fit?: "slim" | "loose" | "oversized" | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: "men" | "women" | "unisex" | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: "inner" | "outer" | "base" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
    } | undefined;
    suggestedOutfits?: {
        description: string;
        items: string[];
    }[] | undefined;
}, {
    type: string;
    season: ("spring" | "summer" | "fall" | "winter")[];
    style: string[];
    dominantColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    matchingColors: {
        name: string;
        hex: string;
        rgb: [number, number, number];
    }[];
    occasion: string[];
    brand?: string | null | undefined;
    subType?: string | null | undefined;
    metadata?: {
        basicMetadata?: {
            width?: string | number | null | undefined;
            height?: string | number | null | undefined;
            orientation?: string | null | undefined;
            dateTaken?: string | null | undefined;
            deviceModel?: string | null | undefined;
            gps?: {
                latitude: number;
                longitude: number;
            } | null | undefined;
            flashUsed?: boolean | null | undefined;
        } | undefined;
        visualAttributes?: {
            length?: string | null | undefined;
            material?: string | null | undefined;
            pattern?: string | null | undefined;
            textureStyle?: string | null | undefined;
            fabricWeight?: string | null | undefined;
            fit?: string | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: string | null | undefined;
            formalLevel?: string | null | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: number | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
    } | undefined;
    suggestedOutfits?: {
        description: string;
        items: string[];
    }[] | undefined;
}>;
export type OpenAIClothingAnalysis = z.infer<typeof OpenAIClothingAnalysisSchema>;
export declare const OutfitSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "accessory", "other"]>;
        color: z.ZodString;
        season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
        imageUrl: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        style: z.ZodArray<z.ZodString, "many">;
        userId: z.ZodString;
        dominantColors: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
        matchingColors: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
        occasion: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
        subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        colorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodObject<{
            originalType: z.ZodString;
            analysisTimestamp: z.ZodNumber;
            basicMetadata: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                orientation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                dateTaken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                deviceModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                gps: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    latitude: number;
                    longitude: number;
                }, {
                    latitude: number;
                    longitude: number;
                }>>>;
                flashUsed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            }, {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            }>>;
            visualAttributes: z.ZodOptional<z.ZodObject<{
                material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                textureStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodEnum<["light", "medium", "heavy"]>>>;
                fit: z.ZodOptional<z.ZodNullable<z.ZodEnum<["slim", "loose", "oversized"]>>>;
                silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                genderTarget: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                wearLayer: z.ZodOptional<z.ZodNullable<z.ZodEnum<["inner", "outer", "base"]>>>;
                formalLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<["casual", "semi-formal", "formal"]>>>;
            }, "strip", z.ZodTypeAny, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }>>;
            itemMetadata: z.ZodOptional<z.ZodObject<{
                priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }, {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }>>;
            colorAnalysis: z.ZodObject<{
                dominant: z.ZodArray<z.ZodObject<{
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
                }>, "many">;
                matching: z.ZodArray<z.ZodObject<{
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
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            }, {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            }>;
            naturalDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            originalType: string;
            analysisTimestamp: number;
            colorAnalysis: {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            };
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
            naturalDescription?: string | null | undefined;
        }, {
            originalType: string;
            analysisTimestamp: number;
            colorAnalysis: {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            };
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
            naturalDescription?: string | null | undefined;
        }>>;
        embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        backgroundRemoved: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            originalType: string;
            analysisTimestamp: number;
            colorAnalysis: {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            };
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
            naturalDescription?: string | null | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }, {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            originalType: string;
            analysisTimestamp: number;
            colorAnalysis: {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            };
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
            naturalDescription?: string | null | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }>, "many">;
    occasion: z.ZodArray<z.ZodString, "many">;
    season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    season: ("spring" | "summer" | "fall" | "winter")[];
    userId: string;
    occasion: string[];
    createdAt: number;
    updatedAt: number;
    description: string;
    items: {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            originalType: string;
            analysisTimestamp: number;
            colorAnalysis: {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            };
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
            naturalDescription?: string | null | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }[];
    id?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    name: string;
    season: ("spring" | "summer" | "fall" | "winter")[];
    userId: string;
    occasion: string[];
    createdAt: number;
    updatedAt: number;
    description: string;
    items: {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: [number, number, number];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            originalType: string;
            analysisTimestamp: number;
            colorAnalysis: {
                dominant: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
                matching: {
                    name: string;
                    hex: string;
                    rgb: [number, number, number];
                }[];
            };
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
                imageHash?: string | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
            naturalDescription?: string | null | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }[];
    id?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type Outfit = z.infer<typeof OutfitSchema>;
export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};
export type AppError = {
    code: string;
    message: string;
    details?: unknown;
};
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
    sizePreference: z.ZodOptional<z.ZodEnum<["XS", "S", "M", "L", "XL", "XXL", "Custom"]>>;
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
    gender?: "male" | "female" | undefined;
    skinTone?: string | undefined;
    fitPreference?: "loose" | "oversized" | "fitted" | "relaxed" | undefined;
    sizePreference?: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom" | undefined;
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
    gender?: "male" | "female" | undefined;
    skinTone?: string | undefined;
    fitPreference?: "loose" | "oversized" | "fitted" | "relaxed" | undefined;
    sizePreference?: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom" | undefined;
}>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export declare const FeedbackSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    targetId: z.ZodString;
    targetType: z.ZodEnum<["item", "outfit"]>;
    rating: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: string;
    createdAt: number;
    updatedAt: number;
    targetId: string;
    targetType: "item" | "outfit";
    rating: number;
    id?: string | undefined;
    comment?: string | undefined;
}, {
    userId: string;
    createdAt: number;
    updatedAt: number;
    targetId: string;
    targetType: "item" | "outfit";
    rating: number;
    id?: string | undefined;
    comment?: string | undefined;
}>;
export type Feedback = z.infer<typeof FeedbackSchema>;
export declare const WeatherSchema: z.ZodObject<{
    temperature: z.ZodNumber;
    condition: z.ZodString;
    humidity: z.ZodNumber;
    windSpeed: z.ZodNumber;
    location: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    location: string;
    timestamp: number;
}, {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    location: string;
    timestamp: number;
}>;
export type Weather = z.infer<typeof WeatherSchema>;
export declare const OutfitPieceSchema: z.ZodObject<{
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
    imageUrl: string;
    style: string[];
    dominantColors: string[];
    occasion: string[];
    itemId: string;
    reason: string;
}, {
    name: string;
    type: string;
    imageUrl: string;
    style: string[];
    dominantColors: string[];
    occasion: string[];
    itemId: string;
    reason: string;
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
        imageUrl: string;
        style: string[];
        dominantColors: string[];
        occasion: string[];
        itemId: string;
        reason: string;
    }, {
        name: string;
        type: string;
        imageUrl: string;
        style: string[];
        dominantColors: string[];
        occasion: string[];
        itemId: string;
        reason: string;
    }>, "many">;
    styleTags: z.ZodArray<z.ZodString, "many">;
    colorHarmony: z.ZodString;
    styleNotes: z.ZodString;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    explanation: string;
    pieces: {
        name: string;
        type: string;
        imageUrl: string;
        style: string[];
        dominantColors: string[];
        occasion: string[];
        itemId: string;
        reason: string;
    }[];
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
}, {
    name: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    explanation: string;
    pieces: {
        name: string;
        type: string;
        imageUrl: string;
        style: string[];
        dominantColors: string[];
        occasion: string[];
        itemId: string;
        reason: string;
    }[];
    styleTags: string[];
    colorHarmony: string;
    styleNotes: string;
}>;
export type OutfitGeneratedOutfit = z.infer<typeof OutfitGeneratedOutfitSchema>;
export declare const ProcessImagesResult: z.ZodObject<{
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["shirt", "pants", "shorts", "dress", "skirt", "jacket", "sweater", "shoes", "accessory", "other"]>;
        color: z.ZodString;
        season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
        imageUrl: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        style: z.ZodArray<z.ZodString, "many">;
        userId: z.ZodString;
        dominantColors: z.ZodArray<z.ZodObject<{
            hex: z.ZodString;
            name: z.ZodString;
            rgb: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            hex: string;
            rgb: number[];
        }, {
            name: string;
            hex: string;
            rgb: number[];
        }>, "many">;
        matchingColors: z.ZodArray<z.ZodObject<{
            hex: z.ZodString;
            name: z.ZodString;
            rgb: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            hex: string;
            rgb: number[];
        }, {
            name: string;
            hex: string;
            rgb: number[];
        }>, "many">;
        occasion: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
        subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        colorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodObject<{
            basicMetadata: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                orientation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                dateTaken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                deviceModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                gps: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    latitude: number;
                    longitude: number;
                }, {
                    latitude: number;
                    longitude: number;
                }>>>;
                flashUsed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, "strip", z.ZodTypeAny, {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            }, {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            }>>;
            visualAttributes: z.ZodOptional<z.ZodObject<{
                material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                textureStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodEnum<["light", "medium", "heavy"]>>>;
                fit: z.ZodOptional<z.ZodNullable<z.ZodEnum<["slim", "loose", "oversized"]>>>;
                silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                genderTarget: z.ZodOptional<z.ZodNullable<z.ZodEnum<["men", "women", "unisex"]>>>;
                sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                wearLayer: z.ZodOptional<z.ZodNullable<z.ZodEnum<["inner", "outer", "base"]>>>;
                formalLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<["casual", "semi-formal", "formal"]>>>;
            }, "strip", z.ZodTypeAny, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }>>;
            itemMetadata: z.ZodOptional<z.ZodObject<{
                priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            }, {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            } | undefined;
        }, {
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            } | undefined;
        }>>;
        embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        backgroundRemoved: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            } | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }, {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            } | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: string | undefined;
    data?: {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            } | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }[] | undefined;
}, {
    success: boolean;
    error?: string | undefined;
    data?: {
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        tags: string[];
        id: string;
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
        style: string[];
        userId: string;
        dominantColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        matchingColors: {
            name: string;
            hex: string;
            rgb: number[];
        }[];
        occasion: string[];
        createdAt: number;
        updatedAt: number;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        metadata?: {
            basicMetadata?: {
                width?: number | null | undefined;
                height?: number | null | undefined;
                orientation?: string | null | undefined;
                dateTaken?: string | null | undefined;
                deviceModel?: string | null | undefined;
                gps?: {
                    latitude: number;
                    longitude: number;
                } | null | undefined;
                flashUsed?: boolean | null | undefined;
            } | undefined;
            visualAttributes?: {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "slim" | "loose" | "oversized" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: "men" | "women" | "unisex" | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "inner" | "outer" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: number | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
            } | undefined;
        } | undefined;
        embedding?: number[] | undefined;
    }[] | undefined;
}>;
export type OutfitPiece = z.infer<typeof OutfitPieceSchema>;
