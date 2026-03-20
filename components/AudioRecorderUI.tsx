import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause, X, Check, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { AudioRecorder } from '../utils/audioRecording';

interface AudioRecorderUIProps {
  onComplete: (blob: Blob) => void;
  onClose: () => void;
  maxDuration?: number; // seconds
}

export function AudioRecorderUI({ onComplete, onClose, maxDuration = 300 }: AudioRecorderUIProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<AudioRecorder>(new AudioRecorder());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      recorderRef.current.cancelRecording();
    };
  }, [audioUrl]);

  // Update duration while recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        const currentDuration = recorderRef.current.getCurrentDuration();
        setDuration(currentDuration);
        
        if (currentDuration >= maxDuration) {
          stopRecording();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, maxDuration]);

  // Update audio level visualization
  useEffect(() => {
    const updateLevel = () => {
      if (isRecording && !isPaused) {
        const level = recorderRef.current.getAudioLevel();
        setAudioLevel(level);
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      }
    };

    if (isRecording && !isPaused) {
      updateLevel();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      await recorderRef.current.startRecording({ maxDurationSeconds: maxDuration });
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      setError(null);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording. Please check microphone permissions.');
    }
  };

  const stopRecording = async () => {
    try {
      const result = await recorderRef.current.stopRecording();
      setIsRecording(false);
      setDuration(result.duration);
      setAudioBlob(result.blob);
      setAudioUrl(URL.createObjectURL(result.blob));
      setAudioLevel(0);
    } catch (err) {
      console.error('Error stopping recording:', err);
      setError('Failed to stop recording');
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const confirmRecording = () => {
    if (audioBlob) {
      onComplete(audioBlob);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#fb2c36] to-[#ff5c5c] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Record Audio</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-mono font-bold mb-2">
              {formatTime(duration)}
            </div>
            <div className="text-sm opacity-80">
              {isRecording ? 'Recording...' : audioBlob ? 'Recording Complete' : 'Ready to Record'}
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="p-8 bg-gray-50">
          <div className="flex items-center justify-center gap-1 h-32">
            {isRecording ? (
              // Audio level bars
              Array.from({ length: 20 }).map((_, i) => {
                const height = Math.random() * audioLevel + 20;
                return (
                  <div
                    key={i}
                    className="w-2 bg-[#fb2c36] rounded-full transition-all duration-100"
                    style={{ 
                      height: `${height}%`,
                      opacity: 0.5 + (audioLevel / 200)
                    }}
                  />
                );
              })
            ) : audioBlob ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#fb2c36]/10 flex items-center justify-center">
                  <Mic className="w-10 h-10 text-[#fb2c36]" />
                </div>
                <audio 
                  ref={audioRef}
                  src={audioUrl || ''}
                  onEnded={handleAudioEnded}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Mic className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 py-3 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="p-6 space-y-4">
          {!audioBlob ? (
            // Recording controls
            <div className="flex items-center justify-center gap-4">
              {isRecording ? (
                <Button
                  onClick={stopRecording}
                  className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center"
                >
                  <Square className="w-8 h-8" />
                </Button>
              ) : (
                <Button
                  onClick={startRecording}
                  className="w-20 h-20 rounded-full bg-[#fb2c36] text-white flex items-center justify-center"
                >
                  <Mic className="w-8 h-8" />
                </Button>
              )}
            </div>
          ) : (
            // Playback controls
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-6">
                <Button
                  onClick={deleteRecording}
                  className="w-14 h-14 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center"
                >
                  <Trash2 className="w-6 h-6" />
                </Button>

                <Button
                  onClick={togglePlayback}
                  className="w-16 h-16 rounded-full bg-[#fb2c36] text-white flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" />
                  )}
                </Button>

                <Button
                  onClick={confirmRecording}
                  className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center"
                >
                  <Check className="w-6 h-6" />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                Tap play to review • Tap checkmark to use
              </div>
            </div>
          )}

          <div className="text-center text-xs text-gray-400">
            Max duration: {formatTime(maxDuration)}
          </div>
        </div>
      </div>
    </div>
  );
}
