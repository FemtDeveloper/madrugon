"use client";
import { useResponsive } from "@/hooks";
import { SearchIcon } from "../Icons";

const Searchbar = () => {
  const { isMobile } = useResponsive();
  return (
    <div className="searchbar border border-neutral-300 w-full rounded-lg my-3 max-w-[193px] lg:max-w-[520px] h-8 lg:h-14 p-2 lg:p-4 flex items-center gap-3">
      <SearchIcon size={isMobile ? 16 : undefined} />
      <input
        type="text"
        placeholder="Buscar productos..."
        className="l1 lg:b1 focus:outline-none max-w-36 lg:max-w-max"
      />
    </div>
  );
};

export default Searchbar;
