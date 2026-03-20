import { List, Grid3x3, Star, Loader2, X } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface Product {
  id: number;
  name: string;
  image: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  originalPrice: number;
  mrp: number;
  discount: number;
  gst: number;
}

interface ItemDetailsSectionProps {
  products: Product[];
  viewMode: 'compact' | 'detail';
  onViewModeChange: (mode: 'compact' | 'detail') => void;
  productRatings: Record<number, number>;
  submittedReviews: Record<number, boolean>;
  onRateClick: (product: Product, rating: number) => void;
}

export function ItemDetailsSection({
  products,
  viewMode,
  onViewModeChange,
  productRatings,
  submittedReviews,
  onRateClick
}: ItemDetailsSectionProps) {
  const { t } = useLanguage();
  const [staffRating, setStaffRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSavingStaffRating, setIsSavingStaffRating] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  // New feedback questions state
  const [newFlavorCommunication, setNewFlavorCommunication] = useState<boolean | null>(null);
  const [upsellSuggestion, setUpsellSuggestion] = useState<boolean | null>(null);
  const [decisionSupportRating, setDecisionSupportRating] = useState(0);
  const [hoveredDecisionStar, setHoveredDecisionStar] = useState(0);
  const [speedRating, setSpeedRating] = useState(0);
  const [hoveredSpeedStar, setHoveredSpeedStar] = useState(0);
  const [orderAccuracy, setOrderAccuracy] = useState<boolean | null>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleStaffRating = async (rating: number) => {
    setStaffRating(rating);
    setShowFeedbackModal(true);
  };
  
  const handleDecisionRating = (rating: number) => {
    setDecisionSupportRating(rating);
  };
  
  const handleSpeedRating = (rating: number) => {
    setSpeedRating(rating);
  };
  
  const handleSubmitFeedback = async () => {
    setIsSubmittingFeedback(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmittingFeedback(false);
    setFeedbackSubmitted(true);
    
    // Close modal after short delay
    setTimeout(() => {
      setShowFeedbackModal(false);
    }, 1500);
  };
  
  const handleCloseModal = () => {
    setShowFeedbackModal(false);
  };
  
  const isFormComplete = newFlavorCommunication !== null && 
    upsellSuggestion !== null && 
    decisionSupportRating > 0 && 
    speedRating > 0 && 
    orderAccuracy !== null;
  
  // Calculate progress
  const answeredCount = [
    newFlavorCommunication !== null,
    upsellSuggestion !== null,
    decisionSupportRating > 0,
    speedRating > 0,
    orderAccuracy !== null
  ].filter(Boolean).length;
  const totalQuestions = 5;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  return (
    <div className="sm:mx-[15px] mx-3 mb-[16px] bg-white rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)] mt-[0px] mr-[15px] ml-[12px] p-[20px] px-[15px] py-[20px]">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-base text-[#101828]">{t('itemDetails')}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange('compact')}
            className={`p-1.5 rounded ${viewMode === 'compact' ? 'bg-[#000000] text-white' : 'bg-gray-100'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('detail')}
            className={`p-1.5 rounded ${viewMode === 'detail' ? 'bg-[#000000] text-white' : 'bg-gray-100'}`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Store Associate Rating */}
      <div className="pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop"
            alt="Priya Sharma"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#000000]"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm text-[#101828] mb-1">
              Priya Sharma <span className="font-normal text-[#6a7282]">(Store Associate)</span>
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStaffRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${
                      star <= (hoveredStar || staffRating)
                        ? 'fill-[#CBA258] text-[#CBA258]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        {staffRating > 0 && !showFeedbackModal && (
          <p className="text-xs text-[#000000] mt-2 animate-fadeIn">
            Thank you for rating!
          </p>
        )}
      </div>

      {/* Feedback Modal / Bottom Sheet */}
      <Dialog open={showFeedbackModal} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-[425px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Rate Store Associate</DialogTitle>
            <DialogDescription className="sr-only">
              Share your experience with our store associate. Your feedback helps us improve our service.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 py-2">
            {/* Associate Info */}
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop"
                  alt="Priya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#101828]">Priya Sharma</p>
                <p className="text-sm text-[#6a7282]">Store Associate</p>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Overall Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setStaffRating(star)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= staffRating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
                <span className="text-sm text-[#6a7282] ml-2">
                  {staffRating === 0 ? "Tap to rate" : staffRating === 5 ? "Excellent!" : staffRating === 4 ? "Good" : staffRating === 3 ? "Average" : staffRating === 2 ? "Poor" : "Very Poor"}
                </span>
              </div>
            </div>

            {/* Sub Ratings */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Rate the Details</Label>
              
              {/* New Flavor Communication */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a5565]">New Flavor Info</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setDecisionSupportRating(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= decisionSupportRating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Helpfulness */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a5565]">Helpfulness</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setHoveredDecisionStar(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= hoveredDecisionStar ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Speed of Service */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a5565]">Speed of Service</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSpeedRating(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= speedRating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Friendliness */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a5565]">Friendliness</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setHoveredSpeedStar(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= hoveredSpeedStar ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Yes/No Questions */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Additional Feedback</Label>
              
              <div className="space-y-3">
                {/* New Flavor Communication */}
                <div>
                  <p className="text-sm text-[#4a5565] mb-2">Did the associate inform you about new flavors?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setNewFlavorCommunication(true)}
                      className={`h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        newFlavorCommunication === true 
                          ? 'border-[#000000] bg-[#000000]/5' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setNewFlavorCommunication(false)}
                      className={`h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        newFlavorCommunication === false 
                          ? 'border-[#000000] bg-[#000000]/5' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Upsell Suggestion */}
                <div>
                  <p className="text-sm text-[#4a5565] mb-2">Did they suggest add-ons or upgrades?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setUpsellSuggestion(true)}
                      className={`h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        upsellSuggestion === true 
                          ? 'border-[#000000] bg-[#000000]/5' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setUpsellSuggestion(false)}
                      className={`h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        upsellSuggestion === false 
                          ? 'border-[#000000] bg-[#000000]/5' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Order Accuracy */}
                <div>
                  <p className="text-sm text-[#4a5565] mb-2">Was your order accurate?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOrderAccuracy(true)}
                      className={`h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        orderAccuracy === true 
                          ? 'border-[#000000] bg-[#000000]/5' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setOrderAccuracy(false)}
                      className={`h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        orderAccuracy === false 
                          ? 'border-[#000000] bg-[#000000]/5' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleSubmitFeedback} 
              disabled={!isFormComplete || isSubmittingFeedback}
              className="w-full text-white rounded-lg font-medium transition-all hover:opacity-90"
              style={{ 
                background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
                opacity: (!isFormComplete || isSubmittingFeedback) ? 0.5 : 1
              }}
            >
              {isSubmittingFeedback ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : feedbackSubmitted ? (
                '✓ Submitted!'
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Cards */}
      <div>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            rating={productRatings[product.id] || 0}
            hasSubmittedReview={submittedReviews[product.id]}
            onRate={(rating) => onRateClick(product, rating)}
            onTellUsMore={() => onRateClick(product, productRatings[product.id])}
            onViewReview={() => onRateClick(product, productRatings[product.id])}
            showSeparator={index < products.length - 1}
          />
        ))}
      </div>
    </div>
  );
}