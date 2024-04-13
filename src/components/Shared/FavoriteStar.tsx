"use client";
import { useState } from "react";
import { HeartIcon, HeartIconFilled } from "../Icons";
import { useUserStore } from "@/stores";

const FavoriteStar = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useUserStore((state) => state.user);
  const handleFavoriteProduct = () => {
    if (!user) {
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <button
      className="h-8 w-8 bg-blur rounded-full grid place-items-center"
      onClick={(e) => {}}
    >
      {isFavorite ? <HeartIconFilled /> : <HeartIcon />}
    </button>
  );
};

export default FavoriteStar;
