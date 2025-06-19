import TodaysOutfitRecommendation from '@/components/dashboard/TodaysOutfitRecommendation';
import WardrobeOverview from '@/components/dashboard/WardrobeOverview';
import StyleGoalsProgress from '@/components/dashboard/StyleGoalsProgress';
import RecentUploadsCarousel from '@/components/dashboard/RecentUploadsCarousel';
import InspirationFeed from '@/components/dashboard/InspirationFeed';
import WeatherRecommendations from '@/components/dashboard/WeatherRecommendations';
import MixAndMatchSuggestions from '@/components/dashboard/MixAndMatchSuggestions';
import StylistAssistantWidget from '@/components/dashboard/StylistAssistantWidget';
import SmartReminders from '@/components/dashboard/SmartReminders';
import WardrobeInsights from '@/components/dashboard/WardrobeInsights';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <TodaysOutfitRecommendation />
          <WardrobeOverview />
          <StyleGoalsProgress />
          <RecentUploadsCarousel />
        </div>
        <div className="space-y-8">
          <InspirationFeed />
          <WeatherRecommendations />
          <MixAndMatchSuggestions />
          <StylistAssistantWidget />
          <SmartReminders />
          <WardrobeInsights />
        </div>
      </div>
    </div>
  );
} 