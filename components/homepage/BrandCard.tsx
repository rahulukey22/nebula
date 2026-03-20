import { Globe } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { VerifiedBadge } from '../ui/verified-badge';
import { useLanguage } from '../../utils/LanguageContext';
import { brand } from '../../config/brand';
import { ImageWithFallback } from '../figma/ImageWithFallback';

import coverImage from 'figma:asset/8fd9dba9cee885420e00455db4eb99233d4239e1.png';

interface BrandCardProps {
  hasViewedStories: boolean;
  filteredStoriesLength: number;
  isFollowing: boolean;
  onStoriesClick: () => void;
  onFollowClick: () => void;
}

export function BrandCard({
  hasViewedStories,
  filteredStoriesLength,
  isFollowing,
  onStoriesClick,
  onFollowClick,
}: BrandCardProps) {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[150px] w-full">
        <ImageWithFallback 
          src={coverImage}
          alt={brand.assets.banner.alt}
          className="w-full h-full object-cover object-center"
          loading="eager"
          width={800}
          height={280}
        />
        
        {/* Language Switcher */}
        <div className="absolute top-3 z-20 right-3">
          <LanguageSwitcher />
        </div>
        
        {/* Stories Button */}
        <button 
          onClick={onStoriesClick}
          className="absolute bottom-[-45px] cursor-pointer group left-2 [@media(min-width:400px)]:left-5"
        >
          <div className="relative w-[85px] h-[85px] [@media(min-width:400px)]:w-[108px] [@media(min-width:400px)]:h-[108px] flex items-center justify-center transition-transform group-hover:scale-105">
            {/* Animated Border Layer */}
            <div 
              className={`absolute inset-0 rounded-full ${hasViewedStories ? 'bg-gray-300' : ''}`}
              style={!hasViewedStories ? {
                background: `conic-gradient(from 0deg, ${brand.colors.primary}, ${brand.colors.primaryDark}, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                animation: 'spin 4s linear infinite'
              } : {}}
            />
            
            {/* Content Layer - Inset determines border thickness (5px) */}
            <div className="absolute inset-[5px] rounded-full bg-white p-[3px] z-10">
              <img src={brand.assets.logo.primary} alt={brand.identity.name} className="w-full h-full rounded-full object-cover p-1" />
            </div>
            
            {/* Story Count Badge - only show when there are multiple stories */}
            {filteredStoriesLength > 1 && (
              <div 
                className="absolute bottom-0 right-0 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white z-20 shadow-lg"
                style={{ backgroundColor: brand.colors.primary }}
              >
                {filteredStoriesLength}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Brand Info Section */}
      <div className="px-2.5 [@media(min-width:400px)]:px-[15px] pt-[64px] [@media(min-width:400px)]:pt-16 pb-[16px] m-[0px] pr-[15px] pl-2.5 [@media(min-width:400px)]:pl-[24px]">
        {/* Brand Name with Verified Badge and Follow Button */}
        <div className="flex items-center gap-1 mb-2">
          <h1 className="text-base font-extrabold text-[#101828] whitespace-nowrap m-[0px]">{t('brandName')}</h1>
          <VerifiedBadge />
          <button 
            onClick={onFollowClick}
            className={`ml-1 h-[22px] px-3 rounded-full text-[11px] font-semibold transition-colors border ${
              isFollowing 
                ? 'bg-white border-[#E5E5E5]' 
                : 'text-white'
            }`}
            style={isFollowing ? { color: brand.colors.primary } : { backgroundColor: brand.colors.primary, borderColor: brand.colors.primary }}
          >
            {isFollowing ? t('following') : t('follow')}
          </button>
        </div>

        {/* Brand Description */}
        <p 
          style={{ 
            fontFamily: 'var(--font-primary)', 
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--line-height-relaxed)'
          }} 
          className="mb-[16px]"
        >
          {t('description')}
        </p>
        
        {/* Stats Section */}
        <div className="flex gap-6 [@media(min-width:400px)]:gap-12 mb-[16px] mt-[0px] mr-[0px] ml-[0px]">
          <div className="">
            <p className="font-bold text-base">{brand.content.stats.stores.count}</p>
            <p className="text-[12px] [@media(min-width:400px)]:text-sm text-[#939393]">{t('stores')}</p>
          </div>
          <div className="">
            <p className="font-bold text-base">{brand.content.stats.eReceipts.percentage}</p>
            <p className="text-[12px] [@media(min-width:400px)]:text-sm text-[#939393]">{t('eReceipts')}</p>
          </div>
          <div className="">
            <p className="font-bold text-base">{brand.content.stats.followers.count}</p>
            <p className="text-[12px] [@media(min-width:400px)]:text-sm text-[#939393]">{t('followers')}</p>
          </div>
        </div>

        {/* Shop Online Button */}
        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => window.open(brand.content.cta.shopOnline.url, '_blank')}
            className="text-white py-2.5 px-6 rounded-full flex items-center justify-center gap-2 text-sm font-medium"
            style={{ backgroundColor: brand.colors.primary }}
          >
            <Globe className="w-4 h-4" />
            {t('shopOnline')}
          </button>
        </div>
      </div>
    </>
  );
}