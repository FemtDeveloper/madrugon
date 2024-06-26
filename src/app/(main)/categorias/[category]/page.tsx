import { ProductGrid } from "@/components/Shared";
import { supabase } from "@/lib/supabase/client";
import { getProductsByCategory } from "@/services/products";

export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("*");

  if (!products) return [];
  return products.map((product) => ({ category: product.category }));
}

const CategoryPage = async ({ params }: { params: { category: Category } }) => {
  const products = await getProductsByCategory(params.category);

  return (
    <div className="hfull w-full max-w-wrapper">
      <h1 className="h1">{params.category}</h1>
      {products?.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes {params.category} en este momento</h2>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
