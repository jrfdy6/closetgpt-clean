'use client';

import { useState, useEffect, useRef } from 'react';
import { OutfitGeneratedOutfit, ClothingItem, UserProfile } from '@shared/types';
import { WeatherData } from '@/types/weather';
import { useWeather } from '@/hooks/useWeather';
import { useOutfitGenerator } from '@/hooks/useOutfitGenerator';
import { useWardrobe } from '@/hooks/useWardrobe';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  RefreshCw, 
  Heart, 
  Share2, 
  Calendar,
  Sun,
  Cloud,
  Umbrella,
  Thermometer
} from 'lucide-react';

export default function TodaysOutfitRecommendation() {
  const [outfit, setOutfit] = useState<OutfitGeneratedOutfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasGenerated = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const { weather, loading: weatherLoading } = useWeather();
  const { wardrobe, loading: wardrobeLoading } = useWardrobe();
  const { profile } = useUserProfile();
  const { generateOutfit, loading: generatingOutfit } = useOutfitGenerator();

  useEffect(() => {
    const generateTodaysOutfit = async () => {
      // Prevent multiple generations
      if (hasGenerated.current) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        if (!weather || !wardrobe || !profile) {
          return;
        }

        hasGenerated.current = true;
        
        const generatedOutfit = await generateOutfit({
          wardrobe: wardrobe as ClothingItem[],
          weather,
          occasion: 'casual',
          userProfile: profile as UserProfile
        });

        setOutfit(generatedOutfit);
      } catch (err) {
        setError('Failed to generate outfit recommendation');
        console.error('Error generating outfit:', err);
        // Reset the flag on error so user can retry
        hasGenerated.current = false;
      } finally {
        setLoading(false);
      }
    };

    if (!weatherLoading && !wardrobeLoading && !hasGenerated.current) {
      generateTodaysOutfit();
    }
  }, [weather, wardrobe, profile, weatherLoading, wardrobeLoading]); // Removed generateOutfit from dependencies

  // Reset generation flag when key dependencies change
  useEffect(() => {
    hasGenerated.current = false;
  }, [weather?.location, wardrobe?.length, profile?.id]);

  const handleGenerateOutfit = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  if (loading || generatingOutfit) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Today's Outfit</CardTitle>
                <p className="text-indigo-100 text-sm">Perfect for your day ahead</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Weather Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">{weather?.condition}</p>
                  <p className="text-sm text-gray-600">Perfect weather for this outfit</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{weather?.temperature}°F</p>
                <p className="text-xs text-gray-500">Feels great!</p>
              </div>
            </div>
          </div>

          {/* Outfit Items */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Recommended Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outfit?.items.map((item, index) => {
                // Handle both string and object items
                if (typeof item === 'string') {
                  return (
                    <div 
                      key={index}
                      className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{item}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Item
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div 
                    key={index}
                    className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.color && (
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: item.color.toLowerCase() }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleGenerateOutfit}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate New Outfit
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`transition-all duration-200 ${
                  liked 
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Style Tips */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Style Tip
            </h4>
            <p className="text-sm text-green-700">
              {outfit?.metadata?.styleNotes || 'No style notes available'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Today's Outfit</CardTitle>
                <p className="text-indigo-100 text-sm">Perfect for your day ahead</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Weather Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">{weather?.condition}</p>
                  <p className="text-sm text-gray-600">Perfect weather for this outfit</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{weather?.temperature}°F</p>
                <p className="text-xs text-gray-500">Feels great!</p>
              </div>
            </div>
          </div>

          {/* Outfit Items */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Recommended Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outfit?.items.map((item, index) => {
                // Handle both string and object items
                if (typeof item === 'string') {
                  return (
                    <div 
                      key={index}
                      className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{item}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Item
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div 
                    key={index}
                    className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.color && (
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: item.color.toLowerCase() }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleGenerateOutfit}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate New Outfit
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`transition-all duration-200 ${
                  liked 
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Style Tips */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Style Tip
            </h4>
            <p className="text-sm text-green-700">
              {error}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!outfit) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Today's Outfit</CardTitle>
                <p className="text-indigo-100 text-sm">Perfect for your day ahead</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Weather Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">{weather?.condition}</p>
                  <p className="text-sm text-gray-600">Perfect weather for this outfit</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{weather?.temperature}°F</p>
                <p className="text-xs text-gray-500">Feels great!</p>
              </div>
            </div>
          </div>

          {/* Outfit Items */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Recommended Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outfit?.items.map((item, index) => {
                // Handle both string and object items
                if (typeof item === 'string') {
                  return (
                    <div 
                      key={index}
                      className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{item}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Item
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div 
                    key={index}
                    className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.color && (
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: item.color.toLowerCase() }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleGenerateOutfit}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate New Outfit
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`transition-all duration-200 ${
                  liked 
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Style Tips */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Style Tip
            </h4>
            <p className="text-sm text-green-700">
              No outfit recommendation available. Add more items to your wardrobe!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Today's Outfit</CardTitle>
              <p className="text-indigo-100 text-sm">Perfect for your day ahead</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Weather Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-800">{weather?.condition}</p>
                <p className="text-sm text-gray-600">Perfect weather for this outfit</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{weather?.temperature}°F</p>
              <p className="text-xs text-gray-500">Feels great!</p>
            </div>
          </div>
        </div>

        {/* Outfit Items */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Recommended Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {outfit?.items.map((item, index) => {
              // Handle both string and object items
              if (typeof item === 'string') {
                return (
                  <div 
                    key={index}
                    className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Item
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div 
                  key={index}
                  className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        {item.color && (
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: item.color.toLowerCase() }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleGenerateOutfit}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate New Outfit
              </>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={`transition-all duration-200 ${
                liked 
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-gray-50"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Style Tips */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Style Tip
          </h4>
          <p className="text-sm text-green-700">
            {outfit?.metadata?.styleNotes || 'No style notes available'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 