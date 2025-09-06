import clsx from "clsx";
import { Controller } from "react-hook-form";

interface OptionItem {
  label: string;
  value: any;
}

interface Props {
  control: any;
  // Accept either simple string options or objects with value and label
  options: Array<string | OptionItem>;
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
        {options.map((option) => {
          const opt =
            typeof option === "string"
              ? { label: option, value: option }
              : option;
          return (
            <Controller
              key={String(opt.label)}
              name={name}
              control={control}
              render={({ field }) => {
                const inputId = `${name}-${String(opt.value)}`;
                // Ensure we set the typed option value (e.g., boolean) rather than string from event
                const handleChange = () => field.onChange(opt.value);
                const isChecked = field.value === opt.value;

                return (
                  <label
                    htmlFor={inputId}
                    className={clsx(
                      "flex gap-2 items-center cursor-pointer select-none"
                    )}
                  >
                    <div className="border flex justify-center items-center rounded-full w-5 h-5">
                      <input
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onChange={handleChange}
                        type="radio"
                        id={inputId}
                        value={String(opt.value)}
                        checked={isChecked}
                        className={clsx(
                          "appearance-none rounded-full bg-white checked:bg-black",
                          variant === "medium" ? "size-3" : "size-2"
                        )}
                      />
                    </div>
                    <span className={clsx(variant === "medium" ? "b1" : "b2")}>
                      {opt.label}
                    </span>
                  </label>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RHFRadioButtons;
