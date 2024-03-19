"use client";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import heroContent from "./heroContent";
import HeroSlide from "./HeroSlide";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Hero = () => {
  return (
    <div className="w-full h-[544px] lg:h-[620px]">
      <Swiper
        modules={[EffectFade, Autoplay]}
        speed={800}
        loop={true}
        className="hero h-full"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        pagination={{ clickable: true }}
      >
        {heroContent.map((hero, i) => (
          <SwiperSlide key={i} className="h-full">
            <HeroSlide content={hero} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
