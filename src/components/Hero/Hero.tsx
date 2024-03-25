"use client";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlide from "./HeroSlide";

interface Props {
  content: Hero[];
}

const Hero = ({ content }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <section className="w-full h-[544px] lg:h-[620px]">
        <Swiper
          modules={[EffectFade, Autoplay]}
          speed={800}
          className="hero h-full"
          autoplay={{ delay: 2500, disableOnInteraction: true }}
          pagination={{ clickable: true }}
        >
          {content.map((hero, i) => (
            <SwiperSlide key={i} className="h-full">
              <HeroSlide content={hero} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Hero;
