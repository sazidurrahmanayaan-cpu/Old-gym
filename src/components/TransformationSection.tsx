import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Trophy, ArrowRight, CheckCircle2, Flame, Award, Dumbbell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TransformationCase {
  id: string;
  name: string;
  location: string;
  program: string;
  duration: string;
  weightChange: string;
  muscleChange: string;
  bodyFatChange: string;
  quote: string;
  beforeImg: string;
  afterImg: string;
}

interface TransformationSectionProps {
  onStartTransformation: (planName?: string) => void;
}

const CASES: TransformationCase[] = [
  {
    id: 'case-1',
    name: 'Tanvir Ahmed',
    location: 'Munshiganj Sadar',
    program: '90-Day Metabolic Fat Loss & Shred',
    duration: '3 Months (90 Days)',
    weightChange: '-14 kg Fat',
    muscleChange: '+4.5 kg Lean Muscle',
    bodyFatChange: '28% → 13% Body Fat',
    quote: '"I joined Old Gym sluggish and overweight. Coach Farhan completely transformed my diet with local food and pushed me on compound lifts. Best decision of my life!"',
    beforeImg: '/src/assets/images/trans_before_gym_1790469833653.jpg',
    afterImg: '/src/assets/images/trans_after_gym_1790469846870.jpg'
  },
  {
    id: 'case-2',
    name: 'Zubayer Hossain',
    location: 'Munshiganj',
    program: 'Heavy Bodybuilding Hypertrophy',
    duration: '4 Months (120 Days)',
    weightChange: '+8 kg Mass',
    muscleChange: '+7 kg Dense Muscle',
    bodyFatChange: 'Bench +45kg / Squat +60kg',
    quote: '"Old Gym has the real calibrated heavy iron that other gyms in Munshiganj lack. The brotherhood and pro coach form checks helped me pack on pure muscle."',
    beforeImg: '/src/assets/images/trans_before_gym_1790469833653.jpg',
    afterImg: '/src/assets/images/trans_after_gym_1790469846870.jpg'
  },
  {
    id: 'case-3',
    name: 'Shakil Khan',
    location: 'Munshiganj',
    program: 'Athlete Conditioning & Posture Reset',
    duration: '2.5 Months (75 Days)',
    weightChange: '-11 kg Fat',
    muscleChange: '+3 kg Lean Tissue',
    bodyFatChange: 'Waist -5.5 Inches',
    quote: '"Spotless hygiene, friendly gym members, and trainers who actually stand next to you during your sets. You can see real physical changes every 2 weeks."',
    beforeImg: '/src/assets/images/trans_before_gym_1790469833653.jpg',
    afterImg: '/src/assets/images/trans_after_gym_1790469846870.jpg'
  }
];

export const TransformationSection: React.FC<TransformationSectionProps> = ({ onStartTransformation }) => {
  const { t } = useLanguage();
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(95, Math.max(5, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <section id="transformations" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden border-t border-neutral-900">
      {/* Background radial gold aura */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('transformation.badge', 'Proven Physical Transformations')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('transformation.title', 'Real Lifters. Real Munshiganj Results.')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t('transformation.subtitle', 'Slide the divider horizontally to reveal the before and after transformation achieved under Old Gym pro bodybuilding mentorship.')}
          </p>

          {/* Member Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CASES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCaseIdx === idx
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-amber-500/20 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {item.name} ({item.duration})
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="max-w-5xl mx-auto glass-gold rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Draggable Slider Frame (7 cols) */}
            <div className="lg:col-span-7">
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-[#D4AF37]/50 shadow-2xl bg-neutral-950"
              >
                {/* AFTER IMAGE (Underneath / Base) */}
                <img
                  src={activeCase.afterImg}
                  alt={`${activeCase.name} After Transformation`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />
                
                {/* AFTER Badge */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37] text-[#FFD700] text-xs font-mono font-bold tracking-wider">
                  AFTER ({activeCase.duration})
                </div>

                {/* BEFORE IMAGE (Clipped on Top) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeCase.beforeImg}
                    alt={`${activeCase.name} Before Transformation`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter contrast-90"
                    style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                  />
                  {/* BEFORE Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-neutral-700 text-neutral-300 text-xs font-mono font-bold tracking-wider">
                    BEFORE (Day 1)
                  </div>
                </div>

                {/* Vertical Divider Line with Draggable Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Glowing Vertical Line */}
                  <div className="absolute top-0 bottom-0 -left-px w-1 bg-[#FFD700] shadow-[0_0_15px_#FFD700]" />
                  
                  {/* Draggable Circle Knob */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-gold-gradient text-black flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-black pointer-events-auto cursor-ew-resize">
                    <span className="tracking-tighter">◀▶</span>
                  </div>
                </div>

                {/* Touch / Drag Helper Prompt */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neutral-800 text-[10px] text-neutral-400 font-mono pointer-events-none">
                  Drag left/right to compare
                </div>
              </div>
            </div>

            {/* Transformation Story & Stat Metrics (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">
                  Munshiganj Athlete Case Study
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
                  {activeCase.name}
                </h3>
                <p className="text-xs text-neutral-400">
                  {activeCase.program} · {activeCase.location}
                </p>
              </div>

              {/* 3 Metrics Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Fat Reduction</span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-white tabular-nums">
                    {activeCase.weightChange}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#FFD700] font-bold">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>Muscle Growth</span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-white tabular-nums">
                    {activeCase.muscleChange}
                  </p>
                </div>

                <div className="col-span-2 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#FFD700]" />
                    <span className="text-xs text-neutral-300">Composition Outcome:</span>
                  </div>
                  <span className="font-mono font-bold text-amber-300 text-xs">
                    {activeCase.bodyFatChange}
                  </span>
                </div>
              </div>

              {/* Verified Member Quote */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-[#D4AF37]/30 text-xs text-neutral-300 italic leading-relaxed">
                {activeCase.quote}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onStartTransformation(activeCase.program)}
                  className="w-full py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/25 active:scale-95"
                >
                  <span>Start Your 90-Day Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-neutral-500 mt-2">
                  ✓ Custom workout charts & Bengali meal macros included
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
