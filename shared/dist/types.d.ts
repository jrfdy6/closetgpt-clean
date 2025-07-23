import { z } from 'zod';
export type UserId = string;
export type ImageUrl = string;
export type Timestamp = number;
export declare const ClothingTypeEnum: z.ZodEnum<["shirt", "dress_shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "dress_shoes", "loafers", "sneakers", "accessory", "other", "t-shirt", "blouse", "tank_top", "crop_top", "polo", "hoodie", "cardigan", "blazer", "coat", "vest", "jeans", "chinos", "slacks", "joggers", "sweatpants", "mini_skirt", "midi_skirt", "maxi_skirt", "pencil_skirt", "sundress", "cocktail_dress", "maxi_dress", "mini_dress", "boots", "sandals", "heels", "flats", "hat", "scarf", "belt", "jewelry", "bag", "watch"]>;
export declare const SeasonEnum: z.ZodEnum<["spring", "summer", "fall", "winter"]>;
export declare const StyleTagEnum: z.ZodEnum<["Dark Academia", "Old Money", "Streetwear", "Y2K", "Minimalist", "Boho", "Preppy", "Grunge", "Classic", "Techwear", "Androgynous", "Coastal Chic", "Business Casual", "Avant-Garde", "Cottagecore", "Edgy", "Athleisure", "Casual Cool", "Romantic", "Artsy"]>;
export declare const OccasionTypeEnum: z.ZodEnum<["Casual", "Business Casual", "Formal", "Gala", "Party", "Date Night", "Work", "Interview", "Brunch", "Wedding Guest", "Cocktail", "Travel", "Airport", "Loungewear", "Beach", "Vacation", "Festival", "Rainy Day", "Snow Day", "Hot Weather", "Cold Weather", "Night Out", "Athletic / Gym", "School", "Holiday", "Concert", "Errands", "Chilly Evening", "Museum / Gallery", "First Date", "Business Formal", "Funeral / Memorial", "Fashion Event", "Outdoor Gathering"]>;
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
export declare const TemperatureRangeEnum: z.ZodEnum<["very_cold", "cold", "cool", "mild", "warm", "hot", "very_hot"]>;
export declare const MaterialEnum: z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>;
export declare const BodyTypeEnum: z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>;
export declare const SkinToneEnum: z.ZodEnum<["warm", "cool", "neutral"]>;
export declare const TemperatureCompatibilitySchema: z.ZodObject<{
    minTemp: z.ZodNumber;
    maxTemp: z.ZodNumber;
    recommendedLayers: z.ZodArray<z.ZodString, "many">;
    materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
}, "strip", z.ZodTypeAny, {
    minTemp: number;
    maxTemp: number;
    recommendedLayers: string[];
    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
}, {
    minTemp: number;
    maxTemp: number;
    recommendedLayers: string[];
    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
}>;
export declare const MaterialCompatibilitySchema: z.ZodObject<{
    compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
    weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
}, "strip", z.ZodTypeAny, {
    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
}, {
    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
}>;
export declare const BodyTypeCompatibilitySchema: z.ZodObject<{
    recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
    styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
}, {
    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
}>;
export declare const SkinToneCompatibilitySchema: z.ZodObject<{
    compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
    recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
}, {
    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
}>;
export declare const OutfitScoringSchema: z.ZodObject<{
    versatility: z.ZodNumber;
    seasonality: z.ZodNumber;
    formality: z.ZodNumber;
    trendiness: z.ZodNumber;
    quality: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    versatility: number;
    seasonality: number;
    formality: number;
    trendiness: number;
    quality: number;
}, {
    versatility: number;
    seasonality: number;
    formality: number;
    trendiness: number;
    quality: number;
}>;
export declare const LayerLevelEnum: z.ZodEnum<["base", "inner", "middle", "outer"]>;
export declare const WarmthFactorEnum: z.ZodEnum<["light", "medium", "heavy"]>;
export declare const CoreCategoryEnum: z.ZodEnum<["top", "bottom", "dress", "outerwear", "shoes", "accessory"]>;
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
    layerLevel: z.ZodOptional<z.ZodEnum<["base", "inner", "middle", "outer"]>>;
    warmthFactor: z.ZodOptional<z.ZodEnum<["light", "medium", "heavy"]>>;
    coreCategory: z.ZodOptional<z.ZodEnum<["top", "bottom", "dress", "outerwear", "shoes", "accessory"]>>;
    canLayer: z.ZodOptional<z.ZodBoolean>;
    maxLayers: z.ZodOptional<z.ZodNumber>;
    temperatureCompatibility: z.ZodOptional<z.ZodObject<{
        minTemp: z.ZodNumber;
        maxTemp: z.ZodNumber;
        recommendedLayers: z.ZodArray<z.ZodString, "many">;
        materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    }, {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    }>>;
    materialCompatibility: z.ZodOptional<z.ZodObject<{
        compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
        weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    }, {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    }>>;
    bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
        recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
        styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    }, {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    }>>;
    skinToneCompatibility: z.ZodOptional<z.ZodObject<{
        compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
        recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    }, {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    }>>;
    outfitScoring: z.ZodOptional<z.ZodObject<{
        versatility: z.ZodNumber;
        seasonality: z.ZodNumber;
        formality: z.ZodNumber;
        trendiness: z.ZodNumber;
        quality: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    }, {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    }>>;
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
    wearLayer?: "base" | "inner" | "outer" | null | undefined;
    formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
    layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
    warmthFactor?: "light" | "medium" | "heavy" | undefined;
    coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
    canLayer?: boolean | undefined;
    maxLayers?: number | undefined;
    temperatureCompatibility?: {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    } | undefined;
    materialCompatibility?: {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    } | undefined;
    bodyTypeCompatibility?: {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    } | undefined;
    skinToneCompatibility?: {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    } | undefined;
    outfitScoring?: {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    } | undefined;
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
    wearLayer?: "base" | "inner" | "outer" | null | undefined;
    formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
    layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
    warmthFactor?: "light" | "medium" | "heavy" | undefined;
    coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
    canLayer?: boolean | undefined;
    maxLayers?: number | undefined;
    temperatureCompatibility?: {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    } | undefined;
    materialCompatibility?: {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    } | undefined;
    bodyTypeCompatibility?: {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    } | undefined;
    skinToneCompatibility?: {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    } | undefined;
    outfitScoring?: {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    } | undefined;
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
        layerLevel: z.ZodOptional<z.ZodEnum<["base", "inner", "middle", "outer"]>>;
        warmthFactor: z.ZodOptional<z.ZodEnum<["light", "medium", "heavy"]>>;
        coreCategory: z.ZodOptional<z.ZodEnum<["top", "bottom", "dress", "outerwear", "shoes", "accessory"]>>;
        canLayer: z.ZodOptional<z.ZodBoolean>;
        maxLayers: z.ZodOptional<z.ZodNumber>;
        temperatureCompatibility: z.ZodOptional<z.ZodObject<{
            minTemp: z.ZodNumber;
            maxTemp: z.ZodNumber;
            recommendedLayers: z.ZodArray<z.ZodString, "many">;
            materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        }, {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        }>>;
        materialCompatibility: z.ZodOptional<z.ZodObject<{
            compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
            weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
        }, "strip", z.ZodTypeAny, {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        }, {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        }>>;
        bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
            recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
            styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        }, {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        }>>;
        skinToneCompatibility: z.ZodOptional<z.ZodObject<{
            compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
            recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        }, {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        }>>;
        outfitScoring: z.ZodOptional<z.ZodObject<{
            versatility: z.ZodNumber;
            seasonality: z.ZodNumber;
            formality: z.ZodNumber;
            trendiness: z.ZodNumber;
            quality: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        }, {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        }>>;
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
        wearLayer?: "base" | "inner" | "outer" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
        warmthFactor?: "light" | "medium" | "heavy" | undefined;
        coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
        canLayer?: boolean | undefined;
        maxLayers?: number | undefined;
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
        wearLayer?: "base" | "inner" | "outer" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
        warmthFactor?: "light" | "medium" | "heavy" | undefined;
        coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
        canLayer?: boolean | undefined;
        maxLayers?: number | undefined;
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
    temperatureCompatibility: z.ZodOptional<z.ZodObject<{
        minTemp: z.ZodNumber;
        maxTemp: z.ZodNumber;
        recommendedLayers: z.ZodArray<z.ZodString, "many">;
        materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    }, {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    }>>;
    materialCompatibility: z.ZodOptional<z.ZodObject<{
        compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
        weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    }, {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    }>>;
    bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
        recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
        styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    }, {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    }>>;
    skinToneCompatibility: z.ZodOptional<z.ZodObject<{
        compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
        recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    }, {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    }>>;
    outfitScoring: z.ZodOptional<z.ZodObject<{
        versatility: z.ZodNumber;
        seasonality: z.ZodNumber;
        formality: z.ZodNumber;
        trendiness: z.ZodNumber;
        quality: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    }, {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    }>>;
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
    temperatureCompatibility?: {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    } | undefined;
    materialCompatibility?: {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    } | undefined;
    bodyTypeCompatibility?: {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    } | undefined;
    skinToneCompatibility?: {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    } | undefined;
    outfitScoring?: {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    } | undefined;
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
        wearLayer?: "base" | "inner" | "outer" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
        warmthFactor?: "light" | "medium" | "heavy" | undefined;
        coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
        canLayer?: boolean | undefined;
        maxLayers?: number | undefined;
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
    temperatureCompatibility?: {
        minTemp: number;
        maxTemp: number;
        recommendedLayers: string[];
        materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
    } | undefined;
    materialCompatibility?: {
        compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
    } | undefined;
    bodyTypeCompatibility?: {
        recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
    } | undefined;
    skinToneCompatibility?: {
        compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
    } | undefined;
    outfitScoring?: {
        versatility: number;
        seasonality: number;
        formality: number;
        trendiness: number;
        quality: number;
    } | undefined;
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
        wearLayer?: "base" | "inner" | "outer" | null | undefined;
        formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
        layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
        warmthFactor?: "light" | "medium" | "heavy" | undefined;
        coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
        canLayer?: boolean | undefined;
        maxLayers?: number | undefined;
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
    type: z.ZodEnum<["shirt", "dress_shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "dress_shoes", "loafers", "sneakers", "accessory", "other", "t-shirt", "blouse", "tank_top", "crop_top", "polo", "hoodie", "cardigan", "blazer", "coat", "vest", "jeans", "chinos", "slacks", "joggers", "sweatpants", "mini_skirt", "midi_skirt", "maxi_skirt", "pencil_skirt", "sundress", "cocktail_dress", "maxi_dress", "mini_dress", "boots", "sandals", "heels", "flats", "hat", "scarf", "belt", "jewelry", "bag", "watch"]>;
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
            layerLevel: z.ZodOptional<z.ZodEnum<["base", "inner", "middle", "outer"]>>;
            warmthFactor: z.ZodOptional<z.ZodEnum<["light", "medium", "heavy"]>>;
            coreCategory: z.ZodOptional<z.ZodEnum<["top", "bottom", "dress", "outerwear", "shoes", "accessory"]>>;
            canLayer: z.ZodOptional<z.ZodBoolean>;
            maxLayers: z.ZodOptional<z.ZodNumber>;
            temperatureCompatibility: z.ZodOptional<z.ZodObject<{
                minTemp: z.ZodNumber;
                maxTemp: z.ZodNumber;
                recommendedLayers: z.ZodArray<z.ZodString, "many">;
                materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
            }, "strip", z.ZodTypeAny, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            }, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            }>>;
            materialCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
            }, "strip", z.ZodTypeAny, {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            }, {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            }>>;
            bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
                recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            }, {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            }>>;
            skinToneCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            }, {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            }>>;
            outfitScoring: z.ZodOptional<z.ZodObject<{
                versatility: z.ZodNumber;
                seasonality: z.ZodNumber;
                formality: z.ZodNumber;
                trendiness: z.ZodNumber;
                quality: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            }, {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            }>>;
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
            wearLayer?: "base" | "inner" | "outer" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
            warmthFactor?: "light" | "medium" | "heavy" | undefined;
            coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
            canLayer?: boolean | undefined;
            maxLayers?: number | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
            wearLayer?: "base" | "inner" | "outer" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
            warmthFactor?: "light" | "medium" | "heavy" | undefined;
            coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
            canLayer?: boolean | undefined;
            maxLayers?: number | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
        temperatureCompatibility: z.ZodOptional<z.ZodObject<{
            minTemp: z.ZodNumber;
            maxTemp: z.ZodNumber;
            recommendedLayers: z.ZodArray<z.ZodString, "many">;
            materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        }, {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        }>>;
        materialCompatibility: z.ZodOptional<z.ZodObject<{
            compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
            weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
        }, "strip", z.ZodTypeAny, {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        }, {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        }>>;
        bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
            recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
            styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        }, {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        }>>;
        skinToneCompatibility: z.ZodOptional<z.ZodObject<{
            compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
            recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        }, {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        }>>;
        outfitScoring: z.ZodOptional<z.ZodObject<{
            versatility: z.ZodNumber;
            seasonality: z.ZodNumber;
            formality: z.ZodNumber;
            trendiness: z.ZodNumber;
            quality: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        }, {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        }>>;
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
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
            wearLayer?: "base" | "inner" | "outer" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
            warmthFactor?: "light" | "medium" | "heavy" | undefined;
            coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
            canLayer?: boolean | undefined;
            maxLayers?: number | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
            wearLayer?: "base" | "inner" | "outer" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
            warmthFactor?: "light" | "medium" | "heavy" | undefined;
            coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
            canLayer?: boolean | undefined;
            maxLayers?: number | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
    favorite: z.ZodOptional<z.ZodBoolean>;
    wearCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    lastWorn: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
            wearLayer?: "base" | "inner" | "outer" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
            warmthFactor?: "light" | "medium" | "heavy" | undefined;
            coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
            canLayer?: boolean | undefined;
            maxLayers?: number | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
    favorite?: boolean | undefined;
    wearCount?: number | undefined;
    lastWorn?: number | null | undefined;
}, {
    name: string;
    type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
        temperatureCompatibility?: {
            minTemp: number;
            maxTemp: number;
            recommendedLayers: string[];
            materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
        } | undefined;
        materialCompatibility?: {
            compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
        } | undefined;
        bodyTypeCompatibility?: {
            recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
        } | undefined;
        skinToneCompatibility?: {
            compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
        } | undefined;
        outfitScoring?: {
            versatility: number;
            seasonality: number;
            formality: number;
            trendiness: number;
            quality: number;
        } | undefined;
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
            wearLayer?: "base" | "inner" | "outer" | null | undefined;
            formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
            layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
            warmthFactor?: "light" | "medium" | "heavy" | undefined;
            coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
            canLayer?: boolean | undefined;
            maxLayers?: number | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
    favorite?: boolean | undefined;
    wearCount?: number | undefined;
    lastWorn?: number | null | undefined;
}>;
export type Season = z.infer<typeof SeasonEnum>;
export type StyleTag = z.infer<typeof StyleTagEnum>;
export type LayerLevel = z.infer<typeof LayerLevelEnum>;
export type WarmthFactor = z.infer<typeof WarmthFactorEnum>;
export type CoreCategory = z.infer<typeof CoreCategoryEnum>;
export type VisualAttributes = z.infer<typeof VisualAttributesSchema>;
export type ItemMetadata = z.infer<typeof ItemMetadataSchema>;
export type BasicMetadata = z.infer<typeof BasicMetadataSchema>;
export type ColorAnalysis = z.infer<typeof ColorAnalysisSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type ClothingItem = z.infer<typeof ClothingItemSchema>;
export declare const OpenAIClothingAnalysisSchema: z.ZodObject<{
    type: z.ZodString;
    subType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
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
        analysisTimestamp: z.ZodOptional<z.ZodNumber>;
        originalType: z.ZodOptional<z.ZodString>;
        originalSubType: z.ZodOptional<z.ZodString>;
        styleTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        occasionTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        colorAnalysis: z.ZodOptional<z.ZodObject<{
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
        }>>;
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
            fabricWeight: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            fit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            silhouette: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            genderTarget: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sleeveLength: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            hangerPresent: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            backgroundRemoved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            wearLayer: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            formalLevel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            temperatureCompatibility: z.ZodOptional<z.ZodObject<{
                minTemp: z.ZodNumber;
                maxTemp: z.ZodNumber;
                recommendedLayers: z.ZodArray<z.ZodString, "many">;
                materialPreferences: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            }, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            }>>;
            materialCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleMaterials: z.ZodArray<z.ZodString, "many">;
                weatherAppropriate: z.ZodObject<{
                    spring: z.ZodArray<z.ZodString, "many">;
                    summer: z.ZodArray<z.ZodString, "many">;
                    fall: z.ZodArray<z.ZodString, "many">;
                    winter: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                }, {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                }>;
            }, "strip", z.ZodTypeAny, {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            }, {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            }>>;
            bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
                hourglass: z.ZodObject<{
                    recommendedFits: z.ZodArray<z.ZodString, "many">;
                    styleRecommendations: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }>;
                pear: z.ZodObject<{
                    recommendedFits: z.ZodArray<z.ZodString, "many">;
                    styleRecommendations: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }>;
                apple: z.ZodObject<{
                    recommendedFits: z.ZodArray<z.ZodString, "many">;
                    styleRecommendations: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }>;
                rectangle: z.ZodObject<{
                    recommendedFits: z.ZodArray<z.ZodString, "many">;
                    styleRecommendations: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }>;
                inverted_triangle: z.ZodObject<{
                    recommendedFits: z.ZodArray<z.ZodString, "many">;
                    styleRecommendations: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }, {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                }>;
            }, "strip", z.ZodTypeAny, {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            }, {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            }>>;
            skinToneCompatibility: z.ZodOptional<z.ZodObject<{
                warm: z.ZodObject<{
                    compatibleColors: z.ZodArray<z.ZodString, "many">;
                    recommendedColorPalette: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                }, {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                }>;
                cool: z.ZodObject<{
                    compatibleColors: z.ZodArray<z.ZodString, "many">;
                    recommendedColorPalette: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                }, {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                }>;
                neutral: z.ZodObject<{
                    compatibleColors: z.ZodArray<z.ZodString, "many">;
                    recommendedColorPalette: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                }, {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                }>;
            }, "strip", z.ZodTypeAny, {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            }, {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            } | undefined;
            bodyTypeCompatibility?: {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            } | undefined;
            skinToneCompatibility?: {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            } | undefined;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            } | undefined;
            bodyTypeCompatibility?: {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            } | undefined;
            skinToneCompatibility?: {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            } | undefined;
        }>>;
        itemMetadata: z.ZodOptional<z.ZodObject<{
            priceEstimate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            careInstructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            priceEstimate?: string | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        }, {
            priceEstimate?: string | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        }>>;
        naturalDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        clipAnalysis: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            primaryStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            styleConfidence: z.ZodOptional<z.ZodNumber>;
            topStyles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            styleBreakdown: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            analysisMethod: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primaryStyle?: string | null | undefined;
            styleConfidence?: number | undefined;
            topStyles?: string[] | undefined;
            styleBreakdown?: Record<string, number> | undefined;
            analysisMethod?: string | undefined;
        }, {
            primaryStyle?: string | null | undefined;
            styleConfidence?: number | undefined;
            topStyles?: string[] | undefined;
            styleBreakdown?: Record<string, number> | undefined;
            analysisMethod?: string | undefined;
        }>>>;
        confidenceScores: z.ZodOptional<z.ZodObject<{
            styleAnalysis: z.ZodNumber;
            gptAnalysis: z.ZodNumber;
            overallConfidence: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            styleAnalysis: number;
            gptAnalysis: number;
            overallConfidence: number;
        }, {
            styleAnalysis: number;
            gptAnalysis: number;
            overallConfidence: number;
        }>>;
        styleCompatibility: z.ZodOptional<z.ZodObject<{
            primaryStyle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            compatibleStyles: z.ZodArray<z.ZodString, "many">;
            avoidStyles: z.ZodArray<z.ZodString, "many">;
            styleNotes: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            compatibleStyles: string[];
            avoidStyles: string[];
            styleNotes: string;
            primaryStyle?: string | null | undefined;
        }, {
            compatibleStyles: string[];
            avoidStyles: string[];
            styleNotes: string;
            primaryStyle?: string | null | undefined;
        }>>;
        enhancedStyles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        enhancedOccasions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        enhancedColorAnalysis: z.ZodOptional<z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
        originalType?: string | undefined;
        analysisTimestamp?: number | undefined;
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
            fabricWeight?: string | null | undefined;
            fit?: string | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: string | null | undefined;
            formalLevel?: string | null | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            } | undefined;
            bodyTypeCompatibility?: {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            } | undefined;
            skinToneCompatibility?: {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            } | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: string | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
        colorAnalysis?: {
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
        } | undefined;
        naturalDescription?: string | null | undefined;
        originalSubType?: string | undefined;
        styleTags?: string[] | undefined;
        occasionTags?: string[] | undefined;
        clipAnalysis?: {
            primaryStyle?: string | null | undefined;
            styleConfidence?: number | undefined;
            topStyles?: string[] | undefined;
            styleBreakdown?: Record<string, number> | undefined;
            analysisMethod?: string | undefined;
        } | null | undefined;
        confidenceScores?: {
            styleAnalysis: number;
            gptAnalysis: number;
            overallConfidence: number;
        } | undefined;
        styleCompatibility?: {
            compatibleStyles: string[];
            avoidStyles: string[];
            styleNotes: string;
            primaryStyle?: string | null | undefined;
        } | undefined;
        enhancedStyles?: string[] | undefined;
        enhancedOccasions?: string[] | undefined;
        enhancedColorAnalysis?: {
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
        } | undefined;
    }, {
        originalType?: string | undefined;
        analysisTimestamp?: number | undefined;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            } | undefined;
            bodyTypeCompatibility?: {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            } | undefined;
            skinToneCompatibility?: {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            } | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: string | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
        colorAnalysis?: {
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
        } | undefined;
        naturalDescription?: string | null | undefined;
        originalSubType?: string | undefined;
        styleTags?: string[] | undefined;
        occasionTags?: string[] | undefined;
        clipAnalysis?: {
            primaryStyle?: string | null | undefined;
            styleConfidence?: number | undefined;
            topStyles?: string[] | undefined;
            styleBreakdown?: Record<string, number> | undefined;
            analysisMethod?: string | undefined;
        } | null | undefined;
        confidenceScores?: {
            styleAnalysis: number;
            gptAnalysis: number;
            overallConfidence: number;
        } | undefined;
        styleCompatibility?: {
            compatibleStyles: string[];
            avoidStyles: string[];
            styleNotes: string;
            primaryStyle?: string | null | undefined;
        } | undefined;
        enhancedStyles?: string[] | undefined;
        enhancedOccasions?: string[] | undefined;
        enhancedColorAnalysis?: {
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
    name?: string | undefined;
    brand?: string | null | undefined;
    subType?: string | null | undefined;
    metadata?: {
        originalType?: string | undefined;
        analysisTimestamp?: number | undefined;
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
            fabricWeight?: string | null | undefined;
            fit?: string | null | undefined;
            silhouette?: string | null | undefined;
            genderTarget?: string | null | undefined;
            sleeveLength?: string | null | undefined;
            hangerPresent?: boolean | null | undefined;
            backgroundRemoved?: boolean | null | undefined;
            wearLayer?: string | null | undefined;
            formalLevel?: string | null | undefined;
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            } | undefined;
            bodyTypeCompatibility?: {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            } | undefined;
            skinToneCompatibility?: {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            } | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: string | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
        colorAnalysis?: {
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
        } | undefined;
        naturalDescription?: string | null | undefined;
        originalSubType?: string | undefined;
        styleTags?: string[] | undefined;
        occasionTags?: string[] | undefined;
        clipAnalysis?: {
            primaryStyle?: string | null | undefined;
            styleConfidence?: number | undefined;
            topStyles?: string[] | undefined;
            styleBreakdown?: Record<string, number> | undefined;
            analysisMethod?: string | undefined;
        } | null | undefined;
        confidenceScores?: {
            styleAnalysis: number;
            gptAnalysis: number;
            overallConfidence: number;
        } | undefined;
        styleCompatibility?: {
            compatibleStyles: string[];
            avoidStyles: string[];
            styleNotes: string;
            primaryStyle?: string | null | undefined;
        } | undefined;
        enhancedStyles?: string[] | undefined;
        enhancedOccasions?: string[] | undefined;
        enhancedColorAnalysis?: {
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
    name?: string | undefined;
    brand?: string | null | undefined;
    subType?: string | null | undefined;
    metadata?: {
        originalType?: string | undefined;
        analysisTimestamp?: number | undefined;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: string[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: string[];
                weatherAppropriate: {
                    spring: string[];
                    summer: string[];
                    fall: string[];
                    winter: string[];
                };
            } | undefined;
            bodyTypeCompatibility?: {
                hourglass: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                pear: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                apple: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                rectangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
                inverted_triangle: {
                    recommendedFits: string[];
                    styleRecommendations: string[];
                };
            } | undefined;
            skinToneCompatibility?: {
                cool: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                warm: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
                neutral: {
                    compatibleColors: string[];
                    recommendedColorPalette: string[];
                };
            } | undefined;
        } | undefined;
        itemMetadata?: {
            priceEstimate?: string | null | undefined;
            careInstructions?: string | null | undefined;
            tags?: string[] | undefined;
        } | undefined;
        colorAnalysis?: {
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
        } | undefined;
        naturalDescription?: string | null | undefined;
        originalSubType?: string | undefined;
        styleTags?: string[] | undefined;
        occasionTags?: string[] | undefined;
        clipAnalysis?: {
            primaryStyle?: string | null | undefined;
            styleConfidence?: number | undefined;
            topStyles?: string[] | undefined;
            styleBreakdown?: Record<string, number> | undefined;
            analysisMethod?: string | undefined;
        } | null | undefined;
        confidenceScores?: {
            styleAnalysis: number;
            gptAnalysis: number;
            overallConfidence: number;
        } | undefined;
        styleCompatibility?: {
            compatibleStyles: string[];
            avoidStyles: string[];
            styleNotes: string;
            primaryStyle?: string | null | undefined;
        } | undefined;
        enhancedStyles?: string[] | undefined;
        enhancedOccasions?: string[] | undefined;
        enhancedColorAnalysis?: {
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
        type: z.ZodEnum<["shirt", "dress_shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "dress_shoes", "loafers", "sneakers", "accessory", "other", "t-shirt", "blouse", "tank_top", "crop_top", "polo", "hoodie", "cardigan", "blazer", "coat", "vest", "jeans", "chinos", "slacks", "joggers", "sweatpants", "mini_skirt", "midi_skirt", "maxi_skirt", "pencil_skirt", "sundress", "cocktail_dress", "maxi_dress", "mini_dress", "boots", "sandals", "heels", "flats", "hat", "scarf", "belt", "jewelry", "bag", "watch"]>;
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
                layerLevel: z.ZodOptional<z.ZodEnum<["base", "inner", "middle", "outer"]>>;
                warmthFactor: z.ZodOptional<z.ZodEnum<["light", "medium", "heavy"]>>;
                coreCategory: z.ZodOptional<z.ZodEnum<["top", "bottom", "dress", "outerwear", "shoes", "accessory"]>>;
                canLayer: z.ZodOptional<z.ZodBoolean>;
                maxLayers: z.ZodOptional<z.ZodNumber>;
                temperatureCompatibility: z.ZodOptional<z.ZodObject<{
                    minTemp: z.ZodNumber;
                    maxTemp: z.ZodNumber;
                    recommendedLayers: z.ZodArray<z.ZodString, "many">;
                    materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                }, {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                }>>;
                materialCompatibility: z.ZodOptional<z.ZodObject<{
                    compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                    weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                }, {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                }>>;
                bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
                    recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                    styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                }, {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                }>>;
                skinToneCompatibility: z.ZodOptional<z.ZodObject<{
                    compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                    recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                }, {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                }>>;
                outfitScoring: z.ZodOptional<z.ZodObject<{
                    versatility: z.ZodNumber;
                    seasonality: z.ZodNumber;
                    formality: z.ZodNumber;
                    trendiness: z.ZodNumber;
                    quality: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                }, {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                }>>;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
            temperatureCompatibility: z.ZodOptional<z.ZodObject<{
                minTemp: z.ZodNumber;
                maxTemp: z.ZodNumber;
                recommendedLayers: z.ZodArray<z.ZodString, "many">;
                materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
            }, "strip", z.ZodTypeAny, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            }, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            }>>;
            materialCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
            }, "strip", z.ZodTypeAny, {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            }, {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            }>>;
            bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
                recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            }, {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            }>>;
            skinToneCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            }, {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            }>>;
            outfitScoring: z.ZodOptional<z.ZodObject<{
                versatility: z.ZodNumber;
                seasonality: z.ZodNumber;
                formality: z.ZodNumber;
                trendiness: z.ZodNumber;
                quality: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            }, {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            }>>;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite: z.ZodOptional<z.ZodBoolean>;
        wearCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        lastWorn: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
    }, {
        name: string;
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
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
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
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
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
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
export declare const OutfitGeneratedOutfitSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    items: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["shirt", "dress_shirt", "pants", "shorts", "skirt", "dress", "jacket", "sweater", "shoes", "dress_shoes", "loafers", "sneakers", "accessory", "other", "t-shirt", "blouse", "tank_top", "crop_top", "polo", "hoodie", "cardigan", "blazer", "coat", "vest", "jeans", "chinos", "slacks", "joggers", "sweatpants", "mini_skirt", "midi_skirt", "maxi_skirt", "pencil_skirt", "sundress", "cocktail_dress", "maxi_dress", "mini_dress", "boots", "sandals", "heels", "flats", "hat", "scarf", "belt", "jewelry", "bag", "watch"]>;
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
                layerLevel: z.ZodOptional<z.ZodEnum<["base", "inner", "middle", "outer"]>>;
                warmthFactor: z.ZodOptional<z.ZodEnum<["light", "medium", "heavy"]>>;
                coreCategory: z.ZodOptional<z.ZodEnum<["top", "bottom", "dress", "outerwear", "shoes", "accessory"]>>;
                canLayer: z.ZodOptional<z.ZodBoolean>;
                maxLayers: z.ZodOptional<z.ZodNumber>;
                temperatureCompatibility: z.ZodOptional<z.ZodObject<{
                    minTemp: z.ZodNumber;
                    maxTemp: z.ZodNumber;
                    recommendedLayers: z.ZodArray<z.ZodString, "many">;
                    materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                }, {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                }>>;
                materialCompatibility: z.ZodOptional<z.ZodObject<{
                    compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                    weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                }, {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                }>>;
                bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
                    recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                    styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                }, {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                }>>;
                skinToneCompatibility: z.ZodOptional<z.ZodObject<{
                    compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                    recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                }, {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                }>>;
                outfitScoring: z.ZodOptional<z.ZodObject<{
                    versatility: z.ZodNumber;
                    seasonality: z.ZodNumber;
                    formality: z.ZodNumber;
                    trendiness: z.ZodNumber;
                    quality: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                }, {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                }>>;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
            temperatureCompatibility: z.ZodOptional<z.ZodObject<{
                minTemp: z.ZodNumber;
                maxTemp: z.ZodNumber;
                recommendedLayers: z.ZodArray<z.ZodString, "many">;
                materialPreferences: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
            }, "strip", z.ZodTypeAny, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            }, {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            }>>;
            materialCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleMaterials: z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">;
                weatherAppropriate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodEnum<["cotton", "wool", "silk", "linen", "denim", "leather", "synthetic", "knit", "fleece", "other"]>, "many">>;
            }, "strip", z.ZodTypeAny, {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            }, {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            }>>;
            bodyTypeCompatibility: z.ZodOptional<z.ZodObject<{
                recommendedFits: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
                styleRecommendations: z.ZodRecord<z.ZodEnum<["hourglass", "pear", "apple", "rectangle", "inverted_triangle"]>, z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            }, {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            }>>;
            skinToneCompatibility: z.ZodOptional<z.ZodObject<{
                compatibleColors: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
                recommendedPalettes: z.ZodRecord<z.ZodEnum<["warm", "cool", "neutral"]>, z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            }, {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            }>>;
            outfitScoring: z.ZodOptional<z.ZodObject<{
                versatility: z.ZodNumber;
                seasonality: z.ZodNumber;
                formality: z.ZodNumber;
                trendiness: z.ZodNumber;
                quality: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            }, {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            }>>;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite: z.ZodOptional<z.ZodBoolean>;
        wearCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        lastWorn: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
    }, {
        name: string;
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
    }>]>, "many">;
    occasion: z.ZodString;
    season: z.ZodString;
    style: z.ZodString;
    styleTags: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    wasSuccessful: z.ZodOptional<z.ZodBoolean>;
    validationErrors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    warnings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    validation_details: z.ZodOptional<z.ZodObject<{
        errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        warnings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        fixes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            method: z.ZodString;
            original_error: z.ZodString;
            applied: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            method: string;
            original_error: string;
            applied: boolean;
        }, {
            method: string;
            original_error: string;
            applied: boolean;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        warnings?: string[] | undefined;
        errors?: string[] | undefined;
        fixes?: {
            method: string;
            original_error: string;
            applied: boolean;
        }[] | undefined;
    }, {
        warnings?: string[] | undefined;
        errors?: string[] | undefined;
        fixes?: {
            method: string;
            original_error: string;
            applied: boolean;
        }[] | undefined;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{
        colorHarmony: z.ZodOptional<z.ZodString>;
        styleNotes: z.ZodOptional<z.ZodString>;
        feedback: z.ZodOptional<z.ZodString>;
        validation_summary: z.ZodOptional<z.ZodObject<{
            total_errors: z.ZodOptional<z.ZodNumber>;
            total_warnings: z.ZodOptional<z.ZodNumber>;
            success_rate: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            total_errors?: number | undefined;
            total_warnings?: number | undefined;
            success_rate?: number | undefined;
        }, {
            total_errors?: number | undefined;
            total_warnings?: number | undefined;
            success_rate?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        styleNotes?: string | undefined;
        colorHarmony?: string | undefined;
        feedback?: string | undefined;
        validation_summary?: {
            total_errors?: number | undefined;
            total_warnings?: number | undefined;
            success_rate?: number | undefined;
        } | undefined;
    }, {
        styleNotes?: string | undefined;
        colorHarmony?: string | undefined;
        feedback?: string | undefined;
        validation_summary?: {
            total_errors?: number | undefined;
            total_warnings?: number | undefined;
            success_rate?: number | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    season: string;
    style: string;
    occasion: string;
    createdAt: number;
    updatedAt: number;
    description: string;
    items: (string | {
        name: string;
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
    })[];
    styleTags: string[];
    metadata?: {
        styleNotes?: string | undefined;
        colorHarmony?: string | undefined;
        feedback?: string | undefined;
        validation_summary?: {
            total_errors?: number | undefined;
            total_warnings?: number | undefined;
            success_rate?: number | undefined;
        } | undefined;
    } | undefined;
    wasSuccessful?: boolean | undefined;
    validationErrors?: string[] | undefined;
    warnings?: string[] | undefined;
    validation_details?: {
        warnings?: string[] | undefined;
        errors?: string[] | undefined;
        fixes?: {
            method: string;
            original_error: string;
            applied: boolean;
        }[] | undefined;
    } | undefined;
}, {
    name: string;
    id: string;
    season: string;
    style: string;
    occasion: string;
    createdAt: number;
    updatedAt: number;
    description: string;
    items: (string | {
        name: string;
        type: "shirt" | "dress_shirt" | "pants" | "shorts" | "skirt" | "dress" | "jacket" | "sweater" | "shoes" | "dress_shoes" | "loafers" | "sneakers" | "accessory" | "other" | "t-shirt" | "blouse" | "tank_top" | "crop_top" | "polo" | "hoodie" | "cardigan" | "blazer" | "coat" | "vest" | "jeans" | "chinos" | "slacks" | "joggers" | "sweatpants" | "mini_skirt" | "midi_skirt" | "maxi_skirt" | "pencil_skirt" | "sundress" | "cocktail_dress" | "maxi_dress" | "mini_dress" | "boots" | "sandals" | "heels" | "flats" | "hat" | "scarf" | "belt" | "jewelry" | "bag" | "watch";
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
            temperatureCompatibility?: {
                minTemp: number;
                maxTemp: number;
                recommendedLayers: string[];
                materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
            } | undefined;
            materialCompatibility?: {
                compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
            } | undefined;
            bodyTypeCompatibility?: {
                recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
            } | undefined;
            skinToneCompatibility?: {
                compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
            } | undefined;
            outfitScoring?: {
                versatility: number;
                seasonality: number;
                formality: number;
                trendiness: number;
                quality: number;
            } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
                formalLevel?: "casual" | "semi-formal" | "formal" | null | undefined;
                layerLevel?: "base" | "inner" | "middle" | "outer" | undefined;
                warmthFactor?: "light" | "medium" | "heavy" | undefined;
                coreCategory?: "dress" | "shoes" | "accessory" | "top" | "bottom" | "outerwear" | undefined;
                canLayer?: boolean | undefined;
                maxLayers?: number | undefined;
                temperatureCompatibility?: {
                    minTemp: number;
                    maxTemp: number;
                    recommendedLayers: string[];
                    materialPreferences: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                } | undefined;
                materialCompatibility?: {
                    compatibleMaterials: ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[];
                    weatherAppropriate: Record<string, ("other" | "cotton" | "wool" | "silk" | "linen" | "denim" | "leather" | "synthetic" | "knit" | "fleece")[]>;
                } | undefined;
                bodyTypeCompatibility?: {
                    recommendedFits: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                    styleRecommendations: Partial<Record<"hourglass" | "pear" | "apple" | "rectangle" | "inverted_triangle", string[]>>;
                } | undefined;
                skinToneCompatibility?: {
                    compatibleColors: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                    recommendedPalettes: Partial<Record<"cool" | "warm" | "neutral", string[]>>;
                } | undefined;
                outfitScoring?: {
                    versatility: number;
                    seasonality: number;
                    formality: number;
                    trendiness: number;
                    quality: number;
                } | undefined;
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
        favorite?: boolean | undefined;
        wearCount?: number | undefined;
        lastWorn?: number | null | undefined;
    })[];
    styleTags: string[];
    metadata?: {
        styleNotes?: string | undefined;
        colorHarmony?: string | undefined;
        feedback?: string | undefined;
        validation_summary?: {
            total_errors?: number | undefined;
            total_warnings?: number | undefined;
            success_rate?: number | undefined;
        } | undefined;
    } | undefined;
    wasSuccessful?: boolean | undefined;
    validationErrors?: string[] | undefined;
    warnings?: string[] | undefined;
    validation_details?: {
        warnings?: string[] | undefined;
        errors?: string[] | undefined;
        fixes?: {
            method: string;
            original_error: string;
            applied: boolean;
        }[] | undefined;
    } | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
                wearLayer?: "base" | "inner" | "outer" | null | undefined;
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
export type OccasionType = z.infer<typeof OccasionTypeEnum>;
