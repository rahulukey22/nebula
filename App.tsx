import { useState, useEffect, useMemo, Suspense, lazy, startTransition } from 'react';
import { Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './utils/LanguageContext';
import { optimizeUnsplashUrl } from './utils/imageOptimization';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { VerifiedBadge } from './components/ui/verified-badge';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { FontPreload } from './components/FontPreload';
import { MinimalLoadingFallback } from './components/LoadingFallback';
import { PurchaseDetailsCard } from './components/homepage/PurchaseDetailsCard';
import { ItemDetailsSection } from './components/homepage/ItemDetailsSection';
import { TaxSummaryCard } from './components/homepage/TaxSummaryCard';
import { PaymentSummaryCard } from './components/homepage/PaymentSummaryCard';
import { AccessInvoiceCard } from './components/homepage/AccessInvoiceCard';
import { StorePoliciesCard } from './components/homepage/StorePoliciesCard';
import { MultiTierSurvey } from './components/MultiTierSurvey';
import { LeaveReviewDialog } from './components/reviews/LeaveReviewDialog';
import { StoriesLoader } from './components/StoriesLoader';
import StoriesViewer from './components/StoriesViewer';
import type { StoryAction } from './components/StoriesViewer';
import type { ClaimedCoupon } from './components/CouponsTab';
import { stories } from './data/storiesData';
import { BrandCard } from './components/homepage/BrandCard';
import { NPSSurveyCard } from './components/homepage/NPSSurveyCard';
import { VideoUploadAdmin } from './components/VideoUploadAdmin';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { brand, getStorageKey } from './config/brand';

// Lazy load heavy components for better performance
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const SupportPage = lazy(() => import('./components/SupportPage'));
const CouponsTab = lazy(() => import('./components/CouponsTab'));

type Tab = 'receipt' | 'coupons';
type ViewMode = 'compact' | 'detail';
type NavTab = 'home' | 'reviews' | 'support' | 'profile';

// Import products and recommendations from brand config
const products = brand.products.receiptItems;
const recommendations = brand.products.recommendations;

function AppContent() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('receipt');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');
  const [experienceRating, setExperienceRating] = useState<number | null>(null);
  const [productRatings, setProductRatings] = useState<Record<number, number>>({}); // Start with no ratings
  const [submittedReviews, setSubmittedReviews] = useState<Record<number, boolean>>({});
  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<ViewMode>('compact');
  const [isFollowing, setIsFollowing] = useState(true);

  // Review Dialog State
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<any>(null);
  const [initialReviewRating, setInitialReviewRating] = useState(0);

  // Stories State
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [hasViewedStories, setHasViewedStories] = useState(false);
  const [hasAutoOpenedStories, setHasAutoOpenedStories] = useState(false);
  const [storiesData, setStoriesData] = useState(stories);
  // Initialize hasSubmittedNPS from localStorage immediately
  const [hasSubmittedNPS, setHasSubmittedNPS] = useState(() => {
    const local1 = localStorage.getItem(getStorageKey('npsSubmitted')) === 'true';
    const local2 = !!localStorage.getItem('nps_survey_submitted');
    return local1 || local2;
  });
  const [isNPSDataLoaded, setIsNPSDataLoaded] = useState(false);
  // Show loader immediately on first visit
  const [showStoriesLoader, setShowStoriesLoader] = useState(() => {
    const hasViewed = localStorage.getItem(getStorageKey('viewedStories')) === 'true';
    return !hasViewed; // Show loader if stories haven't been viewed yet
  });
  
  // Filter out NPS survey story if already submitted
  const filteredStories = useMemo(() => {
    if (hasSubmittedNPS) {
      console.log('📊 NPS already submitted - filtering out NPS story');
      const filtered = storiesData.filter(story => !story.isNPSSurvey);
      console.log('📊 Original stories:', storiesData.length, 'Filtered stories:', filtered.length);
      console.log('📊 Filtered stories:', filtered);
      return filtered;
    }
    console.log('📊 NPS not submitted - showing all stories');
    console.log('📊 All stories:', storiesData);
    return storiesData;
  }, [storiesData, hasSubmittedNPS]);

  // Profile State
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>('https://images.unsplash.com/photo-1691966929688-72d734848bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2ZpbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjgyMDczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
  const [userRating, setUserRating] = useState<number>(4.8);
  
  // Video Upload State
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);

  // Claimed Raffle Tickets
  const [claimedTickets, setClaimedTickets] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem('claimed_tickets_9876543210');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Claimed Coupons from Stories
  const [claimedCoupons, setClaimedCoupons] = useState<ClaimedCoupon[]>(() => {
    try {
      const saved = localStorage.getItem(getStorageKey('claimedCoupons'));
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Handle story CTA actions
  const handleStoryAction = (action: StoryAction) => {
    switch (action.type) {
      case 'claim-coupon':
        if (action.coupon) {
          const newCoupon: ClaimedCoupon = {
            ...action.coupon,
            featured: true,
          };
          setClaimedCoupons(prev => {
            // Avoid duplicates by code
            if (prev.some(c => c.code === newCoupon.code)) return prev;
            const updated = [newCoupon, ...prev];
            try { localStorage.setItem(getStorageKey('claimedCoupons'), JSON.stringify(updated)); } catch {}
            return updated;
          });
          // Auto-switch to coupons tab after claiming
          startTransition(() => {
            setActiveTab('coupons');
            setActiveNavTab('home');
          });
        }
        break;
      case 'navigate-coupons':
        startTransition(() => {
          setActiveTab('coupons');
          setActiveNavTab('home');
        });
        break;
      case 'navigate-profile':
        startTransition(() => setActiveNavTab('profile'));
        break;
      case 'navigate-store':
        // Stay on home, scroll to store locator section
        startTransition(() => setActiveNavTab('home'));
        break;
      case 'claim-raffle':
        if (action.tickets) {
          setClaimedTickets(prev => {
            const updated = [...prev, ...action.tickets!];
            try { sessionStorage.setItem('claimed_tickets_9876543210', JSON.stringify(updated)); } catch {}
            return updated;
          });
          // Navigate to coupons tab to show loyalty section
          startTransition(() => {
            setActiveTab('coupons');
            setActiveNavTab('home');
          });
        }
        break;
    }
  };

  // Calculate pending reviews count (rated but not submitted detailed review)
  const pendingReviewsCount = products.filter(
    product => productRatings[product.id] > 0 && !submittedReviews[product.id]
  ).length;

  // REMOVED: Video fetching functionality (upload button was removed)

  // Preload critical images for better LCP
  useEffect(() => {
    // Preload banner image
    const preloadImage = new Image();
    preloadImage.src = 'https://images.unsplash.com/photo-1601885086630-c356fca1be0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBzdG9yZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODIwNzMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    
    // Preload first story image (will auto-open)
    if (stories[0]?.image) {
      const storyPreload = new Image();
      storyPreload.src = optimizeUnsplashUrl(stories[0].image, 800, 85);
    }
  }, []);

  // Load profile photo, rating, stories, and NPS status on mount
  useEffect(() => {
    const loadProfileData = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const localSubmitted = localStorage.getItem(getStorageKey('npsSubmitted')) === 'true' || 
                           !!localStorage.getItem('nps_survey_submitted');
      setHasSubmittedNPS(localSubmitted);
      setIsNPSDataLoaded(true);
    };

    loadProfileData();
  }, []);

  // Restore preserved data after reset
  useEffect(() => {
    try {
      const preserved = localStorage.getItem(getStorageKey('preservedData'));
      if (preserved) {
        const data = JSON.parse(preserved);
        setExperienceRating(data.experienceRating);
        setLikedProducts(data.likedProducts || {});
        setIsFollowing(data.isFollowing !== undefined ? data.isFollowing : true);
        localStorage.removeItem(getStorageKey('preservedData'));
        console.log('✅ Restored preserved data:', data);
      }
    } catch (error) {
      console.error('Error restoring preserved data:', error);
    }
  }, []);

  // Show loader immediately on first visit while waiting for data
  useEffect(() => {
    if (!hasViewedStories && !hasAutoOpenedStories && !isNPSDataLoaded && !hasSubmittedNPS) {
      // Show loader immediately - no delay
      setShowStoriesLoader(true);
    } else if (isNPSDataLoaded || hasSubmittedNPS) {
      // Hide loader once data is loaded or NPS already submitted
      setShowStoriesLoader(false);
    }
  }, [hasViewedStories, hasAutoOpenedStories, isNPSDataLoaded, hasSubmittedNPS]);

  // Auto-open stories ONLY on first visit when data is ready
  useEffect(() => {
    if (!hasViewedStories && !hasAutoOpenedStories && isNPSDataLoaded && !hasSubmittedNPS) {
      // Small delay for smooth transition from loader to stories
      const timer = setTimeout(() => {
        setShowStoriesLoader(false);
        setIsStoriesOpen(true);
        setHasAutoOpenedStories(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [hasViewedStories, hasAutoOpenedStories, isNPSDataLoaded, hasSubmittedNPS]);

  const handleExperienceRating = (rating: number) => {
    setExperienceRating(rating);
  };

  const handleProductRating = (productId: number, rating: number) => {
    setProductRatings({ ...productRatings, [productId]: rating });
  };

  const handleResetDemo = async () => {
    if (confirm('Reset all demo data? This will clear all ratings, reviews, and media files. (Viewing status and likes will be preserved)')) {
      // Show loading state
      const resetBtn = document.querySelector('[title="Reset Demo Data"]') as HTMLButtonElement;
      if (resetBtn) {
        resetBtn.style.opacity = '0.5';
        resetBtn.style.pointerEvents = 'none';
      }

      // Save data that should be preserved
      const preservedData = {
        hasViewedStories,
        likedProducts,
        isFollowing
      };

      // Clear NPS submission from localStorage
      localStorage.removeItem('nps_survey_submitted');
      localStorage.removeItem(getStorageKey('npsSubmitted'));
      
      // Store preserved data in localStorage before reload
      try {
        localStorage.setItem(getStorageKey('preservedData'), JSON.stringify(preservedData));
        console.log('✅ Preserved viewing status and likes');
      } catch (e) {
        console.log('Could not preserve data');
      }
      
      // Force reload page to reset everything
      console.log('🔄 Reloading page to reset all state...');
      setTimeout(() => {
        window.location.href = window.location.href.split('?')[0];
      }, 300);
    }
  };

  const handleRateClick = (product: any, rating: number) => {
    // Update rating immediately so it persists even if dialog is closed
    setProductRatings(prev => ({ ...prev, [product.id]: rating }));
    
    setSelectedProductForReview(product);
    setInitialReviewRating(rating);
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = async (productId: number, rating: number, text: string, files: File[]) => {
    try {
      console.log('Review submitted locally:', { productId, rating, text, files });
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      // Always update local state
      setProductRatings(prev => ({ ...prev, [productId]: rating }));
      setSubmittedReviews(prev => ({ ...prev, [productId]: true }));
    }
  };

  const toggleLike = (productId: number) => {
    setLikedProducts({ ...likedProducts, [productId]: !likedProducts[productId] });
  };

  const handleDownloadPDF = () => {
    alert('Downloading PDF invoice...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${brand.identity.name} Receipt`,
        text: `Check out my purchase from ${brand.identity.name}!`,
      });
    } else {
      alert('Sharing receipt...');
    }
  };

  const handlePhotoUpload = (url: string) => {
    setProfilePhotoUrl(url);
  };

  // Render different pages based on activeNavTab with Suspense for code splitting
  if (activeNavTab === 'reviews') {
    return (
      <div className="bg-white min-h-screen max-w-md w-full mx-auto relative overflow-x-hidden pb-16">
        <Suspense fallback={<MinimalLoadingFallback />}>
          <ReviewsPage onBack={() => setActiveNavTab('home')} />
        </Suspense>
        {/* Bottom Navigation - iOS App Store Style */}
        <FloatingBottomNav 
          activeTab={activeNavTab} 
          onTabChange={(tab) => startTransition(() => setActiveNavTab(tab))} 
          pendingReviewsCount={pendingReviewsCount}
          profilePhotoUrl={profilePhotoUrl}
          userRating={userRating}
        />
      </div>
    );
  }

  if (activeNavTab === 'profile') {
    return (
      <div className="bg-white min-h-screen max-w-md w-full mx-auto relative overflow-x-hidden pb-16">
        <Suspense fallback={<MinimalLoadingFallback />}>
          <ProfilePage 
            profilePhotoUrl={profilePhotoUrl}
            userRating={userRating}
            onPhotoUpload={handlePhotoUpload}
            onBack={() => setActiveNavTab('home')}
          />
        </Suspense>
        {/* Bottom Navigation - iOS App Store Style */}
        <FloatingBottomNav 
          activeTab={activeNavTab} 
          onTabChange={(tab) => startTransition(() => setActiveNavTab(tab))} 
          pendingReviewsCount={pendingReviewsCount}
          profilePhotoUrl={profilePhotoUrl}
          userRating={userRating}
        />
      </div>
    );
  }

  if (activeNavTab === 'support') {
    return (
      <div className="bg-white min-h-screen max-w-md w-full mx-auto relative overflow-x-hidden pb-16">
        <Suspense fallback={<MinimalLoadingFallback />}>
          <SupportPage onBack={() => setActiveNavTab('home')} />
        </Suspense>
        {/* Bottom Navigation - iOS App Store Style */}
        <FloatingBottomNav 
          activeTab={activeNavTab} 
          onTabChange={(tab) => startTransition(() => setActiveNavTab(tab))} 
          pendingReviewsCount={pendingReviewsCount}
          profilePhotoUrl={profilePhotoUrl}
          userRating={userRating}
        />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen max-w-md w-full mx-auto relative overflow-x-hidden pb-20">
      {/* Font Preload for Performance */}
      <FontPreload />
      
      {/* Main content - hidden while loader is showing */}
      <div className={showStoriesLoader ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-300'}>
      
      {/* ==================== BRAND CARD ==================== */}
      {/* Banner, Logo, Stories Button, Brand Info, Stats, Shop Online Button */}
      <BrandCard
        hasViewedStories={hasViewedStories}
        filteredStoriesLength={filteredStories.length}
        isFollowing={isFollowing}
        onStoriesClick={() => {
          setIsStoriesOpen(true);
          setHasViewedStories(true);
        }}
        onFollowClick={() => setIsFollowing(!isFollowing)}
      />

      {/* ==================== NPS SURVEY CARD ==================== */}
      {/* Multi-tier survey for experience rating */}
      <NPSSurveyCard
        experienceRating={experienceRating}
        onExperienceRating={handleExperienceRating}
        onComplete={() => {
          // On receipt page, just show a success state (already handled inside component)
        }}
      />

      {/* ==================== TAB SWITCHER ==================== */}
      <div className="px-5 pt-4 pb-0">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => startTransition(() => setActiveTab('receipt'))}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition-all relative ${
              activeTab === 'receipt'
                ? ''
                : 'text-gray-500'
            }`}
            style={activeTab === 'receipt' ? { color: brand.colors.primary } : {}}
          >
            Receipt
            {activeTab === 'receipt' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: brand.colors.primary }} />
            )}
          </button>
          <button
            onClick={() => startTransition(() => setActiveTab('coupons'))}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition-all relative ${
              activeTab === 'coupons'
                ? ''
                : 'text-gray-500'
            }`}
            style={activeTab === 'coupons' ? { color: brand.colors.primary } : {}}
          >
            Coupons
            {claimedCoupons.length > 0 && (
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                style={{ backgroundColor: brand.colors.primary }}
              >
                {claimedCoupons.length}
              </span>
            )}
            {activeTab === 'coupons' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: brand.colors.primary }} />
            )}
          </button>
        </div>
      </div>

      {/* ==================== RECEIPT TAB CONTENT ==================== */}
      {activeTab === 'receipt' && (
        <>
      {/* ==================== ORDER DETAILS CARD ==================== */}
      {/* Purchase details with invoice, items, date, payment, shift/till, store address */}
      <PurchaseDetailsCard />

      {/* ==================== ITEM DETAILS CARD ==================== */}
      {/* List of purchased items with ratings and reviews */}
      <ItemDetailsSection
        products={products}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        productRatings={productRatings}
        submittedReviews={submittedReviews}
        onRateClick={handleRateClick}
      />

      {/* ==================== TAX SUMMARY CARD ==================== */}
      {/* Tax breakdown and GST details */}
      <TaxSummaryCard />

      {/* ==================== PAYMENT SUMMARY CARD ==================== */}
      {/* Total amount, discounts, and payment details */}
      <PaymentSummaryCard />

      {/* ==================== ACCESS INVOICE CARD ==================== */}
      {/* Download PDF and share options */}
      <AccessInvoiceCard
        onDownload={handleDownloadPDF}
        onShare={handleShare}
      />

      {/* ==================== STORE POLICIES CARD ==================== */}
      {/* Return policy and terms & conditions */}
      <StorePoliciesCard />
        </>
      )}

      {/* ==================== COUPONS TAB CONTENT ==================== */}
      {activeTab === 'coupons' && (
        <Suspense fallback={<MinimalLoadingFallback />}>
          <CouponsTab claimedCoupons={claimedCoupons} claimedTickets={claimedTickets} />
        </Suspense>
      )}

      {/* Leave Review Dialog - Lazy loaded */}
      {isReviewDialogOpen && (
        <Suspense fallback={null}>
          <LeaveReviewDialog
            isOpen={isReviewDialogOpen}
            onClose={() => setIsReviewDialogOpen(false)}
            product={selectedProductForReview}
            initialRating={initialReviewRating}
            onSubmit={handleReviewSubmit}
          />
        </Suspense>
      )}

      {/* Bottom Navigation - iOS App Store Style */}
      <FloatingBottomNav 
        activeTab={activeNavTab} 
        onTabChange={(tab) => startTransition(() => setActiveNavTab(tab))} 
        pendingReviewsCount={pendingReviewsCount}
        profilePhotoUrl={profilePhotoUrl}
        userRating={userRating}
      />
      </div>
      {/* End of main content wrapper */}

      {/* Stories Loader - Show while fetching data */}
      {showStoriesLoader && <StoriesLoader />}

      {/* Stories Viewer - Lazy loaded */}
      {isStoriesOpen && (
        <Suspense fallback={null}>
          <StoriesViewer
            isOpen={isStoriesOpen}
            onClose={() => setIsStoriesOpen(false)}
            stories={filteredStories}
            storeName={brand.identity.name}
            storeLogo={brand.assets.logo.primary}
            experienceRating={experienceRating}
            onExperienceRating={handleExperienceRating}
            onSurveyComplete={() => setHasSubmittedNPS(true)}
            onAction={handleStoryAction}
          />
        </Suspense>
      )}
      
      {/* Admin: Upload Story Video Button */}
      {/* REMOVED: Upload button removed as requested */}
      
      {/* Video Upload Modal - REMOVED */}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}