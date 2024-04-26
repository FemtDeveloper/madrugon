import { ProductGrid } from "@/components/Shared";
import { getProductByGender } from "@/services/products";

const MujerPage = async () => {
  const products = await getProductByGender("Mujer");

  // console.log({ products });

  return (
    <section className="flex flex-col w-full gap-8 h-full max-w-wrapper p-4 xl:px-0">
      <h1 className="h2_bold text-start font-semibold">Mujer</h1>
      {products?.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes favoritos en este momento</h2>
        </div>
      )}
    </section>
  );
};

export default MujerPage;
