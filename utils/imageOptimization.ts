/**
 * Image optimization utilities for performance improvements
 */

/**
 * Optimizes Unsplash image URLs to use WebP format and appropriate sizing
 * @param url - Original Unsplash URL
 * @param width - Desired width (default: 800)
 * @param quality - Image quality 1-100 (default: 80)
 */
export function optimizeUnsplashUrl(url: string, width: number = 800, quality: number = 80): string {
  if (!url.includes('unsplash.com')) return url;
  
  // Parse the URL
  const urlObj = new URL(url);
  
  // Update parameters for optimization
  urlObj.searchParams.set('fm', 'webp'); // Use WebP format
  urlObj.searchParams.set('w', width.toString()); // Set width
  urlObj.searchParams.set('q', quality.toString()); // Set quality
  urlObj.searchParams.set('fit', 'max'); // Ensure max fit
  
  return urlObj.toString();
}

/**
 * Generates srcset for responsive images
 * @param url - Original image URL
 * @param sizes - Array of widths to generate
 */
export function generateSrcSet(url: string, sizes: number[] = [400, 800, 1200]): string {
  if (!url.includes('unsplash.com')) return '';
  
  return sizes
    .map(width => `${optimizeUnsplashUrl(url, width, 80)} ${width}w`)
    .join(', ');
}

/**
 * Resizes profile photo from Supabase with compression
 * Note: This creates a query parameter approach - actual resizing would need server-side
 * implementation or image processing service
 */
export function optimizeProfilePhoto(url: string, size: number = 200): string {
  if (!url) return '';
  
  // For Supabase signed URLs, we'd need server-side resizing
  // This is a placeholder that could integrate with image processing
  return url;
}

/**
 * Compresses and resizes uploaded images before upload
 * @param file - File to compress
 * @param maxWidth - Maximum width (default: 1200)
 * @param quality - Quality 0-1 (default: 0.85)
 */
export async function compressImage(
  file: File, 
  maxWidth: number = 1200, 
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Could not compress image'));
            }
          },
          'image/webp', // Use WebP format
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Generates appropriate sizes attribute for responsive images
 */
export function getImageSizes(type: 'story' | 'product' | 'banner' | 'profile' | 'post'): string {
  const sizes = {
    story: '(max-width: 430px) 430px, 800px',
    product: '(max-width: 430px) 140px, 200px',
    banner: '(max-width: 430px) 430px, 800px',
    profile: '(max-width: 430px) 49px, 100px',
    post: '(max-width: 430px) 430px, 800px'
  };
  
  return sizes[type] || '100vw';
}
