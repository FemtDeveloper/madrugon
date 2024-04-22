import { MOCK_PRODUCT } from "@/mocks/products";
import ProductCard from "./ProductCard";

interface Props {
  filterWord?: string;
  products: Product[];
}

const ProductGrid = ({ filterWord = "all", products }: Props) => {
  return (
    <div className="w-full max-w-wrapper flex items-center justify-center h-full flex-wrap gap-3 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
