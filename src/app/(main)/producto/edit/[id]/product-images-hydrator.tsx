"use client";

import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";

export default function ProductImagesHydrator({
  images,
}: {
  images: string[];
}) {
  const setImages = useProductStore((s) => s.setImages);
  useEffect(() => {
    if (images && images.length > 0) {
      setImages(images);
    }
  }, [images, setImages]);
  return null;
}
