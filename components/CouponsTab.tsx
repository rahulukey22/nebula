import { Copy, Clock, Tag, ScanLine, QrCode as QrIcon } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useState } from 'react';
import { cn } from './ui/utils';
import { brand, getColorWithOpacity } from '../config/brand';

export interface ClaimedCoupon {
  id: string;
  code: string;
  title: string;
  description: string;
  expiry: string;
  source: string; // 'story' | 'spin-wheel' | 'lucky-draw'
  type: 'qr' | 'barcode';
  featured?: boolean;
}

const coupons = [
  {
    id: 1,
    code: 'BRSCOOP25',
    title: '25% Off Your Next Visit',
    description: 'Valid on in-store bills above ₹300 • Show at counter',
    expiry: 'Expires in 7 days',
    type: 'qr' as const,
    featured: true
  },
  {
    id: 2,
    code: 'FREESCOOP',
    title: 'Free Single Scoop',
    description: 'With purchase of any Sundae or Shake in-store',
    expiry: 'Expiring in 2 days',
    type: 'qr' as const
  },
  {
    id: 3,
    code: 'CAKE50',
    title: '50% Off Ice Cream Cake',
    description: 'On any 1 kg or larger cake at the store',
    expiry: 'Valid till 15 Nov',
    type: 'barcode' as const
  },
  {
    id: 4,
    code: 'BOGO31',
    title: 'Buy 1 Get 1 Free Scoop',
    description: 'Valid at any Baskin Robbins outlet • Dine-in only',
    expiry: 'Valid till 30 Nov',
    type: 'qr' as const
  }
];

interface CouponsTabProps {
  claimedCoupons?: ClaimedCoupon[];
  claimedTickets?: string[];
}

function CouponsTab({ claimedCoupons = [], claimedTickets = [] }: CouponsTabProps) {
  const [visibleCode, setVisibleCode] = useState<number | string | null>(null);

  const copyCode = async (code: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        toast.success("Coupon code copied!");
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch (err) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          toast.success("Coupon code copied!");
        } else {
          toast.error("Failed to copy code");
        }
      } catch (fallbackErr) {
        console.error("Copy failed", fallbackErr);
        toast.error("Failed to copy code");
      }
    }
  };

  const toggleCodeVisibility = (couponId: number | string) => {
    setVisibleCode(visibleCode === couponId ? null : couponId);
  };

  // Merge static coupons with dynamically claimed ones
  const allCoupons = [
    ...claimedCoupons.map(c => ({
      id: c.id,
      code: c.code,
      title: c.title,
      description: c.description,
      expiry: c.expiry,
      type: c.type,
      featured: c.featured ?? true,
      source: c.source,
    })),
    ...coupons,
  ];

  return (
    <div className="px-5 py-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-base">Available Coupons</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{allCoupons.length} Active</span>
      </div>

      {allCoupons.map((coupon, index) => (
        <div 
          key={coupon.id} 
          className={cn(
            "bg-white rounded-xl border overflow-hidden shadow-sm relative",
            coupon.featured 
              ? "shadow-lg" 
              : "border-gray-200"
          )}
          style={coupon.featured ? {
            borderColor: brand.colors.primary,
            boxShadow: `0 10px 25px ${getColorWithOpacity(brand.colors.primary, 0.1)}`
          } : {}}
        >
          {/* Featured Badge */}
          {coupon.featured && (
            <div 
              className="absolute top-2 left-2 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1.5"
              style={{ 
                background: 'source' in coupon && coupon.source === 'spin-wheel'
                  ? 'linear-gradient(135deg, #E30F84 0%, #C00D6F 100%)'
                  : 'source' in coupon && coupon.source === 'lucky-draw'
                    ? 'linear-gradient(135deg, #005CB9 0%, #003D82 100%)'
                    : 'source' in coupon && coupon.source === 'story'
                      ? 'linear-gradient(135deg, #FF6B9D 0%, #E30F84 100%)'
                      : `linear-gradient(90deg, ${brand.colors.primary}, ${brand.colors.primaryDark})`
              }}
            >
              <span className="text-base">
                {'source' in coupon && coupon.source === 'spin-wheel' 
                  ? '🎡' 
                  : 'source' in coupon && coupon.source === 'lucky-draw' 
                    ? '🎁' 
                    : 'source' in coupon && coupon.source === 'story' 
                      ? '📖' 
                      : '⭐'}
              </span>
              <span className="uppercase tracking-wider">
                {'source' in coupon && coupon.source 
                  ? (coupon.source === 'spin-wheel' 
                      ? 'SPIN WIN' 
                      : coupon.source === 'lucky-draw' 
                        ? 'LUCKY DRAW' 
                        : coupon.source === 'story' 
                          ? 'STORY REWARD' 
                          : 'FEATURED') 
                  : 'FEATURED'}
              </span>
            </div>
          )}
          
          <div className="flex">
            <div 
              className="w-3"
              style={{ 
                background: 'source' in coupon && coupon.source
                  ? (coupon.source === 'spin-wheel' 
                      ? `linear-gradient(180deg, #E30F84, #005CB9)` 
                      : coupon.source === 'lucky-draw'
                        ? `linear-gradient(180deg, #005CB9, #E30F84)`
                        : `linear-gradient(180deg, ${brand.colors.primary}, ${brand.colors.primaryDark})`)
                  : coupon.id === 1 
                    ? `linear-gradient(180deg, ${brand.colors.primary}, ${brand.colors.primaryDark})`
                    : coupon.id === 2 
                      ? 'linear-gradient(180deg, #ef4444, #dc2626)'
                      : coupon.id === 3
                        ? 'linear-gradient(180deg, #60a5fa, #3b82f6)'
                        : 'linear-gradient(180deg, #4ade80, #22c55e)'
              }}
            />
            <div className={cn(
              "flex-1 p-4",
              coupon.featured ? "pt-12" : "pt-6"
            )}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 
                      className={cn("font-bold text-base")}
                      style={coupon.featured ? { color: brand.colors.primary } : {}}
                    >
                      {coupon.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">{coupon.description}</p>
                </div>
                <div 
                  className="px-3 py-1.5 rounded-lg text-sm font-bold border-2"
                  style={{
                    backgroundColor: getColorWithOpacity(
                      coupon.id === 3 ? brand.colors.accent : brand.colors.primary,
                      0.1
                    ),
                    color: coupon.id === 3 ? brand.colors.accent : brand.colors.primary,
                    borderColor: getColorWithOpacity(
                      coupon.id === 3 ? brand.colors.accent : brand.colors.primary,
                      0.2
                    ),
                  }}
                >
                  {coupon.code}
                </div>
              </div>

              {/* Toggle QR/Barcode */}
              <div className="mt-4">
                {visibleCode === coupon.id ? (
                  <div 
                    className="rounded-lg p-4 flex flex-col items-center justify-center border border-dashed"
                    style={coupon.featured ? {
                      background: `linear-gradient(135deg, ${getColorWithOpacity(brand.colors.primary, 0.05)}, ${getColorWithOpacity(brand.colors.accent, 0.05)})`,
                      borderColor: getColorWithOpacity(brand.colors.primary, 0.3)
                    } : {
                      backgroundColor: '#f9fafb',
                      borderColor: '#e5e7eb'
                    }}
                  >
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      {coupon.type === 'qr' ? (
                        <QRCode 
                          value={coupon.code} 
                          size={140}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          viewBox={`0 0 256 256`}
                        />
                      ) : (
                        <Barcode 
                          value={coupon.code} 
                          width={1.5} 
                          height={60} 
                          fontSize={14}
                          background="transparent"
                        />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => toggleCodeVisibility(coupon.id)}
                    >
                      Hide {coupon.type === 'qr' ? 'QR Code' : 'Barcode'}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-full h-10 gap-2 font-medium",
                      coupon.featured 
                        ? "hover:bg-opacity-5"
                        : "hover:bg-gray-50"
                    )}
                    style={coupon.featured ? {
                      borderColor: brand.colors.primary,
                      color: brand.colors.primary,
                    } : {}}
                    onMouseEnter={(e) => coupon.featured && (e.currentTarget.style.backgroundColor = getColorWithOpacity(brand.colors.primary, 0.05))}
                    onMouseLeave={(e) => coupon.featured && (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => toggleCodeVisibility(coupon.id)}
                  >
                    {coupon.type === 'qr' ? <QrIcon className="w-4 h-4" /> : <ScanLine className="w-4 h-4" />}
                    Show {coupon.type === 'qr' ? 'QR Code' : 'Barcode'}
                  </Button>
                )}
              </div>

              <div className="my-3 border-t border-dashed border-gray-200 relative">
                <div className="absolute -left-[21px] -top-3 w-6 h-6 bg-gray-50 rounded-full" />
                <div className="absolute -right-[21px] -top-3 w-6 h-6 bg-gray-50 rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{coupon.expiry}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "h-8 text-sm gap-1.5 font-medium text-white",
                    coupon.featured ? "" : "hover:bg-gray-50"
                  )}
                  style={coupon.featured ? {
                    backgroundColor: brand.colors.primary,
                    borderColor: brand.colors.primary,
                  } : {
                    backgroundColor: brand.colors.primary,
                    borderColor: brand.colors.primary,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primaryDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primary)}
                  onClick={() => copyCode(coupon.code)}
                >
                  <Copy className="w-3 h-3" />
                  Copy Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
        <p className="text-sm font-medium text-gray-600 mb-2">Have a promo code?</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter code here" 
            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-base outline-none focus:border-black transition-colors"
          />
          <Button 
            size="sm" 
            className="text-white text-base"
            style={{ 
              backgroundColor: brand.colors.primary,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primaryDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primary)}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Lucky Draw Tickets Section */}
      {claimedTickets.length > 0 && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: 'white',
            border: `1px solid ${brand.colors.border.light}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${brand.colors.primary}15` }}
            >
              <Tag className="w-5 h-5" style={{ color: brand.colors.primary }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: brand.colors.text.primary }}>My Lucky Draw Tickets</p>
              <p className="text-xs" style={{ color: brand.colors.text.tertiary }}>
                {claimedTickets.length} active ticket(s) for this month
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {claimedTickets.map((ticket) => (
              <div
                key={ticket}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  backgroundColor: brand.colors.background.tertiary,
                  border: `1px dashed ${brand.colors.primary}4D`,
                }}
              >
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: brand.colors.primaryDark }}
                >
                  {ticket}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-1 bg-green-100 text-green-700 rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponsTab;