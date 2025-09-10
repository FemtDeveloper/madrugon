"use client";

import { HeartIcon, HeartIconFilled } from "../Icons";

import { addFavorite } from "@/services/products";
import { useState } from "react";
import { useUserStore } from "@/stores";

interface Props {
  productId: string;
}

const FavoriteStar = ({ productId }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useUserStore((state) => state.user);
  const handleFavoriteProduct = () => {
    if (!user) return;
    addFavorite(productId, user.id);
    setIsFavorite(!isFavorite);
  };
  return (
    <button
      className="h-8 w-8 bg-blur rounded-full grid place-items-center"
      onClick={handleFavoriteProduct}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isFavorite ? <HeartIconFilled /> : <HeartIcon />}
    </button>
  );
};

export default FavoriteStar;
