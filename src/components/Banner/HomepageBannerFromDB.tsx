"use client";

import { BANNER_CONTENT } from "@/mocks";
import { listHomepageBanners } from "@/services/cms";
import { useQuery } from "@tanstack/react-query";
import BannerComponent from "./Banner";

const mapFirstBanner = (rows: any[] | undefined | null): Banner | null => {
  const first = rows?.[0];
  if (!first) return null;
  return {
    title: first.title,
    titleDescription: first.title_description || "",
    subtitle: first.subtitle || "",
    subtitleDescription: first.subtitle_description || "",
    btnTitle: first.cta_label || "Ver productos",
    path: first.cta_url || "/promos",
    img: first.image_url,
  } as Banner;
};

const HomepageBannerFromDB = () => {
  const { data } = useQuery({
    queryKey: ["homepage_banners", { placement: "main" }],
    queryFn: () => listHomepageBanners("main"),
  });

  const banner = mapFirstBanner((data as any[]) ?? []);
  return <BannerComponent content={banner ?? BANNER_CONTENT} />;
};

export default HomepageBannerFromDB;
