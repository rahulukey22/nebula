import { Star } from 'lucide-react';
import { cn } from './ui/utils';
import { useState, memo } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { brand } from '../config/brand';

interface RateItemProps {
  rating: number; // Current rating (0 if not rated)
  onRate: (rating: number) => void;
  className?: string;
  hasSubmittedReview?: boolean; // Whether user has submitted detailed review
  onTellUsMore?: () => void; // Callback for "Tell us more" button
  onViewReview?: () => void; // Callback for "View" button (when review is submitted)
}

export const RateItem = memo(function RateItem({ rating, onRate, className, hasSubmittedReview = false, onTellUsMore, onViewReview }: RateItemProps) {
  const { t } = useLanguage();
  // Local state for visual feedback of "Rating Done"
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleRate = (star: number) => {
    // Don't allow rating changes if review is already submitted
    if (hasSubmittedReview) {
      return;
    }
    
    // Optimistically update UI
    setSelectedRating(star);
    setIsRatingSubmitted(true);
    
    // Brief delay to show the filled stars before opening next window
    setTimeout(() => {
        onRate(star);
        // Reset after a while so it can be reused if needed
        setTimeout(() => setIsRatingSubmitted(false), 1000); 
    }, 500); 
  };

  const hasRating = rating > 0;
  const showTellUsMore = hasRating && !hasSubmittedReview && onTellUsMore;
  const showViewButton = hasRating && hasSubmittedReview && onViewReview;

  return (
    <div className={cn("relative flex flex-col bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl overflow-hidden", className)}>
      <div className="flex items-center px-4 py-3 min-h-[56px]">
        <div className="flex items-center gap-4 w-full">
          <p className="text-sm font-medium text-[#101828]">
            {hasRating ? t('youRated') : t('rateItem')}
          </p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRate(star);
                }}
                className={cn(
                  "w-6 h-6 transition-transform",
                  hasSubmittedReview ? "cursor-default" : "hover:scale-110 active:scale-95 cursor-pointer"
                )}
                type="button"
                disabled={hasSubmittedReview}
              >
                <Star
                  className={cn(
                    "w-full h-full transition-colors duration-200",
                    star <= (isRatingSubmitted ? selectedRating : rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-yellow-400'
                  )}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {showTellUsMore && (
        <div className="px-4 pb-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTellUsMore?.();
            }}
            className="w-full py-2.5 text-white rounded-xl text-sm font-medium transition-colors"
            style={{ backgroundColor: brand.colors.primary }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brand.colors.primaryDark}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brand.colors.primary}
          >
            {t('tellUsMore')}
          </button>
        </div>
      )}
      
      {showViewButton && (
        <div className="px-4 pb-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewReview?.();
            }}
            className="w-full py-2.5 bg-white text-black border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            View
          </button>
        </div>
      )}
    </div>
  );
});