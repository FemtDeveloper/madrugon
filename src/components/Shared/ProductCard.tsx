import { CustomLabel } from "../Ui";
import FavoriteStar from "./FavoriteStar";
import Image from "next/image";
import Link from "next/link";
import RedirectButton from "./RedirectButton";
import { formatCurrency } from "@/utils";

interface Props {
  product: Product;
  isEditable?: boolean;
}

const ProductCard = async ({ product, isEditable = false }: Props) => {
  const { brand, category, name, images, price, regular_price, slug, id } =
    product;

  // Calculate discount if not provided
  const calculatedDiscount =
    regular_price && price
      ? Math.round(((regular_price - price) / regular_price) * 100)
      : 0;

  const hasDiscount = calculatedDiscount > 0;

  return (
    <article className="product_card w-full h-full max-h-96 group max-w-40 lg:max-w-60 flex flex-col bg-white rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden">
      <figure className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {hasDiscount && (
          <div className="absolute z-20 top-2 left-2 lg:top-3 lg:left-3">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
              -{calculatedDiscount}%
            </div>
          </div>
        )}

        <div className="absolute z-20 top-2 right-2 lg:top-3 lg:right-3 backdrop-blur-sm bg-white/20 rounded-full p-0.5">
          <FavoriteStar productId={String(id)} />
        </div>

        {isEditable && (
          <div className="absolute z-20 top-2 left-2 backdrop-blur-md bg-black/10 rounded-full">
            <RedirectButton url={`/producto/edit/${product.id}`} />
          </div>
        )}

        <Link
          href={`/producto/${slug}`}
          aria-label={`Ver producto ${name}`}
          className="block relative h-[180px] lg:h-[280px]"
        >
          <Image
            src={images?.[0] || "/placeholder-image.jpg"}
            alt={name || "Producto"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 160px, 240px"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
            <div className="backdrop-blur-md bg-white/30 px-2 py-1 rounded-full shadow-lg">
              <CustomLabel title="Ver producto" variant="small" />
            </div>
          </div>
        </Link>
      </figure>

      <div className="info_product flex flex-col p-2 lg:p-3 space-y-0.5 lg:space-y-1.5 bg-white">
        {category && (
          <div className="flex justify-center">
            <Link
              href={`/categorias/${category
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              {category}
            </Link>
          </div>
        )}

        <h3 className="text-xs lg:text-sm text-gray-900 text-center font-semibold leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[2rem] lg:min-h-[1.5rem] flex items-center justify-center">
          {name}
        </h3>

        <div className="price_section flex flex-col items-center space-y-0.5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg lg:text-xl font-bold text-gray-900">
              ${formatCurrency(price!)}
            </span>
            {regular_price && regular_price !== price && (
              <span className="text-xs lg:text-sm line-through text-gray-400">
                ${formatCurrency(regular_price)}
              </span>
            )}
          </div>

          {hasDiscount && regular_price ? (
            <div className="bg-green-50 px-2 py-0.5 rounded-full">
              <span className="text-xs text-green-700 font-medium">
                Ahorra ${formatCurrency(regular_price - price!)}
              </span>
            </div>
          ) : (
            <div className="h-6" />
          )}
        </div>

        {brand && (
          <div className="flex justify-center">
            <Link
              href={`/marcas/${brand.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-xs lg:text-sm text-gray-600 hover:text-blue-600 font-medium relative group/brand transition-colors duration-300"
              aria-label={`Ver productos de la marca ${brand}`}
            >
              <span className="relative z-10">{brand}</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-800 transform scale-x-0 group-hover/brand:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>
        )}

        <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-1">
            <div
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-1.5 h-1.5 bg-gray-800 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
