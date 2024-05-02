import CurrencyInput from "react-currency-input-field";
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
            <CurrencyInput
              prefix="$"
              id="validation-example-2-field"
              placeholder={placeholder}
              allowDecimals={false}
              value={field.value}
              onBlur={field.onBlur}
              className="focus-visible:outline-none w-full"
              onValueChange={field.onChange}
              groupSeparator="."
              step={10}
            />
          </div>
        </div>
      )}
    />
  );
};

export default RHFCustomNumericInput;
