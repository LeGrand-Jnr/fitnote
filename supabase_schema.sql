-- ==============================================================================
-- FitNote — Supabase PostgreSQL Schema & Security Policies (RLS)
-- Version 1 (MVP) Digital Measurement Book for Ghanaian Fashion Designers
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Fashion Designer Profile)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  business_name TEXT DEFAULT 'My Fashion Brand',
  clothing_category TEXT DEFAULT 'Women''s Wear',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT DEFAULT 'Female',
  notebook_ref TEXT, -- Reference to physical notebook (e.g. "2024 Black Book • Pg 14")
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  last_measured_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Measurements Table
-- Note: Measurements are immutable historical records. Never overwritten!
CREATE TABLE IF NOT EXISTS public.measurements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL, -- e.g. 'kaba-slit', 'womens-dress', 'mens-shirt', 'trousers', 'custom'
  measurement_type TEXT NOT NULL, -- e.g. "Kaba & Slit", "Men's Kaftan"
  unit TEXT NOT NULL DEFAULT 'inches' CHECK (unit IN ('inches', 'cm')),
  measurements JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g. {"bust": 38.5, "waist": 32, "hip": 42.5}
  notes TEXT,
  measured_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_customers_user_status ON public.customers(user_id, status, last_measured_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);
CREATE INDEX IF NOT EXISTS idx_measurements_customer ON public.measurements(customer_id, measured_at DESC);
CREATE INDEX IF NOT EXISTS idx_measurements_user ON public.measurements(user_id);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.measurements ENABLE ROW LEVEL SECURITY;

-- 7. Row Level Security Policies (Strict User Isolation)
-- Profiles
CREATE POLICY "Users can view and edit their own profile"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Customers
CREATE POLICY "Designers can only view their own customers"
  ON public.customers
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Designers can insert their own customers"
  ON public.customers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Designers can update their own customers"
  ON public.customers
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Designers can delete/archive their own customers"
  ON public.customers
  FOR DELETE
  USING (auth.uid() = user_id);

-- Measurements
CREATE POLICY "Designers can only view their own measurements"
  ON public.measurements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Designers can insert their own measurements"
  ON public.measurements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Designers can update their own measurements"
  ON public.measurements
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Designers can delete their own measurements"
  ON public.measurements
  FOR DELETE
  USING (auth.uid() = user_id);
