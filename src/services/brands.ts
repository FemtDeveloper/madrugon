import { createClient } from "@/utils";

export const createBrand = async (brand: {
  name: string;
  slug: string;
  description?: string | null;
  logo_url?: string | null;
}) => {
  const supabase = createClient();
  const user = (supabase.auth as any)?.user?.() || null;

  const { data, error } = await supabase.from("brands").insert({
    ...brand,
    owner_id: user?.id ?? null,
  }).select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data?.[0];
};

export const getBrandsByOwner = async (ownerId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("owner_id", ownerId);

  if (error) throw new Error(error.message);
  return data;
};
