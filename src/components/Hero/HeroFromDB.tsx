"use client";

import { listHeroSlides } from "@/services/cms";
import { useQuery } from "@tanstack/react-query";
import Hero from "./Hero";

// Converts DB hero_slides to existing Hero[] interface used by Hero component
const mapSlides = (rows: any[]): Hero[] =>
  (rows || []).map((r) => ({
    img: r.image_url,
    path: r.cta_url || "/",
    btnTitle: r.cta_label || "Ver",
    title: r.title,
    subtitle: r.subtitle || undefined,
  }));

export const HeroFromDB = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hero_slides"],
    queryFn: listHeroSlides,
  });

  if (isLoading) return null; // keep LCP stable; Hero has placeholder
  if (isError) return null;

  const content = mapSlides(data as any[]);
  if (!content.length) return null;

  return <Hero content={content} />;
};
