"use client";

import { Autoplay, EffectFade, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { HeroSlide } from "./HeroSlide";

interface Props {
  content: Hero[];
}

const HeroCarousel = ({ content }: Props) => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay, Virtual]}
      speed={800}
      className="hero h-full"
      autoplay={{ delay: 2500, disableOnInteraction: true }}
      pagination={{ clickable: true }}
      watchSlidesProgress={true}
      virtual
    >
      {content.map((hero, i) => (
        <SwiperSlide key={i} virtualIndex={i} className="h-full">
          <HeroSlide content={hero} isFirstSlide={i === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
