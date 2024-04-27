import { redirect } from "next/navigation";

import { AddProductForm, ImagesUpload } from "@/components/Forms";
import { createClient } from "@/utils/supabase/server";

const SellingPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <div className="w-full max-w-wrapper flex py-12">
      <ImagesUpload />
      <AddProductForm />
    </div>
  );
};

export default SellingPage;
