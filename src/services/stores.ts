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
  // Try to fetch the authenticated user using the client auth helper.
  // Use getUser() which returns a promise and is compatible with Supabase JS v2
  let ownerId: string | null = null;
  try {
    const getUserRes = await (supabase.auth as any).getUser?.();
    const authUser = (getUserRes as any)?.data?.user ?? null;
    ownerId = authUser?.id ?? null;
    console.log("createStore: authUser:", authUser);
  } catch {
    // ignore - ownerId stays null
  }

  console.log("createStore: inserting store", { store, ownerId });

  const { data, error } = await supabase.from("stores").insert({
    ...store,
    owner_id: ownerId,
  }).select("*");

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
