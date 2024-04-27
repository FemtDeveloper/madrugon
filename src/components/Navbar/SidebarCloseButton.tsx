"use client";
import { useSidebarStore } from "@/stores";

import { MenuIcon } from "../Icons";


const SidebarCloseButton = () => {
  const setSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  return (
    <button onClick={setSidebarOpen} className="flex lg:hidden items-center">
      <MenuIcon />
    </button>
  );
};

export default SidebarCloseButton;
