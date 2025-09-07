"use client";

import clsx from "clsx";
import LoadingDots from "./LoadingDots";

interface Props {
  btnTitle: string;
  size?: "xLarge" | "large" | "medium" | "small";
  variant?: "transparent" | "filled";
  btnType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({
  btnTitle,
  size = "medium",
  btnType = "button",
  onClick = () => null,
  loading = false,
  variant = "filled",
  disabled = false,
}: Props) => {
  const getWidth = () => {
    if (size === "xLarge") return "w-[310px] py-3 lg:py-4";
    if (size === "large") return "w-[270px] py-3 lg:py-4";
    if (size === "medium") return "w-[197px] py-3 lg:py-4";
    return "w-[140px] py-2 px-3";
  };

  return (
    <button
      aria-label={`Botón que dirige a la sección ${btnTitle}`}
      name="Botón"
      type={btnType}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "rounded-lg z-10 flex justify-center items-center px-10 font-medium hover:shadow-xs hover:shadow-black hover:-translate-y-[2px] transition duration-300",
        getWidth(),
        (size === "large" || size === "xLarge") && "b1",
        variant === "filled"
          ? " bg-title text-white"
          : "bg-white text-black border",
        (disabled || loading) &&
          "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
      )}
    >
      {loading ? <LoadingDots /> : btnTitle}
    </button>
  );
};

export default CustomButton;
