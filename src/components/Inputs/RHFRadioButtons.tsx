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
            render={({ field }) => {
              console.log({ fieldValue: field.value });

              return (
                <div className="flex gap-2 items-center">
                  <div className="border flex justify-center items-center rounded-full w-5 h-5">
                    <input
                      {...field}
                      type="radio"
                      id={option}
                      value={option}
                      checked={field.value === option}
                      className="appearance-none rounded-full   bg-white checked:bg-black w-3 h-3"
                    />
                  </div>
                  <label htmlFor={option} className="b1">
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
