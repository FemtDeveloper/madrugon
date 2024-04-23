import { supabase } from "@/lib/supabase/client";
import { Gallery, ProductInfo } from "./components";
import { getProductBySlug } from "@/services/products";
import { GridTitle, ProductGrid } from "@/components/Shared";
import { Banner } from "@/components/Banner";
import { BANNER_CONTENT } from "@/mocks";

export const revalidate = 3600;

export async function generateStaticParams() {
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
}

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug(params.slug);

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
