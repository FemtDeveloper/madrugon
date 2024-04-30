import ProductCard from "./ProductCard";

interface Props {
  filterWord?: string;
  products: Product[];
  isEditable?: boolean;
}

const ProductGrid = ({
  filterWord = "all",
  products,
  isEditable = false,
}: Props) => {
  return (
    <div className="w-full max-w-wrapper flex items-center justify-center h-full flex-wrap gap-3 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} isEditable={isEditable} />
      ))}
    </div>
  );
};

export default ProductGrid;
