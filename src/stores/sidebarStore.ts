import { create } from "zustand";

type SidebarType = "auth" | "menu";

type SidebarStore = {
  isSidebarOpen: boolean;
  sidebarType: SidebarType;
  setIsSidebarOpen: () => void;
  setSidebarType: (sidebarType: SidebarType) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: false,
  sidebarType: "menu",
  setIsSidebarOpen: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  setSidebarType: (sidebarType: SidebarType) => set({ sidebarType }),
}));
