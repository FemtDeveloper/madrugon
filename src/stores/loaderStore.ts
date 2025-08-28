import { create } from "zustand";

export type LoaderSize = "sm" | "md" | "lg";

interface LoaderState {
  isOpen: boolean;
  size: LoaderSize;
  title?: string;
  openLoader: (options: { size?: LoaderSize; title?: string }) => void;
  closeLoader: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isOpen: false,
  size: "md",
  title: undefined,
  openLoader: ({ size = "md", title }) => set({ isOpen: true, size, title }),
  closeLoader: () => set({ isOpen: false, title: undefined }),
}));
