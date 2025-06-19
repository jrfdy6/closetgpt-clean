import StyleRules from '@/components/style/StyleRules';

export default function StyleRulesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Style Rules</h1>
        <p className="text-gray-600 mb-8">
          Create custom style rules to guide your outfit generation. These rules will help the AI understand your preferences
          for different occasions, weather conditions, and seasons.
        </p>
        <StyleRules />
      </div>
    </div>
  );
} 