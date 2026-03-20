import { useState, useRef, useEffect } from 'react';
import { Camera, Video, X, RotateCcw, Circle, Square, Check } from 'lucide-react';
import { Button } from './ui/button';

interface CameraCaptureProps {
  mode: 'photo' | 'video';
  onCapture: (blob: Blob, type: 'photo' | 'video') => void;
  onClose: () => void;
  maxVideoDuration?: number; // seconds
}

export function CameraCapture({ mode, onCapture, onClose, maxVideoDuration = 60 }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [error, setError] = useState<string | null>(null);

  // Start camera stream
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= maxVideoDuration) {
            stopVideoRecording();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, maxVideoDuration]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: mode === 'video'
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStreaming(true);
      setError(null);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  const retakePhoto = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
      setCapturedImage(null);
    }
    startCamera();
  };

  const confirmPhoto = () => {
    if (!capturedImage) return;

    fetch(capturedImage)
      .then(res => res.blob())
      .then(blob => {
        onCapture(blob, 'photo');
        URL.revokeObjectURL(capturedImage);
      });
  };

  const startVideoRecording = () => {
    if (!streamRef.current) return;

    try {
      const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
        ? 'video/webm; codecs=vp9'
        : 'video/webm';

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType,
        videoBitsPerSecond: 2500000
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        onCapture(blob, 'video');
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (err) {
      console.error('Error starting video recording:', err);
      setError('Failed to start video recording');
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/50 text-white border-none flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <div className="text-white font-medium">
          {mode === 'photo' ? 'Take Photo' : 'Record Video'}
        </div>

        {isStreaming && !capturedImage && (
          <Button
            onClick={switchCamera}
            className="w-10 h-10 rounded-full bg-black/50 text-white border-none flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        )}
        {capturedImage && <div className="w-10" />}
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
        {error ? (
          <div className="text-white text-center px-6">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="mb-4">{error}</p>
            <Button onClick={startCamera} className="bg-white text-black">
              Try Again
            </Button>
          </div>
        ) : capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="max-w-full max-h-full object-contain"
          />
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <Circle className="w-3 h-3 fill-white animate-pulse" />
            <span className="font-mono">{formatTime(recordingTime)}</span>
            <span className="text-sm opacity-80">/ {formatTime(maxVideoDuration)}</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-8">
          {capturedImage ? (
            <>
              <Button
                onClick={retakePhoto}
                className="w-16 h-16 rounded-full bg-white/20 text-white border-2 border-white flex items-center justify-center"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
              
              <Button
                onClick={confirmPhoto}
                className="w-20 h-20 rounded-full bg-[#fb2c36] text-white border-none flex items-center justify-center"
              >
                <Check className="w-8 h-8" />
              </Button>
              
              <div className="w-16" />
            </>
          ) : mode === 'photo' ? (
            <Button
              onClick={capturePhoto}
              disabled={!isStreaming}
              className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center disabled:opacity-50"
            >
              <Camera className="w-8 h-8 text-black" />
            </Button>
          ) : (
            <Button
              onClick={isRecording ? stopVideoRecording : startVideoRecording}
              disabled={!isStreaming}
              className={`w-20 h-20 rounded-full flex items-center justify-center border-4 disabled:opacity-50 ${
                isRecording 
                  ? 'bg-red-600 border-red-400' 
                  : 'bg-white border-gray-300'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white" />
              ) : (
                <Circle className="w-8 h-8 text-red-600 fill-red-600" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
