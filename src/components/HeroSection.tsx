import React, { useState, useRef } from 'react';
import { Dumbbell, Sparkles, Trophy, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { useLanguage } from '../context/LanguageContext';
import gymLogoImg from '../assets/images/old_gym_logo_badge_1790470745512.jpg';

interface HeroSectionProps {
  onOpenTrialModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTrialModal }) => {
  const { t, language } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-4 pb-16 lg:py-24">
      {/* Background Hero Video Loop with Fallback Poster */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/hero_gym_dark_1790467261162.jpg"
          preload="metadata"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-muscular-man-exercising-with-dumbbells-in-a-gym-42797-large.mp4"
            type="video/mp4"
          />
          {/* Fallback image */}
          <img
            src="/assets/images/hero_gym_dark_1790467261162.jpg"
            alt="Old Gym Munshiganj"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
        </video>

        {/* Layered dark scrims for contrast & high text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_65%)]" />

        {/* Ambient Gold Aura & Particles Effect */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none animate-gold-aura" />
        <div className="absolute bottom-1/3 left-10 w-72 h-72 bg-[#FFD700]/10 rounded-full blur-[80px] pointer-events-none animate-pulse" />
      </div>

      {/* Floating Video Audio Control */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 left-6 z-20 p-2.5 rounded-full bg-black/60 hover:bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-[#FFD700] backdrop-blur-md transition-all cursor-pointer shadow-lg hidden sm:flex items-center gap-2 text-xs"
        aria-label="Toggle ambient gym sound"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FFD700]" />}
        <span className="text-[11px] font-mono">{isMuted ? 'Muted' : 'Sound On'}</span>
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Badge, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Rating Badge & Official Emblem */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-gold text-xs text-neutral-200 shadow-xl">
                <img
                  src={gymLogoImg}
                  alt="Old Gym Crest"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-[#FFD700]"
                />
                <span className="flex items-center text-amber-400 font-bold">
                  ⭐ {language === 'bn' ? '৪.৬' : '4.6'} ({language === 'bn' ? '১৪টি' : '14'} {t('hero.badgeReviews', 'Google Reviews')})
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-300 font-medium">{t('hero.badgeLoved', "Munshiganj's Most Loved")}</span>
              </div>
            </div>

            {/* Main Big Gym Heading */}
            <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.05] text-balance">
              {t('hero.title1', 'BUILD YOUR BODY,')} <br />
              <span className="text-gold-gradient inline-block">{t('hero.title2', 'BUILD YOUR LEGACY')}</span>
            </h1>

            {/* Subtitle & Bengali Trust Marker */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              {t('hero.subtitle', "Old Gym is Munshiganj's most clean and professional fitness center, run by professional bodybuilders.")}
            </p>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-400 border-l-2 border-[#D4AF37] pl-3 py-0.5">
              <span className="font-medium text-neutral-200">{t('hero.bengaliTag', GYM_INFO.bengaliName)}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-[#D4AF37] font-semibold">{t('hero.tagline', GYM_INFO.tagline)}</span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenTrialModal}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(255,215,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t('hero.startTrial', 'Start Your Free Trial')}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Quick Proof metrics row */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-neutral-800/80 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-white tabular-nums">{t('hero.ratingStat', '4.6★')}</p>
                <p className="text-xs text-neutral-400">{t('hero.ratingStatLabel', 'Google Rating')}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-[#FFD700] tabular-nums">{t('hero.equipStat', '50+')}</p>
                <p className="text-xs text-neutral-400">{t('hero.equipStatLabel', 'Iron Equipment')}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-white tabular-nums">{t('hero.proStat', '100%')}</p>
                <p className="text-xs text-neutral-400">{t('hero.proStatLabel', 'Pro Bodybuilder Run')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Floating Stats Cards with Glassmorphism */}
          <div className="lg:col-span-5 relative flex flex-col gap-4">
            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/15 to-transparent blur-3xl -z-10 rounded-3xl" />

            {/* Card 1: New Equipment */}
            <div className="group relative p-5 rounded-2xl glass-gold shadow-2xl transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[#FFD700] group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                      {t('hero.card1Title', 'New Equipment')}
                    </h3>
                    <span className="text-[11px] font-mono text-amber-400/90 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                      {t('hero.card1Badge', 'Up to 40kg+')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {t('hero.card1Desc', 'Heavy calibrated Olympic iron, power cages, cable crossover, and ergonomic isolation machines.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Clean Environment */}
            <div className="group relative p-5 rounded-2xl glass-gold shadow-2xl transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[#FFD700] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                      {t('hero.card2Title', 'Clean Environment')}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {t('hero.card2Badge', '100% Hygienic')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {t('hero.card2Desc', 'Pristine ventilation, zero-odor air flow, daily sanitization routines, and spacious workout zones.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Pro Trainers */}
            <div className="group relative p-5 rounded-2xl glass-gold shadow-2xl transform hover:-translate-y-1 border-[#D4AF37]/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFD700] group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                      {t('hero.card3Title', 'Pro Trainers')}
                    </h3>
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                      {t('hero.card3Badge', 'Champion Run')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {t('hero.card3Desc', 'Direct guidance from competitive bodybuilding medalists who master biomechanics & contest nutrition.')}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
