import { Home, FileText, Star, HeadphonesIcon, User } from 'lucide-react';
import { memo } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { brand } from '../config/brand';

type NavTab = 'home' | 'reviews' | 'support' | 'profile';

interface FloatingBottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingReviewsCount?: number;
  profilePhotoUrl?: string | null;
  userRating?: number;
}

export const FloatingBottomNav = memo(function FloatingBottomNav({ 
  activeTab, 
  onTabChange, 
  pendingReviewsCount = 0,
  profilePhotoUrl,
  userRating = 0
}: FloatingBottomNavProps) {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'home', icon: Home, label: t('navHome') },
    { id: 'reviews', icon: Star, label: t('navReviews') },
    { id: 'support', icon: HeadphonesIcon, label: t('navSupport') },
    { id: 'profile', icon: User, label: t('navProfile') },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 z-50 flex justify-center pointer-events-none">
      {/* Main Dock */}
      <div className="w-full bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-[35px] h-[72px] px-1.5 flex items-center justify-between pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          const isProfileTab = item.id === 'profile';
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as NavTab)}
              className="relative flex flex-1 flex-col items-center justify-center h-full group z-10"
            >
              <div className="relative">
                {/* Profile Photo or Icon */}
                <Icon
                  className={`w-6 h-6 z-10 transition-all duration-300 ${
                    isActive 
                      ? '' 
                      : 'text-gray-500 stroke-gray-500 fill-none'
                  }`}
                  style={isActive ? { color: brand.colors.primary, fill: brand.colors.primary } : {}}
                  strokeWidth={isActive ? 0 : 2}
                />
                
                {/* Pending Reviews Badge */}
                {item.id === 'reviews' && pendingReviewsCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 z-20">
                    {pendingReviewsCount > 99 ? '99+' : pendingReviewsCount}
                  </div>
                )}
              </div>
              
              <span className={`text-[12px] z-10 font-semibold transition-colors duration-300 mt-1 ${
                isActive ? '' : 'text-gray-500'
              }`} style={isActive ? { color: brand.colors.primary } : {}}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});