"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { HeroSlide } from "./HeroSlide";

const HeroCarousel = dynamic(() => import("./HeroCarousel"), { ssr: false });

interface Props {
  content: Hero[];
}

export const Hero = ({ content }: Props) => {
  const [swiperReady, setSwiperReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <div className="w-full flex flex-col">
      <section className="w-full h-[544px] lg:h-[620px] max-w-screen-2xl mx-auto relative">
        {/* Static first-slide placeholder for fast LCP; removed once carousel is ready */}
        {!(isClient && swiperReady) && content?.[0] && (
          <div className="absolute inset-0">
            <HeroSlide content={content[0]} isFirstSlide />
          </div>
        )}
        {isClient && (
          <HeroCarousel
            content={content}
            onReady={() => setSwiperReady(true)}
          />
        )}
      </section>
    </div>
  );
};

export default Hero;
