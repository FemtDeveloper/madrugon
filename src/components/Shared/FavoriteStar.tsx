"use client";

import { HeartIcon, HeartIconFilled } from "../Icons";
import { useEffect, useState } from "react";

import { addFavorite } from "@/services/products";
import { createClient } from "@/utils";
import { useUserStore } from "@/stores";

interface Props {
  productId: string;
}

const FavoriteStar = ({ productId }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useUserStore((state) => state.user);

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      productId
    );

  const handleFavoriteProduct = async () => {
    // If not logged, ignore for now (could open login modal)
    if (!user) return;

    // For mock products (non-UUID), store a fake mapping locally so UI can toggle without DB writes
    if (!isUuid) {
      const key = `mock-favs:${user.id}`;
      const raw =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      const list: string[] = raw ? JSON.parse(raw) : [];
      const exists = list.includes(productId);
      const next = exists
        ? list.filter((id) => id !== productId)
        : [...list, productId];
      if (typeof window !== "undefined")
        window.localStorage.setItem(key, JSON.stringify(next));
      setIsFavorite(!exists);
      return;
    }

    try {
      const res = await addFavorite(productId, user.id);
      if (res.status === "added") setIsFavorite(true);
      else if (res.status === "removed") setIsFavorite(false);
      // skipped shouldn't happen here because UUID already validated
    } catch (e) {
      // keep UI state unchanged on error
      console.error(e);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (!isUuid) {
      const key = `mock-favs:${user.id}`;
      const raw =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      const list: string[] = raw ? JSON.parse(raw) : [];
      setIsFavorite(list.includes(productId));
      return;
    }
    (async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("wishlists")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_id", productId)
          .maybeSingle();
        if (!error) setIsFavorite(!!data);
      } catch {
        // ignore
      }
    })();
  }, [user, productId, isUuid]);
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
