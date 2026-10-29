import React, { useState, useEffect } from 'react';
import { GYM_INFO } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { MessageCircle, Phone, MapPin, Zap, ArrowUp, QrCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingActionsProps {
  onOpenTrialModal?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenTrialModal }) => {
  const { openShareModal } = useGym();
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating WhatsApp, QR / Share & Scroll To Top (Right Bottom) */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-end gap-3 pointer-events-auto">
        {/* Scroll To Top Pill */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-3 rounded-full bg-neutral-900/90 text-neutral-300 hover:text-[#FFD700] hover:bg-neutral-800 border border-neutral-700/80 shadow-xl transition-all duration-200 cursor-pointer backdrop-blur-sm hover:-translate-y-1 active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Share & QR Code Floating Pill */}
        <button
          onClick={openShareModal}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900/95 hover:bg-neutral-800 text-[#FFD700] hover:text-white border border-[#D4AF37]/50 hover:border-[#FFD700] shadow-xl shadow-black/80 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Share page & view QR code"
          title="Share Gym & QR Code"
        >
          <QrCode className="w-4 h-4 text-[#FFD700]" />
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200 group-hover:text-[#FFD700]">QR / Share</span>
        </button>

        {/* WhatsApp Floating Contact Pill */}
        <a
          href={GYM_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-emerald-950/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Chat on WhatsApp with Old Gym"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10" />
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="font-sans">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Mobile Sticky Thumb-Friendly Quick Bar with 4 Key Actions */}
      <nav 
        aria-label="Mobile Bottom Quick Actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-neutral-800/90 py-1.5 px-2 shadow-[0_-8px_25px_rgba(0,0,0,0.8)] pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {/* 1. Call Gym */}
          <a
            href={GYM_INFO.callUrl}
            className="min-h-[48px] py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-neutral-300 hover:text-[#FFD700] hover:bg-neutral-900/70 transition-all active:scale-95"
            aria-label="Call Old Gym Desk"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FFD700]">
              <Phone className="w-3.5 h-3.5 fill-[#FFD700]" />
            </div>
            <span className="text-[10px] font-semibold tracking-tight leading-none">
              {language === 'bn' ? 'কল করুন' : 'Call Gym'}
            </span>
          </a>

          {/* 2. WhatsApp Us */}
          <a
            href={GYM_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-neutral-300 hover:text-emerald-400 hover:bg-neutral-900/70 transition-all active:scale-95"
            aria-label="WhatsApp Old Gym"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[10px] font-semibold tracking-tight leading-none">
              {language === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}
            </span>
          </a>

          {/* 3. Map Directions */}
          <a
            href={GYM_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-neutral-300 hover:text-[#FFD700] hover:bg-neutral-900/70 transition-all active:scale-95"
            aria-label="Google Map Directions"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-semibold tracking-tight leading-none">
              {language === 'bn' ? 'লোকেশন' : 'Directions'}
            </span>
          </a>

          {/* 4. Free Pass (VIP Trial Modal trigger) */}
          <button
            type="button"
            onClick={onOpenTrialModal}
            className="min-h-[48px] py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-neutral-900 bg-gold-gradient hover:bg-gold-gradient-hover font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
            aria-label="Open Free 1-Day Trial Modal"
          >
            <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center text-black">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-tight leading-none text-black">
              {language === 'bn' ? 'ফ্রি পাস' : 'Free Pass'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
