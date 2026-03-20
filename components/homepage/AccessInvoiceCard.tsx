import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { toast } from 'sonner@2.0.3';
import { brand, getColorWithOpacity } from '../../config/brand';

interface AccessInvoiceCardProps {
  onDownload: () => void;
  onShare: () => void;
}

export function AccessInvoiceCard({ onDownload, onShare }: AccessInvoiceCardProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEmailSubmit = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Show success message
    setShowSuccess(true);
    toast.success(t('invoiceSentSuccess'));

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="sm:mx-[15px] mx-3 mb-4 bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
      <p className="font-bold text-base text-[#101828] mb-4">{t('accessInvoice')}</p>
      
      {/* Email Section */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-[#344054] mb-2">{t('sendInvoiceEmail')}</label>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('enterEmail')}
            className="flex-1 bg-[#F9FAFB] border border-[#EAECF0] px-3 py-2.5 rounded-[10px] text-sm outline-none focus:border-black transition-colors"
          />
          <button
            onClick={handleEmailSubmit}
            className="text-white px-4 py-2.5 rounded-[10px] text-sm font-medium transition-colors whitespace-nowrap"
            style={{ backgroundColor: brand.colors.primary }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brand.colors.primaryDark}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brand.colors.primary}
          >
            {t('send')}
          </button>
        </div>
        {showSuccess && (
          <div className="mt-2 text-xs flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1" style={{ color: brand.colors.primary }}>
             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand.colors.primary }} />
             {t('invoiceSentSuccess')}
          </div>
        )}
      </div>

      <div className="h-px bg-gray-100 mb-4" />

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 bg-white h-9 px-4 rounded-[10px] transition-colors border"
          style={{ borderColor: brand.colors.primary }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getColorWithOpacity(brand.colors.primary, 0.1)}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <Download className="w-4 h-4" style={{ color: brand.colors.primary }} />
          <span className="text-sm font-medium" style={{ color: brand.colors.primary }}>{t('download')}</span>
        </button>
        <button
          onClick={onShare}
          className="flex items-center justify-center gap-2 bg-white border border-[#EAECF0] h-9 px-4 rounded-[10px] hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4 text-[#101828]" />
          <span className="text-sm font-medium text-[#344054]">{t('share')}</span>
        </button>
      </div>
    </div>
  );
}