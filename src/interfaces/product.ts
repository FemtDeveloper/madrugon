/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */

// Minimal, DB-aligned product shape used across the app
interface CreateProductDTO {
  // Identifiers
  brand_id?: string | null;
  category_id?: string | null;
  store_id?: string | null;

  // Basic info
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  short_description?: string | null;

  // Pricing
  base_price?: number | null; // canonical price in DB
  compare_price?: number | null; // original / compare at price
  cost_price?: number | null;

  // legacy aliases used in some places
  price?: number | null;
  regular_price?: number | null;

  // Inventory / identifiers
  sku?: string | null;
  sizes?: string[] | null;

  // Metadata
  gender?: string | null;
  is_active?: boolean | null;
  is_featured?: boolean | null;
  status?: string | null;

  material?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  care_instructions?: string | null;

  rating?: number | null;
  review_count?: number | null;
  total_sales?: number | null;
  view_count?: number | null;

  images?: string[] | null;

  created_at?: string | null;
  updated_at?: string | null;
}

// Product returned from DB uses UUID string id
interface Product extends CreateProductDTO {
  id: string;
  // keep brand/category object placeholders for convenience
  brand?: any | null;
  category?: any | null;
}

interface FavoriteProduct {
  product_id: string;
  products: Product;
}

interface UserFavoriteDto {
  user_id: string;
  product_id: string;
}

interface UserFavorite extends UserFavoriteDto {
  created_at: string;
}

type Gender = "Hombre" | "Mujer" | "Niños/as" | "Remates" | string;

type Category = string;

/* eslint-enable unused-imports/no-unused-vars */
