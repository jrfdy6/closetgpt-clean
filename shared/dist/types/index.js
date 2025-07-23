"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothingCategory = exports.ClothingTypeEnum = exports.StyleTagEnum = exports.SeasonEnum = exports.MetadataSchema = exports.ColorAnalysisSchema = exports.BasicMetadataSchema = exports.ItemMetadataSchema = exports.VisualAttributesSchema = exports.ColorSchema = exports.UserProfileSchema = exports.OpenAIClothingAnalysisSchema = exports.OutfitGeneratedOutfitSchema = exports.OutfitSchema = exports.ClothingItemSchema = void 0;
// Export responses
__exportStar(require("./responses"), exports);
// Export wardrobe types
var wardrobe_1 = require("./wardrobe");
Object.defineProperty(exports, "ClothingItemSchema", { enumerable: true, get: function () { return wardrobe_1.ClothingItemSchema; } });
Object.defineProperty(exports, "OutfitSchema", { enumerable: true, get: function () { return wardrobe_1.OutfitSchema; } });
Object.defineProperty(exports, "OutfitGeneratedOutfitSchema", { enumerable: true, get: function () { return wardrobe_1.OutfitGeneratedOutfitSchema; } });
Object.defineProperty(exports, "OpenAIClothingAnalysisSchema", { enumerable: true, get: function () { return wardrobe_1.OpenAIClothingAnalysisSchema; } });
Object.defineProperty(exports, "UserProfileSchema", { enumerable: true, get: function () { return wardrobe_1.UserProfileSchema; } });
Object.defineProperty(exports, "ColorSchema", { enumerable: true, get: function () { return wardrobe_1.ColorSchema; } });
Object.defineProperty(exports, "VisualAttributesSchema", { enumerable: true, get: function () { return wardrobe_1.VisualAttributesSchema; } });
Object.defineProperty(exports, "ItemMetadataSchema", { enumerable: true, get: function () { return wardrobe_1.ItemMetadataSchema; } });
Object.defineProperty(exports, "BasicMetadataSchema", { enumerable: true, get: function () { return wardrobe_1.BasicMetadataSchema; } });
Object.defineProperty(exports, "ColorAnalysisSchema", { enumerable: true, get: function () { return wardrobe_1.ColorAnalysisSchema; } });
Object.defineProperty(exports, "MetadataSchema", { enumerable: true, get: function () { return wardrobe_1.MetadataSchema; } });
Object.defineProperty(exports, "SeasonEnum", { enumerable: true, get: function () { return wardrobe_1.SeasonEnum; } });
Object.defineProperty(exports, "StyleTagEnum", { enumerable: true, get: function () { return wardrobe_1.StyleTagEnum; } });
Object.defineProperty(exports, "ClothingTypeEnum", { enumerable: true, get: function () { return wardrobe_1.ClothingTypeEnum; } });
var ClothingCategory;
(function (ClothingCategory) {
    ClothingCategory["TOPS"] = "tops";
    ClothingCategory["BOTTOMS"] = "bottoms";
    ClothingCategory["DRESSES"] = "dresses";
    ClothingCategory["OUTERWEAR"] = "outerwear";
    ClothingCategory["SHOES"] = "shoes";
    ClothingCategory["ACCESSORIES"] = "accessories";
})(ClothingCategory || (exports.ClothingCategory = ClothingCategory = {}));
