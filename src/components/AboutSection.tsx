import React, { useRef, useState, useEffect } from 'react';
import { GYM_INFO } from '../data/gymData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  Sparkles, 
  Dumbbell, 
  Utensils, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Flame
} from 'lucide-react';
import gymLogoImg from '../assets/images/old_gym_logo_badge_1790470745512.jpg';

interface AboutSectionProps {
  onOpenTrialModal: (topic?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenTrialModal }) => {
  const { t, language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // 6 Elite Key Features & Highlights
  const featuresList = [
    {
      id: 'coach',
      number: '01',
      icon: Award,
      badge: t('about.f1Badge', 'Certified Coaches'),
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      dotColor: 'bg-emerald-400',
      title: t('about.f1Title', 'Certified Pro Coaches'),
      subtitle: language === 'bn' ? 'জাতীয় বডিবিল্ডার পরিচালিত' : 'Run by National Champions',
      desc: t('about.f1Desc', 'Direct biomechanical guidance and rep supervision from championship bodybuilders to eliminate injuries and fast-track gains.'),
      stat: t('about.f1Stat', '100% Rep Supervision'),
      actionTopic: 'Free Trial: Certified Bodybuilding Mentorship'
    },
    {
      id: 'hygiene',
      number: '02',
      icon: Sparkles,
      badge: t('about.f2Badge', '100% Hygienic'),
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      dotColor: 'bg-emerald-400',
      title: t('about.f2Title', '100% Hygienic Space'),
      subtitle: language === 'bn' ? 'উন্নত এসি ও এয়ারফ্লো' : 'High Airflow Ventilation',
      desc: t('about.f2Desc', "Munshiganj's cleanest gym floor with continuous sanitization, sparkling mirrors, fresh filtered air, and spotless lockers."),
      stat: t('about.f2Stat', 'Daily Deep Sanitized'),
      actionTopic: 'Free Trial: Clean & Sanitized Gym Tour'
    },
    {
      id: 'equipment',
      number: '03',
      icon: Dumbbell,
      badge: t('about.f3Badge', 'Up to 40kg+'),
      badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
      dotColor: 'bg-amber-400',
      title: t('about.f3Title', 'Heavy Olympic Iron'),
      subtitle: language === 'bn' ? 'কমার্শিয়াল গ্রেড হেভি ইকুইপমেন্ট' : 'Commercial Grade Iron',
      desc: t('about.f3Desc', 'Calibrated Olympic bars, heavy dumbbells up to 40kg+, multi-grip cable towers, and dedicated heavy deadlift platforms.'),
      stat: t('about.f3Stat', '50+ Iron Stations'),
      actionTopic: 'Free Trial: Heavy Free Weights & Cages'
    },
    {
      id: 'nutrition',
      number: '04',
      icon: Utensils,
      badge: t('about.f4Badge', 'Tailored Nutrition'),
      badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
      dotColor: 'bg-amber-400',
      title: t('about.f4Title', 'Custom Bengali Diets'),
      subtitle: language === 'bn' ? 'বাস্তবসম্মত দেশীয় পুষ্টি' : 'Authentic Local Staples',
      desc: t('about.f4Desc', 'Targeted macro protocols built around accessible Bengali staples—fresh fish, eggs, chicken, and rice—for real, sustainable results.'),
      stat: t('about.f4Stat', 'Personalized Macros'),
      actionTopic: 'Personalized Bengali Nutrition Consultation'
    },
    {
      id: 'access',
      number: '05',
      icon: Clock,
      badge: t('about.f5Badge', 'Zero Queue'),
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      dotColor: 'bg-emerald-400',
      title: t('about.f5Title', 'Zero-Wait Machine Access'),
      subtitle: language === 'bn' ? 'ডুপ্লিকেট স্টেশন ও পর্যাপ্ত স্পেস' : 'Multi-Station Ergonomics',
      desc: t('about.f5Desc', 'Duplicate cable setups, multiple bench stations, and spacious aisles so you train without frustrating downtime or crowding.'),
      stat: t('about.f5Stat', 'Optimal Spacing'),
      actionTopic: 'Free Trial: Peak Hours Facility Check'
    },
    {
      id: 'brotherhood',
      number: '06',
      icon: Users,
      badge: t('about.f6Badge', 'Zero Judgement'),
      badgeColor: 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#FFD700]',
      dotColor: 'bg-[#FFD700]',
      title: t('about.f6Title', 'Inspiring Brotherhood'),
      subtitle: language === 'bn' ? 'সবার জন্য নিরাপদ ও উৎসাহব্যঞ্জক' : 'Respectful Lifters Community',
      desc: t('about.f6Desc', 'A welcoming, respectful atmosphere where first-timers and veteran powerlifters motivate each other every single set.'),
      stat: t('about.f6Stat', 'Safe Community'),
      actionTopic: 'Experience Old Gym Brotherhood'
    }
  ];

  // Track active slide on mobile horizontal scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    if (offsetWidth > 0) {
      const cardWidth = offsetWidth * 0.85;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveSlide(Math.min(featuresList.length - 1, Math.max(0, index)));
    }
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const children = carouselRef.current.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveSlide(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeSlide - 1);
    scrollToSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(featuresList.length - 1, activeSlide + 1);
    scrollToSlide(nextIndex);
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#0d0d0d] relative overflow-hidden border-t border-neutral-900">
      {/* Background Accent Grid / Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#8C6D1F] rounded-full blur-md opacity-50 group-hover:opacity-85 transition duration-500" />
              <div className="relative p-1 rounded-full bg-gradient-to-br from-[#FFE082] via-[#D4AF37] to-[#8C6D1F] shadow-2xl">
                <img
                  src={gymLogoImg}
                  alt="Old Gym Official Emblem"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <span className="w-8 h-px bg-[#FFD700]" />
            <Flame className="w-3.5 h-3.5 fill-[#FFD700]" />
            <span>{t('about.featuresBadge', 'Why Choose Old Gym')}</span>
            <span className="w-8 h-px bg-[#FFD700]" />
          </div>
          
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('about.featuresTitle', 'Engineered For Real Transformations')}
          </h2>
          
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {t('about.featuresSubtitle', 'Experience the distinction of a world-class training facility dedicated to hygiene, heavy iron, and zero ego.')}
          </p>
        </div>

        {/* Modern 3-Column Bento Grid on Desktop / Swipeable Touch Carousel on Mobile */}
        <div className="relative mb-6">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none"
          >
            {featuresList.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-[#141414]/90 border border-neutral-800/80 hover:border-[#D4AF37]/60 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5 min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-start backdrop-blur-md overflow-hidden"
                >
                  {/* Subtle top ambient corner glow on hover */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#D4AF37]/15 via-[#FFD700]/5 to-transparent rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div>
                    {/* Top Row: Icon badge + Smart Status Pill */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/5 border border-[#D4AF37]/30 text-[#FFD700] shadow-inner group-hover:scale-110 group-hover:border-[#FFD700] transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Smart Status Pill with glowing indicator dot */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border shadow-sm ${feature.badgeColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${feature.dotColor} animate-pulse`} />
                        <span>{feature.badge}</span>
                      </div>
                    </div>

                    {/* Feature Title (Max 3-4 words, bold & punchy) */}
                    <div className="space-y-1 mb-2.5">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        Feature {feature.number}
                      </div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-white tracking-wide group-hover:text-[#FFD700] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#D4AF37]">
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* Benefit-Driven Subtext (1-2 sentences) */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Card Bottom: Metric Checkpoint & Micro CTA */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-neutral-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feature.stat}</span>
                    </span>

                    <button
                      onClick={() => onOpenTrialModal(feature.actionTopic)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#FFD700] hover:text-white group/btn transition-colors cursor-pointer py-1 px-2 -mr-2 rounded-lg hover:bg-neutral-800 active:scale-95"
                    >
                      <span>{t('about.claimBenefit', 'Claim Pass')}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Touch Pagination Dots & Arrows Controls (Visible on mobile only) */}
          <div className="flex md:hidden items-center justify-between pt-2 px-1">
            {/* Prev Button (48px Touch Target) */}
            <button
              onClick={handlePrev}
              disabled={activeSlide === 0}
              aria-label="Previous Feature"
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                activeSlide === 0 
                  ? 'border-neutral-800 text-neutral-600 bg-neutral-900/50' 
                  : 'border-neutral-700 text-white bg-neutral-900 hover:text-[#FFD700] active:scale-95'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots (48px Touch Targets) */}
            <div className="flex items-center gap-1">
              {featuresList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className="w-8 h-10 flex items-center justify-center cursor-pointer group"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === dotIdx 
                        ? 'w-6 bg-[#D4AF37] shadow-sm shadow-[#D4AF37]/50' 
                        : 'w-2 bg-neutral-700 group-hover:bg-neutral-500'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next Button (48px Touch Target) */}
            <button
              onClick={handleNext}
              disabled={activeSlide === featuresList.length - 1}
              aria-label="Next Feature"
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                activeSlide === featuresList.length - 1 
                  ? 'border-neutral-800 text-neutral-600 bg-neutral-900/50' 
                  : 'border-neutral-700 text-white bg-neutral-900 hover:text-[#FFD700] active:scale-95'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visual Proof / Image Banner with Gym Narrative */}
        <div className="mt-14 relative rounded-3xl bg-neutral-900/90 border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Left Image Showcase */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[340px] overflow-hidden group">
              <img
                src="/assets/images/about_gym_equipment_1790467275863.jpg"
                alt="New Gym Equipment at Old Gym Munshiganj"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('hero_gym_dark')) {
                    target.src = '/assets/images/hero_gym_dark_1790467261162.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-xs text-[#FFD700] font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t('about.verifiedBadge', 'Verified Munshiganj Facility')}</span>
                </div>
                <h4 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white">
                  {t('about.verifiedTitle', 'Heavy Iron & Ergonomic Machines')}
                </h4>
              </div>
            </div>

            {/* Right Story & Commitments */}
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">
                  {t('about.storyBadge', 'The Old Gym Difference')}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
                  {t('about.storyTitle', 'Where Discipline Meets World-Class Training')}
                </h3>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed">
                {t('about.storyDesc', 'Unlike crowded commercial spaces with broken gear, Old Gym is maintained daily by lifters who take pride in their craft. Whether you want to lose weight or compete, our supportive brotherhood ensures guaranteed progress.')}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#D4AF37]/20 text-[#FFD700] mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">
                      {t('about.point1Title', 'Zero Judgement, 100% Brotherhood')}
                    </h5>
                    <p className="text-xs text-neutral-400">
                      {t('about.point1Desc', 'Friendly staff and respectful members create an inspiring and safe training culture.')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#D4AF37]/20 text-[#FFD700] mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">
                      {t('about.point2Title', 'Direct Guidance on Every Rep')}
                    </h5>
                    <p className="text-xs text-neutral-400">
                      {t('about.point2Desc', 'Avoid injuries. Our coaches actively ensure correct biomechanical form and posture.')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenTrialModal('General Facility Tour')}
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all duration-200 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
                >
                  {t('about.ctaExperience', 'Experience It in Person')}
                </button>
                <a
                  href={GYM_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-300 hover:text-[#FFD700] flex items-center gap-1.5 transition-colors py-2"
                >
                  {t('about.ctaMaps', 'Locate on Google Maps (HF2W+4J8) →')}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
