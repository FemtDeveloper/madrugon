import Sizes from "./Sizes";
import Prices from "./Prices";
import { CustomLink } from "@/components/Ui";
import Categories from "./Categories";

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
    <div className="infoContainer flex flex-col w-full lg:w-[55%] gap-3 px-4 lg:px-0 pb-4">
      <h1 className="text-2xl font-bold lg:h2 text-title">{name}</h1>
      <h2 className="b2 text-p-1">{description}</h2>
      <h2 className="b2 text-p-1 font-bold underline">
        {brand?.toUpperCase()}
      </h2>
      <Prices
        discount_percentage={discount_percentage}
        price={price}
        regular_price={regular_price}
      />
      <CustomLink
        path={`https://wa.me/57${3507107300}`}
        btnTitle="Contactar al vendedor"
        size="xLarge"
        otherTab
      />
      <div className="flex flex-col justify-between gap-7">
        <Sizes sizes={sizes} />
        <Categories category={category!} gender={gender!} />
      </div>
    </div>
  );
};

export default ProductInfo;
