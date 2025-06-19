'use client';

import { useState, useEffect } from 'react';
import { OutfitGeneratedOutfit } from '@/types/outfit';
import { WeatherData } from '@/types/weather';
import { useWeather } from '@/hooks/useWeather';
import { useOutfitGenerator } from '@/hooks/useOutfitGenerator';
import { useWardrobe } from '@/hooks/useWardrobe';
import { useProfile } from '@/hooks/useProfile';

export default function TodaysOutfitRecommendation() {
  const [outfit, setOutfit] = useState<OutfitGeneratedOutfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { weather, loading: weatherLoading } = useWeather();
  const { wardrobe, loading: wardrobeLoading } = useWardrobe();
  const { profile } = useProfile();
  const { generateOutfit, loading: generatingOutfit } = useOutfitGenerator();

  useEffect(() => {
    const generateTodaysOutfit = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!weather || !wardrobe || !profile) {
          return;
        }

        const generatedOutfit = await generateOutfit({
          wardrobe,
          weather,
          occasion: 'casual',
          userProfile: profile
        });

        setOutfit(generatedOutfit);
      } catch (err) {
        setError('Failed to generate outfit recommendation');
        console.error('Error generating outfit:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!weatherLoading && !wardrobeLoading) {
      generateTodaysOutfit();
    }
  }, [weather, wardrobe, profile, weatherLoading, wardrobeLoading, generateOutfit]);

  if (loading || generatingOutfit) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🧍‍♀️ Today's Outfit Recommendation</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🧍‍♀️ Today's Outfit Recommendation</h2>
        <div className="text-red-500">{error}</div>
      </section>
    );
  }

  if (!outfit) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🧍‍♀️ Today's Outfit Recommendation</h2>
        <div className="text-gray-500">No outfit recommendation available. Add more items to your wardrobe!</div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">🧍‍♀️ Today's Outfit Recommendation</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {outfit.items.map((item) => (
            <div key={item.itemId} className="relative group">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Style Notes</h3>
          <p className="text-gray-600 text-sm">{outfit.styleNotes}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Color Harmony</h3>
          <p className="text-gray-600 text-sm">{outfit.colorHarmony}</p>
        </div>
      </div>
    </section>
  );
} 