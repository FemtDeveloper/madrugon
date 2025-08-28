-- Migration: rls_policies_wishlists
-- Enables RLS and creates owner-only policy for wishlists (favorites)

BEGIN;

ALTER TABLE IF EXISTS public.wishlists ENABLE ROW LEVEL SECURITY;

-- Owner manage policy: only the wishlist owner (user_id) or admin/service role can CRUD their rows
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy WHERE polname = 'wishlists_owner_manage'
  ) THEN
    CREATE POLICY wishlists_owner_manage ON public.wishlists
      FOR ALL
      USING (auth.role() = 'supabase_admin' OR user_id = auth.uid())
      WITH CHECK (auth.role() = 'supabase_admin' OR user_id = auth.uid());
  END IF;
END$$;

-- Index to speed owner lookups
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON public.wishlists(user_id);

COMMIT;
