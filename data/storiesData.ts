import { brand } from '../config/brand';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  BRAND STORIES DATA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This file contains all story configurations for the Stories feature.
 * Each story can be either:
 * - Coupon/Offer (isCoupon: true)
 * - NPS Survey (isNPSSurvey: true)
 * - Welcome/Tier Upgrade (isWelcome: true)
 * - Image Story with content overlay (isNPSSurvey: false)
 * - Video Story (isVideo: true)
 * 
 * Story Types:
 * 0. Coupon Story (id: 0) - Online order discount offer
 * 1. NPS Survey Story (id: 1) - Customer feedback collection
 * 2. Welcome Story - Tier Upgrade (id: 2)
 * 3. Video Story (id: 3) - Fashion retail video
 * 4. Brand Program (id: 4) - City-specific links (if applicable)
 * 5. Video Story (id: 5+) - Product videos
 */

export interface Story {
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
  createdAt?: number;
  expiresAt?: number;
}

export const stories: Story[] = [
  {
    id: 0,
    image: '',
    duration: 8000,
    isRewardsPoster: true
  },
  {
    id: 1,
    image: brand.assets.stories.coupon,
    duration: 10000,
    isCoupon: true
  },
  {
    id: 2,
    image: '', 
    duration: 10000,
    isNPSSurvey: true
  },
  {
    id: 3,
    image: brand.assets.stories.welcome,
    duration: 10000,
    isWelcome: true
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1760445529130-230c28c38b2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBpY2UlMjBjcmVhbSUyMHNjb29wJTIwZGFyayUyMHJpY2h8ZW58MXx8fHwxNzczODE5NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 12000,
    isChocolateOffer: true
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1473014805482-c0098dc9e9b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBmdWRnZSUyMGljZSUyMGNyZWFtJTIwc2Nvb3B8ZW58MXx8fHwxNzczODIyMDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 10000,
    isPromo: true
  },
  {
    id: 6,
    image: brand.assets.stories.promo2,
    duration: 10000,
    isNPSSurvey: false
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1546381107-b5c6e7c1a8af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGluJTIwdGhlJTIwd2hlZWwlMjBwcml6ZSUyMGdhbWUlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzM5MDI5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 10000,
    isSpinWheel: true
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1618255342875-a1d288c04939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdWNreSUyMGRyYXclMjBjb250ZXN0JTIwd2lubmVyJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczOTAyOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 10000,
    isLuckyDraw: true
  }
  // Video stories will be dynamically added from uploads
];

/**
 * Ice Cream Destinations - Store Locations
 * These links are shown in the store locator story (id: 4)
 * Update these based on your brand's store locations
 */
export const fashionDestinations = [
  { city: 'Bengaluru', link: 'baskinrobbinsindia.com/stores/bengaluru', emoji: '🍦' },
  { city: 'Mumbai', link: 'baskinrobbinsindia.com/stores/mumbai', emoji: '🍨' },
  { city: 'New Delhi', link: 'baskinrobbinsindia.com/stores/delhi', emoji: '🍧' },
  { city: 'Kolkata', link: 'baskinrobbinsindia.com/stores/kolkata', emoji: '🍰' },
  { city: 'Pune', link: 'baskinrobbinsindia.com/stores/pune', emoji: '🎂' }
];