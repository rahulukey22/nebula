/**
 * Custom hook for media upload with compression and backend integration
 */

import { useState } from 'react';
import { projectId, publicAnonKey } from './supabase/info';

export interface UploadProgress {
  status: 'idle' | 'compressing' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

export function useMediaUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0
  });

  const uploadMedia = async (
    file: File,
    userId: string,
    mediaType: 'profile-photo' | 'review-media',
    reviewId?: string
  ): Promise<UploadResult | null> => {
    try {
      setUploadProgress({ status: 'uploading', progress: 0 });

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      formData.append('mediaType', mediaType);
      if (reviewId) {
        formData.append('reviewId', reviewId);
      }

      // Upload to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-eeaec47f/media/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      
      setUploadProgress({ status: 'success', progress: 100 });
      
      return {
        url: result.url,
        path: result.path,
        size: result.size,
        type: result.type
      };
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed'
      });
      return null;
    }
  };

  const deleteMedia = async (filePath: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-eeaec47f/media/delete`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ filePath })
        }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  const reset = () => {
    setUploadProgress({ status: 'idle', progress: 0 });
  };

  return {
    uploadProgress,
    uploadMedia,
    deleteMedia,
    reset
  };
}
