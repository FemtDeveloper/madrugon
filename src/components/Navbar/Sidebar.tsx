"use client";
import clsx from "clsx";
import { useSidebarStore } from "@/stores";
import { useState } from "react";
import { genderMapping, GENDERS } from "@/utils/menu";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import { useShallow } from "zustand/react/shallow";
import CategorySidebar from "./CategorySidebar";

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

  console.log({ isSidebarOpen });

  return (
    <div
      className={clsx(
        "sidebar h-dvh bg-white fixed w-screen transition-transform  duration-300 top-0 z-30 p-6",
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative h-full">
        {sidebarType === "menu" ? (
          <div className="flex flex-col items-start gap-6 absolute w-full">
            <button
              className="bg-title rounded-full p-1"
              onClick={setIsSidebarOpen}
            >
              <ChevronLeftIcon color="white" />
            </button>{" "}
            <div className="flex flex-col gap-12 w-full">
              <h2 className="h2 text-center font-medium">Menú</h2>
              <div className="flex flex-col gap-6">
                {GENDERS.map((gender, i) => (
                  <div key={i} className="w-full flex justify-between">
                    <p>{gender}</p>
                    <button
                      onClick={() => {
                        setGender(genderMapping[gender]);
                        setIsCategorySidebarOpen(true);
                      }}
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h1>hola</h1>
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
