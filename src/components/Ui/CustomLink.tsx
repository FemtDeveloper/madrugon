import clsx from "clsx";
import Link from "next/link";

interface Props {
  path: string;
  btnTitle: string;
  variant?: "xLarge" | "large" | "medium" | "small";
  otherTab?: boolean;
}

const CustomLink = ({
  path,
  btnTitle,
  variant = "medium",
  otherTab = false,
}: Props) => {
  const getWidth = () => {
    if (variant === "xLarge") return "w-[310px]";
    if (variant === "large") return "w-[270px]";
    if (variant === "medium") return "w-[197px]";
    return "w-[140px]";
  };

  return (
    <Link
      href={path}
      target={otherTab ? "blank_" : "_self"}
      aria-label={`Botón que dirige a la sección ${btnTitle}`}
      className={clsx(
        "rounded-full bg-title text-white py-3 lg:py-4 z-10 flex justify-center items-center px-10",
        getWidth(),
        variant === "large" && "b1"
      )}
    >
      {btnTitle}
    </Link>
  );
};

export default CustomLink;
