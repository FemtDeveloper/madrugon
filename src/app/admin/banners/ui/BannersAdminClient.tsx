"use client";

import BannersAdminForm from "./BannersAdminForm";
import BannersAdminList from "./BannersAdminList";
import { Loader } from "@/components/Ui";
import { listPromoBanners } from "@/services/cms";
import { useQuery } from "@tanstack/react-query";

export const BannersAdminClient = () => {
  const { isLoading } = useQuery({
    queryKey: ["promo_banners"],
    queryFn: () => listPromoBanners(),
  });

  return (
    <div className="flex flex-col gap-6">
      <BannersAdminForm />

      <div className="flex flex-col gap-3">
        <h3 className="h3">Listado</h3>
        {isLoading ? <Loader /> : <BannersAdminList />}
      </div>
    </div>
  );
};

export default BannersAdminClient;
