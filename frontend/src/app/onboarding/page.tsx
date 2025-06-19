"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/lib/firebase-context';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { ProfileSetupStep } from '@/components/onboarding/ProfileSetupStep';
import { BasicInfoStep } from '@/components/onboarding/BasicInfoStep';
import { StyleQuizStep } from '@/components/onboarding/StyleQuizStep';
import { StylePreferencesStep } from '@/components/onboarding/StylePreferencesStep';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useToast } from '@/components/ui/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useFirebase();
  const { toast } = useToast();
  const { 
    step, 
    setStep, 
    resetOnboarding, 
    setBasicInfo, 
    setStylePreferences,
    name,
    gender,
    avatarUrl,
    height,
    weight,
    bodyType,
    skinTone,
    fitPreference,
    stylePreferences,
    occasions,
    preferredColors,
    sizePreference,
    formality,
    seasonality
  } = useOnboardingStore();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to initialize

    if (!user) {
      router.push('/login');
      return;
    }

    // Check if user has an existing profile
    const checkExistingProfile = async () => {
      if (!db) return;
      
      try {
        const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
        if (profileDoc.exists()) {
          const profileData = profileDoc.data();
          // Pre-fill the form with existing data
          setBasicInfo({
            name: profileData.name,
            height: profileData.height,
            weight: profileData.weight,
            bodyType: profileData.bodyType,
            skinTone: profileData.skinTone,
            gender: profileData.gender,
            avatarUrl: profileData.avatarUrl,
            fitPreference: profileData.fitPreference,
          });
          setStylePreferences({
            stylePreferences: profileData.stylePreferences,
            occasions: profileData.occasions,
            preferredColors: profileData.preferredColors,
            formality: profileData.formality,
            seasonality: profileData.seasonality,
            sizePreference: profileData.sizePreference,
          });
        }
      } catch (error) {
        console.error('Error checking existing profile:', error);
      }
    };

    checkExistingProfile();
  }, [user, authLoading, router, setBasicInfo, setStylePreferences]);

  const handleComplete = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        const token = await user.getIdToken();
        const response = await fetch('/api/profile/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: user.uid,
            name,
            gender,
            avatarUrl,
            height,
            weight,
            bodyType,
            skinTone,
            fitPreference,
            stylePreferences,
            occasions,
            preferredColors,
            sizePreference,
            formality,
            seasonality
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save profile');
        }

        toast({
          title: "Success!",
          description: "Profile updated successfully!",
        });

        // Use replace instead of push to prevent back navigation
        router.replace('/profile');
      } catch (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          {step === 1 ? 'Create Your Profile' : 'Update Your Style Profile'}
        </h1>
        <p className="text-gray-600 mb-8">
          {step === 1 
            ? 'Let\'s get to know you better to create your perfect style profile.'
            : 'Let\'s update your style preferences to keep your recommendations fresh.'}
        </p>

        <div className="space-y-8">
          {step === 1 && (
            <ProfileSetupStep onComplete={handleComplete} />
          )}
          {step === 2 && (
            <BasicInfoStep onComplete={handleComplete} />
          )}
          {step === 3 && (
            <StyleQuizStep onComplete={handleComplete} />
          )}
          {step === 4 && (
            <StylePreferencesStep onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  );
} 