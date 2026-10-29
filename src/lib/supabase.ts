import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Member, Lead, GymTransaction } from '../context/GymContext';

export const SUPABASE_PROJECT_ID = 'xxjtlymnnlazljjelpdp';
export const SUPABASE_REGION = 'ap-southeast-1';
export const DEFAULT_SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const DEFAULT_SUPABASE_KEY = 'sb_publishable_ZOEZHG2gDNWCOD08rg5BDQ_mGYSbs5C';

export interface CoachRecord {
  id: string;
  name: string;
  role: string;
  phone: string;
  specialty: string;
  status: 'Active' | 'Inactive';
  created_at?: string;
}

export interface EquipmentRecord {
  id: string;
  name: string;
  category: string;
  quantity: number;
  condition: 'Excellent' | 'Good' | 'Needs Service' | 'Maintenance Required';
  last_serviced: string;
  image?: string;
  created_at?: string;
}

// Retrieve saved configuration from localStorage or Vite environment variables
export const getSupabaseConfig = () => {
  let savedKey = typeof window !== 'undefined' ? localStorage.getItem('oldgym_supabase_anon_key') : null;
  let savedUrl = typeof window !== 'undefined' ? localStorage.getItem('oldgym_supabase_url') : null;

  // Clear previous project caches if outdated
  if (savedKey && (savedKey.includes('ajjpsgpahdoiojkxuzqz') || savedKey.includes('fvjgpkxf6mYR5M8RV1cnxg_dwmcjaFF'))) {
    localStorage.removeItem('oldgym_supabase_anon_key');
    savedKey = null;
  }
  if (savedUrl && savedUrl.includes('ajjpsgpahdoiojkxuzqz')) {
    localStorage.removeItem('oldgym_supabase_url');
    savedUrl = null;
  }

  const envKey = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env?.VITE_SUPABASE_ANON_KEY ||
    import.meta.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const anonKey = (savedKey || envKey || DEFAULT_SUPABASE_KEY).trim();

  const envUrl = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
    import.meta.env?.VITE_SUPABASE_URL ||
    import.meta.env?.NEXT_PUBLIC_SUPABASE_URL;
  const url = (savedUrl || envUrl || DEFAULT_SUPABASE_URL).trim();

  return {
    projectId: SUPABASE_PROJECT_ID,
    region: SUPABASE_REGION,
    url,
    anonKey,
    isConfigured: Boolean(anonKey),
  };
};

export const saveSupabaseConfig = (anonKey: string, customUrl?: string) => {
  if (typeof window !== 'undefined') {
    if (anonKey) {
      localStorage.setItem('oldgym_supabase_anon_key', anonKey.trim());
    } else {
      localStorage.removeItem('oldgym_supabase_anon_key');
    }

    if (customUrl) {
      localStorage.setItem('oldgym_supabase_url', customUrl.trim());
    } else {
      localStorage.removeItem('oldgym_supabase_url');
    }
  }
};

let cachedClient: SupabaseClient | null = null;
let cachedKey = '';
let cachedUrl = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    return null;
  }

  if (cachedClient && cachedKey === anonKey && cachedUrl === url) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    cachedKey = anonKey;
    cachedUrl = url;
    return cachedClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
};

// Check connection status
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> => {
  const client = getSupabaseClient();
  const config = getSupabaseConfig();

  if (!config.isConfigured || !client) {
    return {
      success: false,
      message: 'Supabase anon public key is not set. Please provide your anon key in the setup tab.',
    };
  }

  try {
    // Attempt a light query on the leads table
    const { data, error } = await client.from('leads').select('count', { count: 'exact', head: true });

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return {
          success: true,
          message: 'Connected to Supabase project successfully! Note: Tables need to be initialized via the SQL script.',
          details: { tableNeedsCreation: true, error: error.message },
        };
      }
      return {
        success: false,
        message: `Supabase returned error: ${error.message} (Code: ${error.code})`,
        details: error,
      };
    }

    return {
      success: true,
      message: 'Connection successful! Project is connected and ready.',
      details: { count: data },
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to reach Supabase API.',
      details: err,
    };
  }
};

// ============================================================================
// 1. MEMBERS SYNC OPERATIONS
// ============================================================================
export const fetchMembersFromSupabase = async (): Promise<Member[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      fullName: row.name || row.full_name || '',
      phone: row.phone,
      plan: (row.package_type || row.plan || 'Monthly') as Member['plan'],
      amount: Number(row.fee_amount ?? row.amount ?? 0),
      joinDate: row.join_date,
      expiryDate: row.expiry_date,
      status: (row.status || 'Active') as 'Active' | 'Expired' | 'Pending',
      notes: row.notes || '',
    }));
  } catch (err) {
    console.warn('Supabase fetchMembers error:', err);
    return null;
  }
};

export const syncMembersToSupabase = async (members: Member[]): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rows = members.map((m) => ({
      name: m.fullName,
      phone: m.phone,
      package_type: m.plan,
      status: m.status,
      join_date: m.joinDate,
      expiry_date: m.expiryDate,
      fee_amount: m.amount,
    }));

    const { error } = await client.from('members').upsert(rows, { onConflict: 'phone' });
    if (error) {
      console.warn('Supabase upsert members error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase syncMembers error:', err);
    return false;
  }
};

export const deleteMemberFromSupabase = async (phoneOrId: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(phoneOrId);
    const { error } = isUuid
      ? await client.from('members').delete().eq('id', phoneOrId)
      : await client.from('members').delete().eq('phone', phoneOrId);

    return !error;
  } catch (err) {
    console.warn('Supabase deleteMember error:', err);
    return false;
  }
};

// ============================================================================
// 2. LEADS SYNC OPERATIONS
// ============================================================================
export const fetchLeadsFromSupabase = async (): Promise<Lead[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      phone: row.phone,
      source: row.source,
      interestedProgram: row.goal || row.package_interest || row.interested_program || 'General Fitness',
      date: row.created_at
        ? new Date(row.created_at).toISOString().replace('T', ' ').substring(0, 16)
        : new Date().toISOString().split('T')[0],
      status: (row.status || 'New') as 'New' | 'Contacted' | 'Converted' | 'Archived',
      notes: row.notes || '',
    }));
  } catch (err) {
    console.warn('Supabase fetchLeads error:', err);
    return null;
  }
};

export const insertLeadToSupabase = async (lead: Lead): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('leads').insert([
      {
        full_name: lead.fullName,
        phone: lead.phone,
        source: lead.source,
        goal: lead.interestedProgram || 'General Fitness',
        package_interest: lead.interestedProgram || '1-Day Free VIP Pass',
        status: lead.status || 'New',
      },
    ]);

    if (error) {
      console.warn('Supabase insertLead error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase insertLead error:', err);
    return false;
  }
};

export const syncLeadsToSupabase = async (leads: Lead[]): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rows = leads.map((l) => ({
      full_name: l.fullName,
      phone: l.phone,
      source: l.source,
      goal: l.interestedProgram || 'General Fitness',
      package_interest: l.interestedProgram || '1-Day Free VIP Pass',
      status: l.status,
    }));

    const { error } = await client.from('leads').insert(rows);
    return !error;
  } catch (err) {
    console.warn('Supabase syncLeads error:', err);
    return false;
  }
};

export const updateLeadStatusInSupabase = async (id: string, status: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('leads').update({ status }).eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Supabase updateLeadStatus error:', err);
    return false;
  }
};

export const deleteLeadFromSupabase = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('leads').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Supabase deleteLead error:', err);
    return false;
  }
};

// ============================================================================
// 3. TRANSACTIONS SYNC OPERATIONS
// ============================================================================
export const fetchTransactionsFromSupabase = async (): Promise<GymTransaction[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      memberId: row.id,
      memberName: row.member_name,
      plan: row.category || 'Membership Fee',
      amount: Number(row.amount || 0),
      date: row.date,
      method: 'Cash',
      status: 'Paid',
    }));
  } catch (err) {
    console.warn('Supabase fetchTransactions error:', err);
    return null;
  }
};

export const insertTransactionToSupabase = async (txn: GymTransaction): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('transactions').insert([
      {
        member_name: txn.memberName,
        phone: '',
        type: 'Income',
        category: txn.plan || 'Membership Fee',
        amount: txn.amount,
        date: txn.date,
      },
    ]);
    return !error;
  } catch (err) {
    console.warn('Supabase insertTransaction error:', err);
    return false;
  }
};

export const syncTransactionsToSupabase = async (transactions: GymTransaction[]): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rows = transactions.map((t) => ({
      member_name: t.memberName,
      phone: '',
      type: 'Income',
      category: t.plan || 'Membership Fee',
      amount: t.amount,
      date: t.date,
    }));

    const { error } = await client.from('transactions').insert(rows);
    return !error;
  } catch (err) {
    console.warn('Supabase syncTransactions error:', err);
    return false;
  }
};

// ============================================================================
// 4. COACHES SYNC OPERATIONS
// ============================================================================
export const fetchCoachesFromSupabase = async (): Promise<CoachRecord[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('coaches')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      phone: row.phone || '',
      specialty: row.specialty || '',
      status: (row.status || 'Active') as 'Active' | 'Inactive',
      created_at: row.created_at,
    }));
  } catch (err) {
    console.warn('Supabase fetchCoaches error:', err);
    return null;
  }
};

export const insertCoachToSupabase = async (coach: Omit<CoachRecord, 'id'>): Promise<CoachRecord | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('coaches')
      .insert([
        {
          name: coach.name,
          role: coach.role,
          phone: coach.phone,
          specialty: coach.specialty,
          status: coach.status || 'Active',
        },
      ])
      .select()
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      role: data.role,
      phone: data.phone || '',
      specialty: data.specialty || '',
      status: data.status,
      created_at: data.created_at,
    };
  } catch (err) {
    console.warn('Supabase insertCoach error:', err);
    return null;
  }
};

export const updateCoachInSupabase = async (id: string, updates: Partial<CoachRecord>): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('coaches').update(updates).eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Supabase updateCoach error:', err);
    return false;
  }
};

export const deleteCoachFromSupabase = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('coaches').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Supabase deleteCoach error:', err);
    return false;
  }
};

// ============================================================================
// 5. EQUIPMENT SYNC OPERATIONS
// ============================================================================
export const fetchEquipmentFromSupabase = async (): Promise<EquipmentRecord[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('equipment')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      quantity: Number(row.quantity || 1),
      condition: row.condition as EquipmentRecord['condition'],
      last_serviced: row.last_serviced || new Date().toISOString().split('T')[0],
      created_at: row.created_at,
    }));
  } catch (err) {
    console.warn('Supabase fetchEquipment error:', err);
    return null;
  }
};

export const insertEquipmentToSupabase = async (item: Omit<EquipmentRecord, 'id'>): Promise<EquipmentRecord | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('equipment')
      .insert([
        {
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          condition: item.condition,
          last_serviced: item.last_serviced,
        },
      ])
      .select()
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      condition: data.condition,
      last_serviced: data.last_serviced,
      created_at: data.created_at,
    };
  } catch (err) {
    console.warn('Supabase insertEquipment error:', err);
    return null;
  }
};

export const updateEquipmentInSupabase = async (id: string, updates: Partial<EquipmentRecord>): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('equipment').update(updates).eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Supabase updateEquipment error:', err);
    return false;
  }
};

export const deleteEquipmentFromSupabase = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('equipment').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Supabase deleteEquipment error:', err);
    return false;
  }
};

export const syncCoachesToSupabase = async (coaches: CoachRecord[]): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rows = coaches.map((c) => ({
      name: c.name,
      role: c.role,
      phone: c.phone || '',
      specialty: c.specialty || '',
      status: c.status || 'Active',
    }));

    const { error } = await client.from('coaches').insert(rows);
    return !error;
  } catch (err) {
    console.warn('Supabase syncCoaches error:', err);
    return false;
  }
};

export const syncEquipmentToSupabase = async (items: EquipmentRecord[]): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rows = items.map((i) => ({
      name: i.name,
      category: i.category,
      quantity: i.quantity,
      condition: i.condition,
      last_serviced: i.last_serviced,
    }));

    const { error } = await client.from('equipment').insert(rows);
    return !error;
  } catch (err) {
    console.warn('Supabase syncEquipment error:', err);
    return false;
  }
};

// ============================================================================
// SQL SCHEMA GENERATOR FOR USER COPY-PASTE INTO SUPABASE SQL EDITOR
// ============================================================================
export const getSupabaseSqlMigration = (): string => {
  return `-- =============================================================================
-- OLD GYM HEALTH & FITNESS CENTER - COMPLETE PRODUCTION SUPABASE SQL MIGRATION
-- Project ID: ${SUPABASE_PROJECT_ID}
-- Project URL: ${DEFAULT_SUPABASE_URL}
-- Generated: 2026-10-26
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. DATABASE TABLES
-- =============================================================================

-- 1.1 MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    package_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL,
    fee_amount NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.2 LEADS TABLE (Free Trial Passes, Contact Inquiries, Diet Blueprints)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    source TEXT NOT NULL,
    goal TEXT,
    package_interest TEXT,
    status TEXT NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.3 TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_name TEXT NOT NULL,
    phone TEXT,
    type TEXT NOT NULL DEFAULT 'Income' CHECK (type IN ('Income', 'Expense')),
    category TEXT NOT NULL DEFAULT 'Membership Fee',
    amount NUMERIC NOT NULL DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.4 COACHES TABLE
CREATE TABLE IF NOT EXISTS public.coaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT,
    specialty TEXT,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.5 EQUIPMENT TABLE
CREATE TABLE IF NOT EXISTS public.equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    condition TEXT NOT NULL DEFAULT 'Excellent',
    last_serviced DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 2. ROW LEVEL SECURITY (RLS) & CLEANUP
-- =============================================================================
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

-- Clean existing policies before creating
DROP POLICY IF EXISTS "Allow public read on members" ON public.members;
DROP POLICY IF EXISTS "Allow public insert on members" ON public.members;
DROP POLICY IF EXISTS "Allow public update on members" ON public.members;
DROP POLICY IF EXISTS "Allow public delete on members" ON public.members;

DROP POLICY IF EXISTS "Allow public read on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public update on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public delete on leads" ON public.leads;

DROP POLICY IF EXISTS "Allow public read on transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow public insert on transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow public update on transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow public delete on transactions" ON public.transactions;

DROP POLICY IF EXISTS "Allow public read on coaches" ON public.coaches;
DROP POLICY IF EXISTS "Allow public insert on coaches" ON public.coaches;
DROP POLICY IF EXISTS "Allow public update on coaches" ON public.coaches;
DROP POLICY IF EXISTS "Allow public delete on coaches" ON public.coaches;

DROP POLICY IF EXISTS "Allow public read on equipment" ON public.equipment;
DROP POLICY IF EXISTS "Allow public insert on equipment" ON public.equipment;
DROP POLICY IF EXISTS "Allow public update on equipment" ON public.equipment;
DROP POLICY IF EXISTS "Allow public delete on equipment" ON public.equipment;

-- Policies for MEMBERS
CREATE POLICY "Allow public read on members"
    ON public.members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on members"
    ON public.members FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on members"
    ON public.members FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on members"
    ON public.members FOR DELETE TO anon, authenticated USING (true);

-- Policies for LEADS
CREATE POLICY "Allow public read on leads"
    ON public.leads FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on leads"
    ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on leads"
    ON public.leads FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on leads"
    ON public.leads FOR DELETE TO anon, authenticated USING (true);

-- Policies for TRANSACTIONS
CREATE POLICY "Allow public read on transactions"
    ON public.transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on transactions"
    ON public.transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on transactions"
    ON public.transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on transactions"
    ON public.transactions FOR DELETE TO anon, authenticated USING (true);

-- Policies for COACHES
CREATE POLICY "Allow public read on coaches"
    ON public.coaches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on coaches"
    ON public.coaches FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on coaches"
    ON public.coaches FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on coaches"
    ON public.coaches FOR DELETE TO anon, authenticated USING (true);

-- Policies for EQUIPMENT
CREATE POLICY "Allow public read on equipment"
    ON public.equipment FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on equipment"
    ON public.equipment FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on equipment"
    ON public.equipment FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on equipment"
    ON public.equipment FOR DELETE TO anon, authenticated USING (true);

-- =============================================================================
-- 3. INITIAL SEED / DEMO DATA
-- =============================================================================
INSERT INTO public.members (name, phone, package_type, status, join_date, expiry_date, fee_amount)
VALUES
    ('Nazmul Hassan', '01712-334455', 'Yearly VIP', 'Active', '2026-01-10', '2027-01-10', 8000),
    ('Erron Black', '01819-445566', '3 Months', 'Active', '2026-08-15', '2026-11-15', 2500),
    ('Antarik Islam', '01911-223344', 'Monthly', 'Active', '2026-09-01', '2026-10-01', 1000)
ON CONFLICT (phone) DO NOTHING;

INSERT INTO public.leads (full_name, phone, source, goal, package_interest, status)
VALUES
    ('Rafiqul Islam', '01711-889900', 'Free Trial Pass', 'Muscle Building', '1-Day Free VIP Pass', 'New'),
    ('Shahadat Hossain', '01833-221144', 'Diet Blueprint', 'Fat Loss', '3 Months Package', 'Contacted'),
    ('Tanvir Ahmed', '01922-445566', 'Contact Form', 'Strength & Powerlifting', 'Monthly Membership', 'New')
ON CONFLICT DO NOTHING;

INSERT INTO public.transactions (member_name, phone, type, category, amount, date)
VALUES
    ('Nazmul Hassan', '01712-334455', 'Income', 'Yearly VIP', 8000, '2026-01-10'),
    ('Erron Black', '01819-445566', 'Income', '3 Months Package', 2500, '2026-08-15'),
    ('Antarik Islam', '01911-223344', 'Income', 'Monthly Membership', 1000, '2026-09-01'),
    ('Facility Maintenance', '01919-048227', 'Expense', 'Equipment Servicing', 1500, '2026-09-15')
ON CONFLICT DO NOTHING;

INSERT INTO public.coaches (name, role, phone, specialty, status)
VALUES
    ('Coach Farhan Ahmed', 'Senior Head Coach', '01919-048227', 'Competitive Bodybuilding, Heavy Hypertrophy, Diet Planning', 'Active'),
    ('Coach Tariqul Islam', 'Certified Strength Trainer', '01822-112233', 'Powerlifting, Functional Mobility, Fat Loss Conditioning', 'Active'),
    ('Coach Mahfuzur Rahman', 'Physique Specialist', '01711-998877', 'Contest Prep, Biomechanics, Calisthenics', 'Active')
ON CONFLICT DO NOTHING;

INSERT INTO public.equipment (name, category, quantity, condition, last_serviced)
VALUES
    ('Commercial Olympic Power Cage & Squat Rack', 'Heavy Racks & Free Weights', 2, 'Excellent', '2026-09-10'),
    ('Dual Cable Functional Crossover Station (100kg Stacks)', 'Cables & Pulley', 1, 'Excellent', '2026-09-12'),
    ('Calibrated Rubber Hex Dumbbell Set (2.5kg - 45kg)', 'Free Weights', 30, 'Excellent', '2026-09-20'),
    ('Olympic 45-Degree Plate-Loaded Leg Press', 'Lower Body Machines', 1, 'Good', '2026-08-25'),
    ('Heavy Duty Flat & Incline Olympic Benches', 'Benches', 4, 'Excellent', '2026-09-05'),
    ('Commercial Curved Treadmill & Air Bike', 'Cardio Conditioning', 2, 'Good', '2026-09-18')
ON CONFLICT DO NOTHING;
`;
};
