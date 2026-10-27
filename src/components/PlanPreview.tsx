import React, { useState, useMemo } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Flame, 
  Clock, 
  HeartPulse, 
  RotateCcw, 
  Droplets, 
  MessageCircle, 
  ChevronRight,
  Calculator,
  Apple,
  ShieldCheck
} from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { useLanguage } from '../context/LanguageContext';

interface PlanPreviewProps {
  onUnlockPlan: (planName: string) => void;
}

export const PlanPreview: React.FC<PlanPreviewProps> = ({ onUnlockPlan }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'diet-generator' | 'workout'>('diet-generator');
  
  // Interactive Nutrition Input State
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(24);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [heightCm, setHeightCm] = useState<number>(172);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(8);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [goal, setGoal] = useState<'fatloss' | 'musclegain' | 'maintenance'>('musclegain');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'heavy'>('moderate');

  // Workout Day selection
  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<number>(0);

  // Effective Height in CM calculation
  const effectiveHeightCm = useMemo(() => {
    if (heightUnit === 'cm') return heightCm;
    const totalInches = heightFt * 12 + heightIn;
    return Math.round(totalInches * 2.54);
  }, [heightUnit, heightCm, heightFt, heightIn]);

  // BMR & TDEE Calculation (Mifflin-St Jeor Equation)
  const calculationResults = useMemo(() => {
    // BMR
    let bmr = (10 * weightKg) + (6.25 * effectiveHeightCm) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity multiplier
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725
    };
    const tdee = Math.round(bmr * (multipliers[activity] || 1.55));

    // Target Calories
    let targetCalories = tdee;
    if (goal === 'fatloss') {
      targetCalories = tdee - 400;
    } else if (goal === 'musclegain') {
      targetCalories = tdee + 300;
    }

    // Clamping for health & safety
    const minCalories = gender === 'male' ? 1500 : 1200;
    targetCalories = Math.max(minCalories, targetCalories);

    // Protein Target (1.8g to 2.2g per kg)
    const proteinFactor = goal === 'maintenance' ? 1.8 : 2.0;
    const targetProtein = Math.round(weightKg * proteinFactor);

    // Fat Target (~25% of calories, 9 kcal/g)
    const targetFat = Math.round((targetCalories * 0.25) / 9);

    // Carbohydrates Target (Remaining calories, 4 kcal/g)
    const caloriesFromProteinAndFat = (targetProtein * 4) + (targetFat * 9);
    const targetCarbs = Math.max(80, Math.round((targetCalories - caloriesFromProteinAndFat) / 4));

    // Water intake (35ml - 45ml / kg)
    const waterLiters = +(weightKg * 0.045).toFixed(1);

    // Dynamic Bengali Meal Portions
    let eggCount = 4;
    let fishGrams = 160;
    let chickenGrams = 180;
    let riceCups = 1.5;
    let rotiCount = 2;
    let oatsGrams = 60;

    if (goal === 'fatloss') {
      eggCount = 4; // 3 whites + 1 whole
      fishGrams = 150;
      chickenGrams = 160;
      riceCups = 1.0;
      rotiCount = 1;
      oatsGrams = 45;
    } else if (goal === 'musclegain') {
      eggCount = 5; // whole eggs
      fishGrams = 200;
      chickenGrams = 220;
      riceCups = 2.0;
      rotiCount = 3;
      oatsGrams = 80;
    }

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      targetProtein,
      targetFat,
      targetCarbs,
      waterLiters: Math.max(3.0, waterLiters),
      portions: {
        eggCount,
        fishGrams,
        chickenGrams,
        riceCups,
        rotiCount,
        oatsGrams
      }
    };
  }, [gender, age, effectiveHeightCm, weightKg, goal, activity]);

  // Reset form to defaults
  const handleReset = () => {
    setGender('male');
    setAge(24);
    setHeightCm(172);
    setWeightKg(72);
    setGoal('musclegain');
    setActivity('moderate');
  };

  // WhatsApp Pre-filled URL with user's customized calculations
  const whatsAppDietUrl = useMemo(() => {
    const goalTitle = goal === 'fatloss' ? 'Fat Loss & Shred' : goal === 'musclegain' ? 'Heavy Muscle Gain' : 'Weight Maintenance';
    const message = `Hello Old Gym Munshiganj! I used your Interactive Bengali Nutrition Generator.\n\nMy Stats:\n- Gender: ${gender === 'male' ? 'Male' : 'Female'}, Age: ${age}, Weight: ${weightKg}kg, Height: ${effectiveHeightCm}cm\n- Goal: ${goalTitle}\n- Target Calories: ${calculationResults.targetCalories} kcal/day\n- Target Protein: ${calculationResults.targetProtein}g/day\n- Target Water: ${calculationResults.waterLiters} Liters/day\n\nPlease send me my personalized Bengali diet chart & coaching details!`;
    return `https://wa.me/8801919048227?text=${encodeURIComponent(message)}`;
  }, [gender, age, weightKg, effectiveHeightCm, goal, calculationResults]);

  // Workout Split Data
  const workoutDays = [
    {
      day: 'Day 01',
      title: 'Chest Dominance & Tricep Overload',
      focus: 'Push Power & Hypertrophy',
      exercises: [
        { name: 'Barbell Flat Bench Press', sets: '4 Sets', reps: '6–8 Reps', tip: 'Control eccentric drop for 2s' },
        { name: 'Incline Dumbbell Press', sets: '3 Sets', reps: '8–10 Reps', tip: 'Target upper clavicular head' },
        { name: 'Cable Mid-Chest Flyes', sets: '3 Sets', reps: '12–15 Reps', tip: 'Full peak contraction squeeze' },
        { name: 'Overhead Rope Tricep Extension', sets: '4 Sets', reps: '10–12 Reps', tip: 'Keep elbows tucked' }
      ]
    },
    {
      day: 'Day 02',
      title: 'Back Thickness & Bicep Peak',
      focus: 'Pull Power & V-Taper',
      exercises: [
        { name: 'Conventional Deadlifts', sets: '4 Sets', reps: '5 Reps', tip: 'Brace core and lock out with glutes' },
        { name: 'Wide-Grip Lat Pulldowns', sets: '4 Sets', reps: '8–10 Reps', tip: 'Drive elbows down into hips' },
        { name: 'Seated Cable Row (Close Grip)', sets: '3 Sets', reps: '10–12 Reps', tip: 'Retract rhomboids at apex' },
        { name: 'Incline Dumbbell Bicep Curls', sets: '3 Sets', reps: '10–12 Reps', tip: 'Full stretch at the bottom' }
      ]
    },
    {
      day: 'Day 03',
      title: 'Quad Destruction & Core Stability',
      focus: 'Lower Body Strength',
      exercises: [
        { name: 'Olympic Barbell Back Squats', sets: '4 Sets', reps: '6–8 Reps', tip: 'Hit parallel or deeper with knees out' },
        { name: '45-Degree Leg Press', sets: '4 Sets', reps: '10–12 Reps', tip: 'Feet shoulder-width on platform' },
        { name: 'Lying Hamstring Leg Curls', sets: '3 Sets', reps: '12 Reps', tip: 'Slow 3-second negative' },
        { name: 'Hanging Leg Raises', sets: '3 Sets', reps: '15 Reps', tip: 'Roll pelvis up, avoid swinging' }
      ]
    },
    {
      day: 'Day 04',
      title: 'Boulder Shoulders & Rear Delts',
      focus: 'Shoulder Width & Conditioning',
      exercises: [
        { name: 'Standing Overhead Military Press', sets: '4 Sets', reps: '6–8 Reps', tip: 'Strict form with zero leg bounce' },
        { name: 'Dumbbell Lateral Raises', sets: '4 Sets', reps: '12–15 Reps', tip: 'Lead with elbows, pause at top' },
        { name: 'Face Pulls with Rope on Cable', sets: '4 Sets', reps: '15 Reps', tip: 'External rotation for rotator cuff' },
        { name: 'Heavy Barbell Shrugs', sets: '3 Sets', reps: '10–12 Reps', tip: 'Squeeze upper traps for 2s at peak' }
      ]
    }
  ];

  return (
    <section id="plans" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <HeartPulse className="w-4 h-4" />
            <span>{t('nutrition.badge', 'Interactive Nutrition & Training Engine')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('nutrition.title', 'Personalized Nutrition & Meal Plan Generator')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t('nutrition.subtitle', 'Calculate your exact BMR and TDEE calorie target using the clinical Mifflin-St Jeor formula, and receive a customized high-protein Bengali meal blueprint.')}
          </p>

          {/* Master Tabs: Nutrition Generator vs 4-Day Workout Split */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('diet-generator')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'diet-generator'
                  ? 'bg-[#D4AF37] text-black shadow-xl shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{t('nutrition.tabDiet', 'Personalized Diet Generator')}</span>
            </button>

            <button
              onClick={() => setActiveTab('workout')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'workout'
                  ? 'bg-[#D4AF37] text-black shadow-xl shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>{t('nutrition.tabWorkout', '4-Day Workout Split')}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE PERSONALIZED NUTRITION GENERATOR */}
        {activeTab === 'diet-generator' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Input Form & Real-Time Macro Gauge Grid */}
            <div className="max-w-5xl mx-auto glass-gold rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                
                {/* Left: Input Form Controls (6 cols) */}
                <div className="lg:col-span-6 space-y-5 border-b lg:border-b-0 lg:border-r border-neutral-800 pb-6 lg:pb-0 lg:pr-8">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#FFD700] flex items-center gap-1.5 font-bold">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{t('nutrition.biometricsTitle', 'Biometric Parameters')}</span>
                    </span>
                    <button
                      onClick={handleReset}
                      className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      title="Reset to default lifter values"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{t('nutrition.reset', 'Reset')}</span>
                    </button>
                  </div>

                  {/* Gender Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase text-neutral-300">{t('nutrition.gender', 'Gender')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setGender('male')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          gender === 'male'
                            ? 'bg-[#D4AF37] text-black shadow-md'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        {t('nutrition.male', '👨 Male (Lifter)')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('female')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          gender === 'female'
                            ? 'bg-[#D4AF37] text-black shadow-md'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        {t('nutrition.female', '👩 Female')}
                      </button>
                    </div>
                  </div>

                  {/* Age & Weight Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <label className="text-neutral-300 font-medium">Age</label>
                        <span className="font-mono text-[#FFD700] font-bold">{age} Years</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="70"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <label className="text-neutral-300 font-medium">Weight (kg)</label>
                        <span className="font-mono text-[#FFD700] font-bold">{weightKg} kg</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="140"
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Height Input (Switchable cm / ft) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label className="text-neutral-300 font-medium">Height</label>
                      <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-neutral-800">
                        <button
                          type="button"
                          onClick={() => setHeightUnit('cm')}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                            heightUnit === 'cm' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-400'
                          }`}
                        >
                          cm
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeightUnit('ft')}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                            heightUnit === 'ft' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-400'
                          }`}
                        >
                          ft / in
                        </button>
                      </div>
                    </div>

                    {heightUnit === 'cm' ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-500 text-[11px]">140 cm</span>
                          <span className="font-mono text-[#FFD700] font-bold text-xs">{heightCm} cm</span>
                          <span className="text-neutral-500 text-[11px]">210 cm</span>
                        </div>
                        <input
                          type="range"
                          min="140"
                          max="210"
                          value={heightCm}
                          onChange={(e) => setHeightCm(Number(e.target.value))}
                          className="w-full accent-[#D4AF37] cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="bg-black border border-neutral-700 text-white rounded-xl p-2 text-xs font-mono"
                        >
                          {[4, 5, 6, 7].map((ft) => (
                            <option key={ft} value={ft}>{ft} Feet</option>
                          ))}
                        </select>
                        <select
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="bg-black border border-neutral-700 text-white rounded-xl p-2 text-xs font-mono"
                        >
                          {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                            <option key={inch} value={inch}>{inch} Inches</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Primary Fitness Goal */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase text-neutral-300">
                      Primary Fitness Goal
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'fatloss', label: 'Fat Loss', desc: 'Deficit (-400)' },
                        { key: 'musclegain', label: 'Muscle Gain', desc: 'Surplus (+300)' },
                        { key: 'maintenance', label: 'Maintenance', desc: 'Recomp' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setGoal(item.key as any)}
                          className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                            goal === item.key
                              ? 'border-[#FFD700] bg-[#D4AF37]/20 text-white shadow'
                              : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <p className="text-xs font-bold leading-none">{item.label}</p>
                          <p className="text-[10px] text-[#FFD700] font-mono mt-1">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity Multiplier */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase text-neutral-300">
                      Weekly Activity Level
                    </label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="sedentary">Sedentary (Desk Job, little to no gym) - 1.2x</option>
                      <option value="light">Light Active (1–2 days light workouts) - 1.375x</option>
                      <option value="moderate">Old Gym Lifter (3–5 days hardcore iron) - 1.55x</option>
                      <option value="heavy">Athlete / Bodybuilding Competitor (6–7 days) - 1.725x</option>
                    </select>
                  </div>
                </div>

                {/* Right: Calculated Dynamic Targets (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFD700]">
                          Mifflin-St Jeor Clinical Computation
                        </span>
                        <h3 className="font-heading text-xl font-bold uppercase text-white">
                          Your Daily Macro Targets
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-[11px] font-bold">
                        BMR: {calculationResults.bmr} kcal
                      </span>
                    </div>

                    {/* Big Daily Calories Highlight Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 to-black border border-[#D4AF37]/50 shadow-xl space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400 font-medium uppercase font-mono">Prescribed Daily Energy</span>
                        <span className="text-amber-400 font-mono font-semibold">TDEE: {calculationResults.tdee} kcal</span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                          {calculationResults.targetCalories.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#FFD700] font-bold">kcal / day</span>
                      </div>

                      <p className="text-[11px] text-neutral-400">
                        {goal === 'fatloss' && 'Targeting ~0.5kg to 0.75kg healthy body fat drop per week while preserving lean mass.'}
                        {goal === 'musclegain' && 'Calculated lean caloric surplus for dense muscle hypertrophy with minimal fat gain.'}
                        {goal === 'maintenance' && 'Optimal energy equilibrium for recomping body composition and high gym endurance.'}
                      </p>
                    </div>

                    {/* 3 Macro Summary Badges */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      {/* Protein */}
                      <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">Daily Protein</span>
                        <p className="font-heading text-2xl font-bold text-[#FFD700] tabular-nums">
                          {calculationResults.targetProtein}g
                        </p>
                        <span className="text-[10px] text-emerald-400 font-mono">~2.0g / kg</span>
                      </div>

                      {/* Carbohydrates */}
                      <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">Clean Carbs</span>
                        <p className="font-heading text-2xl font-bold text-white tabular-nums">
                          {calculationResults.targetCarbs}g
                        </p>
                        <span className="text-[10px] text-neutral-400 font-mono">Red Rice / Oats</span>
                      </div>

                      {/* Healthy Fats */}
                      <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">Essential Fats</span>
                        <p className="font-heading text-2xl font-bold text-white tabular-nums">
                          {calculationResults.targetFat}g
                        </p>
                        <span className="text-[10px] text-neutral-400 font-mono">Eggs / Mustard</span>
                      </div>
                    </div>

                    {/* Water recommendation pill */}
                    <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-blue-300 font-semibold">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span>Daily Hydration Target:</span>
                      </div>
                      <span className="font-mono font-bold text-white text-sm">
                        {calculationResults.waterLiters} Liters Water / Day
                      </span>
                    </div>
                  </div>

                  {/* Action Link: Send to WhatsApp */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={whatsAppDietUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 active:scale-95 text-center"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>{t('nutrition.sendWhatsapp', 'Get This Personalized Diet Plan Sent to WhatsApp →')}</span>
                    </a>
                    <p className="text-[11px] text-center text-neutral-500">
                      Direct WhatsApp link with your computed calories & protein target.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* DYNAMIC BENGALI MEAL BLUEPRINT (Portions scaled automatically) */}
            <div className="max-w-5xl mx-auto glass-gold rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFD700] uppercase font-bold">
                    <Apple className="w-4 h-4" />
                    <span>Scaled Local Portions for {weightKg}kg Body Weight</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold uppercase text-white mt-0.5">
                    {t('nutrition.mealsTitle', 'Your Tailored 4-Meal Bengali Day Blueprint')}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#FFD700] border border-[#D4AF37]/40 self-start sm:self-auto">
                  {calculationResults.targetCalories} kcal · {calculationResults.targetProtein}g Protein Total
                </span>
              </div>

              {/* 4 Dynamic Meals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Meal 1: Breakfast */}
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                      08:00 AM · Breakfast
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      ~{Math.round(calculationResults.targetProtein * 0.28)}g Protein
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-bold uppercase text-white">
                    Power Protein Oats & Deshi Eggs
                  </h4>

                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span><strong>{calculationResults.portions.eggCount} Boiled Deshi Eggs</strong> (Poached or Boiled)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span><strong>{calculationResults.portions.oatsGrams}g Rolled Oats</strong> with warm milk & cinnamon</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>1 Fresh Ripe Banana (Sagar Kola) & 5 Almonds</span>
                    </li>
                  </ul>
                </div>

                {/* Meal 2: Lunch */}
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                      01:30 PM · Lunch (Fuel Meal)
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      ~{Math.round(calculationResults.targetProtein * 0.32)}g Protein
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-bold uppercase text-white">
                    Rui / Katla Fish with Red Rice & Lentils
                  </h4>

                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span><strong>{calculationResults.portions.fishGrams}g Fresh Rui or Katla Fish</strong> Curry (Cooked in Light Mustard Oil)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span><strong>{calculationResults.portions.riceCups} Cups Lal Chaal</strong> (Unpolished Red Rice)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>1 Bowl Thick Masoor Daal + Huge Raw Cucumber Salad</span>
                    </li>
                  </ul>
                </div>

                {/* Meal 3: Pre-Workout */}
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                      05:30 PM · Pre-Workout Fuel
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      Fast Energy & Electrolytes
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-bold uppercase text-white">
                    Pre-Gym Carbohydrate & CNS Drive
                  </h4>

                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>1 Large Ripe Banana for immediate intramuscular glycogen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>1 Slice Brown Bread with 1.5 tbsp Peanut Butter OR 35g Roasted Chhola (Chickpeas)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>1 Cup Strong Black Coffee without sugar (30 mins before lifting)</span>
                    </li>
                  </ul>
                </div>

                {/* Meal 4: Dinner */}
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                      09:30 PM · Post-Workout Dinner
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      ~{Math.round(calculationResults.targetProtein * 0.35)}g Protein
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-bold uppercase text-white">
                    Deshi Chicken Breast & Atta Rotis
                  </h4>

                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span><strong>{calculationResults.portions.chickenGrams}g Deshi Chicken Breast</strong> (Pan-seared / Light curry)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span><strong>{calculationResults.portions.rotiCount} Whole Wheat Atta Rotis</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>Sautéed seasonal vegetables (Tomato, Spinach, Gourd)</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Assurance Card */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFD700] shrink-0" />
                  <span>{t('nutrition.localAssurance', '100% affordable local foods available in any Munshiganj bazaar. Zero expensive supplements required.')}</span>
                </div>
                <button
                  onClick={() => onUnlockPlan(`Personalized Bengali Nutrition Plan (${calculationResults.targetCalories} kcal)`)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 whitespace-nowrap"
                >
                  <span>{t('nutrition.claimDietCta', 'Claim Full Diet Chart & Free Trial')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: 4-DAY HYPERTROPHY WORKOUT SPLIT PREVIEW */}
        {activeTab === 'workout' && (
          <div className="max-w-5xl mx-auto glass-gold rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            {/* Day Selector Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-5">
              <div className="flex flex-wrap gap-2">
                {workoutDays.map((item, idx) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedWorkoutDay(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedWorkoutDay === idx
                        ? 'bg-[#FFD700] text-black shadow-md'
                        : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {item.day}: {item.title.split('&')[0]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <Clock className="w-3.5 h-3.5" />
                <span>60–75 Mins / Session</span>
              </div>
            </div>

            {/* Current Selected Day Content */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#FFD700] tracking-wider">
                  Target Focus: {workoutDays[selectedWorkoutDay].focus}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mt-0.5">
                  {workoutDays[selectedWorkoutDay].title}
                </h3>
              </div>

              {/* Exercises List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workoutDays[selectedWorkoutDay].exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 hover:border-[#D4AF37]/50 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-white text-sm">
                        {idx + 1}. {ex.name}
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                        {ex.sets} × {ex.reps}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-300 flex items-center gap-1.5 pt-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span className="italic">{ex.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                ⚡ Included in all <strong>Monthly</strong>, <strong>3-Month</strong>, and <strong>Yearly VIP</strong> memberships.
              </div>
              <button
                onClick={() => onUnlockPlan('4-Day Muscle Hypertrophy Workout Split')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>Unlock Your Personalized Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
