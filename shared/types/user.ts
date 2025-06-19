import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  gender: z.enum(['male', 'female']).optional(),
  preferences: z.object({
    style: z.array(z.string()),
    colors: z.array(z.string()),
    occasions: z.array(z.string())
  }),
  measurements: z.object({
    height: z.number(),
    weight: z.number(),
    bodyType: z.string(),
    skinTone: z.string().optional()
  }),
  stylePreferences: z.array(z.string()),
  bodyType: z.string(),
  skinTone: z.string().optional(),
  fitPreference: z.enum(['fitted', 'relaxed', 'oversized', 'loose']).optional(),
  createdAt: z.number(),
  updatedAt: z.number()
});

export type UserProfile = z.infer<typeof UserProfileSchema>; 