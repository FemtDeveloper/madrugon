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
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <div className="w-full flex flex-col gap-8 lg:gap:15 items-center">
        <Hero content={heroContent} />
        <MainCategories content={mainCategoriesContent} />
        <MainGrid />
        <Banner content={BANNER_CONTENT} />
        <Footer />
      </div>
    </main>
  );
}
