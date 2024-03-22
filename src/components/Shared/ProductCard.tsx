import Image from "next/image";
import FavoriteStar from "./FavoriteStar";
import { formatCurrency } from "@/utils";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const {
    brand,
    category,
    name,
    images,
    price,
    discount_price,
    discount_percentage,
  } = product;

  return (
    <div className="product_card max-w-72 flex flex-col items-center h-full gap-3 lg:gap-6">
      <figure className="relative h-full">
        <Image
          src={images[0]}
          alt={name}
          width={286}
          height={354}
          className="rounded-2xl lg:rounded-3xl"
        />
        <div className="favorite_container absolute z-10 top-3 right-3 lg:top-4 lg:right-4">
          <FavoriteStar />
        </div>
      </figure>
      <div className="info_product flex flex-col items-center ">
        <p className="b3 lg:b2 text-title">{name}</p>
        <div className="price b3 lg:b2 text-p-1 flex justify-center w-full gap-5">
          <p className="">$ {formatCurrency(price)}</p>
          <p className="line-through">$ {formatCurrency(discount_price)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
