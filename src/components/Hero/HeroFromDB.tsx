"use client";

import Hero from "./Hero";

// This component now only receives already-fetched promo banners (mapped) from the server.
// Keeping name for minimal churn in the page while removing client data fetching.
interface Props {
  content: Hero[];
}

export const HeroFromDB = ({ content }: Props) => {
  if (!content?.length) return null;
  return <Hero content={content} />;
};
