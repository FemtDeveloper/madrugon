"use client";
import { useShallow } from "zustand/react/shallow";
import { MenuIcon } from "../Icons";
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
    <button onClick={handleOpenSidebar} className="flex lg:hidden items-center">
      <MenuIcon />
    </button>
  );
};

export default SidebarMenuButton;
