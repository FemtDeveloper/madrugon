import { createClient } from "@/utils";

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
  console.log({ searchTerm });

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
export const getMyProducts = async (userId: string) => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("user_id", "eq", userId);

  if (error) {
    return null;
  }
  return data;
};

export const addProduct = async (
  product: Product & { category_id?: string; store_id?: string },
  images: string[]
) => {
  const supabase = createClient();

  if (!product.category_id) {
    throw new Error("category_id is required");
  }
  if (!product.store_id) {
    throw new Error("store_id is required");
  }

  const slug = product.name!.trim().toLowerCase().replaceAll(" ", "-");

  const { error } = await supabase.from("products").insert({
    ...product,
    category_id: product.category_id,
    store_id: product.store_id,
    images,
    slug,
  });
  if (error) {
    throw new Error(error.message);
  }
};
export const updateProduct = async (
  product: Product & { category_id?: string; store_id?: string },
  images: string[],
  id?: number
) => {
  const supabase = createClient();

  if (product.category_id === undefined) {
    throw new Error("category_id is required");
  }
  if (product.store_id === undefined) {
    throw new Error("store_id is required");
  }

  const slug = product.name!.trim().toLowerCase().replaceAll(" ", "-");

  const { error, data } = await supabase
    .from("products")
    .update({
      ...product,
      category_id: product.category_id,
      store_id: product.store_id,
      slug,
      ...(images.length > 0 && { images }),
    })
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
