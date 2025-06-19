import { useOnboardingStore } from '@/lib/store/onboardingStore';

export function ProgressBar() {
  const { currentStep, totalSteps, getProgress } = useOnboardingStore();
  const progress = getProgress();

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index + 1 === currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index + 1 === currentStep
                  ? 'border-primary bg-primary text-primary-foreground'
                  : index + 1 < currentStep
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-16 ${
                  index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 