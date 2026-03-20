import { useState } from 'react';
import { ChevronRight, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { brand } from '../../config/brand';

export function StorePoliciesCard() {
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<'terms' | null>(null);

  return (
    <div className="mx-5 mb-[40px] bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)] mt-[0px] mr-[12px] ml-[12px]">
      <h3 className="text-base font-bold text-[#101828] mb-4">{t('storePolicies')}</h3>
      
      <div className="space-y-3 mb-5">
        <p className="text-sm text-[#667085] flex gap-2 font-semibold">
          <span className="text-black">•</span> {t('policy1')}
        </p>
        <p className="text-sm text-[#667085] flex gap-2 font-semibold">
          <span className="text-black">•</span> {t('policy2')}
        </p>
        <p className="text-sm text-[#667085] flex gap-2 font-semibold">
          <span className="text-black">•</span> {t('policy3')}
        </p>
        <p className="text-sm text-[#667085] flex gap-2 font-semibold">
          <span className="text-black">•</span> {t('policy4')}
        </p>
        <p className="text-sm text-[#667085] flex gap-2 font-semibold">
          <span className="text-black">•</span> {t('policy5')}
        </p>
        <p className="text-sm text-[#667085] flex gap-2 font-semibold">
          <span className="text-black">•</span> {t('policy6')}
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4 mb-4">
        <button
          onClick={() => setExpandedSection(expandedSection === 'terms' ? null : 'terms')}
          className="w-full flex items-center justify-between py-1"
        >
          <span className="text-sm font-bold text-[#101828]">{t('termsConditions')}</span>
          <ChevronRight
            className={`w-4 h-4 text-[#667085] transition-transform ${expandedSection === 'terms' ? 'rotate-90' : ''}`}
          />
        </button>
        
        {expandedSection === 'terms' && (
          <div className="pb-2 pt-2 text-sm text-[#667085] space-y-2">
            <p>{t('termsText1')}</p>
            <p>{t('termsText2')}</p>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-bold text-[#101828] mb-3">Contact Us</h4>
        <div className="space-y-2.5">
          <a 
            href={brand.content.cta.shopOnline.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#667085] transition-colors"
            style={{ 
              '--hover-color': brand.colors.primary 
            } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.color = brand.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = '#667085'}
          >
            <Globe className="w-4 h-4" style={{ color: brand.colors.primary }} />
            <span>{brand.content.cta.shopOnline.url.replace('https://', '').replace('http://', '')}</span>
          </a>
          <a 
            href="tel:+912262513131" 
            className="flex items-center gap-2 text-sm text-[#667085] transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = brand.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = '#667085'}
          >
            <Phone className="w-4 h-4" style={{ color: brand.colors.primary }} />
            <span>022-6251-3131</span>
          </a>
          <a 
            href={`mailto:customercare@${brand.identity.name.toLowerCase().replace(/\s+/g, '')}.com`}
            className="flex items-center gap-2 text-sm text-[#667085] transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = brand.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = '#667085'}
          >
            <Mail className="w-4 h-4" style={{ color: brand.colors.primary }} />
            <span>customercare@{brand.identity.name.toLowerCase().replace(/\s+/g, '')}.com</span>
          </a>
        </div>
      </div>

      {/* Brand Message */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-[#667085] italic leading-relaxed">
          "{t('description')}"
        </p>
      </div>
    </div>
  );
}