import { formatCurrency } from "@/utils";

interface Props {
  // accept either legacy or canonical fields
  discount_percentage?: number | null;
  regular_price?: number | null;
  price?: number | null;
  base_price?: number | null;
  compare_price?: number | null;
}

const Prices = ({
  discount_percentage = 0,
  regular_price,
  price,
  base_price,
  compare_price,
}: Props) => {
  // prefer canonical names if present
  const finalPrice = base_price ?? price ?? null;
  const finalRegular = compare_price ?? regular_price ?? null;

  return (
    <div className="priceContainer flex gap-4 items-center">
      <h3 className="text-xl font-bold tracking-normal">
        ${" "}
        {formatCurrency(
          discount_percentage ? finalPrice ?? 0 : finalRegular ?? 0
        )}
      </h3>
      {discount_percentage &&
        discount_percentage > 0 &&
        finalRegular != null && (
          <h3 className="text-xl font-bold tracking-normal line-through text-p-1">
            $ {formatCurrency(finalRegular)}
          </h3>
        )}
      {discount_percentage && discount_percentage > 0 && (
        <span className="bg-title py-2 px-3 text-white rounded-xl">
          {discount_percentage}% OFF
        </span>
      )}
    </div>
  );
};

export default Prices;
