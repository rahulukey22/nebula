/**
 * Critical CSS Utilities
 * Helps inline critical CSS and defer non-critical styles
 */

/**
 * Inline critical CSS that's needed for above-the-fold content
 * This reduces render-blocking CSS
 */
export const CRITICAL_CSS = `
  /* Critical styles for initial render */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Prevent FOUC (Flash of Unstyled Content) */
  .max-w-md {
    max-width: 430px;
  }
  
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  .min-h-screen {
    min-height: 100vh;
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  /* Loading spinner animation */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Pulse animation for loading */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

/**
 * Load non-critical CSS asynchronously
 * This prevents render blocking
 */
export function loadDeferredCSS(href: string): void {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Load as print initially
  link.onload = () => {
    link.media = 'all'; // Switch to all once loaded
  };
  document.head.appendChild(link);
}

/**
 * Preload CSS for faster parsing
 */
export function preloadCSS(href: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
  
  // Convert to actual stylesheet after preload
  setTimeout(() => {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = href;
    document.head.appendChild(styleLink);
  }, 100);
}

/**
 * Inject critical CSS inline into the document head
 * Call this early in the app lifecycle
 */
export function injectCriticalCSS(): void {
  // Check if already injected
  if (document.getElementById('critical-css')) return;
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = CRITICAL_CSS;
  
  // Insert before other stylesheets
  const firstLink = document.head.querySelector('link[rel="stylesheet"]');
  if (firstLink) {
    document.head.insertBefore(style, firstLink);
  } else {
    document.head.appendChild(style);
  }
}

/**
 * Remove unused CSS (tree-shake at runtime)
 * WARNING: Use with caution - only for development debugging
 */
export function logUnusedCSS(): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  const usedSelectors = new Set<string>();
  const allRules: any[] = [];
  
  // Collect all CSS rules
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = sheet.cssRules || sheet.rules;
      for (const rule of Array.from(rules)) {
        allRules.push(rule);
      }
    } catch (e) {
      // Skip cross-origin stylesheets
      console.warn('Cannot access stylesheet:', sheet.href);
    }
  }
  
  // Check which selectors are used
  allRules.forEach((rule: any) => {
    if (rule.selectorText) {
      try {
        if (document.querySelector(rule.selectorText)) {
          usedSelectors.add(rule.selectorText);
        }
      } catch (e) {
        // Invalid selector
      }
    }
  });
  
  console.log(`Used CSS selectors: ${usedSelectors.size} / ${allRules.length}`);
}
