-- Migration: add_brand_owner_and_user_is_seller
-- Adds owner_id to brands and is_seller flag to users

BEGIN;

-- Add owner_id column to brands (nullable for safety)
ALTER TABLE IF EXISTS public.brands
  ADD COLUMN IF NOT EXISTS owner_id uuid;

-- Add is_seller to users (default false, not null)
ALTER TABLE IF EXISTS public.users
  ADD COLUMN IF NOT EXISTS is_seller boolean DEFAULT false NOT NULL;

-- Add foreign key constraint for brands.owner_id -> users.id (ON DELETE SET NULL to be safe)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints tc WHERE tc.constraint_name = 'brands_owner_id_fkey') THEN
    ALTER TABLE public.brands
      ADD CONSTRAINT brands_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE SET NULL;
  END IF;
END$$;

-- Optional index on brands.owner_id to speed lookups
CREATE INDEX IF NOT EXISTS idx_brands_owner_id ON public.brands(owner_id);

COMMIT;
