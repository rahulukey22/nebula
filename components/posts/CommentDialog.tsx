import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../../utils/LanguageContext';

export interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: number;
}

interface CommentDialogProps {
  isOpen: boolean;
  comments: Comment[];
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function CommentDialog({ isOpen, comments, onClose, onSubmit }: CommentDialogProps) {
  const { t } = useLanguage();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Comment Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-3xl border-t border-white/20 rounded-t-3xl z-50 max-h-[70vh] flex flex-col pb-20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3 border-b border-white/10">
              <h3 className="text-white font-semibold">{t('commentsTitle')}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {comments.length === 0 ? (
                <p className="text-white/50 text-center text-sm py-8">{t('noCommentsYet')}</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {comment.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{comment.username}</span>
                        <span className="text-white/40 text-xs">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-white/10 bg-black/20 mb-20">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={t('writeComment')}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!commentText.trim()}
                  className="w-12 h-12 bg-gradient-to-r from-[#000000] to-[#1a1a1a] rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-90 transition-transform"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}