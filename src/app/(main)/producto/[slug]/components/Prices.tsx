import { formatCurrency } from "@/utils";

interface Props {
  discount_percentage: number | null;
  regular_price: number | null;
  price: number | null;
}

const Prices = ({ discount_percentage, regular_price, price }: Props) => {
  return (
    <div className="priceContainer flex gap-4 items-center">
      <h3 className="text-xl font-bold tracking-normal">
        $ {formatCurrency(discount_percentage ? price! : regular_price!)}
      </h3>
      {discount_percentage! > 0 && (
        <h3 className="text-xl font-bold tracking-normal line-through text-p-1">
          $ {formatCurrency(regular_price!)}
        </h3>
      )}
      {discount_percentage! > 0 && (
        <span className="bg-title py-2 px-3 text-white rounded-xl">
          {discount_percentage}% OFF
        </span>
      )}
    </div>
  );
};

export default Prices;
