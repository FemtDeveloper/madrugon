import { create } from "zustand";

interface ImageStoreProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export const useImageStore = create<ImageStoreProps>((set) => ({
  images: [],
  setImages: (images: string[]) => set({ images }),
}));
