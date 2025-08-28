import { createClient } from "@/utils";

export const createBrand = async (brand: {
  name: string;
  slug: string;
  description?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  is_active?: boolean | null;
}) => {
  const supabase = createClient();

  let ownerId: string | null = null;
  try {
    const getUserRes = await (supabase.auth as any).getUser?.();
    const authUser = (getUserRes as any)?.data?.user ?? null;
    ownerId = authUser?.id ?? null;
    console.log("createBrand: authUser:", authUser);
  } catch {
    // ignore
  }

  if (!ownerId) {
    // Give a clear error instead of allowing an RLS violation to bubble up
    throw new Error("No authenticated user found. You must be signed in to create a brand.");
  }

  console.log("createBrand: inserting brand", { brand, ownerId });

  const { data, error } = await supabase.from("brands").insert({
    ...brand,
    owner_id: ownerId,
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

export const updateBrand = async (id: string, payload: Partial<{ name: string; slug: string; description?: string | null; logo_url?: string | null }>) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('brands').update(payload).eq('id', id).select('*');
  if (error) throw new Error(error.message);
  return data?.[0];
};
