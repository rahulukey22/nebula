/**
 * ZUDIO POSTS DATA
 * 
 * Easy Content Management Guide:
 * ==============================
 * 
 * To add or update posts, simply edit the posts array below.
 * 
 * CATEGORY TYPES:
 * ---------------
 * - 'offer': Special promotions, discounts, limited-time deals
 * - 'event': Events, workshops, community gatherings
 * - 'regular': Standard product posts and general content
 * 
 * MEDIA INSTRUCTIONS:
 * -------------------
 * 
 * Each post can now have MULTIPLE IMAGES AND/OR VIDEOS.
 * Users can swipe through them like Instagram carousel posts.
 * 
 * Media Item Structure:
 * - type: 'image' or 'video'
 * - url: The image or video URL
 * 
 * EXAMPLE POST STRUCTURE:
 * ----------------------
 * {
 *   id: 1,
 *   author: 'Zudio',
 *   category: 'offer',
 *   media: [
 *     { type: 'image', url: 'https://...' },
 *     { type: 'video', url: 'https://...' },
 *     { type: 'image', url: 'https://...' }
 *   ],
 *   description: '...',
 *   products: [
 *     { name: 'Product Name', price: 4.95 }
 *   ],
 *   eventDate?: '2026-01-20',
 *   offerBadge?: 'BOGO',
 *   offerEndDate?: '2026-01-31'
 * }
 */

export interface Product {
  name: string;
  price: number;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export type PostCategory = 'offer' | 'event' | 'regular';

export interface Post {
  id: number;
  author: string;
  category: PostCategory;
  media: MediaItem[];  // Array of images and/or videos
  description: string;
  products: Product[];
  eventDate?: string;      // For event posts: ISO date string
  offerBadge?: string;     // For offer posts: e.g., 'BOGO', '50% OFF', 'BUY 1 GET 1'
  offerEndDate?: string;   // For offer posts: ISO date string
}

// ========================================
// POSTS ARRAY - EDIT THIS TO UPDATE CONTENT
// ========================================

export const posts: Post[] = [
  // 1. Carousel Post (Items)
  {
    id: 1,
    author: 'Zudio',
    category: 'regular',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1657657366123-b5bf60bc9ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBmcmFwcHVjY2lub3xlbnwxfHx8fDE3Njg3MTkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1654966479595-a96633ff35b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY4NzE5MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1759722144195-99899256fc73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBtZXJjaGFuZGlzZSUyMG11Z3xlbnwxfHx8fDE3Njg3MTkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    description: 'Discover our new favorites! Swipe to see what\'s brewing this season. From creamy frappuccinos to flaky croissants and exclusive merchandise. ☕️🥐🎁',
    products: [
      { name: 'Mocha Frappuccino', price: 325.00 },
      { name: 'Butter Croissant', price: 245.00 },
      { name: 'Ceramic Mug', price: 850.00 }
    ]
  },
  
  // 2. Video Post (Promotion Launch)
  {
    id: 2,
    author: 'Zudio',
    category: 'offer',
    media: [
      { 
        type: 'video', 
        // Your uploaded Zudio video
        url: 'https://eqnkgveyhahalefbftuv.supabase.co/storage/v1/object/sign/make-90d6047b-videos/story-video-1769016179301-9qxoo.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNzU5NWIxOC1iYmJhLTRiZTgtODljZC1mMWM1NDQzNWQ2OGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYWtlLTkwZDYwNDdiLXZpZGVvcy9zdG9yeS12aWRlby0xNzY5MDE2MTc5MzAxLTlxeG9vLm1wNCIsImlhdCI6MTc2OTAxNjE4MSwiZXhwIjoyMDg0Mzc2MTgxfQ.u5thRf7YSSgZ6AYVlNbWY0f8vkEhUmpu2CAoVFKHCAY'
      }
    ],
    description: '☁️ Introducing the new Cloud Macchiato. Experience the fluffiest foam yet. It\'s not just coffee, it\'s a feeling. Available now! ✨',
    products: [
      { name: 'Cloud Macchiato', price: 425.00 }
    ],
    offerBadge: 'NEW LAUNCH',
    offerEndDate: '2026-03-01'
  },
  
  // 3. Event Invite Post (RSVP)
  {
    id: 3,
    author: 'Zudio',
    category: 'event',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1651223776659-b314dd0ac0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbGl2ZSUyMG11c2ljJTIwZXZlbnR8ZW58MXx8fHwxNzY4NzE5MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    description: '🎵 Live Acoustic Night! Join us this Saturday for an evening of soulful music and great coffee. RSVP now to save your spot!',
    products: [
      { name: 'Event Entry', price: 0.00 }
    ],
    eventDate: '2026-02-15'
  },
  
  // Rest of the posts (kept from original but re-indexed)
  {
    id: 4,
    author: 'Zudio',
    category: 'offer',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1649510624989-308ac2eb4027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBoYXBweSUyMGhvdXIlMjBzcGVjaWFsfGVufDF8fHx8MTc2ODUzODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    description: '🎉 Happy Hour Alert! Buy one handcrafted beverage, get one FREE! Valid 2-7 PM daily. Hurry, limited time only! ⏰',
    products: [
      { name: 'Caffè Latte', price: 425.00 },
      { name: 'Cappuccino', price: 425.00 }
    ],
    offerBadge: 'BOGO',
    offerEndDate: '2026-01-25'
  },
  {
    id: 5,
    author: 'Zudio',
    category: 'regular',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxpY2VkJTIwY29mZmVlfGVufDF8fHx8MTc2ODIwMzgzMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxpY2VkJTIwY29mZmVlfGVufDF8fHx8MTc2ODIwMzgzMXww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    description: 'Iced coffee season is here 🧊☀️',
    products: [
      { name: 'Iced Coffee', price: 395.00 },
      { name: 'Cold Brew', price: 445.00 }
    ]
  },
  {
    id: 6,
    author: 'Zudio',
    category: 'regular',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxjb2ZmZWUlMjBzaG9wJTIwbGl2ZSUyMG11c2ljJTIwZXZlbnR8ZW58MXx8fHwxNzY4NzE5MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    description: 'Your third place between work and home 🏠',
    products: [
      { name: 'Croissant', price: 275.00 },
      { name: 'Latte', price: 425.00 }
    ]
  },
  {
    id: 7,
    author: 'Zudio',
    category: 'regular',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3NjgyMDM4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8bGF0dGUlMjBhcnR8ZW58MXx8fHwxNzY4MjAzODIyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    description: 'The art of the perfect pour 🎨',
    products: [
      { name: 'Flat White', price: 465.00 },
      { name: 'Espresso', price: 285.00 }
    ]
  },
  {
    id: 8,
    author: 'Zudio',
    category: 'regular',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1594261623946-b2583204969c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxtYXRjaGElMjBsYXR0ZXxlbnwxfHx8fDE3NjgyMDM5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    description: 'Find your focus with Matcha 🍵',
    products: [
      { name: 'Matcha Latte', price: 485.00 },
      { name: 'Green Tea', price: 295.00 }
    ]
  }
];

/**
 * QUICK TIPS:
 * -----------
 * 
 * 1. To add a new post with multiple media items:
 *    {
 *      id: 7,
 *      author: 'Zudio',
 *      category: 'offer',
 *      media: [
 *        { type: 'image', url: 'https://...' },
 *        { type: 'video', url: 'https://...' },
 *        { type: 'image', url: 'https://...' }
 *      ],
 *      description: 'Your caption here',
 *      products: [...],
 *      offerBadge: '50% OFF',
 *      offerEndDate: '2026-02-28'
 *    }
 * 
 * 2. To update media:
 *    - Just edit the media array
 *    - Add or remove items as needed
 *    - Mix images and videos in any order
 * 
 * 3. Each post can have 1 to many media items
 *    - Users will swipe through them horizontally
 *    - View count is per post, not per media item
 */