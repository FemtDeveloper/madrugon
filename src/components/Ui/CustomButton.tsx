"use client";
import clsx from "clsx";
import Link from "next/link";
import LoadingDots from "./LoadingDots";

interface Props {
  btnTitle: string;
  size?: "xLarge" | "large" | "medium" | "small";
  variant?: "transparent" | "filled";
  btnType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  loading?: boolean;
}

const CustomButton = ({
  btnTitle,
  size = "medium",
  btnType = "button",
  onClick = () => null,
  loading = false,
  variant = "filled",
}: Props) => {
  const getWidth = () => {
    if (size === "xLarge") return "w-[310px]";
    if (size === "large") return "w-[270px]";
    if (size === "medium") return "w-[197px]";
    return "w-[140px]";
  };

  return (
    <button
      aria-label={`Botón que dirige a la sección ${btnTitle}`}
      name="Botón"
      type={btnType}
      onClick={onClick}
      className={clsx(
        "rounded-full py-3 lg:py-4 z-10 flex justify-center items-center px-10 font-bold",
        getWidth(),
        size === "large" && "b1",
        variant === "filled"
          ? " bg-title text-white"
          : "bg-white text-black border"
      )}
    >
      {loading ? <LoadingDots /> : btnTitle}
    </button>
  );
};

export default CustomButton;
