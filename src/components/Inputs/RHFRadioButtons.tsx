import clsx from "clsx";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  options: string[];
  name: string;
  label: string;
  variant?: "small" | "medium" | "large";
}

const RHFRadioButtons = ({
  options,
  control,
  name,
  label,
  variant = "medium",
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="font-bold">
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <Controller
            key={option}
            name={name}
            control={control}
            render={({ field }) => {
              return (
                <div className="flex gap-2 items-center">
                  <div className="border flex justify-center items-center rounded-full w-5 h-5">
                    <input
                      {...field}
                      type="radio"
                      id={option}
                      value={option}
                      checked={field.value === option}
                      className={clsx(
                        "appearance-none rounded-full bg-white checked:bg-black",
                        variant === "medium" ? "size-3" : "size-2"
                      )}
                    />
                  </div>
                  <label
                    htmlFor={option}
                    className={clsx(variant === "medium" ? "b1" : "b2")}
                  >
                    {option}
                  </label>
                </div>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RHFRadioButtons;
