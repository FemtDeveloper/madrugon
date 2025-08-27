"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";

import { EyeClosedIcon, EyeOpenededIcon } from "../Icons";

type InputType = "text" | "password" | "currency";

interface Props {
  name: string;
  control: any;
  placeholder?: string;
  type?: InputType;
  id?: string;
  label?: string;
  inputHeight?: number;
}

const RHFCustomInput = ({
  name,
  control,
  placeholder,
  type = "text",
  id,
  label,
  inputHeight,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    type === "password" ? false : true
  );

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState:{error} }) => (
        <div className="flex flex-col gap-1 items-end">
        <div className="border-neutral-400 border py-2 px-4 flex justify-between items-center rounded-xl h-14 w-full">
          <div className="flex flex-col gap-[2px] w-full">
            {label && (
              <label htmlFor={name} className="l2 text-neutral-500">
                {label}
              </label>
            )}
            <div className="flex gap-1">
              {type === "currency" && <p>$</p>}
              <input
                {...field}
                type={isPasswordVisible ? "text" : "password"}
                id={id}
                placeholder={placeholder}
                className="focus-visible:outline-none w-full"
                height={`${inputHeight}px`}
                spellCheck={false}
              />
            </div>
          </div>
          {type === "password" && (
            <button
              onClick={handlePasswordVisibility}
              type={type === "password" ? "button" : type}
            >
              {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenededIcon />}
            </button>
          )}
        </div>
          {error && <span className="text-error text-xs">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default RHFCustomInput;
