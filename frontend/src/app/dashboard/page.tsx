import TodaysOutfitRecommendation from '@/components/dashboard/TodaysOutfitRecommendation';
import WardrobeOverview from '@/components/dashboard/WardrobeOverview';
import StylistAssistantWidget from '@/components/dashboard/StylistAssistantWidget';
import SmartReminders from '@/components/dashboard/SmartReminders';
import WardrobeInsights from '@/components/dashboard/WardrobeInsights';
import WardrobeGapAnalysis from '@/components/dashboard/WardrobeGapAnalysis';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Wardrobe Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Discover insights, get recommendations, and manage your style
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <TodaysOutfitRecommendation />
            </div>
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <WardrobeOverview />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <StylistAssistantWidget />
            </div>
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <SmartReminders />
            </div>
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <WardrobeInsights />
            </div>
          </div>
        </div>
        
        {/* Full-width gap analysis section */}
        <div className="mt-12 transform hover:scale-[1.01] transition-all duration-300">
          <WardrobeGapAnalysis />
        </div>
      </div>
    </div>
  );
} 