import { useState, useRef, useEffect } from 'react';
import { Camera, Video, Send, ChevronRight, Star, CheckCircle2, Eye } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { cn } from './ui/utils';

interface MultiTierSurveyProps {
  experienceRating: number | null;
  onExperienceRating: (rating: number) => void;
  onComplete: () => void;
  purchaseDate?: string;
  storeName?: string;
}

interface SubmittedSurveyData {
  rating: number;
  reason: string | null;
  detail: string | null;
  comment: string;
  timestamp: string;
}

export function MultiTierSurvey({ experienceRating, onExperienceRating, onComplete, purchaseDate, storeName }: MultiTierSurveyProps) {
  const { t } = useLanguage();
  const [surveyStep, setSurveyStep] = useState<'rating' | 'reason' | 'detail' | 'final'>('rating');
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedSurveyData | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  // Check if survey has been submitted on mount
  useEffect(() => {
    const storedData = localStorage.getItem('nps_survey_submitted');
    if (storedData) {
      const data = JSON.parse(storedData);
      setIsSubmitted(true);
      setSubmittedData(data);
      onExperienceRating(data.rating);
    }
  }, []);

  // Determine rating category
  const getRatingCategory = () => {
    if (experienceRating === null) return null;
    if (experienceRating <= 6) return 'detractor';
    if (experienceRating <= 8) return 'passive';
    return 'promoter';
  };

  // Reason options based on rating category
  const getReasonOptions = () => {
    const category = getRatingCategory();
    if (category === 'detractor') {
      return [
        'Ice cream quality concerns',
        'Customer service experience',
        'Pricing concerns',
        'Flavor availability',
        'Store cleanliness issues',
        'Long wait times'
      ];
    } else if (category === 'passive') {
      return [
        'Add more flavors',
        'More promotions & offers',
        'Improve store experience',
        'Better flavor descriptions',
        'Enhanced customer support',
        'Faster service'
      ];
    } else {
      return [
        'Exceptional ice cream quality',
        'Outstanding customer service',
        'Great value for money',
        'Amazing flavor selection',
        'Clean & welcoming store',
        'Fast & friendly service'
      ];
    }
  };

  // Detail options based on selected reason
  const getDetailOptions = () => {
    if (!selectedReason) return [];
    
    const detailMap: { [key: string]: string[] } = {
      'Ice cream quality concerns': ['Melted/Texture', 'Flavor issue', 'Not fresh', 'Wrong order'],
      'Customer service experience': ['Slow service', 'Unhelpful staff', 'Rude behavior', 'Poor communication'],
      'Pricing concerns': ['Too expensive', 'No discounts', 'Hidden charges', 'Not competitive'],
      'Flavor availability': ['Out of stock', 'Limited flavors', 'No samples', 'Discontinued flavor'],
      'Store cleanliness issues': ['Unclean seating', 'Messy counter', 'Poor maintenance', 'Hygiene concerns'],
      'Long wait times': ['Slow billing', 'Long queue', 'Short-staffed', 'Slow preparation'],
      'Add more flavors': ['Exotic flavors', 'Seasonal specials', 'Regional flavors', 'Sugarfree options'],
      'More promotions & offers': ['Family combos', 'Loyalty rewards', 'Birthday specials', 'Student discounts'],
      'Improve store experience': ['Better seating', 'AC/Ambiance', 'Music', 'Parking'],
      'Better flavor descriptions': ['Ingredient list', 'Allergen info', 'Calorie info', 'Flavor samples'],
      'Enhanced customer support': ['Faster billing', 'More staff', 'Training needed', 'Better coordination'],
      'Faster service': ['Quick service', 'Pre-order option', 'Express counter', 'Mobile ordering'],
      'Exceptional ice cream quality': ['Perfect texture', 'Rich flavor', 'Fresh taste', 'Quality ingredients'],
      'Outstanding customer service': ['Friendly staff', 'Quick service', 'Helpful recommendations', 'Welcoming team'],
      'Great value for money': ['Worth the price', 'Good portions', 'Quality justified', 'Happy with offer'],
      'Amazing flavor selection': ['Wide variety', 'Unique flavors', 'All favorites', 'New discoveries'],
      'Clean & welcoming store': ['Spotless clean', 'Nice ambiance', 'Comfortable seating', 'Well maintained'],
      'Fast & friendly service': ['Quick service', 'Warm welcome', 'Efficient staff', 'Positive vibe']
    };
    
    return detailMap[selectedReason] || [];
  };

  // Handle rating selection and move to next step
  const handleRatingSelect = (rating: number) => {
    onExperienceRating(rating);
    setTimeout(() => setSurveyStep('reason'), 300);
  };

  // Handle reason selection
  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setTimeout(() => setSurveyStep('detail'), 300);
  };

  // Handle detail selection
  const handleDetailSelect = (detail: string) => {
    setSelectedDetail(detail);
    setTimeout(() => setSurveyStep('final'), 300);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    console.log('Submit button clicked!')
    
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-eeaec47f`;
      
      // Get userId from localStorage or generate one
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('userId', userId);
      }
      
      const surveyData = {
        userId,
        rating: experienceRating,
        reason: selectedReason,
        detail: selectedDetail,
        comment,
        timestamp: new Date().toISOString()
      };

      console.log('Submitting NPS survey:', surveyData);

      // Try to submit to backend, but don't fail if it's unavailable
      try {
        const response = await fetch(`${baseUrl}/nps-survey`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(surveyData)
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('NPS survey saved successfully to backend:', result);
        } else {
          const error = await response.text();
          console.warn('Backend unavailable, saving locally only:', error);
        }
      } catch (fetchError) {
        console.warn('Backend unavailable, saving locally only:', fetchError);
      }

      // Always save locally regardless of backend status
      localStorage.setItem('nps_survey_submitted', JSON.stringify(surveyData));
      localStorage.setItem('nps-survey-submitted', 'true');
      setIsSubmitted(true);
      setSubmittedData(surveyData);
      
      toast.success('Thank you for your feedback!', {
        description: 'Your response has been recorded.'
      });
      onComplete();

    } catch (error) {
      console.error('Error submitting NPS survey:', error);
      toast.error('Failed to submit feedback', {
        description: 'Please check your connection and try again.'
      });
    }
  };

  const category = getRatingCategory();

  // Get color for selected rating
  const getRatingColor = () => {
    if (experienceRating === null) return '#888888';
    const colors = [
      '#bc0101', '#bc0101', '#e01717', '#e93030', '#f83b3b', 
      '#ff4545', '#ff5e5e', '#ffb800', '#ffb800', '#1ac86a', '#07b256'
    ];
    return colors[experienceRating];
  };

  // Rating reference badge component
  const RatingBadge = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div 
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2"
        style={{ 
          borderColor: getRatingColor(),
          backgroundColor: `${getRatingColor()}10`
        }}
      >
        <span 
          className="text-[16px] font-semibold"
          style={{ color: getRatingColor() }}
        >
          {experienceRating}
        </span>
        <span className="text-[12px] text-[#888888]">/10</span>
      </div>
    </div>
  );

  // If already submitted, show thank you card
  if (isSubmitted && submittedData) {
    return (
      <>
        {/* Thank You Card */}
        <div className="bg-gradient-to-br from-[#f8f5fa] to-white border border-[#e5d9ee] shadow-[0px_8px_24px_0px_rgba(92,48,118,0.15)] pointer-events-auto rounded-[20px] max-w-[430px] w-full p-[24px]">
          <div className="flex flex-col items-center gap-4">
            {/* Success Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5b236c] to-[#8a3fa0] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>

            {/* Thank You Message */}
            <div className="text-center space-y-1">
              <p className="font-medium text-[#5c3076]">
                Thank You for Your Feedback!
              </p>
              <p className="text-[14px] text-[#888888] leading-relaxed">
                Your insights help us improve our service.
              </p>
            </div>

            {/* View Feedback Button */}
            <button
              onClick={() => setShowFeedbackDialog(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-[#5c3076] border-2 border-[#5c3076] rounded-xl hover:bg-[#f8f5fa] transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Feedback</span>
            </button>
          </div>
        </div>

        {/* Feedback Dialog/Popup */}
        {showFeedbackDialog && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowFeedbackDialog(false)}
          >
            <div 
              className="bg-white rounded-[20px] max-w-[430px] w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dialog Header */}
              <div className="sticky top-0 bg-gradient-to-br from-[#5b236c] to-[#8a3fa0] p-4 rounded-t-[20px]">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">Your Feedback</p>
                  <button
                    onClick={() => setShowFeedbackDialog(false)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <span className="text-white leading-none">&times;</span>
                  </button>
                </div>
              </div>

              {/* Dialog Content */}
              <div className="p-4 space-y-3">
                {/* Rating Display */}
                <div className="bg-gradient-to-br from-[#f8f5fa] to-white border border-[#e5d9ee] rounded-2xl p-4">
                  <p className="text-[14px] text-[#888888] mb-2">Your Rating</p>
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-xl border-2"
                      style={{ 
                        borderColor: getRatingColor(),
                        backgroundColor: `${getRatingColor()}15`,
                        color: getRatingColor()
                      }}
                    >
                      <span className="font-semibold">{submittedData.rating}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const starRating = Math.round((submittedData.rating / 10) * 5);
                          return (
                            <Star
                              key={star}
                              className={cn(
                                "w-5 h-5",
                                star <= starRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              )}
                              strokeWidth={1.5}
                            />
                          );
                        })}
                      </div>
                      <p className="text-[14px] text-[#888888] mt-1">
                        {submittedData.rating <= 6 ? 'Needs Improvement' : submittedData.rating <= 8 ? 'Good Experience' : 'Excellent Experience'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                {submittedData.reason && (
                  <div className="bg-gradient-to-br from-[#f8f5fa] to-white border border-[#e5d9ee] rounded-2xl p-4">
                    <p className="text-[14px] text-[#888888] mb-2">Primary Reason</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5c3076]"></div>
                      <p className="text-black">{submittedData.reason}</p>
                    </div>
                  </div>
                )}

                {/* Detail */}
                {submittedData.detail && (
                  <div className="bg-gradient-to-br from-[#f8f5fa] to-white border border-[#e5d9ee] rounded-2xl p-4">
                    <p className="text-[14px] text-[#888888] mb-2">Specific Detail</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8a3fa0]"></div>
                      <p className="text-black">{submittedData.detail}</p>
                    </div>
                  </div>
                )}

                {/* Comment */}
                {submittedData.comment && (
                  <div className="bg-gradient-to-br from-[#f8f5fa] to-white border border-[#e5d9ee] rounded-2xl p-4">
                    <p className="text-[14px] text-[#888888] mb-2">Additional Comments</p>
                    <p className="text-black leading-relaxed whitespace-pre-wrap">{submittedData.comment}</p>
                  </div>
                )}

                {/* Timestamp */}
                <div className="text-center pt-1">
                  <p className="text-[14px] text-[#888888]">
                    Submitted on {new Date(submittedData.timestamp).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => setShowFeedbackDialog(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#5b236c] to-[#8a3fa0] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#f8f5fa] to-white border border-[#e5d9ee] shadow-[0px_8px_24px_0px_rgba(92,48,118,0.15)] max-h-[500px] overflow-y-auto pointer-events-auto bg-[rgba(0,0,0,0)] rounded-[20px] max-w-[430px] w-full p-[16px] px-[16px] py-[44px] m-[0px] [@media(min-width:375px)]:p-[20px] [@media(min-width:375px)]:px-[20px]">
      {/* Step 1: NPS Rating */}
      {surveyStep === 'rating' && (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-black text-[16px] mb-2 text-left">
              <strong>{t('helpUsImprove')}</strong>
            </p>
            <p className="text-black leading-relaxed text-[16px] text-left">
              {purchaseDate 
                ? t('npsQuestion').replace('{date}', `on ${purchaseDate}`).replace('{store}', storeName || 'us')
                : storeName
                  ? t('npsQuestionToday').replace('{store}', storeName)
                  : t('npsQuestionDefault')
              }
            </p>
          </div>
          
          <div className="flex items-start justify-between w-full gap-[2px]">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => {
              const colors = [
                '#bc0101', '#bc0101', '#e01717', '#e93030', '#f83b3b', 
                '#ff4545', '#ff5e5e', '#ffb800', '#ffb800', '#1ac86a', '#07b256'
              ];
              const color = colors[rating];
              const isSelected = experienceRating === rating;
              
              return (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  className="relative h-[30px] rounded-[4px] flex items-center justify-center border transition-all flex-1 min-w-0"
                  style={{
                    borderColor: color,
                    backgroundColor: isSelected ? color : 'white',
                  }}
                >
                  <span 
                    className={`text-[13px] font-normal leading-none ${isSelected ? 'text-white' : 'text-black'}`}
                  >
                    {rating}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#888888]">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>

          <div className="bg-[#dbd9e0] h-[4px] rounded-[10px] w-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5b236c] via-[#b646d8] to-[#dba3ec] rounded-[10px] transition-all duration-300"
              style={{ width: experienceRating !== null ? `${Math.max(((experienceRating + 1) / 11) * 100, 5)}%` : '0%' }}
            />
          </div>
        </div>
      )}

      {/* Step 2: Reason Selection */}
      {surveyStep === 'reason' && (
        <div className="flex flex-col gap-4">
          <RatingBadge />
          <div className="text-center">
            <p className="text-[#5c3076] font-medium text-[16px]">
              {category === 'detractor' && 'Why were you disappointed?'}
              {category === 'passive' && 'What could we improve?'}
              {category === 'promoter' && 'What did you love most?'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {getReasonOptions().map((reason) => (
              <button
                key={reason}
                onClick={() => handleReasonSelect(reason)}
                className="flex items-center justify-between bg-white border-2 border-[#dbd9e0] hover:border-[#5c3076] rounded-[12px] p-3 transition-all text-left"
              >
                <span className="text-[14px] text-black">{reason}</span>
                <ChevronRight className="w-4 h-4 text-[#5c3076]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Detail Selection */}
      {surveyStep === 'detail' && (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-[#5c3076] font-medium text-[16px] mb-4">Tell us more</p>
          </div>
          
          <RatingBadge />
          
          <div className="text-center">
            <p className="text-[#888888] text-[13px] mb-4">{selectedReason}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {getDetailOptions().map((detail) => (
              <button
                key={detail}
                onClick={() => handleDetailSelect(detail)}
                className="bg-white border-2 border-[#dbd9e0] hover:border-[#5c3076] rounded-[12px] p-3 transition-all text-center"
              >
                <span className="text-[14px] text-black">{detail}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Final Feedback Form */}
      {surveyStep === 'final' && (
        <div className="flex flex-col gap-4">
          <RatingBadge />
          <div className="text-center">
            <p className="text-[#5c3076] font-medium text-[16px] mb-1">Share Your Feedback</p>
            <p className="text-[#888888] text-[13px]">{selectedDetail}</p>
          </div>

          {/* Upload Buttons */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#5c3076] rounded-[12px] p-3 hover:bg-[#f8f5fa] transition-all"
            >
              <Camera className="w-4 h-4 text-[#5c3076]" />
              <span className="text-[14px] text-[#5c3076]">Photo</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#5c3076] rounded-[12px] p-3 hover:bg-[#f8f5fa] transition-all"
            >
              <Video className="w-4 h-4 text-[#5c3076]" />
              <span className="text-[14px] text-[#5c3076]">Video</span>
            </button>
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-[#f8f5fa] border border-[#dbd9e0] rounded-[8px] px-3 py-1">
                  <span className="text-[12px] text-[#5c3076]">{file.name.substring(0, 15)}...</span>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked - calling handleSubmit');
              handleSubmit();
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5b236c] to-[#8a3fa0] text-white rounded-[12px] p-4 hover:opacity-90 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="text-[14px] font-medium">Submit Feedback</span>
          </button>

          <p className="text-[12px] text-[#888888] text-center">
            Your feedback helps us serve you better
          </p>
        </div>
      )}
    </div>
  );
}