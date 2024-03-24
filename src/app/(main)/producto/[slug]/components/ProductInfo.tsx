import { formatCurrency } from "@/utils";
import Sizes from "./Sizes";
import Prices from "./Prices";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  const {
    brand,
    category,
    description,
    discount_percentage,
    regular_price,
    gender,
    name,
    price,
    sizes,
  } = product;

  return (
    <div className="infoContainer flex flex-col w-full gap-4 px-4 lg:px-0">
      <h1 className="b1 lg:h2 text-title">{name}</h1>
      <h1 className="b2 text-p-1">{description}</h1>
      <h1 className="b2 text-p-1 font-bold underline">
        {brand?.toUpperCase()}
      </h1>
      <Prices
        discount_percentage={discount_percentage}
        price={price}
        regular_price={regular_price}
      />
      <div className="flex justify-between items-center">
        <Sizes sizes={sizes} />
        <div className="flex gap-10">
          <div>
            <h2 className="text-xl font-bold tracking-wider">Categoría</h2>
            <h2 className="text-xl  tracking-wider">{category}</h2>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wider">Genero</h2>
            <h2 className="text-xl  tracking-wider">{gender}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
