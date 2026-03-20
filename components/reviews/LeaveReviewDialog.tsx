import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Star, Upload, X, Image as ImageIcon, Film, Mic, Camera, Video } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { compressImage } from "../../utils/imageOptimization";
import { MediaCaptureDialog } from "../MediaCaptureDialog";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
}

interface LeaveReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  initialRating: number;
  onSubmit: (productId: number, rating: number, text: string, files: File[]) => void | Promise<void>;
}

interface SubRatings {
  quality: number;
  fitComfort: number;
  valueForMoney: number;
  styleDesign: number;
}

type SizeFit = 'too-small' | 'slightly-small' | 'just-right' | 'slightly-large' | 'very-generous' | null;

export function LeaveReviewDialog({ isOpen, onClose, product, initialRating, onSubmit }: LeaveReviewDialogProps) {
  const [rating, setRating] = useState(initialRating);
  const [subRatings, setSubRatings] = useState<SubRatings>({
    quality: 0,
    fitComfort: 0,
    valueForMoney: 0,
    styleDesign: 0,
  });
  const [sizeFit, setSizeFit] = useState<SizeFit>(null);
  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state when dialog opens/changes
  React.useEffect(() => {
    if (isOpen) {
      setRating(initialRating);
      setSubRatings({
        quality: 0,
        fitComfort: 0,
        valueForMoney: 0,
        styleDesign: 0,
      });
      setSizeFit(null);
      setReviewText("");
      setFiles([]);
      setIsSubmitting(false);
      setCountdown(3);
    }
  }, [isOpen, initialRating]);

  // Countdown timer effect
  React.useEffect(() => {
    if (isSubmitting && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isSubmitting && countdown === 0) {
      // Actually submit
      handleActualSubmit();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSubmitting, countdown]);

  if (!product) return null;

  const handleMediaCaptured = async (file: File, type: 'photo' | 'video' | 'audio') => {
    // File is already compressed by MediaCaptureDialog
    setFiles((prev) => [...prev, file]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // Compress images before adding to state
      const processedFiles = await Promise.all(
        fileArray.map(async (file) => {
          if (file.type.startsWith('image/')) {
            try {
              const compressedBlob = await compressImage(file, 1200, 0.85);
              return new File([compressedBlob], file.name.replace(/\.\w+$/, '.webp'), { type: 'image/webp' });
            } catch (error) {
              console.error('Failed to compress image:', error);
              return file; // Use original if compression fails
            }
          }
          return file; // Non-image files pass through
        })
      );
      
      setFiles((prev) => [...prev, ...processedFiles]);
    }
  };

  const handleVideoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // Compress images, pass through videos (server will handle video compression)
      const processedFiles = await Promise.all(
        fileArray.map(async (file) => {
          if (file.type.startsWith('image/')) {
            try {
              const compressedBlob = await compressImage(file, 1200, 0.85);
              return new File([compressedBlob], file.name.replace(/\.\w+$/, '.webp'), { type: 'image/webp' });
            } catch (error) {
              console.error('Failed to compress image:', error);
              return file;
            }
          }
          return file;
        })
      );
      
      setFiles((prev) => [...prev, ...processedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Start countdown
    setIsSubmitting(true);
    setCountdown(3);
  };

  const handleCancel = () => {
    // Cancel submission
    setIsSubmitting(false);
    setCountdown(3);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleActualSubmit = async () => {
    await onSubmit(product.id, rating, reviewText, files);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Leave a Review</DialogTitle>
          <DialogDescription className="sr-only">
            Rate and review your purchase. Share your experience with photos, videos, or audio.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          {/* Product Info */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
               {product.image.startsWith('figma:') ? (
                 <ImageWithFallback 
                   src={product.image} 
                   alt={product.name} 
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
               )}
            </div>
            <div>
              <p className="font-semibold text-sm text-[#101828]">{product.name}</p>
              <p className="text-sm text-[#6a7282]">{product.size} • {product.color}</p>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Overall Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
              <span className="text-sm text-[#6a7282] ml-2">
                {rating === 0 ? "Tap to rate" : rating === 5 ? "Excellent!" : rating === 4 ? "Good" : rating === 3 ? "Average" : rating === 2 ? "Poor" : "Very Poor"}
              </span>
            </div>
          </div>

          {/* Sub Ratings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Rate the Details</Label>
            
            {/* Quality */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4a5565]">Product Quality</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSubRatings({ ...subRatings, quality: star })}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= subRatings.quality ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results & Effectiveness */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4a5565]">Taste & Flavor</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSubRatings({ ...subRatings, fitComfort: star })}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= subRatings.fitComfort ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Value for Money */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4a5565]">Value for Money</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSubRatings({ ...subRatings, valueForMoney: star })}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= subRatings.valueForMoney ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Texture & Application */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4a5565]">Presentation & Style</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSubRatings({ ...subRatings, styleDesign: star })}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= subRatings.styleDesign ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Portion Size Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">How's the portion size?</Label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { value: 'too-small', label: 'Too Small' },
                { value: 'slightly-small', label: 'Slightly Small' },
                { value: 'just-right', label: 'Just Right' },
                { value: 'slightly-large', label: 'Slightly Large' },
                { value: 'very-generous', label: 'Very Generous' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSizeFit(option.value as SizeFit)}
                  className={`h-16 border-2 rounded-lg flex items-center justify-center text-center px-1 transition-all ${
                    sizeFit === option.value 
                      ? 'border-[#000000] bg-[#000000]/5' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <span className="text-[11px] leading-tight text-[#4a5565] font-medium">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-sm font-medium">
              Write your review
            </Label>
            <Textarea
              id="review"
              placeholder="Share details about your experience with this product..."
              className="resize-none min-h-[100px] text-sm"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Add Photos, Videos or Audio (Optional)</Label>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowMediaDialog(true)}
                className="w-20 h-20 border-2 border-dashed border-[#000000]/30 bg-[#000000]/5 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-[#000000] hover:bg-[#000000]/10 transition-colors"
              >
                <Camera className="w-5 h-5 text-[#000000]" />
                <span className="text-[10px] text-[#000000] font-medium">Add Media</span>
              </button>

              {files.map((file, index) => (
                <div key={index} className="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-0.5 right-0.5 bg-black/50 rounded-full p-0.5 text-white z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : file.type.startsWith('video/') ? (
                    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-1">
                      <Film className="w-6 h-6 text-gray-600" />
                      <span className="text-[9px] text-gray-500 px-1 text-center line-clamp-2">{file.name.split('.').pop()?.toUpperCase()}</span>
                    </div>
                  ) : file.type.startsWith('audio/') ? (
                    <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center gap-1">
                      <Mic className="w-6 h-6 text-blue-600" />
                      <span className="text-[9px] text-blue-700 px-1 text-center line-clamp-2">{file.name.split('.').pop()?.toUpperCase()}</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-1">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-[9px] text-gray-500 px-1 text-center line-clamp-2 break-all">{file.name.substring(0, 10)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={isSubmitting ? handleCancel : handleSubmit} 
            className="w-full bg-[#000000] text-white rounded-lg font-medium transition-all relative overflow-hidden hover:bg-[#1a1a1a]"
            style={{ height: isSubmitting ? '60px' : '48px' }}
          >
            {isSubmitting && (
              <div 
                className="absolute inset-0 bg-white/20 transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${((3 - countdown) / 3) * 100}%`,
                  left: 0,
                  top: 0,
                }}
              />
            )}
            <div className="relative z-10">
              {isSubmitting ? (
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-sm font-medium">Submitting review... {countdown}</span>
                  <span className="text-xs text-gray-300">Tap to cancel</span>
                </div>
              ) : (
                <span>Submit Review</span>
              )}
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Media Capture Dialog */}
      <MediaCaptureDialog
        isOpen={showMediaDialog}
        onClose={() => setShowMediaDialog(false)}
        onMediaCaptured={handleMediaCaptured}
        allowedTypes={['photo', 'video', 'audio']}
        title="Add Media"
      />
    </Dialog>
  );
}