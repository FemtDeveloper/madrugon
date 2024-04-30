import { ProductGrid } from "@/components/Shared";
import { getProductsByGender } from "@/services/products";

const RematesPage = async () => {
  const products = await getProductsByGender("Remates");

  return (
    <section className="flex flex-col w-full gap-8 h-full max-w-wrapper p-4 xl:px-0">
      <h1 className="h2_bold text-start font-semibold">Remates</h1>
      {products?.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tenemos remates en este momento</h2>
        </div>
      )}
    </section>
  );
};

export default RematesPage;
