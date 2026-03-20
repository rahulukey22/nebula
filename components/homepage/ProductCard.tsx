import { useLanguage } from '../../utils/LanguageContext';
import { RateItem } from '../RateItem';
import { Separator } from '../ui/separator';

interface Product {
  id: number;
  name: string;
  image: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  originalPrice: number;
  mrp: number;
  discount: number;
  gst: number;
  sku?: string;
  hsnCode?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'compact' | 'detail';
  rating: number;
  hasSubmittedReview: boolean;
  onRate: (rating: number) => void;
  onTellUsMore: () => void;
  onViewReview: () => void;
  showSeparator: boolean;
}

export function ProductCard({
  product,
  viewMode,
  rating,
  hasSubmittedReview,
  onRate,
  onTellUsMore,
  onViewReview,
  showSeparator
}: ProductCardProps) {
  const { t } = useLanguage();

  return (
    <div>
      {viewMode === 'compact' ? (
        // Compact View
        <div>
          <div className="flex gap-4">
            <div className="w-20 h-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#101828] mb-2 text-sm">{product.name}</p>
              
              <div className="flex gap-2 mb-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-[#364153]">
                  {t('size')}: {product.size}
                </span>
                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-[#364153]">
                  {product.color}
                </span>
                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-[#364153]">
                  {t('qty')}: {product.qty}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-[#101828]">₹{product.price.toFixed(2)}</p>
                {product.price < product.originalPrice && (
                  <>
                    <p className="text-sm line-through text-[#b2b2b2]">₹{product.originalPrice.toFixed(2)}</p>
                    <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% {t('off')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Rating */}
          <RateItem 
            rating={rating}
            onRate={onRate}
            hasSubmittedReview={hasSubmittedReview}
            onTellUsMore={onTellUsMore}
            onViewReview={onViewReview}
            className="mt-3"
          />
        </div>
      ) : (
        // Detail View
        <div>
          <div className="flex gap-4 mb-3">
            <div className="w-24 h-32 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-[#101828] mb-3 text-base">{product.name}</p>
              
              {/* All Details - Unified Design */}
              <div className="space-y-2 text-sm">
                {product.sku && (
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">SKU Code</span>
                    <span className="font-medium text-[#101828]">{product.sku}</span>
                  </div>
                )}
                {product.hsnCode && (
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">HSN Code</span>
                    <span className="font-medium text-[#101828]">{product.hsnCode}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#6a7282]">{t('mrp')}</span>
                  <span className="font-medium text-[#101828]">₹{product.mrp.toFixed(2)}</span>
                </div>
                {product.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">{t('discount')}</span>
                    <span className="font-medium text-green-600">-₹{product.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#6a7282]">{t('price')}</span>
                  <span className="font-medium text-[#101828]">₹{product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a7282]">{t('qty')}.</span>
                  <span className="font-medium text-[#101828]">{product.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a7282]">{t('gst')}</span>
                  <span className="font-medium text-[#101828]">₹{product.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span className="text-[#101828]">{t('netAmount')}</span>
                  <span className="text-[#101828]">₹{(product.price * product.qty + product.gst).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-2 mb-3">
              <span className="bg-gray-100 px-2 py-1 rounded text-sm text-[#364153]">
                {t('size')}: {product.size}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm text-[#364153]">
                {product.color}
              </span>
            </div>

            <RateItem 
              rating={rating}
              onRate={onRate}
              hasSubmittedReview={hasSubmittedReview}
              onTellUsMore={onTellUsMore}
              onViewReview={onViewReview}
              className="mx-[0px] my-[10px]"
            />
          </div>
        </div>
      )}
      
      {/* Separator */}
      {showSeparator && <Separator className="my-4" />}
    </div>
  );
}