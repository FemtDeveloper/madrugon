import { getProductBy } from "@/services/products";

const EditarProductoPorIdPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const product = await getProductBy("id", params.id);

  return <div></div>;
};

export default EditarProductoPorIdPage;
