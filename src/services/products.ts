import { supabase } from "@/lib/supabase";

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("slug", "eq", slug);

  if (error) {
    return null;
  }
  return data[0];
};
