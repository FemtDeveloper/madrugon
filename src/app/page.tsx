import { Hero, heroContent } from "@/components/Hero";
import { Navbar, PromoBanner } from "@/components/Navbar";
import {
  MainCategories,
  mainCategoriesContent,
} from "@/components/MainCategories";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { MainGrid } from "@/components/MainGrid";
import { Banner } from "@/components/Banner";
import { BANNER_CONTENT } from "@/mocks";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <div className="w-full flex flex-col sticky top-0 z-50">
        <PromoBanner />
        <Navbar />
      </div>
      <div className="w-full flex flex-col gap-8 lg:gap:15 items-center">
        <Hero content={heroContent} />
        <MainCategories content={mainCategoriesContent} />
        <MainGrid />
        <Banner content={BANNER_CONTENT} />
      </div>
    </main>
  );
}
