import React, { useState } from 'react';
import { Dumbbell, ShieldCheck, Maximize2, X, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Power Cages' | 'Free Weights' | 'Cable & Isolation' | 'Cardio';
  image: string;
  targetMuscles: string[];
  specs: {
    capacity: string;
    steelGrade: string;
    features: string;
  };
  biomechanicsTip: string;
  description: string;
}

const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Commercial Olympic Power Cage & Squat Rack',
    category: 'Power Cages',
    image: '/src/assets/images/equipment_power_cage_1790469860997.jpg',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Traps', 'Spinal Erectors'],
    specs: {
      capacity: 'Tested to 600 kg (1,320 lbs)',
      steelGrade: '11-Gauge 3x3" Heavy Box Steel',
      features: 'Full magnetic safety spotter arms, multi-grip pull-up bar, band pegs'
    },
    biomechanicsTip: 'Keep your chest tall and drive through your midfoot. The laser-cut spotter arms allow safe failure without risking lower back strain.',
    description: 'The heavyweight cornerstone of Old Gym. Designed for heavy squats, overhead presses, and rack pulls with zero frame wobble.'
  },
  {
    id: 'eq-2',
    name: 'Dual Cable Functional Crossover Station',
    category: 'Cable & Isolation',
    image: '/src/assets/images/equipment_cable_crossover_1790469872792.jpg',
    targetMuscles: ['Pectorals', 'Deltoids', 'Triceps', 'Biceps', 'Rotator Cuff'],
    specs: {
      capacity: 'Dual 100 kg (220 lbs) Weight Stacks',
      steelGrade: 'Aircraft-Grade Steel Cables with Nylon Pulley',
      features: '32 vertical adjustment heights, multi-angle pull handles, tricep rope'
    },
    biomechanicsTip: 'Maintain continuous rotational tension through the entire arc of motion. Cables provide uninterrupted resistance unlike free dumbbells.',
    description: 'Silky-smooth dual pulley station engineered for cable chest flyes, woodchoppers, face pulls, and isolated tricep pushdowns.'
  },
  {
    id: 'eq-3',
    name: 'Calibrated Heavy Dumbbell Rack (2.5kg to 45kg+)',
    category: 'Free Weights',
    image: '/src/assets/images/about_gym_equipment_1790467275863.jpg',
    targetMuscles: ['Full Body', 'Chest', 'Shoulders', 'Arms', 'Back'],
    specs: {
      capacity: 'Complete pairs up to 45kg (100 lbs+)',
      steelGrade: 'High-Density Solid Cast Iron with Urethane Coating',
      features: 'Diamond knurled ergonomic handles for maximum chalk grip'
    },
    biomechanicsTip: 'Avoid slamming dumbbells on drop. Retract your scapula on bench presses to eliminate shoulder impingement.',
    description: 'Munshiganj’s heaviest calibrated dumbbell collection. Cleanly racked in pairs with zero missing weights.'
  },
  {
    id: 'eq-4',
    name: 'Competition Deadlift Platform & Olympic Barbells',
    category: 'Power Cages',
    image: '/src/assets/images/hero_gym_dark_1790467261162.jpg',
    targetMuscles: ['Posterior Chain', 'Hamstrings', 'Lats', 'Forearms', 'Core'],
    specs: {
      capacity: 'Tested to 450 kg (990 lbs)',
      steelGrade: 'Hardwood Oak Center & 50mm Dense Shock-Absorb Rubber',
      features: 'Precision brass-bushing Olympic 20kg bars with aggressive knurling'
    },
    biomechanicsTip: 'Pull the slack out of the barbell before initiating lift off. Keep the bar path shaving your shins for optimal leverage.',
    description: 'Dedicated sound-dampened deadlift deck built for chalked-up heavy pulls without floor bounce.'
  },
  {
    id: 'eq-5',
    name: 'Commercial High-Incline HIIT Cardio Deck',
    category: 'Cardio',
    image: '/src/assets/images/gym_interior_training_1790467298261.jpg',
    targetMuscles: ['Cardiovascular System', 'Calves', 'Core', 'Glutes'],
    specs: {
      capacity: 'Up to 22 km/h & 18% Incline Grade',
      steelGrade: 'High-Torque 4.5HP Commercial AC Motor',
      features: 'Orthopedic shock-cushioned running belt, heart-rate sensors'
    },
    biomechanicsTip: 'Walking at a steep 12-15% incline at 4.5 km/h burns equal calories to running while completely protecting knee and hip joints.',
    description: 'High-airflow conditioning area to incinerate visceral fat and maximize VO2 max endurance.'
  },
  {
    id: 'eq-6',
    name: 'Heavy Plate-Loaded Leg Press & Hack Squat',
    category: 'Cable & Isolation',
    image: '/src/assets/images/equipment_power_cage_1790469860997.jpg',
    targetMuscles: ['Quadriceps Vastus', 'Adductors', 'Gluteus Maximus'],
    specs: {
      capacity: 'Holds up to 500 kg in Olympic 20kg plates',
      steelGrade: 'Linear Quad Bearing Track on 45° Incline',
      features: 'Adjustable dual footplate angles, safety release lockouts'
    },
    biomechanicsTip: 'Never lock your knees out completely at top extension. Keep tension on quads and maintain lower back pinned firmly to back pad.',
    description: 'Heavy 45-degree angle sled for maximum quad hypertrophy without spinal compression.'
  }
];

export const EquipmentShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);

  const categories = [
    { key: 'All', label: t('equipment.filterAll', 'All Equipment') },
    { key: 'Power Cages', label: t('equipment.filterRacks', 'Heavy Cages & Racks') },
    { key: 'Free Weights', label: t('equipment.filterFreeWeights', 'Free Weights & Dumbbells') },
    { key: 'Cable & Isolation', label: t('equipment.filterCablePin', 'Cables & Pin-Loaded') },
    { key: 'Cardio', label: t('equipment.filterCardio', 'Conditioning & Cardio') },
  ];

  const filteredItems = activeCategory === 'All'
    ? EQUIPMENT_LIST
    : EQUIPMENT_LIST.filter(item => item.category === activeCategory);

  return (
    <section id="equipment" className="py-20 lg:py-28 bg-[#0d0d0d] relative overflow-hidden border-t border-neutral-900">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
              <Dumbbell className="w-4 h-4" />
              <span>{t('equipment.badge', 'Certified Heavy Iron & Machines')}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              {t('equipment.title', 'Precision Gym Equipment Showcase')}
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              {t('equipment.subtitle', 'Engineered for optimal biomechanics, maximum muscle tension, and heavy safety margins.')}
            </p>
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#D4AF37] text-black shadow font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl glass-gold overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl hover:border-[#FFD700]"
            >
              <div>
                {/* Image Frame */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-mono text-[#FFD700] uppercase font-bold">
                    {item.category}
                  </span>

                  {/* Open Specs Prompt */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/70 border border-neutral-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#FFD700]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-3 space-y-3">
                  <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-[#FFD700] transition-colors leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Target Muscles Badges */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-neutral-500">Target Anatomy:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.targetMuscles.slice(0, 3).map((m, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium">
                          {m}
                        </span>
                      ))}
                      {item.targetMuscles.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#FFD700]">
                          +{item.targetMuscles.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Specs Bar */}
              <div className="p-6 pt-0 border-t border-neutral-800/80 mt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono text-[11px] truncate max-w-[200px]">
                  {item.specs.capacity}
                </span>
                <span className="text-[#FFD700] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Machine Details Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#121212] border-2 border-[#D4AF37]/60 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">
                {selectedItem.category} · Equipment Blueprint
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
                {selectedItem.name}
              </h3>
            </div>

            {/* Image & Key Specs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
              <div className="h-60 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3 text-xs flex flex-col justify-center">
                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block">Load / Weight Capacity</span>
                  <p className="font-bold text-white text-sm">{selectedItem.specs.capacity}</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block">Frame Construction</span>
                  <p className="font-semibold text-neutral-200">{selectedItem.specs.steelGrade}</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block">Safety Architecture</span>
                  <p className="text-neutral-300">{selectedItem.specs.features}</p>
                </div>
              </div>
            </div>

            {/* Biomechanics Coaching Tip */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-[#D4AF37]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                <Zap className="w-4 h-4 fill-current" />
                <span>Old Gym Coach Biomechanics Cue</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                "{selectedItem.biomechanicsTip}"
              </p>
            </div>

            {/* Target Muscles Full Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-neutral-400">Targeted Muscle Groups:</span>
              <div className="flex flex-wrap gap-2">
                {selectedItem.targetMuscles.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{muscle}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Close Machine Blueprint
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
