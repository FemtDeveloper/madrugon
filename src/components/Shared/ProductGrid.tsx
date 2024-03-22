import { MOCK_PRODUCT } from "@/mocks/products";
import ProductCard from "./ProductCard";

interface Props {
  filterWord?: string;
}

const ProductGrid = ({ filterWord = "all" }: Props) => {
  return (
    <div className="w-full max-w-wrapper flex items-center h-full">
      <ProductCard product={MOCK_PRODUCT} />
    </div>
  );
};

export default ProductGrid;
