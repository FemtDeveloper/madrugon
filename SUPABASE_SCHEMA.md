
# Supabase Database Schema (public)

Last generated: 2025-08-27

Supabase project URL: [https://wdciupspomamkepqdfxz.supabase.co](https://wdciupspomamkepqdfxz.supabase.co)

Notes

- This file is a generated snapshot of the `public` schema. Update it whenever the database changes.
- RLS = Row-Level Security (important when querying as auth vs service role).

## Tables

---

### brands (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `name` — varchar, unique
  - `slug` — varchar, unique
  - `description` — text, nullable
  - `logo_url` — text, nullable
  - `website_url` — text, nullable
  - `is_active` — bool, default: true
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - referenced by `products.brand_id`

---

### cart_items (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `cart_id` — uuid, nullable
  - `product_id` — uuid, nullable
  - `variant_id` — uuid, nullable
  - `quantity` — integer, default: 1
  - `price` — numeric
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `cart_id` -> `shopping_carts.id`
  - `product_id` -> `products.id`
  - `variant_id` -> `product_variants.id`

---

### categories (rows: 18)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `parent_id` — uuid, nullable (self reference)
  - `name` — varchar
  - `slug` — varchar, unique
  - `description` — text, nullable
  - `image_url` — text, nullable
  - `is_active` — bool, default: true
  - `sort_order` — integer, default: 0
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `parent_id` -> `categories.id`
  - referenced by `products.category_id`

---

### coupons (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `code` — varchar, unique
  - `name` — varchar
  - `description` — text, nullable
  - `type` — varchar
  - `value` — numeric
  - `minimum_amount` — numeric, nullable
  - `maximum_discount` — numeric, nullable
  - `usage_limit` — integer, nullable
  - `used_count` — integer, default: 0
  - `per_user_limit` — integer, default: 1
  - `is_active` — bool, default: true
  - `valid_from` — timestamptz, nullable
  - `valid_until` — timestamptz, nullable
  - `created_by` — uuid, nullable
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `created_by` -> `users.id`

---

### notifications (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `user_id` — uuid, nullable
  - `type` — varchar
  - `title` — varchar
  - `message` — text
  - `data` — jsonb, nullable
  - `is_read` — bool, default: false
  - `created_at` — timestamptz, default: now()
- Foreign keys:
  - `user_id` -> `users.id`

---

### order_items (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `order_id` — uuid, nullable
  - `product_id` — uuid, nullable
  - `variant_id` — uuid, nullable
  - `store_id` — uuid, nullable
  - `quantity` — integer
  - `unit_price` — numeric
  - `total_price` — numeric
  - `product_snapshot` — jsonb, nullable
  - `created_at` — timestamptz, default: now()
- Foreign keys:
  - `order_id` -> `orders.id`
  - `product_id` -> `products.id`
  - `variant_id` -> `product_variants.id`
  - `store_id` -> `stores.id`
  - referenced by `reviews.order_item_id`

---

### orders (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `user_id` — uuid, nullable
  - `order_number` — varchar, unique
  - `status` — varchar, default: 'pending'
  - `subtotal` — numeric
  - `tax_amount` — numeric, default: 0
  - `shipping_amount` — numeric, default: 0
  - `discount_amount` — numeric, default: 0
  - `total_amount` — numeric
  - `currency` — varchar, default: 'USD'
  - `payment_status` — varchar, default: 'pending'
  - `payment_method` — varchar, nullable
  - `payment_reference` — varchar, nullable
  - `shipping_address` — jsonb
  - `billing_address` — jsonb
  - `notes` — text, nullable
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `user_id` -> `users.id`

---

### product_attributes (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `product_id` — uuid, nullable
  - `name` — varchar
  - `value` — varchar
  - `display_order` — integer, default: 0
  - `created_at` — timestamptz, default: now()
- Foreign keys:
  - `product_id` -> `products.id`

---

### product_images (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `product_id` — uuid, nullable
  - `variant_id` — uuid, nullable
  - `image_url` — text
  - `alt_text` — varchar, nullable
  - `sort_order` — integer, default: 0
  - `is_primary` — bool, default: false
  - `created_at` — timestamptz, default: now()
- Foreign keys:
  - `product_id` -> `products.id`
  - `variant_id` -> `product_variants.id`

---

### product_variants (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `product_id` — uuid, nullable
  - `sku` — varchar, nullable, unique
  - `name` — varchar, nullable
  - `price` — numeric, nullable
  - `compare_price` — numeric, nullable
  - `cost_price` — numeric, nullable
  - `inventory_quantity` — integer, default: 0
  - `weight` — numeric, nullable
  - `is_active` — bool, default: true
  - `variant_options` — jsonb, nullable
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `product_id` -> `products.id`

---

### products (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `store_id` — uuid, nullable
  - `category_id` — uuid, nullable
  - `brand_id` — uuid, nullable
  - `name` — varchar
  - `slug` — varchar, unique
  - `description` — text, nullable
  - `short_description` — text, nullable
  - `sku` — varchar, nullable
  - `base_price` — numeric
  - `compare_price` — numeric, nullable
  - `cost_price` — numeric, nullable
  - `weight` — numeric, nullable
  - `dimensions` — jsonb, nullable
  - `material` — varchar, nullable
  - `care_instructions` — text, nullable
  - `is_active` — bool, default: true
  - `is_featured` — bool, default: false
  - `status` — varchar, default: 'draft'
  - `total_sales` — integer, default: 0
  - `view_count` — integer, default: 0
  - `rating` — numeric, default: 0.00
  - `review_count` — integer, default: 0
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `store_id` -> `stores.id`
  - `category_id` -> `categories.id`
  - `brand_id` -> `brands.id`
  - referenced by many tables (product_variants, product_images, order_items, wishlists, product_attributes, reviews, cart_items)

---

### reviews (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `user_id` — uuid, nullable
  - `product_id` — uuid, nullable
  - `order_item_id` — uuid, nullable
  - `rating` — integer, check: rating >= 1 AND rating <= 5
  - `title` — varchar, nullable
  - `comment` — text, nullable
  - `is_verified_purchase` — bool, default: false
  - `is_approved` — bool, default: true
  - `approved_by` — uuid, nullable
  - `approved_at` — timestamptz, nullable
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `user_id` -> `users.id`
  - `product_id` -> `products.id`
  - `order_item_id` -> `order_items.id`
  - `approved_by` -> `users.id`

---

### shopping_carts (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `user_id` — uuid, nullable
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `user_id` -> `users.id`

---

### stores (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `owner_id` — uuid, nullable
  - `name` — varchar
  - `slug` — varchar, unique
  - `description` — text, nullable
  - `logo_url` — text, nullable
  - `banner_url` — text, nullable
  - `phone` — varchar, nullable
  - `email` — varchar, nullable
  - `website_url` — text, nullable
  - `is_active` — bool, default: true
  - `is_verified` — bool, default: false
  - `verification_date` — timestamptz, nullable
  - `rating` — numeric, default: 0.00
  - `total_sales` — integer, default: 0
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `owner_id` -> `users.id`

---

### user_addresses (rows: 0)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `user_id` — uuid, nullable
  - `type` — varchar, default: 'shipping'
  - `street_address` — text
  - `city` — varchar
  - `state_province` — varchar, nullable
  - `postal_code` — varchar, nullable
  - `country` — varchar
  - `is_default` — bool, default: false
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `user_id` -> `users.id`

---

### user_roles (rows: 5)

- RLS: false
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `name` — varchar, unique
  - `description` — text, nullable
  - `permissions` — jsonb, default: '{}'
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - referenced by `users.role_id`

---

### users (rows: 1)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid
  - `role_id` — uuid, nullable
  - `email` — varchar, unique
  - `first_name` — varchar, nullable
  - `last_name` — varchar, nullable
  - `phone` — varchar, nullable
  - `date_of_birth` — date, nullable
  - `gender` — varchar, nullable
  - `profile_image_url` — text, nullable
  - `is_active` — bool, default: true
  - `is_verified` — bool, default: false
  - `verification_date` — timestamptz, nullable
  - `last_login` — timestamptz, nullable
  - `created_at` — timestamptz, default: now()
  - `updated_at` — timestamptz, default: now()
- Foreign keys:
  - `id` -> `auth.users.id` (link to auth schema)
  - `role_id` -> `user_roles.id`
  - referenced by user_addresses, orders, reviews, shopping_carts, notifications, stores, coupons, wishlists

---

### wishlists (rows: 0)

- RLS: true
- Primary key: `id` (uuid)
- Columns:
  - `id` — uuid, default: gen_random_uuid()
  - `user_id` — uuid, nullable
  - `product_id` — uuid, nullable
  - `created_at` — timestamptz, default: now()
- Foreign keys:
  - `user_id` -> `users.id`
  - `product_id` -> `products.id`

---

## How to update

- Regenerate this file after schema changes. I can re-run the MCP query and overwrite this file.
- To update: run the Supabase MCP server query (or ask me to regenerate) and commit the new `SUPABASE_SCHEMA.md`.

---

## Quick notes

- Many tables include `created_at` and `updated_at` with `now()` defaults.
- RLS is enabled on user-scoped tables — mind auth when querying.
- The schema centers on `users`, `products`, `product_variants`, `orders`, `stores`, `categories`, `brands`.

