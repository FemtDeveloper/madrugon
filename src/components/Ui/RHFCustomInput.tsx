"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { EyeClosedIcon, EyeOpenededIcon } from "../Icons";

type InputType = "text" | "password";

interface Props {
  name: string;
  control: any;
  placeholder: string;
  type?: InputType;
  id?: string;
  hasLabel?: boolean;
}

const RHFCustomInput = ({
  name,
  control,
  placeholder,
  type = "text",
  id,
  hasLabel = false,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    type === "text" ? true : false
  );

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="border-neutral-400 border py-2 px-4 flex justify-between items-center rounded-xl h-14">
          <div className="flex flex-col gap-[2px]">
            {hasLabel && (
              <label htmlFor={name} className="l2 text-neutral-500">
                {name}
              </label>
            )}
            <input
              {...field}
              type={isPasswordVisible ? "text" : "password"}
              id={id}
              placeholder={placeholder}
              className="focus-visible:outline-none"
            />
          </div>
          {type === "password" && (
            <button onClick={handlePasswordVisibility}>
              {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenededIcon />}
            </button>
          )}
        </div>
      )}
    />
  );
};

export default RHFCustomInput;
