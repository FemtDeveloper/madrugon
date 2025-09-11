import { createClient } from "@/utils";

export const listActivePromoBanners = async () => {
  const supabase = createClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("promo_banners")
  .select("id,image_url,cta_url,is_active,is_modal,modal_priority,show_once_per_session,created_at,updated_at")
    .eq("is_active", true)
    .or(`valid_from.is.null,valid_from.lte.${now}`)
    .or(`valid_until.is.null,valid_until.gte.${now}`)
    .order("modal_priority", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
};

export const recordPromotionEvent = async (
  promo_id: string,
  event: "view" | "click" | "dismiss"
) => {
  const supabase = createClient();
  const { error } = await supabase.from("promotion_events").insert({ promo_id, event });
  if (error) throw new Error(error.message);
  return { success: true } as const;
};
