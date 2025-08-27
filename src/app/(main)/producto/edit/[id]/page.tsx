import { AddProductForm, ImagesUpload } from "@/components/Forms";
import { getProductBy } from "@/services/products";

const EditarProductoPorIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolved = await params;
  const product = await getProductBy("id", resolved.id);

  if (!product) {
    return null;
  }

  return (
    <div className="w-full max-w-wrapper flex flex-col md:flex-row py-12">
      <ImagesUpload images={product.images ?? []} />
      <AddProductForm product={product} />
    </div>
  );
};

export default EditarProductoPorIdPage;
