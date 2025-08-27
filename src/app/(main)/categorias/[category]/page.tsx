import { ProductGrid } from "@/components/Shared";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getProductsByCategory } from "@/services/products";

export async function generateStaticParams() {
  try {
    const supabase = createSupabaseClient();
    const { data: categories } = await supabase
      .from("categories")
      .select("slug")
      .eq("is_active", true);

    if (!categories) return [];
    return categories.map((c) => ({ category: c.slug }));
  } catch (err) {
    // Log and return empty list so build can continue when fetch fails
    console.error("generateStaticParams (categories) failed:", err);
    return [];
  }
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: Category }>;
}) => {
  // Next's generated PageProps expects `params` to be a Promise when the page
  // component is async. Await it here and use the resolved value.
  const resolved = await params;
  const products = await getProductsByCategory(resolved.category);

  return (
    <div className="hfull w-full max-w-wrapper">
      <h1 className="h1">{resolved.category}</h1>
      {products?.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes {resolved.category} en este momento</h2>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
