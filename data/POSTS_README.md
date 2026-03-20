# 📱 Starbucks Posts Management Guide

This guide explains how to easily add, update, or remove posts in the Starbucks app.

## 🎯 Quick Start

All post content is managed in a single file: **`/data/posts.ts`**

Simply edit this file to update what appears in the Posts/Drops section of the app.

---

## 📝 Adding a New Post

### Step 1: Open `/data/posts.ts`

### Step 2: Add a new post object to the `posts` array:

```typescript
{
  id: 7,                          // Use a unique number
  author: 'Starbucks',            // Keep as 'Starbucks'
  image: 'YOUR_IMAGE_URL_HERE',   // Image URL (see formats below)
  video: undefined,               // Or video URL if it's a video post
  description: 'Your caption here ☕',
  products: [                     // Featured products (optional)
    { name: 'Product Name', price: 4.95 },
    { name: 'Another Product', price: 5.45 }
  ]
}
```

### Step 3: Save the file - that's it! ✨

---

## 🖼️ Image Posts

For image posts, set the `image` property and leave `video` as `undefined`:

```typescript
{
  id: 8,
  author: 'Starbucks',
  image: 'https://images.unsplash.com/photo-XXXXXX',  // Image URL
  video: undefined,                                    // No video
  description: 'Fresh brewed coffee ☕',
  products: [
    { name: 'Pike Place Roast', price: 2.95 }
  ]
}
```

### Supported Image Formats:
- ✅ Unsplash URLs: `https://images.unsplash.com/photo-...`
- ✅ Direct URLs: `https://example.com/image.jpg`
- ✅ Figma Assets: `import img from "figma:asset/xyz.png"` then use `image: img`

---

## 🎥 Video Posts

For video posts, set the `video` property and leave `image` empty:

```typescript
{
  id: 9,
  author: 'Starbucks',
  image: '',                                           // No image
  video: 'https://example.com/video.mp4',              // Video URL
  description: 'Behind the scenes at Starbucks 🎬',
  products: []
}
```

### Supported Video Formats:
- ✅ MP4: `.mp4`
- ✅ WebM: `.webm`
- ✅ Direct video URLs

### Video Features:
- ✨ Auto-plays when scrolled into view
- ✨ Loops automatically
- ✨ Muted by default with unmute button
- ✨ Pauses when scrolled away

---

## ✏️ Editing Existing Posts

### To Update Media:

1. Find the post by its `id` in `/data/posts.ts`
2. Replace the `image` or `video` URL
3. Save the file

Example:
```typescript
// Before
{
  id: 2,
  image: 'https://old-image-url.com/photo.jpg',
  // ...
}

// After
{
  id: 2,
  image: 'https://new-image-url.com/photo.jpg',  // ✅ Updated!
  // ...
}
```

### To Update Description:

```typescript
{
  id: 2,
  description: 'New caption text here! ☕✨',  // ✅ Updated!
  // ...
}
```

### To Update Products:

```typescript
{
  id: 2,
  products: [
    { name: 'New Product', price: 6.95 },      // ✅ Updated!
    { name: 'Another One', price: 4.95 }
  ]
}
```

---

## 🗑️ Removing a Post

Simply delete the entire post object from the `posts` array:

```typescript
// Before
export const posts: Post[] = [
  { id: 1, ... },
  { id: 2, ... },  // 👈 Delete this entire object
  { id: 3, ... },
];

// After
export const posts: Post[] = [
  { id: 1, ... },
  { id: 3, ... },  // ✅ Post removed!
];
```

---

## 🎨 Post Display Order

Posts appear in the order they're listed in the array:
- First post in array = First post users see
- Last post in array = Last post users see

To reorder, simply move the objects around in the array.

---

## 📦 Complete Post Template

Copy and paste this template when adding new posts:

```typescript
{
  id: UNIQUE_NUMBER_HERE,
  author: 'Starbucks',
  image: 'IMAGE_URL_HERE',           // For image posts
  video: undefined,                   // For video posts: 'VIDEO_URL_HERE'
  description: 'Your caption here',
  products: [
    { name: 'Product 1', price: 4.95 },
    { name: 'Product 2', price: 5.45 }
  ]
}
```

---

## 🔍 Example: Adding Multiple Posts at Once

```typescript
export const posts: Post[] = [
  // Existing posts...
  
  // ✅ New Image Post
  {
    id: 10,
    author: 'Starbucks',
    image: 'https://images.unsplash.com/photo-new1',
    video: undefined,
    description: 'Cozy winter vibes ❄️☕',
    products: [
      { name: 'Peppermint Mocha', price: 5.95 }
    ]
  },
  
  // ✅ New Video Post
  {
    id: 11,
    author: 'Starbucks',
    image: '',
    video: 'https://example.com/brewing-video.mp4',
    description: 'The perfect brew process 🎬',
    products: []
  }
];
```

---

## 🚀 Tips & Best Practices

### 1. **Always use unique IDs**
   - Never reuse an ID
   - Use sequential numbers (1, 2, 3, 4...)

### 2. **Test your URLs**
   - Make sure images/videos load before adding
   - Use high-quality media for best results

### 3. **Write engaging descriptions**
   - Keep them short and punchy
   - Use emojis to add personality ✨☕🎉

### 4. **Products are optional**
   - Leave products array empty `[]` if not needed
   - Or remove the products property entirely

### 5. **Optimize images**
   - Unsplash URLs are automatically optimized
   - For other sources, use web-optimized images

---

## 📂 File Structure

```
/data/
  ├── posts.ts              ← Edit this file to manage posts
  └── POSTS_README.md       ← This guide

/components/posts/
  ├── PostItem.tsx          ← Individual post component (don't edit)
  └── CommentDialog.tsx     ← Comments UI (don't edit)

/components/
  └── PostsPage.tsx         ← Main posts page (don't edit)
```

---

## ❓ Common Questions

### Q: Can I use local images?
A: Yes! Use the Figma asset import system:
```typescript
import myImage from "figma:asset/image-id.png";
// Then use: image: myImage
```

### Q: How many posts can I add?
A: As many as you want! The app uses virtual scrolling for performance.

### Q: Can I change the author name?
A: Yes, but keep it as "Starbucks" for brand consistency.

### Q: What if I make a mistake?
A: No worries! Just edit the file again or undo your changes (Ctrl+Z / Cmd+Z).

---

## ✅ Checklist for Adding a Post

- [ ] Opened `/data/posts.ts`
- [ ] Added new post object with unique ID
- [ ] Added image URL or video URL
- [ ] Wrote description
- [ ] Added products (if needed)
- [ ] Saved the file
- [ ] Tested in the app

---

**Need help?** The structure is simple - just follow the examples in `/data/posts.ts`! 🎉
