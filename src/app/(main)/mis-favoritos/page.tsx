import { ProductGrid } from "@/components/Shared";
import { createClient } from "@/utils/supabase/server";
import { getFavoriteProducts } from "@/services/products";
import { redirect } from "next/navigation";

const FavoritosPage = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  const favoriteProducts: FavoriteProduct[] | null = await getFavoriteProducts(
    data.user.id
  );
  // console.log(favoriteProducts);

  return (
    <section className="flex flex-col h-full w-full max-w-wrapper py-4 gap-8">
      <h1 className="h2_bold text-start font-semibold">Mis favoritos</h1>
      {favoriteProducts ? (
        <ProductGrid
          products={favoriteProducts.map((product) => product.products)}
        />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes favoritos en este momento</h2>
        </div>
      )}
    </section>
  );
};

export default FavoritosPage;
