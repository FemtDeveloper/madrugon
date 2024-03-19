import clsx from "clsx";
import Link from "next/link";

interface Props {
  path: string;
  btnTitle: string;
  variant?: "large" | "medium" | "small";
}

const CustomLink = ({ path, btnTitle, variant = "medium" }: Props) => {
  const getWidth = () => {
    if (variant === "large") return "w-[270px]";
    if (variant === "medium") return "w-[197px]";
    return "w-[140px]";
  };

  return (
    <Link
      href={path}
      aria-label={`Botón que dirige a la sección ${btnTitle}`}
      className={clsx(
        "rounded-full bg-black text-white py-3 lg:py-4 z-10 flex justify-center items-center px-10",
        getWidth()
      )}
    >
      {btnTitle}
    </Link>
  );
};

export default CustomLink;
