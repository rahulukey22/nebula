import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { optimizeUnsplashUrl, generateSrcSet, getImageSizes } from '../../utils/imageOptimization';
import type { MediaItem } from '../../data/posts';

interface MediaCarouselProps {
  media: MediaItem[];
  postId: number;
  onVideoRef?: (index: number, el: HTMLVideoElement | null) => void;
  isVisible?: boolean;
}

export function MediaCarousel({ media, postId, onVideoRef, isVisible = true }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mutedVideos, setMutedVideos] = useState<Record<number, boolean>>({});
  const [loadingVideos, setLoadingVideos] = useState<Record<number, boolean>>({});
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Handle video playback on slide change or visibility change
  useEffect(() => {
    // Pause all videos first
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        // Don't reset time so if they go back it resumes
      }
    });

    // If not visible, stop here (all paused)
    if (!isVisible) return;

    // Play current video if it exists
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video playback failed:", error);
          
          // Retry logic:
          // 1. If it was an "AbortError" (user scrolled away quickly), ignore it.
          // 2. If it was "NotAllowedError" (auto-play policy), try muting.
          // 3. If it was "NotSupportedError" (bad format), we can't do much but maybe show an error UI (future improvement).
          
          if (error.name === "NotAllowedError" || error.name === "NotSupportedError") {
             // Try to mute and play again if it was an auto-play issue or similar
             if (!currentVideo.muted) {
                setMutedVideos(prev => ({ ...prev, [currentIndex]: true })); // Force state update
                currentVideo.muted = true;
                currentVideo.play().catch(e => console.error("Retry play failed:", e));
             }
          }
        });
      }
    }
  }, [currentIndex, isVisible]);

  const goToNext = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex < media.length - 1) {
        goToNext();
      } else if (swipeDistance < 0 && currentIndex > 0) {
        goToPrevious();
      }
    }
  };

  const toggleMute = (index: number) => {
    setMutedVideos(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.offsetWidth;
      container.scrollTo({
        left: scrollWidth * currentIndex,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  if (media.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden">
      {/* Media Container */}
      <div
        ref={scrollContainerRef}
        className="flex w-full h-full overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {media.map((item, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 snap-start relative"
          >
            {item.type === 'video' ? (
              <>
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                    onVideoRef?.(index, el);
                  }}
                  src={item.url}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  muted={mutedVideos[index] !== false}
                  onLoadStart={() => {
                    console.log(`Video ${index} load started:`, item.url);
                    setLoadingVideos(prev => ({ ...prev, [index]: true }));
                  }}
                  onLoadedData={() => {
                    console.log(`Video ${index} loaded successfully`);
                    setLoadingVideos(prev => ({ ...prev, [index]: false }));
                  }}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLVideoElement;
                    console.error(`Video ${index} error:`, {
                      url: item.url,
                      errorCode: target.error?.code,
                      errorMessage: target.error?.message,
                      networkState: target.networkState,
                      readyState: target.readyState
                    });
                    setVideoErrors(prev => ({ ...prev, [index]: true }));
                    setLoadingVideos(prev => ({ ...prev, [index]: false }));
                  }}
                  // Removed autoPlay prop to let useEffect handle it
                />
                
                {/* Loading Spinner */}
                {loadingVideos[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Error Message */}
                {videoErrors[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="text-white text-center px-4">
                      <p className="text-sm mb-2">⚠️ Video failed to load</p>
                      <button 
                        onClick={() => {
                          const video = videoRefs.current[index];
                          if (video) {
                            setVideoErrors(prev => ({ ...prev, [index]: false }));
                            setLoadingVideos(prev => ({ ...prev, [index]: true }));
                            video.load();
                          }
                        }}
                        className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Mute Button for Video */}
                {!loadingVideos[index] && !videoErrors[index] && (
                  <button
                    onClick={() => toggleMute(index)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-all hover:bg-black/50 z-10"
                  >
                    {mutedVideos[index] !== false ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                )}
              </>
            ) : (
              <img
                src={optimizeUnsplashUrl(item.url, 800, 85)}
                srcSet={generateSrcSet(item.url, [430, 800])}
                sizes={getImageSizes('post')}
                alt="Post media"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Desktop) */}
      {media.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center shadow-lg hover:bg-white transition-all active:scale-90 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          )}
          
          {currentIndex < media.length - 1 && (
            <button
              onClick={goToNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center shadow-lg hover:bg-white transition-all active:scale-90 z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          )}
        </>
      )}

      {/* Dots Indicator */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white rounded-full'
                  : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}