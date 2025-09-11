import clsx from "clsx";

type Size = "small" | "medium" | "large";

interface Props {
  title: string;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  small: "text-xs py-1 px-2",
  medium: "text-sm py-2 px-4",
  large: "text-base py-3 px-6",
};

const CustomLabel = ({ title, size = "medium", className }: Props) => {
  return (
    <div
      aria-label={`Etiqueta: ${title}`}
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-title text-white font-medium",
        sizeClasses[size],
        className
      )}
    >
      {title}
    </div>
  );
};

export default CustomLabel;
