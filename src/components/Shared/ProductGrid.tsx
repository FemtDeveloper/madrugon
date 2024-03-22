import { MOCK_PRODUCT } from "@/mocks/products";
import ProductCard from "./ProductCard";

interface Props {
  filterWord?: string;
}

const ProductGrid = ({ filterWord = "all" }: Props) => {
  const productArray = Array.from({ length: 40 }, () => MOCK_PRODUCT);
  return (
    <div className="w-full max-w-wrapper flex items-center justify-center h-full flex-wrap gap-3 lg:gap-6">
      {productArray.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
