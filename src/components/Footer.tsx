import React from 'react';
import { GymLogo } from './GymLogo';
import { GYM_INFO } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { Phone, MapPin, Facebook, MessageCircle, ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { gymHours, isAdmin, setShowLoginModal, setCurrentView } = useGym();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      setCurrentView('admin');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <GymLogo size={48} showText={true} />
            <p className="text-sm text-neutral-300 font-medium">
              {GYM_INFO.bengaliName}
            </p>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Munshiganj's cleanest, most spacious, and professional fitness center.
              Run by professional bodybuilders for genuine muscle growth, fat loss, and strength conditioning.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={GYM_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-neutral-300 flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={GYM_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-emerald-500 hover:text-black text-neutral-300 flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={GYM_INFO.callUrl}
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-neutral-300 flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="Call Old Gym"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#FFD700] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFD700] transition-colors">About Facility</a>
              </li>
              <li>
                <a href="#classes" className="hover:text-[#FFD700] transition-colors">Training Programs</a>
              </li>
              <li>
                <a href="#bmi-calculator" className="hover:text-[#FFD700] transition-colors">BMI Calculator</a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-[#FFD700] transition-colors">Pro Coaches</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#FFD700] transition-colors">Membership Fees</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FFD700] transition-colors">Google Reviews</a>
              </li>
              <li className="pt-1">
                <button
                  onClick={handleAdminClick}
                  className="text-neutral-400 hover:text-[#FFD700] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Training Hours (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Shift Timings
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="font-semibold text-blue-300 flex items-center gap-1">
                  <span>👨 Men's Shift</span>
                </p>
                <p className="font-mono text-white text-[11px]">{gymHours.menHours.hours}</p>
                <p className="text-[10px] text-neutral-500">{gymHours.menHours.days}</p>
              </div>
              <div>
                <p className="font-semibold text-rose-300 flex items-center gap-1">
                  <span>👩 Women's Shift</span>
                </p>
                <p className="font-mono text-rose-200 text-[11px]">{gymHours.womenHours.hours}</p>
                <p className="text-[10px] text-neutral-500">{gymHours.womenHours.days}</p>
              </div>
              <div className="pt-1 border-t border-neutral-900">
                <p className="font-semibold text-neutral-300 text-[11px]">{gymHours.fridayHours.days}:</p>
                <p className="font-mono text-amber-400 text-[11px]">{gymHours.fridayHours.hours}</p>
              </div>
            </div>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Munshiganj Gym Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{GYM_INFO.addressDetailed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={GYM_INFO.callUrl} className="font-mono text-neutral-200 hover:text-[#FFD700] font-semibold">
                  {GYM_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={GYM_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:text-[#FFD700]"
                >
                  {GYM_INFO.facebookHandle}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Hidden Admin Access */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs text-center sm:text-left flex flex-wrap items-center">
            <span>
              © {new Date().getFullYear()} {GYM_INFO.name}. All rights reserved
              {/* Subtle period trigger for direct admin access */}
              <button
                type="button"
                onClick={handleAdminClick}
                className="inline text-neutral-500 hover:text-amber-500 focus:outline-none cursor-pointer bg-transparent p-0 m-0 border-0 text-xs select-none transition-colors"
                title="Admin Portal"
                aria-label="Admin Portal"
                tabIndex={-1}
              >
                .
              </button>
            </span>
            <span className="mx-2 text-neutral-700">·</span>
            <span>{GYM_INFO.tagline}</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-[#FFD700] transition-colors text-xs font-medium cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
