'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  ShoppingCart,
  Star,
  Zap,
  Target,
  Palette,
  Calendar
} from 'lucide-react';

interface WardrobeGap {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  suggestedItems: string[];
  priority: number;
  data?: any;
}

interface TrendingStyle {
  name: string;
  description: string;
  popularity: number;
  key_items: string[];
  colors: string[];
}

interface WardrobeStats {
  total_items: number;
  item_types: Record<string, number>;
  colors: Record<string, number>;
  styles: Record<string, number>;
  seasons: Record<string, number>;
  brands: Record<string, number>;
  price_range: {
    min: number;
    max: number;
    avg: number;
  };
}

interface GapAnalysisData {
  gaps: WardrobeGap[];
  coverage: Record<string, number>;
  recommendations: string[];
  trending_styles: TrendingStyle[];
  wardrobe_stats: WardrobeStats;
  analysis_timestamp: string;
}

const WardrobeGapAnalysis: React.FC = () => {
  const [gapData, setGapData] = useState<GapAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('gaps');

  const fetchGapAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/wardrobe/gaps');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setGapData(data.data);
      } else {
        setError('Failed to load wardrobe analysis');
      }
    } catch (err) {
      console.error('Error fetching gap analysis:', err);
      setError('Error loading wardrobe analysis');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGapAnalysis();
  }, [fetchGapAnalysis]);

  const handleAddItem = (itemName: string) => {
    // Navigate to add item page with pre-filled data
    window.location.href = `/wardrobe/add?item=${encodeURIComponent(itemName)}`;
  };

  const handleShoppingSuggestion = (items: string[]) => {
    // Open shopping suggestions modal or navigate to shopping page
    const itemsParam = items.join(',');
    window.open(`/shopping?items=${encodeURIComponent(itemsParam)}`, '_blank');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Wardrobe Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="mt-4">
              <Button onClick={fetchGapAnalysis} variant="outline" size="sm">
                Retry Loading
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!gapData) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>No wardrobe data available</AlertDescription>
      </Alert>
    );
  }

  const highPriorityGaps = gapData.gaps.filter(gap => gap.severity === 'high');
  const mediumPriorityGaps = gapData.gaps.filter(gap => gap.severity === 'medium');
  const lowPriorityGaps = gapData.gaps.filter(gap => gap.severity === 'low');

  return (
    <div className="space-y-6">
      {/* Header with Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Wardrobe Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{highPriorityGaps.length}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{mediumPriorityGaps.length}</div>
              <div className="text-sm text-gray-600">Medium Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{lowPriorityGaps.length}</div>
              <div className="text-sm text-gray-600">Low Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{gapData.wardrobe_stats.total_items}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </div>
          
          {/* Coverage Progress */}
          <div className="space-y-3">
            <h4 className="font-semibold">Wardrobe Coverage</h4>
            {Object.entries(gapData.coverage).map(([category, percentage]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{category.replace('_', ' ')}</span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gaps">Gaps</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Gaps Tab */}
        <TabsContent value="gaps" className="space-y-4">
          {/* High Priority Gaps */}
          {highPriorityGaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  High Priority Gaps ({highPriorityGaps.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {highPriorityGaps.map((gap) => (
                  <div key={gap.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-800">{gap.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{gap.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {gap.suggestedItems.slice(0, 3).map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleAddItem(gap.suggestedItems[0])}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Item
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleShoppingSuggestion(gap.suggestedItems)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Shop
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Medium Priority Gaps */}
          {mediumPriorityGaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <Target className="w-5 h-5" />
                  Medium Priority Gaps ({mediumPriorityGaps.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mediumPriorityGaps.map((gap) => (
                  <div key={gap.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-yellow-800">{gap.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{gap.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {gap.suggestedItems.slice(0, 2).map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAddItem(gap.suggestedItems[0])}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Low Priority Gaps */}
          {lowPriorityGaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  Low Priority Gaps ({lowPriorityGaps.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lowPriorityGaps.map((gap) => (
                  <div key={gap.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800">{gap.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{gap.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {gap.suggestedItems.slice(0, 2).map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Trending Styles Tab */}
        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Styles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gapData.trending_styles.map((style, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{style.name}</h4>
                      <Badge className="bg-purple-100 text-purple-800">
                        <Star className="w-3 h-3 mr-1" />
                        {style.popularity}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{style.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Key Items:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {style.key_items.slice(0, 4).map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Colors:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {style.colors.slice(0, 4).map((color, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleShoppingSuggestion(style.key_items)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Shop This Trend
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Types */}
            <Card>
              <CardHeader>
                <CardTitle>Item Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(gapData.wardrobe_stats.item_types).map(([type, count]) => (
                    <div key={type} className="flex justify-between">
                      <span className="capitalize">{type}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Color Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(gapData.wardrobe_stats.colors).map(([color, count]) => (
                    <div key={color} className="flex justify-between">
                      <span className="capitalize">{color}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Styles */}
            <Card>
              <CardHeader>
                <CardTitle>Style Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(gapData.wardrobe_stats.styles).map(([style, count]) => (
                    <div key={style} className="flex justify-between">
                      <span className="capitalize">{style}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seasons */}
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(gapData.wardrobe_stats.seasons).map(([season, count]) => (
                    <div key={season} className="flex justify-between">
                      <span className="capitalize">{season}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gapData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WardrobeGapAnalysis; 