import { createClient } from "@/utils";

export type AdSlotInput = {
  type: "hero" | "banner" | "modal";
  placement: string;
  title?: string | null;
  description?: string | null;
  image_requirements?: string | null;
  base_price: number;
  currency?: string;
  sort_order?: number;
  is_active?: boolean;
  valid_from?: string | null;
  valid_until?: string | null;
};

export const listAdSlots = async (opts?: { activeOnly?: boolean; type?: "hero" | "banner" | "modal" }) => {
  const supabase = createClient();
  let query = supabase.from("ad_slots").select("*");
  if (opts?.activeOnly) query = query.eq("is_active", true);
  if (opts?.type) query = query.eq("type", opts.type);
  const { data, error } = await query.order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
};

export const createAdSlot = async (input: AdSlotInput) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("ad_slots").insert(input).select("*").single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateAdSlot = async (id: string, input: Partial<AdSlotInput>) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("ad_slots").update(input).eq("id", id).select("*").single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteAdSlot = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("ad_slots").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true } as const;
};

// Applications
export const applyToAdSlot = async (slot_id: string, store_id: string, message?: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ad_applications")
    .insert({ slot_id, store_id, message })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const listMyApplications = async (store_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ad_applications")
    .select("*")
    .eq("store_id", store_id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
};

export const reviewApplication = async (
  id: string,
  action: "approve" | "reject",
  reviewed_by?: string
) => {
  const supabase = createClient();
  const status = action === "approve" ? "approved" : "rejected";
  const { data, error } = await supabase
    .from("ad_applications")
    .update({ status, reviewed_by, reviewed_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

// Reservations
export type ReservationInput = {
  slot_id: string;
  store_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  price: number;
  currency?: string;
  notes?: string | null;
};

export const createReservation = async (input: ReservationInput) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("ad_reservations").insert(input).select("*").single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateReservationStatus = async (
  id: string,
  status: "pending" | "approved" | "paid" | "canceled",
  approved_by?: string,
  payment_ref?: string | null
) => {
  const supabase = createClient();
  const payload: Record<string, any> = { status };
  if (approved_by) payload.approved_by = approved_by;
  if (payment_ref !== undefined) payload.payment_ref = payment_ref;
  const { data, error } = await supabase
    .from("ad_reservations")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

// Assets
export const uploadAdAsset = async (
  reservation_id: string,
  asset: { image_url: string; cta_label?: string | null; cta_url?: string | null; alt_text?: string | null }
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ad_assets")
    .insert({ reservation_id, ...asset })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const approveAdAsset = async (id: string, approved_by?: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ad_assets")
    .update({ is_approved: true, approved_by })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
};
