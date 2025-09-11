import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Hero } from "@/components/Hero";
import {
  MainCategories,
  mainCategoriesContent,
} from "@/components/MainCategories";

import HomepageBannerFromDB from "@/components/Banner/HomepageBannerFromDB";
import { MainGrid } from "@/components/MainGrid";

export const dynamic = "force-static"; // ensure static generation

// Fetch helpers using REST API to leverage Next.js fetch cache tagging
async function fetchPromoBanners() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/promo_banners?select=*&is_active=eq.true&order=position.asc`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
    next: { tags: ["promo_banners"] },
  });
  if (!res.ok) return [] as any[];
  return (await res.json()) as PromoBanner[];
}

async function fetchHomepageBanners() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/homepage_banners?select=*&placement=eq.main&is_active=eq.true&order=sort_order.asc&limit=1`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
    next: { tags: ["homepage_banners"] },
  });
  if (!res.ok) return [] as any[];
  return (await res.json()) as any[];
}

function mapHeroSlides(rows: PromoBanner[]): Hero[] {
  return (rows || []).map((r) => ({
    img: r.image_url,
    path: r.cta_url || "/",
    btnTitle: r.cta_label || "Ver",
    title: r.title ?? "",
    subtitle: r.description || undefined,
  }));
}

function mapHomepageBanner(first: any | null | undefined): Banner | null {
  if (!first) return null;
  return {
    title: first.title,
    titleDescription: first.title_description || "",
    subtitle: first.subtitle || "",
    subtitleDescription: first.subtitle_description || "",
    btnTitle: first.cta_label || "Ver productos",
    path: first.cta_url || "/promos",
    img: first.image_url,
  } as Banner;
}

export default async function Home() {
  const [promoBanners, homepageBanners] = await Promise.all([
    fetchPromoBanners(),
    fetchHomepageBanners(),
  ]);
  const heroSlides = mapHeroSlides(promoBanners);
  const homepageBanner = mapHomepageBanner(homepageBanners?.[0]);

  return (
    <main className="flex w-full flex-col items-center justify-between">
      <div className="w-full flex flex-col gap-8 lg:gap:15 items-center">
        <Hero content={heroSlides} />
        <MainCategories content={mainCategoriesContent} />
        <MainGrid />
        <HomepageBannerFromDB banner={homepageBanner} />
      </div>
    </main>
  );
}
