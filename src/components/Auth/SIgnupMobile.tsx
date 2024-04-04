import { Dispatch, useState } from "react";
import { CustomLink, RHFCustomInput } from "../Ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpNewUser } from "@/services/auth";
import { Session } from "@supabase/supabase-js";
import LoginHeader from "./LoginHeader";
import clsx from "clsx";
import { supabase } from "@/lib/supabase/client";

interface Props {
  setIsRegisterScreenOpen: Dispatch<boolean>;
  isOpen: boolean;
}

const SignupMobile = ({ setIsRegisterScreenOpen, isOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userSession, setUserSession] = useState<Session | null>(null);
  const { control, handleSubmit } = useForm<SignupParams>({
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      name: "",
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<SignupParams> = async (data) => {
    setIsLoading(true);

    const { user } = await signUpNewUser({
      email: data.email,
      password: data.password,
    });

    const { data: createResponse, error } = await supabase.from("user").insert({
      email: data.email,
      id: user?.id,
      name: `${data.name} ${data.lastName}`,
    });

    setIsLoading(false);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center h-full gap-8 w-full top-0 absolute bg-white transition-transform duration-300 z-10 ",
        isOpen ? "translate-x-0" : "translate-x-[120%]"
      )}
    >
      <div className="header-container flex flex-col gap-4">
        <LoginHeader title="Registrarse" />
        <div className="flex gap-2 text-[14px]">
          <p className="text-p-2">¿Ya tienes cuenta?</p>
          <button
            className="underline"
            type="button"
            onClick={() => setIsRegisterScreenOpen(false)}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
      <form
        className="flex flex-col items-center gap-4 w-full h-full overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full gap-4">
          <RHFCustomInput
            placeholder="Nombres"
            name="name"
            type="text"
            id="names"
            control={control}
          />
          <RHFCustomInput
            placeholder="Apellidos"
            type="text"
            name="lastName"
            id="lastName"
            control={control}
          />
          <RHFCustomInput
            placeholder="Teléfono"
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            control={control}
          />
          <RHFCustomInput
            placeholder="Ingrese su corrreo electrónico"
            name="email"
            type="text"
            id="emailLogin"
            control={control}
            hasLabel
          />
          <RHFCustomInput
            placeholder="Contraseña"
            name="password"
            type="password"
            id="passwordSignup"
            control={control}
          />
          <RHFCustomInput
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            control={control}
          />
        </div>
        <div className="flex justify-between text-[14px] w-full">
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="terms"
              className="appearance-none border-2  border-blue-500 rounded-md  bg-white checked:bg-title w-6 h-6"
            />
            <label htmlFor="terms" className="text-p-1">
              Aceptar Términos y Condiciones y Política de Privacidad
            </label>
          </div>
        </div>
        <CustomLink
          loading={isLoading}
          type="button"
          btnType="submit"
          btnTitle="Crear cuenta"
          variant="xLarge"
        />
      </form>
    </div>
  );
};

export default SignupMobile;
