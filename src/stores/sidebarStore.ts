import { create } from "zustand";

type SidebarType = "auth" | "menu";

type SidebarStore = {
  isSidebarOpen: boolean;
  sidebarType: SidebarType;
  setIsSidebarOpen: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: false,
  sidebarType: "menu",
  setIsSidebarOpen: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
}));
