
import { BANNER_CONTENT } from "@/mocks";
import { Banner } from "@/components/Banner";
import { GridTitle } from "@/components/Shared";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getProductBySlug } from "@/services/products";

import { Gallery, ProductInfo } from "./components";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map((product) => ({
      slug: product.slug,
    }));
  } catch (err) {
    console.error("generateStaticParams (products) failed:", err);
    return [];
  }
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolved = await params;
  const product = await getProductBySlug(resolved.slug);

  if (!product) return <h1>Loading</h1>;

  const { images } = product;

  return (
    <div className="w-full max-w-wrapper lg:py-7 flex flex-col gap-10">
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-15">
        {images && <Gallery images={product.images ?? []} />}
        <ProductInfo product={product} />
      </section>
      <section className="flex flex-col items-center gap-15">
        <GridTitle
          subtitle="Favoritos de la temporada"
          title="Productos recomendados"
        />
        {/* <ProductGrid /> */}
      </section>
      <Banner content={BANNER_CONTENT} />
    </div>
  );
};

export default ProductDetail;
