import Link from "next/link";

import { LoginHeader, RegisterForm } from "@/components/Auth";

const RegisterPage = () => {
  return (
    <div className="w-full md:max-w-[370px] flex flex-col justify-center items-center gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <LoginHeader title="Registrarse" />
        <div className="flex gap-2 text-[14px]">
          <p className="text-p-2">¿Ya tienes cuenta?</p>
          <Link className="underline" href="/auth/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
