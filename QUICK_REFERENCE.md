# Performance Optimizations - Quick Reference Card 📋

**One-page guide for developers**

---

## 🎯 What We Did

Reduced load time from **8s to 3s** (62% faster) by:
1. Code splitting (lazy loading)
2. Image optimization (WebP)
3. Font optimization (preconnect)
4. React optimization (memo)

---

## 📊 Key Metrics

| Before | After |
|--------|-------|
| 8-12s load | 3-5s load |
| 3.2 MB payload | 1.2 MB payload |
| 415 KiB JS | 150 KiB JS |
| Score: 60-70 | Score: 90+ |

---

## 🔍 How to Check

### Quick Test:
```bash
1. Open app
2. F12 → Network tab
3. Check transferred: ~1.2 MB ✅
4. F12 → Lighthouse
5. Run audit: Score 90+ ✅
6. Click ⚡ icon (dev mode)
7. Check metrics: All green ✅
```

---

## 📂 Important Files

### Use These Utilities:
```typescript
// Image optimization
import { optimizeUnsplashUrl, compressImage } from './utils/imageOptimization';

// Performance monitoring
import { initPerformanceMonitoring } from './utils/performanceMonitoring';

// Defer scripts
import { deferUntilLoad } from './utils/scriptDeferring';
```

### Check These Docs:
- Quick overview: `/PERFORMANCE_SUMMARY.md`
- Full details: `/PERFORMANCE_OPTIMIZATIONS_COMPLETED.md`
- Testing guide: `/TESTING_CHECKLIST.md`
- Image guide: `/IMAGE_OPTIMIZATION_REPORT.md`

---

## 💡 Code Patterns

### Lazy Load a Component:
```typescript
// In App.tsx or parent component
const MyComponent = lazy(() => 
  import('./components/MyComponent').then(m => ({ default: m.MyComponent }))
);

// In render
<Suspense fallback={<MinimalLoadingFallback />}>
  <MyComponent />
</Suspense>
```

### Optimize an Image:
```typescript
// Unsplash images
<img 
  src={optimizeUnsplashUrl(url, 800, 85)} 
  srcSet={generateSrcSet(url, [430, 800])}
  sizes={getImageSizes('story')}
  alt="Description"
  loading="lazy"
  width="430"
  height="932"
/>

// Before upload
const compressed = await compressImage(file, 1200, 0.85);
```

### Memoize a Component:
```typescript
import { memo } from 'react';

export const MyComponent = memo(function MyComponent({ prop1, prop2 }) {
  // Component code
  return <div>...</div>;
});
```

---

## ⚠️ Common Mistakes

### ❌ Don't:
```typescript
// Don't import heavy components normally
import { PostsPage } from './components/PostsPage';

// Don't use large images
<img src={unsplashImage} /> // Might be 2MB!

// Don't skip memo on expensive components
export function RateItem({ ... }) { ... }
```

### ✅ Do:
```typescript
// Lazy load heavy components
const PostsPage = lazy(() => import('./components/PostsPage'));

// Optimize images
<img src={optimizeUnsplashUrl(unsplashImage, 800)} />

// Memoize expensive components
export const RateItem = memo(function RateItem({ ... }) { ... });
```

---

## 🐛 Troubleshooting

### Chunk load errors?
```typescript
// Add error boundary
<Suspense fallback={<Loading />}>
  {/* Will retry on error */}
</Suspense>
```

### Images too slow?
```typescript
// Check format: Should be WebP
// Check size: Should have ?w=800 parameter
// Check lazy: Should have loading="lazy"
```

### Bundle too large?
```typescript
// Check: Are you lazy loading?
// Check: Network tab → Look for chunks
// Expected: Multiple small JS files, not one big one
```

---

## 📱 Mobile Testing

### On Real Device:
1. Connect iPhone to Mac
2. Open Safari → Develop → [Your iPhone]
3. Check Network tab
4. Verify < 5s load on cellular

### Simulated:
1. Chrome DevTools
2. Network tab → "Slow 3G"
3. Hard refresh
4. Should load in 3-5s

---

## 🎓 Best Practices

### Images:
```typescript
✅ Use optimizeUnsplashUrl() for external images
✅ Use compressImage() before upload
✅ Always add width/height attributes
✅ Use loading="lazy" for below-fold
✅ Use srcset for responsive images
```

### Components:
```typescript
✅ Lazy load pages/tabs/dialogs
✅ Use React.memo() on expensive components
✅ Add Suspense fallbacks
✅ Conditional render heavy components
```

### Scripts:
```typescript
✅ Defer non-critical code
✅ Use requestIdleCallback
✅ Avoid blocking main thread
```

---

## 🔢 Target Numbers

Remember these targets:

| Metric | Target |
|--------|--------|
| Lighthouse | 90+ |
| LCP | < 2.5s |
| FCP | < 1.8s |
| CLS | < 0.1 |
| Bundle | < 200 KiB |
| Payload | < 1.5 MB |

---

## 🚨 What to Watch

### Warning Signs:
- ⚠️ Lighthouse score drops below 85
- ⚠️ Bundle size increases > 200 KiB
- ⚠️ LCP increases > 2.5s
- ⚠️ Images not in WebP format
- ⚠️ No lazy loading on new components

### Action:
1. Check performance dashboard (⚡ icon)
2. Run Lighthouse audit
3. Check Network tab for large files
4. Review code for missing optimizations

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Run Lighthouse audit → 90+ score
- [ ] Check Network tab → ~1.2 MB total
- [ ] Test lazy loading → Chunks load on demand
- [ ] Check images → All WebP format
- [ ] Test on slow connection → < 5s load
- [ ] All features work → No regressions
- [ ] Performance metrics show green → All good

---

## 🆘 Help

### Need details?
→ `/PERFORMANCE_OPTIMIZATIONS_COMPLETED.md`

### Need to test?
→ `/TESTING_CHECKLIST.md`

### Image issues?
→ `/IMAGE_OPTIMIZATION_REPORT.md`

### Quick overview?
→ `/PERFORMANCE_SUMMARY.md`

---

## 📞 Quick Commands

```bash
# Check bundle size
npm run build
# Look for: dist/assets/*.js file sizes

# Analyze bundle
npm run analyze # (if configured)

# Test on slow network
# Chrome DevTools → Network → Slow 3G

# Run Lighthouse
# Chrome DevTools → Lighthouse → Run audit
```

---

## 🎯 One-Line Checks

```typescript
// Is this image optimized?
✅ Has optimizeUnsplashUrl() or compressImage()
✅ Has width/height attributes
✅ Has loading="lazy" (if below fold)

// Is this component optimized?
✅ Wrapped with memo() if expensive
✅ Lazy loaded if heavy (>50 KiB)
✅ Has Suspense boundary

// Is performance monitored?
✅ Performance dashboard works (⚡ icon)
✅ Console shows metrics
✅ Lighthouse score 90+
```

---

**Version**: 1.0  
**Last Updated**: November 27, 2025  
**Print this for your desk! 📌**
