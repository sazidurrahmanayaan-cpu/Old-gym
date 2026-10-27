import React, { useState } from 'react';
import { CLASSES, GymClass } from '../data/gymData';
import { useLanguage } from '../context/LanguageContext';
import { Dumbbell, Flame, Award, UserCheck, Activity, Zap, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ClassesSectionProps {
  onSelectClassForTrial: (className: string) => void;
}

// 3D Tilt Card Component
const TiltClassCard: React.FC<{
  gymClass: GymClass;
  onSelect: (title: string) => void;
  getIcon: (iconName: string) => React.ReactNode;
}> = ({ gymClass, onSelect, getIcon }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
        }}
        className="relative h-full p-6 sm:p-7 rounded-2xl glass-gold flex flex-col justify-between overflow-hidden shadow-xl"
      >
        {/* Dynamic 3D Glare effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 215, 0, 0.22), transparent 60%)`,
            opacity: glare.opacity
          }}
        />

        <div className="relative z-10">
          {/* Header with Icon and Intensity Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[#FFD700] shadow-md group-hover:scale-110 transition-transform">
              {getIcon(gymClass.icon)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-300 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-700/80">
                {gymClass.schedule}
              </span>
            </div>
          </div>

          {/* Title & Category */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] uppercase tracking-wide">
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
              <span>{gymClass.category}</span>
            </div>
            <h3 className="font-heading text-xl font-bold uppercase text-white hover:text-[#FFD700] transition-colors mt-0.5">
              {gymClass.title}
            </h3>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed mb-5">
            {gymClass.description}
          </p>

          {/* Bullet Highlights */}
          <div className="space-y-2 mb-6">
            {gymClass.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 pt-2">
          <button
            onClick={() => onSelect(gymClass.title)}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
          >
            <span>Book Free Class Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ClassesSection: React.FC<ClassesSectionProps> = ({ onSelectClassForTrial }) => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'High' | 'Extreme' | 'Medium'>('All');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#FFD700]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#FFD700]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-400" />;
      case 'Zap':
      default:
        return <Zap className="w-5 h-5 text-yellow-400" />;
    }
  };

  const filteredClasses = selectedFilter === 'All'
    ? CLASSES
    : CLASSES.filter(c => c.intensity === selectedFilter);

  return (
    <section id="classes" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Segmented Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
              {t('classes.badge', 'Tailored Training Disciplines')}
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              {t('classes.title', 'Expert Guided Programs')}
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              {t('classes.subtitle', 'From pure muscle hypertrophy to rapid fat incineration and competition prep.')}
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start md:self-auto">
            {(['All', 'High', 'Extreme', 'Medium'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {filter === 'All' ? 'All Programs' : `${filter} Intensity`}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Classes 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((gymClass: GymClass) => (
            <TiltClassCard
              key={gymClass.id}
              gymClass={gymClass}
              onSelect={onSelectClassForTrial}
              getIcon={getIcon}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
