"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { Shuffle } from "lucide-react";
import { useWardrobe } from "@/hooks/useWardrobe";
import { useUserProfile } from "@/hooks/useUserProfile";

const OCCASIONS = [
  "Casual",
  "Business Casual",
  "Formal",
  "Gala",
  "Party",
  "Date Night",
  "Work",
  "Interview",
  "Brunch",
  "Wedding Guest",
  "Cocktail",
  "Travel",
  "Airport",
  "Loungewear",
  "Beach",
  "Vacation",
  "Festival",
  "Rainy Day",
  "Snow Day",
  "Hot Weather",
  "Cold Weather",
  "Night Out",
  "Athletic / Gym",
  "School",
  "Holiday",
  "Concert",
  "Errands",
  "Chilly Evening",
  "Museum / Gallery",
  "First Date",
  "Business Formal",
  "Funeral / Memorial",
  "Fashion Event",
  "Outdoor Gathering"
];
const MOODS = ["energetic", "relaxed", "confident", "playful", "elegant"];
const STYLES = [
  "Dark Academia",
  "Old Money",
  "Streetwear",
  "Y2K",
  "Minimalist",
  "Boho",
  "Preppy",
  "Grunge",
  "Classic",
  "Techwear",
  "Androgynous",
  "Coastal Chic",
  "Business Casual",
  "Avant-Garde",
  "Cottagecore",
  "Edgy",
  "Athleisure",
  "Casual Cool",
  "Romantic",
  "Artsy"
];

export default function GenerateOutfitPage() {
  const router = useRouter();
  const { wardrobe, loading: wardrobeLoading } = useWardrobe();
  const { profile: userProfile, isLoading: profileLoading } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    occasion: "",
    mood: "",
    style: "",
    description: "",
    gender: "male",
  });

  const randomizeFields = () => {
    const randomOccasion = OCCASIONS[Math.floor(Math.random() * OCCASIONS.length)];
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)];
    const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)];
    const userGender = userProfile?.gender || 'male';

    setFormData(prev => ({
      ...prev,
      occasion: randomOccasion,
      mood: randomMood,
      style: randomStyle,
      gender: userGender,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!wardrobe || wardrobe.length === 0) {
      setError("Please add some items to your wardrobe first");
      setLoading(false);
      return;
    }

    if (!userProfile) {
      setError("Please complete your profile first");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        wardrobe: wardrobe,
        weather: {
          temperature: 70,
          condition: "sunny",
          location: "default",
          humidity: 50,
          wind_speed: 5,
          precipitation: 0
        },
        userProfile: {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          preferences: userProfile.preferences,
          measurements: userProfile.measurements,
          stylePreferences: userProfile.stylePreferences,
          bodyType: userProfile.bodyType,
          skinTone: userProfile.measurements.skinTone,
          createdAt: userProfile.createdAt,
          updatedAt: userProfile.updatedAt
        },
        likedOutfits: [],
        trendingStyles: []
      };

      // Log the payload
      console.log('Outfit Generation Payload:', {
        occasion: formData.occasion,
        mood: formData.mood,
        style: formData.style,
        wardrobeSize: wardrobe.length,
        userProfile: {
          id: userProfile.id,
          stylePreferences: userProfile.stylePreferences,
          bodyType: userProfile.bodyType
        }
      });

      const response = await fetch("/api/outfit/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Outfit Generation Error:', data);
        throw new Error(data.details || data.error || "Failed to generate outfit");
      }

      // Log the response
      console.log('Generated Outfit:', {
        id: data.id,
        name: data.name,
        occasion: data.occasion,
        style: data.style,
        items: data.items?.map((item: any) => ({
          name: item.name,
          type: item.type,
          style: item.style
        }))
      });

      // Redirect to the outfit details page
      router.push(`/outfits/${data.id}`);
    } catch (err) {
      console.error('Outfit Generation Error:', err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (wardrobeLoading || profileLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <WeatherDisplay />
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Outfit</CardTitle>
          <CardDescription>
            Create a new outfit based on your preferences and wardrobe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select
                  value={formData.occasion}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, occasion: value }))
                  }
                >
                  <SelectTrigger id="occasion">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>
                        {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood</Label>
                <Select
                  value={formData.mood}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, mood: value }))
                  }
                >
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select
                  value={formData.style}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, style: value }))
                  }
                >
                  <SelectTrigger id="style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLES.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Add any additional details about your desired outfit..."
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={randomizeFields}
                disabled={loading}
              >
                Randomize
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Outfit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 