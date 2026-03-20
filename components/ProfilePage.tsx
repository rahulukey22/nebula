import { useState, useEffect } from 'react';
import { ChevronDown, ArrowLeft, Calendar, Check, Bell, ShoppingBag, Megaphone, MessageSquare, Camera, Upload, Star, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { cn } from './ui/utils';
import { countryCodes, validatePhoneNumber, formatPhoneNumber, type CountryPhoneCode } from '../utils/countryPhoneCodes';
import { compressImage } from '../utils/imageOptimization';
import { MediaCaptureDialog } from './MediaCaptureDialog';
import { useMediaUpload } from '../utils/useMediaUpload';
import { brand, getColorWithOpacity } from '../config/brand';
import { useLanguage } from '../utils/LanguageContext';
import { languages, type Language } from '../utils/translations';

type ConsentCategory = 'necessary' | 'transactional' | 'marketing' | 'surveys';

interface ConsentSubItem {
  id: string;
  label: string;
  enabled: boolean;
}

interface CategoryData {
  enabled: boolean;
  subItems: ConsentSubItem[];
}

interface ProfilePageProps {
  profilePhotoUrl?: string | null;
  userRating?: number;
  onPhotoUpload?: (url: string) => void;
  onBack?: () => void;
}

export function ProfilePage({ profilePhotoUrl, userRating = 0, onPhotoUpload, onBack }: ProfilePageProps) {
  const { t, language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: 'Riya',
    lastName: 'Sharma',
    mobile: '9876543210',
    countryCode: 'IN', // Default to India
    email: 'riya.sharma@example.com',
    dob: '1995-08-15',
    gender: 'female',
    maritalStatus: 'single',
    anniversaryDate: '',
  });

  const [consentCategories, setConsentCategories] = useState<Record<ConsentCategory, CategoryData>>({
    necessary: {
      enabled: true,
      subItems: [
        { id: 'essential', label: 'Essential website functionality', enabled: true },
        { id: 'security', label: 'Security & fraud prevention', enabled: true },
        { id: 'auth', label: 'Account authentication', enabled: true },
        { id: 'privacy', label: 'Privacy preferences storage', enabled: true }
      ]
    },
    transactional: {
      enabled: true,
      subItems: [
        { id: 'order_confirm', label: 'Order confirmations', enabled: true },
        { id: 'shipping', label: 'Shipping & delivery updates', enabled: true },
        { id: 'payment', label: 'Payment receipts', enabled: true },
        { id: 'returns', label: 'Return/exchange notifications', enabled: true },
        { id: 'security_alerts', label: 'Account security alerts', enabled: true },
        { id: 'recalls', label: 'Warranty & product recalls', enabled: true },
        { id: 'invoices', label: 'Invoice & GST documents', enabled: true }
      ]
    },
    marketing: {
      enabled: false,
      subItems: [
        { id: 'email_news', label: 'Email newsletters', enabled: false },
        { id: 'sms_promo', label: 'SMS promotions', enabled: false },
        { id: 'whatsapp', label: 'WhatsApp offers', enabled: false },
        { id: 'push_notif', label: 'Push notifications', enabled: false },
        { id: 'recommendations', label: 'Personalized recommendations', enabled: false },
        { id: 'sales', label: 'Special sales & discounts', enabled: false },
        { id: 'collections', label: 'New flavor announcements', enabled: false },
        { id: 'events', label: 'Event & store opening invites', enabled: false },
        { id: 'birthday', label: 'Birthday & anniversary rewards', enabled: false }
      ]
    },
    surveys: {
      enabled: false,
      subItems: [
        { id: 'product_surveys', label: 'Product feedback surveys', enabled: false },
        { id: 'service_surveys', label: 'Service improvement surveys', enabled: false },
        { id: 'shopping_experience', label: 'Ice cream experience surveys', enabled: false },
        { id: 'customer_reviews', label: 'Review requests', enabled: false },
        { id: 'market_research', label: 'Market research participation', enabled: false }
      ]
    }
  });

  const [expandedCategory, setExpandedCategory] = useState<ConsentCategory | null>(null);
  const [savedFields, setSavedFields] = useState<Record<string, boolean>>({});
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMediaDialog, setShowMediaDialog] = useState(false);

  const userId = 'default_user';
  const { uploadMedia } = useMediaUpload();

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    const requiredFields = ['firstName', 'lastName', 'mobile', 'email', 'dob'];
    const optionalFields = ['maritalStatus'];
    const conditionalFields = formData.maritalStatus === 'married' ? ['anniversaryDate'] : [];
    
    const allRequiredFields = [...requiredFields, ...conditionalFields];
    const filledRequired = allRequiredFields.filter(field => formData[field as keyof typeof formData]).length;
    const filledOptional = optionalFields.filter(field => formData[field as keyof typeof formData] && formData[field as keyof typeof formData] !== 'single').length;
    
    // Photo adds to completion
    const photoComplete = profilePhotoUrl ? 1 : 0;
    
    const totalFields = allRequiredFields.length + 1; // +1 for photo
    const totalFilled = filledRequired + photoComplete;
    
    return Math.round((totalFilled / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Load profile data on mount
  useEffect(() => {
    loadProfileData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showCountryDropdown && !target.closest('.country-dropdown-container')) {
        setShowCountryDropdown(false);
        setSearchQuery('');
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCountryDropdown]);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Use existing default state for profile info (already in useState)
      console.log('Profile info loaded (mock)');

      // Use default consent categories (already in useState)
      console.log('Consent preferences loaded (mock)');
      
    } catch (error) {
      console.error('Error in profile data loading sequence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfileInfo = async () => {
    try {
      console.log('Profile info saved to backend (mock)', formData);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error saving profile info:', error);
    }
  };

  const saveConsentPreferences = async () => {
    try {
      console.log('Consent preferences saved to backend (mock)', consentCategories);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error saving consent preferences:', error);
    }
  };

  const showSavedIndicator = (fieldName: string) => {
    setSavedFields(prev => ({ ...prev, [fieldName]: true }));
    setTimeout(() => {
      setSavedFields(prev => ({ ...prev, [fieldName]: false }));
    }, 3000);
  };

  const handleFieldBlur = async (fieldName: string) => {
    if (formData[fieldName as keyof typeof formData]) {
      showSavedIndicator(fieldName);
      await saveProfileInfo();
    }
  };

  const handlePhoneChange = (value: string) => {
    // Only allow digits
    const formatted = formatPhoneNumber(value);
    setFormData({ ...formData, mobile: formatted });
    
    // Clear error when typing
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handlePhoneBlur = async () => {
    if (formData.mobile) {
      const validation = validatePhoneNumber(formData.mobile, formData.countryCode);
      
      if (!validation.isValid) {
        setPhoneError(validation.error || 'Invalid phone number');
      } else {
        setPhoneError('');
        showSavedIndicator('mobile');
        await saveProfileInfo();
      }
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    setFormData({ ...formData, countryCode });
    setShowCountryDropdown(false);
    setSearchQuery('');
    
    // Revalidate phone number with new country code
    if (formData.mobile) {
      const validation = validatePhoneNumber(formData.mobile, countryCode);
      if (!validation.isValid) {
        setPhoneError(validation.error || 'Invalid phone number');
      } else {
        setPhoneError('');
      }
    }
  };

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0];

  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMediaCaptured = async (file: File, type: 'photo' | 'video' | 'audio') => {
    if (type !== 'photo') {
      alert('Only photos are allowed for profile pictures');
      return;
    }

    setIsUploadingPhoto(true);
    try {
      // Upload with compression (already done by MediaCaptureDialog)
      const result = await uploadMedia(file, userId, 'profile-photo');
      
      if (result) {
        setProfilePhotoUrl(result.url);
        if (onPhotoUpload) {
          onPhotoUpload(result.url);
        }
        console.log('Profile photo uploaded successfully');
      } else {
        alert('Failed to upload photo. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const toggleCategory = async (category: ConsentCategory) => {
    if (category === 'necessary') return; // Can't disable necessary
    
    setConsentCategories(prev => {
      const newEnabled = !prev[category].enabled;
      const updated = {
        ...prev,
        [category]: {
          ...prev[category],
          enabled: newEnabled,
          // Toggle all sub-items when master toggle changes
          subItems: prev[category].subItems.map(item => ({
            ...item,
            enabled: newEnabled
          }))
        }
      };
      // Save after state update and show saved indicator
      setTimeout(() => {
        saveConsentPreferences();
        showSavedIndicator(`consent_${category}`);
      }, 0);
      return updated;
    });
  };

  const toggleCategoryExpansion = (category: ConsentCategory) => {
    console.log('toggleCategoryExpansion called:', category);
    console.log('Current expandedCategory:', expandedCategory);
    const newValue = expandedCategory === category ? null : category;
    console.log('Setting expandedCategory to:', newValue);
    setExpandedCategory(newValue);
  };

  const toggleSubItem = async (category: ConsentCategory, subItemId: string) => {
    if (category === 'necessary') return; // Can't change necessary preferences
    
    setConsentCategories(prev => {
      const updatedSubItems = prev[category].subItems.map(item =>
        item.id === subItemId ? { ...item, enabled: !item.enabled } : item
      );
      
      // Check if all sub-items are enabled/disabled to update master toggle
      const allEnabled = updatedSubItems.every(item => item.enabled);
      const anyEnabled = updatedSubItems.some(item => item.enabled);
      
      const updated = {
        ...prev,
        [category]: {
          enabled: anyEnabled, // Master is on if any sub-item is on
          subItems: updatedSubItems
        }
      };
      
      // Save after state update and show saved indicator
      setTimeout(() => {
        saveConsentPreferences();
        showSavedIndicator(`consent_${category}_${subItemId}`);
      }, 0);
      return updated;
    });
  };

  const consentInfo = {
    necessary: {
      title: t('necessary'),
      icon: Bell,
      description: t('necessaryDesc'),
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100'
    },
    transactional: {
      title: t('transactional'),
      icon: ShoppingBag,
      description: t('transactionalDesc'),
      color: 'bg-purple-50 text-purple-600',
      iconBg: 'bg-purple-100'
    },
    marketing: {
      title: t('marketing'),
      icon: Megaphone,
      description: t('marketingDesc'),
      color: 'bg-pink-50 text-pink-600',
      iconBg: 'bg-pink-100'
    },
    surveys: {
      title: t('surveys'),
      icon: MessageSquare,
      description: t('surveysDesc'),
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100'
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-24 max-w-[430px] w-full mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 -ml-1 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-[#101828]" />
          </button>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">{t('navProfile')}</h1>
        </div>
        
        {/* Profile Completion Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">{t('profileCompletion')}</span>
            <span 
              style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: profileCompletion === 100 ? brand.colors.primary : 
                       profileCompletion >= 67 ? brand.colors.primary : 
                       profileCompletion >= 34 ? brand.colors.secondary : brand.colors.secondary
              }}
              className="transition-colors duration-500"
            >
              {profileCompletion}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${profileCompletion}%`,
                background: profileCompletion === 100 ? `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` : 
                            profileCompletion >= 67 ? `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})` : 
                            profileCompletion >= 34 ? `linear-gradient(to right, ${brand.colors.secondary}, ${brand.colors.primary})` : 
                            `linear-gradient(to right, ${brand.colors.secondary}, ${brand.colors.primary})`
              }}
            />
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-[15px] py-4 space-y-4">
        {/* Profile Photo & Rating Card */}
        <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-4">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {profilePhotoUrl ? (
                  <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              {/* Upload/Camera Button */}
              <button
                onClick={() => setShowMediaDialog(true)}
                disabled={isUploadingPhoto}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: brand.colors.primary }}
              >
                {isUploadingPhoto ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            {/* User Info & Rating */}
            <div className="flex-1">
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-1">
                {formData.firstName} {formData.lastName}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085] mb-2">{formData.mobile}</p>
              
              {/* Rating Display */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full inline-flex" style={{ backgroundColor: getColorWithOpacity(brand.colors.primary, 0.1) }}>
                <Star className="w-4 h-4 fill-current" style={{ color: brand.colors.primary }} />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', color: brand.colors.primary }}>
                  {userRating > 0 ? userRating.toFixed(1) : '0.0'}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: brand.colors.primaryDark }}>My Rating</span>
              </div>
            </div>
          </div>
          
          {/* Baskin Robbins Rewards Card */}
          <div className="mt-4 relative overflow-hidden rounded-2xl backdrop-blur-sm shadow-lg" style={{ background: `linear-gradient(135deg, ${getColorWithOpacity(brand.colors.primary, 0.08)}, white, ${getColorWithOpacity(brand.colors.secondary, 0.1)})`, border: `1px solid ${getColorWithOpacity(brand.colors.primary, 0.2)}` }}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16" style={{ backgroundColor: getColorWithOpacity(brand.colors.primary, 0.08) }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12" style={{ backgroundColor: getColorWithOpacity(brand.colors.secondary, 0.08) }}></div>
            
            <div className="relative p-5">
              {/* Header */}
              <div className="text-center mb-4">
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)', letterSpacing: '0.05em', color: brand.colors.primary }} className="mb-2">
                  BASKIN ROBBINS<br/>REWARDS
                </p>
                <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#1a1a1a] mb-1">
                  You are on the
                </p>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: brand.colors.primary }}>
                  Gold Tier
                </p>
              </div>

              {/* Star Balance Circle */}
              <div className="flex justify-center mb-4">
                <div className="relative w-40 h-40">
                  {/* Progress ring */}
                  <svg className="w-40 h-40 -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#E5E5E5"
                      strokeWidth="8"
                      fill="white"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={brand.colors.primary}
                      strokeWidth="8"
                      fill="white"
                      strokeDasharray={`${(2 / 10) * 439.6} 439.6`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  
                  {/* Star icon and count - centered content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <div className="text-2xl mb-1">🍦</div>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'var(--font-weight-bold)', color: brand.colors.primary }} className="leading-none mb-1">
                      2
                    </p>
                    <div className="w-12 h-[1px] bg-[#1a1a1a]/30 mb-1"></div>
                    <p style={{ fontSize: 'var(--text-xs)' }} className="text-[#1a1a1a]/70">
                      10
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Star Balance Text - Outside Circle */}
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: '0.05em', color: brand.colors.primaryDark }} className="text-center mb-4">
                CURRENT SCOOP BALANCE
              </p>

              {/* Message */}
              <p style={{ fontSize: 'var(--text-sm)' }} className="text-center text-[#1a1a1a] mb-4">
                You're <span style={{ color: brand.colors.primary, fontWeight: 'bold' }}>GOLD</span>. Keep enjoying the rewards.
              </p>

              {/* Know More Button */}
              <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: brand.colors.primary }}>
                Know More
              </button>
            </div>
          </div>
        </div>
        {/* Personal Information Card */}
        <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <p style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--text-base)' }} className="text-[#101828] mb-4">Personal Information</p>
          
          <div className="space-y-4">
            {/* First Name */}
            <div className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative min-h-[58px] border border-transparent focus-within:border-gray-300 transition-colors">
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 flex gap-0.5 opacity-60">
                First Name <span className="text-[#fb2c36]">*</span>
              </label>
              <input 
                type="text" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                onBlur={() => handleFieldBlur('firstName')}
                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-8 sm:pr-16 placeholder-gray-400"
                placeholder="Enter First Name"
              />
              {savedFields.firstName && (
                <span style={{ fontSize: 'var(--text-xs)' }} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md animate-fadeIn whitespace-nowrap">
                  Saved
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative min-h-[58px] border border-transparent focus-within:border-gray-300 transition-colors">
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 flex gap-0.5 opacity-60">
                Last Name <span className="text-[#fb2c36]">*</span>
              </label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                onBlur={() => handleFieldBlur('lastName')}
                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-8 sm:pr-16 placeholder-gray-400"
                placeholder="Enter Last Name"
              />
              {savedFields.lastName && (
                <span style={{ fontSize: 'var(--text-xs)' }} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md animate-fadeIn whitespace-nowrap">
                  Saved
                </span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="relative country-dropdown-container">
              <div className="flex gap-2">
                {/* Country Code Selector Box */}
                <div className="bg-[#f3f3f5] rounded-[14px] px-2 sm:px-3 py-2 relative min-h-[58px] border border-transparent focus-within:border-gray-300 transition-colors w-auto sm:w-[130px] flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1 sm:gap-1.5 w-full h-full hover:opacity-80 transition-opacity"
                  >
                    <span className="text-[18px] sm:text-[20px]">{selectedCountry.flag}</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828] whitespace-nowrap">{selectedCountry.dialCode}</span>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 ml-auto" />
                  </button>
                </div>

                {/* Phone Number Input Box */}
                <div className={cn(
                  "bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative min-h-[58px] transition-colors flex-1",
                  phoneError ? "border border-red-500" : "border border-transparent focus-within:border-gray-300"
                )}>
                  <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 opacity-60">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    value={formData.mobile}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={handlePhoneBlur}
                    style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                    className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-8 sm:pr-16 placeholder-gray-400"
                    placeholder="Enter Phone Number"
                  />
                  {savedFields.mobile && !phoneError && (
                    <span style={{ fontSize: 'var(--text-xs)' }} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md animate-fadeIn whitespace-nowrap">
                      Saved
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Error or Helper Text */}
              {phoneError ? (
                <p style={{ fontSize: 'var(--text-xs)' }} className="text-red-500 mt-1 ml-1 animate-fadeIn">
                  {phoneError}
                </p>
              ) : formData.mobile.length === 0 ? (
                <p style={{ fontSize: 'var(--text-xs)' }} className="text-gray-500 mt-1 ml-1">
                  {selectedCountry.name} numbers require {selectedCountry.minLength === selectedCountry.maxLength 
                    ? `${selectedCountry.minLength} digits` 
                    : `${selectedCountry.minLength}-${selectedCountry.maxLength} digits`}
                </p>
              ) : null}

              {/* Country Dropdown */}
              {showCountryDropdown && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[400px] overflow-hidden flex flex-col">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search country..."
                      style={{ fontSize: 'var(--text-sm)' }}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-[#E30F84]"
                      autoFocus
                    />
                  </div>

                  {/* Countries List */}
                  <div className="overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country.code)}
                          className={cn(
                            "w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left",
                            country.code === formData.countryCode && "bg-[#FFF5FB]"
                          )}
                        >
                          <span className="text-[24px]">{country.flag}</span>
                          <div className="flex-1">
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-gray-900">{country.name}</div>
                            <div style={{ fontSize: 'var(--text-xs)' }} className="text-gray-500">
                              {country.dialCode} • {country.minLength === country.maxLength 
                                ? `${country.minLength} digits` 
                                : `${country.minLength}-${country.maxLength} digits`}
                            </div>
                          </div>
                          {country.code === formData.countryCode && (
                            <Check className="w-5 h-5" style={{ color: brand.colors.primary }} />
                          )}
                        </button>
                      ))
                    ) : (
                      <div style={{ fontSize: 'var(--text-sm)' }} className="px-4 py-8 text-center text-gray-500">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative min-h-[58px] border border-transparent focus-within:border-gray-300 transition-colors">
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 flex gap-0.5 opacity-60">
                Email <span className="text-[#fb2c36]">*</span>
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onBlur={() => handleFieldBlur('email')}
                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-8 sm:pr-16 placeholder-gray-400"
                placeholder="Enter Email"
              />
              {savedFields.email && (
                <span style={{ fontSize: 'var(--text-xs)' }} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md animate-fadeIn whitespace-nowrap">
                  Saved
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div 
              className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative min-h-[58px] border border-transparent focus-within:border-gray-300 transition-colors flex items-center cursor-pointer"
              onClick={() => {
                try {
                  const input = document.getElementById('dob-input') as HTMLInputElement;
                  if (input?.showPicker) {
                    input.showPicker();
                  } else {
                    input?.focus();
                  }
                } catch (error) {
                  // Fallback for cross-origin iframe or unsupported browsers
                  document.getElementById('dob-input')?.focus();
                }
              }}
            >
              <div className="flex-1 pointer-events-none">
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 flex gap-0.5 opacity-60">
                  Date of birth <span className="text-[#fb2c36]">*</span>
                </label>
                <input 
                  id="dob-input"
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  onBlur={() => handleFieldBlur('dob')}
                  style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                  className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-2 sm:pr-8 placeholder-gray-400 pointer-events-auto cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    try {
                      if (e.currentTarget.showPicker) {
                        e.currentTarget.showPicker();
                      }
                    } catch (error) {
                      // Silently fail for cross-origin iframe restrictions
                      console.debug('Date picker not available in this context');
                    }
                  }}
                />
              </div>
              {savedFields.dob && (
                <span style={{ fontSize: 'var(--text-xs)' }} className="absolute right-8 sm:right-10 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md animate-fadeIn pointer-events-none whitespace-nowrap">
                  Saved
                </span>
              )}
              <Calendar 
                className="hidden sm:block w-5 h-5 text-[#99A1AF] mr-1 cursor-pointer pointer-events-none" 
              />
            </div>
          </div>
        </div>

        {/* Gender Selection Card */}
        <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4 flex gap-1">
            Gender <span className="text-[#fb2c36]">*</span>
          </p>
          
          <div className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative h-[58px] border border-transparent focus-within:border-gray-300 transition-colors">
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 flex gap-0.5 opacity-60">
              Gender <span className="text-[#fb2c36]">*</span>
            </label>
            <select 
              value={formData.gender}
              onChange={(e) => {
                const newGender = e.target.value;
                const updatedFormData = {...formData, gender: newGender};
                setFormData(updatedFormData);
                showSavedIndicator('gender');
                // Save with the new value immediately
                setTimeout(() => {
                  fetch(
                    `https://${projectId}.supabase.co/functions/v1/make-server-eeaec47f/profile/save-info`,
                    {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${publicAnonKey}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        userId,
                        ...updatedFormData
                      })
                    }
                  ).then(() => console.log('Gender saved:', newGender))
                   .catch(err => console.warn('Failed to save gender:', err));
                }, 0);
              }}
              style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
              className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-16 placeholder-gray-400 appearance-none cursor-pointer"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="undisclosed">Prefer not to say</option>
            </select>
            {savedFields.gender && (
              <span style={{ fontSize: 'var(--text-sm)' }} className="absolute right-10 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-2 py-1 rounded-md animate-fadeIn">
                Saved
              </span>
            )}
            <ChevronDown className="w-5 h-5 text-[#99A1AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Marital Status Card */}
        <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4">Marital Status</p>
          
          <div className="space-y-4">
            {/* Marital Status Dropdown */}
            <div className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative h-[58px] border border-transparent focus-within:border-gray-300 transition-colors">
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 opacity-60">
                Marital status
              </label>
              <select 
                value={formData.maritalStatus}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  const updatedFormData = {
                    ...formData, 
                    maritalStatus: newStatus,
                    anniversaryDate: newStatus === 'married' ? formData.anniversaryDate : ''
                  };
                  setFormData(updatedFormData);
                  showSavedIndicator('maritalStatus');
                  // Save with the new value immediately
                  setTimeout(() => {
                    fetch(
                      `https://${projectId}.supabase.co/functions/v1/make-server-eeaec47f/profile/save-info`,
                      {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${publicAnonKey}`,
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          userId,
                          ...updatedFormData
                        })
                      }
                    ).then(() => console.log('Marital status saved:', newStatus))
                     .catch(err => console.warn('Failed to save marital status:', err));
                  }, 0);
                }}
                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-16 placeholder-gray-400 appearance-none cursor-pointer"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="other">Prefer not to say</option>
              </select>
              {savedFields.maritalStatus && (
                <span style={{ fontSize: 'var(--text-sm)' }} className="absolute right-10 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-2 py-1 rounded-md animate-fadeIn">
                  Saved
                </span>
              )}
              <ChevronDown className="w-5 h-5 text-[#99A1AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Anniversary Date - Only show if married */}
            {formData.maritalStatus === 'married' && (
              <div 
                className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative h-[58px] border border-transparent focus-within:border-gray-300 transition-colors flex items-center cursor-pointer"
                onClick={() => {
                  try {
                    const input = document.getElementById('anniversary-input') as HTMLInputElement;
                    if (input?.showPicker) {
                      input.showPicker();
                    } else {
                      input?.focus();
                    }
                  } catch (error) {
                    // Fallback for cross-origin iframe or unsupported browsers
                    document.getElementById('anniversary-input')?.focus();
                  }
                }}
              >
                <div className="flex-1 pointer-events-none">
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 flex gap-0.5 opacity-60">
                    Anniversary Date <span className="text-[#fb2c36]">*</span>
                  </label>
                  <input 
                    id="anniversary-input"
                    type="date" 
                    value={formData.anniversaryDate}
                    onChange={(e) => setFormData({...formData, anniversaryDate: e.target.value})}
                    onBlur={() => handleFieldBlur('anniversaryDate')}
                    style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                    className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-8 placeholder-gray-400 pointer-events-auto cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        if (e.currentTarget.showPicker) {
                          e.currentTarget.showPicker();
                        }
                      } catch (error) {
                        // Silently fail for cross-origin iframe restrictions
                        console.debug('Date picker not available in this context');
                      }
                    }}
                  />
                </div>
                {savedFields.anniversaryDate && (
                  <span style={{ fontSize: 'var(--text-sm)' }} className="absolute right-10 top-1/2 -translate-y-1/2 bg-[#07b256] text-white px-2 py-1 rounded-md animate-fadeIn pointer-events-none">
                    Saved
                  </span>
                )}
                <Calendar 
                  className="w-5 h-5 text-[#99A1AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Language Preference Card */}
        <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4">{t('preferences')}</p>
          
          <div className="space-y-4">
            {/* Language Selection */}
            <div className="bg-[#f3f3f5] rounded-[14px] px-3 py-2 relative h-[58px] border border-transparent focus-within:border-gray-300 transition-colors">
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#6a7282] absolute top-2 left-3 opacity-60">
                {t('language')}
              </label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}
                className="w-full bg-transparent border-none outline-none text-[#101828] mt-4 p-0 pr-8 cursor-pointer appearance-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
              <Globe className="w-5 h-5 text-[#99A1AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Consent Management Card */}
        <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <div className="mb-4">
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-1">Consent Management</p>
            <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">Control how we communicate with you across different channels</p>
          </div>

          <div>
            {Object.entries(consentInfo).map(([key, info], index) => {
              const category = key as ConsentCategory;
              const Icon = info.icon;
              const isExpanded = expandedCategory === category;
              const categoryData = consentCategories[category];
              const isNecessary = category === 'necessary';
              
              console.log(`Rendering ${category}:`, { isExpanded, hasSubItems: !!categoryData?.subItems });

              return (
                <div key={category}>
                  {/* Category Item */}
                  <div>
                    {/* Category Header */}
                    <div 
                      className="py-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg"
                      onClick={(e) => {
                        console.log('Category clicked:', category);
                        toggleCategoryExpansion(category);
                      }}
                    >
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", info.iconBg)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }} className="text-[#101828]">{info.title}</p>
                          <div className="flex items-center gap-2">
                            {/* Saved indicator for category */}
                            {savedFields[`consent_${category}`] && (
                              <span style={{ fontSize: 'var(--text-xs)' }} className="bg-[#07b256] text-white px-2 py-0.5 rounded-md animate-fadeIn">
                                Saved
                              </span>
                            )}
                            {isNecessary ? (
                              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                Always On
                              </span>
                            ) : (
                              <Switch 
                                checked={categoryData.enabled} 
                                onCheckedChange={() => toggleCategory(category)}
                                onClick={(e) => e.stopPropagation()}
                                className="data-[state=checked]:bg-[#E30F84]"
                              />
                            )}
                          </div>
                        </div>
                        <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085] leading-relaxed">{info.description}</p>
                      </div>

                      <ChevronDown 
                        className={cn(
                          "w-5 h-5 text-[#667085] transition-transform flex-shrink-0",
                          isExpanded && "rotate-180"
                        )} 
                      />
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && categoryData?.subItems && (
                      <div className="px-2 pb-4 pt-2 bg-[#F9FAFB] -mx-2 rounded-lg mb-2">
                        {/* Sub-items */}
                        <div className="space-y-3">
                          {categoryData.subItems.map((subItem) => (
                            <div 
                              key={subItem.id}
                              className="flex items-center justify-between pl-3"
                            >
                              <label 
                                className="flex items-center gap-3 flex-1 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!isNecessary) toggleSubItem(category, subItem.id);
                                }}
                              >
                                <div className={cn(
                                  "w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors flex-shrink-0",
                                  subItem.enabled ? "bg-[#E30F84] border-[#E30F84]" : "border-gray-300 bg-white",
                                  isNecessary && "opacity-60 cursor-not-allowed"
                                )}>
                                  {subItem.enabled && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span 
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  className={cn(
                                    "text-[#344054]",
                                    isNecessary && "text-[#667085]"
                                  )}
                                >
                                  {subItem.label}
                                </span>
                              </label>
                              
                              {/* Saved indicator for individual sub-items */}
                              {savedFields[`consent_${category}_${subItem.id}`] && (
                                <span style={{ fontSize: 'var(--text-xs)' }} className="bg-[#07b256] text-white px-2 py-0.5 rounded-md animate-fadeIn ml-2">
                                  Saved
                                </span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Info message */}
                        {isNecessary && (
                          <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085] italic mt-4 pl-3">
                            These settings are essential for your account and cannot be disabled.
                          </p>
                        )}
                        
                        {!isNecessary && !categoryData.enabled && (
                          <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085] italic mt-4 pl-3">
                            Enable this category to customize individual preferences.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Divider Line - Don't show after last item */}
                  {index < Object.entries(consentInfo).length - 1 && (
                    <div className="h-px bg-[#EAECF0] my-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-white p-4 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
          <p style={{ fontSize: 'var(--text-sm)' }} className="leading-[1.6] text-[#667085]">
            {t('consentDisclaimer')}{' '}
            <a href="#" className="underline" style={{ color: brand.colors.primary }}>{t('privacyPolicy')}</a> {t('and')}{' '}
            <a href="#" className="underline" style={{ color: brand.colors.primary }}>{t('termsOfService')}</a>.
          </p>
        </div>

      </div>

      {/* Media Capture Dialog */}
      <MediaCaptureDialog
        isOpen={showMediaDialog}
        onClose={() => setShowMediaDialog(false)}
        onMediaCaptured={handleMediaCaptured}
        allowedTypes={['photo']}
        title="Profile Photo"
      />
    </div>
  );
}

export default ProfilePage;