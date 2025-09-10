"use client";

import { MenuIcon } from "../Icons";
import { useShallow } from "zustand/react/shallow";
import { useSidebarStore } from "@/stores";

const SidebarMenuButton = () => {
  const { setIsSidebarOpen, setSidebarType } = useSidebarStore(
    useShallow((state) => ({
      setIsSidebarOpen: state.setIsSidebarOpen,
      setSidebarType: state.setSidebarType,
    }))
  );
  const handleOpenSidebar = () => {
    setIsSidebarOpen();
    setSidebarType("menu");
  };
  return (
    <button
      onClick={handleOpenSidebar}
      className="flex lg:hidden items-center"
      aria-label="Abrir menú de navegación"
      title="Abrir menú de navegación"
    >
      <MenuIcon />
    </button>
  );
};

export default SidebarMenuButton;
