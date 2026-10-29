import React, { createContext, useContext, useState, useEffect } from 'react';
import { GYM_INFO, TRAINERS, PRICING_PLANS, Trainer, PricingPlan, GALLERY_ITEMS, GalleryItem } from '../data/gymData';
import { 
  insertLeadToSupabase, 
  fetchMembersFromSupabase, 
  syncMembersToSupabase,
  deleteMemberFromSupabase,
  fetchLeadsFromSupabase,
  updateLeadStatusInSupabase,
  deleteLeadFromSupabase,
  fetchTransactionsFromSupabase,
  insertTransactionToSupabase,
  fetchCoachesFromSupabase,
  insertCoachToSupabase,
  updateCoachInSupabase,
  deleteCoachFromSupabase,
  fetchEquipmentFromSupabase,
  insertEquipmentToSupabase,
  updateEquipmentInSupabase,
  deleteEquipmentFromSupabase,
  getSupabaseConfig,
  CoachRecord,
  EquipmentRecord
} from '../lib/supabase';

export interface Member {
  id: string;
  fullName: string;
  phone: string;
  plan: 'Monthly' | '3 Months' | 'Yearly VIP';
  amount: number;
  joinDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  status: 'Active' | 'Expired' | 'Pending';
  emergencyContact?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  source: 'Free Trial Pass' | 'Contact Form' | 'Direct Inquiry' | 'Diet Blueprint';
  interestedProgram: string;
  date: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Archived';
  notes?: string;
}

export interface GymTransaction {
  id: string;
  memberId: string;
  memberName: string;
  plan: string;
  amount: number;
  date: string;
  method: 'bKash' | 'Nagad' | 'Cash' | 'Bank Transfer';
  status: 'Paid' | 'Pending';
}

export interface ScheduleSlot {
  days: string;
  hours: string;
  note?: string;
}

export interface GymHours {
  menHours: ScheduleSlot;
  womenHours: ScheduleSlot;
  fridayHours: ScheduleSlot;
}

const ENV_ADMIN_PASSWORD = (import.meta.env?.VITE_ADMIN_PASSWORD as string | undefined)?.trim();
const FALLBACK_DEFAULT_ADMIN_PASSWORD = 'OldGym@2026';

export const getStoredAdminPassword = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('oldgym_admin_secure_password');
    if (saved && saved.trim().length >= 4) {
      return saved.trim();
    }
  }
  return (ENV_ADMIN_PASSWORD || FALLBACK_DEFAULT_ADMIN_PASSWORD).trim();
};

export const checkHasCustomPassword = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('oldgym_admin_secure_password');
    return Boolean(saved && saved.trim().length >= 4);
  }
  return false;
};

interface GymContextType {
  // Auth & Security Lock
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showShareModal: boolean;
  setShowShareModal: (show: boolean) => void;
  openShareModal: () => void;
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  changeAdminPassword: (currentPass: string, newPass: string) => { success: boolean; message: string };
  resetAdminPasswordToDefault: () => void;
  hasCustomPassword: boolean;
  failedAttempts: number;
  lockoutRemainingSeconds: number;

  // Members
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, updated: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  renewMember: (id: string, monthsToAdd: number) => void;

  // Leads
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  convertLeadToMember: (leadId: string, plan: Member['plan']) => void;
  deleteLead: (id: string) => void;

  // Coaches (from Supabase 'coaches')
  coaches: CoachRecord[];
  setCoaches: React.Dispatch<React.SetStateAction<CoachRecord[]>>;
  addCoach: (coach: Omit<CoachRecord, 'id'>) => Promise<void>;
  updateCoach: (id: string, updates: Partial<CoachRecord>) => Promise<void>;
  deleteCoach: (id: string) => Promise<void>;

  // Equipment (from Supabase 'equipment')
  equipment: EquipmentRecord[];
  setEquipment: React.Dispatch<React.SetStateAction<EquipmentRecord[]>>;
  addEquipment: (item: Omit<EquipmentRecord, 'id'>) => Promise<void>;
  updateEquipment: (id: string, updates: Partial<EquipmentRecord>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;

  // Master Content
  trainers: Trainer[];
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, updated: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;

  pricingPlans: PricingPlan[];
  updatePlanPrice: (planId: string, newPrice: number) => void;

  gymHours: GymHours;
  updateGymHours: (newHours: GymHours) => void;

  // Gallery
  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Transactions
  transactions: GymTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<GymTransaction[]>>;
  refreshAllFromSupabase: () => Promise<void>;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'OGM-101',
    fullName: 'Nazmul Hassan',
    phone: '01712-334455',
    plan: 'Yearly VIP',
    amount: 8000,
    joinDate: '2026-01-10',
    expiryDate: '2027-01-10',
    status: 'Active',
    notes: 'Long-term athlete, morning lifter.'
  },
  {
    id: 'OGM-102',
    fullName: 'Erron Black',
    phone: '01819-445566',
    plan: '3 Months',
    amount: 2500,
    joinDate: '2026-08-15',
    expiryDate: '2026-11-15',
    status: 'Active',
    notes: 'Powerlifting focus, preparing for district meet.'
  },
  {
    id: 'OGM-103',
    fullName: 'Antarik Islam',
    phone: '01911-223344',
    plan: 'Monthly',
    amount: 1000,
    joinDate: '2026-09-01',
    expiryDate: '2026-10-01',
    status: 'Active',
    notes: 'Evening session attendee.'
  }
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Rafiqul Islam',
    phone: '01711-889900',
    source: 'Free Trial Pass',
    interestedProgram: 'Weight Training & Muscle Building',
    date: '2026-09-26 14:30',
    status: 'New',
    notes: 'Requested 1-day pass for chest workout.'
  },
  {
    id: 'lead-2',
    fullName: 'Shahadat Hossain',
    phone: '01833-221144',
    source: 'Diet Blueprint',
    interestedProgram: 'Rapid Fat Loss & Cardio Conditioning',
    date: '2026-09-25 18:15',
    status: 'Contacted',
    notes: 'Called and briefed about 3-month package.'
  }
];

const INITIAL_COACHES: CoachRecord[] = [
  {
    id: 'coach-1',
    name: 'Coach Farhan Ahmed',
    role: 'Senior Head Coach',
    phone: '01919-048227',
    specialty: 'Competitive Bodybuilding, Heavy Hypertrophy, Diet Planning',
    status: 'Active'
  },
  {
    id: 'coach-2',
    name: 'Coach Tariqul Islam',
    role: 'Certified Strength Trainer',
    phone: '01822-112233',
    specialty: 'Powerlifting, Functional Mobility, Fat Loss Conditioning',
    status: 'Active'
  },
  {
    id: 'coach-3',
    name: 'Coach Mahfuzur Rahman',
    role: 'Physique Specialist',
    phone: '01711-998877',
    specialty: 'Contest Prep, Biomechanics, Calisthenics',
    status: 'Active'
  }
];

const INITIAL_EQUIPMENT: EquipmentRecord[] = [
  {
    id: 'eq-1',
    name: 'Commercial Olympic Power Cage & Squat Rack',
    category: 'Heavy Racks & Free Weights',
    quantity: 2,
    condition: 'Excellent',
    last_serviced: '2026-09-10'
  },
  {
    id: 'eq-2',
    name: 'Dual Cable Functional Crossover Station (100kg Stacks)',
    category: 'Cables & Pulley',
    quantity: 1,
    condition: 'Excellent',
    last_serviced: '2026-09-12'
  },
  {
    id: 'eq-3',
    name: 'Calibrated Rubber Hex Dumbbell Set (2.5kg - 45kg)',
    category: 'Free Weights',
    quantity: 30,
    condition: 'Excellent',
    last_serviced: '2026-09-20'
  },
  {
    id: 'eq-4',
    name: 'Olympic 45-Degree Plate-Loaded Leg Press',
    category: 'Lower Body Machines',
    quantity: 1,
    condition: 'Good',
    last_serviced: '2026-08-25'
  },
  {
    id: 'eq-5',
    name: 'Heavy Duty Flat & Incline Olympic Benches',
    category: 'Benches',
    quantity: 4,
    condition: 'Excellent',
    last_serviced: '2026-09-05'
  },
  {
    id: 'eq-6',
    name: 'Commercial Curved Treadmill & Air Bike',
    category: 'Cardio Conditioning',
    quantity: 2,
    condition: 'Good',
    last_serviced: '2026-09-18'
  }
];

const INITIAL_TRANSACTIONS: GymTransaction[] = [
  {
    id: 'TXN-1001',
    memberId: 'OGM-101',
    memberName: 'Nazmul Hassan',
    plan: 'Yearly VIP',
    amount: 8000,
    date: '2026-01-10',
    method: 'Cash',
    status: 'Paid'
  },
  {
    id: 'TXN-1002',
    memberId: 'OGM-102',
    memberName: 'Erron Black',
    plan: '3 Months',
    amount: 2500,
    date: '2026-08-15',
    method: 'Cash',
    status: 'Paid'
  },
  {
    id: 'TXN-1003',
    memberId: 'OGM-103',
    memberName: 'Antarik Islam',
    plan: 'Monthly',
    amount: 1000,
    date: '2026-09-01',
    method: 'Cash',
    status: 'Paid'
  }
];

const INITIAL_HOURS: GymHours = {
  menHours: {
    days: 'Saturday – Thursday',
    hours: '6:00 AM – 12:00 PM & 4:30 PM – 10:30 PM',
    note: 'Morning & Evening Heavy Training Blocks'
  },
  womenHours: {
    days: 'Saturday – Thursday',
    hours: '12:30 PM – 4:00 PM',
    note: 'Exclusive Ladies Slot with Full Privacy & Female Support'
  },
  fridayHours: {
    days: 'Every Friday',
    hours: '3:00 PM – 9:30 PM',
    note: 'Jummah Special Shift (Mixed Open Access)'
  }
};

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth State (Custom Password Protection System)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const active = sessionStorage.getItem('oldgym_admin_session') === 'active';
      if (!active) return false;
      const lastActivityStr = sessionStorage.getItem('oldgym_admin_last_activity');
      if (lastActivityStr) {
        const lastActivity = parseInt(lastActivityStr, 10);
        if (!isNaN(lastActivity) && Date.now() - lastActivity > 15 * 60 * 1000) {
          sessionStorage.removeItem('oldgym_admin_session');
          sessionStorage.removeItem('oldgym_admin_last_activity');
          return false;
        }
      }
      return true;
    }
    return false;
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const openShareModal = () => setShowShareModal(true);
  const [currentView, setCurrentView] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/' || hash === '#admin') {
        return 'admin';
      }
    }
    return 'public';
  });

  // Keep browser URL in sync with current view for deep-linking & refreshing on Netlify
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentView === 'admin') {
        if (window.location.pathname !== '/admin') {
          window.history.replaceState(null, '', '/admin');
        }
      } else {
        if (window.location.pathname === '/admin') {
          window.history.replaceState(null, '', '/');
        }
      }

      const handlePopState = () => {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        if (path === '/admin' || path === '/admin/' || hash === '#admin') {
          setCurrentView('admin');
        } else {
          setCurrentView('public');
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [currentView]);
  const [hasCustomPassword, setHasCustomPassword] = useState<boolean>(() => checkHasCustomPassword());
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);

  // Members State
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('oldgym_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  // Leads State
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('oldgym_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  // Coaches State
  const [coaches, setCoaches] = useState<CoachRecord[]>(() => {
    const saved = localStorage.getItem('oldgym_coaches');
    return saved ? JSON.parse(saved) : INITIAL_COACHES;
  });

  // Equipment State
  const [equipment, setEquipment] = useState<EquipmentRecord[]>(() => {
    const saved = localStorage.getItem('oldgym_equipment');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  // Master Content State
  const [trainers, setTrainers] = useState<Trainer[]>(() => {
    const saved = localStorage.getItem('oldgym_trainers');
    return saved ? JSON.parse(saved) : TRAINERS;
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('oldgym_pricing');
    return saved ? JSON.parse(saved) : PRICING_PLANS;
  });

  const [gymHours, setGymHours] = useState<GymHours>(() => {
    try {
      const saved = localStorage.getItem('oldgym_hours');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.menHours && parsed.womenHours && parsed.fridayHours) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_HOURS;
  });

  const [transactions, setTransactions] = useState<GymTransaction[]>(() => {
    const saved = localStorage.getItem('oldgym_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Gallery State & Methods
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('oldgym_gallery');
      return saved ? JSON.parse(saved) : GALLERY_ITEMS;
    } catch {
      return GALLERY_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('oldgym_gallery', JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Failed to persist gallery to localStorage:', e);
    }
  }, [galleryItems]);

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // Persistence Effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAdmin) {
        sessionStorage.setItem('oldgym_admin_session', 'active');
      } else {
        sessionStorage.removeItem('oldgym_admin_session');
        localStorage.removeItem('oldgym_admin_auth');
      }
    }
  }, [isAdmin]);


  useEffect(() => {
    localStorage.setItem('oldgym_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('oldgym_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('oldgym_coaches', JSON.stringify(coaches));
  }, [coaches]);

  useEffect(() => {
    localStorage.setItem('oldgym_equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('oldgym_trainers', JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem('oldgym_pricing', JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem('oldgym_hours', JSON.stringify(gymHours));
  }, [gymHours]);

  useEffect(() => {
    localStorage.setItem('oldgym_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Master refresh function to pull all 5 tables from Supabase
  const refreshAllFromSupabase = async () => {
    if (!getSupabaseConfig().isConfigured) return;

    try {
      const [m, l, t, c, eq] = await Promise.all([
        fetchMembersFromSupabase(),
        fetchLeadsFromSupabase(),
        fetchTransactionsFromSupabase(),
        fetchCoachesFromSupabase(),
        fetchEquipmentFromSupabase()
      ]);

      if (m && m.length > 0) setMembers(m);
      if (l && l.length > 0) setLeads(l);
      if (t && t.length > 0) setTransactions(t);
      if (c && c.length > 0) setCoaches(c);
      if (eq && eq.length > 0) setEquipment(eq);
    } catch (err) {
      console.warn('Supabase initial fetch warning:', err);
    }
  };

  // Supabase Background Sync on startup
  useEffect(() => {
    refreshAllFromSupabase();
  }, []);

  // 15-Minute Inactivity Auto-Lock Security
  useEffect(() => {
    if (!isAdmin || typeof window === 'undefined') return;

    const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 minutes = 900,000ms
    let lastActivity = Date.now();
    sessionStorage.setItem('oldgym_admin_last_activity', lastActivity.toString());

    const updateActivity = () => {
      lastActivity = Date.now();
      sessionStorage.setItem('oldgym_admin_last_activity', lastActivity.toString());
    };

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    let throttleTimeout: NodeJS.Timeout | null = null;
    const handleActivity = () => {
      if (!throttleTimeout) {
        updateActivity();
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
        }, 1500);
      }
    };

    activityEvents.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      if (elapsed >= INACTIVITY_LIMIT_MS) {
        console.warn('Admin session expired after 15 minutes of inactivity.');
        logoutAdmin();
      }
    }, 10000);

    return () => {
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleActivity));
      if (throttleTimeout) clearTimeout(throttleTimeout);
      clearInterval(checkInterval);
    };
  }, [isAdmin]);

  // Auth Functions (Custom Password Protection System)
  const loginAdmin = (enteredPasscode?: string): boolean => {
    if (!enteredPasscode) return false;
    const masterPassword = getStoredAdminPassword();
    const cleanInput = enteredPasscode.trim();

    // Verify against custom master password, environment-configured password, or fallback
    const isMatch = 
      cleanInput === masterPassword ||
      (Boolean(ENV_ADMIN_PASSWORD) && cleanInput === ENV_ADMIN_PASSWORD) ||
      cleanInput === FALLBACK_DEFAULT_ADMIN_PASSWORD;

    if (isMatch) {
      setIsAdmin(true);
      setCurrentView('admin');
      setFailedAttempts(0);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('oldgym_admin_session', 'active');
        sessionStorage.setItem('oldgym_admin_last_activity', Date.now().toString());
      }
      return true;
    }

    setFailedAttempts(prev => prev + 1);
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setCurrentView('public');
    setShowLoginModal(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('oldgym_admin_session');
      sessionStorage.removeItem('oldgym_admin_last_activity');
      if (window.location.pathname === '/admin') {
        window.history.replaceState(null, '', '/');
      }
    }
  };

  const changeAdminPassword = (currentPass: string, newPass: string): { success: boolean; message: string } => {
    const currentSecure = getStoredAdminPassword();
    const cleanCurrent = currentPass.trim();

    const isCurrentValid = 
      cleanCurrent === currentSecure ||
      (Boolean(ENV_ADMIN_PASSWORD) && cleanCurrent === ENV_ADMIN_PASSWORD) ||
      cleanCurrent === FALLBACK_DEFAULT_ADMIN_PASSWORD;

    if (!isCurrentValid) {
      return { success: false, message: 'Current password does not match. Please verify and try again.' };
    }

    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'New password must be at least 4 characters long.' };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('oldgym_admin_secure_password', newPass.trim());
    }
    setHasCustomPassword(true);
    return { success: true, message: 'Master admin password successfully updated!' };
  };

  const resetAdminPasswordToDefault = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oldgym_admin_secure_password');
    }
    setHasCustomPassword(false);
  };

  const handleSetCurrentView = (view: 'public' | 'admin') => {
    if (view === 'admin') {
      if (isAdmin) {
        setCurrentView('admin');
      } else {
        setShowLoginModal(true);
      }
      return;
    }
    setCurrentView(view);
  };

  // Member Functions
  const addMember = (newMemberData: Omit<Member, 'id'>) => {
    const newId = `OGM-${Math.floor(100 + members.length + 1)}`;
    const newMember: Member = {
      ...newMemberData,
      id: newId
    };
    const updated = [newMember, ...members];
    setMembers(updated);
    syncMembersToSupabase(updated).catch(() => {});

    // Record Transaction
    const newTxn: GymTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: newId,
      memberName: newMember.fullName,
      plan: newMember.plan,
      amount: newMember.amount,
      date: new Date().toISOString().split('T')[0],
      method: 'Cash',
      status: newMember.status === 'Active' ? 'Paid' : 'Pending'
    };
    setTransactions((prev) => [newTxn, ...prev]);
    insertTransactionToSupabase(newTxn).catch(() => {});
  };

  const updateMember = (id: string, updated: Partial<Member>) => {
    setMembers((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...updated } : m));
      syncMembersToSupabase(next).catch(() => {});
      return next;
    });
  };

  const deleteMember = (id: string) => {
    const target = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    if (target?.phone) {
      deleteMemberFromSupabase(target.phone).catch(() => {});
    }
  };

  const renewMember = (id: string, monthsToAdd: number) => {
    setMembers((prev) => {
      const next = prev.map((m) => {
        if (m.id === id) {
          const currentExpiry = new Date(m.expiryDate);
          const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
          baseDate.setMonth(baseDate.getMonth() + monthsToAdd);
          const newExpiryStr = baseDate.toISOString().split('T')[0];
          
          return {
            ...m,
            expiryDate: newExpiryStr,
            status: 'Active' as const
          };
        }
        return m;
      });
      syncMembersToSupabase(next).catch(() => {});
      return next;
    });
  };

  // Lead Functions
  const addLead = (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      date: formattedDate,
      status: 'New'
    };
    setLeads((prev) => [newLead, ...prev]);

    // Insert into Supabase
    insertLeadToSupabase(newLead).catch((err) => {
      console.warn('Supabase lead sync note:', err);
    });
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    updateLeadStatusInSupabase(id, status).catch(() => {});
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    deleteLeadFromSupabase(id).catch(() => {});
  };

  const convertLeadToMember = (leadId: string, plan: Member['plan']) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    let amount = 1000;
    let months = 1;
    if (plan === '3 Months') {
      amount = 2500;
      months = 3;
    } else if (plan === 'Yearly VIP') {
      amount = 8000;
      months = 12;
    }

    const today = new Date();
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);

    addMember({
      fullName: lead.fullName,
      phone: lead.phone,
      plan,
      amount,
      joinDate: today.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      status: 'Active',
      notes: `Converted from Lead (${lead.source})`
    });

    updateLeadStatus(leadId, 'Converted');
  };

  // Coaches Handlers (Live with Supabase)
  const addCoach = async (coachData: Omit<CoachRecord, 'id'>) => {
    const created = await insertCoachToSupabase(coachData);
    if (created) {
      setCoaches((prev) => [...prev, created]);
    } else {
      const fallback: CoachRecord = {
        ...coachData,
        id: `coach-${Date.now()}`
      };
      setCoaches((prev) => [...prev, fallback]);
    }
  };

  const updateCoach = async (id: string, updates: Partial<CoachRecord>) => {
    setCoaches((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    await updateCoachInSupabase(id, updates);
  };

  const deleteCoach = async (id: string) => {
    setCoaches((prev) => prev.filter((c) => c.id !== id));
    await deleteCoachFromSupabase(id);
  };

  // Equipment Handlers (Live with Supabase)
  const addEquipment = async (itemData: Omit<EquipmentRecord, 'id'>) => {
    const created = await insertEquipmentToSupabase(itemData);
    if (created) {
      setEquipment((prev) => [created, ...prev]);
    } else {
      const fallback: EquipmentRecord = {
        ...itemData,
        id: `eq-${Date.now()}`
      };
      setEquipment((prev) => [fallback, ...prev]);
    }
  };

  const updateEquipment = async (id: string, updates: Partial<EquipmentRecord>) => {
    setEquipment((prev) => prev.map((eq) => (eq.id === id ? { ...eq, ...updates } : eq)));
    await updateEquipmentInSupabase(id, updates);
  };

  const deleteEquipment = async (id: string) => {
    setEquipment((prev) => prev.filter((eq) => eq.id !== id));
    await deleteEquipmentFromSupabase(id);
  };

  // Master Content Handlers (Trainers / Pricing / Hours)
  const addTrainer = (trainerData: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = {
      ...trainerData,
      id: `trainer-${Date.now()}`
    };
    setTrainers((prev) => [...prev, newTrainer]);
  };

  const updateTrainer = (id: string, updated: Partial<Trainer>) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTrainer = (id: string) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
  };

  const updatePlanPrice = (planId: string, newPrice: number) => {
    setPricingPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, price: newPrice } : p))
    );
  };

  const updateGymHours = (newHours: GymHours) => {
    setGymHours(newHours);
  };

  return (
    <GymContext.Provider
      value={{
        isAdmin,
        loginAdmin,
        logoutAdmin,
        showLoginModal,
        setShowLoginModal,
        showShareModal,
        setShowShareModal,
        openShareModal,
        currentView,
        setCurrentView: handleSetCurrentView,
        changeAdminPassword,
        resetAdminPasswordToDefault,
        hasCustomPassword,
        failedAttempts,
        lockoutRemainingSeconds,
        members,
        setMembers,
        addMember,
        updateMember,
        deleteMember,
        renewMember,
        leads,
        setLeads,
        addLead,
        updateLeadStatus,
        convertLeadToMember,
        deleteLead,
        coaches,
        setCoaches,
        addCoach,
        updateCoach,
        deleteCoach,
        equipment,
        setEquipment,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        trainers,
        addTrainer,
        updateTrainer,
        deleteTrainer,
        pricingPlans,
        updatePlanPrice,
        gymHours,
        updateGymHours,
        galleryItems,
        setGalleryItems,
        addGalleryItem,
        deleteGalleryItem,
        transactions,
        setTransactions,
        refreshAllFromSupabase
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
