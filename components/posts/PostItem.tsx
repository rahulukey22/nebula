import { MessageCircle, Share2, Heart, Eye, Calendar, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import type { Post } from '../../data/posts';
import { MediaCarousel } from './MediaCarousel';
import { brand } from '../../config/brand';

interface PostItemProps {
  post: Post;
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  viewCount: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onView: () => void;
}

export function PostItem({
  post,
  likes,
  commentsCount,
  isLiked,
  viewCount,
  onLike,
  onComment,
  onShare,
  onView
}: PostItemProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            onView();
          }
        });
      },
      { threshold: 0.6 } // Increased threshold for better auto-play behavior
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onView]);

  // Helper function to format date
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Helper function to calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const end = new Date(dateString);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-white pb-4 mb-6 ${
        post.category === 'offer' ? 'border-2 border-[#CBA258] rounded-2xl overflow-hidden shadow-md' :
        post.category === 'event' ? 'border-2 border-[#000000] rounded-2xl overflow-hidden shadow-md' :
        'border-b border-gray-100'
      }`}
    >
      {/* Category Badge - Overlay on Media */}
      {post.category !== 'regular' && (
        <div className="relative">
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center border-2 border-white shadow-sm p-1">
                <img 
                  src={brand.assets.logo.primary} 
                  className="w-full h-full object-contain" 
                  alt={brand.identity.name} 
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">{post.author}</span>
                  <button className="text-[#000000] text-xs font-semibold">
                    {t('following')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* View Count */}
            {viewCount !== undefined && (
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 text-xs font-medium">{viewCount}</span>
              </div>
            )}
          </div>

          {/* Media with Badge Overlay */}
          <div className="relative">
            <MediaCarousel media={post.media} postId={post.id} isVisible={isVisible} />
            
            {/* Offer Badge */}
            {post.category === 'offer' && post.offerBadge && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-[#CBA258] to-[#d4af6a] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-white">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-extrabold text-sm tracking-wide">{post.offerBadge}</span>
                </div>
              </div>
            )}
            
            {/* Event Badge */}
            {post.category === 'event' && post.eventDate && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-[#000000] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-white">
                  <Calendar className="w-4 h-4" />
                  <span className="font-bold text-sm">{formatEventDate(post.eventDate)}</span>
                </div>
              </div>
            )}
            
            {/* Countdown Badge for Offers */}
            {post.category === 'offer' && post.offerEndDate && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-bold">
                  {getDaysRemaining(post.offerEndDate)} days left
                </div>
              </div>
            )}
          </div>

          {/* Actions for Offer/Event Posts */}
          <div className="px-4 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button 
                onClick={onLike}
                disabled={isLiked}
                className="flex items-center gap-2 group"
              >
                <Heart 
                  className={`w-6 h-6 transition-all ${
                    isLiked 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-700 group-hover:text-red-500'
                  }`} 
                />
                <span className="text-sm font-medium text-gray-700">{likes}</span>
              </button>
              
              {/* Comment Button */}
              <button 
                onClick={onComment}
                className="flex items-center gap-2 group"
              >
                <MessageCircle className="w-6 h-6 text-gray-700 group-hover:text-[#000000]" />
                <span className="text-sm font-medium text-gray-700">{commentsCount}</span>
              </button>

              {/* Share Button */}
              <button 
                onClick={onShare}
                className="flex items-center gap-2 group"
              >
                <Share2 className="w-6 h-6 text-gray-700 group-hover:text-[#000000]" />
              </button>
            </div>

            {/* RSVP Button for Events */}
            {post.category === 'event' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  alert('✅ RSVP Confirmed! We have saved your spot. See you there! 📅');
                }}
                className="bg-[#000000] text-white px-5 py-2 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all hover:bg-[#1a1a1a] flex items-center gap-2"
              >
                <span>RSVP</span>
                <Calendar className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Description for Offer/Event Posts */}
          <div className="px-4 pt-2">
            <p className="text-sm text-gray-900">
              <span className="font-semibold mr-2">{post.author}</span>
              {post.description}
            </p>
          </div>

          {/* Products for Offer/Event Posts */}
          {post.products && post.products.length > 0 && (
            <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {post.products.map((product, idx) => (
                <div 
                  key={idx}
                  className={`border rounded-lg px-3 py-2 flex-shrink-0 ${
                    post.category === 'offer' 
                      ? 'bg-[#CBA258]/10 border-[#CBA258]' 
                      : post.category === 'event'
                      ? 'bg-[#000000]/10 border-[#000000]'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p className="text-xs font-medium text-gray-900">{product.name}</p>
                  <p className={`text-xs font-semibold ${
                    post.category === 'offer' 
                      ? 'text-[#CBA258]' 
                      : 'text-[#000000]'
                  }`}>
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Regular Post Layout (no badge) */}
      {post.category === 'regular' && (
        <>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center border-2 border-white shadow-sm p-1">
                <img 
                  src={brand.assets.logo.primary} 
                  className="w-full h-full object-contain" 
                  alt={brand.identity.name} 
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">{post.author}</span>
                  <button className="text-[#000000] text-xs font-semibold">
                    {t('following')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* View Count */}
            {viewCount !== undefined && (
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 text-xs font-medium">{viewCount}</span>
              </div>
            )}
          </div>

          {/* Media Carousel */}
          <MediaCarousel media={post.media} postId={post.id} isVisible={isVisible} />

          {/* Actions */}
          <div className="px-4 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button 
                onClick={onLike}
                disabled={isLiked}
                className="flex items-center gap-2 group"
              >
                <Heart 
                  className={`w-6 h-6 transition-all ${
                    isLiked 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-700 group-hover:text-red-500'
                  }`} 
                />
                <span className="text-sm font-medium text-gray-700">{likes}</span>
              </button>
              
              {/* Comment Button */}
              <button 
                onClick={onComment}
                className="flex items-center gap-2 group"
              >
                <MessageCircle className="w-6 h-6 text-gray-700 group-hover:text-[#000000]" />
                <span className="text-sm font-medium text-gray-700">{commentsCount}</span>
              </button>

              {/* Share Button */}
              <button 
                onClick={onShare}
                className="flex items-center gap-2 group"
              >
                <Share2 className="w-6 h-6 text-gray-700 group-hover:text-[#000000]" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="px-4 pt-2">
            <p className="text-sm text-gray-900">
              <span className="font-semibold mr-2">{post.author}</span>
              {post.description}
            </p>
          </div>

          {/* Products */}
          {post.products && post.products.length > 0 && (
            <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {post.products.map((product, idx) => (
                <div 
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-shrink-0"
                >
                  <p className="text-xs font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs font-semibold text-[#000000]">₹{product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}