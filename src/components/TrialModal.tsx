import React, { useState } from 'react';
import { GYM_INFO } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { X, CheckCircle, Ticket, Calendar, Phone, User, ArrowRight } from 'lucide-react';
import { GymLogo } from './GymLogo';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, defaultPlan }) => {
  const { addLead } = useGym();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow Morning (6 AM - 11 AM)');
  const [trainingGoal, setTrainingGoal] = useState(defaultPlan || 'General Fitness & Muscle Gain');
  const [isGenerated, setIsGenerated] = useState(false);
  const [passCode, setPassCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    // Generate VIP pass code
    const randomCode = `OLDGYM-${Math.floor(1000 + Math.random() * 9000)}`;
    setPassCode(randomCode);
    setIsGenerated(true);

    // Record Lead in Admin Pipeline
    addLead({
      fullName: fullName.trim(),
      phone: phone.trim(),
      interestedProgram: trainingGoal,
      source: 'Free Trial Pass',
      notes: `Voucher: ${randomCode} · Slot: ${preferredDate}`
    });
  };

  const handleReset = () => {
    setIsGenerated(false);
    setFullName('');
    setPhone('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#121212] border border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isGenerated ? (
          /* VIP Pass Card Generated State */
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFD700] mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">
                Pass Confirmed
              </span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                Your Free Day Pass is Ready!
              </h3>
              <p className="text-xs text-neutral-400">
                Show this digital card or voucher code at the Old Gym front desk in Munshiganj.
              </p>
            </div>

            {/* Styled Gold/Dark VIP Ticket */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1c1c1c] to-[#0d0d0d] border-2 border-[#D4AF37] relative text-left shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <GymLogo size={36} showText={true} />
                <span className="px-2.5 py-0.5 rounded bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase">
                  VIP 1-Day Pass
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase font-mono">Member Name</span>
                  <p className="font-bold text-white truncate">{fullName}</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase font-mono">Registered Phone</span>
                  <p className="font-mono text-neutral-200">{phone}</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase font-mono">Preferred Slot</span>
                  <p className="text-neutral-300 truncate">{preferredDate}</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase font-mono">Focus Goal</span>
                  <p className="text-[#FFD700] font-semibold truncate">{trainingGoal}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-dashed border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-mono">Voucher Code</span>
                  <p className="font-mono font-bold text-lg text-[#FFD700] tracking-wider">{passCode}</p>
                </div>
                <div className="text-right text-[10px] text-neutral-400">
                  <p>Valid for 7 Days</p>
                  <p className="text-emerald-400 font-medium">100% Free Entry</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={GYM_INFO.callUrl}
                className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient text-center shadow-md cursor-pointer"
              >
                Call Front Desk ({GYM_INFO.phone})
              </a>
              <button
                onClick={handleReset}
                className="py-3 px-5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Input Form State */
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#FFD700]">
                <Ticket className="w-3.5 h-3.5" />
                <span>Zero Commitment Trial</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white">
                Claim Your Free 1-Day Trial Pass
              </h3>
              <p className="text-xs text-neutral-400">
                Experience our high-end equipment, spotless training floor, and pro bodybuilder guidance before joining.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shakib Al Hasan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Phone Number (For Verification) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01919-XXXXXX"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Target Training Goal
                </label>
                <select
                  value={trainingGoal}
                  onChange={(e) => setTrainingGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="General Fitness & Muscle Gain">General Fitness & Muscle Gain</option>
                  <option value="Fat Loss & Cardio Shred">Fat Loss & Cardio Shred</option>
                  <option value="Professional Bodybuilding">Professional Bodybuilding Mentorship</option>
                  <option value="Heavy Strength & Powerlifting">Heavy Strength & Powerlifting</option>
                  <option value="3 Months Transformation Plan">3 Months Transformation Plan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Preferred Visit Timing
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Tomorrow Morning (6 AM - 11 AM)">Tomorrow Morning (6:00 AM – 11:00 AM)</option>
                    <option value="Tomorrow Afternoon (3 PM - 6 PM)">Tomorrow Afternoon (3:00 PM – 6:00 PM)</option>
                    <option value="Tomorrow Evening (6 PM - 10:30 PM)">Tomorrow Evening (6:00 PM – 10:30 PM)</option>
                    <option value="This Friday Evening (3 PM - 9:30 PM)">This Friday (3:00 PM – 9:30 PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,215,0,0.55)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Generate Free VIP Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
