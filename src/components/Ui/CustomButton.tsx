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
      className={clsx(
        "rounded-full z-10 flex justify-center items-center px-10 font-medium hover:shadow-sm hover:shadow-black hover:-translate-y-[2px] transition duration-300",
        getWidth(),
        (size === "large" || size === "xLarge") && "b1",
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
