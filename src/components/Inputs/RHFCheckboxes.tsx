import { Controller } from "react-hook-form";

interface Props {
  control: any;
  options: string[];
  name: string;
  label: string;
}

const RHFCheckboxes = ({ options, control, name, label }: Props) => {
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
            render={({ field: { onChange, value } }) => (
              <div className="flex gap-2 items-center">
                <div className="border flex justify-center items-center  w-5 h-5">
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={value?.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...value, option]);
                      } else {
                        onChange(value.filter((v: string) => v !== option));
                      }
                    }}
                    className="appearance-none  rounded-sm  bg-white checked:bg-black w-4 h-4"
                  />
                </div>
                <label htmlFor={option} className="b1">
                  {option}
                </label>
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default RHFCheckboxes;
