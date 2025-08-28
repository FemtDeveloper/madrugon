"use client";

import { Controller } from "react-hook-form";

type Option = string | { label: string; value: string };

interface Props {
  name: string;
  control: any;
  label?: string;
  options: Option[];
  placeholder?: string;
}

const RHFCustomSelect = ({
  name,
  control,
  label,
  options,
  placeholder,
}: Props) => {
  const normalize = (opt: Option) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 items-end">
          <div className="w-full border-neutral-400 border px-3 py-2 rounded-xl flex flex-col">
            {label && <label className="l2 text-neutral-500">{label}</label>}
            <select {...field} className="">
              {placeholder && <option value="">{placeholder}</option>}
              {options.map((o, idx) => {
                const opt = normalize(o);
                return (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
          </div>
          {error && <span className="text-error text-xs">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default RHFCustomSelect;
