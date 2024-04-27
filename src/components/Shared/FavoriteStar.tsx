"use client";
import { useState } from "react";

import { addFavorite } from "@/services/products";
import { useUserStore } from "@/stores";

import { HeartIcon, HeartIconFilled } from "../Icons";


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
    >
      {isFavorite ? <HeartIconFilled /> : <HeartIcon />}
    </button>
  );
};

export default FavoriteStar;
