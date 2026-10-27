import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BmiCalculatorProps {
  onSelectRecommendedPlan: (planSuggestion: string) => void;
}

export const BmiCalculator: React.FC<BmiCalculatorProps> = ({ onSelectRecommendedPlan }) => {
  const { t, language } = useLanguage();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  // Metric values
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(72);
  
  // Imperial values
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [weightLbs, setWeightLbs] = useState<number>(160);

  const [age, setAge] = useState<number>(24);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');

  // Calculate BMI
  const bmiResult = useMemo(() => {
    let bmiValue = 0;
    let effectiveHeightM = 1.72;
    let effectiveWeightKg = 72;

    if (unitSystem === 'metric') {
      if (heightCm > 0) {
        effectiveHeightM = heightCm / 100;
        effectiveWeightKg = weightKg;
        bmiValue = weightKg / (effectiveHeightM * effectiveHeightM);
      }
    } else {
      const totalInches = heightFeet * 12 + heightInches;
      if (totalInches > 0) {
        effectiveHeightM = (totalInches * 2.54) / 100;
        effectiveWeightKg = weightLbs * 0.453592;
        bmiValue = (weightLbs / (totalInches * totalInches)) * 703;
      }
    }

    const roundedBmi = parseFloat(bmiValue.toFixed(1));
    
    // Ideal weight range for height
    const minIdealKg = (18.5 * effectiveHeightM * effectiveHeightM).toFixed(1);
    const maxIdealKg = (24.9 * effectiveHeightM * effectiveHeightM).toFixed(1);

    let category = 'Normal Weight';
    let categoryColor = 'text-emerald-400';
    let badgeBg = 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300';
    let suggestedProgram = 'Muscle Hypertrophy & Strength Program';
    let recommendation = 'Your BMI is optimal. Build dense lean muscle, improve powerlifting numbers, and enhance athletic symmetry with our Old Gym Bodybuilding split.';

    if (roundedBmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-amber-400';
      badgeBg = 'bg-amber-950/60 border-amber-800/60 text-amber-300';
      suggestedProgram = 'Heavy Muscle Building & Bulking Program';
      recommendation = 'You need a structured caloric surplus, high-protein nutrition plan, and heavy compound weight training to build solid muscle mass.';
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-amber-400';
      badgeBg = 'bg-amber-950/60 border-amber-800/60 text-amber-300';
      suggestedProgram = 'Fat Loss & High Intensity Shred Program';
      recommendation = 'You need our Fat Loss Program! Combining cardiovascular conditioning with hypertrophy training to burn visceral body fat while preserving lean tissue.';
    } else if (roundedBmi >= 30) {
      category = 'Obese';
      categoryColor = 'text-rose-400';
      badgeBg = 'bg-rose-950/60 border-rose-800/60 text-rose-300';
      suggestedProgram = 'Intensive Cardio & Metabolic Transformation';
      recommendation = 'You need our intensive Metabolic Fat Loss Program with 1-on-1 personal guidance, joint-safe cardio progression, and strict diet supervision.';
    }

    return {
      bmi: roundedBmi,
      category,
      categoryColor,
      badgeBg,
      suggestedProgram,
      recommendation,
      idealWeight: `${minIdealKg} kg – ${maxIdealKg} kg`
    };
  }, [unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs]);

  // Position percentage for gauge (15 to 35 range)
  const gaugePercent = Math.min(100, Math.max(0, ((bmiResult.bmi - 15) / (35 - 15)) * 100));

  return (
    <section id="bmi-calculator" className="py-20 lg:py-28 bg-[#0d0d0d] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <Calculator className="w-4 h-4" />
            <span>{t('bmi.badge', 'Interactive Health Analytics')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('bmi.title', 'Calculate Your BMI & Get A Custom Plan')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t('bmi.subtitle', 'Discover your exact body mass index score and receive an instant training recommendation tailored by Old Gym certified trainers.')}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto bg-[#141414] rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl shadow-black/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Input Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-neutral-800">
              {/* Unit System Toggle */}
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Measurement System
                </span>
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      unitSystem === 'metric'
                        ? 'bg-[#D4AF37] text-black shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Metric (cm / kg)
                  </button>
                  <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      unitSystem === 'imperial'
                        ? 'bg-[#D4AF37] text-black shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Imperial (ft / lbs)
                  </button>
                </div>
              </div>

              {/* Height & Weight inputs */}
              {unitSystem === 'metric' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-neutral-300">Height (cm)</label>
                      <span className="font-mono text-[#FFD700] font-bold">{heightCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min="120"
                      max="220"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                      <span>120 cm</span>
                      <span>170 cm</span>
                      <span>220 cm</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-neutral-300">Weight (kg)</label>
                      <span className="font-mono text-[#FFD700] font-bold">{weightKg} kg</span>
                    </div>
                    <input
                      type="range"
                      min="35"
                      max="160"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                      <span>35 kg</span>
                      <span>85 kg</span>
                      <span>160 kg</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-neutral-300">Height (Feet & Inches)</label>
                      <span className="font-mono text-[#FFD700] font-bold">{heightFeet}' {heightInches}"</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                      >
                        {[4, 5, 6, 7].map((ft) => (
                          <option key={ft} value={ft}>{ft} ft</option>
                        ))}
                      </select>
                      <select
                        value={heightInches}
                        onChange={(e) => setHeightInches(Number(e.target.value))}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                      >
                        {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                          <option key={inch} value={inch}>{inch} in</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-neutral-300">Weight (lbs)</label>
                      <span className="font-mono text-[#FFD700] font-bold">{weightLbs} lbs</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="350"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                      <span>80 lbs</span>
                      <span>200 lbs</span>
                      <span>350 lbs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Age & Gender Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-medium text-neutral-300">Your Age</label>
                    <span className="font-mono text-[#FFD700] font-bold">{age} Years</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="75"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>14 y/o</span>
                    <span>40 y/o</span>
                    <span>75 y/o</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-neutral-300">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        gender === 'male'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400'
                      }`}
                    >
                      Male (Lifter)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        gender === 'female'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Level Selector */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-medium text-neutral-300">Current Workout Habit</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'sedentary', label: 'Beginner / Zero' },
                    { key: 'moderate', label: '1–3 Days / Wk' },
                    { key: 'active', label: '4–6 Days (Hardcore)' }
                  ].map((act) => (
                    <button
                      key={act.key}
                      type="button"
                      onClick={() => setActivityLevel(act.key as any)}
                      className={`p-2 rounded-lg text-[11px] font-medium border transition-all text-center cursor-pointer ${
                        activityLevel === act.key
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FFD700]'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results & Prescribed Plan (Right 5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-neutral-950 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                    Diagnostic Score
                  </span>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${bmiResult.badgeBg}`}>
                    {bmiResult.category}
                  </div>
                </div>

                {/* Big Score Readout */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-heading text-5xl sm:text-6xl font-extrabold text-white tracking-tight tabular-nums">
                    {bmiResult.bmi}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">kg/m²</span>
                </div>

                {/* Visual Gauge Bar */}
                <div className="space-y-1.5 mb-6">
                  <div className="relative h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    {/* Gradient track */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-rose-500 opacity-60" />
                    {/* Active needle indicator */}
                    <div
                      className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg border border-black transition-all duration-300"
                      style={{ left: `calc(${gaugePercent}% - 4px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>18.5 (Under)</span>
                    <span>25.0 (Normal)</span>
                    <span>30.0 (Over)</span>
                  </div>
                </div>

                {/* Suggested Plan Box */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-[#D4AF37]/30 space-y-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#FFD700] font-bold uppercase tracking-wide">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Recommended Program:</span>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white uppercase">
                    {bmiResult.suggestedProgram}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {bmiResult.recommendation}
                  </p>
                </div>

                {/* Ideal weight range hint */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/50 p-3 rounded-lg border border-neutral-800/80">
                  <Info className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Target healthy weight range: <strong className="text-neutral-200">{bmiResult.idealWeight}</strong></span>
                </div>
              </div>

              {/* Action Button: Enroll in this Plan */}
              <button
                onClick={() => onSelectRecommendedPlan(bmiResult.suggestedProgram)}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all duration-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Get This Plan at Old Gym</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
