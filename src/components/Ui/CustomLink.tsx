import clsx from "clsx";
import Link from "next/link";
import LoadingDots from "./LoadingDots";

interface Props {
  path?: string;
  btnTitle: string;
  size?: "xLarge" | "large" | "medium" | "small";
  variant?: "transparent" | "filled";
  type?: "button" | "link";
  btnType?: "button" | "submit" | "reset" | undefined;
  otherTab?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const CustomLink = ({
  path,
  btnTitle,
  size = "medium",
  otherTab = false,
  type = "link",
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

  if (type === "button")
    return (
      <button
        aria-label={`Botón que dirige a la sección ${btnTitle}`}
        name="Botón"
        type={btnType}
        onClick={onClick}
        className={clsx(
          "rounded-full py-3 lg:py-4 z-10 flex justify-center items-center px-10",
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

  return (
    <Link
      href={path ?? "/"}
      target={otherTab ? "blank_" : "_self"}
      aria-label={`Botón que dirige a la sección ${btnTitle}`}
      className={clsx(
        "rounded-full bg-title text-white py-3 lg:py-4 z-10 flex justify-center items-center px-10",
        getWidth(),
        size === "large" && "b1",
        variant === "filled"
          ? " bg-title text-white"
          : "bg-white text-black border font-bold"
      )}
    >
      {btnTitle}
    </Link>
  );
};

export default CustomLink;
