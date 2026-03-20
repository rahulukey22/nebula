import { Star, MapPin, Calendar, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './ui/utils';
import { MultiTierSurvey } from './MultiTierSurvey';
import { RateItem } from './RateItem';
import { LeaveReviewDialog } from './reviews/LeaveReviewDialog';
import { toast } from 'sonner';
import { useLanguage } from '../utils/LanguageContext';
import { brand } from '../config/brand';

const thunderHotFudgeImg = brand.products.receiptItems[0].image;
const belgianChocolateScoopImg = brand.products.recommendations.find(r => r.id === 101)?.image;
import mintMilkChocolateChipImg from 'figma:asset/351dbdce21eee22636e66dcab213128508ff84fc.png';
import hopScotchConeImg from 'figma:asset/92d349703c5259434d50fc32f312a7ae548c7050.png';

// Mock Data Structure
type PurchaseItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number; // 0 if pending
  size: string;
  color: string;
};

type Purchase = {
  id: string;
  storeName: string;
  location: string;
  date: string;
  time: string;
  invoiceNo: string;
  nps: {
    status: 'pending' | 'completed';
    rating?: number; // 0-10 scale for NPS
  };
  items: PurchaseItem[];
};

const purchases: Purchase[] = [
  {
    id: 'inv-001',
    storeName: brand.identity.name,
    location: 'Phoenix MarketCity',
    date: 'Yesterday',
    time: '04:30 PM',
    invoiceNo: 'Inv-2025-00989',
    nps: { status: 'pending' },
    items: [
      {
        id: 101,
        name: brand.products.receiptItems[0].name,
        image: thunderHotFudgeImg,
        price: 299,
        rating: 0,
        size: 'Regular',
        color: 'Chocolate'
      }
    ]
  },
  {
    id: 'inv-002',
    storeName: brand.identity.name,
    location: 'Inorbit Mall',
    date: 'Last Week',
    time: '2:30 PM',
    invoiceNo: 'Inv-2025-00845',
    nps: { status: 'completed', rating: 9 },
    items: [
      {
        id: 103,
        name: 'Chocolate Truffle Ice Cream Cake',
        image: belgianChocolateScoopImg,
        price: 149,
        rating: 5,
        size: 'Regular',
        color: 'Chocolate'
      },
      {
        id: 104,
        name: 'Mint Milk Chocolate Chips Ice Cream (Tub)',
        image: mintMilkChocolateChipImg,
        price: 249,
        rating: 0, 
        size: 'Large',
        color: 'Mint'
      }
    ]
  },
  {
    id: 'inv-003',
    storeName: brand.identity.name,
    location: 'Phoenix Palladium',
    date: '2 Weeks Ago',
    time: '11:15 AM',
    invoiceNo: 'Inv-2025-00722',
    nps: { status: 'completed', rating: 7 },
    items: [
      {
        id: 105,
        name: 'Hop Scotch Butterscotch Cone',
        image: hopScotchConeImg,
        price: 549,
        rating: 4,
        size: 'Family Pack',
        color: 'Assorted'
      }
    ]
  }
];

// Utility to check if purchase has pending actions
const hasPendingActions = (purchase: Purchase) => {
  const npsPending = purchase.nps.status === 'pending';
  const itemsPending = purchase.items.some(item => item.rating === 0);
  return npsPending || itemsPending;
};

interface ReviewsPageProps {
  onBack?: () => void;
}

export function ReviewsPage({ onBack }: ReviewsPageProps) {
  const { t } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Purchase | null>(null);
  
  // Review Dialog State
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<PurchaseItem | null>(null);
  const [initialReviewRating, setInitialReviewRating] = useState(0);
  
  // Local state to track ratings (in a real app, this would be persisted/fetched)
  const [localItemRatings, setLocalItemRatings] = useState<Record<number, number>>({});
  const [submittedReviews, setSubmittedReviews] = useState<Record<number, boolean>>({});

  const handleRateItem = (item: PurchaseItem, rating: number) => {
    // Update rating immediately so it persists even if dialog is closed
    setLocalItemRatings(prev => ({ ...prev, [item.id]: rating }));

    setSelectedProductForReview(item);
    setInitialReviewRating(rating);
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = async (productId: number, rating: number, text: string, files: File[]) => {
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log('Review submitted locally:', { productId, rating, text, files: files.length });
      
      setLocalItemRatings(prev => ({ ...prev, [productId]: rating }));
      setSubmittedReviews(prev => ({ ...prev, [productId]: true }));
      toast.success(t('reviewSubmittedSuccess'));
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(t('errorSubmittingReview'));
    }
  };

  // Show order list with items
  return (
    <div className="bg-[#F9FAFB] min-h-screen w-full pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 px-4 py-4 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#101828]" />
        </button>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">My Reviews</h1>
      </div>

      {/* Reviews Card List */}
      <div className="px-4 py-5 space-y-4">
        {purchases.map(purchase => (
          <ReviewCard 
            key={purchase.id}
            purchase={purchase}
            onRateItem={handleRateItem}
            localRatings={localItemRatings}
            submittedReviews={submittedReviews}
          />
        ))}
      </div>

      {/* Leave Review Dialog */}
      <LeaveReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        product={selectedProductForReview}
        initialRating={initialReviewRating}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}

export default ReviewsPage;

// Review Card Component
interface ReviewCardProps {
  purchase: Purchase;
  onRateItem: (item: PurchaseItem, rating: number) => void;
  localRatings: Record<number, number>;
  submittedReviews: Record<number, boolean>;
}

function ReviewCard({ purchase, onRateItem, localRatings, submittedReviews }: ReviewCardProps) {
  const totalAmount = purchase.items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Order Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="mb-2">
          <h3 className="font-bold text-[#101828] text-sm">
            Order #{purchase.invoiceNo.split('-').pop()}
          </h3>
        </div>

        {/* Order Meta Info */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#667085]">
          <span className="font-semibold text-[#344054]">{purchase.storeName}, {purchase.location}</span>
          <span className="text-gray-300">•</span>
          <span>{purchase.date} at {purchase.time}</span>
          <span className="text-gray-300">•</span>
          <span className="font-bold text-[#101828]">₹{totalAmount}</span>
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 py-4 space-y-4">
        {purchase.items.map((item) => {
          const currentRating = localRatings[item.id] || item.rating;
          const isSubmitted = (item.rating > 0) || submittedReviews[item.id];

          return (
            <div key={item.id} className="group">
              <div className="flex gap-3 items-start mb-3">
                {/* Product Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#101828] text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-[#667085]">₹{item.price}</p>
                </div>
              </div>

              {/* Use RateItem component - matches home page design */}
              <RateItem 
                rating={currentRating}
                onRate={(rating) => onRateItem(item, rating)}
                hasSubmittedReview={isSubmitted}
                onTellUsMore={() => onRateItem(item, currentRating)}
                onViewReview={() => onRateItem(item, currentRating)}
                className="mt-3"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Order Detail View Component
interface OrderDetailViewProps {
  purchase: Purchase;
  onBack: () => void;
  onRateItem: (item: PurchaseItem, rating: number) => void;
  localRatings: Record<number, number>;
  submittedReviews: Record<number, boolean>;
}

function OrderDetailView({ purchase, onBack, onRateItem, localRatings, submittedReviews }: OrderDetailViewProps) {
  const { t } = useLanguage();
  const [selectedNpsRating, setSelectedNpsRating] = useState<number | null>(null);
  const [submittedNpsData, setSubmittedNpsData] = useState<{
    rating: number;
    reason: string | null;
    detail: string | null;
    comment: string;
  } | null>(null);

  // Load submitted NPS data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('nps_survey_submitted');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setSubmittedNpsData(data);
        console.log('Loaded NPS data from localStorage:', data);
      } catch (e) {
        console.error('Error parsing NPS data:', e);
      }
    }
  }, []);

  const handleNpsRate = (rating: number) => {
    setSelectedNpsRating(rating);
    toast.success(t('feedbackSubmitted'));
  };

  // Get color for NPS rating
  const getNpsColor = (rating: number) => {
    const colors = [
      '#bc0101', '#bc0101', '#e01717', '#e93030', '#f83b3b', 
      '#ff4545', '#ff5e5e', '#ffb800', '#ffb800', '#1ac86a', '#07b256'
    ];
    return colors[rating] || '#888888';
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 px-4 py-4 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#101828]" />
        </button>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">Order Details</h1>
      </div>

      {/* Order Detail Card */}
      <div className="bg-gray-50/30">
        <div className="p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Invoice Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-100 relative">
              {/* Status Chip - Top Right */}
              {purchase.nps.status === 'completed' ? (
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-[#ECFDF3] text-[#027A48] px-3 py-2.5 rounded-[10px] border border-[#F2F4F7] text-sm font-bold">
                   <div className="w-2 h-2 rounded-full bg-[#12B76A]"></div>
                   {t('submitted')}
                </div>
              ) : (
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-[#FFFAEB] text-[#B54708] px-3 py-2.5 rounded-[10px] border border-[#F2F4F7] text-sm font-bold">
                   <div className="w-2 h-2 rounded-full bg-[#F79009]"></div>
                   {t('pendingFeedback')}
                </div>
              )}

              {/* Top Section: Icon & Info */}
              <div className="flex items-start gap-3 mb-4 pr-32">
                <div className="w-12 h-12 rounded-2xl bg-[#F9FAFB] flex items-center justify-center border border-[#EAECF0] flex-shrink-0">
                   <ShoppingBag className="w-6 h-6 text-[#344054]" strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-extrabold text-[#101828] leading-tight mb-1 text-[14px]">
                    #{purchase.invoiceNo.split('-').pop()}
                  </h3>
                  <p className="text-sm text-[#667085]">
                    {purchase.items.length} Items • <span className="font-semibold text-[#344054]">{purchase.storeName}</span>, {purchase.location}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Chips */}
              <div className="flex flex-wrap gap-2 items-center">
                 {/* Date Chip */}
                 <div className="inline-flex items-center gap-2 bg-[#F9FAFB] px-3 py-2.5 rounded-[10px] border border-[#F2F4F7]">
                    <Calendar className="w-4 h-4 text-[#667085]" />
                    <span className="text-sm font-semibold text-[#344054]">
                      24 Oct 2024 <span className="text-[#667085] font-normal">({purchase.date})</span>
                    </span>
                 </div>

                 {/* Price Chip */}
                 <div className="inline-flex items-center justify-center bg-[#F9FAFB] px-3 py-2.5 rounded-[10px] border border-[#F2F4F7]">
                    <span className="text-sm font-extrabold text-[#101828]">
                      ₹{purchase.items.reduce((acc, item) => acc + item.price, 0).toFixed(0)}
                    </span>
                 </div>
              </div>
            </div>

            <div className="px-4 py-5">
              {/* NPS Section - Priority */}
              <div className="mb-6">
                {purchase.nps.status === 'pending' ? (
                  <MultiTierSurvey
                    experienceRating={selectedNpsRating}
                    onExperienceRating={handleNpsRate}
                    onComplete={() => {}}
                    purchaseDate={purchase.date}
                    storeName={purchase.location}
                  />
                ) : submittedNpsData ? (
                  // Show detailed hierarchical feedback
                  <div className="space-y-3">
                    {/* NPS Rating (0-10) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-2">NPS Rating</p>
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg"
                          style={{ 
                            backgroundColor: `${getNpsColor(submittedNpsData.rating)}15`, 
                            color: getNpsColor(submittedNpsData.rating), 
                            border: `2px solid ${getNpsColor(submittedNpsData.rating)}40` 
                          }}
                        >
                          {submittedNpsData.rating}
                        </div>
                        <span className="text-sm text-gray-500">/10</span>
                      </div>
                    </div>

                    {/* L1 - Primary Reason */}
                    {submittedNpsData.reason && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-2">Primary Reason</p>
                        <p className="text-sm text-gray-900 font-medium">{submittedNpsData.reason}</p>
                      </div>
                    )}

                    {/* L2 - Specific Detail */}
                    {submittedNpsData.detail && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-2">Specific Detail</p>
                        <p className="text-sm text-gray-900 font-medium">{submittedNpsData.detail}</p>
                      </div>
                    )}

                    {/* Comments */}
                    {submittedNpsData.comment && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-2">Comments</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{submittedNpsData.comment}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Fallback for old completed data without localStorage NPS data
                  <div className="bg-gradient-to-br from-[#000000]/5 to-white border border-[#000000]/20 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-3">Store Experience Rating</p>
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex items-center justify-center w-12 h-12 rounded-lg font-bold text-xl shadow-sm"
                        style={{ 
                          backgroundColor: getNpsColor(purchase.nps.rating || 0),
                          color: 'white'
                        }}
                      >
                        {purchase.nps.rating || 0}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">/10</span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {(purchase.nps.rating || 0) >= 9 ? 'Excellent Experience' : (purchase.nps.rating || 0) >= 7 ? 'Good Experience' : 'Needs Improvement'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Items Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 px-2">Items Purchased</p>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>
                
                <div className="space-y-4">
                  {purchase.items.map((item) => {
                    const currentRating = localRatings[item.id] || item.rating;
                    const isSubmitted = (item.rating > 0) || submittedReviews[item.id];
                    const isPending = currentRating === 0;

                    return (
                      <div key={item.id} className="group">
                        <div className="flex gap-3 items-center">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                            <img 
                              src={item.image || "https://images.unsplash.com/photo-1623679652939-b5b216a709ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBjb2ZmZWUlMjBkcmlua3xlbnwxfHx8fDE3NjgyMDc5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                              width="80"
                              height="80"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#101828] truncate mb-1">{item.name}</p>
                            <p className="text-sm text-gray-500">₹{item.price}</p>
                            
                            {/* Rating - Show inline on mobile if submitted */}
                            {isSubmitted && (
                              <div className="flex gap-0.5 mt-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star 
                                    key={star} 
                                    className={cn(
                                      "w-4 h-4", 
                                      star <= currentRating 
                                        ? "fill-[#CBA258] text-[#CBA258]" 
                                        : "text-gray-300"
                                    )} 
                                    strokeWidth={1.5}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Show RateItem for all non-submitted items (includes both pending and rated-but-not-reviewed) */}
                        <RateItem 
                          rating={currentRating} 
                          onRate={(rating) => onRateItem(item, rating)} 
                          hasSubmittedReview={isSubmitted}
                          onTellUsMore={() => onRateItem(item, currentRating)}
                          onViewReview={() => onRateItem(item, currentRating)}
                          className="mt-3"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}