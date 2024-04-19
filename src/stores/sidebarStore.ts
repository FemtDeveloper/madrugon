import { create } from "zustand";

type SidebarType = "auth" | "menu" | "profile";

type SidebarStore = {
  isSidebarOpen: boolean;
  isProfileSidebarOpen: boolean;

  sidebarType: SidebarType;
  setIsSidebarOpen: () => void;
  setSidebarType: (sidebarType: SidebarType) => void;
  setIsProfileSidebarOpen: (isProfileSidebarOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: false,
  isProfileSidebarOpen: false,
  sidebarType: "menu",
  setIsSidebarOpen: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  setSidebarType: (sidebarType: SidebarType) => set({ sidebarType }),
  setIsProfileSidebarOpen: (isProfileSidebarOpen: boolean) =>
    set({ isProfileSidebarOpen }),
}));
