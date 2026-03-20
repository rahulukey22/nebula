import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-eeaec47f/health", (c) => {
  return c.json({ status: "ok" });
});

// Session tracking endpoints
const SESSION_PREFIX = "session:";
const SESSION_TIMEOUT_MS = 300000; // 5 minutes - mark sessions as stale
const SESSION_IDLE_MS = 60000; // 1 minute - mark as idle if no activity

// Start a new session
app.post("/make-server-eeaec47f/sessions/start", async (c) => {
  try {
    const { sessionId, userId, deviceType, browserName, browserVersion, os, latitude, longitude } = await c.req.json();
    
    if (!sessionId || !userId) {
      return c.json({ error: "sessionId and userId are required" }, 400);
    }
    
    const key = `${SESSION_PREFIX}${sessionId}`;
    const timestamp = Date.now();
    
    // Check if session already exists
    const existingSession = await kv.get(key);
    
    const sessionData = {
      sessionId,
      userId,
      deviceType: deviceType || 'Unknown',
      browserName: browserName || 'Unknown',
      browserVersion: browserVersion || '',
      os: os || 'Unknown',
      sessionStartTime: existingSession?.sessionStartTime || timestamp,
      lastActivity: timestamp,
      latitude,
      longitude,
      city: existingSession?.city,
      region: existingSession?.region,
      country: existingSession?.country
    };
    
    await kv.set(key, sessionData);
    
    // Clean up stale sessions
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const currentTime = Date.now();
    
    for (const session of allSessions) {
      if (session.value && currentTime - session.value.lastActivity > SESSION_TIMEOUT_MS) {
        await kv.del(session.key);
      }
    }
    
    // Get active session count (unique users)
    const activeSessions = await kv.getByPrefix(SESSION_PREFIX);
    const uniqueUsers = new Set();
    activeSessions.forEach(s => {
      if (s.value && currentTime - s.value.lastActivity <= SESSION_TIMEOUT_MS) {
        uniqueUsers.add(s.value.userId);
      }
    });
    
    return c.json({ success: true, count: uniqueUsers.size });
  } catch (error) {
    console.error("Error starting session:", error);
    return c.json({ error: `Failed to start session: ${error}` }, 500);
  }
});

// End a session
app.post("/make-server-eeaec47f/sessions/end", async (c) => {
  try {
    const { sessionId } = await c.req.json();
    
    if (!sessionId) {
      return c.json({ error: "sessionId is required" }, 400);
    }
    
    const key = `${SESSION_PREFIX}${sessionId}`;
    await kv.del(key);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error ending session:", error);
    return c.json({ error: `Failed to end session: ${error}` }, 500);
  }
});

// Get current viewer count (unique users)
app.get("/make-server-eeaec47f/sessions/count", async (c) => {
  try {
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const currentTime = Date.now();
    
    // Filter out stale sessions and get unique users
    const uniqueUsers = new Set();
    for (const session of allSessions) {
      if (session.value && currentTime - session.value.lastActivity <= SESSION_TIMEOUT_MS) {
        uniqueUsers.add(session.value.userId);
      } else {
        // Clean up stale session
        await kv.del(session.key);
      }
    }
    
    return c.json({ count: uniqueUsers.size });
  } catch (error) {
    console.error("Error getting session count:", error);
    return c.json({ error: `Failed to get session count: ${error}` }, 500);
  }
});

// Session heartbeat with location update
app.post("/make-server-eeaec47f/sessions/heartbeat", async (c) => {
  try {
    const { sessionId, userId, latitude, longitude, deviceType, browserName, browserVersion, os } = await c.req.json();
    
    if (!sessionId || !userId) {
      return c.json({ error: "sessionId and userId are required" }, 400);
    }
    
    const key = `${SESSION_PREFIX}${sessionId}`;
    const existingSession = await kv.get(key);
    
    // Get location details if coordinates are provided and not already cached
    let city = existingSession?.city;
    let region = existingSession?.region;
    let country = existingSession?.country;
    
    if (latitude && longitude && !city) {
      try {
        // Using a free geocoding API (nominatim from OpenStreetMap)
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          {
            headers: {
              'User-Agent': 'Zudio-eReceipt-App'
            }
          }
        );
        
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          city = geoData.address?.city || geoData.address?.town || geoData.address?.village;
          region = geoData.address?.state || geoData.address?.county;
          country = geoData.address?.country;
        }
      } catch (geoError) {
        console.log("Geocoding failed, storing coordinates only:", geoError);
      }
    }
    
    const timestamp = Date.now();
    
    // Update session data
    const sessionData = {
      sessionId,
      userId,
      deviceType: deviceType || existingSession?.deviceType || 'Unknown',
      browserName: browserName || existingSession?.browserName || 'Unknown',
      browserVersion: browserVersion || existingSession?.browserVersion || '',
      os: os || existingSession?.os || 'Unknown',
      sessionStartTime: existingSession?.sessionStartTime || timestamp,
      lastActivity: timestamp,
      latitude: latitude || existingSession?.latitude,
      longitude: longitude || existingSession?.longitude,
      city,
      region,
      country
    };
    
    await kv.set(key, sessionData);
    
    // Get active session count (unique users)
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const currentTime = Date.now();
    const uniqueUsers = new Set();
    
    allSessions.forEach(s => {
      if (s.value && currentTime - s.value.lastActivity <= SESSION_TIMEOUT_MS) {
        uniqueUsers.add(s.value.userId);
      }
    });
    
    return c.json({ success: true, count: uniqueUsers.size });
  } catch (error) {
    console.error("Error updating session heartbeat:", error);
    return c.json({ error: `Failed to update heartbeat: ${error}` }, 500);
  }
});

// Get all active sessions (for developer mode)
app.get("/make-server-eeaec47f/sessions/all", async (c) => {
  try {
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const currentTime = Date.now();
    
    // Filter active sessions and extract their data
    const activeSessions = [];
    
    for (const session of allSessions) {
      if (session.value && currentTime - session.value.lastActivity <= SESSION_TIMEOUT_MS) {
        const sessionAge = currentTime - session.value.lastActivity;
        const sessionDuration = currentTime - session.value.sessionStartTime;
        const isIdle = sessionAge > SESSION_IDLE_MS;
        
        activeSessions.push({
          sessionId: session.value.sessionId,
          userId: session.value.userId,
          deviceType: session.value.deviceType,
          browserName: session.value.browserName,
          browserVersion: session.value.browserVersion,
          os: session.value.os,
          city: session.value.city,
          region: session.value.region,
          country: session.value.country,
          latitude: session.value.latitude,
          longitude: session.value.longitude,
          sessionStartTime: session.value.sessionStartTime,
          lastActivity: session.value.lastActivity,
          sessionDuration,
          isIdle,
          sessionAge
        });
      } else {
        // Clean up stale session
        await kv.del(session.key);
      }
    }
    
    // Group sessions by userId
    const sessionsByUser = activeSessions.reduce((acc, session) => {
      if (!acc[session.userId]) {
        acc[session.userId] = [];
      }
      acc[session.userId].push(session);
      return acc;
    }, {} as Record<string, typeof activeSessions>);
    
    return c.json({ 
      success: true, 
      sessions: activeSessions,
      sessionsByUser,
      totalSessions: activeSessions.length,
      uniqueUsers: Object.keys(sessionsByUser).length
    });
  } catch (error) {
    console.error("Error getting sessions:", error);
    return c.json({ error: `Failed to get sessions: ${error}` }, 500);
  }
});

// Storage bucket name for reviews
const REVIEWS_BUCKET = "make-eeaec47f-reviews";
// Storage bucket name for profile photos
const PROFILE_BUCKET = "make-eeaec47f-profiles";
// Storage bucket name for story videos
const VIDEOS_BUCKET = "make-90d6047b-videos";

// Initialize storage bucket on startup
async function initializeStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    
    // Initialize reviews bucket
    const reviewsBucketExists = buckets?.some(bucket => bucket.name === REVIEWS_BUCKET);
    if (!reviewsBucketExists) {
      const { error } = await supabase.storage.createBucket(REVIEWS_BUCKET, {
        public: false,
      });
      
      if (error && error.statusCode !== "409") {
        console.error("Error creating reviews bucket:", error);
      } else if (!error) {
        console.log("Reviews bucket created successfully");
      } else {
        console.log("Reviews bucket already exists");
      }
    } else {
      console.log("Reviews bucket already exists");
    }
    
    // Initialize profile photos bucket
    const profileBucketExists = buckets?.some(bucket => bucket.name === PROFILE_BUCKET);
    if (!profileBucketExists) {
      const { error } = await supabase.storage.createBucket(PROFILE_BUCKET, {
        public: false,
      });
      
      if (error && error.statusCode !== "409") {
        console.error("Error creating profile bucket:", error);
      } else if (!error) {
        console.log("Profile bucket created successfully");
      } else {
        console.log("Profile bucket already exists");
      }
    } else {
      console.log("Profile bucket already exists");
    }
    
    // Initialize story videos bucket
    const videosBucketExists = buckets?.some(bucket => bucket.name === VIDEOS_BUCKET);
    if (!videosBucketExists) {
      const { error } = await supabase.storage.createBucket(VIDEOS_BUCKET, {
        public: false,
      });
      
      if (error && error.statusCode !== "409") {
        console.error("Error creating videos bucket:", error);
      } else if (!error) {
        console.log("Videos bucket created successfully");
      } else {
        console.log("Videos bucket already exists");
      }
    } else {
      console.log("Videos bucket already exists");
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
  }
}

// Initialize on startup
initializeStorage();

// Upload review media endpoint
app.post("/make-server-eeaec47f/reviews/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const ext = file.name.split('.').pop() || 'bin';
    const filename = `${timestamp}-${randomStr}.${ext}`;
    
    // Read file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);
    
    // For video files, apply lossless compression using FFmpeg
    let finalBytes = fileBytes;
    let finalFilename = filename;
    
    if (file.type.startsWith('video/')) {
      try {
        // Write original file to temp
        const tempInputPath = `/tmp/input-${filename}`;
        await Deno.writeFile(tempInputPath, fileBytes);
        
        // Output will be WebM with VP9 codec (lossless mode)
        const tempOutputPath = `/tmp/output-${timestamp}-${randomStr}.webm`;
        
        // Use FFmpeg for lossless compression
        // -lossless 1 ensures VP9 operates in lossless mode
        const ffmpegProcess = new Deno.Command("ffmpeg", {
          args: [
            "-i", tempInputPath,
            "-c:v", "libvpx-vp9",
            "-lossless", "1",
            "-c:a", "libopus",
            "-b:a", "128k",
            tempOutputPath
          ],
          stdout: "piped",
          stderr: "piped",
        });
        
        const { code, stderr } = await ffmpegProcess.output();
        
        if (code === 0) {
          // Read compressed file
          finalBytes = await Deno.readFile(tempOutputPath);
          finalFilename = `${timestamp}-${randomStr}.webm`;
          
          // Clean up temp files
          await Deno.remove(tempInputPath).catch(() => {});
          await Deno.remove(tempOutputPath).catch(() => {});
          
          console.log(`Video compressed losslessly: ${file.size} -> ${finalBytes.length} bytes`);
        } else {
          const errorText = new TextDecoder().decode(stderr);
          console.error("FFmpeg error:", errorText);
          // Fall back to original file if compression fails
          console.log("Falling back to original file");
        }
      } catch (compressionError) {
        console.error("Video compression error:", compressionError);
        // Fall back to original file
      }
    }
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(REVIEWS_BUCKET)
      .upload(finalFilename, finalBytes, {
        contentType: file.type.startsWith('video/') ? 'video/webm' : file.type,
        upsert: false,
      });
    
    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: `Failed to upload file: ${error.message}` }, 500);
    }
    
    // Generate signed URL (valid for 1 year)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(REVIEWS_BUCKET)
      .createSignedUrl(finalFilename, 31536000); // 1 year
    
    if (urlError) {
      console.error("Error creating signed URL:", urlError);
      return c.json({ error: `Failed to create signed URL: ${urlError.message}` }, 500);
    }
    
    return c.json({ 
      success: true, 
      url: signedUrlData.signedUrl,
      filename: finalFilename,
      originalSize: file.size,
      compressedSize: finalBytes.length,
      type: file.type.startsWith('video/') ? 'video/webm' : file.type,
    });
    
  } catch (error) {
    console.error("Upload endpoint error:", error);
    return c.json({ error: `Upload failed: ${error}` }, 500);
  }
});

// Submit review endpoint
app.post("/make-server-eeaec47f/reviews/submit", async (c) => {
  try {
    const { productId, rating, text, mediaUrls } = await c.req.json();
    
    if (!productId || !rating) {
      return c.json({ error: "productId and rating are required" }, 400);
    }
    
    const reviewId = `review:${productId}:${Date.now()}`;
    const reviewData = {
      productId,
      rating,
      text: text || "",
      mediaUrls: mediaUrls || [],
      timestamp: Date.now(),
    };
    
    await kv.set(reviewId, reviewData);
    
    return c.json({ success: true, reviewId });
  } catch (error) {
    console.error("Error submitting review:", error);
    return c.json({ error: `Failed to submit review: ${error}` }, 500);
  }
});

// Get reviews for a product
app.get("/make-server-eeaec47f/reviews/:productId", async (c) => {
  try {
    const productId = c.req.param('productId');
    const prefix = `review:${productId}:`;
    
    const reviews = await kv.getByPrefix(prefix);
    
    return c.json({ 
      success: true, 
      reviews: reviews.map(r => r.value),
      count: reviews.length 
    });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return c.json({ error: `Failed to get reviews: ${error}` }, 500);
  }
});

// Post interactions endpoints
const POST_INTERACTION_PREFIX = "post_interaction:";

// Get all post interactions
app.get("/make-server-eeaec47f/post-interactions", async (c) => {
  try {
    const interactions = await kv.getByPrefix(POST_INTERACTION_PREFIX);
    console.log('Fetched interactions from DB:', interactions?.length || 0, 'items');
    const result: Record<number, any> = {};
    
    if (interactions && Array.isArray(interactions)) {
      interactions.forEach(item => {
        if (item && item.key && typeof item.key === 'string') {
          const postId = parseInt(item.key.replace(POST_INTERACTION_PREFIX, ''));
          if (!isNaN(postId) && item.value) {
            result[postId] = item.value;
            console.log(`Post ${postId} has ${item.value.comments?.length || 0} comments`);
          }
        }
      });
    }
    
    console.log('Returning interactions for', Object.keys(result).length, 'posts');
    return c.json({ success: true, interactions: result });
  } catch (error) {
    console.error("Error getting post interactions:", error);
    return c.json({ error: `Failed to get post interactions: ${error}` }, 500);
  }
});

// Save post interaction (like/comment)
app.post("/make-server-eeaec47f/post-interactions", async (c) => {
  try {
    const { postId, likes, isLiked, comments } = await c.req.json();
    
    console.log('Saving post interaction:', { postId, likes, isLiked, commentsCount: comments?.length });
    
    if (!postId) {
      return c.json({ error: "postId is required" }, 400);
    }
    
    const key = `${POST_INTERACTION_PREFIX}${postId}`;
    const value = { 
      likes: likes || 0, 
      isLiked: isLiked || false,
      comments: comments || []
    };
    
    await kv.set(key, value);
    console.log('Post interaction saved successfully to key:', key);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving post interaction:", error);
    return c.json({ error: `Failed to save post interaction: ${error}` }, 500);
  }
});

// NPS Survey endpoints
const NPS_SURVEY_PREFIX = "nps_survey:";
const NPS_SUBMISSION_PREFIX = "nps_submitted:";

// Save NPS survey response and mark user as submitted
app.post("/make-server-eeaec47f/nps-survey", async (c) => {
  try {
    const { userId, rating, reason, detail, comment, timestamp } = await c.req.json();
    
    console.log('Saving NPS survey response:', { userId, rating, reason, detail, hasComment: !!comment });
    
    if (rating === null || rating === undefined) {
      return c.json({ error: "Rating is required" }, 400);
    }
    
    const surveyId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const key = `${NPS_SURVEY_PREFIX}${surveyId}`;
    const value = { 
      userId: userId || 'anonymous',
      rating,
      reason: reason || null,
      detail: detail || null,
      comment: comment || '',
      timestamp: timestamp || new Date().toISOString(),
      category: rating <= 6 ? 'detractor' : rating <= 8 ? 'passive' : 'promoter'
    };
    
    await kv.set(key, value);
    
    // Mark user as having submitted NPS survey
    if (userId) {
      await kv.set(`${NPS_SUBMISSION_PREFIX}${userId}`, { 
        submitted: true, 
        submittedAt: Date.now(),
        surveyId 
      });
      console.log(`Marked user ${userId} as NPS submitted`);
    }
    
    console.log('NPS survey saved successfully with ID:', surveyId);
    
    return c.json({ success: true, surveyId });
  } catch (error) {
    console.error("Error saving NPS survey:", error);
    return c.json({ error: `Failed to save NPS survey: ${error}` }, 500);
  }
});

// Get all NPS surveys
app.get("/make-server-eeaec47f/nps-surveys", async (c) => {
  try {
    const surveys = await kv.getByPrefix(NPS_SURVEY_PREFIX);
    console.log('Fetched NPS surveys from DB:', surveys?.length || 0, 'responses');
    
    const result = surveys?.map(item => ({
      id: item.key.replace(NPS_SURVEY_PREFIX, ''),
      ...item.value
    })) || [];
    
    return c.json({ success: true, surveys: result, count: result.length });
  } catch (error) {
    console.error("Error getting NPS surveys:", error);
    return c.json({ error: `Failed to get NPS surveys: ${error}` }, 500);
  }
});

// Check if user has submitted NPS survey
app.get("/make-server-eeaec47f/nps-submission-status/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    const submissionData = await kv.get(`${NPS_SUBMISSION_PREFIX}${userId}`);
    
    return c.json({ 
      success: true, 
      hasSubmitted: !!submissionData,
      submittedAt: submissionData?.submittedAt || null
    });
  } catch (error) {
    console.error("Error checking NPS submission status:", error);
    return c.json({ error: `Failed to check submission status: ${error}` }, 500);
  }
});

// Delete NPS submission status for a user (for reset)
app.delete("/make-server-eeaec47f/nps-submission-status/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    await kv.del(`${NPS_SUBMISSION_PREFIX}${userId}`);
    console.log(`Deleted NPS submission status for user ${userId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting NPS submission status:", error);
    return c.json({ error: `Failed to delete submission status: ${error}` }, 500);
  }
});

// Stories endpoints
const STORIES_KEY = "stories:data";

// Get all stories
app.get("/make-server-eeaec47f/stories", async (c) => {
  try {
    const storiesData = await kv.get(STORIES_KEY);
    
    // Return default stories if none exist in DB
    const defaultStories = [
      {
        id: 0,
        image: '',
        duration: 10000,
        isNPSSurvey: true
      },
      {
        id: 1,
        image: 'figma:asset/830eb843a780f474f785acbb6fed4806f1c75666.png',
        duration: 8000,
        isNPSSurvey: false
      }
    ];
    
    return c.json({ 
      success: true, 
      stories: storiesData?.stories || defaultStories 
    });
  } catch (error) {
    console.error("Error getting stories:", error);
    return c.json({ error: `Failed to get stories: ${error}` }, 500);
  }
});

// Save/update stories
app.post("/make-server-eeaec47f/stories", async (c) => {
  try {
    const { stories } = await c.req.json();
    
    if (!stories || !Array.isArray(stories)) {
      return c.json({ error: "Stories array is required" }, 400);
    }
    
    await kv.set(STORIES_KEY, { stories, updatedAt: Date.now() });
    console.log(`Saved ${stories.length} stories to database`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving stories:", error);
    return c.json({ error: `Failed to save stories: ${error}` }, 500);
  }
});

// Upload profile photo endpoint
app.post("/make-server-eeaec47f/profile/upload-photo", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string || 'default_user';
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `profile_${userId}_${timestamp}.${ext}`;
    
    // Read file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(PROFILE_BUCKET)
      .upload(filename, fileBytes, {
        contentType: file.type,
        upsert: true,
      });
    
    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: `Failed to upload file: ${error.message}` }, 500);
    }
    
    // Generate signed URL (valid for 1 year)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(PROFILE_BUCKET)
      .createSignedUrl(filename, 31536000); // 1 year
    
    if (urlError) {
      console.error("Error creating signed URL:", urlError);
      return c.json({ error: `Failed to create signed URL: ${urlError.message}` }, 500);
    }
    
    // Store profile photo URL in KV store
    await kv.set(`profile:${userId}:photo`, { url: signedUrlData.signedUrl, filename });
    
    return c.json({ 
      success: true, 
      url: signedUrlData.signedUrl,
      filename
    });
    
  } catch (error) {
    console.error("Profile photo upload error:", error);
    return c.json({ error: `Upload failed: ${error}` }, 500);
  }
});

// Get profile photo endpoint
app.get("/make-server-eeaec47f/profile/photo/:userId", async (c) => {
  try {
    const userId = c.req.param('userId') || 'default_user';
    const photoData = await kv.get(`profile:${userId}:photo`);
    
    if (!photoData) {
      return c.json({ success: true, url: null });
    }
    
    return c.json({ success: true, url: photoData.url, filename: photoData.filename });
  } catch (error) {
    console.error("Error getting profile photo:", error);
    return c.json({ error: `Failed to get profile photo: ${error}` }, 500);
  }
});

// Update user rating endpoint
app.post("/make-server-eeaec47f/profile/update-rating", async (c) => {
  try {
    const { userId, rating } = await c.req.json();
    
    if (!userId || rating === undefined) {
      return c.json({ error: "userId and rating are required" }, 400);
    }
    
    await kv.set(`profile:${userId}:rating`, { rating, updatedAt: Date.now() });
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating rating:", error);
    return c.json({ error: `Failed to update rating: ${error}` }, 500);
  }
});

// Get user rating endpoint
app.get("/make-server-eeaec47f/profile/rating/:userId", async (c) => {
  try {
    const userId = c.req.param('userId') || 'default_user';
    const ratingData = await kv.get(`profile:${userId}:rating`);
    
    if (!ratingData) {
      return c.json({ success: true, rating: 0 });
    }
    
    return c.json({ success: true, rating: ratingData.rating });
  } catch (error) {
    console.error("Error getting rating:", error);
    return c.json({ error: `Failed to get rating: ${error}` }, 500);
  }
});

// Save profile information endpoint
app.post("/make-server-eeaec47f/profile/save-info", async (c) => {
  try {
    const requestBody = await c.req.json();
    const { userId, firstName, lastName, mobile, countryCode, email, dob, gender, maritalStatus, anniversaryDate } = requestBody;
    
    console.log(`Profile save request for user ${userId}:`, { gender, maritalStatus });
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    const profileInfo = {
      firstName: firstName || '',
      lastName: lastName || '',
      mobile: mobile || '',
      countryCode: countryCode || 'IN',
      email: email || '',
      dob: dob || '',
      gender: gender || 'male',
      maritalStatus: maritalStatus || 'single',
      anniversaryDate: anniversaryDate || '',
      updatedAt: Date.now()
    };
    
    await kv.set(`profile:${userId}:info`, profileInfo);
    console.log(`Profile info saved for user ${userId}:`, profileInfo);
    
    return c.json({ success: true, saved: profileInfo });
  } catch (error) {
    console.error("Error saving profile info:", error);
    return c.json({ error: `Failed to save profile info: ${error}` }, 500);
  }
});

// Get profile information endpoint
app.get("/make-server-eeaec47f/profile/info/:userId", async (c) => {
  try {
    const userId = c.req.param('userId') || 'default_user';
    const profileInfo = await kv.get(`profile:${userId}:info`);
    
    if (!profileInfo) {
      return c.json({ 
        success: true, 
        profile: {
          firstName: '',
          lastName: '',
          mobile: '',
          countryCode: 'IN',
          email: '',
          dob: '',
          gender: 'male',
          maritalStatus: 'single',
          anniversaryDate: ''
        }
      });
    }
    
    return c.json({ success: true, profile: profileInfo });
  } catch (error) {
    console.error("Error getting profile info:", error);
    return c.json({ error: `Failed to get profile info: ${error}` }, 500);
  }
});

// Save consent preferences endpoint
app.post("/make-server-eeaec47f/profile/save-consent", async (c) => {
  try {
    const { userId, consentCategories } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    const consentData = {
      categories: consentCategories,
      updatedAt: Date.now()
    };
    
    await kv.set(`profile:${userId}:consent`, consentData);
    console.log(`Consent preferences saved for user ${userId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving consent preferences:", error);
    return c.json({ error: `Failed to save consent preferences: ${error}` }, 500);
  }
});

// Get consent preferences endpoint
app.get("/make-server-eeaec47f/profile/consent/:userId", async (c) => {
  try {
    const userId = c.req.param('userId') || 'default_user';
    const consentData = await kv.get(`profile:${userId}:consent`);
    
    if (!consentData) {
      return c.json({ 
        success: true, 
        consent: {
          necessary: {
            enabled: true,
            preferences: { email: true, sms: true, whatsapp: true, push: true }
          },
          transactional: {
            enabled: true,
            preferences: { email: true, sms: true, whatsapp: true, push: false }
          },
          marketing: {
            enabled: false,
            preferences: { email: false, sms: false, whatsapp: false, push: false }
          }
        }
      });
    }
    
    return c.json({ success: true, consent: consentData.categories });
  } catch (error) {
    console.error("Error getting consent preferences:", error);
    return c.json({ error: `Failed to get consent preferences: ${error}` }, 500);
  }
});

// Reset all demo data (preserves viewer counts, post interactions, profile photo, and rating)
app.post("/make-server-eeaec47f/reset", async (c) => {
  try {
    const { userId } = await c.req.json();
    
    // Delete all reviews
    const reviews = await kv.getByPrefix("review:");
    for (const review of reviews) {
      await kv.del(review.key);
    }
    
    // Delete NPS submission status for this user
    if (userId) {
      await kv.del(`${NPS_SUBMISSION_PREFIX}${userId}`);
      console.log(`Deleted NPS submission status for user ${userId}`);
    }
    
    // NOTE: We intentionally DO NOT delete viewers, post interactions, profile photos, or ratings to preserve them
    // We also do NOT delete the actual NPS survey responses (only the submission status)
    
    // Delete all files from reviews storage bucket (NOT profile bucket)
    try {
      const { data: files, error: listError } = await supabase.storage
        .from(REVIEWS_BUCKET)
        .list();
      
      if (!listError && files && files.length > 0) {
        const filePaths = files.map(file => file.name);
        const { error: deleteError } = await supabase.storage
          .from(REVIEWS_BUCKET)
          .remove(filePaths);
        
        if (deleteError) {
          console.error("Error deleting storage files:", deleteError);
        } else {
          console.log(`Deleted ${filePaths.length} files from storage`);
        }
      }
    } catch (storageError) {
      console.error("Error cleaning storage:", storageError);
      // Continue even if storage cleanup fails
    }
    
    return c.json({ 
      success: true, 
      message: "Demo data reset (viewer counts, post interactions, profile photo, and rating preserved)",
      reviewsDeleted: reviews.length
    });
  } catch (error) {
    console.error("Error resetting data:", error);
    return c.json({ error: `Failed to reset data: ${error}` }, 500);
  }
});

// Media storage endpoints
const MEDIA_BUCKET = 'make-eeaec47f-media';

// Initialize media bucket (idempotent)
async function initMediaBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === MEDIA_BUCKET);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(MEDIA_BUCKET, {
        public: false
      });
      
      if (error && error.statusCode !== "409") {
        console.error('Error creating media bucket:', error);
      } else if (!error) {
        console.log('Media bucket created successfully');
      } else {
        console.log('Media bucket already exists');
      }
    } else {
      console.log('Media bucket already exists');
    }
  } catch (error) {
    console.error('Error initializing media bucket:', error);
  }
}

// Initialize bucket on startup
initMediaBucket();

// Upload media file
app.post("/make-server-eeaec47f/media/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const mediaType = formData.get('mediaType') as string; // 'profile-photo' | 'review-media'
    const reviewId = formData.get('reviewId') as string | null;
    
    if (!file || !userId || !mediaType) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop() || 'bin';
    
    let filePath: string;
    if (mediaType === 'profile-photo') {
      filePath = `profile-photos/${userId}/${timestamp}.${fileExt}`;
    } else if (mediaType === 'review-media' && reviewId) {
      const mediaTypePrefix = file.type.startsWith('image/') ? 'photo' : 
                              file.type.startsWith('video/') ? 'video' : 'audio';
      filePath = `review-media/${userId}/${reviewId}/${mediaTypePrefix}-${timestamp}.${fileExt}`;
    } else {
      return c.json({ error: 'Invalid media type or missing reviewId' }, 400);
    }

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: `Upload failed: ${uploadError.message}` }, 500);
    }

    // Generate signed URL (valid for 1 year)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .createSignedUrl(filePath, 31536000); // 1 year

    if (urlError) {
      console.error('Signed URL error:', urlError);
      return c.json({ error: 'Failed to generate signed URL' }, 500);
    }

    console.log(`Media uploaded: ${filePath} (${file.size} bytes)`);

    return c.json({
      success: true,
      url: signedUrlData.signedUrl,
      path: filePath,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    return c.json({ error: `Failed to upload media: ${error}` }, 500);
  }
});

// Delete media file
app.delete("/make-server-eeaec47f/media/delete", async (c) => {
  try {
    const { filePath } = await c.req.json();
    
    if (!filePath) {
      return c.json({ error: 'filePath is required' }, 400);
    }

    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return c.json({ error: `Delete failed: ${error.message}` }, 500);
    }

    console.log(`Media deleted: ${filePath}`);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return c.json({ error: `Failed to delete media: ${error}` }, 500);
  }
});

// Get signed URL for existing media
app.post("/make-server-eeaec47f/media/signed-url", async (c) => {
  try {
    const { filePath, expiresIn = 31536000 } = await c.req.json();
    
    if (!filePath) {
      return c.json({ error: 'filePath is required' }, 400);
    }

    const { data, error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Signed URL error:', error);
      return c.json({ error: `Failed to generate signed URL: ${error.message}` }, 500);
    }

    return c.json({ success: true, url: data.signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return c.json({ error: `Failed to generate signed URL: ${error}` }, 500);
  }
});

// Upload story video endpoint
app.post("/make-server-90d6047b/upload-video", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('video') as File;
    
    if (!file) {
      return c.json({ error: "No video file provided" }, 400);
    }
    
    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      return c.json({ error: "File must be a video" }, 400);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const ext = file.name.split('.').pop() || 'mp4';
    const filename = `story-video-${timestamp}-${randomStr}.${ext}`;
    
    // Read file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(VIDEOS_BUCKET)
      .upload(filename, fileBytes, {
        contentType: file.type,
        upsert: false,
      });
    
    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: `Failed to upload video: ${error.message}` }, 500);
    }
    
    // Generate signed URL (valid for 10 years for story videos)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(VIDEOS_BUCKET)
      .createSignedUrl(filename, 315360000); // 10 years
    
    if (urlError) {
      console.error("Error creating signed URL:", urlError);
      return c.json({ error: `Failed to create signed URL: ${urlError.message}` }, 500);
    }
    
    console.log(`Video uploaded successfully: ${filename} (${file.size} bytes)`);
    
    // Get all existing videos
    const allVideos = await kv.getByPrefix('uploaded_video:');
    const videoList = allVideos.map(v => v.value);
    
    // Add new video to the list
    const videoData = {
      url: signedUrlData.signedUrl,
      filename,
      size: file.size,
      uploadedAt: timestamp
    };
    
    // Store this video with its timestamp as the key
    await kv.set(`uploaded_video:${timestamp}`, videoData);
    
    console.log(`Stored video with key: uploaded_video:${timestamp}`);
    
    return c.json({ 
      success: true, 
      videoUrl: signedUrlData.signedUrl,
      filename: filename,
      size: file.size
    });
    
  } catch (error) {
    console.error("Video upload endpoint error:", error);
    return c.json({ error: `Upload failed: ${error}` }, 500);
  }
});

// Get all uploaded videos endpoint
app.get("/make-server-90d6047b/uploaded-videos", async (c) => {
  try {
    const allVideos = await kv.getByPrefix('uploaded_video:');
    
    if (!allVideos || allVideos.length === 0) {
      return c.json({ success: true, videos: [] });
    }
    
    // Sort by uploadedAt timestamp (most recent first)
    const sortedVideos = allVideos
      .map(v => v.value)
      .sort((a, b) => b.uploadedAt - a.uploadedAt);
    
    console.log(`Retrieved ${sortedVideos.length} uploaded videos`);
    
    return c.json({ 
      success: true, 
      videos: sortedVideos
    });
  } catch (error) {
    console.error("Error getting uploaded videos:", error);
    return c.json({ error: `Failed to get uploaded videos: ${error}` }, 500);
  }
});

Deno.serve(app.fetch);