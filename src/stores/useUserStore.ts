import { create } from "zustand";

interface userStoreProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<userStoreProps>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
