# 📊 Posts Feature Architecture

## 🎯 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  👤 YOU                                                 │
│  "Add this image: https://example.com/coffee.jpg"      │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  📄 /data/posts.ts                                      │
│  ┌───────────────────────────────────────────────┐     │
│  │ export const posts = [                        │     │
│  │   {                                           │     │
│  │     id: 7,                                    │     │
│  │     image: 'https://example.com/coffee.jpg',  │  ← EDIT HERE
│  │     description: 'Fresh coffee ☕',           │     │
│  │     products: [...]                           │     │
│  │   }                                           │     │
│  │ ]                                             │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  📱 /components/PostsPage.tsx                           │
│  ┌───────────────────────────────────────────────┐     │
│  │ - Imports posts from /data/posts.ts           │     │
│  │ - Manages likes, comments, views              │     │
│  │ - Handles video playback                      │     │
│  │ - Coordinates PostItem & CommentDialog        │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
               ↓                      ↓
┌──────────────────────┐    ┌──────────────────────┐
│                      │    │                      │
│  PostItem.tsx        │    │  CommentDialog.tsx   │
│  ┌────────────────┐  │    │  ┌────────────────┐  │
│  │ - Displays     │  │    │  │ - Shows        │  │
│  │   image/video  │  │    │  │   comments     │  │
│  │ - Like button  │  │    │  │ - Add comment  │  │
│  │ - Comment btn  │  │    │  │ - Submit       │  │
│  │ - Share button │  │    │  │                │  │
│  │ - View count   │  │    │  │                │  │
│  └────────────────┘  │    │  └────────────────┘  │
│                      │    │                      │
└──────────────────────┘    └──────────────────────┘
               │                      │
               └──────────┬───────────┘
                          ↓
                   ┌──────────────┐
                   │              │
                   │  📱 App UI   │
                   │              │
                   └──────────────┘
```

---

## 🗂️ File Structure

```
📁 Starbucks App
│
├── 📁 /data                          ← YOUR CONTENT LIVES HERE
│   │
│   ├── 📄 posts.ts                   ← ⭐ EDIT THIS FILE TO ADD/UPDATE POSTS
│   │   └── Contains:
│   │       • All post data (images, videos, descriptions)
│   │       • Product information
│   │       • Post IDs and metadata
│   │
│   ├── 📄 POSTS_README.md            ← Full documentation
│   ├── 📄 POSTS_QUICK_GUIDE.md       ← Quick reference
│   └── 📄 POSTS_STRUCTURE.md         ← This file
│
├── 📁 /components
│   │
│   ├── 📄 PostsPage.tsx              ← Main controller
│   │   └── Responsibilities:
│   │       • Load posts from /data/posts.ts
│   │       • Manage interactions (likes, comments)
│   │       • Track views
│   │       • Handle video playback
│   │       • Coordinate child components
│   │
│   └── 📁 /posts
│       │
│       ├── 📄 PostItem.tsx           ← Individual post display
│       │   └── Responsibilities:
│       │       • Render image or video
│       │       • Display like/comment/share buttons
│       │       • Show view count
│       │       • Handle mute/unmute for videos
│       │       • Display author info
│       │
│       └── 📄 CommentDialog.tsx      ← Comments popup
│           └── Responsibilities:
│               • Display existing comments
│               • Input field for new comments
│               • Submit comments
│               • Close/open animations
│
└── 📁 /utils
    └── 📄 imageOptimization.ts       ← Image performance helpers
```

---

## 📋 Component Relationships

```
PostsPage
    │
    ├─→ PostItem (for each post)
    │   │
    │   ├─→ Image/Video Element
    │   ├─→ Like Button
    │   ├─→ Comment Button
    │   ├─→ Share Button
    │   └─→ View Counter
    │
    └─→ CommentDialog
        │
        ├─→ Comments List
        └─→ Comment Input Field
```

---

## 🔄 Data Flow Example

### Scenario: User adds a new post image

```
Step 1: You provide URL
┌──────────────────────────────────┐
│ "Add image: coffee.jpg"          │
└──────────────────────────────────┘
                ↓
Step 2: I edit /data/posts.ts
┌──────────────────────────────────┐
│ posts.push({                     │
│   id: 7,                         │
│   image: 'coffee.jpg',           │
│   description: '...'             │
│ })                               │
└──────────────────────────────────┘
                ↓
Step 3: PostsPage imports updated data
┌──────────────────────────────────┐
│ import { posts } from            │
│   '../data/posts'                │
│                                  │
│ // posts now has 7 items!        │
└──────────────────────────────────┘
                ↓
Step 4: PostsPage renders all posts
┌──────────────────────────────────┐
│ posts.map(post =>                │
│   <PostItem post={post} />       │
│ )                                │
└──────────────────────────────────┘
                ↓
Step 5: User sees new post in app!
┌──────────────────────────────────┐
│     📱 App Display               │
│  ┌────────────────────────┐      │
│  │  [New Coffee Image]    │      │
│  │  ❤️ 0  💬 0  ↗️        │      │
│  └────────────────────────┘      │
└──────────────────────────────────┘
```

---

## 🎨 What Each Part Does

### `/data/posts.ts` - The Content Database
- **Input**: Your images/videos URLs
- **Output**: Structured post objects
- **You edit**: ✅ YES - Edit this anytime
- **Format**: TypeScript array of objects

### `PostsPage.tsx` - The Brain
- **Input**: Posts from /data/posts.ts
- **Output**: Rendered post feed
- **You edit**: ❌ NO - Don't need to
- **Purpose**: Manages state, interactions, loading

### `PostItem.tsx` - The Display
- **Input**: Single post object
- **Output**: Visual post card
- **You edit**: ❌ NO - Don't need to
- **Purpose**: Shows media, buttons, interactions

### `CommentDialog.tsx` - The Comments
- **Input**: Array of comments
- **Output**: Comments popup UI
- **You edit**: ❌ NO - Don't need to
- **Purpose**: Display and add comments

---

## ⚡ Key Features

### Automatic Features
✅ Posts auto-play when scrolled into view (videos)  
✅ Posts pause when scrolled away (videos)  
✅ View counts increment automatically  
✅ Like button becomes disabled after liking  
✅ Comments update in real-time  
✅ Mute/unmute for videos  
✅ Image optimization for performance  

### User Interactions
- **Like**: One-time like per post
- **Comment**: Unlimited comments
- **Share**: Placeholder (can be implemented)
- **Mute**: Toggle video sound
- **View**: Tracked automatically

---

## 🚀 How to Use This Structure

### For Adding Content (You):
1. Open `/data/posts.ts`
2. Add/edit post objects
3. Save file
4. Done!

### For Bulk Updates (Me):
1. You provide multiple URLs
2. I add them all to `/data/posts.ts`
3. Each gets unique ID
4. Each gets nice description
5. All appear in app!

### For Complex Changes (Me):
- Update UI components if needed
- Modify interactions
- Add new features
- Optimize performance

---

## 📦 Post Object Structure

```typescript
{
  id: number,              // Unique identifier (1, 2, 3...)
  author: string,          // Always "Starbucks"
  image?: string,          // Image URL (for image posts)
  video?: string,          // Video URL (for video posts)
  description: string,     // Post caption
  products: Array<{        // Featured products
    name: string,
    price: number
  }>
}
```

---

## 🎯 Quick Actions

| Action | File to Edit | What to Change |
|--------|-------------|----------------|
| Add new post | `/data/posts.ts` | Add new object to `posts` array |
| Update image | `/data/posts.ts` | Change `image` URL |
| Update video | `/data/posts.ts` | Change `video` URL |
| Change caption | `/data/posts.ts` | Edit `description` |
| Remove post | `/data/posts.ts` | Delete post object |
| Reorder posts | `/data/posts.ts` | Move objects in array |

---

## 💡 Best Practices

### ✅ DO:
- Edit `/data/posts.ts` for content changes
- Use unique sequential IDs (1, 2, 3, 4...)
- Test URLs before adding
- Keep descriptions concise
- Use high-quality images/videos

### ❌ DON'T:
- Edit PostsPage.tsx, PostItem.tsx, or CommentDialog.tsx (unless necessary)
- Reuse IDs
- Use broken URLs
- Mix up image and video properties

---

## 🔍 Troubleshooting

### Post not showing?
- Check the `id` is unique
- Verify URL is accessible
- Ensure it's in the `posts` array

### Video not playing?
- Check video URL is direct (ends in .mp4, .webm)
- Verify `video` property is set (not `image`)
- Check browser console for errors

### Image not loading?
- Verify image URL is accessible
- Check `image` property is set (not `video`)
- Try opening URL in browser

---

**This structure makes it super easy to manage posts!** 🎉

Just remember: **Edit `/data/posts.ts`** for all content changes!
