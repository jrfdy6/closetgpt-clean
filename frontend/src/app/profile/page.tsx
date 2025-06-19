"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/lib/firebase-context';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useToast } from '@/components/ui/use-toast';
import type { Occasion, FormalityLevel, Season, FitPreference, SizePreference } from '@/lib/store/onboardingStore';

interface ProfileData {
  name: string;
  avatarUrl: string | null;
  bodyType: string;
  height: number;
  weight: number;
  skinTone: string;
  stylePreferences: {
    occasions: Occasion[];
    formalityLevel: FormalityLevel;
    seasons: Season[];
    fitPreference: FitPreference;
    sizePreference: SizePreference;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useFirebase();
  const { toast } = useToast();
  const { reset } = useOnboardingStore();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to initialize

    if (!user) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      if (!db) return;
      
      try {
        const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as ProfileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, router, toast]);

  const handleReonboard = () => {
    reset();
    router.push('/onboarding');
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Profile Not Found</h1>
            <p className="text-muted-foreground">
              It seems you haven't completed your profile yet.
            </p>
            <Button onClick={handleReonboard}>
              Complete Your Profile
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatarUrl || undefined} alt={profile.name} />
              <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">
                {profile.bodyType} • {profile.height}" • {profile.weight}lbs
              </p>
            </div>
          </div>

          {/* Style Preferences */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Style Preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Occasions</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.stylePreferences.occasions.map((occasion) => (
                    <span
                      key={occasion}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Formality Level</h3>
                <p className="mt-1">{profile.stylePreferences.formalityLevel}</p>
              </div>
            </div>
          </div>

          {/* Seasonal Preferences */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Seasonal Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {profile.stylePreferences.seasons.map((season) => (
                <span
                  key={season}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {season}
                </span>
              ))}
            </div>
          </div>

          {/* Fit & Size */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Fit & Size</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fit Preference</h3>
                <p className="mt-1">{profile.stylePreferences.fitPreference}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Size Preference</h3>
                <p className="mt-1">{profile.stylePreferences.sizePreference}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <Button
              onClick={handleReonboard}
              className="w-full"
              variant="outline"
            >
              Update Style Preferences
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 