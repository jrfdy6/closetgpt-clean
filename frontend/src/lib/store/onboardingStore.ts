import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { updateUserProfile } from '@/lib/firebase/userService';

export type BodyType = 
  | 'Athletic'
  | 'Curvy'
  | 'Rectangular'
  | 'Hourglass'
  | 'Pear'
  | 'Apple'
  | 'Inverted Triangle'
  | 'Ectomorph'
  | 'Mesomorph'
  | 'Endomorph';

export type SkinTone = 
  | 'Warm'
  | 'Cool'
  | 'Neutral'
  | 'Olive'
  | 'Deep'
  | 'Medium'
  | 'Fair'
  | 'Light'
  | 'Medium-Light'
  | 'Medium-Dark'
  | 'Dark';

export type StylePreference = 
  | 'Minimal Luxe'
  | 'Gorpcore'
  | 'Boho'
  | 'Streetwear'
  | 'Old Money'
  | 'Clean Girl'
  | 'Korean Core'
  | 'Y2K'
  | 'Coastal Grandmother'
  | 'Dark Academia';

export type Occasion = 'casual' | 'business' | 'formal' | 'sporty' | 'evening' | 'beach' | 'outdoor' | 'party' | 'travel' | 'home';
export type FormalityLevel = 'very_casual' | 'casual' | 'smart_casual' | 'business_casual' | 'business' | 'formal' | 'very_formal';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type FitPreference = 'fitted' | 'relaxed' | 'oversized' | 'loose';
export type SizePreference = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

interface StylePreferences {
  occasions: Occasion[];
  formalityLevel: FormalityLevel;
  seasons: Season[];
  fitPreference: FitPreference;
  sizePreference: SizePreference;
}

interface OnboardingState {
  currentStep: number;
  stylePreferences: StylePreferences;
  setStylePreferences: (preferences: Partial<StylePreferences>) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  stylePreferences: {
    occasions: [],
    formalityLevel: 'casual' as FormalityLevel,
    seasons: [],
    fitPreference: 'fitted' as FitPreference,
    sizePreference: 'm' as SizePreference,
  },
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setStylePreferences: (preferences) =>
        set((state) => ({
          stylePreferences: {
            ...state.stylePreferences,
            ...preferences,
          },
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
    }
  )
); 