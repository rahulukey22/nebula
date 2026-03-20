import { useState, useRef } from 'react';
import { Upload, X, Loader2, Check } from 'lucide-react';

interface PostVideoUploadAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostVideoUploadAdmin({ isOpen, onClose }: PostVideoUploadAdminProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please upload a valid video file');
      return;
    }

    // Validate file size (100MB limit for post videos)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 100MB');
      return;
    }

    setError(null);
    setUploading(true);

    // Simulate upload - in a real app, this would upload to a server
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate thumbnail from video
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      video.src = URL.createObjectURL(file);
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 0.5; // Capture frame at 0.5 seconds
      };

      video.onseeked = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          URL.revokeObjectURL(video.src);
        }
      };

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setUploading(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className=\"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4\">
      <div className=\"bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl\">
        <div className=\"flex items-center justify-between mb-6\">
          <h2 className=\"text-xl font-bold text-[#1a1a1a]\">Upload Post Video</h2>
          <button
            onClick={onClose}
            className=\"p-2 hover:bg-gray-100 rounded-full transition-colors\"
          >
            <X className=\"w-5 h-5 text-gray-600\" />
          </button>
        </div>

        {!uploadSuccess ? (
          <>
            <div className=\"mb-6\">
              <label
                htmlFor=\"post-video-upload\"
                className=\"flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#000000]/30 rounded-xl cursor-pointer bg-[#000000]/5 hover:bg-[#000000]/10 transition-colors\"
              >
                <div className=\"flex flex-col items-center justify-center pt-5 pb-6\">
                  {uploading ? (
                    <>
                      <Loader2 className=\"w-12 h-12 text-[#000000] animate-spin mb-3\" />
                      <p className=\"text-sm text-[#1a1a1a] font-medium\">Uploading video...</p>
                      <p className=\"text-xs text-gray-500 mt-1\">Please wait</p>
                    </>
                  ) : (
                    <>
                      <Upload className=\"w-12 h-12 text-[#000000] mb-3\" />
                      <p className=\"mb-2 text-sm text-[#1a1a1a] font-medium\">
                        Click to upload video
                      </p>
                      <p className=\"text-xs text-gray-500\">MP4, WebM, MOV (max 100MB)</p>
                    </>
                  )}
                </div>
                <input
                  id=\"post-video-upload\"
                  type=\"file\"
                  accept=\"video/*\"
                  className=\"hidden\"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>

            {error && (
              <div className=\"mb-4 p-3 bg-red-50 border border-red-200 rounded-lg\">
                <p className=\"text-sm text-red-600\">{error}</p>
              </div>
            )}

            <div className=\"bg-[#f8f5fa] rounded-lg p-4\">
              <h3 className=\"text-sm font-semibold text-[#1a1a1a] mb-2\">Tips:</h3>
              <ul className=\"text-xs text-gray-600 space-y-1\">
                <li>• Recommended: 9:16 or 1:1 aspect ratio</li>
                <li>• Duration: Up to 60 seconds</li>
                <li>• Keep file size under 100MB</li>
                <li>• Video will auto-play in feed</li>
              </ul>
            </div>
          </>
        ) : (
          <div className=\"text-center py-8\">
            <div className=\"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4\">
              <Check className=\"w-8 h-8 text-green-600\" />
            </div>
            <h3 className=\"text-lg font-semibold text-[#1a1a1a] mb-2\">Upload Successful!</h3>
            <p className=\"text-sm text-gray-600\">Your video is ready to use in the post.</p>
          </div>
        )}
      </div>
    </div>
  );
}
