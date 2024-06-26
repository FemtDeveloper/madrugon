"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ImageCard } from "@/interfaces/cards";

import MainCategoryCard from "./MainCategoryCard";

const BREAKPOINTS = {
  768: {
    slidesPerView: 2.5,
    spaceBetween: 24,
  },
  360: {
    slidesPerView: 1.5,
    spaceBetween: 16,
  },
};

interface Props {
  content: ImageCard[];
}

const MainCategories = ({ content }: Props) => {
  return (
    <section className="w-full max-w-wrapper">
      <div className="swiperContainer lg:hidden">
        <Swiper
          modules={[Autoplay]}
          breakpoints={BREAKPOINTS}
          centeredSlides
          speed={800}
          autoplay={{ delay: 2500 }}
          className="lg:hidden"
        >
          {content.map((hero, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <MainCategoryCard content={hero} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="gap-6 flex-wrap hidden lg:flex justify-center">
        {content.map((hero, i) => (
          <MainCategoryCard content={hero} key={i} />
        ))}
      </div>
    </section>
  );
};

export default MainCategories;
