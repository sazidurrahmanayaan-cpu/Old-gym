import React, { useState } from 'react';
import { Trainer } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, Award, CheckCircle2, MessageSquare, RotateCcw, Sparkles, UserCheck } from 'lucide-react';

interface TrainerSectionProps {
  onConsultTrainer: (trainerName: string) => void;
}

const FlipTrainerCard: React.FC<{
  trainer: Trainer;
  onConsult: (name: string) => void;
}> = ({ trainer, onConsult }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 h-[510px] w-full">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden rounded-2xl glass-gold overflow-hidden flex flex-col justify-between shadow-2xl">
          <div>
            {/* Trainer Photo Container */}
            <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
              <img
                src={trainer.image}
                alt={trainer.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter brightness-95"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('hero_gym_dark')) {
                    target.src = '/assets/images/hero_gym_dark_1790467261162.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
              
              {/* Experience Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[11px] font-mono font-semibold text-[#FFD700]">
                {trainer.experience}
              </div>

              {/* Quick Flip Prompt Badge */}
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 hover:bg-[#D4AF37] text-neutral-300 hover:text-black border border-[#D4AF37]/40 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm shadow-md"
              >
                <RotateCcw className="w-3 h-3 text-[#FFD700]" />
                <span>Flip Bio</span>
              </button>
            </div>

            {/* Trainer Content */}
            <div className="p-5 pt-3 space-y-3">
              <div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white hover:text-[#FFD700] transition-colors">
                  {trainer.name}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wide mt-0.5">
                  {trainer.role}
                </p>
              </div>

              {/* Achievement citation */}
              <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
                <Award className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <span className="line-clamp-2">{trainer.achievements}</span>
              </div>

              {/* Specialties */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                  Core Specializations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {trainer.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium text-neutral-200 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-700/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="p-5 pt-0 flex gap-2">
            <button
              onClick={() => onConsult(trainer.name)}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book Coaching</span>
            </button>
            <button
              onClick={() => setIsFlipped(true)}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-[#FFD700] border border-neutral-800 transition-colors cursor-pointer"
              title="Flip to view detailed credentials"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BACK OF CARD (REVEALED ON 3D FLIP) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl glass-gold p-6 flex flex-col justify-between shadow-2xl border-2 border-[#D4AF37]/60">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFD700]">Coach Profile & Record</span>
                <h4 className="font-heading text-xl font-bold uppercase text-white">{trainer.name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 cursor-pointer"
                title="Flip back to front"
              >
                <RotateCcw className="w-4 h-4 text-[#FFD700]" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-neutral-400">Coaching Philosophy</span>
                <p className="text-neutral-300 leading-relaxed">
                  "Progressive overload, injury-free mechanics, and calculated macronutrient intake are the foundation of athletic excellence. No shortcuts."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-[#FFD700] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Competition & Track Record:</span>
                </span>
                <p className="text-neutral-200 text-xs font-medium">
                  {trainer.achievements}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase text-neutral-400">Athlete Success Metrics</span>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <p className="font-heading text-lg font-bold text-[#FFD700]">150+</p>
                    <p className="text-[10px] text-neutral-400">Transformations</p>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <p className="font-heading text-lg font-bold text-emerald-400">100%</p>
                    <p className="text-[10px] text-neutral-400">Form Safety</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2">
            <button
              onClick={() => onConsult(trainer.name)}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>Book 1-on-1 Consultation</span>
            </button>
            <button
              onClick={() => setIsFlipped(false)}
              className="w-full py-1.5 text-[11px] font-mono text-neutral-400 hover:text-white flex items-center justify-center gap-1"
            >
              <span>⟲ Flip back to portrait</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export const TrainerSection: React.FC<TrainerSectionProps> = ({ onConsultTrainer }) => {
  const { trainers } = useGym();
  const { t, language } = useLanguage();

  return (
    <section id="trainers" className="py-20 lg:py-28 bg-[#0d0d0d] relative border-t border-neutral-900 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <Trophy className="w-3.5 h-3.5" />
            <span>{t('trainers.badge', 'Championship Pedigree · Interactive 3D Cards')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('trainers.title', 'Meet The Master Coaches')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t('trainers.subtitle', 'Guided by competitive bodybuilding champions who know true progressive overload. Hover or tap "Flip Bio" on any coach card to explore their contest record.')}
          </p>
        </div>

        {/* 3 Trainers 3D Flip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer: Trainer) => (
            <FlipTrainerCard
              key={trainer.id}
              trainer={trainer}
              onConsult={onConsultTrainer}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
