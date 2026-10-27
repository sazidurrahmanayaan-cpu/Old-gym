import React, { useState, useEffect, useRef } from 'react';
import { GymLogo } from './GymLogo';
import { GYM_INFO } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  Menu, 
  X, 
  MapPin, 
  Globe, 
  ChevronDown, 
  Zap,
  Utensils,
  Users,
  Activity,
  Star,
  Camera
} from 'lucide-react';

interface NavbarProps {
  onOpenTrialModal: (defaultPlan?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrialModal }) => {
  const { gymHours } = useGym();
  const { language, toggleLanguage, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation links visible in main navbar
  const primaryLinks = [
    { name: t('nav.home', 'Home'), href: '#home' },
    { name: t('nav.about', 'About'), href: '#about' },
    { name: t('nav.equipment', 'Equipment'), href: '#equipment' },
    { name: t('nav.classes', 'Classes'), href: '#classes' },
    { name: t('nav.transformations', 'Transformations'), href: '#transformations' },
    { name: t('nav.pricing', 'Pricing'), href: '#pricing' },
    { name: t('nav.contact', 'Contact'), href: '#contact' },
  ];

  // Secondary links cleanly organized under "More" dropdown
  const secondaryLinks = [
    { 
      name: t('nav.dietWorkout', 'Diet & Workout'), 
      href: '#plans', 
      icon: Utensils, 
      desc: language === 'bn' ? 'কাস্টম ডায়েট ও রুটিন' : 'Personalized Nutrition & Regimen' 
    },
    { 
      name: t('nav.trainers', 'Trainers & Coaches'), 
      href: '#trainers', 
      icon: Users, 
      desc: language === 'bn' ? 'জাতীয় চ্যাম্পিয়ন মেন্টর' : 'National Champions Mentorship' 
    },
    { 
      name: t('nav.bmi', 'BMI Calculator'), 
      href: '#bmi-calculator', 
      icon: Activity, 
      desc: language === 'bn' ? 'বডি মাস ইনডেক্স চেক' : 'Quick Body Composition Analysis' 
    },
    { 
      name: t('nav.reviews', 'Google Reviews'), 
      href: '#reviews', 
      icon: Star, 
      desc: language === 'bn' ? 'সদস্যদের খাঁটি অভিজ্ঞতা' : 'Authentic Member Feedback' 
    },
    { 
      name: t('nav.gallery', 'Facility Gallery'), 
      href: '#gallery', 
      icon: Camera, 
      desc: language === 'bn' ? 'জিমের ভেতরের ছবি' : 'Tour Gym Floor & Equipment' 
    },
  ];

  // Complete list for mobile drawer
  const allMobileLinks = [
    ...primaryLinks,
    { name: t('nav.dietWorkout', 'Diet & Workout'), href: '#plans' },
    { name: t('nav.trainers', 'Trainers'), href: '#trainers' },
    { name: t('nav.bmi', 'BMI Calculator'), href: '#bmi-calculator' },
    { name: t('nav.reviews', 'Reviews'), href: '#reviews' },
    { name: t('nav.gallery', 'Gallery'), href: '#gallery' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIsMoreOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* 1. Top Micro Information Bar (Desktop & Tablet) */}
      <div className="hidden md:block bg-[#080808] border-b border-neutral-800/80 py-2 px-4 sm:px-6 lg:px-8 text-xs text-neutral-400 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Info: Location & Shifts */}
          <div className="flex items-center gap-4 xl:gap-6 min-w-0">
            <a
              href={GYM_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#FFD700] transition-colors truncate max-w-[240px] xl:max-w-none"
              title="Open Google Maps location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{GYM_INFO.addressDetailed}</span>
            </a>

            <span className="text-neutral-700 hidden lg:inline">|</span>

            {/* Shift Badges */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-[11px] text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{t('contact.mensShift', "Men's Shift")}:</span>
                <strong className="text-white font-mono">{gymHours.menHours.hours}</strong>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>{t('contact.womensShift', "Women's Shift")}:</span>
                <strong className="text-white font-mono">{gymHours.womenHours.hours}</strong>
              </div>
            </div>
          </div>

          {/* Right Info: Google Rating, Language Switcher & Admin Portal */}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Google Rating Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
              <span className="text-amber-400">⭐</span>
              <span><strong className="text-white font-semibold">4.6</strong> / 5.0 (14 Google Reviews)</span>
            </div>

            <span className="text-neutral-700">|</span>

            {/* Language Switcher in Top Bar */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 bg-neutral-900 hover:border-[#FFD700] text-[11px] font-semibold text-neutral-200 hover:text-[#FFD700] transition-colors cursor-pointer"
              title={language === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-[#FFD700]" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-black/80 border-b border-neutral-800/80 py-2.5'
            : 'bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center group transition-transform duration-200 hover:scale-[1.02] shrink-0"
              aria-label="Old Gym Health & Fitness Center Home"
            >
              <GymLogo size={44} showText={true} />
            </a>

            {/* Desktop Navigation Links (Uncluttered with elegant Dropdown) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {primaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-[#FFD700] transition-colors relative py-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#FFE082] after:via-[#D4AF37] after:to-[#AA820A] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}

              {/* Elegant "More ▾" Dropdown for secondary sections */}
              <div 
                ref={moreDropdownRef}
                className="relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 cursor-pointer ${
                    isMoreOpen ? 'text-[#FFD700]' : 'text-neutral-300 hover:text-[#FFD700]'
                  }`}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="true"
                >
                  <span>{t('nav.more', 'More')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-[#FFD700]' : 'text-neutral-400'}`} />
                </button>

                {/* Dropdown Menu Box */}
                {isMoreOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 p-2 rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-neutral-800/90 shadow-2xl shadow-black/90 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="space-y-1">
                      {secondaryLinks.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-800/80 group transition-all"
                          >
                            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-[#FFD700] group-hover:border-[#D4AF37]/40 transition-colors shrink-0">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-neutral-200 group-hover:text-[#FFD700] transition-colors truncate">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-neutral-400 truncate">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Right Side CTA & Shortcuts */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Language Switcher Button [ 🌐 BN | EN ] */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-[#D4AF37]/50 bg-black/60 hover:bg-neutral-900 hover:border-[#FFD700] hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer"
                title={language === 'en' ? 'বাংলায় দেখুন (Switch to Bengali)' : 'Switch to English'}
                aria-label="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className={language === 'bn' ? 'text-[#FFD700] font-black underline decoration-amber-500 underline-offset-2' : 'text-neutral-400'}>
                  BN
                </span>
                <span className="text-neutral-600 font-mono">|</span>
                <span className={language === 'en' ? 'text-[#FFD700] font-black underline decoration-amber-500 underline-offset-2' : 'text-neutral-400'}>
                  EN
                </span>
              </button>

              {/* Direct Phone Dial (Desktop XL) */}
              <a
                href={GYM_INFO.callUrl}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-[#FFD700] transition-colors px-3 py-2 rounded-xl border border-neutral-800 hover:border-[#D4AF37]/40 bg-neutral-900/60"
                aria-label={`Call ${GYM_INFO.phone}`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="tracking-wide font-mono tabular-nums">{GYM_INFO.phone}</span>
              </a>

              {/* High-Converting Golden CTA Button */}
              <button
                onClick={() => onOpenTrialModal()}
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,215,0,0.55)] active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>{t('nav.joinNow', 'Join Now')}</span>
              </button>
            </div>

            {/* Mobile Actions Header (Compact & Thumb Friendly) */}
            <div className="flex lg:hidden items-center gap-1.5">
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/50 bg-neutral-900 text-[11px] font-bold text-[#FFD700] flex items-center gap-1 min-h-[40px] active:scale-95"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>{language === 'en' ? 'BN' : 'EN'}</span>
              </button>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-300 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 min-h-[40px] min-w-[40px] flex items-center justify-center active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFD700]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Mobile Navigation Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0c0c]/98 backdrop-blur-2xl border-b border-neutral-800 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            
            {/* Quick Shift Timings & Language Preview */}
            <div className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-300 font-medium flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
                  Language / ভাষা
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                      language === 'bn' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 bg-neutral-800'
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                      language === 'en' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 bg-neutral-800'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Micro Shift Schedule Bar */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-800/80 text-[11px]">
                <div className="p-1.5 rounded-lg bg-blue-950/30 border border-blue-500/20 text-blue-200 text-center">
                  <span className="block text-[10px] text-blue-400">{t('contact.mensShift', "Men's Shift")}</span>
                  <span className="font-mono font-bold text-white">{gymHours.menHours.hours}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-200 text-center">
                  <span className="block text-[10px] text-rose-400">{t('contact.womensShift', "Women's Shift")}</span>
                  <span className="font-mono font-bold text-white">{gymHours.womenHours.hours}</span>
                </div>
              </div>
            </div>

            {/* Mobile Nav Links (Touch-friendly 2-column grid) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {allMobileLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-[#FFD700] bg-neutral-900/80 border border-neutral-800/80 text-center active:scale-95 transition-all min-h-[48px] flex items-center justify-center"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Primary Action Buttons in Mobile Drawer */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-center shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>{t('hero.startTrial', 'Start Free 1-Day Trial Pass')}</span>
              </button>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
