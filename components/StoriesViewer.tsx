import { useState, useEffect, useRef } from 'react';
import { X, Gift, Trophy } from 'lucide-react';
import { MultiTierSurvey } from './MultiTierSurvey';
import { optimizeUnsplashUrl, generateSrcSet, getImageSizes } from '../utils/imageOptimization';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { fashionDestinations } from '../data/storiesData';
import { brand, getColorWithOpacity } from '../config/brand';
import { toast } from 'sonner@2.0.3';
import { InteractiveSpinWheel } from './InteractiveSpinWheel';
import { InteractiveLuckyDraw } from './InteractiveLuckyDraw';
import { GameRegistrationSheet } from './GameRegistrationSheet';

const REWARDS_POSTER_IMG = 'https://images.unsplash.com/photo-1750691796390-868b6bc2de76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGljZSUyMGNyZWFtJTIwc2Nvb3BzJTIwcGlua3xlbnwxfHx8fDE3NzM4MzAwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
import couponStoryBgImg from 'figma:asset/1ded36c0b49e9866e45fe5e37c1bdfde854526a7.png';

interface Story {
  id: number;
  image: string;
  duration: number;
  isWelcome?: boolean;
  isNPSSurvey?: boolean;
  isCoupon?: boolean;
  isVideo?: boolean;
  videoUrl?: string;
  isPromo?: boolean;
  isChocolateOffer?: boolean;
  isRewardsPoster?: boolean;
  isSpinWheel?: boolean;
  isLuckyDraw?: boolean;
  isRaffle?: boolean;
}

export interface StoryAction {
  type: 'claim-coupon' | 'navigate-coupons' | 'navigate-profile' | 'navigate-store' | 'claim-raffle';
  coupon?: {
    id: string;
    code: string;
    title: string;
    description: string;
    expiry: string;
    source: string;
    type: 'qr' | 'barcode';
  };
  tickets?: string[];
}

interface StoriesViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  storeName: string;
  storeLogo: string;
  experienceRating: number | null;
  onExperienceRating: (rating: number) => void;
  onSurveyComplete?: () => void;
  onAction?: (action: StoryAction) => void;
}

export default function StoriesViewer({ isOpen, onClose, stories, storeName, storeLogo, experienceRating, onExperienceRating, onSurveyComplete, onAction }: StoriesViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);
  const [showRaffleSheet, setShowRaffleSheet] = useState(false);
  const [raffleClaimed, setRaffleClaimed] = useState(false);
  const [showSpinRegistration, setShowSpinRegistration] = useState(false);
  const [spinRegistered, setSpinRegistered] = useState(false);
  const [showLuckyDrawRegistration, setShowLuckyDrawRegistration] = useState(false);
  const [luckyDrawRegistered, setLuckyDrawRegistered] = useState(false);
  
  // Generate session ID once per session
  const sessionIdRef = useRef<string>('');
  if (!sessionIdRef.current) {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  // Handle survey completion - auto-resume story
  const handleSurveyComplete = () => {
    setSurveyCompleted(true);
    // Notify parent component
    if (onSurveyComplete) {
      onSurveyComplete();
    }
    // Close stories after showing thank you message
    setTimeout(() => {
      onClose();
    }, 2000); // Show thank you message for 2 seconds, then close
  };

  // Track story views
  const trackStoryView = async () => {
    if (!isOpen) return;
    
    try {
      const storyId = stories[currentStoryIndex]?.id;
      if (storyId === undefined) return;
      
      // Track view locally for now (server endpoint disabled)
      setViewCounts(prev => ({
        ...prev,
        [storyId]: (prev[storyId] || 0) + 1
      }));
    } catch (error) {
      console.error('Error tracking story view:', error);
    }
  };

  // Track view when story opens or changes
  useEffect(() => {
    if (!isOpen) return;
    
    trackStoryView();
  }, [isOpen, currentStoryIndex]);

  // Auto-play video when video story is active
  useEffect(() => {
    if (!isOpen) return;
    
    const currentStory = stories[currentStoryIndex];
    if (currentStory?.isVideo && videoRef.current) {
      // Reset error state
      setVideoError(false);
      
      // Reset and play video
      videoRef.current.currentTime = 0;
      
      // Load the video source
      videoRef.current.load();
      
      // Attempt to play
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Video autoplay succeeded');
            setVideoError(false);
          })
          .catch((error) => {
            console.error('❌ Video autoplay failed:', error);
            setVideoError(true);
            
            // Try again after a short delay
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch(e => {
                  console.error('❌ Retry failed:', e);
                  setVideoError(true);
                });
              }
            }, 300);
          });
      }
    }
  }, [isOpen, currentStoryIndex, stories]);

  // Load all view counts when opening - disabled for now
  useEffect(() => {
    if (!isOpen) return;
    // View counts tracking disabled
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStoryIndex(0);
      setProgress(0);
      setIsPaused(false);
      setSurveyCompleted(false);
      setShowSpinWheel(false);
      setShowLuckyDraw(false);
      setShowRaffleSheet(false);
      setRaffleClaimed(false);
      setShowSpinRegistration(false);
      setSpinRegistered(false);
      setShowLuckyDrawRegistration(false);
      setLuckyDrawRegistered(false);
      return;
    }

    // Safety check - if no stories, return early
    if (!stories || stories.length === 0 || !stories[currentStoryIndex]) {
      return;
    }

    // Auto-pause on survey story if survey not completed
    if (stories[currentStoryIndex]?.isNPSSurvey && !surveyCompleted) {
      setIsPaused(true);
      return;
    }

    // Auto-pause on raffle story when not yet claimed
    if (stories[currentStoryIndex]?.isRaffle && !raffleClaimed) {
      setIsPaused(true);
      return;
    }

    // Auto-pause on interactive stories
    if (showSpinWheel || showLuckyDraw || showRaffleSheet || showSpinRegistration || showLuckyDrawRegistration) {
      setIsPaused(true);
      return;
    }

    if (isPaused) return;

    const currentStory = stories[currentStoryIndex];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (currentStory.duration / 100));
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentStoryIndex, isPaused, stories, surveyCompleted, showSpinWheel, showLuckyDraw, showRaffleSheet, raffleClaimed, showSpinRegistration, showLuckyDrawRegistration]);

  // Separate effect to handle story progression
  useEffect(() => {
    if (!isOpen || isPaused) return;
    
    if (progress >= 100) {
      const timer = setTimeout(() => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
          setProgress(0);
        } else {
          onClose();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [progress, currentStoryIndex, stories.length, isOpen, isPaused, onClose]);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
      // If moving to a non-NPS story, unpause
      if (!stories[currentStoryIndex - 1]?.isNPSSurvey) {
        setIsPaused(false);
      }
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
      // Always unpause when manually navigating to next story
      // If it's an NPS survey, it will re-pause via useEffect
      setIsPaused(false);
    } else {
      onClose();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  if (!isOpen) return null;
  
  // Safety check - if no stories, don't render
  if (!stories || stories.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      {/* Stories Container - Fixed Mobile Width */}
      <div className="relative max-w-[430px] w-full h-full bg-black">
        {/* Multiple Progress Bars - One for each story */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-3 z-10">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{
                  width: 
                    index < currentStoryIndex 
                      ? '100%' 
                      : index === currentStoryIndex 
                        ? `${progress}%` 
                        : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header - Brand on Left, Close Button on Right */}
        <div className="absolute top-12 left-0 right-0 flex items-center justify-between px-4 z-[15]">
          <div className="flex items-center gap-2">
            <img src={storeLogo} alt={storeName} className="w-8 h-8 rounded-full border-2 border-white" />
            <div className="flex flex-col items-start">
              <span className="text-white font-medium text-sm">{storeName}</span>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-xs">2h</span>
              </div>
            </div>
          </div>
          
          {/* Close Button with Text */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all active:scale-95"
          >
            <span className="text-white text-xs font-medium">Close and view eReceipt</span>
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Story Image, Video, or NPS Background */}
        {stories[currentStoryIndex]?.isNPSSurvey ? (
          <div className="w-full h-full flex items-center justify-center">
            {/* NPS Survey Glassmorphism Background */}
            <div 
              className="w-full h-full relative backdrop-blur-3xl"
              style={{ 
                background: `linear-gradient(135deg, ${getColorWithOpacity(brand.colors.primary, 0.2)}, ${getColorWithOpacity(brand.colors.primaryDark, 0.2)})` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isWelcome ? (
          <div className="absolute inset-0 flex items-center justify-center z-[9] px-6 pointer-events-none">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />
            
            {/* Content - Minimal Card Design inspired by Profile Rewards Card */}
            <div className="relative w-full max-w-xs pointer-events-none">
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5F5DC]/95 via-white/95 to-[#CBA258]/25 backdrop-blur-md border border-[#CBA258]/40 shadow-2xl pointer-events-none">
                {/* Background decoration circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#000000]/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#CBA258]/15 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <p className="text-[#1a1a1a] mb-3 text-xs font-bold tracking-wider">
                      {brand.content.stories.welcome.title.en}
                    </p>
                    <p className="text-[#1a1a1a] mb-2 text-sm">
                      {brand.content.stories.welcome.greeting.en}
                    </p>
                    <p className="text-[#1a1a1a] text-lg font-bold">
                      {brand.content.stories.welcome.tier.en}
                    </p>
                  </div>

                  {/* Star Icon with Glow */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-[#CBA258] shadow-lg">
                        <svg className="w-12 h-12 text-[#CBA258]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      {/* Subtle glow */}
                      <div className="absolute inset-0 w-24 h-24 bg-[#CBA258] rounded-full blur-xl opacity-20" />
                    </div>
                  </div>

                  {/* Unlocked Reward */}
                  <div className="text-center mb-6">
                    <p 
                      className="font-bold text-base mb-2"
                      style={{ color: brand.colors.primary }}
                    >
                      {brand.content.stories.welcome.reward.title.en}
                    </p>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: brand.colors.text.primary }}
                    >
                      {brand.content.stories.welcome.reward.value} {brand.content.stories.welcome.reward.type.en}
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: getColorWithOpacity(brand.colors.text.primary, 0.6) }}
                    >
                      {brand.content.stories.welcome.reward.validity.en}
                    </p>
                  </div>

                  {/* Divider */}
                  <div 
                    className="w-16 h-[1px] mx-auto mb-6"
                    style={{ backgroundColor: getColorWithOpacity(brand.colors.primary, 0.2) }}
                  ></div>

                  {/* Message */}
                  <p 
                    className="text-center text-sm mb-5"
                    style={{ color: brand.colors.text.primary }}
                  >
                    {brand.content.stories.welcome.message.en}
                  </p>

                  {/* CTA Button - ONLY this has pointer-events-auto */}
                  <button 
                    className="w-full text-white py-3 rounded-lg font-semibold transition-colors active:scale-95 pointer-events-auto"
                    style={{ 
                      backgroundColor: brand.colors.primaryDark,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brand.colors.primary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brand.colors.primaryDark}
                    onClick={() => {
                      toast.success('🌟 Welcome to your rewards!', {
                        description: 'Check your Coupons tab for exclusive offers.',
                        duration: 3000,
                      });
                      onAction?.({ type: 'navigate-coupons' });
                      setTimeout(() => onClose(), 600);
                    }}
                  >
                    {brand.content.stories.welcome.cta.en}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isCoupon ? (
          <div className="absolute inset-0 flex items-center justify-center z-[9] px-6 pointer-events-none">
            {/* Background Image */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={couponStoryBgImg}
                alt="Coupon background"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />
            
            {/* Coupon Card */}
            <div className="relative w-full max-w-sm pointer-events-none">
              {/* Main Coupon Container */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#f8f5f0] to-[#e8dcc8] shadow-2xl pointer-events-none">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#000000]/5 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d4af37]/10 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative p-6">
                  {/* Header Badge */}
                  <div className="text-center mb-4">
                    <div 
                      className="inline-block px-5 py-2 rounded-full shadow-lg"
                      style={{ background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` }}
                    >
                      <span className="text-[#d4af37] text-xs font-bold tracking-widest">{brand.content.stories.coupon.badge.en}</span>
                    </div>
                  </div>

                  {/* Main Offer */}
                  <div className="text-center mb-5">
                    <p className="text-[#1a1a1a] text-sm mb-3 font-medium">{brand.content.stories.coupon.heading.en}</p>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <p 
                        className="text-7xl font-bold leading-none"
                        style={{ color: brand.colors.primary }}
                      >{brand.content.stories.coupon.discount.percentage}</p>
                      <p 
                        className="text-4xl font-bold"
                        style={{ color: brand.colors.primary }}
                      >{brand.content.stories.coupon.discount.text.en}</p>
                    </div>
                    <p className="text-[#1a1a1a] text-base font-semibold">{brand.content.stories.coupon.description.en}</p>
                  </div>

                  {/* Dashed Separator */}
                  <div className="border-t-2 border-dashed border-[#1a1a1a]/20 my-5 relative">
                    {/* Circle cutouts */}
                    <div className="absolute -left-8 -top-4 w-8 h-8 bg-black/50 rounded-full"></div>
                    <div className="absolute -right-8 -top-4 w-8 h-8 bg-black/50 rounded-full"></div>
                  </div>

                  {/* Coupon Code */}
                  <div 
                    className="bg-white border-2 border-dashed rounded-2xl p-4 mb-4"
                    style={{ borderColor: brand.colors.primary }}
                  >
                    <p className="text-[#667085] text-xs text-center mb-2 font-medium">{brand.content.stories.coupon.code.label.en}</p>
                    <div className="flex items-center justify-center gap-2">
                      <p 
                        className="text-2xl font-bold tracking-wider"
                        style={{ color: brand.colors.primary }}
                      >{brand.content.stories.coupon.code.value}</p>
                      <svg 
                        className="w-5 h-5"
                        style={{ color: brand.colors.primary }}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mb-5">
                    <div className="bg-[#f8f5f0] rounded-xl p-3 border border-[#1a1a1a]/10">
                      <p className="text-[#1a1a1a] text-xs leading-relaxed">
                        ✓ {brand.content.stories.coupon.terms.items[0].en}<br/>
                        ✓ {brand.content.stories.coupon.terms.items[1].en}<br/>
                        ✓ {brand.content.stories.coupon.terms.items[2].en}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    className="w-full text-white py-4 rounded-2xl font-bold text-base hover:shadow-xl transition-all active:scale-95 pointer-events-auto shadow-lg"
                    style={{ background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` }}
                    onClick={() => {
                      navigator.clipboard?.writeText(brand.content.stories.coupon.code.value).catch(() => {});
                      toast.success(`🎉 Coupon ${brand.content.stories.coupon.code.value} claimed!`, {
                        description: 'Added to your Coupons tab. Show at counter to redeem.',
                        duration: 3000,
                      });
                      onAction?.({
                        type: 'claim-coupon',
                        coupon: {
                          id: `story-coupon-${Date.now()}`,
                          code: brand.content.stories.coupon.code.value,
                          title: `${brand.content.stories.coupon.discount.percentage} ${brand.content.stories.coupon.discount.text.en}`,
                          description: brand.content.stories.coupon.description.en,
                          expiry: 'Expires in 7 days',
                          source: 'story',
                          type: 'qr',
                        },
                      });
                      setTimeout(() => onClose(), 800);
                    }}
                  >
                    {brand.content.stories.coupon.cta.en}
                  </button>

                  {/* Footnote */}
                  <p className="text-center text-[#667085] text-xs mt-3">
                    {brand.content.stories.coupon.footnote.en}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isPromo ? (
          <div className="absolute inset-0 flex items-center justify-center z-[9] pointer-events-none">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt="Zudio Collection"
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Promotional Content */}
            <div className="relative w-full max-w-md px-6 text-center pointer-events-none">
              {/* Logo Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl">
                  <img 
                    src={brand.assets.logo.primary} 
                    alt="Zudio" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>

              {/* Brand Name */}
              <h1 className="text-white text-5xl font-bold mb-6 tracking-tight">
                {brand.identity.name}
              </h1>

              {/* New Collection Badge */}
              <div className="flex justify-center mb-8">
                <div 
                  className="px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-lg"
                  style={{ backgroundColor: brand.colors.accent, color: brand.colors.primary }}
                >
                  {brand.content.stories.promo.badge.en}
                </div>
              </div>

              {/* Collection Name */}
              <h2 className="text-white text-4xl font-bold mb-3 leading-tight">
                {brand.content.stories.promo.collection.name.en.split('\\n')[0]}<br/>{brand.content.stories.promo.collection.name.en.split('\\n')[1]}
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-base mb-10">
                {brand.content.stories.promo.collection.tagline.en}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: brand.colors.accent }}>{brand.content.stories.promo.stats.discount.value}</p>
                  <p className="text-white/70 text-xs">{brand.content.stories.promo.stats.discount.label.en}</p>
                </div>
                <div className="text-center border-l border-r border-white/20">
                  <p className="text-3xl font-bold mb-1" style={{ color: brand.colors.accent }}>{brand.content.stories.promo.stats.value.amount}</p>
                  <p className="text-white/70 text-xs">{brand.content.stories.promo.stats.value.label.en}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: brand.colors.accent }}>{brand.content.stories.promo.stats.badge.text.en}</p>
                  <p className="text-white/70 text-xs">{brand.content.stories.promo.stats.badge.label.en}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className="w-full bg-white text-black py-4 rounded-2xl font-bold text-base shadow-2xl hover:bg-gray-100 transition-all active:scale-95 pointer-events-auto mb-4"
                onClick={() => {
                  toast.success('🍦 New flavors await!', {
                    description: 'Visit your nearest Baskin Robbins to try the new collection!',
                    duration: 3000,
                  });
                  onAction?.({ type: 'navigate-store' });
                  setTimeout(() => onClose(), 600);
                }}
              >
                {brand.content.stories.promo.cta.en}
              </button>

              {/* Footer Text */}
              <p className="text-white/60 text-xs">
                {brand.content.stories.promo.footer.en}
              </p>
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isChocolateOffer ? (
          <div className="absolute inset-0 flex items-center justify-center z-[9] pointer-events-none">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt="Chocolate Ice Cream"
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#2C1810]/80 via-[#1a0e08]/70 to-[#2C1810]/90" />
            </div>

            {/* Content */}
            <div className="relative w-full max-w-sm px-6 pointer-events-none">
              {/* Chocolate Emoji Header */}
              <div className="text-center mb-4">
                <span className="text-5xl">🍫</span>
              </div>

              {/* Greeting */}
              <div className="text-center mb-5">
                <p className="text-[#F5DEB3] text-sm tracking-wider mb-2">HEY CHOCOLATE LOVER!</p>
                <h2 className="text-white text-3xl font-bold mb-3 leading-tight">
                  New Flavor<br/>Alert!
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Introducing our richest, most indulgent <span className="text-[#F5DEB3] font-bold">Belgian Dark Chocolate Truffle</span> — crafted for true chocolate lovers like you.
                </p>
              </div>

              {/* Offer Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-[#F5DEB3]/30 mb-5">
                {/* Discount Badge */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#F5DEB3]">20%</p>
                    <p className="text-white/70 text-xs mt-1">OFF</p>
                  </div>
                </div>
                <p className="text-white text-center text-sm mb-3">on all Chocolate flavors this week!</p>

                {/* Coupon Code */}
                <div className="bg-[#2C1810] border-2 border-dashed border-[#F5DEB3]/50 rounded-xl p-3 text-center">
                  <p className="text-[#F5DEB3]/70 text-xs mb-1">Use Code</p>
                  <p className="text-[#F5DEB3] text-xl font-bold tracking-widest">CHOCO20</p>
                </div>
              </div>

              {/* Reward Points */}
              <div className="bg-gradient-to-r from-[#F5DEB3]/20 to-[#D4A574]/20 backdrop-blur-sm rounded-xl p-4 border border-[#F5DEB3]/20 mb-5 text-center">
                <p className="text-white/70 text-xs mb-1">Your Reward Points</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <p className="text-[#F5DEB3] text-3xl font-bold">2,450</p>
                </div>
                <p className="text-white/60 text-xs mt-1">Redeem 500 pts for a free chocolate scoop!</p>
              </div>

              {/* CTA */}
              <button
                className="w-full py-4 rounded-2xl font-bold text-base shadow-2xl transition-all active:scale-95 pointer-events-auto mb-3"
                style={{ background: 'linear-gradient(to right, #8B4513, #D2691E)', color: '#F5DEB3' }}
                onClick={() => {
                  navigator.clipboard?.writeText('CHOCO20').catch(() => {});
                  toast.success('🍫 Code CHOCO20 claimed!', {
                    description: '20% off all chocolate flavors — added to your Coupons!',
                    duration: 3000,
                  });
                  onAction?.({
                    type: 'claim-coupon',
                    coupon: {
                      id: `choco-${Date.now()}`,
                      code: 'CHOCO20',
                      title: '20% Off Chocolate Flavors',
                      description: 'Valid on all chocolate ice cream flavors this week',
                      expiry: 'Expires in 5 days',
                      source: 'story',
                      type: 'qr',
                    },
                  });
                  setTimeout(() => onClose(), 800);
                }}
              >
                🍫 Grab the Chocolate Deal
              </button>

              <p className="text-white/50 text-xs text-center">
                Valid in-store & online • Limited time only
              </p>
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isSpinWheel ? (
          showSpinWheel ? (
            /* Show story background while popup is open */
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt="Spin the Wheel"
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#E30F84]/60 via-[#E30F84]/40 to-[#E30F84]/70" />
            </div>
          ) : (
          <div className="absolute inset-0 flex items-center justify-center z-[9] pointer-events-none">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt="Spin the Wheel"
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#E30F84]/60 via-[#E30F84]/40 to-[#E30F84]/70" />
            </div>

            {/* Content */}
            <div className="relative w-full max-w-sm px-6 pointer-events-none">
              {/* Wheel Emoji Header */}
              <div className="text-center mb-4">
                <span className="text-6xl">🎡</span>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-white text-4xl font-black mb-3 leading-tight">
                  SPIN &amp; WIN!
                </h2>
                <p className="text-white/90 text-base leading-relaxed">
                  Get a chance to win <span className="text-[#F9A8D4] font-bold">FREE scoops, discounts up to 50%, and exclusive rewards</span> every time you visit!
                </p>
              </div>

              {/* Prize Card */}
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border-2 border-[#F9A8D4]/40 mb-6">
                {/* Today's Prize */}
                <div className="text-center mb-5">
                  <p className="text-[#F9A8D4] text-sm tracking-wider mb-2">TODAY'S SPECIAL PRIZE</p>
                  <div className="bg-gradient-to-r from-[#E30F84] to-[#c00d72] rounded-2xl p-4 mb-3">
                    <p className="text-white text-5xl font-black">50%</p>
                    <p className="text-white text-lg font-bold mt-1">OFF</p>
                  </div>
                  <p className="text-white text-sm">on your entire order!</p>
                </div>

                {/* Other Prizes */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/10 rounded-xl p-2 text-center">
                    <p className="text-2xl mb-1">🍦</p>
                    <p className="text-white text-xs font-semibold">Free Scoop</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2 text-center">
                    <p className="text-2xl mb-1">💝</p>
                    <p className="text-white text-xs font-semibold">Mystery Gift</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2 text-center">
                    <p className="text-2xl mb-1">⭐</p>
                    <p className="text-white text-xs font-semibold">2x Points</p>
                  </div>
                </div>
              </div>

              {/* How to Play */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-6">
                <p className="text-white/90 text-sm text-center leading-relaxed">
                  ✨ Show this story at the counter<br/>
                  🎯 Spin the digital wheel<br/>
                  🎁 Win instant rewards!
                </p>
              </div>

              {/* CTA */}
              <button
                className="w-full py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all active:scale-95 pointer-events-auto mb-3"
                style={{ background: 'linear-gradient(135deg, #E30F84 0%, #c00d72 100%)', color: 'white' }}
                onClick={() => {
                  if (spinRegistered) {
                    setShowSpinWheel(true);
                  } else {
                    setShowSpinRegistration(true);
                  }
                  setIsPaused(true);
                }}
              >
                🎡 {spinRegistered ? 'Spin the Wheel Now!' : 'Register & Spin!'}
              </button>

              <p className="text-white/60 text-xs text-center">
                Tap to play • One spin per visit
              </p>
            </div>
          </div>
          )
        ) : stories[currentStoryIndex]?.isLuckyDraw ? (
          showLuckyDraw ? (
            /* Show story background while popup is open */
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt="Monthly Lucky Draw"
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#005CB9]/70 via-[#005CB9]/50 to-[#005CB9]/80" />
            </div>
          ) : (
          <div className="absolute inset-0 flex items-center justify-center z-[9] pointer-events-none">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt="Monthly Lucky Draw"
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#005CB9]/70 via-[#005CB9]/50 to-[#005CB9]/80" />
            </div>

            {/* Content */}
            <div className="relative w-full max-w-sm px-6 pointer-events-none">
              {/* Trophy Emoji Header */}
              <div className="text-center mb-4">
                <span className="text-6xl">🏆</span>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <p className="text-[#F9A8D4] text-sm tracking-widest mb-2">MONTHLY LUCKY DRAW</p>
                <h2 className="text-white text-4xl font-black mb-3 leading-tight">
                  WIN BIG<br/>THIS MONTH!
                </h2>
                <p className="text-white/90 text-base">
                  Every purchase automatically enters you into our monthly lucky draw!
                </p>
              </div>

              {/* Grand Prize */}
              <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-3xl p-6 border-2 border-[#F9A8D4]/50 mb-6">
                <p className="text-[#F9A8D4] text-xs tracking-wider text-center mb-3">GRAND PRIZE</p>
                <div className="text-center mb-4">
                  <p className="text-white text-6xl font-black">₹10,000</p>
                  <p className="text-white/80 text-sm mt-2">Baskin Robbins Gift Card</p>
                </div>
                
                {/* Additional Prizes */}
                <div className="bg-[#005CB9]/30 rounded-2xl p-4 border border-white/10">
                  <p className="text-white text-xs font-semibold mb-2 text-center">PLUS 50 WINNERS GET:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-3xl mb-1">🍨</p>
                      <p className="text-white text-xs">Free Ice Cream<br/>for a Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl mb-1">🎂</p>
                      <p className="text-white text-xs">Custom Cake<br/>Voucher</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Draw Date */}
              <div className="bg-gradient-to-r from-[#E30F84]/30 to-[#E30F84]/20 rounded-2xl p-4 border border-[#E30F84]/30 mb-6 text-center">
                <p className="text-white/70 text-xs mb-1">DRAW DATE</p>
                <p className="text-white text-xl font-bold">December 31, 2024</p>
                <p className="text-white/60 text-xs mt-1">Winners announced via SMS & Email</p>
              </div>

              {/* CTA */}
              <button
                className="w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95 pointer-events-auto mb-3"
                style={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)', 
                  color: '#005CB9',
                  boxShadow: '0 10px 30px rgba(227, 15, 132, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.8)'
                }}
                onClick={() => {
                  if (luckyDrawRegistered) {
                    setShowLuckyDraw(true);
                  } else {
                    setShowLuckyDrawRegistration(true);
                  }
                  setIsPaused(true);
                }}
              >
                🎁 {luckyDrawRegistered ? 'Try Your Luck Now!' : 'Register & Play!'}
              </button>

              <p className="text-white text-xs text-center font-semibold" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                Tap to play • Terms apply
              </p>
            </div>
          </div>
          )
        ) : stories[currentStoryIndex]?.isRaffle ? (
          <div className="w-full h-full flex items-center justify-center z-[9] pointer-events-none">
            {/* Premium gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
              }}
            />
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/10" />

            {/* Centered white card */}
            <div className="relative w-full max-w-sm mx-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden pointer-events-none">
              <div className="p-6">
                {/* Header Badge */}
                <div className="text-center mb-4">
                  <div
                    className="inline-block px-5 py-2 rounded-full"
                    style={{ background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` }}
                  >
                    <span className="text-white text-xs font-bold tracking-widest uppercase">MONTHLY LUCKY DRAW</span>
                  </div>
                </div>

                {/* Ticket Eligibility */}
                <div className="text-center mb-5">
                  <p className="text-xs mb-2" style={{ color: brand.colors.text.secondary }}>You're Eligible for</p>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Gift className="w-8 h-8" style={{ color: brand.colors.primary }} />
                    <span className="text-5xl font-bold" style={{ color: brand.colors.primary }}>
                      {Math.max(1, Math.floor(5188 / 2500))}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: brand.colors.text.primary }}>Lucky Draw Ticket(s)</p>
                  <p className="text-[10px] mt-1" style={{ color: brand.colors.text.tertiary }}>
                    On your Invoice no. BR-2024-00488 of amount ₹5,188
                  </p>
                </div>

                {/* Dashed Separator */}
                <div className="border-t-2 border-dashed my-4" style={{ borderColor: `${brand.colors.primary}33` }} />

                {/* Prize Structure */}
                <div className="mb-5">
                  <p className="text-center font-semibold text-sm mb-3" style={{ color: brand.colors.text.primary }}>Win Amazing Prizes!</p>
                  <div className="space-y-2">
                    {[
                      { emoji: '\u{1F3C6}', label: 'First Prize', amount: '\u20B91,00,000', winners: '1 Winner' },
                      { emoji: '\u{1F948}', label: 'Second Prize', amount: '\u20B930,000', winners: '5 Winners' },
                      { emoji: '\u{1F949}', label: 'Third Prize', amount: '\u20B910,000', winners: '15 Winners' },
                    ].map((prize) => (
                      <div
                        key={prize.label}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{
                          backgroundColor: `${brand.colors.primary}0D`,
                          border: `1px solid ${brand.colors.primary}1A`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{prize.emoji}</span>
                          <span className="text-xs font-medium" style={{ color: brand.colors.text.primary }}>{prize.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold" style={{ color: brand.colors.primaryDark }}>{prize.amount}</span>
                          <span className="text-[10px] ml-1" style={{ color: brand.colors.text.tertiary }}>· {prize.winners}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                {!raffleClaimed ? (
                  <button
                    className="w-full py-4 rounded-2xl font-bold text-base text-white shadow-lg transition-all active:scale-95 pointer-events-auto flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` }}
                    onClick={() => {
                      setShowRaffleSheet(true);
                      setIsPaused(true);
                    }}
                  >
                    <Trophy className="w-5 h-5" />
                    Claim {Math.max(1, Math.floor(5188 / 2500))} Lucky Draw Ticket(s) Now
                  </button>
                ) : (
                  <div className="w-full py-4 rounded-2xl font-bold text-base text-center text-green-700 bg-green-50 border border-green-200">
                    ✓ Tickets Claimed Successfully!
                  </div>
                )}

                {/* Terms */}
                <div
                  className="mt-4 rounded-xl p-3"
                  style={{ backgroundColor: `${brand.colors.primaryDark}0D` }}
                >
                  <p className="text-[10px] leading-relaxed" style={{ color: brand.colors.text.secondary }}>
                    • 1 lucky draw ticket for every ₹2,500 spent<br />
                    • Winners announced on 1st of every month<br />
                    • Multiple tickets = Higher chances<br />
                    • Valid profile information required
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isRewardsPoster ? (
          <div className="absolute inset-0 z-[9] pointer-events-none">
            {/* Full-screen poster */}
            <div className="absolute inset-0">
              <img
                src={REWARDS_POSTER_IMG}
                alt="Baskin Robbins Rewards Program"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Multi-stop gradient — lets image breathe at top, creates a rich dark canvas at bottom */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 75%, rgba(0,0,0,0.97) 100%)' }} />

            {/* Ad Copy — anchored to bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-7 pb-32 flex flex-col items-start">

              {/* Eyebrow label */}
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: '#E30F84' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <span className="text-white text-[10px] font-bold tracking-[0.18em] uppercase">
                  Baskin Robbins Rewards
                </span>
              </div>

              {/* Hero headline */}
              <div className="mb-1">
                <p
                  className="text-white leading-none"
                  style={{
                    fontSize: '76px',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 32px rgba(0,0,0,0.6)',
                    lineHeight: 0.92,
                  }}
                >
                  FREE
                </p>
                <p
                  className="leading-none"
                  style={{
                    fontSize: '76px',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.92,
                    color: '#F9A8D4',
                    textShadow: '0 4px 32px rgba(227,15,132,0.5)',
                  }}
                >
                  SCOOP
                </p>
              </div>

              {/* Subline */}
              <div className="flex items-center gap-3 mt-4 mb-1">
                <div className="w-8 h-px bg-white/40" />
                <p
                  className="text-white/60 uppercase tracking-[0.2em]"
                  style={{ fontSize: '11px', fontWeight: 600 }}
                >
                  on your
                </p>
              </div>
              <p
                className="text-white"
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                }}
              >
                Second Visit
              </p>

              {/* Divider with star */}
              <div className="flex items-center gap-3 my-5 w-full">
                <div className="flex-1 h-px bg-white/20" />
                <span style={{ color: '#E30F84', fontSize: '16px' }}>✦</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              {/* Supporting copy */}
              <p
                className="text-white/70 tracking-[0.14em] uppercase mb-6"
                style={{ fontSize: '11px', fontWeight: 500 }}
              >
                Join the rewards program
              </p>
            </div>

            {/* CTA Button — BR pink, full-width */}
            <div className="absolute bottom-8 left-7 right-7">
              <button
                className="w-full py-4 rounded-2xl font-bold text-base shadow-2xl transition-all active:scale-95 pointer-events-auto flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #E30F84 0%, #c00d72 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(227,15,132,0.45)',
                  fontSize: '16px',
                  letterSpacing: '0.02em',
                }}
                onClick={() => {
                  toast.success('🎉 Welcome to Baskin Robbins Rewards!', {
                    description: 'Opening your profile to complete registration...',
                    duration: 3000,
                  });
                  onAction?.({ type: 'navigate-profile' });
                  setTimeout(() => onClose(), 600);
                }}
              >
                Register Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : stories[currentStoryIndex]?.isVideo ? (
          videoError ? (
            // Show fallback image if video fails to load
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
                srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
                sizes={getImageSizes('story')}
                alt={`Story ${currentStoryIndex + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
                width="430"
                height="932"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                  <p className="text-white text-sm text-center">
                    🎬 Video temporarily unavailable<br/>
                    <span className="text-xs opacity-75">Showing preview image</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                key={currentStoryIndex}
                autoPlay
                muted
                playsInline
                loop
                poster={stories[currentStoryIndex].image}
                className="w-full h-full object-cover"
                onLoadedData={() => {
                  console.log('✅ Video loaded successfully:', stories[currentStoryIndex].videoUrl);
                  setVideoError(false);
                }}
                onError={(e) => {
                  console.error('❌ Video loading error for URL:', stories[currentStoryIndex].videoUrl, 'Error type:', e.type);
                  setVideoError(true);
                }}
                onPlay={() => console.log('▶️ Video is now playing')}
                onCanPlay={() => {
                  console.log('🎬 Video can play');
                  videoRef.current?.play();
                }}
              >
                <source src={stories[currentStoryIndex].videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={optimizeUnsplashUrl(stories[currentStoryIndex].image, 800, 85)}
              srcSet={generateSrcSet(stories[currentStoryIndex].image, [430, 800])}
              sizes={getImageSizes('story')}
              alt={`Story ${currentStoryIndex + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
              width="430"
              height="932"
            />
          </div>
        )}

        {/* Story Content Overlay */}
        {stories[currentStoryIndex]?.isNPSSurvey && !surveyCompleted && (
          <>
            {/* Centered Survey */}
            <div className="absolute inset-0 flex items-center justify-center px-4 z-[9] pointer-events-none">
              <MultiTierSurvey
                onExperienceRating={onExperienceRating}
                experienceRating={experienceRating}
                onComplete={handleSurveyComplete}
              />
            </div>
          </>
        )}

        {/* Fashion Destinations - Store Locator - Show on the last image story (id: 6) */}
        {stories[currentStoryIndex]?.id === 6 && !stories[currentStoryIndex]?.isNPSSurvey && !stories[currentStoryIndex]?.isWelcome && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-[9] bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none">
            <div className="text-white pointer-events-auto">
              {/* Header */}
              <div className="mb-6 text-center">
                <div 
                  className="inline-block px-4 py-1.5 rounded-full mb-3"
                  style={{ backgroundColor: brand.colors.primary }}
                >
                  <span className="text-[#CBA258] text-xs font-bold tracking-wider">{brand.content.stories.fashionDestinations.badge.en}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{brand.content.stories.fashionDestinations.title.en}</h2>
                <p className="text-sm opacity-90">{brand.content.stories.fashionDestinations.subtitle.en}</p>
              </div>
              
              {/* City Links */}
              <div className="space-y-2.5 mb-4">
                {fashionDestinations.map((item, index) => (
                  <a
                    key={index}
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block backdrop-blur-md rounded-2xl p-4 border border-[#CBA258]/30 hover:border-[#CBA258] transition-all active:scale-[0.98]"
                    style={{ background: `linear-gradient(to right, ${getColorWithOpacity(brand.colors.primary, 0.3)}, ${getColorWithOpacity(brand.colors.primaryDark, 0.3)})` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="font-semibold text-base text-white">{item.city}</p>
                          <p className="text-xs text-[#CBA258] mt-0.5">{item.link}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-[#CBA258]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              {/* Footer CTA */}
              <div 
                className="rounded-2xl p-4 text-center border-2 border-[#CBA258]/50"
                style={{ background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` }}
              >
                <p className="text-[#CBA258] text-sm font-bold">{brand.content.stories.fashionDestinations.footer.heading.en}</p>
                <p className="text-white text-xs mt-1 opacity-90">{brand.content.stories.fashionDestinations.footer.text.en}</p>
              </div>
            </div>
          </div>
        )}

        {/* Survey Completed Message */}
        {stories[currentStoryIndex]?.isNPSSurvey && surveyCompleted && (
          <>
            <div className="absolute inset-0 flex items-center justify-center px-4 z-[9]">
              <div 
                className="bg-gradient-to-br from-[#f8f5fa] to-white p-8 rounded-[20px] border-2 text-center pointer-events-auto"
                style={{ 
                  borderColor: brand.colors.primary,
                  boxShadow: `0px 8px 24px 0px ${getColorWithOpacity(brand.colors.primary, 0.15)}`
                }}
              >
                <div className="text-5xl mb-4">🎉</div>
                <p 
                  className="font-medium text-[16px] mb-2"
                  style={{ color: brand.colors.primary }}
                >Thank You!</p>
                <p className="text-[#888888] text-[14px] mt-1 opacity-90">Your feedback has been submitted successfully</p>
              </div>
            </div>
          </>
        )}

        {/* 
          ═════════════════════════════════════════════════════════════════════════
          TAP NAVIGATION ZONES - STORY-SPECIFIC ARCHITECTURE
          ═══════════════════════════════════════════════════════════════════════════
          
          UNIFIED APPROACH:
          - Single full-screen tap zone at z-[5] (below all content)
          - Left 1/3 = previous, Right 2/3 = next
          - All interactive elements (buttons, surveys, links) use z-[9] + pointer-events-auto
          - Background overlays use pointer-events-none to pass clicks through
          ═══════════════════════════════════════════════════════════════════════════
        */}

        {/* Universal Tap Navigation - Always present, always behind content */}
        <div className="absolute inset-0 flex z-[5]">
          {/* Left tap area - Previous story */}
          <div 
            className="w-1/2 h-full cursor-pointer active:bg-white/5"
            onClick={handlePrevious}
          />
          {/* Right tap area - Next story */}
          <div 
            className="w-1/2 h-full cursor-pointer active:bg-white/5"
            onClick={handleNext}
          />
        </div>

        {/* Edge Navigation Strips - Always on top for NPS and other interactive stories */}
        <div className="absolute left-0 top-12 bottom-0 w-12 z-[10] cursor-pointer" onClick={handlePrevious} />
        <div className="absolute right-0 top-12 bottom-0 w-12 z-[10] cursor-pointer" onClick={handleNext} />

        {/* ═══ GAMIFICATION POPUP MODALS ═══ */}
        {/* Spin the Wheel Popup */}
        {showSpinWheel && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            {/* Popup Container */}
            <div className="relative w-[95%] max-w-[400px] max-h-[90vh] bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => {
                  setShowSpinWheel(false);
                  setIsPaused(false);
                }}
                className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 active:scale-95 transition-all shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              {/* Spin Wheel Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                <InteractiveSpinWheel
                  onWin={(reward) => {
                    toast.success(`🎡 You won ${reward.discount}!`, {
                      description: `Code ${reward.couponCode} saved to your Coupons tab!`,
                      duration: 4000,
                    });
                    onAction?.({
                      type: 'claim-coupon',
                      coupon: {
                        id: `spin-${Date.now()}`,
                        code: reward.couponCode,
                        title: reward.discount,
                        description: reward.description,
                        expiry: `Expires in ${reward.validDays} days`,
                        source: 'spin-wheel',
                        type: 'qr',
                      },
                    });
                  }}
                  onNext={() => {
                    setShowSpinWheel(false);
                    setIsPaused(false);
                    setTimeout(() => onClose(), 300);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Lucky Draw Popup */}
        {showLuckyDraw && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            {/* Popup Container */}
            <div className="relative w-[95%] max-w-[400px] max-h-[90vh] bg-gradient-to-br from-[#0a1628] via-[#1b2d4e] to-[#0a1628] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => {
                  setShowLuckyDraw(false);
                  setIsPaused(false);
                }}
                className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 active:scale-95 transition-all shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              {/* Lucky Draw Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                <InteractiveLuckyDraw
                  onWin={(reward) => {
                    toast.success(`🏆 You won: ${reward.discount}!`, {
                      description: `Code ${reward.couponCode} saved to your Coupons tab!`,
                      duration: 4000,
                    });
                    onAction?.({
                      type: 'claim-coupon',
                      coupon: {
                        id: `lucky-${Date.now()}`,
                        code: reward.couponCode,
                        title: reward.discount,
                        description: reward.description,
                        expiry: `Expires in ${reward.validDays} days`,
                        source: 'lucky-draw',
                        type: 'qr',
                      },
                    });
                  }}
                  onNext={() => {
                    setShowLuckyDraw(false);
                    setIsPaused(false);
                    setTimeout(() => onClose(), 300);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Spin Wheel Registration Sheet */}
        <GameRegistrationSheet
          isOpen={showSpinRegistration}
          onOpenChange={(open) => {
            setShowSpinRegistration(open);
            if (!open && !spinRegistered) {
              setIsPaused(false);
            }
          }}
          gameType="spin-wheel"
          rewardDescription="a chance to win up to 50% off"
          autoCloseOnSuccess={false}
          onSuccess={() => {
            setSpinRegistered(true);
            setShowSpinRegistration(false);
            // Auto-open the spin wheel game after registration
            setTimeout(() => {
              setShowSpinWheel(true);
              setIsPaused(true);
            }, 400);
            toast.success('🎡 Registration complete!', {
              description: 'Get ready to spin the wheel!',
              duration: 2000,
            });
          }}
          customerPhone="9876543210"
        />

        {/* Lucky Draw Registration Sheet */}
        <GameRegistrationSheet
          isOpen={showLuckyDrawRegistration}
          onOpenChange={(open) => {
            setShowLuckyDrawRegistration(open);
            if (!open && !luckyDrawRegistered) {
              setIsPaused(false);
            }
          }}
          gameType="lucky-draw"
          rewardDescription="entry into the Monthly Lucky Draw"
          autoCloseOnSuccess={false}
          onSuccess={() => {
            setLuckyDrawRegistered(true);
            setShowLuckyDrawRegistration(false);
            // Auto-open the lucky draw game after registration
            setTimeout(() => {
              setShowLuckyDraw(true);
              setIsPaused(true);
            }, 400);
            toast.success('🎁 Registration complete!', {
              description: 'Get ready to try your luck!',
              duration: 2000,
            });
          }}
          customerPhone="9876543210"
        />

        {/* Raffle Registration Sheet */}
        <GameRegistrationSheet
          isOpen={showRaffleSheet}
          onOpenChange={(open) => {
            setShowRaffleSheet(open);
            if (!open && raffleClaimed) {
              setIsPaused(false);
              setTimeout(() => onClose(), 300);
            }
          }}
          gameType="lucky-draw"
          rewardDescription={`${Math.max(1, Math.floor(5188 / 2500))} Lucky Draw Tickets`}
          onSuccess={(tickets) => {
            setRaffleClaimed(true);
            onAction?.({ type: 'claim-raffle', tickets });
          }}
          customerPhone="9876543210"
        />
      </div>
    </div>
  );
}