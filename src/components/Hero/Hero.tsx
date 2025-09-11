"use client";

import dynamic from "next/dynamic";

const HeroCarousel = dynamic(() => import("./HeroCarousel"), { ssr: false });

interface Props {
  content: Hero[];
}

export const Hero = ({ content }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <section className="w-full h-[544px] lg:h-[620px] max-w-screen-2xl mx-auto relative">
        <HeroCarousel content={content} />
      </section>
    </div>
  );
};

export default Hero;
