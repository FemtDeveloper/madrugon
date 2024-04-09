"use client";
import { useState } from "react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomLink, RHFCustomInput } from "../Ui";
import { signUpNewUser } from "@/services/auth";
import LoginHeader from "./LoginHeader";
import { supabase } from "@/lib/supabase/client";
import { useModalStore } from "@/stores";

const RegisterForm = () => {
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
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

    await supabase.from("user").insert({
      email: data.email,
      id: user?.id,
      name: `${data.name} ${data.lastName}`,
    });
    setIsLoading(false);
    openModal({
      description: "Has sido registrado exitosamente",
      title: "Registro exitoso",
    });
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 w-full"
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
          id="emailSignup"
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
  );
};

export default RegisterForm;