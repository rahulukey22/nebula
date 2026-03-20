/**
 * Script Deferring Utilities
 * Helps reduce main-thread work by deferring non-critical scripts
 */

/**
 * Defer execution of a function until the browser is idle
 * Uses requestIdleCallback for better performance
 */
export function deferUntilIdle(callback: () => void, timeout: number = 2000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, timeout);
  }
}

/**
 * Defer execution until after the page has fully loaded
 */
export function deferUntilLoad(callback: () => void): void {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback, { once: true });
  }
}

/**
 * Defer execution until after the user interacts with the page
 * Good for analytics and non-critical tracking scripts
 */
export function deferUntilInteraction(callback: () => void): void {
  const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
  
  const executeOnce = () => {
    callback();
    events.forEach(event => {
      document.removeEventListener(event, executeOnce);
    });
  };
  
  events.forEach(event => {
    document.addEventListener(event, executeOnce, { once: true, passive: true });
  });
  
  // Fallback after 3 seconds if no interaction
  setTimeout(() => {
    executeOnce();
  }, 3000);
}

/**
 * Lazy load a script dynamically
 * Useful for analytics, chat widgets, etc.
 */
export function loadScriptAsync(src: string, async: boolean = true, defer: boolean = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.body.appendChild(script);
  });
}

/**
 * Preload a resource without executing
 * Good for fonts, images, etc.
 */
export function preloadResource(href: string, as: string, crossorigin?: boolean): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  
  if (crossorigin) {
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
}

/**
 * Check if the user's connection is slow
 * Returns true if connection is 2G or slow-2g
 */
export function isSlowConnection(): boolean {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (!connection) return false;
  
  const slowTypes = ['slow-2g', '2g'];
  return slowTypes.includes(connection.effectiveType);
}

/**
 * Check if user has data saver enabled
 */
export function isDataSaverEnabled(): boolean {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  return connection?.saveData === true;
}
