import { createClient } from "@/utils/supabase/server";

// Server-only: fetch products owned by the given user (via stores.owner_id RLS)
export const getMyProducts = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      created_at,
      base_price,
      compare_price,
      brands:brands(name),
      product_images(image_url),
      stores!inner(owner_id)
    `
    )
    .eq("stores.owner_id", userId);

  if (error) {
    console.error("getMyProducts error:", error);
    return null;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    created_at: row.created_at,
    price: row.base_price ?? 0,
    regular_price: row.compare_price ?? 0,
    brand: row.brands?.name || "",
    images: Array.isArray(row.product_images)
      ? row.product_images.map((pi: any) => pi.image_url)
      : [],
    category: null,
    category_id: row.category_id ?? null,
    store_id: row.store_id ?? null,
    user_id: null,
    sizes: [],
    gender: null,
    discount_percentage: null,
  }));
};

// Server-only: fetch single product by id with normalized relations and map to UI shape
export const getProductById = async (id: string): Promise<Product | null> => {
  const supabase = await createClient();
  // Ensure RLS passes by scoping to the authenticated user's owned store
  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  const userId = userRes?.user?.id;
  if (userErr || !userId) {
    return null;
  }
  // First, fetch the list of store IDs owned by this user
  const { data: stores, error: storesErr } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_id", userId);
  if (storesErr) {
    console.error("getProductById stores error:", (storesErr as any)?.message || storesErr);
    return null;
  }
  const storeIds = (stores || []).map((s: any) => s.id);
  if (storeIds.length === 0) return null;

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
  sizes,
  gender,
      store_id,
      category_id,
      base_price,
      compare_price,
      brand_id,
      created_at,
      product_images(image_url)
    `
    )
    .eq("id", id)
    .in("store_id", storeIds)
    .single();

  if (error) {
    console.error("getProductById error:", (error as any)?.message || error);
    return null;
  }

  const images = Array.isArray((data as any)?.product_images)
    ? (data as any).product_images.map((pi: any) => pi.image_url)
    : [];

  // Map to existing UI Product shape
  return {
    id: (data as any).id,
    name: (data as any).name,
    slug: (data as any).slug,
    description: (data as any).description ?? null,
  sizes: Array.isArray((data as any).sizes) ? (data as any).sizes : [],
  gender: (data as any).gender ?? null,
    store_id: (data as any).store_id ?? null,
    category: null,
    category_id: (data as any).category_id ?? null,
    price: (data as any).base_price ?? 0,
    regular_price: (data as any).compare_price ?? 0,
    brand: (data as any).brand_id ?? null, // form expects brand select value (id)
    images,
    created_at: (data as any).created_at ?? new Date().toISOString(),
    discount_percentage: null,
    user_id: null,
  } as unknown as Product;
};
