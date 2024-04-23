import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const MisProductosPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <section className="flex flex-col w-full  h-full max-w-wrapper py-4">
      <h1 className="h2_bold text-start font-semibold">Mis productos</h1>

      <div className="justify-center items-center flex-1 flex">
        <h2 className="h2">No tienes productos a la venta en este momento</h2>
      </div>
    </section>
  );
};

export default MisProductosPage;
