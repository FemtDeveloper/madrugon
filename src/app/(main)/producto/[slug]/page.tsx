import { supabase } from "@/lib/supabase";
import { Gallery, ProductInfo } from "./components";
import { getProductBySlug } from "@/services/products";

export async function generateStaticParams() {
  const { data, error } = await supabase.from("products").select("*");

  if (!data) {
    return;
  }

  return data.map((product) => {
    slug: product.slug;
  });
}

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug(params.slug);

  if (!product) return <h1>Loading</h1>;

  const { images } = product;

  return (
    <div className="w-full max-w-wrapper lg:py-7">
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-15">
        {images && <Gallery images={product.images ?? []} />}
        <ProductInfo product={product} />
      </section>
    </div>
  );
};

export default ProductDetail;
