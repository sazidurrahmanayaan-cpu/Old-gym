import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { GYM_INFO } from '../data/gymData';
import { useLanguage } from '../context/LanguageContext';
import { useGym } from '../context/GymContext';
import { 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  MessageCircle, 
  Facebook, 
  Smartphone, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import gymLogoImg from '../assets/images/old_gym_logo_badge_1790470745512.jpg';

export const ShareQrSection: React.FC = () => {
  const { language } = useLanguage();
  const { openShareModal } = useGym();
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const clean = `${window.location.protocol}//${window.location.host}/`;
      setShareUrl(clean);
    }
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        const ta = document.createElement('textarea');
        ta.value = shareUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: GYM_INFO.name,
          text: `${GYM_INFO.name} - ${GYM_INFO.tagline}. Best gym in Munshiganj with pro coaching and clean equipment.`,
          url: shareUrl || window.location.href,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadQR = () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas');
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'Old_Gym_Munshiganj_QR.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
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

  return (
    <section 
      id="share-qr" 
      className="py-16 sm:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#070707] border-t border-neutral-900 relative overflow-hidden"
    >
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Heading, Context, Copy Link, and Direct Sharing Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#FFD700] text-xs font-mono uppercase tracking-wider mb-3">
                <QrCode className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'স্ক্যান ও শেয়ার' : 'Share via QR Code & Social'}</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
                {language === 'bn' ? (
                  <>
                    বন্ধুদের সাথে <span className="text-gold-gradient">ওল্ড জিম</span> শেয়ার করুন
                  </>
                ) : (
                  <>
                    Scan or Share <span className="text-gold-gradient">Old Gym</span> with Workout Partners
                  </>
                )}
              </h2>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed max-w-xl">
                {language === 'bn' 
                  ? 'আপনার মোবাইল ক্যামেরা দিয়ে এই কিউআর কোডটি স্ক্যান করে নিমেষেই জিমের শিডিউল, পুষ্টি চার্ট, মেম্বারশিপ ফি ও ফ্রি ট্রায়াল পাস দেখুন। বন্ধুদের সাথে ফেসবুক ও হোয়াটসঅ্যাপে শেয়ার করুন।' 
                  : 'Bring a workout partner! Point your phone camera at the QR code to open the Old Gym Munshiganj portal, check ladies & men shifts, calculate BMI diet plans, or share directly on WhatsApp & Facebook.'}
              </p>
            </div>

            {/* Quick Copy Link Input Bar */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 focus-within:border-[#D4AF37]/60 shadow-xl max-w-xl transition-all">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-2 pb-1.5 flex items-center justify-between">
                <span>{language === 'bn' ? 'ওয়েবসাইট লিঙ্ক' : 'Official Web App URL'}</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live & Online
                </span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl || 'https://oldgym-munshiganj.netlify.app/'}
                  className="w-full bg-black/60 px-3.5 py-2.5 rounded-xl border border-neutral-800 text-xs sm:text-sm text-neutral-200 font-mono focus:outline-none select-all truncate"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 active:scale-95 min-h-[42px] ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'bg-gold-gradient hover:bg-gold-gradient-hover text-black shadow-md'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{language === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{language === 'bn' ? 'কপি করুন' : 'Copy Link'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Connect & Social Action Buttons (Including User's Facebook Link) */}
            <div className="flex flex-wrap items-center gap-3 pt-1 max-w-xl">
              {/* Facebook Link requested by User */}
              <a
                href={GYM_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-600/40 hover:border-blue-500 text-blue-200 hover:text-white text-xs font-bold transition-all shadow-lg shadow-blue-950/40 active:scale-95"
                title="Visit Old Gym on Facebook"
              >
                <Facebook className="w-4 h-4 text-blue-400 fill-current" />
                <span>{language === 'bn' ? 'ফেসবুকে দেখুন' : 'Visit on Facebook'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              </a>

              {/* WhatsApp Share Button */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 hover:border-emerald-500 text-emerald-200 hover:text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950/40 active:scale-95"
                title="Share link on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে শেয়ার' : 'Share via WhatsApp'}</span>
              </a>

              {/* Native Mobile Share / More Options */}
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#D4AF37]/50 text-neutral-300 hover:text-[#FFD700] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                title="Share via other mobile apps"
              >
                <Share2 className="w-4 h-4 text-[#FFD700]" />
                <span>{language === 'bn' ? 'অন্যান্য অ্যাপস' : 'More Apps'}</span>
              </button>
            </div>

            {/* Micro Feature Bullet Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-400 max-w-xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>100% Free VIP Pass</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No App Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Instant Camera Scan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual QR Code Card with Download PNG Action */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 sm:p-7 rounded-3xl bg-[#131313]/95 backdrop-blur-2xl border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] max-w-sm w-full text-center">
              
              {/* Ambient Badge Corner */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-heading text-sm font-bold uppercase tracking-wider text-white">
                    Old Gym Munshiganj
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FFD700] border border-[#D4AF37]/30 text-[10px] font-mono font-bold">
                  Official QR
                </span>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  ref={qrRef}
                  className="p-4 rounded-2xl bg-white shadow-2xl border-2 border-[#D4AF37] relative flex items-center justify-center transition-transform hover:scale-105 duration-300"
                >
                  {shareUrl ? (
                    <QRCodeCanvas
                      value={shareUrl}
                      size={200}
                      level="H"
                      marginSize={1}
                      fgColor="#000000"
                      bgColor="#ffffff"
                      imageSettings={{
                        src: gymLogoImg,
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }}
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] flex items-center justify-center text-neutral-500 font-mono text-xs">
                      Loading QR...
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-300 font-medium">
                  <Smartphone className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{language === 'bn' ? 'ক্যামেরা দিয়ে স্ক্যান করে ওপেন করুন' : 'Scan with Camera to Open'}</span>
                </div>
              </div>

              {/* Download QR PNG Button */}
              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleDownloadQR}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all duration-200 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'bn' ? 'কিউআর কোড ডাউনলোড (PNG)' : 'Download QR Code (PNG)'}</span>
                </button>

                <p className="text-[11px] text-neutral-500 font-mono pt-1">
                  High-res 300 DPI · Ready for print & posters
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
