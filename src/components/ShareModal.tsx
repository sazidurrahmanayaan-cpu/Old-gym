import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useGym } from '../context/GymContext';
import { useLanguage } from '../context/LanguageContext';
import { GYM_INFO } from '../data/gymData';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  QrCode, 
  MessageCircle, 
  Facebook, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { GymLogo } from './GymLogo';
import gymLogoImg from '../assets/images/old_gym_logo_badge_1790470745512.jpg';

export const ShareModal: React.FC = () => {
  const { showShareModal, setShowShareModal } = useGym();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const qrCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use clean canonical URL without hash/admin query for public sharing
      const cleanUrl = `${window.location.protocol}//${window.location.host}/`;
      setShareUrl(cleanUrl);
    }
  }, [showShareModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showShareModal) {
        setShowShareModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShareModal, setShowShareModal]);

  if (!showShareModal) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: GYM_INFO.name,
          text: `${GYM_INFO.name} - ${GYM_INFO.tagline}. Munshiganj's cleanest & most professional fitness center.`,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed silently
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQR = () => {
    try {
      const canvas = qrCanvasRef.current?.querySelector('canvas');
      if (canvas) {
        // Create high-res download
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'Old_Gym_Munshiganj_QR.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Direct fallback to QR API download
        const fallbackUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shareUrl)}`;
        window.open(fallbackUrl, '_blank');
      }
    } catch (err) {
      console.error('Failed to download QR code:', err);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out ${GYM_INFO.name} in Munshiganj! ${GYM_INFO.tagline}. Visit: ${shareUrl}`
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setShowShareModal(false)}
    >
      <div
        className="relative max-w-md w-full bg-[#121212]/98 backdrop-blur-2xl border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-7 text-left shadow-[0_0_50px_rgba(212,175,55,0.25)] transition-all duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-36 h-36 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowShareModal(false)}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer active:scale-95 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-5">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/5 border border-[#D4AF37]/40 text-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-1">
            <QrCode className="w-6 h-6 text-[#FFD700]" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 inline-block mb-1">
              {language === 'bn' ? 'শেয়ার ও কিউআর কোড' : 'Share & Connect'}
            </span>
            <h3 
              id="share-modal-title"
              className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-wide"
            >
              {language === 'bn' ? 'ওল্ড জিম ভিজিট করতে স্ক্যান করুন' : 'Scan to visit Old Gym'}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5 max-w-xs mx-auto leading-relaxed">
              {language === 'bn' 
                ? 'মোবাইল ক্যামেরা দিয়ে স্ক্যান করুন অথবা জিম লিঙ্কটি বন্ধুদের সাথে শেয়ার করুন।' 
                : 'Scan with your smartphone camera or share the web link with workout partners.'}
            </p>
          </div>
        </div>

        {/* High-Contrast Crisp QR Code Card */}
        <div className="flex flex-col items-center justify-center mb-5">
          <div 
            ref={qrCanvasRef}
            className="p-4 rounded-2xl bg-white shadow-2xl border-2 border-[#D4AF37] relative flex items-center justify-center group"
          >
            {shareUrl ? (
              <QRCodeCanvas
                value={shareUrl}
                size={190}
                level="H"
                marginSize={1}
                fgColor="#000000"
                bgColor="#ffffff"
                imageSettings={{
                  src: gymLogoImg,
                  x: undefined,
                  y: undefined,
                  height: 38,
                  width: 38,
                  excavate: true,
                }}
              />
            ) : (
              <div className="w-[190px] h-[190px] flex items-center justify-center bg-neutral-100 rounded-lg text-neutral-400 text-xs font-mono">
                Generating QR...
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-2 font-mono">
            <Smartphone className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>{language === 'bn' ? 'যেকোনো ক্যামেরা দিয়ে স্ক্যানযোগ্য' : 'Instant Scan on iOS & Android'}</span>
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-neutral-900 border border-neutral-800 focus-within:border-[#D4AF37]/60 transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent border-0 text-xs text-neutral-300 font-mono flex-1 focus:outline-none select-all truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-gold-gradient hover:bg-gold-gradient-hover text-black shadow-md'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{language === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কপি লিঙ্ক' : 'Copy Link'}</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Share Options: WhatsApp, Facebook, Native Share */}
          <div className="grid grid-cols-3 gap-2">
            {/* WhatsApp Share */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 hover:border-emerald-500 text-emerald-300 hover:text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Facebook Share */}
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-600/40 hover:border-blue-500 text-blue-300 hover:text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
              title="Share on Facebook"
            >
              <Facebook className="w-3.5 h-3.5 fill-current" />
              <span>Facebook</span>
            </a>

            {/* Native Mobile Share / More */}
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-[#FFD700] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              title="More Share Options"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{typeof navigator !== 'undefined' && 'share' in navigator ? 'More' : 'Share'}</span>
            </button>
          </div>

          {/* Direct Link to Official Facebook */}
          <div className="pt-1">
            <a
              href={GYM_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-950/30 hover:bg-blue-900/50 border border-blue-600/30 hover:border-blue-500/60 text-blue-300 hover:text-white text-xs font-semibold transition-all active:scale-95"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-400 fill-current" />
              <span>{language === 'bn' ? 'ফেসবুকে ওল্ড জিম দেখুন' : 'View Old Gym on Facebook'}</span>
              <ExternalLink className="w-3 h-3 text-blue-300" />
            </a>
          </div>
        </div>

        {/* Footer Actions: Download QR Code Button */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={handleDownloadQR}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#FFD700] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-[#FFD700]" />
            <span>{language === 'bn' ? 'কিউআর কোড ডাউনলোড (PNG)' : 'Download QR Code (PNG)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
