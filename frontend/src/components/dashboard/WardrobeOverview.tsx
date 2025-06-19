'use client';

import { useState, useEffect } from 'react';
import { useWardrobe } from '@/hooks/useWardrobe';
import { WardrobeItem, Season } from '@/types/wardrobe';

interface WardrobeStats {
  totalItems: number;
  byType: Record<string, number>;
  bySeason: Record<Season, number>;
  byColor: Record<string, number>;
}

export default function WardrobeOverview() {
  const { wardrobe, loading } = useWardrobe();
  const [stats, setStats] = useState<WardrobeStats | null>(null);

  useEffect(() => {
    if (!wardrobe) return;

    const calculateStats = () => {
      const byType: Record<string, number> = {};
      const bySeason: Record<Season, number> = {
        spring: 0,
        summer: 0,
        fall: 0,
        winter: 0
      };
      const byColor: Record<string, number> = {};

      wardrobe.forEach((item: WardrobeItem) => {
        // Count by type
        byType[item.type] = (byType[item.type] || 0) + 1;

        // Count by season
        item.season.forEach((season: Season) => {
          bySeason[season] = (bySeason[season] || 0) + 1;
        });

        // Count by color
        byColor[item.color] = (byColor[item.color] || 0) + 1;
      });

      setStats({
        totalItems: wardrobe.length,
        byType,
        bySeason,
        byColor
      });
    };

    calculateStats();
  }, [wardrobe]);

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">👔 Wardrobe Overview</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  if (!stats) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">👔 Wardrobe Overview</h2>
        <div className="text-gray-500">No wardrobe items found.</div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">👔 Wardrobe Overview</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Total Items</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.totalItems}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">By Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="capitalize">{type}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">By Season</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats.bySeason).map(([season, count]) => (
              <div key={season} className="flex justify-between items-center">
                <span className="capitalize">{season}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Top Colors</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats.byColor)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 6)
              .map(([color, count]) => (
                <div key={color} className="flex justify-between items-center">
                  <span className="capitalize">{color}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
} 