import { Store } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { brand } from '../../config/brand';

export function PurchaseDetailsCard() {
  const { t } = useLanguage();

  return (
    <div className="sm:mx-[15px] mx-3 mb-[16px] bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)] mt-[15px] mr-[12px] ml-[12px]">
      {/* Invoice Number */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-[#6a7282]">Invoice no. # 0248070252116</p>
      </div>
      
      {/* Store Name and Address with GSTIN */}
      <div className="mb-4">
        <p className="text-sm text-[#4a5565] leading-relaxed flex items-start gap-2">
          <Store className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} style={{ color: brand.colors.primary }} />
          <span className="text-[14px]">
            <span className="font-bold text-base text-[#101828] block">{brand.content.store.sampleLocation.name}</span>
            {brand.content.store.sampleLocation.address}
            <span className="block text-xs text-[#6a7282] mt-1">{brand.content.store.sampleLocation.gstin}</span>
          </span>
        </p>
      </div>
      
      {/* Horizontal Scrollable Cards */}
      <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-[1px] scrollbar-hide snap-x mb-6">
        {/* Card 1: Total Items & Amount Paid */}
        <div className="min-w-[110px] sm:min-w-[130px] md:min-w-[140px] bg-[#F9FAFB] p-3 sm:p-4 rounded-[12px] border border-[#EAECF0] snap-start flex flex-col justify-center">
          <p className="text-[13px] text-[#101828] mb-0.5">2 <span className="font-normal text-[#6a7282]">Items</span></p>
          <p className="text-[13px] text-[#101828]">₹488.32</p>
        </div>

        {/* Card 2: Date & Time */}
        <div className="min-w-[110px] sm:min-w-[130px] md:min-w-[140px] bg-[#F9FAFB] p-3 sm:p-4 rounded-[12px] border border-[#EAECF0] snap-start flex flex-col justify-center">
          <p className="text-sm text-[#6a7282] mb-1">{t('dateTime')}</p>
          <p className="text-base text-[#101828] text-[14px]">18 Jan'25, 03:30 PM</p>
        </div>

        {/* Card 3: Payment Method */}
        <div className="min-w-[110px] sm:min-w-[130px] md:min-w-[140px] bg-[#F9FAFB] p-3 sm:p-4 rounded-[12px] border border-[#EAECF0] snap-start flex flex-col justify-center">
          <p className="text-sm text-[#6a7282] mb-1">Payment</p>
          <p className="text-base text-[#101828] text-[14px]">Card</p>
        </div>

        {/* Card 4: Shift Code & Till Number */}
        <div className="min-w-[110px] sm:min-w-[130px] md:min-w-[140px] bg-[#F9FAFB] p-3 sm:p-4 rounded-[12px] border border-[#EAECF0] snap-start flex flex-col justify-center">
          <p className="text-[13px] text-[#101828] mb-0.5">Shift <span>9</span></p>
          <p className="text-[13px] text-[#101828]">Till <span>1A</span></p>
        </div>
      </div>
    </div>
  );
}