import { z } from 'zod';
export declare const WeatherDataSchema: z.ZodObject<{
    temperature: z.ZodNumber;
    condition: z.ZodString;
    location: z.ZodString;
    humidity: z.ZodNumber;
    wind_speed: z.ZodNumber;
    precipitation: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    temperature: number;
    condition: string;
    location: string;
    humidity: number;
    wind_speed: number;
    precipitation: number;
}, {
    temperature: number;
    condition: string;
    location: string;
    humidity: number;
    wind_speed: number;
    precipitation: number;
}>;
export declare const OutfitGenerationContextSchema: z.ZodObject<{
    baseItem: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "accessory", "other"]>;
        color: z.ZodString;
        season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
        imageUrl: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        style: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        userId: z.ZodString;
        dominantColors: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            hex: z.ZodString;
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
            name: z.ZodString;
            hex: z.ZodString;
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
        brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
        subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        colorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        backgroundRemoved: z.ZodOptional<z.ZodBoolean>;
        embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
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
                imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }>>;
            itemMetadata: z.ZodOptional<z.ZodObject<{
                priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }, {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        }, {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        style: string[];
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        style?: string[] | undefined;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }>>;
    wardrobe: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "accessory", "other"]>;
        color: z.ZodString;
        season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
        imageUrl: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        style: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        userId: z.ZodString;
        dominantColors: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            hex: z.ZodString;
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
            name: z.ZodString;
            hex: z.ZodString;
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
        brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
        subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        colorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        backgroundRemoved: z.ZodOptional<z.ZodBoolean>;
        embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
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
                imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }>>;
            itemMetadata: z.ZodOptional<z.ZodObject<{
                priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }, {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        }, {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        style: string[];
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        style?: string[] | undefined;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }>, "many">;
    weather: z.ZodObject<{
        temperature: z.ZodNumber;
        condition: z.ZodString;
        location: z.ZodString;
        humidity: z.ZodNumber;
        wind_speed: z.ZodNumber;
        precipitation: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        temperature: number;
        condition: string;
        location: string;
        humidity: number;
        wind_speed: number;
        precipitation: number;
    }, {
        temperature: number;
        condition: string;
        location: string;
        humidity: number;
        wind_speed: number;
        precipitation: number;
    }>;
    occasion: z.ZodString;
    userProfile: z.ZodObject<{
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
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
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
        createdAt: number;
        updatedAt: number;
        gender?: "male" | "female" | undefined;
        skinTone?: string | undefined;
        fitPreference?: "fitted" | "relaxed" | "oversized" | "loose" | undefined;
    }, {
        id: string;
        name: string;
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
        createdAt: number;
        updatedAt: number;
        gender?: "male" | "female" | undefined;
        skinTone?: string | undefined;
        fitPreference?: "fitted" | "relaxed" | "oversized" | "loose" | undefined;
    }>;
    likedOutfits: z.ZodArray<z.ZodString, "many">;
    trendingStyles: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    occasion: string;
    wardrobe: {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        style: string[];
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }[];
    weather: {
        temperature: number;
        condition: string;
        location: string;
        humidity: number;
        wind_speed: number;
        precipitation: number;
    };
    userProfile: {
        id: string;
        name: string;
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
        createdAt: number;
        updatedAt: number;
        gender?: "male" | "female" | undefined;
        skinTone?: string | undefined;
        fitPreference?: "fitted" | "relaxed" | "oversized" | "loose" | undefined;
    };
    likedOutfits: string[];
    trendingStyles: string[];
    baseItem?: {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        style: string[];
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    occasion: string;
    wardrobe: {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        style?: string[] | undefined;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }[];
    weather: {
        temperature: number;
        condition: string;
        location: string;
        humidity: number;
        wind_speed: number;
        precipitation: number;
    };
    userProfile: {
        id: string;
        name: string;
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
        createdAt: number;
        updatedAt: number;
        gender?: "male" | "female" | undefined;
        skinTone?: string | undefined;
        fitPreference?: "fitted" | "relaxed" | "oversized" | "loose" | undefined;
    };
    likedOutfits: string[];
    trendingStyles: string[];
    baseItem?: {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        style?: string[] | undefined;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
}>;
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
        style: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        userId: z.ZodString;
        dominantColors: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            hex: z.ZodString;
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
            name: z.ZodString;
            hex: z.ZodString;
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
        brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
        subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        colorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        backgroundRemoved: z.ZodOptional<z.ZodBoolean>;
        embedding: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
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
                imageHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }, {
                length?: string | null | undefined;
                material?: string | null | undefined;
                pattern?: string | null | undefined;
                textureStyle?: string | null | undefined;
                fabricWeight?: "light" | "medium" | "heavy" | null | undefined;
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            }>>;
            itemMetadata: z.ZodOptional<z.ZodObject<{
                priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }, {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        }, {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        style: string[];
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        style?: string[] | undefined;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }>, "many">;
    occasion: z.ZodArray<z.ZodString, "many">;
    season: z.ZodArray<z.ZodEnum<["spring", "summer", "fall", "winter"]>, "many">;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    createdAt: number;
    updatedAt: number;
    season: ("spring" | "summer" | "fall" | "winter")[];
    userId: string;
    occasion: string[];
    description: string;
    items: {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        style: string[];
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }[];
    id?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    name: string;
    createdAt: number;
    updatedAt: number;
    season: ("spring" | "summer" | "fall" | "winter")[];
    userId: string;
    occasion: string[];
    description: string;
    items: {
        id: string;
        name: string;
        type: "shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "accessory" | "other";
        createdAt: number;
        updatedAt: number;
        tags: string[];
        color: string;
        season: ("spring" | "summer" | "fall" | "winter")[];
        imageUrl: string;
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
        style?: string[] | undefined;
        backgroundRemoved?: boolean | undefined;
        brand?: string | null | undefined;
        subType?: string | null | undefined;
        colorName?: string | null | undefined;
        embedding?: number[] | undefined;
        metadata?: {
            basicMetadata?: {
                height?: number | null | undefined;
                width?: number | null | undefined;
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
                fit?: "oversized" | "loose" | "slim" | null | undefined;
                silhouette?: string | null | undefined;
                genderTarget?: string | null | undefined;
                sleeveLength?: string | null | undefined;
                hangerPresent?: boolean | null | undefined;
                backgroundRemoved?: boolean | null | undefined;
                wearLayer?: "outer" | "inner" | "base" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            } | undefined;
            itemMetadata?: {
                priceEstimate?: string | null | undefined;
                careInstructions?: string | null | undefined;
                tags?: string[] | undefined;
                brand?: string | null | undefined;
            } | undefined;
        } | undefined;
    }[];
    id?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type WeatherData = z.infer<typeof WeatherDataSchema>;
export type OutfitGenerationContext = z.infer<typeof OutfitGenerationContextSchema>;
export type Outfit = z.infer<typeof OutfitSchema>;
