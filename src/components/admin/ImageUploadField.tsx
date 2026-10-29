import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  required?: boolean;
}

/**
 * Compresses and scales down large device photos to clean web-ready data URLs
 * preventing localStorage quota exceeded errors while retaining crisp visual quality.
 */
const processImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If SVG or tiny, read directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(format, 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText = 'Upload from your phone/computer (PNG, JPG, WEBP) or enter an image link.',
  aspectRatio = 'square',
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Image size exceeds 15MB limit. Please choose a smaller photo.');
      return;
    }

    try {
      setIsProcessing(true);
      setUploadError(null);
      const dataUrl = await processImageFile(file);
      onChange(dataUrl);
      setIsProcessing(false);
    } catch (err) {
      console.error('Error processing image:', err);
      setUploadError('Failed to read image file. Please try another image.');
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isLocalDataUrl = value?.startsWith('data:image/');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-neutral-400 hover:text-[#FFD700] transition-colors flex items-center gap-1 cursor-pointer font-mono"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL input' : 'Or paste URL'}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload / Preview Area */}
      {value ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3 overflow-hidden shadow-inner flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-black border border-neutral-700/80 shrink-0 group">
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = '/assets/images/about_gym_equipment_1790467275863.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] text-white font-mono bg-black/70 px-2 py-0.5 rounded">Preview</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                <Check className="w-3 h-3 text-emerald-400" />
                {isLocalDataUrl ? 'Device Photo Ready' : 'Image Link Loaded'}
              </span>
            </div>

            <p className="text-xs text-neutral-300 font-mono truncate max-w-sm">
              {isLocalDataUrl ? 'Local high-res image optimized' : value}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-semibold text-white transition-all cursor-pointer active:scale-95"
              >
                Change Photo
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/80 border border-rose-800/60 text-xs font-semibold text-rose-300 hover:text-white transition-all cursor-pointer active:scale-95"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#FFD700] bg-amber-500/10 scale-[1.01]'
              : 'border-neutral-800 hover:border-[#D4AF37]/60 bg-neutral-900/60 hover:bg-neutral-900/90'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-[#FFD700] shadow-md group-hover:scale-110 transition-transform">
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {isProcessing ? 'Optimizing photo...' : 'Click to Upload Photo from Device'}
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                or drag & drop your image file here
              </p>
            </div>

            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800">
              Supports PNG, JPG, WEBP · Auto-compressed for speed
            </span>
          </div>
        </div>
      )}

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Optional URL Input Fallback */}
      {showUrlInput && (
        <div className="pt-1.5 animate-in fade-in duration-150">
          <div className="relative">
            <div className="absolute left-3 top-2.5 text-neutral-500">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setUploadError(null);
              }}
              placeholder="Paste public image link (e.g. /assets/images/... or https://...)"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {helperText && !uploadError && (
        <p className="text-[11px] text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};
