import { AddProductForm, ImagesUpload } from "@/components/Forms";
import { getProductBy } from "@/services/products";

const EditarProductoPorIdPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const product = await getProductBy("id", params.id);

  if (!product) {
    return null;
  }

  return (
    <div className="w-full max-w-wrapper flex py-12">
      <ImagesUpload images={product.images ?? []} />
      <AddProductForm product={product} />
    </div>
  );
};

export default EditarProductoPorIdPage;
