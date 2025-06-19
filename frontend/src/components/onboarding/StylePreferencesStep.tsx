import { useState } from "react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";
import type { FitPreference, SizePreference, Occasion, FormalityLevel, Season } from "@/lib/store/onboardingStore";

const OCCASIONS = [
  { value: "casual", label: "Casual" },
  { value: "business", label: "Business" },
  { value: "formal", label: "Formal" },
  { value: "sporty", label: "Sporty" },
  { value: "evening", label: "Evening" },
  { value: "beach", label: "Beach" },
  { value: "outdoor", label: "Outdoor" },
  { value: "party", label: "Party" },
  { value: "travel", label: "Travel" },
  { value: "home", label: "Home" },
];

const FORMALITY_LEVELS = [
  { value: "very_casual", label: "Very Casual" },
  { value: "casual", label: "Casual" },
  { value: "smart_casual", label: "Smart Casual" },
  { value: "business_casual", label: "Business Casual" },
  { value: "business", label: "Business" },
  { value: "formal", label: "Formal" },
  { value: "very_formal", label: "Very Formal" },
];

const SEASONS = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

export function StylePreferencesStep({ onComplete }: { onComplete: () => void }) {
  const { stylePreferences, setStylePreferences } = useOnboardingStore();

  const handleComplete = () => {
    if (!stylePreferences.occasions?.length) {
      toast.error("Please select at least one occasion");
      return;
    }
    if (!stylePreferences.formalityLevel) {
      toast.error("Please select your preferred formality level");
      return;
    }
    if (!stylePreferences.seasons?.length) {
      toast.error("Please select at least one season");
      return;
    }
    if (!stylePreferences.fitPreference) {
      toast.error("Please select your fit preference");
      return;
    }
    if (!stylePreferences.sizePreference) {
      toast.error("Please select your size preference");
      return;
    }
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Occasions</Label>
          <MultiSelect
            options={OCCASIONS}
            value={stylePreferences.occasions || []}
            onChange={(value: Occasion[]) => setStylePreferences({ occasions: value })}
            placeholder="Select occasions"
          />
        </div>

        <div>
          <Label>Formality Level</Label>
          <Select
            value={stylePreferences.formalityLevel}
            onValueChange={(value: FormalityLevel) => setStylePreferences({ formalityLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select formality level" />
            </SelectTrigger>
            <SelectContent>
              {FORMALITY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Seasonal Preferences</Label>
          <MultiSelect
            options={SEASONS}
            value={stylePreferences.seasons || []}
            onChange={(value: Season[]) => setStylePreferences({ seasons: value })}
            placeholder="Select seasons"
          />
        </div>

        <div>
          <Label>Fit Preference</Label>
          <Select
            value={stylePreferences.fitPreference}
            onValueChange={(value: FitPreference) => setStylePreferences({ fitPreference: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fit preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fitted">Fitted</SelectItem>
              <SelectItem value="relaxed">Relaxed</SelectItem>
              <SelectItem value="oversized">Oversized</SelectItem>
              <SelectItem value="loose">Loose</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Size Preference</Label>
          <Select
            value={stylePreferences.sizePreference}
            onValueChange={(value: SizePreference) => setStylePreferences({ sizePreference: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xs">XS</SelectItem>
              <SelectItem value="s">S</SelectItem>
              <SelectItem value="m">M</SelectItem>
              <SelectItem value="l">L</SelectItem>
              <SelectItem value="xl">XL</SelectItem>
              <SelectItem value="xxl">XXL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleComplete} className="w-full">
        Complete
      </Button>
    </div>
  );
} 