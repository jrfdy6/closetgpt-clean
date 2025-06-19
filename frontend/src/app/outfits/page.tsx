'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Outfit {
  id: string;
  name: string;
  description?: string;
  occasion?: string;
  season?: string;
  style: string[];
  style_tags: string[];
  created_at: string;
  updated_at: string;
}

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await fetch('/api/outfits');
        if (!response.ok) {
          throw new Error('Failed to fetch outfits');
        }
        const data = await response.json();
        setOutfits(data);
      } catch (err) {
        console.error('Error fetching outfits:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch outfits');
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  if (loading) {
    return <div>Loading outfits...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Outfits</h1>
        <Link href="/outfits/generate">
          <Button>Generate New Outfit</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <Card key={outfit.id}>
            <CardHeader>
              <CardTitle>{outfit.name}</CardTitle>
              <CardDescription>{outfit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {outfit.occasion && (
                  <p><strong>Occasion:</strong> {outfit.occasion}</p>
                )}
                {outfit.season && (
                  <p><strong>Season:</strong> {outfit.season}</p>
                )}
                {outfit.style && outfit.style.length > 0 && (
                  <p><strong>Style:</strong> {outfit.style.join(', ')}</p>
                )}
                {outfit.style_tags && outfit.style_tags.length > 0 && (
                  <p><strong>Style Tags:</strong> {outfit.style_tags.join(', ')}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 