import { BannersAdminClient } from "./ui/BannersAdminClient";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 py-6 px-4 w-full max-w-wrapper">
      <h2 className="h2">Banners</h2>
      <Suspense fallback={null}>
        <BannersAdminClient />
      </Suspense>
    </div>
  );
};

export default Page;
