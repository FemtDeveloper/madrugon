import clsx from "clsx";
import Link from "next/link";

interface Props {
  title: string;
  variant?: "large" | "medium" | "small";
}

const CustomLabel = ({ title, variant = "medium" }: Props) => {
  const getWidth = () => {
    if (variant === "large") return "w-[270px]";
    if (variant === "medium") return "w-[197px]";
    return "w-[140px]";
  };

  return (
    <div
      aria-label={`Botón que dirige a la sección ${title}`}
      className={clsx(
        "rounded-full bg-title text-white py-2 lg:py-3 z-10 flex justify-center items-center",
        getWidth(),
        variant === "large" && "b1 px-10 w-52 py-3 lg:py-4"
      )}
    >
      {title}
    </div>
  );
};

export default CustomLabel;
