import { useLanguage } from '../../utils/LanguageContext';

export function PaymentSummaryCard() {
  const { t } = useLanguage();

  return (
    <div className="sm:mx-[15px] mx-3 mb-4 bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
      <p className="font-bold text-base text-[#101828] mb-4">{t('paymentSummary')}</p>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#667085]">{t('subtotal')}</span>
          <span className="font-medium text-[#101828]">₹448.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">{t('discount')}</span>
          <span className="font-medium text-green-600">-₹150.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">{t('tax')}</span>
          <span className="font-medium text-[#101828]">₹40.32</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between">
          <span className="font-bold text-base text-[#101828]">{t('total')}</span>
          <span className="font-bold text-base text-[#101828]">₹488.32</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6">
        <p className="font-bold text-base text-[#101828] mb-4">{t('paymentMethods')}</p>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#667085]">{t('creditCard')}</span>
            <span className="font-medium text-[#101828]">Visa</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#667085]">{t('debitCard')}</span>
            <span className="font-medium text-[#101828]">MasterCard</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#667085]">{t('netBanking')}</span>
            <span className="font-medium text-[#101828]">ICICI Bank</span>
          </div>
        </div>
      </div>
    </div>
  );
}