import { brand } from '../config/brand';

export type Language = 'en' | 'hi' | 'ta';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export const translations = {
  en: {
    // Header
    brandName: brand.identity.nameInLanguages.en,
    follow: 'Follow',
    following: 'Following',
    description: brand.identity.taglineInLanguages.en,
    
    // Stats
    stores: brand.content.stats.stores.label.en,
    eReceipts: brand.content.stats.eReceipts.label.en,
    followers: brand.content.stats.followers.label.en,
    
    // Buttons
    shopOnline: brand.content.cta.shopOnline.text.en,
    
    // Posts
    posts: 'Posts',
    viewAll: 'View All',
    like: 'Like',
    comment: 'Comment',
    share: 'Share',
    writeComment: 'Write a comment...',
    you: 'You',
    shopNow: 'Order Now',
    commentsTitle: 'Comments',
    
    // Product
    productName: 'Caffè Latte',
    buyNow: 'Order Now',
    
    // Review Dialog
    leaveReview: 'Leave a Review',
    howWasExperience: 'How was your experience?',
    tapToRate: 'Tap to rate',
    writeReview: 'Write your review here...',
    uploadPhotos: 'Upload Photos/Videos',
    optional: 'optional',
    submit: 'Submit',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    view: 'View',
    thankYou: 'Thank you for your review!',
    
    // NPS Survey
    helpUsImprove: 'Your feedback matters',
    npsQuestion: 'Based on your visit {date} at {store}, how likely are you to recommend us to your friends and family?',
    npsQuestionToday: 'Based on your visit today at {store}, how likely are you to recommend us to your friends and family?',
    npsQuestionDefault: 'Based on your visit today at Baskin Robbins, how likely are you to recommend us to friends or family?',
    howLikely: 'How likely are you to recommend Baskin Robbins to a friend?',
    notLikely: 'Not at all likely',
    extremelyLikely: 'Extremely likely',
    
    // Tabs
    receipt: 'Receipt',
    coupons: 'Offers',
    loyalty: 'Loyalty',
    history: 'History',
    
    // Receipt Page
    invoiceNo: 'Receipt No.',
    totalItems: 'Total Items',
    dateTime: 'Date & Time',
    amountPaid: 'Amount Paid',
    itemDetails: 'Order Details',
    size: 'Size',
    qty: 'Qty',
    off: 'off',
    mrp: 'Reg.',
    discount: 'Savings',
    price: 'Price',
    gst: 'Tax',
    netAmount: 'Total',
    storeAddress: 'Inspiring and nurturing the human spirit — one person, one cup and one neighborhood at a time.',
    
    // Tax Summary
    taxSummary: 'Tax Summary',
    taxableValue: 'Taxable Value',
    cgst: 'CGST (6%)',
    sgst: 'SGST (6%)',
    totalTax: 'Total Tax',
    
    // Payment Summary
    paymentSummary: 'Payment Summary',
    subtotal: 'Subtotal',
    tax: 'Tax',
    total: 'Total',
    
    // Access Invoice
    accessInvoice: 'Access your Receipt',
    sendInvoiceEmail: 'Email receipt',
    enterEmail: 'Enter email',
    send: 'Send',
    invoiceSentSuccess: 'Receipt sent successfully!',
    download: 'Download',
    
    // Store Policies
    storePolicies: 'Our Promise',
    policy1: 'Premium quality ice cream made with the finest ingredients.',
    policy2: 'Fresh scoops every time with our flavor guarantee.',
    policy3: 'Strict cold chain maintained to ensure perfect temperature.',
    policy4: 'Highest hygiene and food safety standards at all times.',
    policy5: 'Over 31 flavors with endless customization options.',
    policy6: 'Customer satisfaction guaranteed or your money back.',
    termsConditions: 'Terms & Conditions',
    
    // Reviews Page
    myReviews: 'My Reviews',
    pending: 'Pending',
    submitted: 'Submitted',
    all: 'All',
    rateYourExperience: 'Rate Your Experience',
    rateProducts: 'Rate Items',
    noReviewsPending: 'No pending reviews',
    allCaughtUp: 'You\'re all caught up!',
    rateItem: 'Rate Item',
    youRated: 'You rated',
    tellUsMore: 'Tell us more',
    
    // Support Page
    supportTitle: 'How can we help you?',
    contactOptions: 'Contact Options',
    callUs: 'Call Us',
    emailUs: 'Email Us',
    chatWithUs: 'Chat With Us',
    myTickets: 'My Tickets',
    createTicket: 'Create New Ticket',
    viewAllTickets: 'View All Tickets',
    
    // Bottom Navigation
    navHome: 'Home',
    navPosts: 'Posts',
    navReceipts: 'Receipts',
    navReviews: 'Reviews',
    navStores: 'Stores',
    navSupport: 'Support',
    navProfile: 'Profile',
    
    // Stories
    viewingNow: 'viewing now',
    
    // Reset
    resetData: 'Reset Data',
    resetConfirm: 'Are you sure you want to reset all data?',
    resetWarning: 'This will clear all ratings, reviews, and uploaded media.',
    resetButton: 'Reset',
    
    // Profile Page
    myRating: 'My Rating',
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    mobile: 'Mobile',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    preferNotToSay: 'Prefer not to say',
    maritalStatus: 'Marital Status',
    single: 'Single',
    married: 'Married',
    anniversary: 'Anniversary',
    gstNumber: 'GST Number',
    preferences: 'Preferences',
    language: 'Language',
    notifications: 'Notifications',
    orderUpdates: 'Order Updates',
    orderUpdatesDesc: 'Get notified about your order status',
    newArrivals: 'New Menu Items',
    newArrivalsDesc: 'Be first to know about new drinks and food',
    promotions: 'Promotions & Offers',
    promotionsDesc: 'Receive exclusive deals and Star Rewards',
    reviews: 'Reviews & Feedback',
    reviewsDesc: 'Updates on your reviews and responses',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    
    // Posts Page
    drops: 'NEW ARRIVALS',
    noCommentsYet: 'No comments yet. Be the first to comment!',
    messageSent: 'Message sent',
    
    // Reviews Page - Additional
    reviewsPageTitle: 'Reviews',
    pendingFeedback: 'Pending Feedback',
    noSubmittedReviews: 'No submitted reviews yet',
    noReviewsAvailable: 'No reviews available',
    reviewSubmittedSuccess: 'Review submitted successfully!',
    feedbackSubmitted: 'Feedback submitted!',
    failedToSubmitReview: 'Failed to submit review',
    errorSubmittingReview: 'Error submitting review',
    
    // Support Page
    howCanWeHelp: 'How can we help you?',
    call: 'Call',
    emailSupport: 'Email',
    chat: 'Chat',
    tickets: 'Tickets',
    newTicket: 'New Ticket',
    viewTickets: 'View All Tickets',
    ticketStatus: 'Status',
    open: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    attachFile: 'Attach File',
    typeMessage: 'Type your message...',
    sendMessage: 'Send',
    ticketCreatedSuccess: 'Ticket created successfully',
    
    // Profile Page - Additional
    profileCompletion: 'Profile Completion',
    uploadPhoto: 'Upload Photo',
    changePhoto: 'Change Photo',
    selectCountry: 'Select Country',
    searchCountry: 'Search country...',
    invalidPhone: 'Invalid phone number',
    consentPreferences: 'Consent & Preferences',
    necessary: 'Necessary',
    necessaryDesc: 'Essential for website functionality and account security',
    transactional: 'Transactional',
    transactionalDesc: 'Important updates about your orders and account',
    marketing: 'Marketing & Promotional',
    marketingDesc: 'Special offers, new collections, and exclusive deals',
    alwaysActive: 'Always Active',
    savedSuccessfully: 'Saved successfully',
    profileUpdated: 'Profile updated successfully',
    consentDisclaimer: 'By providing your consent, you agree to receive communications from Baskin Robbins and carefully selected partners. You can withdraw your consent at any time. For more information, please see our',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    surveys: 'Surveys & Feedback',
    surveysDesc: 'Help us improve your experience by participating in surveys and providing feedback on our products and services.',
  },
  hi: {
    // Header
    brandName: brand.identity.nameInLanguages.hi,
    follow: 'फॉलो करें',
    following: 'फॉलो किया',
    description: brand.identity.taglineInLanguages.hi,
    
    // Stats
    stores: brand.content.stats.stores.label.hi,
    eReceipts: brand.content.stats.eReceipts.label.hi,
    followers: brand.content.stats.followers.label.hi,
    
    // Buttons
    shopOnline: brand.content.cta.shopOnline.text.hi,
    
    // Posts
    posts: 'पोस्ट्स',
    viewAll: 'सभी देखें',
    like: 'पसंद',
    comment: 'टिप्पणी',
    share: 'शेयर',
    writeComment: 'टिप्पणी लिखें...',
    you: 'आप',
    shopNow: 'अभी ऑर्डर करें',
    commentsTitle: 'टिप्पणियाँ',
    
    // Product
    productName: 'कैफे लाटे',
    buyNow: 'अभी ऑर्डर करें',
    
    // Review Dialog
    leaveReview: 'समीक्षा दें',
    howWasExperience: 'आपका अनुभव कैसा रहा?',
    tapToRate: 'रेटिंग देने के लिए टै करें',
    writeReview: 'अपनी समीक्षा यहाँ लिखें...',
    uploadPhotos: 'फोटो/वीडियो अपलोड करें',
    optional: 'वैकल्पिक',
    submit: 'जमा करें',
    submitting: 'जमा हो रहा है...',
    cancel: 'रद्द करें',
    view: 'देखें',
    thankYou: 'आपकी समीक्षा के लिए धन्यवाद!',
    
    // NPS Survey
    helpUsImprove: 'आपकी प्रतिक्रिया महत्वपूर्ण है',
    npsQuestion: '{store} में {date} को आपकी यात्रा के आधार पर, आप हमें अपने दोस्तों और परिवार को सुझाने की कितनी संभावना रखते हैं?',
    npsQuestionToday: '{store} में आज की आपकी यात्रा के आधार पर, आप हमें अपने दोस्तों और परिवार को सुझाने की कितनी संभावना रखते हैं?',
    npsQuestionDefault: 'Baskin Robbins में आज की आपकी यात्रा के आधार पर, आप हमें दोस्तों या परिवार को सुझाने की कितनी संभावना रखते हैं?',
    howLikely: 'आप एक दोस्त को Baskin Robbins की सिफारिश करने की कितनी संभावना रखते हैं?',
    notLikely: 'बिल्कुल संभावना नहीं',
    extremelyLikely: 'अत्यधिक संभावना',
    
    // Tabs
    receipt: 'रसीद',
    coupons: 'ऑफर्स',
    loyalty: 'लॉयल्टी',
    history: 'इतिहास',
    
    // Receipt Page
    invoiceNo: 'रसीद नं.',
    totalItems: 'कुल आइटम',
    dateTime: 'तारीख और समय',
    amountPaid: 'भुगतान की गई राशि',
    itemDetails: 'ऑर्डर विवरण',
    size: 'साइज़',
    qty: 'मात्रा',
    off: 'छूट',
    mrp: 'एम.आर.पी.',
    discount: 'बचत',
    price: 'कीमत',
    gst: 'जीएसटी',
    netAmount: 'कुल',
    storeAddress: 'मानवीय भावना को प्रेरित और पोषित करना — एक समय में एक व्यक्ति, एक कप और एक पड़ोस।',
    
    // Tax Summary
    taxSummary: 'कर सारांश',
    taxableValue: 'कर योग्य मूल्य',
    cgst: 'सीजीएसटी (6%)',
    sgst: 'एसजीएसटी (6%)',
    totalTax: 'कुल कर',
    
    // Payment Summary
    paymentSummary: 'भुगतान सारांश',
    subtotal: 'उप-योग',
    tax: 'कर',
    total: 'कुल',
    
    // Access Invoice
    accessInvoice: 'अपनी रसीद एक्सेस करें',
    sendInvoiceEmail: 'ईमेल रसीद',
    enterEmail: 'ईमेल दर्ज करें',
    send: 'भेजें',
    invoiceSentSuccess: 'रसीद सफलतापूर्वक भेजी गई!',
    download: 'डाउनलोड',
    
    // Store Policies
    storePolicies: 'Our Promise',
    policy1: 'Premium quality ice cream made with the finest ingredients.',
    policy2: 'Fresh scoops every time with our flavor guarantee.',
    policy3: 'Strict cold chain maintained to ensure perfect temperature.',
    policy4: 'Highest hygiene and food safety standards at all times.',
    policy5: 'Over 31 flavors with endless customization options.',
    policy6: 'Customer satisfaction guaranteed or your money back.',
    termsConditions: 'Terms & Conditions',
    
    // Reviews Page
    myReviews: 'मेरी समीक्षाएँ',
    pending: 'लंबित',
    submitted: 'जमा किया',
    all: 'सभी',
    rateYourExperience: 'अपने अनुभव को रेट करें',
    rateProducts: 'आइटम रेट करें',
    noReviewsPending: 'कोई लंबित समीक्षा नहीं',
    allCaughtUp: 'आप पूरी तरह से अपडेट हैं!',
    rateItem: 'आइटम रेट करें',
    youRated: 'आपने रेटिंग दी',
    tellUsMore: 'हमें और बताएं',
    
    // Support Page
    supportTitle: 'हम आपकी कैसे मदद कर सकते हैं?',
    contactOptions: 'संपर्क विकल्प',
    callUs: 'हमें कॉल करें',
    emailUs: 'हमें ईमेल करें',
    chatWithUs: 'हमारे साथ चैट करें',
    myTickets: 'मेरे टिकट',
    createTicket: 'नया टिकट बनाएं',
    viewAllTickets: 'सभी टिकट देखें',
    
    // Bottom Navigation
    navHome: 'होम',
    navPosts: 'पोस्ट्स',
    navReceipts: 'रसीदें',
    navReviews: 'समीक्षाएँ',
    navStores: 'स्टोर्स',
    navSupport: 'सहायता',
    navProfile: 'प्रोफाइल',
    
    // Stories
    viewingNow: 'अभी देख रहे हैं',
    
    // Reset
    resetData: 'डेटा रीसेट करें',
    resetConfirm: 'क्या आप सुनिश्चित हैं कि आप सभी डेटा रीसेट करना चाहते हैं?',
    resetWarning: 'यह सभी रेटिंग, समीक्षाओं और अपलोड किए गए मीडिया को साफ कर देगा।',
    resetButton: 'रीसेट करें',
    
    // Profile Page
    myRating: 'मेरी रेटिंग',
    personalInfo: 'व्यक्तिगत जानकारी',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    email: 'ईमेल',
    mobile: 'मोबाइल',
    dateOfBirth: 'जन्म तिथि',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    preferNotToSay: 'नहीं बताना चाहते',
    maritalStatus: 'वैवाहिक स्थिति',
    single: 'अविवाहित',
    married: 'विवाहित',
    anniversary: 'वर्षगांठ',
    gstNumber: 'जीएसटी नंबर',
    preferences: 'प्राथमिकताएं',
    language: 'भाषा',
    notifications: 'सूचनाएं',
    orderUpdates: 'ऑर्डर अपडेट',
    orderUpdatesDesc: 'अपने ऑर्डर की स्थिति के बारे में सूचित रहें',
    newArrivals: 'नए मेनू आइटम',
    newArrivalsDesc: 'नए पेय और भोजन के बारे में पहले जानें',
    promotions: 'प्रचार और ऑफ़र',
    promotionsDesc: 'विशेष सौदे और स्टार रिवार्ड्स प्राप्त करें',
    reviews: 'समीक्षाएँ और फीडबैक',
    reviewsDesc: 'अपनी समीक्षाओं और प्रतिक्रियाओं पर अपडेट',
    saveChanges: 'परिवर्तन सहेजें',
    saving: 'सहेजा जा रहा है...',
    
    // Posts Page
    drops: 'नए आगमन',
    noCommentsYet: 'अभी तक कोई टिप्पणी नहीं। पहले टिप्पणी करें!',
    messageSent: 'संदेश भेजा गया',
    
    // Reviews Page - Additional
    reviewsPageTitle: 'समीक्षाएँ',
    pendingFeedback: 'लंबित फीडबैक',
    noSubmittedReviews: 'अभी तक कोई समीक्षा जम नहीं की गई',
    noReviewsAvailable: 'कोई समीक्षा उपलब्ध नहीं',
    reviewSubmittedSuccess: 'समीक्षा सफलतापूर्वक जमा की गई!',
    feedbackSubmitted: 'फीडबैक जमा किया गया!',
    failedToSubmitReview: 'समीक्षा जमा करने में विफल',
    errorSubmittingReview: 'समीक्षा जमा करने में त्रुटि',
    
    // Support Page
    howCanWeHelp: 'हम आपकी कैसे मदद कर सकते हैं?',
    call: 'कॉल करें',
    emailSupport: 'ईमेल',
    chat: 'चैट',
    tickets: 'टिकट',
    newTicket: 'नया टिकट',
    viewTickets: 'सभी टिकट देखें',
    ticketStatus: 'स्थिति',
    open: 'खुला',
    inProgress: 'प्रगति में',
    resolved: 'हल हो गया',
    closed: 'बंद',
    attachFile: 'फाइल संलग्न करें',
    typeMessage: 'अपना संदेश टाइप करें...',
    sendMessage: 'भेजें',
    ticketCreatedSuccess: 'टिकट सफलतापूर्वक बनाया गया',
    
    // Profile Page - Additional
    profileCompletion: 'प्रोफाइल पूर्णता',
    uploadPhoto: 'फोटो अपलोड करें',
    changePhoto: 'फोटो बदलें',
    selectCountry: 'देश चुनें',
    searchCountry: 'देश खोजें...',
    invalidPhone: 'अमान्य फोन नंबर',
    consentPreferences: 'सहमति और प्राथमिकताएं',
    necessary: 'आवश्यक',
    necessaryDesc: 'वेबसाइट की कार्यक्षमता और खाता सुरक्षा के लिए आवश्यक',
    transactional: 'लेन-देन संबंधी',
    transactionalDesc: 'आपके ऑर्डर और खाते के बारे में महत्वपूर्ण अपडेट',
    marketing: 'विपणन और प्रचार',
    marketingDesc: 'विशेष ऑफ़र, नए संग्रह और विशेष सौदे',
    alwaysActive: 'हमेशा सक्रिय',
    savedSuccessfully: 'सफलतापूर्वक सहेजा गया',
    profileUpdated: 'प्रोफाइल सफलतापूर्वक अपडेट की गई',
    consentDisclaimer: 'अपनी सहमति प्रदान करके, आप Baskin Robbins और सावधानीपूर्वक चयनित भागीदारों से संचार प्राप्त करने के लिए सहमत होते हैं। आप किसी भी समय अपनी सहमति वापस ले सकते हैं। अधिक जानकारी के लिए, कृपया देखें',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    surveys: 'सर्वेक्षण और फीडबैक',
    surveysDesc: 'सर्वेक्षणों में भाग लेकर और हमारे उत्पादों और सेवाओं पर फीडबैक प्रदान करके अपने अनुभव को बेहतर बनाने में हमारी मदद करें।',
  },
  ta: {
    // Header
    brandName: brand.identity.nameInLanguages.ta,
    follow: 'பின்தொடர்',
    following: 'பின்தொடர்கிறேன்',
    description: brand.identity.taglineInLanguages.ta,
    
    // Stats
    stores: brand.content.stats.stores.label.ta,
    eReceipts: brand.content.stats.eReceipts.label.ta,
    followers: brand.content.stats.followers.label.ta,
    
    // Buttons
    shopOnline: brand.content.cta.shopOnline.text.ta,
    
    // Posts
    posts: 'இடுகைகள்',
    viewAll: 'அனைத்தையும் பார்க்க',
    like: 'விருப்பம்',
    comment: 'கருத்து',
    share: 'பகிர்',
    writeComment: 'கருத்து எழுதுக...',
    you: 'நீங்கள்',
    shopNow: 'இப்போது ஆர்டர் செய்க',
    commentsTitle: 'கருத்துகள்',
    
    // Product
    productName: 'காஃபே லட்டே',
    buyNow: 'இப்போது ஆர்டர் செய்க',
    
    // Review Dialog
    leaveReview: 'மதிப்பாய்வு விடுக',
    howWasExperience: 'உங்கள் அனுபவம் எப்படி இருந்தது?',
    tapToRate: 'மதிப்பிட தட்டவும்',
    writeReview: 'உங்கள் மதிப்பாய்வை இங்கே எழுதுக...',
    uploadPhotos: 'புகைப்படங்கள்/வீடியோக்களை பதிவேற்றவும்',
    optional: 'விருப்பமானது',
    submit: 'சமர்ப்பிக்கவும்',
    submitting: 'சமர்ப்பிக்கிறது...',
    cancel: 'ரத்து செய்',
    view: 'பார்க்க',
    thankYou: 'உங்கள் மதிப்பாய்வுக்கு நன்றி!',
    
    // NPS Survey
    helpUsImprove: 'உங்கள் கருத்து முக்கியம்',
    npsQuestion: '{store} இல் {date} அன்று நீங்கள் செய்த வருகையின் அடிப்படையில், உங்கள் நண்பர்கள் மற்றும் குடும்பத்தினருக்கு எங்களை பரிந்துரைக்கும் வாய்ப்பு எவ்வளவு?',
    npsQuestionToday: '{store} இல் இன்று நீங்கள் செய்த வருகையின் அடிப்படையில், உங்கள் நண்பர்கள் மற்றும் குடும்பத்தினருக்கு எங்களை பரிந்துரைக்கும் வாய்ப்பு எவ்வளவு?',
    npsQuestionDefault: 'Baskin Robbins இல் இன்று நீங்கள் செய்த வருகையின் அடிப்படையில், நண்பர்கள் அல்லது குடும்பத்தினருக்கு எங்களை பரிந்துரைக்கும் வாய்ப்பு எவ்வளவு?',
    howLikely: 'ஒரு நண்பருக்கு Baskin Robbins ஐ பரிந்துரைக்கும வாய்ப்பு எவ்வளவு?',
    notLikely: 'முற்றிலும் சாத்தியமில்லை',
    extremelyLikely: 'மிகவும் சாத்தியம்',
    
    // Tabs
    receipt: 'ரசீது',
    coupons: 'சலுகைகள்',
    loyalty: 'லாயல்டி',
    history: 'வரலாறு',
    
    // Receipt Page
    invoiceNo: 'ரசீது எண்.',
    totalItems: 'மொத்த பொருட்கள்',
    dateTime: 'தேதி & நேரம்',
    amountPaid: 'செலுத்திய தொகை',
    itemDetails: 'ஆர்டர் விவரங்கள்',
    size: 'அளவு',
    qty: 'எண்ணிக்கை',
    off: 'தள்ளுபடி',
    mrp: 'எம்.ஆர்.பி.',
    discount: 'சேமிப்பு',
    price: 'விலை',
    gst: 'ஜி.எஸ்.டி.',
    netAmount: 'மொத்தம்',
    storeAddress: 'மனித ஆவியை ஊக்குவித்தல் மற்றும் பராமரித்தல் - ஒரு நேரத்தில் ஒரு நபர், ஒரு கப் மற்றும் ஒரு சுற்றுப்புறம்.',
    
    // Tax Summary
    taxSummary: 'வரி சுருக்கம்',
    taxableValue: 'வரி விதிக்கத்தக்க மதிப்பு',
    cgst: 'சி.ஜி.எஸ்.டி. (6%)',
    sgst: 'எஸ்.ஜி.எஸ்.டி. (6%)',
    totalTax: 'மொத்த வரி',
    
    // Payment Summary
    paymentSummary: 'பணம் செலுத்துதல் சுருக்கம்',
    subtotal: 'உப-மொத்தம்',
    tax: 'வரி',
    total: 'மொத்தம்',
    
    // Access Invoice
    accessInvoice: 'உங்கள் ரசீதை அணுகவும்',
    sendInvoiceEmail: 'ரசீதை மின்னஞ்சல் செய்க',
    enterEmail: 'மின்னஞ்சலை உள்ளிடவும்',
    send: 'அனுப்பு',
    invoiceSentSuccess: 'ரசீது வெற்றிகரமாக அனுப்பப்பட்டது!',
    download: 'பதிவிறக்கு',
    
    // Store Policies
    storePolicies: 'Our Promise',
    policy1: 'Premium quality ice cream made with the finest ingredients.',
    policy2: 'Fresh scoops every time with our flavor guarantee.',
    policy3: 'Strict cold chain maintained to ensure perfect temperature.',
    policy4: 'Highest hygiene and food safety standards at all times.',
    policy5: 'Over 31 flavors with endless customization options.',
    policy6: 'Customer satisfaction guaranteed or your money back.',
    termsConditions: 'Terms & Conditions',
    
    // Reviews Page
    myReviews: 'என் மதிப்பாய்வுகள்',
    pending: 'நிலுவையில்',
    submitted: 'சமர்ப்பிக்கப்பட்டது',
    all: 'அனைத்தும்',
    rateYourExperience: 'உங்கள் அனுபவத்தை மதிப்பிடுங்கள்',
    rateProducts: 'பொருட்களை மதிப்பிடுங்கள்',
    noReviewsPending: 'நிலுவையில் உள்ள மதிப்பாய்வுகள் இல்லை',
    allCaughtUp: 'நீங்கள் முழுமையாக புதுப்பிக்கப்பட்டுள்ளீர்கள்!',
    rateItem: 'பொருளை மதிப்பிடு',
    youRated: 'நீங்கள் மதிப்பிட்டீர்கள்',
    tellUsMore: 'மேலும் சொல்லுங்கள்',
    
    // Support Page
    supportTitle: 'நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?',
    contactOptions: 'தொடர்பு விருப்பங்கள்',
    callUs: 'எங்களை அழைுங்கள்',
    emailUs: 'எங்களுக்கு மின்னஞ்சல் செய்யுங்கள்',
    chatWithUs: 'எங்களுடன் அரட்டையடியுங்கள்',
    myTickets: 'என் டிக்கெட்டுகள்',
    createTicket: 'புதிய டிக்கெட் உருவாக்கு',
    viewAllTickets: 'அனைத்து டிக்கெட்டுகளையும் பார்க்க',
    
    // Bottom Navigation
    navHome: 'முகப்பு',
    navPosts: 'இடுகைகள்',
    navReceipts: 'ரசீதுகள்',
    navReviews: 'மதிப்பாய்வுகள்',
    navStores: 'கடைகள்',
    navSupport: 'ஆதரவு',
    navProfile: 'சுயவிவரம்',
    
    // Stories
    viewingNow: 'இப்போது பார்க்கிறார்கள்',
    
    // Reset
    resetData: 'தரவை மீட்டமை',
    resetConfirm: 'அனைத்து தரவையும் மீட்டமைக்க நீங்கள் உறுதியாக உள்ளீர்களா?',
    resetWarning: 'இது அனைத்து மதிப்பீடுகள், மதிப்பாய்வுகள் மற்றும் பதிவேற்றப்பட்ட ஊடகங்களை அழிக்கும்.',
    resetButton: 'மீட்டமை',
    
    // Profile Page
    myRating: 'என் மதிப்பீடு',
    personalInfo: 'தனிப்பட்ட தகவல்',
    firstName: 'முதல் பெயர்',
    lastName: 'கடைசி பெயர்',
    email: 'மின்னஞ்சல்',
    mobile: 'மொபைல்',
    dateOfBirth: 'பிறந்த தேதி',
    gender: 'பாலினம்',
    male: 'ஆண்',
    female: 'பெண்',
    other: 'மற்றவை',
    preferNotToSay: 'சொல்ல விரும்பவில்லை',
    maritalStatus: 'திருமண நிலை',
    single: 'திருமணமாகாதவர்',
    married: 'திருமணமானவர்',
    anniversary: 'ஆண்டு நிறைவு',
    gstNumber: 'ஜி.எஸ்.டி. எண்',
    preferences: 'விருப்பத்தேர்வுகள்',
    language: 'மொழி',
    notifications: 'அறிவிப்புகள்',
    orderUpdates: 'ஆர்டர் புதுப்பிப்புகள்',
    orderUpdatesDesc: 'உங்கள் ஆர்டர் நிலை பற்றி அறிவிப்பைப் பெறுங்கள்',
    newArrivals: 'புதிய மெனு பொருட்கள்',
    newArrivalsDesc: 'புதிய பானங்கள் மற்றும் உணவுகளைப் பற்றி முதலில் அறியுங்கள்',
    promotions: 'விளம்பரங்கள் & சலுகைகள்',
    promotionsDesc: 'பிரத்யேக ஒப்பந்தங்கள் மற்றும் ஸ்டார் ரிவார்ட்ஸ் பெறுங்கள்',
    reviews: 'மதிப்பாய்வுகள் & கருத்து',
    reviewsDesc: 'உங்கள் மதிப்பாய்வுகள் மற்றும் பதில்களில் புதுப்பிப்புகள்',
    saveChanges: 'மாற்றங்களை சேமிக்கவும்',
    saving: 'சேமிக்கிறது...',
    
    // Posts Page
    drops: 'புதிய வருகைகள்',
    noCommentsYet: 'இன்னும் கருத்துகள் இல்லை. முதலில் கருத்துரையிடுங்கள்!',
    messageSent: 'செய்தி அனுப்பப்பட்டது',
    
    // Reviews Page - Additional
    reviewsPageTitle: 'மதிப்பாய்வுகள்',
    pendingFeedback: 'நிலுவையில் உள்ள கருத்து',
    noSubmittedReviews: 'இன்னும் மதிப்பாய்வுகள் சமர்ப்பிக்கப்படவில்லை',
    noReviewsAvailable: 'மதிப்பாய்வுகள் இல்லை',
    reviewSubmittedSuccess: 'மதிப்பாய்வு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
    feedbackSubmitted: 'கருத்து சமர்ப்பிக்கப்பட்டது!',
    failedToSubmitReview: 'மதிப்பாய்வை சமர்ப்பிக்க முடியவில்லை',
    errorSubmittingReview: 'மதிப்பாய்வை சமர்ப்பிப்பதில் பிழை',
    
    // Support Page
    howCanWeHelp: 'நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?',
    call: 'அழை',
    emailSupport: 'மின்னஞ்சல்',
    chat: 'அரட்டை',
    tickets: 'டிக்கெட்டுகள்',
    newTicket: 'புதிய டிக்கெட்',
    viewTickets: 'அனைத்து டிக்கெட்டுகளையும் பார்க்க',
    ticketStatus: 'நிலை',
    open: 'திறந்த',
    inProgress: 'முன்னேற்றத்தில்',
    resolved: 'தீர்க்கப்பட்டது',
    closed: 'மூடப்பட்டது',
    attachFile: 'கோப்பை இணைக்கவும்',
    typeMessage: 'உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...',
    sendMessage: 'அனுப்பு',
    ticketCreatedSuccess: 'டிக்கெட் வெற்றிகரமாக உருவாக்கப்பட்டது',
    
    // Profile Page - Additional
    profileCompletion: 'சுயவிவர முடிவு',
    uploadPhoto: 'புகைப்படத்தை பதிவேற்றவும்',
    changePhoto: 'புகைப்படத்தை மாற்றவும்',
    selectCountry: 'நாட்டைத் தேர்ந்தெடுக்கவும்',
    searchCountry: 'நாட்டைத் தேடுங்கள்...',
    invalidPhone: 'தவறான தொலைபேசி எண்',
    consentPreferences: 'ஒப்புதல் & விருப்பத்தேர்வுகள்',
    necessary: 'அவசியம்',
    necessaryDesc: 'வலைத்தள செயல்பாடு மற்றும் கணக்கு பாதுகாப்பிற்கு அவசியம்',
    transactional: 'பரிவர்த்தனை',
    transactionalDesc: 'உங்கள் ஆர்டர்கள் மற்றும் கணக்கு பற்றிய முக்கியமான புதுப்பிப்புகள்',
    marketing: 'சந்தைப்படுத்தல் & விளம்பரம்',
    marketingDesc: 'சிறப்பு சலுகைகள், புதிய தொகுப்புகள் மற்றும் பிரத்யேக ஒப்பந்தங்கள்',
    alwaysActive: 'எப்போதும் செயலில்',
    savedSuccessfully: 'வெற்றிகரமாக சேமிக்கப்பட்டது',
    profileUpdated: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    consentDisclaimer: 'உங்கள் ஒப்புதலை வழங்குவதன் மூலம், Baskin Robbins மற்றும் கவனமாக தேர்ந்தெடுக்கப்பட்ட கூட்டாளர்களிடமிருந்து தொடர்புகளைப் பெற நீங்கள் ஒப்புக்கொள்கிறீர்கள். நீங்கள் எந்த நேரத்திலும் உங்கள் ஒப்புதலை திரும்பப் பெறலாம். மேலும் தகவலுக்கு, தயவுசெய்து பார்க்கவும்',
    privacyPolicy: 'தனியுரிமை கொள்கை',
    termsOfService: 'சேவை விதிமுறைகள்',
    surveys: 'கணக்கெடுப்புகள் & கருத்து',
    surveysDesc: 'கணக்கெடுப்புகளில் பங்கேற்பதன் மூலமும் எங்கள் தயாரிப்புகள் மற்றும் சேவைகள் பற்றிய கருத்துகளை வழங்குவதன் மூலமும் உங்கள் அனுபவத்தை மேம்படுத்த எங்களுக்கு உதவுங்கள்.',
  },
};