"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserProfile = exports.validateClothingItems = exports.validateClothingItem = exports.ClothingTypeEnum = exports.StyleTagEnum = exports.SeasonEnum = exports.MetadataSchema = exports.ColorAnalysisSchema = exports.BasicMetadataSchema = exports.ItemMetadataSchema = exports.VisualAttributesSchema = exports.ColorSchema = exports.UserProfileSchema = exports.OpenAIClothingAnalysisSchema = exports.OutfitGeneratedOutfitSchema = exports.OutfitSchema = exports.ClothingItemSchema = void 0;
const types_1 = require("../types");
Object.defineProperty(exports, "ClothingItemSchema", { enumerable: true, get: function () { return 
    // Schemas
    types_1.ClothingItemSchema; } });
Object.defineProperty(exports, "OutfitSchema", { enumerable: true, get: function () { return types_1.OutfitSchema; } });
Object.defineProperty(exports, "OutfitGeneratedOutfitSchema", { enumerable: true, get: function () { return types_1.OutfitGeneratedOutfitSchema; } });
Object.defineProperty(exports, "OpenAIClothingAnalysisSchema", { enumerable: true, get: function () { return types_1.OpenAIClothingAnalysisSchema; } });
Object.defineProperty(exports, "UserProfileSchema", { enumerable: true, get: function () { return types_1.UserProfileSchema; } });
Object.defineProperty(exports, "ColorSchema", { enumerable: true, get: function () { return 
    // Other schemas
    types_1.ColorSchema; } });
Object.defineProperty(exports, "VisualAttributesSchema", { enumerable: true, get: function () { return types_1.VisualAttributesSchema; } });
Object.defineProperty(exports, "ItemMetadataSchema", { enumerable: true, get: function () { return types_1.ItemMetadataSchema; } });
Object.defineProperty(exports, "BasicMetadataSchema", { enumerable: true, get: function () { return types_1.BasicMetadataSchema; } });
Object.defineProperty(exports, "ColorAnalysisSchema", { enumerable: true, get: function () { return types_1.ColorAnalysisSchema; } });
Object.defineProperty(exports, "MetadataSchema", { enumerable: true, get: function () { return types_1.MetadataSchema; } });
Object.defineProperty(exports, "SeasonEnum", { enumerable: true, get: function () { return 
    // Enums
    types_1.SeasonEnum; } });
Object.defineProperty(exports, "StyleTagEnum", { enumerable: true, get: function () { return types_1.StyleTagEnum; } });
Object.defineProperty(exports, "ClothingTypeEnum", { enumerable: true, get: function () { return types_1.ClothingTypeEnum; } });
// Export validation functions
const validateClothingItem = (item) => {
    return types_1.ClothingItemSchema.parse(item);
};
exports.validateClothingItem = validateClothingItem;
const validateClothingItems = (items) => {
    return items.map(item => types_1.ClothingItemSchema.parse(item));
};
exports.validateClothingItems = validateClothingItems;
const validateUserProfile = (profile) => {
    return types_1.UserProfileSchema.parse(profile);
};
exports.validateUserProfile = validateUserProfile;
