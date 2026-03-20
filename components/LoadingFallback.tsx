import { brand } from '../config/brand';

export function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Zudio Logo */}
        <div className="w-32 h-32 flex items-center justify-center animate-pulse">
          <img src={brand.assets.logo.primary} alt={brand.identity.name} className="w-full h-full object-contain" />
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-gray-500 mt-4 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Minimal Loading Spinner for tab switches
 */
export function MinimalLoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full w-full py-20">
      <div className="w-8 h-8 border-3 border-gray-200 border-t-[#000000] rounded-full animate-spin" />
    </div>
  );
}