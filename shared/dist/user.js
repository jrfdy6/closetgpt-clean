"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileSchema = void 0;
const zod_1 = require("zod");
exports.UserProfileSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    gender: zod_1.z.enum(['male', 'female']).optional(),
    preferences: zod_1.z.object({
        style: zod_1.z.array(zod_1.z.string()),
        colors: zod_1.z.array(zod_1.z.string()),
        occasions: zod_1.z.array(zod_1.z.string())
    }),
    measurements: zod_1.z.object({
        height: zod_1.z.number(),
        weight: zod_1.z.number(),
        bodyType: zod_1.z.string(),
        skinTone: zod_1.z.string().optional()
    }),
    stylePreferences: zod_1.z.array(zod_1.z.string()),
    bodyType: zod_1.z.string(),
    skinTone: zod_1.z.string().optional(),
    fitPreference: zod_1.z.enum(['fitted', 'relaxed', 'oversized', 'loose']).optional(),
    favoriteColors: zod_1.z.array(zod_1.z.string()),
    favoriteSeasons: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number()
});
