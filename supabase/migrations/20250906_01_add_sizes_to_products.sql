-- Add sizes to products as a text array, defaulting to empty
alter table public.products
add column if not exists sizes text[] not null default '{}'::text[];

-- Optional: comment for documentation
comment on column public.products.sizes is 'List of size codes for the product (e.g., S, M, L)';
