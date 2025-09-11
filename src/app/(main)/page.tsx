import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import {
  MainCategories,
  mainCategoriesContent,
} from "@/components/MainCategories";

import HomepageBannerFromDB from "@/components/Banner/HomepageBannerFromDB";
import { HeroFromDB } from "@/components/Hero";
import { MainGrid } from "@/components/MainGrid";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <div className="w-full flex flex-col gap-8 lg:gap:15 items-center">
        {/* Hero populated from DB */}
        <HeroFromDB />
        <MainCategories content={mainCategoriesContent} />
        <MainGrid />
        {/* Homepage banner from DB (first active record) */}
        <HomepageBannerFromDB />
      </div>
    </main>
  );
}
