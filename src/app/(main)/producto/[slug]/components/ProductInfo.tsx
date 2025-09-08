import Categories from "./Categories";
import { CustomLink } from "@/components/Ui";
import Prices from "./Prices";
import Sizes from "./Sizes";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  const {
    brand,
    category,
    description,
    regular_price,
    gender,
    name,
    price,
    sizes,
  } = product;
  // safe numeric coercion (DB values may be strings)
  const toNumber = (v: any): number | null => {
    if (v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const finalPriceNum = toNumber((product as any).base_price ?? price ?? null);
  const finalRegularNum = toNumber(
    (product as any).compare_price ?? regular_price ?? null
  );

  let discountPercentage: number | null = null;
  if (
    finalRegularNum != null &&
    finalPriceNum != null &&
    finalRegularNum > 0 &&
    finalRegularNum > finalPriceNum
  ) {
    discountPercentage = Math.round(
      ((finalRegularNum - finalPriceNum) / finalRegularNum) * 100
    );
  }

  return (
    <div className="infoContainer flex flex-col w-full lg:w-[55%] gap-3 px-4 lg:px-0 pb-4">
      <h1 className="text-2xl font-bold lg:h2 text-title">{name}</h1>
      <h2 className="b2 text-p-1">{description}</h2>
      <h2 className="b2 text-p-1 font-bold underline">
        {brand?.toUpperCase()}
      </h2>
      <Prices
        price={price}
        regular_price={regular_price}
        discount_percentage={discountPercentage}
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
