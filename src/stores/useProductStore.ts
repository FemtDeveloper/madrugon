import { create } from "zustand";

interface ImageStoreProps {
  images: string[];
  sizes: string[];
  gender: Gender | null;
  setImages: (images: string[]) => void;
  setSizes: (images: string[]) => void;
  setGender: (gender: Gender) => void;
}

export const useProductStore = create<ImageStoreProps>((set) => ({
  images: [],
  sizes: [],
  gender: "Hombre",
  setImages: (images: string[]) => set({ images }),
  setSizes: (sizes: string[]) => set({ sizes }),
  setGender: (gender: Gender) => set({ gender }),
}));
