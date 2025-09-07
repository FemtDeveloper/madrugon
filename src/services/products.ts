import { deleteFilesByUrls } from "@/lib/firebase/storage";
import { createClient } from "@/utils";
// import { createClient as createServerClient } from "@/utils/supabase/server";

export const getAllProducts = async (): Promise<Product[] | null> => {
    const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return null;
  }
  return data;
};
export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("slug", "eq", slug);

  if (error) {
    return null;
  }
  return data[0];
};
export const getProductBy = async (
  term: "id" | "slug",
  identifier: string
): Promise<Product | null> => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter(term, "eq", identifier);

  if (error) {
    return null;
  }
  return data[0];
};

export const addFavorite = async (productId: string, userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("wishlists")
    .insert({ product_id: productId, user_id: userId });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const getFavoriteProducts = async (
  user_id: string
): Promise<FavoriteProduct[] | null> => {
  const supabase = createClient();

  const { data, error } = await supabase
  .from("wishlists")
    .select(
      `
    product_id,
    products (name, price, description, sizes, images, id, brand, category, created_at, regular_price )
  `
    )
    .eq("user_id", user_id);

  if (error) {
    console.error({ error });
  }

  return data as unknown as FavoriteProduct[];
};

export const getProductsByGender = async (gender: Gender) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("gender", "eq", gender.toLowerCase());

  if (error) {
    return null;
  }
  return data;
};
export const getProductsByCategory = async (category: Category) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("category", "eq", category.toLowerCase());

  if (error) {
    return null;
  }
  return data;
};

export const getProductsBySearchNavbar = async (searchTerm: string) => {

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .textSearch("name", searchTerm.split(" ").join(" or ").trim());

  if (error) {
    return null;
  }
  return data;
};
export const getProductsByGenderAndCategory = async (
  gender: Gender,
  categories: Category[]
) => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("category", categories)
    .match({ gender });

  if (error) {
    return null;
  }
  return data;
};
// getMyProducts moved to server-only module: services/products.server.ts

export const addProduct = async (
  product: Product & { category_id?: string; store_id?: string },
  imageUrls: string[]
) => {
  const supabase = createClient();

  if (!product.category_id) throw new Error("category_id is required");
  if (!product.store_id) throw new Error("store_id is required");
  if (!imageUrls || imageUrls.length === 0) {
    throw new Error("Debes subir al menos una imagen del producto");
  }

  const name = (product.name ?? "").trim();
  const slug = name.toLowerCase().replaceAll(" ", "-");

  const insertProduct: any = {
    name,
    slug,
    description: product.description ?? null,
    store_id: product.store_id,
    category_id: product.category_id,
    brand_id: (product as any).brand ?? null,
    base_price: (product as any).price ?? 0,
    compare_price: (product as any).regular_price ?? null,
  sizes: Array.isArray((product as any).sizes) ? (product as any).sizes : [],
  gender: (product as any).gender ?? null,
    is_active: true,
    status: "published",
  };

  const { data: created, error: insertErr } = await supabase
    .from("products")
    .insert(insertProduct)
    .select("id")
    .single();

  if (insertErr || !created?.id) {
    await deleteFilesByUrls(imageUrls);
    throw new Error(insertErr?.message || "No se pudo crear el producto");
  }

  const productId = created.id as string;
  const rows = imageUrls.map((u) => ({ product_id: productId, image_url: u }));
  const { error: imgErr } = await supabase.from("product_images").insert(rows);
  if (imgErr) {
    await supabase.from("products").delete().eq("id", productId);
    await deleteFilesByUrls(imageUrls);
    throw new Error(imgErr.message);
  }

  return { id: productId };
};

export const updateProduct = async (
  product: Product & { category_id?: string; store_id?: string },
  imageUrls: string[],
  id?: string
) => {
  const supabase = createClient();

  if (product.category_id === undefined) throw new Error("category_id is required");
  if (product.store_id === undefined) throw new Error("store_id is required");
  if (!id) throw new Error("product id is required");

  const name = (product.name ?? "").trim();
  const slug = name.toLowerCase().replaceAll(" ", "-");

  const updatePayload: any = {
    name,
    slug,
    description: product.description ?? null,
    store_id: product.store_id,
    category_id: product.category_id,
    brand_id: (product as any).brand ?? null,
    base_price: (product as any).price ?? 0,
    compare_price: (product as any).regular_price ?? null,
  sizes: Array.isArray((product as any).sizes) ? (product as any).sizes : [],
  gender: (product as any).gender ?? null,
  };

  const { error: updErr, data } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id);
  if (updErr) throw new Error(updErr.message);

  // Sync images: remove deleted from DB and Storage; add new
  const { data: currentImgs, error: curErr } = await supabase
    .from("product_images")
    .select("image_url")
    .eq("product_id", id);
  if (curErr) throw new Error(curErr.message);

  const existingUrls = (currentImgs || []).map((r: any) => r.image_url);
  const toDelete = existingUrls.filter((u) => !imageUrls.includes(u));
  const toAdd = imageUrls.filter((u) => !existingUrls.includes(u));

  if (toDelete.length) {
    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", id)
      .in("image_url", toDelete);
    // Best-effort delete from Firebase
    await deleteFilesByUrls(toDelete);
  }

  if (toAdd.length) {
    const rows = toAdd.map((u) => ({ product_id: id, image_url: u }));
    const { error: imgErr } = await supabase.from("product_images").insert(rows);
    if (imgErr) throw new Error(imgErr.message);
  }

  return data;
};
