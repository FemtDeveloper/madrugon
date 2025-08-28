-- Migration: make_products_category_not_null
-- Ensures every product has a category and makes products.category_id NOT NULL

BEGIN;

-- Ensure there is an "uncategorized" fallback category
INSERT INTO public.categories (id, name, slug, created_at, updated_at)
SELECT gen_random_uuid(), 'Uncategorized', 'uncategorized', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE slug = 'uncategorized');

-- Set existing NULL category_ids to the fallback
WITH fallback AS (SELECT id FROM public.categories WHERE slug = 'uncategorized' LIMIT 1)
UPDATE public.products
SET category_id = (SELECT id FROM fallback)
WHERE category_id IS NULL;

-- Now enforce NOT NULL (safe because we've filled NULLs)
ALTER TABLE public.products
  ALTER COLUMN category_id SET NOT NULL;

-- Index to speed category queries
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);

COMMIT;
