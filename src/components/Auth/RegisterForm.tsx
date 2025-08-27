"use client";

import { RegisterFormType, RegisterSchema } from "./schema";

import { CustomButton } from "../Ui";
import { RHFCustomInput } from "../Inputs";
import { signUpNewUser } from "@/services/auth";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  const { replace } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      name: "",
      phoneNumber: "",
    },
  });
  // errors available in formState.errors if needed during development

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterFormType) => {
      const { user, error: registerError } = await signUpNewUser({
        email: data.email,
        password: data.password,
        name: data.name,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });

      if (registerError || !user) {
        throw new Error(
          registerError?.message || "No se pudo crear el usuario"
        );
      }

      return user;
    },
    onSuccess: () => {
      openModal({
        description: "Has sido registrado exitosamente",
        title: "Registro exitoso",
      });
      setTimeout(() => {
        closeModal();
        replace("/");
      }, 2000);
    },
    onError: (err: any) => {
      openModal({
        description: err.message || "Error al registrar usuario",
        title: "Error",
      });
    },
  });

  const onSubmit = (data: RegisterFormType) => {
    mutate(data);
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
          label="Correo electrónico"
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
      <CustomButton
        loading={isPending}
        btnType="submit"
        btnTitle="Crear cuenta"
        size="xLarge"
      />
    </form>
  );
};

export default RegisterForm;
