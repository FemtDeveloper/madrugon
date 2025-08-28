# Migration & Feature Plan — Marketplace adaptation

Last updated: 2025-08-27

Purpose: track the database changes and app updates needed to adapt this app to a MercadoLibre‑style marketplace where users can be buyers and/or sellers, own brands, and sell products under categories. Use the checkboxes below to track progress; add PR links or dates when items are complete.

## High-level plan

- Make minimal, backwards-safe DB changes first.
- Add RLS policies and test them on staging.
- Update backend services and validation to follow the new schema.
- Update frontend flows (registration/profile, seller onboarding, product creation, favorites).
- Test in staging and roll out to production.

---

## Phase 0 — Prep (must do before migrations)

- [ ] Create a staging Supabase project (or clone a branch) for testing migrations and RLS changes.
- [ ] Backup production database / export schema.
- [ ] Add a `SUPABASE_MCP_SERVICE_ROLE` or ensure service role key is available for running migrations and policy changes.
- [ ] Add a branch naming / migration policy to the repo (e.g., `feature/marketplace-migrations`).

---

## Phase A — Database migrations (safe, ordered)

These are the recommended DB changes. Run them in staging first.

- [ ] Add brand ownership

  - SQL: `ALTER TABLE public.brands ADD COLUMN owner_id uuid;`
  - Add FK: `ALTER TABLE public.brands ADD CONSTRAINT brands_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);`
  - Optional: `CREATE UNIQUE INDEX ON public.brands (owner_id);` if you want one brand per user.
  - Migration note: do not make `owner_id` NOT NULL immediately — populate existing rows first if needed.

- [ ] Add `is_seller` flag to users

  - SQL: `ALTER TABLE public.users ADD COLUMN is_seller boolean DEFAULT false NOT NULL;`
  - App: show option in profile/registration to set this flag.

- [ ] Enforce product -> category relationship

  - Safe approach:
    - Create or choose a fallback category (e.g., `Uncategorized`) and set existing NULLs: `UPDATE public.products SET category_id = '<uuid>' WHERE category_id IS NULL;`
    - Then: `ALTER TABLE public.products ALTER COLUMN category_id SET NOT NULL;`
  - App: require category selection on product create/update forms.

- [ ] Make `products.store_id` required (recommended)

  - If some products without `store_id` exist, migrate them to a default store or mark them and fix via UI.
  - Then: `ALTER TABLE public.products ALTER COLUMN store_id SET NOT NULL;`

- [ ] (Optional) Add `brands.slug` uniqueness or an index if needed — already present.

- [ ] Indexes & performance

  - Add index on `wishlists.user_id`, `wishlists.product_id`, and on `products.slug`, `products.store_id` for queries.

- [ ] Create a migration SQL file for each step and keep in `supabase/migrations/` or your migrations folder.

---

## Phase B — RLS and policy updates

After schema migrations, update RLS policies in staging. Keep rules minimal and test thoroughly.

- [ ] Products

  - Read: public read for products (or more restricted if you want private products) — create policy allowing SELECT to anon or authenticated users as needed.
  - Mutate (INSERT/UPDATE/DELETE): only allow when `auth.uid() = (SELECT owner_id FROM public.stores WHERE id = new.store_id)` or `products.store_id IN (stores owned by auth.uid())`.

- [ ] Stores

  - Only store owner can INSERT/UPDATE/DELETE their store record.

- [ ] Brands

  - Only brand owner can create/update/delete branding metadata.

- [ ] Wishlists (favorites)

  - Only owner can insert/delete their wishlist rows; SELECT only returns public product info and wishlist entries for the user.

- [ ] Orders / Shopping carts

  - Owners only for orders and carts; RLS should allow each user to CRUD their own cart/orders. Admin/service role should bypass.

- [ ] Notifications / Reviews

  - Policy to allow users to create reviews if they have an order_item for the product (enforce at function or trigger level), and only owners or admins can moderate reviews.

- [ ] Document each policy change in a `supabase/policies/` folder or in migration SQL files so they are reproducible.

---

## Phase C — Backend changes (API / services)

Update `src/services/*` and server-side validation to the new rules and schema.

- [ ] Require `category_id` and `store_id` on product create/update endpoints and forms.
- [ ] When creating a brand, set `brands.owner_id` to current user.
- [ ] Prevent non-sellers from creating products (check `users.is_seller` or whether the user owns a store).
- [ ] Update `services/user.ts` to allow setting `is_seller` and creating a store/brand for the user.
- [ ] Update `services/products.ts` to ensure product queries join brand/store correctly and expose brand owner if needed.
- [ ] Add server-side checks for favorites (wishlist) to ensure auth.uid() matches user_id.
- [ ] Add tests for API endpoints: product create (seller), product create (non-seller -> fail), add favorite (auth user), fetch user favorites.

---

## Phase D — Frontend changes (UI/UX)

Make UI changes to support seller flows and the stricter product model.

- [ ] Registration / Profile

  - Add role choice (Buyer / Seller / Both) in registration or profile settings. Update `is_seller` flag.
  - Add optional `date_of_birth` input (already `date_of_birth` exists) and show age where needed.

- [ ] Seller Onboarding

  - Add pages/components: Create Brand (name, slug, logo, description) -> calls backend to create `brand` with `owner_id`.
  - Create Store (store info) -> creates `store` with `owner_id`.

- [ ] Product create/edit form

  - Require selecting `category` (from `categories` table). Mark as required in validation schema.
  - Require selecting which `store` the product belongs to (list stores owned by user).
  - Optionally allow choosing `brand` (list brands owned by user or global brands).

- [ ] Favorites

  - Keep using `wishlists` but ensure frontend uses `user_id` = current user and toggles properly.

- [ ] Seller dashboard

  - Simple dashboard to list seller's stores, products, orders. Start minimal: products list, create product.

- [ ] Small UX changes
  - Show brand name on product cards and product pages.
  - Show seller/store name on product pages.

---

## Phase E — Tests, QA, and staging

- [ ] Unit tests for backend services and validation (happy path + 2 edge cases each).
- [ ] Integration tests for RLS policies (simulate different users, service role).
- [ ] Manual QA checklist: create brand, create store, create product (with category), favorite product, order flow (basic).
- [ ] Accessibility checks for new pages.

---

## Phase F — Deployment & rollout

- [ ] Merge migrations to main after staging verification.
- [ ] Run migration on production with a maintenance window if needed.
- [ ] Re-generate `SUPABASE_SCHEMA.md` and commit.
- [ ] Release frontend changes together or in a coordinated deploy (backend migrations first, frontend after API contract stable).
- [ ] Monitor logs and errors for 48 hours.

---

## Quality gates (how to mark an item done)

For each checked item provide:

- PR link
- Migration SQL file path and run status (staging/production)
- Test results (unit + integration)
- Manual QA signoff

---

## Edge cases & decisions to confirm

- Do we allow multiple brands per user or a single brand per user? (Plan assumes multiple unless you require uniqueness.)
- Should a brand always be owned by a user (owner_id NOT NULL)? The plan keeps it nullable at first.
- Do we require store per product or allow marketplace-level products? Plan recommends requiring `store_id`.
- How strict should product visibility be (public SELECT vs restricted)? Plan assumes public product reads.

---

## Assumptions

- You want a minimal marketplace MVP: buyer/seller roles, brands, categories required, favorites, simple orders.
- The current schema snapshot in `SUPABASE_SCHEMA.md` is accurate.
- We will use Supabase RLS + service role for admin operations.

---

## Next actions (pick one to start)

- [ ] I will generate the SQL migration files (safe ordering) and a short runbook to execute them in staging and production.
- [ ] I will implement backend validation changes (require category/store) and add tests in `src/services`.
- [ ] I will implement the frontend registration/profile + seller onboarding screens and update product forms.

Reply with the number of the next action you want me to start (1/2/3) or ask me to split tasks across sprints and I’ll create a more detailed timeline per sprint.
