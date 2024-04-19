import { create } from "zustand";

interface userStoreProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useUserStore = create<userStoreProps>((set) => ({
  user: null,
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUser: (user: User | null) => set({ user }),
}));
