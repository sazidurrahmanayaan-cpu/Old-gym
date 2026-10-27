-- =============================================================================
-- OLD GYM HEALTH & FITNESS CENTER - COMPLETE PRODUCTION SUPABASE SQL MIGRATION
-- Project ID: xxjtlymnnlazljjelpdp
-- Project URL: https://xxjtlymnnlazljjelpdp.supabase.co
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

-- -----------------------------------------------------------------------------
-- Policies for MEMBERS
-- -----------------------------------------------------------------------------
CREATE POLICY "Allow public read on members"
    ON public.members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on members"
    ON public.members FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on members"
    ON public.members FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on members"
    ON public.members FOR DELETE TO anon, authenticated USING (true);

-- -----------------------------------------------------------------------------
-- Policies for LEADS
-- -----------------------------------------------------------------------------
CREATE POLICY "Allow public read on leads"
    ON public.leads FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on leads"
    ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on leads"
    ON public.leads FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on leads"
    ON public.leads FOR DELETE TO anon, authenticated USING (true);

-- -----------------------------------------------------------------------------
-- Policies for TRANSACTIONS
-- -----------------------------------------------------------------------------
CREATE POLICY "Allow public read on transactions"
    ON public.transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on transactions"
    ON public.transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on transactions"
    ON public.transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on transactions"
    ON public.transactions FOR DELETE TO anon, authenticated USING (true);

-- -----------------------------------------------------------------------------
-- Policies for COACHES
-- -----------------------------------------------------------------------------
CREATE POLICY "Allow public read on coaches"
    ON public.coaches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on coaches"
    ON public.coaches FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on coaches"
    ON public.coaches FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on coaches"
    ON public.coaches FOR DELETE TO anon, authenticated USING (true);

-- -----------------------------------------------------------------------------
-- Policies for EQUIPMENT
-- -----------------------------------------------------------------------------
CREATE POLICY "Allow public read on equipment"
    ON public.equipment FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on equipment"
    ON public.equipment FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on equipment"
    ON public.equipment FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on equipment"
    ON public.equipment FOR DELETE TO anon, authenticated USING (true);

-- =============================================================================
-- 3. INITIAL SEED / DEMO DATA (Munshiganj Facility)
-- =============================================================================

-- Seed Members
INSERT INTO public.members (name, phone, package_type, status, join_date, expiry_date, fee_amount)
VALUES
    ('Nazmul Hassan', '01712-334455', 'Yearly VIP', 'Active', '2026-01-10', '2027-01-10', 8000),
    ('Erron Black', '01819-445566', '3 Months', 'Active', '2026-08-15', '2026-11-15', 2500),
    ('Antarik Islam', '01911-223344', 'Monthly', 'Active', '2026-09-01', '2026-10-01', 1000)
ON CONFLICT (phone) DO NOTHING;

-- Seed Leads
INSERT INTO public.leads (full_name, phone, source, goal, package_interest, status)
VALUES
    ('Rafiqul Islam', '01711-889900', 'Free Trial Pass', 'Muscle Building', '1-Day Free VIP Pass', 'New'),
    ('Shahadat Hossain', '01833-221144', 'Diet Blueprint', 'Fat Loss', '3 Months Package', 'Contacted'),
    ('Tanvir Ahmed', '01922-445566', 'Contact Form', 'Strength & Powerlifting', 'Monthly Membership', 'New')
ON CONFLICT DO NOTHING;

-- Seed Transactions
INSERT INTO public.transactions (member_name, phone, type, category, amount, date)
VALUES
    ('Nazmul Hassan', '01712-334455', 'Income', 'Yearly VIP', 8000, '2026-01-10'),
    ('Erron Black', '01819-445566', 'Income', '3 Months Package', 2500, '2026-08-15'),
    ('Antarik Islam', '01911-223344', 'Income', 'Monthly Membership', 1000, '2026-09-01'),
    ('Facility Maintenance', '01919-048227', 'Expense', 'Equipment Servicing', 1500, '2026-09-15')
ON CONFLICT DO NOTHING;

-- Seed Coaches
INSERT INTO public.coaches (name, role, phone, specialty, status)
VALUES
    ('Coach Farhan Ahmed', 'Senior Head Coach', '01919-048227', 'Competitive Bodybuilding, Heavy Hypertrophy, Diet Planning', 'Active'),
    ('Coach Tariqul Islam', 'Certified Strength Trainer', '01822-112233', 'Powerlifting, Functional Mobility, Fat Loss Conditioning', 'Active'),
    ('Coach Mahfuzur Rahman', 'Physique Specialist', '01711-998877', 'Contest Prep, Biomechanics, Calisthenics', 'Active')
ON CONFLICT DO NOTHING;

-- Seed Equipment
INSERT INTO public.equipment (name, category, quantity, condition, last_serviced)
VALUES
    ('Commercial Olympic Power Cage & Squat Rack', 'Heavy Racks & Free Weights', 2, 'Excellent', '2026-09-10'),
    ('Dual Cable Functional Crossover Station (100kg Stacks)', 'Cables & Pulley', 1, 'Excellent', '2026-09-12'),
    ('Calibrated Rubber Hex Dumbbell Set (2.5kg - 45kg)', 'Free Weights', 30, 'Excellent', '2026-09-20'),
    ('Olympic 45-Degree Plate-Loaded Leg Press', 'Lower Body Machines', 1, 'Good', '2026-08-25'),
    ('Heavy Duty Flat & Incline Olympic Benches', 'Benches', 4, 'Excellent', '2026-09-05'),
    ('Commercial Curved Treadmill & Air Bike', 'Cardio Conditioning', 2, 'Good', '2026-09-18')
ON CONFLICT DO NOTHING;
