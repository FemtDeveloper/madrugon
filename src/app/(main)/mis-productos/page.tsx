import { redirect } from "next/navigation";

import { ProductGrid } from "@/components/Shared";
import { getMyProducts } from "@/services/products";
import { createClient } from "@/utils/supabase/server";

const MisProductosPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  const products = await getMyProducts(data.user.id);

  return (
    <section className="flex flex-col w-full  h-full max-w-wrapper py-4">
      <h1 className="h2_bold text-start font-semibold">Mis productos</h1>

      {products?.length ? (
        <ProductGrid products={products} isEditable />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes productos en venta aún.</h2>
        </div>
      )}
    </section>
  );
};

export default MisProductosPage;
