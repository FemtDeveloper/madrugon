import { ProductGrid } from "@/components/Shared";

interface Props {
  products: Product[];
}

const SearchResults = ({ products }: Props) => {
  return (
    <div>
      {products?.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="justify-center items-center flex">
          <h2 className="h2">No tienes favoritos en este momento</h2>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
