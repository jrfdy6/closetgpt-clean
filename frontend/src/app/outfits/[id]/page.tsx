"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Outfit {
  id: string;
  occasion: string;
  mood: string;
  style: string;
  description?: string;
  createdAt: string | number;
  items: Array<{
    id: string;
    itemId?: string;
    name: string;
    type: string;
    imageUrl?: string;
  }>;
}

export default function OutfitDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOutfit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/outfit/${params.id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch outfit details");
      }
      const data = await response.json();
      setOutfit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchOutfit();
    }
  }, [params.id]);

  const formatDate = (date: string | number) => {
    try {
      // If it's a string that looks like a number, treat it as a Unix timestamp
      if (typeof date === 'string' && /^\d+$/.test(date)) {
        return new Date(Number(date) * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      // If it's a number, treat it as a Unix timestamp
      if (typeof date === 'number') {
        return new Date(date * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      // Otherwise, try to parse as a date string
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Date not available';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">Loading outfit details...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !outfit) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500 mb-4">
              {error || "Outfit not found"}
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={fetchOutfit}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <Link href="/outfits/generate">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Generate
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Outfit Details</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={fetchOutfit}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/outfits/generate">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generate
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generated Outfit</CardTitle>
          <CardDescription>
            Created on {formatDate(outfit.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Occasion</h3>
              <p className="capitalize">{outfit.occasion}</p>
            </div>
            <div>
              <h3 className="font-semibold">Mood</h3>
              <p className="capitalize">{outfit.mood}</p>
            </div>
            <div>
              <h3 className="font-semibold">Style</h3>
              <p className="capitalize">{outfit.style}</p>
            </div>
            {outfit.description && (
              <div>
                <h3 className="font-semibold">Description</h3>
                <p>{outfit.description}</p>
              </div>
            )}
          </div>

          {outfit.items && outfit.items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Outfit Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {outfit.items.map((item) => (
                  <Card key={item.itemId || item.id}>
                    <CardContent className="pt-6">
                      {item.imageUrl && (
                        <div className="aspect-square relative mb-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="object-cover rounded-lg w-full h-full"
                          />
                        </div>
                      )}
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 