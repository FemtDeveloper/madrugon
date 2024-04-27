import clsx from "clsx";

import { ChevronLeftIcon } from "../Icons";

const AuthMobile = () => {
  return (
    <div
      className={clsx(
        "flex flex-col relative items-center gap-8 w-full h-full z-40 transition-all duration-300 bg-white"
      )}
    >
      <button className="bg-title absolute rounded-full p-1 left-0 z-20">
        <ChevronLeftIcon color="white" />
      </button>
    </div>
  );
};

export default AuthMobile;
