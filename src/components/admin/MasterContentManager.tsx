import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Trainer, PricingPlan } from '../../data/gymData';
import { CoachRecord, EquipmentRecord } from '../../lib/supabase';
import { 
  Trophy, 
  Clock, 
  CreditCard, 
  Edit3, 
  Trash2, 
  Plus, 
  Check, 
  CheckCircle2, 
  Save, 
  Sparkles,
  X,
  Dumbbell,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Phone,
  Cloud,
  Layers
} from 'lucide-react';

export const MasterContentManager: React.FC = () => {
  const { 
    trainers, 
    addTrainer, 
    updateTrainer, 
    deleteTrainer,
    pricingPlans,
    updatePlanPrice,
    gymHours,
    updateGymHours,
    coaches,
    addCoach,
    updateCoach,
    deleteCoach,
    equipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
  } = useGym();

  // Active Sub-Tab
  const [activeTab, setActiveTab] = useState<'coaches' | 'equipment' | 'timing' | 'pricing'>('coaches');

  // Timing state
  const [editableHours, setEditableHours] = useState(gymHours);
  const [hoursSavedNotification, setHoursSavedNotification] = useState(false);

  // Pricing edit state
  const [pricesState, setPricesState] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    pricingPlans.forEach(p => {
      initial[p.id] = p.price;
    });
    return initial;
  });
  const [pricingSavedNotification, setPricingSavedNotification] = useState(false);

  // Trainer Modal / Form states (Web Display & Supabase Coaches)
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [editingCoachRecord, setEditingCoachRecord] = useState<CoachRecord | null>(null);

  // Coach Form inputs
  const [coachName, setCoachName] = useState('');
  const [coachRole, setCoachRole] = useState('Professional Bodybuilder & Certified Trainer');
  const [coachPhone, setCoachPhone] = useState('+880 1711-234567');
  const [coachSpecialty, setCoachSpecialty] = useState('Heavy Hypertrophy, Contest Prep, Strength');
  const [coachStatus, setCoachStatus] = useState<'Active' | 'Inactive'>('Active');
  const [coachExp, setCoachExp] = useState('8+ Years Coaching Experience');
  const [coachAchievements, setCoachAchievements] = useState('Senior Physique Coach & Gold Medalist');
  const [coachImage, setCoachImage] = useState('/assets/images/trainer_bodybuilder_pro_1790467287018.jpg');

  // Equipment Modal / Form states
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentRecord | null>(null);
  const [equipmentFilter, setEquipmentFilter] = useState<string>('All');

  // Equipment Form inputs
  const [eqName, setEqName] = useState('');
  const [eqCategory, setEqCategory] = useState('Free Weights');
  const [eqQuantity, setEqQuantity] = useState(1);
  const [eqCondition, setEqCondition] = useState<EquipmentRecord['condition']>('Excellent');
  const [eqLastServiced, setEqLastServiced] = useState(new Date().toISOString().split('T')[0]);

  // Handle Gym Hours Save
  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    updateGymHours(editableHours);
    setHoursSavedNotification(true);
    setTimeout(() => setHoursSavedNotification(false), 3000);
  };

  // Handle Pricing Save
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(pricesState).forEach(([planId, newPrice]) => {
      updatePlanPrice(planId, Number(newPrice));
    });
    setPricingSavedNotification(true);
    setTimeout(() => setPricingSavedNotification(false), 3000);
  };

  // Open Add Coach
  const handleOpenAddCoach = () => {
    setEditingTrainer(null);
    setEditingCoachRecord(null);
    setCoachName('');
    setCoachRole('Professional Bodybuilder & Certified Trainer');
    setCoachPhone('+880 1711-000000');
    setCoachSpecialty('Heavy Hypertrophy, Biomechanics, Nutrition');
    setCoachStatus('Active');
    setCoachExp('7+ Years Experience');
    setCoachAchievements('Divisional Bodybuilding Competitor & Coach');
    setCoachImage('/assets/images/trainer_bodybuilder_pro_1790467287018.jpg');
    setIsTrainerModalOpen(true);
  };

  // Open Edit Coach
  const handleOpenEditCoach = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    // Find matching coach record in Supabase if exists
    const matching = coaches.find(c => c.name.toLowerCase() === trainer.name.toLowerCase() || c.id === trainer.id);
    setEditingCoachRecord(matching || null);
    setCoachName(trainer.name);
    setCoachRole(trainer.role);
    setCoachPhone(matching?.phone || '+880 1711-234567');
    setCoachSpecialty(matching?.specialty || trainer.specialties.join(', '));
    setCoachStatus(matching?.status || 'Active');
    setCoachExp(trainer.experience);
    setCoachAchievements(trainer.achievements);
    setCoachImage(trainer.image);
    setIsTrainerModalOpen(true);
  };

  // Save Coach (Add or Update)
  const handleSaveCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachName.trim()) return;

    const specsArray = coachSpecialty
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingTrainer) {
      updateTrainer(editingTrainer.id, {
        name: coachName.trim(),
        role: coachRole.trim(),
        experience: coachExp.trim(),
        achievements: coachAchievements.trim(),
        specialties: specsArray,
        image: coachImage
      });

      if (editingCoachRecord) {
        await updateCoach(editingCoachRecord.id, {
          name: coachName.trim(),
          role: coachRole.trim(),
          phone: coachPhone.trim(),
          specialty: coachSpecialty.trim(),
          status: coachStatus,
        });
      }
    } else {
      addTrainer({
        name: coachName.trim(),
        role: coachRole.trim(),
        experience: coachExp.trim(),
        achievements: coachAchievements.trim(),
        specialties: specsArray,
        image: coachImage
      });

      // Also persist to Supabase coaches table
      await addCoach({
        name: coachName.trim(),
        role: coachRole.trim(),
        phone: coachPhone.trim(),
        specialty: coachSpecialty.trim(),
        status: coachStatus,
      });
    }

    setIsTrainerModalOpen(false);
  };

  // Open Add Equipment
  const handleOpenAddEquipment = () => {
    setEditingEquipment(null);
    setEqName('');
    setEqCategory('Free Weights');
    setEqQuantity(1);
    setEqCondition('Excellent');
    setEqLastServiced(new Date().toISOString().split('T')[0]);
    setIsEquipmentModalOpen(true);
  };

  // Open Edit Equipment
  const handleOpenEditEquipment = (item: EquipmentRecord) => {
    setEditingEquipment(item);
    setEqName(item.name);
    setEqCategory(item.category);
    setEqQuantity(item.quantity);
    setEqCondition(item.condition);
    setEqLastServiced(item.last_serviced);
    setIsEquipmentModalOpen(true);
  };

  // Save Equipment (Add or Update)
  const handleSaveEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eqName.trim()) return;

    if (editingEquipment) {
      await updateEquipment(editingEquipment.id, {
        name: eqName.trim(),
        category: eqCategory,
        quantity: Number(eqQuantity) || 1,
        condition: eqCondition,
        last_serviced: eqLastServiced,
      });
    } else {
      await addEquipment({
        name: eqName.trim(),
        category: eqCategory,
        quantity: Number(eqQuantity) || 1,
        condition: eqCondition,
        last_serviced: eqLastServiced,
      });
    }

    setIsEquipmentModalOpen(false);
  };

  // Filtered Equipment list
  const filteredEquipment = equipment.filter(item => {
    if (equipmentFilter === 'All') return true;
    return item.category === equipmentFilter;
  });

  const equipmentCategories = ['All', 'Free Weights', 'Plate-Loaded', 'Pin-Loaded', 'Cardio', 'Powerlifting', 'Accessories'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Sub-Tabs: Coaches, Equipment, Timing, Pricing */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] border border-neutral-800 rounded-2xl">
        <button
          onClick={() => setActiveTab('coaches')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'coaches'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Coaches & Mentors ({trainers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('equipment')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'equipment'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Equipment & Machines ({equipment.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Membership Fees & Pricing</span>
        </button>

        <button
          onClick={() => setActiveTab('timing')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'timing'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Gym Operating Hours</span>
        </button>
      </div>

      {/* SUB-SECTION 1: COACHES / TRAINERS */}
      {activeTab === 'coaches' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-3xl border border-neutral-800 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Dynamic Roster</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Cloud className="w-3 h-3" />
                  <span>Supabase: coaches table</span>
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">Bodybuilding Mentors & Coaches</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Profiles shown publicly on the main website and persisted to the Supabase <code className="text-emerald-400">coaches</code> table.
              </p>
            </div>

            <button
              onClick={handleOpenAddCoach}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Coach</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => {
              const matchedRecord = coaches.find(c => c.name.toLowerCase() === trainer.name.toLowerCase() || c.id === trainer.id);
              return (
                <div
                  key={trainer.id}
                  className="rounded-2xl bg-[#121212] border border-neutral-800 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col justify-between transition-all shadow-xl"
                >
                  <div>
                    <div className="relative h-48 bg-neutral-900 overflow-hidden">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 border border-[#D4AF37]/40 text-[10px] font-mono text-[#FFD700]">
                        {trainer.experience}
                      </span>
                      {matchedRecord && (
                        <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          matchedRecord.status === 'Active' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-neutral-900/80 text-neutral-400 border border-neutral-700'
                        }`}>
                          {matchedRecord.status}
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h4 className="font-heading text-xl font-bold uppercase text-white">{trainer.name}</h4>
                        <p className="text-[11px] font-semibold text-[#D4AF37] uppercase">{trainer.role}</p>
                        {matchedRecord?.phone && (
                          <p className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5 mt-1">
                            <Phone className="w-3 h-3 text-neutral-500" />
                            <span>{matchedRecord.phone}</span>
                          </p>
                        )}
                      </div>

                      <p className="text-xs text-neutral-300 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                        {trainer.achievements}
                      </p>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">Specialties</span>
                        <div className="flex flex-wrap gap-1">
                          {trainer.specialties.map((s, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-neutral-800/80 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-mono">ID: {trainer.id.slice(0, 8)}...</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditCoach(trainer)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                        title="Edit Coach"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (trainers.length <= 1) {
                            alert('At least one coach must remain displayed on the website.');
                            return;
                          }
                          if (window.confirm(`Delete coach ${trainer.name}? This will remove from live roster and Supabase coaches table.`)) {
                            deleteTrainer(trainer.id);
                            if (matchedRecord) {
                              await deleteCoach(matchedRecord.id);
                            }
                          }
                        }}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors cursor-pointer"
                        title="Delete Coach"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: EQUIPMENT INVENTORY */}
      {activeTab === 'equipment' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-3xl border border-neutral-800 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Hardware Assets</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Cloud className="w-3 h-3" />
                  <span>Supabase: equipment table</span>
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">Heavy Iron & Machine Assets</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Full inventory of barbells, power racks, pin-loaded & plate-loaded machines backed by Supabase.
              </p>
            </div>

            <button
              onClick={handleOpenAddEquipment}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Equipment</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {equipmentCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setEquipmentFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  equipmentFilter === cat
                    ? 'bg-neutral-200 text-black shadow-sm'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Equipment Table / Cards */}
          <div className="bg-[#121212] rounded-3xl border border-neutral-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px] tracking-wider">
                    <th className="p-4">Equipment Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Last Serviced</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredEquipment.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-neutral-500 font-mono">
                        No equipment found matching "{equipmentFilter}". Click "Add Equipment" to register new gym gear.
                      </td>
                    </tr>
                  ) : (
                    filteredEquipment.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D4AF37]">
                              <Dumbbell className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-white block">{item.name}</span>
                              <span className="text-[10px] text-neutral-500 font-mono">{item.id.slice(0, 8)}...</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold font-mono text-white text-sm">{item.quantity}</span>
                          <span className="text-[10px] text-neutral-500 ml-1">units</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase inline-flex items-center gap-1 ${
                            item.condition === 'Excellent'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                              : item.condition === 'Good'
                              ? 'bg-blue-950/80 text-blue-400 border border-blue-500/40'
                              : item.condition === 'Needs Service'
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                              : 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                          }`}>
                            {item.condition === 'Excellent' && <ShieldCheck className="w-3 h-3" />}
                            {item.condition === 'Needs Service' && <Wrench className="w-3 h-3" />}
                            {item.condition === 'Maintenance Required' && <AlertTriangle className="w-3 h-3" />}
                            <span>{item.condition}</span>
                          </span>
                        </td>
                        <td className="p-4 font-mono text-neutral-400">
                          {item.last_serviced}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditEquipment(item)}
                              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                              title="Edit Equipment"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm(`Delete equipment item "${item.name}" from Supabase?`)) {
                                  await deleteEquipment(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: PRICING EDITOR */}
      {activeTab === 'pricing' && (
        <div className="bg-[#121212] p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Financial Controls</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">Membership Fees Editor</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Update the official subscription rates for Old Gym Munshiganj. Live sync to website pricing cards.
              </p>
            </div>

            {pricingSavedNotification && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pricing successfully updated across website!</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSavePricing} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-heading text-lg font-bold uppercase text-white">{plan.name}</h4>
                    {plan.popular && (
                      <span className="text-[10px] font-bold text-black bg-[#D4AF37] px-2 py-0.5 rounded uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">{plan.description}</p>
                  
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Subscription Fee (৳ BDT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">৳</span>
                      <input
                        type="number"
                        min="100"
                        step="50"
                        value={pricesState[plan.id] ?? plan.price}
                        onChange={(e) => setPricesState({ ...pricesState, [plan.id]: Number(e.target.value) })}
                        className="w-full pl-8 pr-4 py-2 rounded-xl bg-black border border-neutral-700 text-white font-mono font-bold text-sm focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      Period: {plan.billingPeriod}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save All Membership Rates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-SECTION 4: TIMING EDITOR (MEN & WOMEN SHIFTS) */}
      {activeTab === 'timing' && (
        <div className="bg-[#121212] p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Shift Management</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">Men's & Women's Schedule Editor</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Configure separated training shifts for female and male lifters. Synchronizes live to website header, contact cards, and footer.
              </p>
            </div>

            {hoursSavedNotification && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Men & Women schedules updated live across website!</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSaveHours} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 1. Men's Shift / Schedule */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">👨</span>
                    <div>
                      <h4 className="font-heading text-lg font-bold uppercase text-white">Men's Shift / Schedule</h4>
                      <p className="text-[11px] text-neutral-400">Regular training slots for male athletes</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    Men Only
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Days Span</label>
                    <input
                      type="text"
                      value={editableHours.menHours.days}
                      onChange={(e) => setEditableHours({
                        ...editableHours,
                        menHours: { ...editableHours.menHours, days: e.target.value }
                      })}
                      placeholder="e.g. Saturday – Thursday"
                      className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Hours / Time Range</label>
                    <input
                      type="text"
                      value={editableHours.menHours.hours}
                      onChange={(e) => setEditableHours({
                        ...editableHours,
                        menHours: { ...editableHours.menHours, hours: e.target.value }
                      })}
                      placeholder="e.g. 6:00 AM – 10:00 AM & 3:00 PM – 10:30 PM"
                      className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Shift Notes / Description</label>
                    <input
                      type="text"
                      value={editableHours.menHours.note || ''}
                      onChange={(e) => setEditableHours({
                        ...editableHours,
                        menHours: { ...editableHours.menHours, note: e.target.value }
                      })}
                      placeholder="e.g. Morning & Evening Heavy Power Slots"
                      className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-neutral-300 text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Women's Shift / Schedule */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-rose-500/40 transition-colors">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">👩</span>
                    <div>
                      <h4 className="font-heading text-lg font-bold uppercase text-white">Women's Shift (Exclusive)</h4>
                      <p className="text-[11px] text-neutral-400">100% private slot with certified female mentor</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Women Only
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Days Span</label>
                    <input
                      type="text"
                      value={editableHours.womenHours.days}
                      onChange={(e) => setEditableHours({
                        ...editableHours,
                        womenHours: { ...editableHours.womenHours, days: e.target.value }
                      })}
                      placeholder="e.g. Saturday – Thursday"
                      className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Hours / Time Range</label>
                    <input
                      type="text"
                      value={editableHours.womenHours.hours}
                      onChange={(e) => setEditableHours({
                        ...editableHours,
                        womenHours: { ...editableHours.womenHours, hours: e.target.value }
                      })}
                      placeholder="e.g. 10:00 AM – 2:30 PM (Midday)"
                      className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Shift Notes / Description</label>
                    <input
                      type="text"
                      value={editableHours.womenHours.note || ''}
                      onChange={(e) => setEditableHours({
                        ...editableHours,
                        womenHours: { ...editableHours.womenHours, note: e.target.value }
                      })}
                      placeholder="e.g. Total privacy, curtained entrance & female staff"
                      className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-neutral-300 text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Friday Special Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🕌</span>
                  <div>
                    <h4 className="font-heading text-lg font-bold uppercase text-white">Friday Schedule</h4>
                    <p className="text-[11px] text-neutral-400">Post-Jummah community training window</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Friday Special
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Day Span</label>
                  <input
                    type="text"
                    value={editableHours.fridayHours.days}
                    onChange={(e) => setEditableHours({
                      ...editableHours,
                      fridayHours: { ...editableHours.fridayHours, days: e.target.value }
                    })}
                    placeholder="e.g. Friday (Special Post-Jummah)"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Hours / Time Range</label>
                  <input
                    type="text"
                    value={editableHours.fridayHours.hours}
                    onChange={(e) => setEditableHours({
                      ...editableHours,
                      fridayHours: { ...editableHours.fridayHours, hours: e.target.value }
                    })}
                    placeholder="e.g. 3:00 PM – 9:30 PM"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Audience / Gender Tag</label>
                  <input
                    type="text"
                    value={editableHours.fridayHours.note || ''}
                    onChange={(e) => setEditableHours({
                      ...editableHours,
                      fridayHours: { ...editableHours.fridayHours, note: e.target.value }
                    })}
                    placeholder="e.g. Open for Lifters (Men & Athletes)"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-700 text-neutral-300 text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Schedule Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add / Edit Coach Modal */}
      {isTrainerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#141414] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsTrainerModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Coach Profile & Supabase Cloud</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                {editingTrainer ? `Edit ${editingTrainer.name}` : 'Add Master Coach'}
              </h3>
              <p className="text-xs text-neutral-400">Configure credentials, phone, and specialties for Old Gym Munshiganj.</p>
            </div>

            <form onSubmit={handleSaveCoach} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Coach Name *</label>
                  <input
                    type="text"
                    required
                    value={coachName}
                    onChange={(e) => setCoachName(e.target.value)}
                    placeholder="e.g. Coach Farhan Ahmed"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={coachPhone}
                    onChange={(e) => setCoachPhone(e.target.value)}
                    placeholder="e.g. +880 1711-234567"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    required
                    value={coachRole}
                    onChange={(e) => setCoachRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Status</label>
                  <select
                    value={coachStatus}
                    onChange={(e) => setCoachStatus(e.target.value as 'Active' | 'Inactive')}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Experience</label>
                  <input
                    type="text"
                    required
                    value={coachExp}
                    onChange={(e) => setCoachExp(e.target.value)}
                    placeholder="e.g. 8+ Years Coaching"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    required
                    value={coachImage}
                    onChange={(e) => setCoachImage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Achievements / Honors</label>
                <textarea
                  rows={2}
                  value={coachAchievements}
                  onChange={(e) => setCoachAchievements(e.target.value)}
                  placeholder="e.g. Divisional Bodybuilding Medalist & Senior Coach"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Specialties (Comma Separated)</label>
                <input
                  type="text"
                  value={coachSpecialty}
                  onChange={(e) => setCoachSpecialty(e.target.value)}
                  placeholder="e.g. Heavy Hypertrophy, Contest Prep, Strength"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all cursor-pointer shadow-md active:scale-95"
              >
                {editingTrainer ? 'Save & Sync Coach' : 'Publish & Sync Coach'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Equipment Modal */}
      {isEquipmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#141414] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsEquipmentModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Hardware Asset & Supabase Cloud</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                {editingEquipment ? `Edit ${editingEquipment.name}` : 'Add Gym Equipment'}
              </h3>
              <p className="text-xs text-neutral-400">Manage machine inventory in Supabase <code className="text-emerald-400">equipment</code> table.</p>
            </div>

            <form onSubmit={handleSaveEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Equipment Name *</label>
                <input
                  type="text"
                  required
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  placeholder="e.g. Olympic Barbell Set (20kg)"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                  <select
                    value={eqCategory}
                    onChange={(e) => setEqCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Free Weights">Free Weights</option>
                    <option value="Plate-Loaded">Plate-Loaded</option>
                    <option value="Pin-Loaded">Pin-Loaded</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Powerlifting">Powerlifting</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={eqQuantity}
                    onChange={(e) => setEqQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Condition</label>
                  <select
                    value={eqCondition}
                    onChange={(e) => setEqCondition(e.target.value as EquipmentRecord['condition'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Needs Service">Needs Service</option>
                    <option value="Maintenance Required">Maintenance Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Last Serviced Date</label>
                  <input
                    type="date"
                    required
                    value={eqLastServiced}
                    onChange={(e) => setEqLastServiced(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all cursor-pointer shadow-md active:scale-95"
              >
                {editingEquipment ? 'Update Equipment Item' : 'Add Equipment to Supabase'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
