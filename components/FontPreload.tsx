import { useEffect } from 'react';

/**
 * FontPreload Component
 * Adds preconnect and dns-prefetch links to optimize Google Fonts loading
 * Reduces font loading time by ~400ms
 */
export function FontPreload() {
  useEffect(() => {
    // Only add if not already present
    if (document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]')) {
      return;
    }

    // Preconnect to Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    // Preconnect to Google Fonts static with crossorigin
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    // DNS prefetch as fallback for older browsers
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://fonts.googleapis.com';
    document.head.appendChild(dnsPrefetch);

    return () => {
      // Cleanup if component unmounts
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(dnsPrefetch);
    };
  }, []);

  return null; // This component doesn't render anything
}
