import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFirebase } from '@/lib/firebase-context';

export function useOnboarding() {
  const router = useRouter();
  const { user } = useFirebase();
  const { updateProfile } = useUserProfile();
  const {
    name,
    height,
    weight,
    bodyType,
    skinTone,
    stylePreferences,
    occasions,
    preferredColors,
    sizePreference,
  } = useOnboardingStore();

  const saveOnboardingData = async () => {
    if (!user) {
      throw new Error('User must be logged in to save onboarding data');
    }

    try {
      console.log('Starting to save onboarding data for user:', user.uid);
      const profileData = {
        name,
        measurements: {
          height: height || 0,
          weight: weight || 0,
          bodyType: bodyType || '',
          skinTone: skinTone || '',
        },
        preferences: {
          style: stylePreferences,
          colors: preferredColors,
          occasions,
        },
        stylePreferences,
        bodyType: bodyType || '',
        skinTone: skinTone || '',
        sizePreference: sizePreference || undefined,
      };
      console.log('Profile data to be saved:', profileData);
      
      await updateProfile(profileData);
      console.log('Profile updated successfully');

      // Redirect to dashboard after successful save
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      throw error;
    }
  };

  return {
    saveOnboardingData,
  };
} 