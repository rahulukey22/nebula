export interface CountryPhoneCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  minLength: number;
  maxLength: number;
  pattern?: RegExp;
}

export const countryCodes: CountryPhoneCode[] = [
  {
    code: 'IN',
    name: 'India',
    dialCode: '+91',
    flag: '🇮🇳',
    minLength: 10,
    maxLength: 10,
    pattern: /^[6-9]\d{9}$/
  },
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    minLength: 10,
    maxLength: 10,
    pattern: /^\d{10}$/
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    minLength: 10,
    maxLength: 10,
    pattern: /^\d{10}$/
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    dialCode: '+971',
    flag: '🇦🇪',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flag: '🇦🇺',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    minLength: 10,
    maxLength: 10,
    pattern: /^\d{10}$/
  },
  {
    code: 'SG',
    name: 'Singapore',
    dialCode: '+65',
    flag: '🇸🇬',
    minLength: 8,
    maxLength: 8,
    pattern: /^[0-9]{8}$/
  },
  {
    code: 'MY',
    name: 'Malaysia',
    dialCode: '+60',
    flag: '🇲🇾',
    minLength: 9,
    maxLength: 10,
    pattern: /^[0-9]{9,10}$/
  },
  {
    code: 'PH',
    name: 'Philippines',
    dialCode: '+63',
    flag: '🇵🇭',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'ID',
    name: 'Indonesia',
    dialCode: '+62',
    flag: '🇮🇩',
    minLength: 9,
    maxLength: 12,
    pattern: /^[0-9]{9,12}$/
  },
  {
    code: 'TH',
    name: 'Thailand',
    dialCode: '+66',
    flag: '🇹🇭',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    dialCode: '+880',
    flag: '🇧🇩',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'PK',
    name: 'Pakistan',
    dialCode: '+92',
    flag: '🇵🇰',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    dialCode: '+94',
    flag: '🇱🇰',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'NP',
    name: 'Nepal',
    dialCode: '+977',
    flag: '🇳🇵',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'JP',
    name: 'Japan',
    dialCode: '+81',
    flag: '🇯🇵',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'KR',
    name: 'South Korea',
    dialCode: '+82',
    flag: '🇰🇷',
    minLength: 9,
    maxLength: 10,
    pattern: /^[0-9]{9,10}$/
  },
  {
    code: 'CN',
    name: 'China',
    dialCode: '+86',
    flag: '🇨🇳',
    minLength: 11,
    maxLength: 11,
    pattern: /^[0-9]{11}$/
  },
  {
    code: 'DE',
    name: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    minLength: 10,
    maxLength: 11,
    pattern: /^[0-9]{10,11}$/
  },
  {
    code: 'FR',
    name: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'IT',
    name: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'ES',
    name: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'BR',
    name: 'Brazil',
    dialCode: '+55',
    flag: '🇧🇷',
    minLength: 11,
    maxLength: 11,
    pattern: /^[0-9]{11}$/
  },
  {
    code: 'MX',
    name: 'Mexico',
    dialCode: '+52',
    flag: '🇲🇽',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'RU',
    name: 'Russia',
    dialCode: '+7',
    flag: '🇷🇺',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'ZA',
    name: 'South Africa',
    dialCode: '+27',
    flag: '🇿🇦',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    dialCode: '+966',
    flag: '🇸🇦',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  },
  {
    code: 'EG',
    name: 'Egypt',
    dialCode: '+20',
    flag: '🇪🇬',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'NG',
    name: 'Nigeria',
    dialCode: '+234',
    flag: '🇳🇬',
    minLength: 10,
    maxLength: 10,
    pattern: /^[0-9]{10}$/
  },
  {
    code: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    flag: '🇰🇪',
    minLength: 9,
    maxLength: 9,
    pattern: /^[0-9]{9}$/
  }
];

export const validatePhoneNumber = (phoneNumber: string, countryCode: string): { isValid: boolean; error?: string } => {
  const country = countryCodes.find(c => c.code === countryCode);
  
  if (!country) {
    return { isValid: false, error: 'Invalid country code' };
  }

  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  if (cleanNumber.length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  if (cleanNumber.length < country.minLength) {
    return { 
      isValid: false, 
      error: `Phone number must be at least ${country.minLength} digits for ${country.name}` 
    };
  }

  if (cleanNumber.length > country.maxLength) {
    return { 
      isValid: false, 
      error: `Phone number must not exceed ${country.maxLength} digits for ${country.name}` 
    };
  }

  if (country.pattern && !country.pattern.test(cleanNumber)) {
    return { 
      isValid: false, 
      error: `Invalid phone number format for ${country.name}` 
    };
  }

  return { isValid: true };
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  return phoneNumber.replace(/\D/g, '');
};
