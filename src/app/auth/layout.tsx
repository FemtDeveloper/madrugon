import { ChevronLeftIcon } from "@/components/Icons";
import { GoBackButton } from "@/components/Ui";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-dvw h-screen p-6 md:p-0">
      <div className="w-full relative flex items-center justify-center md:w-2/5">
        <GoBackButton />
        {children}
      </div>
      <figure className="hidden md:flex bg-primaryOrange md:w-3/5"></figure>
    </div>
  );
};

export default layout;
