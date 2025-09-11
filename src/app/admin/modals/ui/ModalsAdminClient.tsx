"use client";

import { Loader } from "@/components/Ui";
import ModalsAdminForm from "./ModalsAdminForm";
import ModalsAdminList from "./ModalsAdminList";
import { listPromoModals } from "@/services/cms";
import { useQuery } from "@tanstack/react-query";

export const ModalsAdminClient = () => {
  const { isLoading } = useQuery({
    queryKey: ["promo_modals"],
    queryFn: () => listPromoModals(),
  });

  return (
    <div className="flex flex-col gap-6">
      <ModalsAdminForm />

      <div className="flex flex-col gap-3">
        <h3 className="h3">Listado</h3>
        {isLoading ? <Loader /> : <ModalsAdminList />}
      </div>
    </div>
  );
};

export default ModalsAdminClient;
