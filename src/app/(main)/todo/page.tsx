import { ProductGrid } from "@/components/Shared";
import { getAllProducts } from "@/services/products";

const TodoPage = async () => {
  const products = await getAllProducts();
  return (
    <section className="flex flex-col w-full gap-8 h-full max-w-wrapper p-4 xl:px-0">
      <h1 className="h2_bold text-start font-semibold">Todos los productos</h1>
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

export default TodoPage;
