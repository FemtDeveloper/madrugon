import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/utils";

import { CustomLabel } from "../Ui";

import FavoriteStar from "./FavoriteStar";

interface Props {
  product: Product;
}

const ProductCard = async ({ product }: Props) => {
  const {
    brand,
    // category,
    name,
    images,
    price,
    regular_price,
    // discount_percentage,
    slug,
    id,
  } = product;

  return (
    <article className="product_card max-w-44 lg:max-w-72 flex flex-col items-center gap-3 lg:gap-6">
      <figure className="group relative h-full overflow-hidden rounded-2xl lg:rounded-3xl">
        <div className="favorite_container absolute z-10 top-3 right-3 lg:top-4 lg:right-4">
          <FavoriteStar productId={String(id)} />
        </div>
        <Link
          href={`/producto/${slug}`}
          aria-label="Enlace que dirige al producto"
        >
          <Image
            src={images![0]}
            alt={name!}
            width={286}
            height={354}
            className="rounded-2xl lg:rounded-3xl group-hover:scale-110 object-cover transition-transform h-[240px] md:h-[420px]"
          />

          <div className="favorite_container absolute z-10 top-1/2 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <CustomLabel title="Ver producto" variant="small" />
          </div>
        </Link>
      </figure>
      <div className="info_product flex flex-col items-center ">
        <p className="b3 lg:b2 text-title">{name}</p>
        <div className="price b3 lg:b2 text-p-1 flex justify-center w-full gap-4 lg:gap-5">
          <p className="">$ {formatCurrency(price!)}</p>
          <p className="line-through">$ {formatCurrency(regular_price!)}</p>
        </div>
        <Link
          href={`/marcas/${brand?.toLocaleLowerCase()}`}
          className="b3 lg:b2 underline-offset-1 underline text-p-1"
        >
          {brand}
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
