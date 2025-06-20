'use client';

import { useWardrobe } from '@/hooks/useWardrobe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shirt, 
  Users, 
  Footprints, 
  Layers, 
  Plus,
  TrendingUp,
  Palette,
  Calendar,
  Star
} from 'lucide-react';

export default function WardrobeOverview() {
  const { wardrobe, loading, error } = useWardrobe();

  if (loading) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shirt className="w-6 h-6" />
            </div>
            <span>Wardrobe Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-red-50">
        <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shirt className="w-6 h-6" />
            </div>
            <span>Wardrobe Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-red-600">{error}</div>
        </CardContent>
      </Card>
    );
  }

  const totalItems = wardrobe?.length || 0;
  
  // Calculate item type distribution
  const itemTypes = wardrobe?.reduce((acc, item) => {
    const type = item.type || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Calculate color distribution
  const colors = wardrobe?.reduce((acc, item) => {
    const color = item.color || 'unknown';
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Get top colors
  const topColors = Object.entries(colors)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shirt': return <Shirt className="w-4 h-4" />;
      case 'pants': return <Footprints className="w-4 h-4" />;
      case 'shoes': return <Footprints className="w-4 h-4" />;
      case 'jacket': return <Layers className="w-4 h-4" />;
      default: return <Shirt className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shirt': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pants': return 'bg-green-100 text-green-800 border-green-200';
      case 'shoes': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'jacket': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Wardrobe Overview</CardTitle>
              <p className="text-green-100 text-sm">Your complete style collection</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalItems}</div>
            <div className="text-green-100 text-sm">Total Items</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{itemTypes.shirt || 0}</div>
            <div className="text-sm text-blue-700">Tops</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-600">{itemTypes.pants || 0}</div>
            <div className="text-sm text-green-700">Bottoms</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{itemTypes.shoes || 0}</div>
            <div className="text-sm text-purple-700">Shoes</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">{itemTypes.jacket || 0}</div>
            <div className="text-sm text-orange-700">Outerwear</div>
          </div>
        </div>

        {/* Item Type Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            Item Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(itemTypes).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(type)}`}>
                    {getTypeIcon(type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 capitalize">{type}</p>
                    <p className="text-sm text-gray-500">{count} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">
                    {Math.round((count / totalItems) * 100)}%
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                      style={{ width: `${(count / totalItems) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        {topColors.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-500" />
              Color Palette
            </h3>
            <div className="flex flex-wrap gap-2">
              {topColors.map(([color, count]) => (
                <div key={color} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">{color}</span>
                  <Badge variant="outline" className="text-xs">{count}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4">
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 