import { createClient } from "@/utils";

export const createStore = async (store: {
  name: string;
  slug: string;
  description?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  phone?: string | null;
  email?: string | null;
  website_url?: string | null;
}) => {
  const supabase = createClient();
  const user = (supabase.auth as any)?.user?.() || null;

  const { data, error } = await supabase
    .from("stores")
    .insert({
      ...store,
      owner_id: user?.id ?? null,
    })
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data?.[0];
};

export const getStoresByOwner = async (ownerId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("owner_id", ownerId);

  if (error) throw new Error(error.message);
  return data;
};
