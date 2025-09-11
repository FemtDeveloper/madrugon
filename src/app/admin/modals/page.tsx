import { Suspense } from "react";
import { ModalsAdminClient } from "./ui/ModalsAdminClient";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <h2 className="h2">Modales de Promoción</h2>
      <Suspense fallback={null}>
        <ModalsAdminClient />
      </Suspense>
    </div>
  );
};

export default Page;
