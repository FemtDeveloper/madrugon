import { Dispatch, useState } from "react";
import clsx from "clsx";
import { ChevronLeftIcon } from "../Icons";
import LoginMobile from "./LoginMobile";
import { useSidebarStore } from "@/stores";
import SignupMobile from "./SIgnupMobile";

interface Props {
  isOpen: boolean;
  setIsOpen?: Dispatch<boolean>;
}

const AuthMobile = ({ isOpen, setIsOpen }: Props) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const [isRegisterScreenOpen, setIsRegisterScreenOpen] = useState(false);
  return (
    <div
      className={clsx(
        "flex flex-col relative items-center gap-8 w-full h-full z-40 transition-all duration-300 bg-white",
        isOpen ? "translate-x-0" : " translate-x-[110%]"
      )}
    >
      <button
        className="bg-title absolute rounded-full p-1 left-0 z-20"
        onClick={setIsSidebarOpen}
      >
        <ChevronLeftIcon color="white" />
      </button>
      <div className="h-full w-full">
        <LoginMobile isOpen setIsRegisterScreenOpen={setIsRegisterScreenOpen} />
        <SignupMobile
          isOpen={isRegisterScreenOpen}
          setIsRegisterScreenOpen={setIsRegisterScreenOpen}
        />
      </div>
    </div>
  );
};

export default AuthMobile;
