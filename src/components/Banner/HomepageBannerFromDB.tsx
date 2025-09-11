"use client";

import { BANNER_CONTENT } from "@/mocks";
import BannerComponent from "./Banner";

interface Props {
  banner?: Banner | null;
}

const HomepageBannerFromDB = ({ banner }: Props) => {
  return <BannerComponent content={banner ?? BANNER_CONTENT} />;
};

export default HomepageBannerFromDB;
