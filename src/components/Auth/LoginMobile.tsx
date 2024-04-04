"use client";
import { Dispatch, useState } from "react";
import { CustomLink, RHFCustomInput } from "../Ui";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginHeader from "./LoginHeader";
import { login } from "@/services/auth";
import { AuthError, Session, User } from "@supabase/supabase-js";

interface Props {
  isOpen: boolean;
  setIsRegisterScreenOpen: Dispatch<boolean>;
}

const LoginMobile = ({ isOpen, setIsRegisterScreenOpen }: Props) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const { control, handleSubmit } = useForm<SigninParams>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<SigninParams> = async (data) => {
    console.log({ data });

    const { session, user } = await login({
      email: data.email,
      password: data.password,
    });
    console.log({ session, user });
    setUserSession(session);
  };

  // console.log({ userSession });

  return (
    <div className="h-full flex items-center justify-center w-full">
      <form
        className="flex flex-col items-center gap-8 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoginHeader title="Iniciar sesión" />
        <div className="flex flex-col w-full gap-4">
          <RHFCustomInput
            placeholder="Ingrese su corrreo electrónico"
            name="email"
            type="text"
            id="emailLogin"
            control={control}
            hasLabel
          />
          <RHFCustomInput
            placeholder="Ingrese su contraseña"
            name="password"
            id="passwordLogin"
            type="password"
            control={control}
            hasLabel
          />
        </div>
        <div className="flex justify-between text-[14px] w-full">
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="remember"
              className="appearance-none border-2  border-blue-500 rounded-md  bg-white checked:bg-title w-6 h-6"
            />
            <label htmlFor="remember" className="text-p-1">
              Recuerdame
            </label>
          </div>
          <button className="underline ">Olvidé mi contraseña</button>
        </div>
        <CustomLink
          type="button"
          btnType="submit"
          btnTitle="Iniciar sesíon"
          variant="xLarge"
        />
        <div className="flex gap-2 text-[14px]">
          <p className="text-p-2">¿No tienes una cuenta?</p>
          <button
            className="underline"
            type="button"
            onClick={() => setIsRegisterScreenOpen(true)}
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginMobile;