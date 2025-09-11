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
  title: string;
  description?: string | null;
  image_url: string;
  cta_label?: string | null;
  cta_url?: string | null;
  discount_text?: string | null;
  valid_from?: string | null;
  valid_until?: string | null;
  is_active?: boolean;
  is_modal?: boolean;
  modal_priority?: number;
  audience?: any | null; // jsonb
  show_once_per_session?: boolean;
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
  return handle(data, error);
};

export const deleteHomepageBanner = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("homepage_banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true } as const;
};

// Promo Banners
export const listPromoBanners = async (opts?: { onlyActive?: boolean; modalOnly?: boolean }) => {
  const supabase = createClient();
  let query = supabase.from("promo_banners").select("*");
  if (opts?.onlyActive) query = query.eq("is_active", true);
  if (opts?.modalOnly) query = query.eq("is_modal", true);
  const { data, error } = await query.order("modal_priority", { ascending: false });
  return handle(data ?? [], error);
};

export const createPromoBanner = async (input: PromoBannerInput) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("promo_banners")
    .insert(input)
    .select("*")
    .single();
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
  return handle(data, error);
};

export const deletePromoBanner = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("promo_banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true } as const;
};
