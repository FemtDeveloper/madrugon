import { LoginHeader, RegisterForm } from "@/components/Auth";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="w-full h-full md:max-w-[370px] overflow-y-auto flex flex-col justify-center items-center gap-8">
      <div className="header-container flex flex-col items-center gap-4">
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
