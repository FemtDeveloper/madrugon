import { Controller } from "react-hook-form";

interface Props {
  control: any;
  options: string[];
  name: string;
  label: string;
}

const RHFRadioButtons = ({ options, control, name, label }: Props) => {
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
            render={({ field }) => (
              <div className="flex items-center">
                <input
                  {...field}
                  type="radio"
                  id={option}
                  value={option}
                  checked={field.value === option}
                  className="mr-2" // Add styling as needed
                />
                <label htmlFor={option}>{option}</label>
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default RHFRadioButtons;
