-- Migration: rls_policies_user_favorites
-- Adds RLS policy for user_favorites (wishlists)

BEGIN;

ALTER TABLE IF EXISTS public.user_favorites ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy WHERE polname = 'user_favorites_owner_manage'
  ) THEN
    CREATE POLICY user_favorites_owner_manage ON public.user_favorites
      FOR ALL
      USING (auth.role() = 'supabase_admin' OR user_id = auth.uid())
      WITH CHECK (auth.role() = 'supabase_admin' OR user_id = auth.uid());
  END IF;
END$$;

COMMIT;
