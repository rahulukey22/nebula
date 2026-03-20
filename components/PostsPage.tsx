import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { posts } from '../data/posts';
import { PostItem } from './posts/PostItem';
import { CommentDialog, type Comment } from './posts/CommentDialog';
import { PostVideoUploadAdmin } from './PostVideoUploadAdmin';

interface PostInteraction {
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

export function PostsPage() {
  const { t } = useLanguage();
  const [postInteractions, setPostInteractions] = useState<Record<number, PostInteraction>>({});
  const [loading, setLoading] = useState(true);
  const [selectedPostForComment, setSelectedPostForComment] = useState<number | null>(null);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const viewedPostsRef = useRef<Set<number>>(new Set());
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  // Initialize post data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Load viewed posts from localStorage
      const storedViewedPosts = localStorage.getItem('zudio_viewed_posts');
      const viewedPostIds = storedViewedPosts ? JSON.parse(storedViewedPosts) : [];
      viewedPostsRef.current = new Set(viewedPostIds);
      
      // Initialize mock data for each post
      const mockInteractions: Record<number, PostInteraction> = {};
      const mockViews: Record<number, number> = {};
      
      posts.forEach(post => {
        // Random likes between 150-3000
        mockInteractions[post.id] = {
          likes: Math.floor(Math.random() * 2850) + 150,
          isLiked: false,
          comments: [
            {
              id: `c1_${post.id}`,
              text: 'Love this! ☕️',
              username: 'CoffeeLover',
              timestamp: Date.now() - 100000
            },
            {
              id: `c2_${post.id}`,
              text: 'Can\'t wait to try it',
              username: 'ZudioFan',
              timestamp: Date.now() - 50000
            }
          ]
        };
        
        // Base random views between 200-800
        const baseViews = Math.floor(Math.random() * 600) + 200;
        // Add 1 if this post has been viewed before
        mockViews[post.id] = baseViews + (viewedPostsRef.current.has(post.id) ? 1 : 0);
      });
      
      setPostInteractions(mockInteractions);
      setViewCounts(mockViews);
    } catch (error) {
      console.error('Error loading post data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle post view tracking
  const handlePostView = (postId: number) => {
    // Only track once per post, ever (persists across page refreshes)
    if (viewedPostsRef.current.has(postId)) return;
    
    viewedPostsRef.current.add(postId);
    
    // Save to localStorage
    localStorage.setItem(
      'zudio_viewed_posts', 
      JSON.stringify(Array.from(viewedPostsRef.current))
    );
    
    // Increment view count by 1
    setViewCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  // Handle like
  const handleLike = (postId: number) => {
    const currentInteraction = postInteractions[postId];
    if (!currentInteraction || currentInteraction.isLiked) return;

    setPostInteractions(prev => ({
      ...prev,
      [postId]: {
        ...currentInteraction,
        likes: currentInteraction.likes + 1,
        isLiked: true
      }
    }));
  };

  // Handle comment submission
  const handleCommentSubmit = (text: string) => {
    if (!selectedPostForComment) return;

    const currentInteraction = postInteractions[selectedPostForComment] || {
      likes: 0,
      isLiked: false,
      comments: []
    };

    const newComment: Comment = {
      id: Date.now().toString(),
      text: text.trim(),
      username: t('you'),
      timestamp: Date.now()
    };

    setPostInteractions(prev => ({
      ...prev,
      [selectedPostForComment]: {
        ...currentInteraction,
        comments: [...currentInteraction.comments, newComment]
      }
    }));

    setSelectedPostForComment(null);
  };

  // Handle share
  const handleShare = () => {
    console.log('Share clicked');
  };

  // Get post data helper
  const getPostData = (postId: number) => {
    const interaction = postInteractions[postId];
    return {
      likes: interaction?.likes ?? 0,
      comments: interaction?.comments ?? [],
      isLiked: interaction?.isLiked ?? false
    };
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen w-full flex items-center justify-center">
        <div className="text-gray-600 text-sm">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full mx-auto relative">
      {/* Upload Video Button - Fixed Position */}
      <button
        onClick={() => setShowUploadDialog(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
        aria-label="Upload video for post"
      >
        <Upload className="w-6 h-6" />
      </button>

      {/* Uploaded Video URL Display */}
      {uploadedVideoUrl && (
        <div className="fixed top-4 left-4 right-4 z-40 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
          <p className="text-sm font-semibold text-green-800 mb-2">✅ Video Uploaded Successfully!</p>
          <p className="text-xs text-green-700 mb-2">Copy this URL to use in posts.ts:</p>
          <div className="bg-white rounded p-2 border border-green-300">
            <code className="text-xs text-gray-800 break-all">{uploadedVideoUrl}</code>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(uploadedVideoUrl);
              alert('Video URL copied to clipboard!');
            }}
            className="mt-2 text-xs text-[#000000] font-semibold hover:underline"
          >
            Copy URL
          </button>
          <button
            onClick={() => setUploadedVideoUrl(null)}
            className="ml-4 mt-2 text-xs text-gray-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Posts Feed */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-20"
      >
        {posts.map((post) => {
          const postData = getPostData(post.id);
          
          return (
            <PostItem
              key={post.id}
              post={post}
              likes={postData.likes}
              commentsCount={postData.comments.length}
              isLiked={postData.isLiked}
              viewCount={viewCounts[post.id] ?? 0}
              onLike={() => handleLike(post.id)}
              onComment={() => setSelectedPostForComment(post.id)}
              onShare={handleShare}
              onView={() => handlePostView(post.id)}
            />
          );
        })}
      </motion.div>

      {/* Comment Dialog */}
      <CommentDialog
        isOpen={selectedPostForComment !== null}
        comments={selectedPostForComment ? getPostData(selectedPostForComment).comments : []}
        onClose={() => setSelectedPostForComment(null)}
        onSubmit={handleCommentSubmit}
      />

      {/* Video Upload Dialog */}
      {showUploadDialog && (
        <PostVideoUploadAdmin
          onVideoUploaded={(url) => {
            setUploadedVideoUrl(url);
            setShowUploadDialog(false);
          }}
          onClose={() => setShowUploadDialog(false)}
        />
      )}
    </div>
  );
}

export default PostsPage;