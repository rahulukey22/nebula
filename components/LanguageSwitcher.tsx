import { useState, useRef, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { languages, Language } from '../utils/translations';
import { brand } from '../config/brand';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Minimal button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 backdrop-blur-sm border border-[#000000]/20 rounded-full text-xs font-medium text-[#000000] transition-all duration-200 shadow-sm"
        style={{ ['--hover-bg' as string]: brand.colors.primary }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brand.colors.primary; e.currentTarget.style.color = 'white'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
      >
        <Languages className="w-3.5 h-3.5" />
        <span>{currentLanguage.nativeName}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#000000]/10 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 hover:bg-[#000000]/5 transition-colors flex items-center justify-between text-left ${
                language === lang.code ? 'bg-[#000000]/10' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-800">{lang.nativeName}</span>
              {language === lang.code && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#000000]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}