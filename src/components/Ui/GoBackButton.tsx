"use client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "../Icons";

const GoBackButton = () => {
  const { back } = useRouter();
  return (
    <button
      className="bg-title absolute rounded-full p-1 top-0 md:top-6 md:left-6 left-0 z-20 hover:shadow-sm hover:shadow-black hover:-translate-y-[2px] transition duration-300"
      onClick={back}
    >
      <ChevronLeftIcon color="white" />
    </button>
  );
};

export default GoBackButton;
