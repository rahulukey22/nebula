import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations.en[key] || String(key),
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('zudio-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('zudio-language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
    // Remove any RTL direction (not needed for Indian languages)
    document.documentElement.dir = 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}