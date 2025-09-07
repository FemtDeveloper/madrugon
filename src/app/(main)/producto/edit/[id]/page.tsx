import { AddProductForm, ImagesUpload } from "@/components/Forms";

import { getProductById } from "@/services/products.server";
import ProductImagesHydrator from "./product-images-hydrator";

const EditarProductoPorIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolved = await params;

  const product = await getProductById(resolved.id);

  if (!product) {
    return null;
  }

  return (
    <div className="w-full max-w-wrapper flex flex-col md:flex-row py-12">
      <ProductImagesHydrator images={product.images ?? []} />
      <ImagesUpload images={product.images ?? []} />
      <AddProductForm product={product} />
    </div>
  );
};

export default EditarProductoPorIdPage;
