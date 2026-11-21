import { Gallery, ProductInfo } from "./components";

import { BANNER_CONTENT } from "@/mocks";
import { Banner } from "@/components/Banner";
import type { Database } from "../../../../../database.types";
import { GridTitle } from "@/components/Shared";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getProductBySlug } from "@/services/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// Dedupe the product query between generateMetadata and the page render
const getProduct = cache(getProductBySlug);

export const revalidate = 3600;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("products").select("slug");

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    const products = (data ?? []) as Array<
      Pick<Database["public"]["Tables"]["products"]["Row"], "slug">
    >;

    if (!products.length) return [];

    return products.map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.error("generateStaticParams (products) failed:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Producto no encontrado | Madrugón Mayorista" };

  const title = `${product.name} | Madrugón Mayorista`;
  const description = product.description ?? undefined;
  const image = product.images?.[0];
  return {
    title,
    description,
    openGraph: { title, description, images: image ? [image] : undefined },
  };
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolved = await params;
  const product = await getProduct(resolved.slug);

  if (!product) notFound();

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
