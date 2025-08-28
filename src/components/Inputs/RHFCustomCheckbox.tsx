"use client";

import { Controller } from "react-hook-form";

interface Props {
  name: string;
  control: any;
  label?: string;
}

const RHFCustomCheckbox = ({ name, control, label }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-2 items-center">
          <div className="border flex justify-center items-center w-5 h-5">
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="appearance-none rounded-sm bg-white checked:bg-black w-4 h-4 cursor-pointer"
            />
          </div>
          <label className="b1 text-gray-600">{label}</label>
        </div>
      )}
    />
  );
};

export default RHFCustomCheckbox;
