"use client";

import Link from "next/link";
import clsx from "clsx";

interface Props {
  path?: string;
  btnTitle: string;
  size?: "xLarge" | "large" | "medium" | "small";
  variant?: "transparent" | "filled";
  type?: "button" | "link";
  btnType?: "button" | "submit" | "reset" | undefined;
  otherTab?: boolean;
  onClick?: () => void;
}

const CustomLink = ({
  path,
  btnTitle,
  size = "medium",
  otherTab = false,
  onClick = () => null,
  variant = "filled",
}: Props) => {
  const getWidth = () => {
    if (size === "xLarge") return "w-[310px] py-3 px-4";
    if (size === "large") return "w-[270px] py-3.5 px-5";
    if (size === "medium") return "w-[197px] py-3 px-4";
    return "w-[140px]";
  };

  return (
    <Link
      href={path ?? "/"}
      target={otherTab ? "blank_" : "_self"}
      aria-label={`Botón que dirige a la sección ${btnTitle}`}
      onClick={onClick}
      className={clsx(
        "rounded-full max-w-[310px] z-10 flex justify-center items-center px-10 font-medium hover:shadow-sm hover:shadow-black hover:-translate-y-[2px] transition duration-300",
        getWidth(),
        size === "large" && "b1",
        variant === "filled"
          ? " bg-title text-white"
          : "bg-white text-black border"
      )}
    >
      {btnTitle}
    </Link>
  );
};

export default CustomLink;
