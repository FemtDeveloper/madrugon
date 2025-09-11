# Supabase Schema

## Promo placements split (banners vs modals)

Run these migrations in your Supabase SQL editor (this block matches exactly what was applied):

```sql
-- Migration: create_promo_modals_add_banner_columns
-- 1) Utility: ensure updated_at trigger function exists
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end
$$;

-- 2) Alter promo_banners with new columns used by the app
alter table public.promo_banners
  add column if not exists title varchar,
  add column if not exists description text,
  add column if not exists cta_label varchar,
  add column if not exists position integer not null default 0,
  add column if not exists user_id uuid;

-- 2a) Add FK for user_id if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.promo_banners'::regclass
      AND conname = 'promo_banners_user_id_fkey'
  ) THEN
    ALTER TABLE public.promo_banners
      ADD CONSTRAINT promo_banners_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;
  END IF;
END$$;

-- 2b) Helpful index for active banners ordering
create index if not exists promo_banners_active_position_idx
  on public.promo_banners (is_active, position);

-- 2c) Ensure updated_at auto-updates
DROP TRIGGER IF EXISTS set_updated_at ON public.promo_banners;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.promo_banners
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3) Create promo_modals table
create table if not exists public.promo_modals (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  cta_url text,
  position integer not null default 0,
  is_active boolean not null default true,
  show_once_per_session boolean not null default true,
  user_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promo_modals_user_id_fkey foreign key (user_id) references public.users(id) on delete set null
);

-- 3a) Indexes
create index if not exists promo_modals_active_position_idx
  on public.promo_modals (is_active, position);

-- 3b) updated_at trigger
DROP TRIGGER IF EXISTS set_updated_at ON public.promo_modals;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.promo_modals
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3c) RLS and policies
alter table public.promo_modals enable row level security;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'promo_modals' AND policyname = 'Allow read active modals'
  ) THEN
    CREATE POLICY "Allow read active modals"
    ON public.promo_modals FOR SELECT
    USING (is_active = true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'promo_modals' AND policyname = 'Users manage own modals'
  ) THEN
    CREATE POLICY "Users manage own modals"
    ON public.promo_modals FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
  END IF;
END$$;
```

RLS guidance: Public can read only active rows; creators can manage their own via user_id. Add broader admin policies if you need global CRUD.

## Supabase Schema Snapshot (Phase 1)

Generated: 2025-09-11
Project URL: <https://wdciupspomamkepqdfxz.supabase.co>

Note: This document reflects the current public schema after Phase 1 migration (CMS + Ads + Moderation + Roles helpers).

## Enums

- product_gender: [Hombre, Mujer, Niños/as, Remates]

## Functions

- current_role_name() -> text
- is_super_admin() -> boolean
- has_permission(key text) -> boolean
- generate_order_number() -> text

## Tables (public)

- hero_slides (RLS: enabled)

  - id uuid PK
  - title varchar not null
  - subtitle varchar
  - image_url text not null
  - cta_label varchar
  - cta_url text
  - sort_order int default 0
  - is_active boolean default true
  - valid_from timestamptz
  - valid_until timestamptz
  - created_by uuid -> users.id
  - updated_by uuid -> users.id
  - created_at timestamptz default now()
  - updated_at timestamptz default now()
  - check: valid_until >= valid_from (if both present)

- homepage_banners (RLS: enabled)

  - id uuid PK
  - title varchar not null
  - image_url text not null
  - cta_label varchar
  - cta_url text
  - placement varchar not null
  - sort_order int default 0
  - is_active boolean default true
  - valid_from timestamptz
  - valid_until timestamptz
  - created_by uuid -> users.id
  - updated_by uuid -> users.id
  - created_at timestamptz default now()
  - updated_at timestamptz default now()
  - check: valid_until >= valid_from (if both present)

- promo_banners (RLS: enabled)

  - id uuid PK
  - title varchar
  - description text
  - image_url text not null
  - cta_label varchar
  - cta_url text
  - valid_from timestamptz
  - valid_until timestamptz
  - is_active boolean default true
  - is_modal boolean default false (legacy)
  - modal_priority int default 0 (legacy)
  - audience jsonb (legacy)
  - show_once_per_session boolean default true (legacy)
  - position integer default 0
  - user_id uuid -> users.id
  - created_by uuid -> users.id
  - updated_by uuid -> users.id
  - created_at timestamptz default now()
  - updated_at timestamptz default now()
  - check: valid_until >= valid_from (if both present)

  Indexes:

  - promo_banners_active_position_idx (is_active, position)

- promotion_events (RLS: enabled)

  - id uuid PK
  - promo_id uuid -> promo_banners.id
  - user_id uuid -> users.id
  - event varchar in ('view','click','dismiss')
  - created_at timestamptz default now()

- ad_slots (RLS: enabled)

  - id uuid PK
  - type varchar in ('hero','banner','modal') not null
  - placement varchar not null
  - title varchar
  - description text
  - image_requirements text
  - base_price numeric default 0 not null
  - currency varchar default 'USD' not null
  - sort_order int default 0
  - is_active boolean default true
  - valid_from timestamptz
  - valid_until timestamptz
  - created_by uuid -> users.id
  - created_at timestamptz default now()
  - updated_at timestamptz default now()

- ad_applications (RLS: enabled)

  - id uuid PK
  - slot_id uuid -> ad_slots.id
  - store_id uuid -> stores.id
  - message text
  - status varchar in ('pending','approved','rejected') default 'pending'
  - reviewed_by uuid -> users.id
  - reviewed_at timestamptz
  - created_at timestamptz default now()

- ad_reservations (RLS: enabled)

  - id uuid PK
  - slot_id uuid -> ad_slots.id
  - store_id uuid -> stores.id
  - start_date date not null
  - end_date date not null
  - price numeric not null
  - currency varchar default 'USD' not null
  - status varchar in ('pending','approved','paid','canceled') default 'pending'
  - payment_ref varchar
  - notes text
  - approved_by uuid -> users.id
  - created_at timestamptz default now()
  - updated_at timestamptz default now()

- ad_assets (RLS: enabled)

  - id uuid PK
  - reservation_id uuid -> ad_reservations.id
  - image_url text not null
  - cta_label varchar
  - cta_url text
  - alt_text varchar
  - is_approved boolean default false
  - approved_by uuid -> users.id
  - created_at timestamptz default now()

- moderation_logs (RLS: enabled)

  - id uuid PK
  - target_type varchar in ('user','product','store','asset','slot') not null
  - target_id uuid not null
  - action varchar not null
  - reason text
  - actor_id uuid -> users.id
  - metadata jsonb
  - created_at timestamptz default now()

- products (RLS: enabled)

  - id uuid PK
  - store_id uuid, nullable
  - category_id uuid
  - brand_id uuid, nullable
  - name varchar
  - slug varchar, unique
  - description text, nullable
  - short_description text, nullable
  - sku varchar, nullable
  - base_price numeric
  - compare_price numeric, nullable
  - cost_price numeric, nullable
  - weight numeric, nullable
  - dimensions jsonb, nullable
  - material varchar, nullable
  - care_instructions text, nullable
  - is_active bool, default: true
  - is_featured bool, default: false
  - status varchar, default: 'draft'
  - total_sales integer, default: 0
  - view_count integer, default: 0
  - rating numeric, default: 0.00
  - review_count integer, default: 0
  - created_at timestamptz, default: now()
  - updated_at timestamptz, default: now()
  - gender enum product_gender, nullable — Gender target for the product
  - sizes text[], default: {}
  - moderation_status varchar in ('draft','published','rejected','flagged') default 'draft'
  - moderation_reason text
  - moderated_by uuid -> users.id
  - moderated_at timestamptz
  - is_removed boolean default false

- users (RLS: enabled)

  - id uuid
  - role_id uuid, nullable
  - email varchar, unique
  - first_name varchar, nullable
  - last_name varchar, nullable
  - phone varchar, nullable
  - date_of_birth date, nullable
  - gender varchar, nullable
  - profile_image_url text, nullable
  - is_active bool, default: true
  - is_verified bool, default: false
  - verification_date timestamptz, nullable
  - last_login timestamptz, nullable
  - created_at timestamptz, default: now()
  - updated_at timestamptz, default: now()
  - is_seller bool, default: false
  - banned_at timestamptz
  - ban_reason text
  - suspended_until timestamptz
  - suspension_reason text
  - verified_by uuid -> users.id
  - verified_at timestamptz
  - moderation_notes text

- promo_modals (RLS: enabled)

  - id uuid PK
  - image_url text not null
  - cta_url text
  - position integer default 0
  - is_active boolean default true
  - show_once_per_session boolean default true
  - user_id uuid -> users.id
  - created_at timestamptz default now()
  - updated_at timestamptz default now()

  Indexes:

  - promo_modals_active_position_idx (is_active, position)

## RLS Policies (high level)

- Public read on: hero_slides, homepage_banners, promo_banners, ad_slots
- Authenticated can insert promotion_events
- Admins/moderators (is_super_admin or has_permission) can write on CMS tables and read promotion_events
- Ads:
  - Admins with ads*admin can manage all ad*\* tables
  - Sellers can select/insert/update their own ad_applications/reservations/assets via store ownership
- Moderation logs: insert by any authenticated; select by admins/moderators

## Role Helpers

- Triggers:
  - trg_set_default_role: sets buyer role on user insert if missing
  - trg_enforce_role_transition:
    - Allows initial assignment from NULL → 'buyer' (bootstrap)
    - Allows self-transition 'buyer' → 'seller'
    - Only super_admin can assign admin/moderator or any other transitions
- Functions: current_role_name, is_super_admin, has_permission
