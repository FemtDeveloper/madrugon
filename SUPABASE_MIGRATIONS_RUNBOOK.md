# Supabase Phase A Migrations — Runbook

This runbook documents the two Phase A migrations applied on 2025-08-27 and how to re-run them manually if needed.

Files created

- `supabase/migrations/20250827_01_add_brand_owner_and_user_is_seller.sql` — adds `brands.owner_id` and `users.is_seller`.
- `supabase/migrations/20250827_02_make_products_category_not_null.sql` — creates fallback category and makes `products.category_id` NOT NULL.

Preconditions (skipped Phase 0 due to free plan):

- Work in staging if available.
- Backup production DB before applying to production.

Apply using Supabase MCP server (what I used):

- I applied these migrations through the Supabase MCP server from the repo. If you prefer the Supabase CLI, you can also run the SQL files against the DB.

Notes & safety

- `brands.owner_id` is nullable and the FK uses `ON DELETE SET NULL` to avoid cascading deletes.
- `users.is_seller` defaults to `false` and is NOT NULL; adjust UI to let users enable seller mode.
- Products with NULL `category_id` are assigned to `Uncategorized` before enforcing NOT NULL.

Regenerating TypeScript types

- Supabase provides a generator to produce TypeScript types for your DB schema.
- I can trigger that via the MCP server or you can run locally with the Supabase CLI. Example (local):

```bash
supabase gen types typescript --schema public > src/lib/supabase-types.ts
```

I just requested Supabase to regenerate the types via the MCP API.

Rollback notes

- To rollback migration 02 safely, re-allow NULL on `products.category_id` and revert the fallback assignment if necessary.
- To rollback migration 01, drop the FK and columns (careful: data loss), e.g. `ALTER TABLE public.brands DROP CONSTRAINT IF EXISTS brands_owner_id_fkey; ALTER TABLE public.brands DROP COLUMN IF EXISTS owner_id; ALTER TABLE public.users DROP COLUMN IF EXISTS is_seller;` — only after careful review.

Next steps

- Apply migrations on staging and run the test checklist in `MIGRATION_AND_FEATURE_PLAN.md` Phase E.
- Update backend validation and frontend forms to require `category_id` and to expose `is_seller`/brand ownership flows.
