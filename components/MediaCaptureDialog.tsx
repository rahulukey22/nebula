import { useState, useRef, lazy, Suspense } from 'react';
import { Camera, Video, Mic, Upload, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { compressImage } from '../utils/imageOptimization';
import { compressVideo } from '../utils/videoCompression';

// Lazy load heavy components
const CameraCapture = lazy(() => import('./CameraCapture').then(m => ({ default: m.CameraCapture })));
const AudioRecorderUI = lazy(() => import('./AudioRecorderUI').then(m => ({ default: m.AudioRecorderUI })));

type MediaType = 'photo' | 'video' | 'audio';
type CaptureMode = 'menu' | 'camera-photo' | 'camera-video' | 'audio' | 'uploading';

interface MediaCaptureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaCaptured: (file: File, type: MediaType) => void;
  allowedTypes: MediaType[];
  title?: string;
}

export function MediaCaptureDialog({
  isOpen,
  onClose,
  onMediaCaptured,
  allowedTypes,
  title = 'Add Media'
}: MediaCaptureDialogProps) {
  const [captureMode, setCaptureMode] = useState<CaptureMode>('menu');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setCaptureMode('menu');
    setUploadProgress(0);
    onClose();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCaptureMode('uploading');
    setUploadProgress(10);

    try {
      let processedFile: File;
      let mediaType: MediaType;

      if (file.type.startsWith('image/')) {
        setUploadProgress(30);
        const compressed = await compressImage(file);
        processedFile = new File([compressed], file.name, { type: 'image/jpeg' });
        mediaType = 'photo';
        setUploadProgress(70);
      } else if (file.type.startsWith('video/')) {
        setUploadProgress(30);
        try {
          const result = await compressVideo(file);
          processedFile = new File([result.blob], file.name, { type: result.blob.type });
          console.log(`Video compressed: ${(result.originalSize / 1024 / 1024).toFixed(2)}MB → ${(result.compressedSize / 1024 / 1024).toFixed(2)}MB`);
        } catch (error) {
          console.warn('Video compression failed, using original:', error);
          processedFile = file;
        }
        mediaType = 'video';
        setUploadProgress(70);
      } else if (file.type.startsWith('audio/')) {
        processedFile = file;
        mediaType = 'audio';
        setUploadProgress(70);
      } else {
        alert('Unsupported file type');
        setCaptureMode('menu');
        return;
      }

      setUploadProgress(90);
      onMediaCaptured(processedFile, mediaType);
      setUploadProgress(100);
      
      setTimeout(() => {
        handleClose();
      }, 300);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Failed to process file. Please try again.');
      setCaptureMode('menu');
    }
  };

  const handleCameraCapture = async (blob: Blob, type: 'photo' | 'video') => {
    setCaptureMode('uploading');
    setUploadProgress(10);

    try {
      let processedBlob: Blob;

      if (type === 'photo') {
        setUploadProgress(30);
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        processedBlob = await compressImage(file);
        setUploadProgress(70);
      } else {
        setUploadProgress(30);
        try {
          const file = new File([blob], 'video.webm', { type: blob.type });
          const result = await compressVideo(file);
          processedBlob = result.blob;
          console.log(`Video compressed: ${(result.originalSize / 1024 / 1024).toFixed(2)}MB → ${(result.compressedSize / 1024 / 1024).toFixed(2)}MB`);
        } catch (error) {
          console.warn('Video compression failed, using original:', error);
          processedBlob = blob;
        }
        setUploadProgress(70);
      }

      const fileName = type === 'photo' ? 'captured-photo.jpg' : 'captured-video.webm';
      const file = new File([processedBlob], fileName, { type: processedBlob.type });
      
      setUploadProgress(90);
      onMediaCaptured(file, type);
      setUploadProgress(100);

      setTimeout(() => {
        handleClose();
      }, 300);
    } catch (error) {
      console.error('Error processing captured media:', error);
      alert('Failed to process media. Please try again.');
      setCaptureMode('menu');
    }
  };

  const handleAudioCapture = async (blob: Blob) => {
    setCaptureMode('uploading');
    setUploadProgress(50);

    const file = new File([blob], 'audio-recording.webm', { type: blob.type });
    
    setUploadProgress(90);
    onMediaCaptured(file, 'audio');
    setUploadProgress(100);

    setTimeout(() => {
      handleClose();
    }, 300);
  };

  // Camera/Audio capture views
  if (captureMode === 'camera-photo' || captureMode === 'camera-video') {
    return (
      <Suspense fallback={
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      }>
        <CameraCapture
          mode={captureMode === 'camera-photo' ? 'photo' : 'video'}
          onCapture={handleCameraCapture}
          onClose={() => setCaptureMode('menu')}
        />
      </Suspense>
    );
  }

  if (captureMode === 'audio') {
    return (
      <Suspense fallback={
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      }>
        <AudioRecorderUI
          onComplete={handleAudioCapture}
          onClose={() => setCaptureMode('menu')}
        />
      </Suspense>
    );
  }

  // Uploading state
  if (captureMode === 'uploading') {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#000000] animate-spin mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Processing...</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#000000] h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">{uploadProgress}%</p>
          </div>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center p-0">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {/* Take Photo */}
          {allowedTypes.includes('photo') && (
            <>
              <button
                onClick={() => setCaptureMode('camera-photo')}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Take Photo</div>
                  <div className="text-sm text-gray-500">Use your camera</div>
                </div>
              </button>
            </>
          )}

          {/* Record Video */}
          {allowedTypes.includes('video') && (
            <button
              onClick={() => setCaptureMode('camera-video')}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">Record Video</div>
                <div className="text-sm text-gray-500">Shoot a video</div>
              </div>
            </button>
          )}

          {/* Record Audio */}
          {allowedTypes.includes('audio') && (
            <button
              onClick={() => setCaptureMode('audio')}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">Record Audio</div>
                <div className="text-sm text-gray-500">Voice recording</div>
              </div>
            </button>
          )}

          {/* Upload File */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">Upload File</div>
              <div className="text-sm text-gray-500">Choose from device</div>
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept={allowedTypes.map(t => {
              if (t === 'photo') return 'image/*';
              if (t === 'video') return 'video/*';
              if (t === 'audio') return 'audio/*';
              return '';
            }).join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Cancel */}
        <div className="p-6 pt-0">
          <Button
            onClick={handleClose}
            className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}