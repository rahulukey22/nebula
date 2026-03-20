/**
 * Audio Recording Utility
 * Handles audio recording from microphone with compression
 */

export interface AudioRecordingOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  maxDurationSeconds?: number;
}

export interface AudioRecordingResult {
  blob: Blob;
  duration: number;
  size: number;
  mimeType: string;
}

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private startTime: number = 0;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  /**
   * Start recording audio from microphone
   */
  async startRecording(options: AudioRecordingOptions = {}): Promise<void> {
    try {
      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      // Determine best supported mime type
      const mimeType = options.mimeType || this.getBestMimeType();
      
      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType,
        audioBitsPerSecond: options.audioBitsPerSecond || 128000
      });

      this.audioChunks = [];
      this.startTime = Date.now();

      // Setup audio visualization
      this.setupAudioVisualization(this.stream);

      // Handle data available
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // Start recording
      this.mediaRecorder.start(100); // Collect data every 100ms

      // Auto-stop after max duration
      if (options.maxDurationSeconds) {
        setTimeout(() => {
          if (this.mediaRecorder?.state === 'recording') {
            this.stopRecording();
          }
        }, options.maxDurationSeconds * 1000);
      }
    } catch (error) {
      console.error('Error starting audio recording:', error);
      throw new Error('Failed to start audio recording. Please ensure microphone access is granted.');
    }
  }

  /**
   * Stop recording and return audio blob
   */
  async stopRecording(): Promise<AudioRecordingResult> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const duration = (Date.now() - this.startTime) / 1000;
        const blob = new Blob(this.audioChunks, { type: this.mediaRecorder!.mimeType });
        
        // Stop all tracks
        this.stream?.getTracks().forEach(track => track.stop());
        
        // Close audio context
        this.audioContext?.close();

        resolve({
          blob,
          duration,
          size: blob.size,
          mimeType: this.mediaRecorder!.mimeType
        });

        // Cleanup
        this.mediaRecorder = null;
        this.stream = null;
        this.audioChunks = [];
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Cancel recording without saving
   */
  cancelRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    
    this.stream?.getTracks().forEach(track => track.stop());
    this.audioContext?.close();
    
    this.mediaRecorder = null;
    this.stream = null;
    this.audioChunks = [];
  }

  /**
   * Get current recording duration
   */
  getCurrentDuration(): number {
    if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') {
      return 0;
    }
    return (Date.now() - this.startTime) / 1000;
  }

  /**
   * Check if currently recording
   */
  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  /**
   * Get audio level for visualization (0-100)
   */
  getAudioLevel(): number {
    if (!this.analyser || !this.dataArray) {
      return 0;
    }

    this.analyser.getByteFrequencyData(this.dataArray);
    
    // Calculate average level
    const sum = this.dataArray.reduce((a, b) => a + b, 0);
    const average = sum / this.dataArray.length;
    
    // Convert to 0-100 scale
    return Math.min(100, (average / 255) * 100);
  }

  /**
   * Setup audio visualization
   */
  private setupAudioVisualization(stream: MediaStream): void {
    try {
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      
      source.connect(this.analyser);
    } catch (error) {
      console.warn('Failed to setup audio visualization:', error);
    }
  }

  /**
   * Get best supported audio mime type
   */
  private getBestMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/mpeg'
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return ''; // Use default
  }
}

/**
 * Check if audio recording is supported
 */
export function isAudioRecordingSupported(): boolean {
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    window.MediaRecorder
  );
}

/**
 * Request microphone permission
 */
export async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Microphone permission denied:', error);
    return false;
  }
}
