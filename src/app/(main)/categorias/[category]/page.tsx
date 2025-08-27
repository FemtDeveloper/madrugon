import { ProductGrid } from "@/components/Shared";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getProductsByCategory } from "@/services/products";
import type { Database } from "../../../../../database.types";

type CategoryParam = { category: string };

export async function generateStaticParams(): Promise<CategoryParam[]> {
  try {
    const supabase = createSupabaseClient();
    const { data } = await supabase
      .from("categories")
      .select("slug")
      .eq("is_active", true);

    // Ensure strong typing of the selected shape to avoid `never` inference
    const categories = (data ?? []) as Array<
      Pick<Database["public"]["Tables"]["categories"]["Row"], "slug">
    >;

    if (!categories?.length) return [];
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
  params: Promise<{ category: string }>;
}) => {
  const resolved = await params;
  const products = await getProductsByCategory(resolved.category as Category);

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
