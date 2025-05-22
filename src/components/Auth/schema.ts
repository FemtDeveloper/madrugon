import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(50, { message: "El nombre debe tener menos de 50 caracteres" }),
  lastName: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(50, { message: "El apellido debe tener menos de 50 caracteres" }),
  phoneNumber: z
    .string()
    .min(1, { message: "El número de teléfono es requerido" })
    .max(15, {
      message: "El número de teléfono debe tener menos de 15 caracteres",
    }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña debe tener menos de 20 caracteres" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirmar contraseña es requerido" }),
});

export type RegisterFormType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña debe tener menos de 20 caracteres" }),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
