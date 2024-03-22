"use client";
import { useState } from "react";
import { HeartIcon, HeartIconFilled } from "../Icons";

const FavoriteStar = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button
      className="h-8 w-8 bg-blur rounded-full grid place-items-center"
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? <HeartIconFilled /> : <HeartIcon />}
    </button>
  );
};

export default FavoriteStar;
