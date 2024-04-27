"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => {
  return (
    <div className="w-full lg:w-[40%] flex">
      <Swiper
        slidesPerView={1}
        modules={[Autoplay]}
        speed={800}
        centeredSlides
        autoplay={{ delay: 2500 }}
        className="w-full max-h-96 lg:max-h-[520px] gallery"
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={i} className="h-full w-full flex justify-center">
              <Image
                src={image}
                alt="Imágen del producto"
                width={418}
                height={519}
                className="h-full object-cover rounded-lg"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Gallery;
