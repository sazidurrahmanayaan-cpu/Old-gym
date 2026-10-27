import React, { useState } from 'react';
import gymLogoImg from '../assets/images/old_gym_logo_badge_1790470745512.jpg';

interface GymLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const GymLogo: React.FC<GymLogoProps> = ({ className = '', size = 46, showText = true }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Circular Brand Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-full overflow-hidden p-[1.5px] bg-gradient-to-br from-[#FFE082] via-[#D4AF37] to-[#8C6D1F] shadow-[0_0_16px_rgba(212,175,55,0.35)] hover:shadow-[0_0_24px_rgba(255,215,0,0.5)] transition-shadow duration-300"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#0c0d10] flex items-center justify-center relative">
          {!imageError ? (
            <img
              src={gymLogoImg}
              alt="Old Gym Health & Fitness Center Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            /* High-fidelity Vector Fallback */
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="gymBadgeBgFb" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#080808" />
                </radialGradient>
                <linearGradient id="goldRimFb" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#996515" />
                </linearGradient>
                <linearGradient id="goldTextFb" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2A3" />
                  <stop offset="50%" stopColor="#E5B834" />
                  <stop offset="100%" stopColor="#A87A13" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="95" fill="url(#gymBadgeBgFb)" stroke="url(#goldRimFb)" strokeWidth="6" />
              <circle cx="100" cy="100" r="87" stroke="url(#goldRimFb)" strokeWidth="1.5" strokeOpacity="0.7" />
              
              {/* Silhouette Bodybuilder */}
              <g transform="translate(18, 32) scale(0.68)" fill="#FFFFFF">
                <path d="M72 15 C72 7, 66 1, 58 1 C50 1, 44 7, 44 15 C44 20, 48 24, 52 26 C47 28, 44 32, 43 38 C49 39, 67 39, 73 38 C72 32, 69 28, 64 26 C68 24, 72 20, 72 15 Z" />
                <path d="M43 38 C32 40, 20 46, 12 55 C18 57, 30 55, 38 52 Z" />
                <path d="M73 38 C84 40, 96 46, 104 55 C98 57, 86 55, 78 52 Z" />
                <path d="M12 55 C4 57, -8 48, -12 36 C-14 30, -10 24, -4 26 C-2 30, 2 34, 6 36 C5 29, 9 20, 15 15 C20 11, 25 15, 23 22 C21 28, 24 35, 31 38 C26 44, 18 50, 12 55 Z" />
                <circle cx="-5" cy="22" r="5" />
                <path d="M104 55 C112 57, 124 48, 128 36 C130 30, 126 24, 120 26 C118 30, 114 34, 110 36 C111 29, 107 20, 101 15 C96 11, 91 15, 93 22 C95 28, 92 35, 85 38 C90 44, 98 50, 104 55 Z" />
                <circle cx="121" cy="22" r="5" />
                <path d="M38 52 C45 51, 57 51, 58 53 C59 51, 71 51, 78 52 C79 66, 68 76, 58 76 C48 76, 37 66, 38 52 Z" />
                <path d="M48 80 C54 79, 62 79, 68 80 C67 87, 49 87, 48 80 Z" />
                <path d="M47 89 C54 88, 62 88, 69 89 C68 96, 48 96, 47 89 Z" />
                <path d="M49 98 C54 97, 62 97, 67 98 C66 105, 50 105, 49 98 Z" />
                <path d="M48 107 C54 107, 62 107, 68 107 C72 118, 64 128, 58 128 C52 128, 44 118, 48 107 Z" fill="#D4AF37" />
                <path d="M44 122 C39 135, 36 150, 38 168 C42 168, 48 158, 51 146 C52 136, 50 126, 44 122 Z" />
                <path d="M38 168 C36 182, 38 196, 37 206 C41 207, 46 205, 47 195 C48 185, 46 174, 38 168 Z" />
                <path d="M35 206 C30 207, 28 210, 36 211 C44 211, 48 209, 45 206 Z" />
                <path d="M72 122 C77 135, 80 150, 78 168 C74 168, 68 158, 65 146 C64 136, 66 126, 72 122 Z" />
                <path d="M78 168 C80 182, 78 196, 79 206 C75 207, 70 205, 69 195 C68 185, 70 174, 78 168 Z" />
                <path d="M81 206 C86 207, 88 210, 80 211 C72 211, 68 209, 71 206 Z" />
              </g>

              <text
                x="142"
                y="94"
                fill="url(#goldTextFb)"
                fontFamily="'Oswald', sans-serif"
                fontWeight="700"
                fontSize="44"
                textAnchor="middle"
                letterSpacing="2"
              >
                OLD
              </text>
              <text
                x="142"
                y="136"
                fill="#FFFFFF"
                fontFamily="'Oswald', sans-serif"
                fontWeight="800"
                fontSize="40"
                textAnchor="middle"
                letterSpacing="1"
              >
                GYM
              </text>
            </svg>
          )}
        </div>
      </div>

      {/* Brand Wordmark Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-heading text-xl font-bold tracking-wider text-white">
              OLD <span className="text-gold-gradient">GYM</span>
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium mt-0.5">
            Health & Fitness Center
          </span>
        </div>
      )}
    </div>
  );
};
