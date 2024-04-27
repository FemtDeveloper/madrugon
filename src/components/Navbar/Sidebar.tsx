"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useSidebarStore } from "@/stores";

import { AuthMobile } from "../Auth";

import CategorySidebar from "./CategorySidebar";
import MenuSidebar from "./MenuSidebar";

const Sidebar = () => {
  const { isSidebarOpen, sidebarType, setIsSidebarOpen } = useSidebarStore(
    useShallow((state) => ({
      isSidebarOpen: state.isSidebarOpen,
      sidebarType: state.sidebarType,
      setIsSidebarOpen: state.setIsSidebarOpen,
    }))
  );
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const [gender, setGender] = useState("Hombre");

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <div
      className={clsx(
        "sidebar h-dvh bg-white fixed w-screen transition-transform  duration-300 top-0 z-30 p-6",
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative h-full">
        {sidebarType === "menu" ? (
          <MenuSidebar
            setGender={setGender}
            setIsCategorySidebarOpen={setIsCategorySidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ) : (
          <AuthMobile />
        )}
        <CategorySidebar
          isOpen={isCategorySidebarOpen}
          setIsOpen={setIsCategorySidebarOpen}
          gender={gender as Gender}
        />
      </div>
    </div>
  );
};

export default Sidebar;
