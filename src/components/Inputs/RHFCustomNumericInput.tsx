import { formatCurrency, formatNumber } from "@/utils";
import { Controller } from "react-hook-form";

type InputType = "number" | "currency";

interface Props {
  name: string;
  control: any;
  placeholder: string;
  type?: InputType;
  id?: string;
  label?: string;
}

const RHFCustomNumericInput = ({
  name,
  control,
  placeholder,
  type = "number",
  id,
  label,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="border-neutral-400 border py-2 px-4 flex justify-between items-center rounded-xl h-14 w-full">
          {label && (
            <label htmlFor={name} className="l2 text-neutral-500">
              {label}
            </label>
          )}
          <div className="flex gap-1">
            {type === "currency" && <p>$</p>}
            <input
              {...field}
              type="text"
              id={id}
              placeholder={placeholder}
              className="focus-visible:outline-none w-full"
              spellCheck={false}
              onKeyDown={(event) => {
                if (!/[0-9,]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              // value={formatNumber(field.value)}
            />
          </div>
        </div>
      )}
    />
  );
};

export default RHFCustomNumericInput;
