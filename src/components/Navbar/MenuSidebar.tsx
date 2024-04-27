import { SetStateAction } from "react";

import { genderMapping, GENDERS } from "@/utils/menu";

import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

interface Props {
  setIsSidebarOpen: () => void;
  setGender: (value: SetStateAction<string>) => void;
  setIsCategorySidebarOpen: (value: SetStateAction<boolean>) => void;
}

const MenuSidebar = ({
  setIsSidebarOpen,
  setGender,
  setIsCategorySidebarOpen,
}: Props) => {
  return (
    <div className="flex flex-col items-start gap-6 absolute w-full">
      <button className="bg-title rounded-full p-1" onClick={setIsSidebarOpen}>
        <ChevronLeftIcon color="white" />
      </button>{" "}
      <div className="flex flex-col gap-12 w-full">
        <h2 className="h2 text-center font-medium">Menú</h2>
        <div className="flex flex-col gap-6">
          {GENDERS.map((gender, i) => (
            <button
              key={i}
              className="w-full flex justify-between"
              onClick={() => {
                setGender(genderMapping[gender]);
                setIsCategorySidebarOpen(true);
              }}
            >
              <p>{gender}</p>
              <ChevronRightIcon />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
