'use client';

import { useState, useEffect } from 'react';
import { useWardrobe } from '@/hooks/useWardrobe';
import { useProfile } from '@/hooks/useProfile';
import { WardrobeItem, Season } from '@/types/wardrobe';

interface StyleGoal {
  name: string;
  target: number;
  current: number;
  description: string;
}

export default function StyleGoalsProgress() {
  const { wardrobe } = useWardrobe();
  const { profile } = useProfile();
  const [goals, setGoals] = useState<StyleGoal[]>([]);

  useEffect(() => {
    if (!wardrobe || !profile) return;

    const calculateGoals = () => {
      const stylePreferences = profile.preferences.style || [];
      const newGoals: StyleGoal[] = [];

      // Goal 1: Minimum items for each preferred style
      stylePreferences.forEach(style => {
        const itemsInStyle = wardrobe.filter(item => 
          item.style.includes(style.toLowerCase())
        ).length;
        
        newGoals.push({
          name: `${style} Collection`,
          target: 10, // Minimum 10 items per style
          current: itemsInStyle,
          description: `Build a collection of ${style} pieces`
        });
      });

      // Goal 2: Seasonal balance
      const seasons: Season[] = ['spring', 'summer', 'fall', 'winter'];
      const itemsPerSeason = seasons.map(season => 
        wardrobe.filter(item => item.season.includes(season)).length
      );
      const minSeasonalItems = Math.min(...itemsPerSeason);
      const maxSeasonalItems = Math.max(...itemsPerSeason);
      
      newGoals.push({
        name: 'Seasonal Balance',
        target: 5, // Maximum difference between seasons
        current: maxSeasonalItems - minSeasonalItems,
        description: 'Maintain a balanced wardrobe across seasons'
      });

      // Goal 3: Color variety
      const colorCounts = wardrobe.reduce((acc, item) => {
        acc[item.color] = (acc[item.color] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const uniqueColors = Object.keys(colorCounts).length;
      newGoals.push({
        name: 'Color Variety',
        target: 8, // Aim for 8 different colors
        current: uniqueColors,
        description: 'Build a diverse color palette'
      });

      setGoals(newGoals);
    };

    calculateGoals();
  }, [wardrobe, profile]);

  if (!goals.length) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🎯 Style Goals</h2>
        <div className="text-gray-500">Complete your style quiz to set goals!</div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">🎯 Style Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = Math.min(100, (goal.current / goal.target) * 100);
          const isComplete = goal.current >= goal.target;

          return (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{goal.name}</h3>
                <span className="text-sm text-gray-500">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isComplete ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
} 