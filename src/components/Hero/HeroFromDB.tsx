"use client";

import { listPromoBanners } from "@/services/cms";
import { useQuery } from "@tanstack/react-query";
import Hero from "./Hero";

const mapSlides = (rows: PromoBanner[]): Hero[] =>
  (rows || []).map((r) => ({
    img: r.image_url,
    path: r.cta_url || "/",
    btnTitle: r.cta_label || "Ver",
    title: r.title ?? "",
    subtitle: r.description || undefined,
  }));

export const HeroFromDB = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["promo_banners"],
    queryFn: () => listPromoBanners(),
  });

  if (isLoading) return null;
  if (isError) return null;

  const content = mapSlides(data as any[]);
  if (!content.length) return null;

  return <Hero content={content} />;
};
