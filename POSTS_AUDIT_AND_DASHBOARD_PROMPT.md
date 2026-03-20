# 📊 POSTS SECTION AUDIT & DASHBOARD FEATURE PROMPT

## 🔍 CURRENT POSTS AUDIT

### Post Types Available

The Posts section currently supports **3 distinct post categories**:

#### 1️⃣ **OFFER POSTS** (`category: 'offer'`)
**Purpose:** Promote special deals, discounts, limited-time offers

**Visual Features:**
- 🏆 Gold gradient badge with sparkles icon (top-left overlay)
- ⏰ Countdown timer badge (top-right, shows days remaining)
- 🎨 Gold border (#CBA258) with rounded corners and shadow
- 💛 Gold-themed product tags

**Required Fields:**
- `id` (number)
- `author` (string) - "Starbucks"
- `category` (string) - "offer"
- `media` (array) - Images/videos
- `description` (string) - Post caption
- `products` (array) - Product name & price
- `offerBadge` (string) - e.g., "BOGO", "30% OFF", "50% OFF"
- `offerEndDate` (string) - ISO date format "2026-01-25"

**Example Use Cases:**
- Happy Hour promotions
- Seasonal discounts
- BOGO deals
- Flash sales

---

#### 2️⃣ **EVENT POSTS** (`category: 'event'`)
**Purpose:** Announce events, workshops, community gatherings

**Visual Features:**
- 📅 Event date badge with calendar icon (top-left overlay)
- 🟢 Green badge and border (#00704A)
- 🎪 Event-themed styling throughout
- 💚 Green product tags

**Required Fields:**
- `id` (number)
- `author` (string) - "Starbucks"
- `category` (string) - "event"
- `media` (array) - Images/videos
- `description` (string) - Post caption
- `products` (array) - Product name & price
- `eventDate` (string) - ISO date format "2026-01-22"

**Example Use Cases:**
- Live music nights
- Coffee tasting workshops
- Community meetups
- Seasonal celebrations

---

#### 3️⃣ **REGULAR POSTS** (`category: 'regular'`)
**Purpose:** Standard content - products, lifestyle, brand storytelling

**Visual Features:**
- 📸 Clean Instagram-style layout
- ⚪ No special badges or borders
- 🎯 Focus on content and imagery
- 🖤 Standard gray product tags

**Required Fields:**
- `id` (number)
- `author` (string) - "Starbucks"
- `category` (string) - "regular"
- `media` (array) - Images/videos
- `description` (string) - Post caption
- `products` (array) - Product name & price

**Example Use Cases:**
- Product showcases
- Behind-the-scenes content
- Lifestyle imagery
- Coffee culture posts

---

### Media Carousel System

**All posts support MULTIPLE MEDIA ITEMS** (Instagram-style carousel):

```typescript
media: [
  { type: 'image', url: 'https://...' },
  { type: 'video', url: 'https://...' },
  { type: 'image', url: 'https://...' }
]
```

**Features:**
- ✅ Mix images and videos in any order
- ✅ Users swipe horizontally to browse
- ✅ Dots indicator shows position
- ✅ Auto-play for videos
- ✅ Optimized loading and performance

---

### Post Interactions

**Every post includes:**
- ❤️ Like button (with count)
- 💬 Comment button (with count)
- 📤 Share button
- 👁️ View counter (tracks unique views, persisted in localStorage)

---

## 🎯 DASHBOARD FEATURE REQUIREMENTS

### Core Features Needed

#### 1. **Admin Dashboard UI**
- Floating action button to open dashboard
- Full-screen modal/page for creating posts
- Category selector (Offer / Event / Regular)
- Form that adapts based on selected category

#### 2. **Post Creation Form**

**Universal Fields (all categories):**
- Post description (textarea)
- Media uploader (multiple files, images + videos)
- Product tags:
  - Product name (text input)
  - Product price (number input, ₹)
  - Add/Remove product rows dynamically

**Category-Specific Fields:**

**For Offer Posts:**
- Offer badge text (input: "BOGO", "30% OFF", etc.)
- Offer end date (date picker)

**For Event Posts:**
- Event date (date picker)

**For Regular Posts:**
- No additional fields

#### 3. **Media Upload System**
- Drag & drop interface
- Support for images (JPG, PNG) and videos (MP4)
- Upload to Supabase Storage bucket
- Preview uploaded media before posting
- Reorder media items (drag to reorder)
- Delete individual media items

#### 4. **Backend Integration**

**Server Endpoints Needed:**
- `POST /make-server-90d6047b/create-post` - Create new post
- `GET /make-server-90d6047b/posts` - Fetch all posts
- `DELETE /make-server-90d6047b/posts/:id` - Delete post (admin only)

**Storage Strategy:**
- Store post data in KV store: `post:{id}` format
- Store media files in Supabase Storage bucket: `make-90d6047b-posts-media`
- Use `getByPrefix('post:')` to retrieve all posts
- Posts sorted by creation timestamp (newest first)

#### 5. **Posts Persistence**
- **Posts = PERMANENT** - Once uploaded, always visible
- No expiration logic for posts
- Admin can manually delete if needed
- Posts loaded from server on app start

---

## 📖 STORIES EXPIRATION SYSTEM REQUIREMENTS

### Current Stories System
Stories are currently:
- Loaded dynamically from `/data/storiesData.ts`
- Base stories (NPS, Combo, Master Brewer) + uploaded videos

### New Requirements

#### 1. **Story Expiration Logic**
- Each story should have a `createdAt` timestamp
- Stories expire after **24 hours**
- Expired stories move to "Expired Stories Archive"

#### 2. **Story Data Structure Update**
```typescript
export interface Story {
  id: number;
  image: string;
  duration: number;
  isNPSSurvey?: boolean;
  isVideo?: boolean;
  videoUrl?: string;
  createdAt?: number; // NEW: Unix timestamp
  expiresAt?: number; // NEW: Unix timestamp (createdAt + 24 hours)
}
```

#### 3. **Active vs Expired Stories**

**Active Stories:**
- Show in main stories ring (top of homepage)
- Auto-open on first visit
- Current time < expiresAt

**Expired Stories:**
- Archived in a separate list
- Accessible via "View Expired Stories" button
- Stored in KV store: `expired_story:{id}`

#### 4. **Expiration Flow**
1. User uploads story video → `createdAt` = now, `expiresAt` = now + 24h
2. App checks expiration on load: `if (now > expiresAt)`
3. If expired:
   - Move from `uploaded_video:{timestamp}` to `expired_story:{id}`
   - Remove from active stories array
   - Add to expired stories list

#### 5. **Expired Stories UI**
- New section in Profile or Home page
- Button: "📦 View Expired Stories (12)"
- Opens grid view of expired stories
- Tap to replay
- Shows original creation date

---

## 🚀 IMPLEMENTATION PROMPT

### Prompt for Building the Dashboard

```
I need you to build a complete Admin Dashboard feature for creating and managing posts in my Starbucks web application. Here are the detailed requirements:

**FEATURE OVERVIEW:**
Create an admin dashboard that allows me to create posts with 3 different categories:
1. Offer Posts - with badges and countdown timers
2. Event Posts - with event dates
3. Regular Posts - standard content

**DASHBOARD UI:**
- Add a floating action button (FAB) on the homepage (bottom-right, above bottom nav)
- FAB icon: Plus (+) symbol in Starbucks Green (#00704A)
- Clicking FAB opens full-screen dashboard modal

**POST CREATION FORM:**
The form should have these sections:

1. **Category Selector** (required)
   - Radio buttons or tabs: Offer | Event | Regular
   - Form dynamically shows/hides fields based on selection

2. **Media Upload Section** (required)
   - Drag & drop zone for images and videos
   - Support multiple files (images: JPG/PNG, videos: MP4)
   - Show preview thumbnails after upload
   - Allow reordering (drag thumbnails to reorder)
   - Delete button on each thumbnail
   - Upload to Supabase Storage bucket: `make-90d6047b-posts-media`

3. **Description Field** (required)
   - Textarea for post caption
   - Character limit: 500 characters
   - Show remaining character count

4. **Product Tags Section** (optional)
   - Dynamic form rows (Add Product / Remove Product)
   - Each row has:
     - Product Name (text input)
     - Product Price (number input with ₹ symbol)
   - "Add Product" button to add more rows

5. **Category-Specific Fields:**
   - **For Offer Posts:**
     - Offer Badge Text (input: "BOGO", "30% OFF")
     - Offer End Date (date picker)
   - **For Event Posts:**
     - Event Date (date picker)

6. **Action Buttons:**
   - "Publish Post" (primary button, Starbucks Green)
   - "Cancel" (secondary button)

**BACKEND IMPLEMENTATION:**

Create these server endpoints in `/supabase/functions/server/index.tsx`:

1. `POST /make-server-90d6047b/create-post`
   - Accept form data with media files
   - Upload media to Supabase Storage
   - Generate signed URLs (10-year expiration)
   - Store post data in KV store with key: `post:{timestamp}`
   - Return success with post ID

2. `GET /make-server-90d6047b/posts`
   - Retrieve all posts using `kv.getByPrefix('post:')`
   - Sort by timestamp (newest first)
   - Return posts array

3. `DELETE /make-server-90d6047b/posts/:id` (optional, for admin)
   - Delete post from KV store
   - Delete media files from Storage

**FRONTEND INTEGRATION:**

1. Update `/data/posts.ts`:
   - Change from static array to dynamic loading
   - Fetch posts from server on app start
   - Cache in state

2. Update `/components/PostsPage.tsx`:
   - Load posts from server instead of static import
   - Show loading state while fetching

3. Create new component: `/components/admin/PostsDashboard.tsx`
   - Full dashboard UI with form
   - Media upload logic
   - Form validation
   - API integration

**POSTS PERSISTENCE:**
- Posts should be PERMANENT (no expiration)
- Always visible in feed until manually deleted
- Loaded from server on every app start

**STYLING:**
- Match Starbucks brand colors (Green #00704A, Gold #CBA258)
- Use SoDo Sans font family
- Responsive design (mobile-first)
- Smooth animations using Motion

**VALIDATION:**
- Category is required
- At least 1 media item required
- Description is required (max 500 chars)
- Offer posts require badge text and end date
- Event posts require event date
- Product prices must be positive numbers

Please implement this complete dashboard feature with all backend endpoints, UI components, and integration with the existing posts system.
```

---

### Prompt for Stories Expiration System

```
I need you to implement a Stories Expiration System for my Starbucks web application. Currently, stories last forever - I need them to expire after 24 hours and move to an "Expired Stories" archive.

**REQUIREMENTS:**

1. **Update Story Data Structure:**
   - Add `createdAt` timestamp (number) - when story was created
   - Add `expiresAt` timestamp (number) - createdAt + 24 hours
   - Update interface in `/data/storiesData.ts`

2. **Expiration Logic:**
   - When uploading a new story video:
     - Set `createdAt` = Date.now()
     - Set `expiresAt` = Date.now() + (24 * 60 * 60 * 1000)
   
   - On app load:
     - Check all stories: if `Date.now() > story.expiresAt`
     - If expired:
       - Remove from active stories
       - Move to expired stories list
       - Store in KV with key: `expired_story:{id}`

3. **Server Endpoints:**
   - Update `POST /make-server-90d6047b/upload-video`:
     - Add `createdAt` and `expiresAt` to video metadata
   
   - Update `GET /make-server-90d6047b/uploaded-videos`:
     - Filter out expired stories
     - Return only active stories (where now < expiresAt)
   
   - Create `POST /make-server-90d6047b/expire-stories`:
     - Check all stories for expiration
     - Move expired ones to separate storage
     - Return list of expired story IDs
   
   - Create `GET /make-server-90d6047b/expired-stories`:
     - Retrieve all expired stories
     - Sort by creation date (newest first)

4. **Frontend Updates:**
   - Update `/App.tsx`:
     - Fetch active stories on load
     - Filter by expiration automatically
   
   - Update stories display:
     - Only show non-expired stories in main ring
   
   - Create "Expired Stories" section:
     - Add button: "📦 View Expired Stories (12)"
     - Opens modal/page with grid of expired stories
     - Tappable to replay
     - Shows creation date

5. **UI for Expired Stories:**
   - New component: `/components/ExpiredStoriesViewer.tsx`
   - Grid layout (3 columns on mobile)
   - Each item shows:
     - Thumbnail (video preview or image)
     - Creation date
     - Duration indicator
   - Tap to open full-screen replay

6. **Base Stories (NPS, Combo, Master Brewer):**
   - These should NEVER expire (no createdAt/expiresAt)
   - Only user-uploaded video stories expire

**PERSISTENCE:**
- Active stories: `uploaded_video:{timestamp}` in KV store
- Expired stories: `expired_story:{id}` in KV store
- Automatic cleanup runs on app load

**VISUAL INDICATORS:**
- Active stories: Green ring (unviewed) / Gray ring (viewed)
- Expired stories section: Gold/amber theme to indicate archive

Please implement this complete expiration system with backend logic, frontend filtering, and the expired stories archive UI.
```

---

## 📋 SUMMARY

### Current State
✅ **3 Post Types:** Offer, Event, Regular  
✅ **Media Carousel:** Multiple images/videos per post  
✅ **Interactions:** Like, comment, share, view tracking  
✅ **Static Data:** Posts hardcoded in `/data/posts.ts`  
✅ **Stories:** No expiration, persistent forever  

### What's Needed
❌ **Admin Dashboard:** Create/manage posts via UI  
❌ **Dynamic Posts:** Load from server, not static file  
❌ **Stories Expiration:** 24-hour auto-expiration  
❌ **Expired Stories Archive:** View past stories  
❌ **Media Upload:** Drag & drop for posts  
❌ **Backend API:** CRUD endpoints for posts  

---

## 🎨 DESIGN NOTES

**Dashboard FAB Position:**
- Bottom-right corner
- 16px from right edge
- 96px from bottom (above bottom nav)
- z-index: 40 (below stories viewer but above content)

**Color Palette:**
- Primary Action: Starbucks Green (#00704A)
- Offer Theme: Gold (#CBA258)
- Event Theme: Dark Green (#1e3932)
- Regular: Neutral grays

**Typography:**
- Headings: SoDo Sans Bold
- Body: SoDo Sans Regular
- Accents: Lander (serif) for elegance

---

**End of Audit Document**
