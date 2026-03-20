/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  CENTRALIZED BRAND CONFIGURATION - BASKIN ROBBINS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This file contains ALL brand-specific configuration values.
 * To rebrand the application, simply update the values in this file.
 * 
 * INSTRUCTIONS FOR REBRANDING:
 * 1. Update brand.identity with new company information
 * 2. Change brand.colors to match new brand palette
 * 3. Replace brand.assets with new logo/images
 * 4. Modify brand.content for new messaging
 * 5. Update brand.features to enable/disable functionality
 */

// Import logo assets - Using Baskin Robbins logo
import baskinRobbinsLogo from 'figma:asset/038cf84d94068a109f094e9ec0577e73e43418e4.png';

// Import product image assets
import chocolateTruffleCakeImg from "figma:asset/1ba4141ae54d99789a402bc4b1f0554acfbfa96a.png";
import thunderHotFudgeImg from "figma:asset/6da87ac3f47b46468968c926deb8173339fa837c.png";
import hopScotchButterscotchConeImg from "figma:asset/92d349703c5259434d50fc32f312a7ae548c7050.png";

// Import story image assets
import storyAssetImg from "figma:asset/c1acbbf9a8a9c02239fa735c640b43c62ef2554b.png";

export const brand = {
  /**
   * BRAND IDENTITY
   * Core information about the brand
   */
  identity: {
    name: 'Baskin Robbins',
    nameInLanguages: {
      en: 'Baskin Robbins',
      hi: 'बास्किन रॉबिन्स',
      ta: 'பாஸ்கின் ராபிந்ஸ்',
    },
    tagline: 'The happiest ice cream in the world!\nMade with real cow milk',
    taglineInLanguages: {
      en: 'The happiest ice cream in the world!\nMade with real cow milk',
      hi: 'दुनिया की सबसे खुशनुमा आइसक्रीम!\nअसली गाय के दूध से बनी',
      ta: 'உலகின் மகிழ்ச்சியான ஐஸ்க்ரீம்!\nதண்ணீர் மாட்டு பாலில் தயாரிக்கப்பட்டது',
    },
    industry: 'icecream', // Options: 'coffeehouse', 'retail', 'restaurant', 'fashion', 'tech', 'icecream'
    website: 'https://baskinrobbinsindia.com/',
    orderWebsite: 'https://order.baskinrobbins.com/categories',
    helpline: '022-6251-3131',
  },

  /**
   * BRAND COLORS
   * All color values used across the application
   */
  colors: {
    // Primary brand colors - Baskin Robbins Pink & Blue
    primary: '#E30F84',        // Baskin Robbins Pink - Main brand color
    primaryDark: '#C00E72',    // Darker pink for hovers
    primaryLight: '#FF4DA6',   // Lighter pink for backgrounds
    
    // Secondary colors - Baskin Robbins Blue
    secondary: '#005CB9',      // Baskin Robbins Blue
    secondaryDark: '#004A99',  // Darker blue for borders
    
    // Accent colors
    accent: '#FFD700',         // Gold/Yellow accent for badges
    accentDark: '#FFC700',     // Darker gold for premium features
    
    // Semantic colors (these typically stay the same across brands)
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Text colors
    text: {
      primary: '#101828',
      secondary: '#667085',
      tertiary: '#98A2B3',
    },
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#FFF5FB',  // Light pink tint
    },
    
    // Border colors
    border: {
      light: '#EAECF0',
      medium: '#D0D5DD',
      dark: '#98A2B3',
    },
  },

  /**
   * BRAND ASSETS
   * URLs to logos, images, and media
   */
  assets: {
    // Logo - Using official Baskin Robbins logo
    logo: {
      primary: baskinRobbinsLogo,
      favicon: baskinRobbinsLogo,
    },
    
    // Hero/Banner images
    banner: {
      home: 'https://images.unsplash.com/photo-1772553219977-f457d29241eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHNob3AlMjBwYXJsb3IlMjBzdG9yZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MzgxNjAyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Baskin Robbins Ice Cream - 31 Flavors of Happiness',
    },
    
    // Story images
    stories: {
      coupon: storyAssetImg,
      welcome: storyAssetImg,
      promo1: storyAssetImg,
      promo2: storyAssetImg,
    },
  },

  /**
   * BRAND CONTENT
   * Text content and messaging
   */
  content: {
    // Statistics
    stats: {
      stores: {
        count: '500+',
        label: {
          en: 'Stores',
          hi: 'स्टोर',
          ta: 'கடைகள்',
        },
      },
      eReceipts: {
        percentage: '95%',
        label: {
          en: 'Happy Customers',
          hi: 'खुश ग्राहक',
          ta: 'மகிழ்ச்சியான வாடிக்கையாளர்கள்',
        },
      },
      followers: {
        count: '3.5M+',
        label: {
          en: 'Ice Cream Lovers',
          hi: 'आइसक्रीम प्रेमी',
          ta: 'ஐஸ் கிரீம் விரும்பிகள்',
        },
      },
    },
    
    // CTA buttons
    cta: {
      shopOnline: {
        text: {
          en: 'Order Now',
          hi: 'अभी ऑर्डर करें',
          ta: 'இப்போது ஆர்டர் செய்யுங்கள்',
        },
        url: 'https://order.baskinrobbins.com/categories',
      },
    },
    
    // Loading messages
    loading: {
      stories: {
        text: 'Loading sweet treats',
        emoji: '🍨',
      },
    },
    
    // Store information
    store: {
      sampleLocation: {
        name: 'Baskin Robbins Phoenix MarketCity - Store: 101',
        address: '142, Lal Bahadur Shastri Road, Kurla West, Mumbai, Maharashtra 400070',
        gstin: 'GSTIN: 06AAACL1838J1ZK',
      },
    },
    
    // Policies
    policies: {
      promise: {
        en: 'Our Promise',
        hi: 'हमारा वादा',
        ta: 'எங்கள் வாக்குறுதி',
      },
      items: [
        {
          en: '31 delicious flavors to choose from every day.',
          hi: 'हर दिन चुनने के लिए 31 स्वादिष्ट फ्लेवर।',
          ta: 'ஒவ்வொரு நாளும் தேர்வு செய்ய 31 சுவையான ஃப்ளேவர்கள்.',
        },
        {
          en: 'Premium ingredients for superior taste and quality.',
          hi: 'बेहतर स्वाद और गुणवत्ता के लिए प्रीमियम सामग्री।',
          ta: 'சிறந்த சுவை மற்றும் தரத்திற்கான பிரீமியம் பொருட்கள்.',
        },
        {
          en: 'New flavor launches every month to excite your taste buds.',
          hi: 'आपकी स्वाद कलियों को रोमांचित करने के लिए हर महीने नया फ्लेवर।',
          ta: 'உங்கள் சுவை மொட்டுகளை மகிழ்விக்க ஒவ்வொரு மாதமும் புதிய ஃப்ளேவர்.',
        },
        {
          en: 'Perfect ice cream experience for the whole family.',
          hi: 'पूरे परिवार के लिए परफेक्ट आइसक्रीम अनुभव।',
          ta: 'முழு குடும்பத்திற்கும் சரியான ஐஸ் கிரீம் அனுபவம்.',
        },
        {
          en: 'Fresh ice cream cakes for every celebration.',
          hi: 'हर उत्सव के लिए ताजा आइसक्रीम केक।',
          ta: 'ஒவ்வொரு கொண்டாட்டத்திற்கும் புதிய ஐஸ் கிரீம் கேக்குகள்.',
        },
        {
          en: 'Trusted by millions of ice cream lovers since 1945.',
          hi: '1945 से लाखों आइसक्रीम प्रेमियों द्वारा विश्वसनीय।',
          ta: '1945 முதல் மில்லியன் கணக்கான ஐஸ் கிரீம் விரும்பிகளால் நம்பப்படுகிறது.',
        },
      ],
    },
    
    // Stories Content
    stories: {
      // Welcome/Reward Story (Story 1)
      welcome: {
        title: {
          en: 'BR\\nREWARDS',
          hi: 'बीआर\\nरिवॉर्ड्स',
          ta: 'பி.ஆர்\\nவெகுமதிகள்',
        },
        greeting: {
          en: 'Welcome, Priya! 👋',
          hi: 'स्वागत है, प्रिया! 👋',
          ta: 'வரவேற்கிறோம், பிரியா! 👋',
        },
        tier: {
          en: 'Gold Tier',
          hi: 'गोल्ड टियर',
          ta: 'கோல்ட் டயர்',
        },
        reward: {
          title: {
            en: '🎁 Reward Unlocked',
            hi: '🎁 रिवॉर्ड अनलॉक',
            ta: '🎁 வெகுமதி திறக்கப்பட்டது',
          },
          value: '1 Free',
          type: {
            en: 'Regular Scoop',
            hi: 'रेगुलर स्कूप',
            ta: 'ரெகுலர் ஸ்கூப்',
          },
          validity: {
            en: 'Valid for 30 days',
            hi: '30 दिनों के लिए वैध',
            ta: '30 நாட்களுக்கு செல்லுபடியாகும்',
          },
        },
        message: {
          en: 'You\'re GOLD. Enjoy exclusive sweet perks.',
          hi: 'आप GOLD हैं। विशेष मीठे लाभों का आनंद लें।',
          ta: 'நீங்கள் GOLD. பிரத்யேக இனிப்பு பலன்களை அனுபவியுங்கள்.',
        },
        cta: {
          en: 'Explore Rewards',
          hi: 'रिवॉर्ड्स देखें',
          ta: 'வெகுமதிகளை ஆராயுங்கள்',
        },
      },

      // Coupon Story (Story 2)
      coupon: {
        badge: {
          en: 'EXCLUSIVE OFFER',
          hi: 'विशेष ऑफर',
          ta: 'பிரத்யேக சலுகை',
        },
        heading: {
          en: 'Get',
          hi: 'पाएं',
          ta: 'பெறுங்கள்',
        },
        discount: {
          percentage: '20%',
          text: {
            en: 'OFF',
            hi: 'छूट',
            ta: 'தள்ளுபடி',
          },
        },
        description: {
          en: 'In-Store Orders',
          hi: 'स्टोर ऑर्डर',
          ta: 'கடை ஆர்டர்கள்',
        },
        code: {
          label: {
            en: 'Use Code',
            hi: 'कोड का उपयोग करें',
            ta: 'குறியீட்டைப் பயன்படுத்தவும்',
          },
          value: 'SWEET20',
        },
        terms: {
          minOrder: '₹500',
          items: [
            {
              en: 'Valid on orders above ₹500',
              hi: '₹500 से अधिक के ऑर्डर पर वैध',
              ta: '₹500க்கு மேல் ஆர்டர்களில் செல்லுபடியாகும்',
            },
            {
              en: 'Valid at all Baskin Robbins stores',
              hi: 'सभी बास्किन रॉबिन्स स्टोर पर मान्य',
              ta: 'அனைத்து பாஸ்கின் ராபிந்ஸ் கடைகளிலும் செல்லுபடியாகும்',
            },
            {
              en: 'Expires in 7 days',
              hi: '7 दिनों में समाप्त',
              ta: '7 நாட்களில் காலாவதியாகும்',
            },
          ],
        },
        cta: {
          en: 'Visit Store & Save 20%',
          hi: 'स्टोर पर जाएं और 20% बचाएं',
          ta: 'கடைக்குச் சென்று 20% சேமிக்கவும்',
        },
        footnote: {
          en: '🍨 Gold members get extra scoops',
          hi: '🍨 गोल्ड मेंबर्स को एक्स्ट्रा स्कूप मिलते हैं',
          ta: '🍨 கோல்ட் உறுப்பினர்களுக்கு கூடுதல் ஸ்கூப்ஸ்',
        },
      },

      // Promotional Story (Story 3)
      promo: {
        badge: {
          en: 'FLAVOR OF THE MONTH',
          hi: 'महीने का फ्लेवर',
          ta: 'மாத ஃப்ளேவர்',
        },
        collection: {
          name: {
            en: 'Chocolate\\nFudge Heaven',
            hi: 'चॉकलेट\\nफज हेवन',
            ta: 'சாக்லேட்\\nஃபட்ஜ் ஹெவன்',
          },
          tagline: {
            en: 'Indulge in rich, creamy chocolate delight',
            hi: 'समृद्ध, मलाईदार चॉकलेट आनंद का आनंद लें',
            ta: 'செழுமையான, கிரீமி சாக்லேட் மகிழ்ச்சியில் ஈடுபடுங்கள்',
          },
        },
        stats: {
          discount: {
            value: '31',
            label: {
              en: 'Flavors',
              hi: 'फ्लेवर',
              ta: 'ஃப்ளேவர்கள்',
            },
          },
          value: {
            amount: '₹299',
            label: {
              en: 'Family Pack',
              hi: 'फैमिली पैक',
              ta: 'குடும்ப பேக்',
            },
          },
          badge: {
            text: {
              en: 'New',
              hi: 'नया',
              ta: 'புதிய',
            },
            label: {
              en: 'Launch',
              hi: 'लॉन्च',
              ta: 'வெளியீடு',
            },
          },
        },
        cta: {
          en: 'Try This Month\'s Flavor',
          hi: 'इस महीने का फ्लेवर आज़माएं',
          ta: 'இந்த மாத ஃப்ளேவரை முயற்சிக்கவும்',
        },
        footer: {
          en: 'In stores and online • Available for limited time',
          hi: 'स्टोर और ऑनलाइन • सीमित समय के लिए उपलब्ध',
          ta: 'கடைகளில் மற்றும் ஆன்லைனில் • குறிப்பிட்ட காலத்திற்கு கிடைக்கும்',
        },
      },

      // Ice Cream Destinations Story (Story 5)
      fashionDestinations: {
        badge: {
          en: 'VISIT OUR STORES',
          hi: 'हमारे स्टोर पर जाएं',
          ta: 'எங்கள் கடைகளுக்கு வாருங்கள்',
        },
        title: {
          en: 'Scoop Shops Near You',
          hi: 'आपके पास स्कूप शॉप्स',
          ta: 'உங்களுக்கு அருகில் ஸ்கூப் கடைகள்',
        },
        subtitle: {
          en: 'Find your nearest Baskin Robbins store',
          hi: 'अपना निकटतम बास्किन रॉबिन्स स्टोर खोजें',
          ta: 'உங்கள் அருகிலுள்ள பாஸ்கின் ராபிந்ஸ் கடையைக் கண்டறியவும்',
        },
        footer: {
          heading: {
            en: '🍦 Taste 31 Amazing Flavors',
            hi: '🍦 31 अद्भुत फ्लेवर का स्वाद लें',
            ta: '🍦 31 அற்புதமான ஃப்ளேவர்களை சுவைக்கவும்',
          },
          text: {
            en: 'Discover new flavors at your nearest scoop shop',
            hi: 'अपनी निकटतम स्कूप शॉप पर नए फ्लेवर खोजें',
            ta: 'உங்கள் அருகிலுள்ள ஸ்கூப் கடையில் புதிய ஃப்ளேவர்களைக் கண்டறியவும்',
          },
        },
      },
    },
  },

  /**
   * PRODUCT CONFIGURATION
   * Sample products and terminology
   */
  products: {
    // Product size terminology (for ice cream)
    sizes: ['Small', 'Regular', 'Large', 'Family Pack', 'Party Pack'],
    
    // Receipt products (what user just ordered)
    receiptItems: [
      {
        id: 1,
        name: 'Thunder Hot Fudge',
        sku: 'BR/HF/101',
        image: thunderHotFudgeImg,
        price: 299.00,
        originalPrice: 399.00,
        mrp: 399.00,
        discount: 100,
        gst: 26.91,
        size: 'Regular',
        color: 'Chocolate',
        qty: 1,
        rating: 4.8,
        hsnCode: '21050010'
      },
      {
        id: 2,
        name: 'Hop Scotch Butterscotch Cone',
        sku: 'BR/SC/205',
        image: hopScotchButterscotchConeImg,
        price: 149.00,
        originalPrice: 199.00,
        mrp: 199.00,
        discount: 50,
        gst: 13.41,
        size: 'Regular',
        color: 'Mint Green',
        qty: 2,
        rating: 4.6,
        hsnCode: '21050010'
      }
    ],
    
    // Sample products for receipts (keeping for backward compatibility)
    samples: [
      {
        name: 'Chocolate Fudge Sundae',
        category: 'Sundaes',
        image: 'https://images.unsplash.com/photo-1646318754907-dc7c0d236a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHN1bmRhZSUyMGRlc3NlcnQlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzczODE2MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        name: 'Mint Chocolate Chip',
        category: 'Premium Scoops',
        image: 'https://images.unsplash.com/photo-1498190338361-82055e010b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGNvbmUlMjBjb2xvcmZ1bCUyMGZsYXZvcnN8ZW58MXx8fHwxNzczODE2MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
    
    // Recommendations
    recommendations: [
      {
        id: 101,
        name: 'Belgian Chocolate Scoop',
        image: chocolateTruffleCakeImg,
        price: 149.00,
        originalPrice: 199.00,
        discount: 50,
        badge: 'BESTSELLER'
      },
      {
        id: 102,
        name: 'Strawberry Sundae',
        image: 'https://images.unsplash.com/photo-1646318754907-dc7c0d236a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHN1bmRhZSUyMGRlc3NlcnQlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzczODE2MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        price: 249.00,
        originalPrice: 299.00,
        discount: 50,
        badge: 'NEW'
      },
      {
        id: 103,
        name: 'Cookie Dough Family Pack',
        image: 'https://images.unsplash.com/photo-1591325441738-bb3260efbc57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNraW4lMjByb2JiaW5zJTIwaWNlJTIwY3JlYW0lMjBjb2xvcmZ1bCUyMHNjb29wc3xlbnwxfHx8fDE3NzM4MTYwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        price: 549.00,
        originalPrice: 649.00,
        discount: 100,
        badge: 'POPULAR'
      },
      {
        id: 104,
        name: 'Mango Tango Scoop',
        image: 'https://images.unsplash.com/photo-1498190338361-82055e010b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGNvbmUlMjBjb2xvcmZ1bCUyMGZsYXZvcnN8ZW58MXx8fHwxNzczODE2MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        price: 129.00,
        originalPrice: 149.00,
        discount: 20,
        badge: 'LIMITED'
      },
    ],
  },

  /**
   * LOYALTY PROGRAM
   * Rewards and loyalty-specific terminology
   */
  loyalty: {
    programName: 'BR Rewards',
    currencyName: 'Scoop Points',
    tiers: ['Classic', 'Gold', 'Platinum'],
  },

  /**
   * FEATURE FLAGS
   * Enable/disable specific features
   */
  features: {
    stories: true,
    coupons: true,
    reviews: true,
    support: true,
    profile: true,
    nps: true,
    loyalty: false, // Loyalty tab disabled by default
  },

  /**
   * STORAGE KEYS
   * Local storage key prefixes (for data isolation)
   */
  storage: {
    prefix: 'br_', // Baskin Robbins prefix
    keys: {
      viewedPosts: 'viewed_posts',
      viewedStories: 'viewed_stories',
      npsSubmitted: 'nps_submitted',
      preservedData: 'preserved_data',
    },
  },
};

/**
 * HELPER FUNCTIONS
 * Utility functions for accessing brand config
 */

/**
 * Get brand name in specific language
 */
export function getBrandName(language: 'en' | 'hi' | 'ta' = 'en'): string {
  return brand.identity.nameInLanguages[language];
}

/**
 * Get brand tagline in specific language
 */
export function getBrandTagline(language: 'en' | 'hi' | 'ta' = 'en'): string {
  return brand.identity.taglineInLanguages[language];
}

/**
 * Get storage key with brand prefix
 */
export function getStorageKey(key: keyof typeof brand.storage.keys): string {
  return `${brand.storage.prefix}${brand.storage.keys[key]}`;
}

/**
 * Get color with opacity
 */
export function getColorWithOpacity(color: string, opacity: number): string {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}