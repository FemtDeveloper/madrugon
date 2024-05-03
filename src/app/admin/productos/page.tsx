import { ProductGrid } from "@/components/Shared";
import { getAllProducts } from "@/services/products";

const ProductosAdminPage = async () => {
  const products = await getAllProducts();
  return (
    <div className="p-4">
      {products?.length ? (
        <ProductGrid products={products} isEditable />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes favoritos en este momento</h2>
        </div>
      )}
    </div>
  );
};

export default ProductosAdminPage;
