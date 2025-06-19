import { useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bodyType: string;
  preferences: {
    style: string[];
  };
  measurements: {
    skinTone: string;
    [key: string]: any;
  };
  createdAt: number;
  updatedAt: number;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
} 