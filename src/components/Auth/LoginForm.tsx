"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { loginUser } from "@/services/auth/login";
import { useModalStore } from "@/stores";

import { RHFCustomInput } from "../Inputs";
import { CustomButton } from "../Ui";

import LoginHeader from "./LoginHeader";

const LoginForm = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  const { control, handleSubmit } = useForm<SigninParams>({
    defaultValues: { email: "", password: "" },
  });

  const {
    mutate,
    isPending,
    error: _error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: SigninParams) => {
      const { user, error: loginError } = await loginUser(data);
      if (loginError || !user)
        throw new Error(loginError?.message || "Credenciales inválidas");
      // Optionally, set user in zustand store or cookies here
      return user;
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (err: any) => {
      openModal({
        title: err.message || "Error al iniciar sesión",
        description: "¡Registrate para disfrutar de nuestros beneficios!",
        onConfirm: () => router.push("/auth/register"),
        onCancel: closeModal,
      });
    },
  });

  const onSubmit: SubmitHandler<SigninParams> = (data) => {
    mutate(data);
  };

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
            label="Correo eletrónico"
          />
          <RHFCustomInput
            placeholder="Ingrese su contraseña"
            name="password"
            id="passwordLogin"
            type="password"
            control={control}
            label="Contraseña"
          />
        </div>
        <div className="flex justify-between text-[14px] w-full">
          <button className="underline" type="button">
            Olvidé mi contraseña
          </button>
        </div>
        <CustomButton
          btnType="submit"
          btnTitle="Iniciar sesíon"
          size="xLarge"
          loading={isPending}
        />
        <div className="flex gap-2 text-[14px]">
          <p className="text-p-2">¿No tienes una cuenta?</p>
          <Link className="underline" type="button" href="/auth/register">
            Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
