/**
 * Performance Monitoring Utilities
 * Track Core Web Vitals and custom performance metrics
 */

// Core Web Vitals thresholds (in milliseconds)
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP(callback: (metric: PerformanceMetric) => void): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      const value = lastEntry.renderTime || lastEntry.loadTime;
      const rating = 
        value <= THRESHOLDS.LCP.good ? 'good' :
        value <= THRESHOLDS.LCP.needsImprovement ? 'needs-improvement' : 'poor';

      callback({
        name: 'LCP',
        value,
        rating,
        timestamp: Date.now(),
      });
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID(callback: (metric: PerformanceMetric) => void): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const value = entry.processingStart - entry.startTime;
        const rating = 
          value <= THRESHOLDS.FID.good ? 'good' :
          value <= THRESHOLDS.FID.needsImprovement ? 'needs-improvement' : 'poor';

        callback({
          name: 'FID',
          value,
          rating,
          timestamp: Date.now(),
        });
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS(callback: (metric: PerformanceMetric) => void): void {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries: any[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (
            sessionValue &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            
            const rating = 
              clsValue <= THRESHOLDS.CLS.good ? 'good' :
              clsValue <= THRESHOLDS.CLS.needsImprovement ? 'needs-improvement' : 'poor';

            callback({
              name: 'CLS',
              value: clsValue,
              rating,
              timestamp: Date.now(),
            });
          }
        }
      });
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP(callback: (metric: PerformanceMetric) => void): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          const value = entry.startTime;
          const rating = 
            value <= THRESHOLDS.FCP.good ? 'good' :
            value <= THRESHOLDS.FCP.needsImprovement ? 'needs-improvement' : 'poor';

          callback({
            name: 'FCP',
            value,
            rating,
            timestamp: Date.now(),
          });
        }
      });
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('Error measuring FCP:', error);
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB(): PerformanceMetric | null {
  if (!('performance' in window) || !performance.timing) return null;

  const navigationTiming = performance.timing;
  const value = navigationTiming.responseStart - navigationTiming.requestStart;
  
  const rating = 
    value <= THRESHOLDS.TTFB.good ? 'good' :
    value <= THRESHOLDS.TTFB.needsImprovement ? 'needs-improvement' : 'poor';

  return {
    name: 'TTFB',
    value,
    rating,
    timestamp: Date.now(),
  };
}

/**
 * Get page load time
 */
export function getPageLoadTime(): number {
  if (!('performance' in window) || !performance.timing) return 0;
  
  const navigationTiming = performance.timing;
  return navigationTiming.loadEventEnd - navigationTiming.navigationStart;
}

/**
 * Get DOM content loaded time
 */
export function getDOMContentLoadedTime(): number {
  if (!('performance' in window) || !performance.timing) return 0;
  
  const navigationTiming = performance.timing;
  return navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart;
}

/**
 * Initialize all Core Web Vitals monitoring
 */
export function initPerformanceMonitoring(
  onMetric?: (metric: PerformanceMetric) => void
): void {
  const logMetric = (metric: PerformanceMetric) => {
    console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
    onMetric?.(metric);
  };

  measureLCP(logMetric);
  measureFID(logMetric);
  measureCLS(logMetric);
  measureFCP(logMetric);
  
  // TTFB is measured synchronously
  const ttfb = measureTTFB();
  if (ttfb) {
    logMetric(ttfb);
  }

  // Log page load metrics when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadTime = getPageLoadTime();
      const domLoadedTime = getDOMContentLoadedTime();
      
      console.log(`[Performance] Page Load Time: ${loadTime}ms`);
      console.log(`[Performance] DOM Content Loaded: ${domLoadedTime}ms`);
    }, 0);
  });
}

/**
 * Send metrics to analytics (placeholder - implement with your analytics service)
 */
export function sendToAnalytics(metric: PerformanceMetric): void {
  // Example: Send to Google Analytics
  // if (window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.value),
  //     metric_rating: metric.rating,
  //   });
  // }
  
  // Or send to custom endpoint
  // fetch('/api/metrics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  // });
  
  console.log('[Analytics] Metric:', metric);
}
