"use client";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import HeroSlide from "./HeroSlide";

interface Props {
  content: Hero[];
  onReady?: () => void;
}

const HeroCarousel = ({ content, onReady }: Props) => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      speed={800}
      className="hero h-full"
      autoplay={{ delay: 2500, disableOnInteraction: true }}
      pagination={{ clickable: true }}
      watchSlidesProgress={true}
      onInit={onReady}
    >
      {content.map((hero, i) => (
        <SwiperSlide key={i} className="h-full">
          <HeroSlide content={hero} isFirstSlide={i === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
