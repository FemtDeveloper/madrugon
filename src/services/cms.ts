import { createClient } from "@/utils";

// CMS services: hero_slides, homepage_banners, promo_banners

export type HeroSlideInput = {
  title: string;
  subtitle?: string | null;
  image_url: string;
  cta_label?: string | null;
  cta_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
  valid_from?: string | null; // ISO
  valid_until?: string | null; // ISO
};

export type BannerInput = {
  title: string;
  image_url: string;
  cta_label?: string | null;
  cta_url?: string | null;
  placement: string;
  sort_order?: number;
  is_active?: boolean;
  valid_from?: string | null; // ISO
  valid_until?: string | null; // ISO
};

export type PromoBannerInput = {
  title?: string | null;
  description?: string | null;
  image_url: string;
  cta_label?: string | null;
  cta_url?: string | null;
  position?: number;
  is_active?: boolean;
  user_id?: string | null;
};

export type PromoModalInput = {
  image_url: string;
  cta_url?: string | null;
  position?: number;
  is_active?: boolean;
  show_once_per_session?: boolean;
  user_id?: string | null;
};

// Shared helpers
const handle = <T>(data: T, error: any): T => {
  if (error) throw new Error(error.message || "Supabase error");
  return data;
};

// Hero Slides
export const listHeroSlides = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });
  return handle(data ?? [], error);
};

export const getHeroSlide = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("id", id)
    .single();
  return handle(data, error);
};

export const createHeroSlide = async (input: HeroSlideInput) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .insert(input)
    .select("*")
    .single();
  return handle(data, error);
};

export const updateHeroSlide = async (id: string, input: Partial<HeroSlideInput>) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  return handle(data, error);
};

export const deleteHeroSlide = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true } as const;
};

// Homepage Banners
export const listHomepageBanners = async (placement?: string) => {
  const supabase = createClient();
  let query = supabase.from("homepage_banners").select("*");
  if (placement) query = query.eq("placement", placement);
  const { data, error } = await query.order("sort_order", { ascending: true });
  return handle(data ?? [], error);
};

export const createHomepageBanner = async (input: BannerInput) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("homepage_banners")
    .insert(input)
    .select("*")
    .single();
  // Fire and forget revalidation
  if (!error) {
    fetch("/api/revalidate/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targets: ["homepage_banners"] }),
    }).catch(() => {});
  }
  return handle(data, error);
};

export const updateHomepageBanner = async (
  id: string,
  input: Partial<BannerInput>
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("homepage_banners")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  if (!error) {
    fetch("/api/revalidate/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targets: ["homepage_banners"] }),
    }).catch(() => {});
  }
  return handle(data, error);
};

export const deleteHomepageBanner = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("homepage_banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  fetch("/api/revalidate/promo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targets: ["homepage_banners"] }),
  }).catch(() => {});
  return { success: true } as const;
};

// Promo Banners
export const listPromoBanners = async (opts?: { onlyActive?: boolean }) => {
  const supabase = createClient();
  let query = supabase.from("promo_banners").select("*");
  if (opts?.onlyActive) query = query.eq("is_active", true);
  const { data, error } = await query.order("position", { ascending: true });
  if (!error) {
    // Normalize to PromoBanner shape with safe defaults
    return (data ?? []).map((row: PromoBanner) => ({
      id: row.id,
      title: row.title ?? null,
      description: row.description ?? null,
      image_url: row.image_url,
      cta_label: row.cta_label ?? null,
      cta_url: row.cta_url ?? null,
      position: typeof row.position === "number" ? row.position : 0,
      is_active: row.is_active ?? true,
      user_id: row.user_id ?? null,
      created_at: row.created_at,
      updated_at: row.updated_at,
    })) as unknown as PromoBanner[];
  }

  // Fallback if new columns are not yet present in DB (code 42703)
  if (
    (error as any)?.code === "42703" ||
    /column .* does not exist/i.test((error as any)?.message || "")
  ) {
    const { data: data2, error: error2 } = await supabase
      .from("promo_banners")
      .select("*")
      .order("created_at", { ascending: false });
    if (error2) throw new Error(error2.message);
    const mapped = (data2 ?? []).map((r: any) => ({
      id: r.id,
      title: r.title ?? null,
      description: r.description ?? null,
      image_url: r.image_url,
      cta_label: r.cta_label ?? null,
      cta_url: r.cta_url ?? null,
      position: typeof r.position === "number" ? r.position : 0,
      is_active: r.is_active ?? true,
      user_id: r.user_id ?? null,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));
    return mapped as unknown as PromoBanner[];
  }
  throw new Error((error as any).message || "Supabase error");
};

export const createPromoBanner = async (input: PromoBannerInput) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("promo_banners")
    .insert(input)
    .select("*")
    .single();
  if (!error) {
    fetch("/api/revalidate/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targets: ["promo_banners"] }),
    }).catch(() => {});
  }
  return handle(data, error);
};

export const updatePromoBanner = async (
  id: string,
  input: Partial<PromoBannerInput>
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("promo_banners")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  if (!error) {
    fetch("/api/revalidate/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targets: ["promo_banners"] }),
    }).catch(() => {});
  }
  return handle(data, error);
};

export const deletePromoBanner = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("promo_banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  fetch("/api/revalidate/promo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targets: ["promo_banners"] }),
  }).catch(() => {});
  return { success: true } as const;
};

// Promo Modals
export const listPromoModals = async (opts?: { onlyActive?: boolean }) => {
  const supabase = createClient();
  let query = supabase.from("promo_modals").select("*");
  if (opts?.onlyActive) query = query.eq("is_active", true);
  const { data, error } = await query.order("position", { ascending: true });
  if (!error) return data ?? [];
  // If the table doesn't exist yet, return an empty list to avoid client crash
  if (
    (error as any)?.code === "PGRST205" ||
    /Could not find the table 'public\.promo_modals'/i.test((error as any)?.message || "")
  ) {
    return [] as any[];
  }
  throw new Error((error as any).message || "Supabase error");
};

export const createPromoModal = async (input: PromoModalInput) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("promo_modals")
    .insert(input)
    .select("*")
    .single();
  return handle(data, error);
};

export const updatePromoModal = async (id: string, input: Partial<PromoModalInput>) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("promo_modals")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  return handle(data, error);
};

export const deletePromoModal = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("promo_modals").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true } as const;
};

// Reorder helpers (client-side batch updates)
export const reorderPromoBanners = async (order: { id: string; position: number }[]) => {
  const supabase = createClient();
  await Promise.all(
    order.map((o) =>
      supabase.from("promo_banners").update({ position: o.position }).eq("id", o.id)
    )
  );
  fetch("/api/revalidate/promo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targets: ["promo_banners"] }),
  }).catch(() => {});
  return { success: true } as const;
};

export const reorderPromoModals = async (order: { id: string; position: number }[]) => {
  const supabase = createClient();
  await Promise.all(
    order.map((o) =>
      supabase.from("promo_modals").update({ position: o.position }).eq("id", o.id)
    )
  );
  return { success: true } as const;
};
