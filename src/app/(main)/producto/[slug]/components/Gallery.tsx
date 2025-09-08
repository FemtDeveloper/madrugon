"use client";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => {
  return (
    <div className="w-full lg:w-[40%] flex px-4 lg:px-0">
      <div className="relative w-full group min-h-72">
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Pagination, Navigation]}
          speed={600}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
            bulletClass: "swiper-pagination-bullet-custom",
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          loop={images.length > 1}
          className="w-full max-h-96 lg:max-h-[620px] gallery-swiper rounded-xl overflow-hidden"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i} className="h-full w-full relative">
              <Image
                src={image}
                alt={`Imagen del producto ${i + 1}`}
                fill
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      <style jsx global>{`
        .gallery-swiper {
          --swiper-theme-color: #3b82f6;
          width: 100% !important;
          height: 100% !important;
        }

        .gallery-swiper .swiper-wrapper {
          height: 100% !important;
        }

        .gallery-swiper .swiper-slide {
          height: 100% !important;
        }

        .gallery-swiper .swiper-pagination {
          bottom: 16px !important;
        }

        .gallery-swiper .swiper-pagination-bullet-custom {
          background: rgba(255, 255, 255, 0.7);
          opacity: 1;
          width: 8px;
          height: 8px;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .gallery-swiper .swiper-pagination-bullet-active-custom {
          background: white;
          transform: scale(1.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .gallery-swiper .swiper-pagination-bullet-custom:hover {
          background: white;
          transform: scale(1.1);
        }

        /* Hide default navigation */
        .gallery-swiper .swiper-button-next,
        .gallery-swiper .swiper-button-prev {
          display: none;
        }

        /* Mobile responsiveness for buttons */
        @media (max-width: 768px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            opacity: 1 !important;
            background: rgba(255, 255, 255, 0.95) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
