import { MultiTierSurvey } from '../MultiTierSurvey';
import { Suspense } from 'react';

interface NPSSurveyCardProps {
  experienceRating: number | null;
  onExperienceRating: (rating: number) => void;
  onComplete: () => void;
}

export function NPSSurveyCard({
  experienceRating,
  onExperienceRating,
  onComplete,
}: NPSSurveyCardProps) {
  return (
    <div className="mx-2.5 sm:mx-3 md:mx-[15px] mb-4">
      <Suspense fallback={<div className="h-32 bg-gray-50 rounded-[20px] animate-pulse" />}>
        <MultiTierSurvey
          experienceRating={experienceRating}
          onExperienceRating={onExperienceRating}
          onComplete={onComplete}
        />
      </Suspense>
    </div>
  );
}
