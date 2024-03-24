"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => {
  return (
    <div className="w-full lg:w-1/3 flex">
      <Swiper
        slidesPerView={1}
        modules={[Autoplay]}
        speed={800}
        centeredSlides
        autoplay={{ delay: 2500 }}
        className="flex"
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={i} className="h-full w-full flex">
              <Image
                src={image}
                alt="Imágen del producto"
                width={418}
                height={519}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Gallery;
