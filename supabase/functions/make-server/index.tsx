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
    
    const sessionData = {
      sessionId,
      userId,
      deviceType: deviceType || 'unknown',
      browserName: browserName || 'unknown',
      browserVersion: browserVersion || 'unknown',
      os: os || 'unknown',
      latitude: latitude || null,
      longitude: longitude || null,
      startTime: timestamp,
      lastActivity: timestamp,
      status: "active",
      endTime: null,
    };
    
    await kv.set(key, sessionData);
    
    return c.json({
      success: true,
      sessionId,
      message: "Session started",
    });
  } catch (error) {
    console.error("Error starting session:", error);
    return c.json(
      {
        error: "Failed to start session",
        details: error.message,
      },
      500
    );
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
    const sessionData = await kv.get(key);
    
    if (sessionData) {
      sessionData.status = "ended";
      sessionData.endTime = Date.now();
      await kv.set(key, sessionData);
    }
    
    return c.json({ success: true, message: "Session ended" });
  } catch (error) {
    console.error("Error ending session:", error);
    return c.json({ error: "Failed to end session" }, 500);
  }
});

// Get current viewer count (unique users)
app.get("/make-server-eeaec47f/sessions/count", async (c) => {
  try {
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const now = Date.now();
    
    // Filter active sessions (not timed out and not ended)
    const activeSessions = allSessions.filter((item) => {
      const session = item.value;
      const isActive = session.status === "active";
      const notTimedOut = (now - session.lastActivity) < SESSION_TIMEOUT_MS;
      return isActive && notTimedOut;
    });
    
    // Count unique users
    const uniqueUsers = new Set(activeSessions.map((item) => item.value.userId));
    
    return c.json({
      count: uniqueUsers.size,
      activeSessions: activeSessions.length,
    });
  } catch (error) {
    console.error("Error getting session count:", error);
    return c.json({ error: "Failed to get session count" }, 500);
  }
});

// Session heartbeat with location update
app.post("/make-server-eeaec47f/sessions/heartbeat", async (c) => {
  try {
    const { sessionId, userId, latitude, longitude, deviceType, browserName, browserVersion, os } = await c.req.json();
    
    if (!sessionId) {
      return c.json({ error: "sessionId is required" }, 400);
    }
    
    const key = `${SESSION_PREFIX}${sessionId}`;
    let sessionData = await kv.get(key);
    
    // If session doesn't exist, create it
    if (!sessionData) {
      const timestamp = Date.now();
      sessionData = {
        sessionId,
        userId: userId || 'unknown',
        deviceType: deviceType || 'unknown',
        browserName: browserName || 'unknown',
        browserVersion: browserVersion || 'unknown',
        os: os || 'unknown',
        latitude: latitude || null,
        longitude: longitude || null,
        startTime: timestamp,
        lastActivity: timestamp,
        status: "active",
        endTime: null,
      };
    } else {
      // Update existing session
      sessionData.lastActivity = Date.now();
      sessionData.status = "active"; // Reactivate if it was idle
      
      // Update location if provided
      if (latitude !== undefined && latitude !== null) {
        sessionData.latitude = latitude;
      }
      if (longitude !== undefined && longitude !== null) {
        sessionData.longitude = longitude;
      }
      
      // Update device info if provided
      if (deviceType) sessionData.deviceType = deviceType;
      if (browserName) sessionData.browserName = browserName;
      if (browserVersion) sessionData.browserVersion = browserVersion;
      if (os) sessionData.os = os;
      if (userId) sessionData.userId = userId;
    }
    
    await kv.set(key, sessionData);
    
    // Get current active count
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const now = Date.now();
    const activeSessions = allSessions.filter((item) => {
      const session = item.value;
      const isActive = session.status === "active";
      const notTimedOut = (now - session.lastActivity) < SESSION_TIMEOUT_MS;
      return isActive && notTimedOut;
    });
    
    const uniqueUsers = new Set(activeSessions.map((item) => item.value.userId));
    
    return c.json({
      success: true,
      sessionId,
      currentViewers: uniqueUsers.size,
      message: "Heartbeat received",
    });
  } catch (error) {
    console.error("Error processing heartbeat:", error);
    return c.json(
      {
        error: "Failed to process heartbeat",
        details: error.message,
      },
      500
    );
  }
});

// Get all active sessions (for developer mode)
app.get("/make-server-eeaec47f/sessions/all", async (c) => {
  try {
    const allSessions = await kv.getByPrefix(SESSION_PREFIX);
    const now = Date.now();
    
    // Filter active sessions
    const activeSessions = allSessions.filter((item) => {
      const session = item.value;
      const isActive = session.status === "active";
      const notTimedOut = (now - session.lastActivity) < SESSION_TIMEOUT_MS;
      return isActive && notTimedOut;
    });
    
    return c.json({
      sessions: activeSessions.map((item) => ({
        ...item.value,
        timeSinceLastActivity: now - item.value.lastActivity,
        isIdle: (now - item.value.lastActivity) > SESSION_IDLE_MS,
      })),
      total: activeSessions.length,
      uniqueUsers: new Set(activeSessions.map((item) => item.value.userId)).size,
    });
  } catch (error) {
    console.error("Error getting all sessions:", error);
    return c.json({ error: "Failed to get sessions" }, 500);
  }
});

// Story view tracking
const STORY_VIEW_PREFIX = "story_view:";

app.post("/make-server-eeaec47f/stories/view", async (c) => {
  try {
    const { storyId, sessionId } = await c.req.json();
    
    if (storyId === undefined || !sessionId) {
      return c.json({ error: "storyId and sessionId are required" }, 400);
    }
    
    const key = `${STORY_VIEW_PREFIX}${storyId}`;
    let viewData = await kv.get(key);
    
    if (!viewData) {
      viewData = {
        storyId,
        views: 0,
        uniqueViewers: [],
        lastViewed: null,
      };
    }
    
    // Increment view count
    viewData.views += 1;
    viewData.lastViewed = Date.now();
    
    // Track unique viewers (add sessionId if not already in array)
    if (!viewData.uniqueViewers.includes(sessionId)) {
      viewData.uniqueViewers.push(sessionId);
    }
    
    await kv.set(key, viewData);
    
    return c.json({
      success: true,
      storyId,
      views: viewData.views,
      uniqueViewers: viewData.uniqueViewers.length,
    });
  } catch (error) {
    console.error("Error tracking story view:", error);
    return c.json({ error: "Failed to track view" }, 500);
  }
});

app.get("/make-server-eeaec47f/stories/views/:storyId", async (c) => {
  try {
    const storyId = c.req.param('storyId');
    const key = `${STORY_VIEW_PREFIX}${storyId}`;
    const viewData = await kv.get(key);
    
    if (!viewData) {
      return c.json({
        storyId: parseInt(storyId),
        views: 0,
        uniqueViewers: 0,
      });
    }
    
    return c.json({
      storyId: viewData.storyId,
      views: viewData.views,
      uniqueViewers: viewData.uniqueViewers.length,
      lastViewed: viewData.lastViewed,
    });
  } catch (error) {
    console.error("Error getting story views:", error);
    return c.json({ error: "Failed to get views" }, 500);
  }
});

// Get all story views
app.get("/make-server-eeaec47f/stories/views", async (c) => {
  try {
    const allViews = await kv.getByPrefix(STORY_VIEW_PREFIX);
    
    const viewsData = allViews.map((item) => ({
      storyId: item.value.storyId,
      views: item.value.views,
      uniqueViewers: item.value.uniqueViewers.length,
      lastViewed: item.value.lastViewed,
    }));
    
    return c.json({ views: viewsData });
  } catch (error) {
    console.error("Error getting all story views:", error);
    return c.json({ error: "Failed to get views" }, 500);
  }
});

// Upload review media endpoint
app.post("/make-server-eeaec47f/reviews/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;
    
    if (!file || !productId) {
      return c.json({ error: 'File and productId are required' }, 400);
    }

    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `review-${productId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    
    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from('make-90d6047b-reviews')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
      });

    if (error) {
      console.error('Storage upload error:', error);
      return c.json({ error: 'Failed to upload file', details: error.message }, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('make-90d6047b-reviews')
      .getPublicUrl(fileName);

    return c.json({
      success: true,
      url: urlData.publicUrl,
      fileName: fileName,
      fileType: file.type.startsWith('image/') ? 'image' : 'video',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload file', details: error.message }, 500);
  }
});

// Submit review endpoint
app.post("/make-server-eeaec47f/reviews/submit", async (c) => {
  try {
    const { productId, rating, text, mediaUrls } = await c.req.json();
    
    if (!productId || !rating) {
      return c.json({ error: 'productId and rating are required' }, 400);
    }

    const reviewId = `review_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const reviewKey = `review:${reviewId}`;
    
    const reviewData = {
      id: reviewId,
      productId,
      rating,
      text: text || '',
      mediaUrls: mediaUrls || [],
      createdAt: new Date().toISOString(),
    };

    await kv.set(reviewKey, reviewData);

    return c.json({
      success: true,
      reviewId,
      message: 'Review submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return c.json({ error: 'Failed to submit review' }, 500);
  }
});

// Get reviews for a product
app.get("/make-server-eeaec47f/reviews/:productId", async (c) => {
  try {
    const productId = c.req.param('productId');
    const allReviews = await kv.getByPrefix('review:');
    
    const productReviews = allReviews
      .filter(item => item.value.productId === productId)
      .map(item => item.value);

    return c.json({
      reviews: productReviews,
      count: productReviews.length,
    });
  } catch (error) {
    console.error('Error getting reviews:', error);
    return c.json({ error: 'Failed to get reviews' }, 500);
  }
});

// Get all post interactions
app.get("/make-server-eeaec47f/post-interactions", async (c) => {
  try {
    const interactions = await kv.getByPrefix(POST_INTERACTION_PREFIX);
    
    // Transform into a map for easy lookup
    const interactionsMap = {};
    interactions.forEach((item) => {
      const postId = item.key.replace(POST_INTERACTION_PREFIX, '');
      interactionsMap[postId] = item.value;
    });
    
    return c.json({
      success: true,
      interactions: interactionsMap,
    });
  } catch (error) {
    console.error('Error getting post interactions:', error);
    return c.json(
      {
        error: 'Failed to get post interactions',
        details: error.message,
      },
      500
    );
  }
});

const POST_INTERACTION_PREFIX = "post_interaction:";

// Save post interaction (like/comment)
app.post("/make-server-eeaec47f/post-interactions", async (c) => {
  try {
    const { postId, likes, isLiked, comments } = await c.req.json();
    
    if (!postId) {
      return c.json({ error: "postId is required" }, 400);
    }
    
    const key = `${POST_INTERACTION_PREFIX}${postId}`;
    
    const interactionData = {
      postId,
      likes: likes || 0,
      isLiked: isLiked || false,
      comments: comments || [],
      lastUpdated: Date.now(),
    };
    
    await kv.set(key, interactionData);
    
    return c.json({
      success: true,
      postId,
      likes: interactionData.likes,
      isLiked: interactionData.isLiked,
      commentCount: interactionData.comments.length,
    });
  } catch (error) {
    console.error("Error saving post interaction:", error);
    return c.json(
      {
        error: "Failed to save post interaction",
        details: error.message,
      },
      500
    );
  }
});

// NPS Survey endpoints
const SURVEY_PREFIX = "survey:";

app.post("/make-server-eeaec47f/surveys/submit", async (c) => {
  try {
    const surveyData = await c.req.json();
    const { userId, experienceRating, brandRating, recommendationRating, feedback } = surveyData;
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    const surveyId = `${userId}_${Date.now()}`;
    const key = `${SURVEY_PREFIX}${surveyId}`;
    
    const data = {
      surveyId,
      userId,
      experienceRating,
      brandRating,
      recommendationRating,
      feedback: feedback || '',
      submittedAt: new Date().toISOString(),
      timestamp: Date.now(),
    };
    
    await kv.set(key, data);
    
    return c.json({
      success: true,
      surveyId,
      message: 'Survey submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting survey:', error);
    return c.json({ error: 'Failed to submit survey' }, 500);
  }
});

app.get("/make-server-eeaec47f/surveys/results", async (c) => {
  try {
    const allSurveys = await kv.getByPrefix(SURVEY_PREFIX);
    
    const surveys = allSurveys.map(item => item.value);
    
    // Calculate statistics
    const totalResponses = surveys.length;
    const avgExperience = surveys.reduce((sum, s) => sum + (s.experienceRating || 0), 0) / totalResponses || 0;
    const avgBrand = surveys.reduce((sum, s) => sum + (s.brandRating || 0), 0) / totalResponses || 0;
    const avgRecommendation = surveys.reduce((sum, s) => sum + (s.recommendationRating || 0), 0) / totalResponses || 0;
    
    return c.json({
      totalResponses,
      averages: {
        experience: Math.round(avgExperience * 10) / 10,
        brand: Math.round(avgBrand * 10) / 10,
        recommendation: Math.round(avgRecommendation * 10) / 10,
      },
      responses: surveys,
    });
  } catch (error) {
    console.error('Error getting survey results:', error);
    return c.json({ error: 'Failed to get survey results' }, 500);
  }
});

// Profile endpoints
const PROFILE_PREFIX = "profile:";

app.post("/make-server-eeaec47f/profile/save-info", async (c) => {
  try {
    const profileData = await c.req.json();
    const { userId, name, phone, email, dateOfBirth, gender } = profileData;
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    const key = `${PROFILE_PREFIX}${userId}`;
    
    // Get existing profile or create new
    let profile = await kv.get(key);
    
    if (!profile) {
      profile = {
        userId,
        createdAt: new Date().toISOString(),
      };
    }
    
    // Update fields
    if (name !== undefined) profile.name = name;
    if (phone !== undefined) profile.phone = phone;
    if (email !== undefined) profile.email = email;
    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
    if (gender !== undefined) profile.gender = gender;
    
    profile.updatedAt = new Date().toISOString();
    
    await kv.set(key, profile);
    
    return c.json({
      success: true,
      message: 'Profile saved successfully',
      profile,
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    return c.json({ error: 'Failed to save profile' }, 500);
  }
});

app.get("/make-server-eeaec47f/profile/info/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const key = `${PROFILE_PREFIX}${userId}`;
    
    const profile = await kv.get(key);
    
    if (!profile) {
      return c.json({
        success: true,
        profile: null,
        message: 'No profile found',
      });
    }
    
    return c.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    return c.json({ error: 'Failed to get profile' }, 500);
  }
});

// Media upload endpoints
app.post("/make-server-eeaec47f/media/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'video' or 'image'
    
    if (!file) {
      return c.json({ error: 'File is required' }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `story-${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    
    const fileBuffer = await file.arrayBuffer();
    const bucketName = type === 'video' ? 'make-90d6047b-videos' : 'make-90d6047b-images';
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
      });

    if (error) {
      console.error('Storage upload error:', error);
      return c.json({ error: 'Failed to upload file', details: error.message }, 500);
    }

    // Get signed URL with 1 year expiry
    const { data: signedData, error: signedError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000); // 1 year in seconds

    if (signedError) {
      console.error('Signed URL error:', signedError);
      return c.json({ error: 'Failed to create signed URL' }, 500);
    }

    return c.json({
      success: true,
      url: signedData.signedUrl,
      fileName: fileName,
      type: type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload file', details: error.message }, 500);
  }
});

app.delete("/make-server-eeaec47f/media/delete", async (c) => {
  try {
    const { fileName, type } = await c.req.json();
    
    if (!fileName || !type) {
      return c.json({ error: 'fileName and type are required' }, 400);
    }

    const bucketName = type === 'video' ? 'make-90d6047b-videos' : 'make-90d6047b-images';
    
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      return c.json({ error: 'Failed to delete file' }, 500);
    }

    return c.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return c.json({ error: 'Failed to delete file' }, 500);
  }
});

export default app;
