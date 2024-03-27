import { Dispatch } from "react";
import clsx from "clsx";
import { ChevronLeftIcon } from "../Icons";
import LoginMobile from "./LoginMobile";
import { useSidebarStore } from "@/stores";

interface Props {
  isOpen: boolean;
  setIsOpen?: Dispatch<boolean>;
}

const AuthMobile = ({ isOpen, setIsOpen }: Props) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  return (
    <div
      className={clsx(
        "flex flex-col relative items-center gap-8 w-full h-full z-40 transition-all duration-300 bg-white",
        isOpen ? "translate-x-0" : " translate-x-[110%]"
      )}
    >
      <button
        className="bg-title absolute rounded-full p-1 left-0"
        onClick={setIsSidebarOpen}
      >
        <ChevronLeftIcon color="white" />
      </button>
      <LoginMobile isOpen />
    </div>
  );
};

export default AuthMobile;
