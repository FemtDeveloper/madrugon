
BEGIN;

ALTER TABLE IF EXISTS public.wishlists ENABLE ROW LEVEL SECURITY;

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

COMMIT;
