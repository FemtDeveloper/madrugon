-- Migration: rls_policies_products_stores_brands
-- Adds RLS policies for products, stores, and brands

BEGIN;

-- Enable RLS where not already enabled
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.brands ENABLE ROW LEVEL SECURITY;

-- Products: allow select to everyone (anon) but mutations only to store owner
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy WHERE polname = 'products_select_public'
  ) THEN
    CREATE POLICY products_select_public ON public.products
      FOR SELECT
      USING (true);
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy WHERE polname = 'products_owner_manage'
  ) THEN
    CREATE POLICY products_owner_manage ON public.products
      FOR ALL
      USING (
        auth.role() = 'supabase_admin' OR
        EXISTS (
          SELECT 1 FROM public.stores s WHERE s.id = public.products.store_id AND s.owner_id = auth.uid()
        )
      )
      WITH CHECK (
        auth.role() = 'supabase_admin' OR
        EXISTS (
          SELECT 1 FROM public.stores s WHERE s.id = public.products.store_id AND s.owner_id = auth.uid()
        )
      );
  END IF;
END$$;

-- Stores: only owner can insert/update/delete their store
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy WHERE polname = 'stores_owner_manage'
  ) THEN
    CREATE POLICY stores_owner_manage ON public.stores
      FOR ALL
      USING (auth.role() = 'supabase_admin' OR owner_id = auth.uid())
      WITH CHECK (auth.role() = 'supabase_admin' OR owner_id = auth.uid());
  END IF;
END$$;

-- Brands: only owner can manage brand rows
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy WHERE polname = 'brands_owner_manage'
  ) THEN
    CREATE POLICY brands_owner_manage ON public.brands
      FOR ALL
      USING (auth.role() = 'supabase_admin' OR owner_id = auth.uid())
      WITH CHECK (auth.role() = 'supabase_admin' OR owner_id = auth.uid());
  END IF;
END$$;

COMMIT;
