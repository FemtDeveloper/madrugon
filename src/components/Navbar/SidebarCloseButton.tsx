"use client";
import { MenuIcon } from "../Icons";
import { useSidebarStore } from "@/stores";

const SidebarCloseButton = () => {
  const setSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  return (
    <button onClick={setSidebarOpen} className="flex lg:hidden items-center">
      <MenuIcon />
    </button>
  );
};

export default SidebarCloseButton;
