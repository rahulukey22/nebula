import { useLanguage } from '../../utils/LanguageContext';

export function TaxSummaryCard() {
  const { t } = useLanguage();

  return (
    <div className="sm:mx-[15px] mx-3 mb-4 bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
      <p className="font-bold text-base text-[#101828] mb-4">{t('taxSummary')}</p>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#667085]">{t('taxableValue')}</span>
          <span className="font-medium text-[#101828]">₹448.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">{t('cgst')} (4.5%)</span>
          <span className="font-medium text-[#101828]">₹20.16</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">{t('sgst')} (4.5%)</span>
          <span className="font-medium text-[#101828]">₹20.16</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">IGST (0%)</span>
          <span className="font-medium text-[#101828]">₹0.00</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between">
          <span className="font-bold text-base text-[#101828]">{t('totalTax')}</span>
          <span className="font-bold text-base text-[#101828]">₹40.32</span>
        </div>
      </div>
    </div>
  );
}