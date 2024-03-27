"use client";
import { Dispatch, useState } from "react";
import { ChevronLeftIcon } from "../Icons";
import clsx from "clsx";
import { CATEGORIES } from "@/utils/menu";
import { CustomLink } from "../Ui";
import { useSidebarStore } from "@/stores";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  gender: Gender;
}

const CategorySidebar = ({ isOpen, setIsOpen, gender }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);

  const { push } = useRouter();

  const handleSelect = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleApply = () => {
    setIsSidebarOpen();
    setIsOpen(false);
    setSelectedCategories([]);
    push(
      `/busqueda?genero=${gender.toLowerCase()}&categorias=${selectedCategories.join(
        ","
      )}`
    );
  };

  return (
    <div
      className={clsx(
        "flex flex-col absolute items-start gap-8 w-full h-full z-40 transition-all duration-300 bg-white",
        isOpen ? "translate-x-0" : " translate-x-[110%]"
      )}
    >
      <button
        className="bg-title rounded-full p-1"
        onClick={() => setIsOpen(false)}
      >
        <ChevronLeftIcon color="white" />
      </button>
      <div className="flex flex-col items-center gap-12 w-full px-2">
        <h2 className="h2 text-center font-medium">Categorías</h2>
        <div className="flex flex-col w-full gap-6">
          {CATEGORIES.map((category, i) => (
            <div key={i} className="w-full flex justify-between">
              <p>{category}</p>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleSelect(category)}
                className="appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white checked:bg-title"
              />
            </div>
          ))}
        </div>
        <CustomLink type="button" onClick={handleApply} btnTitle="Aplicar" />
      </div>
    </div>
  );
};

export default CategorySidebar;
