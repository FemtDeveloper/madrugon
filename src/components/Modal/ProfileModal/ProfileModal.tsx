import Link from "next/link";
import { useState } from "react";

const ProfileModal = () => {
  const [hasSession, setHasSession] = useState(false);
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-3 bg-white absolute top-15 -left-full shadow-2xl w-56">
      <Link
        href="/mi-perfil"
        aria-label="Enlace a mi perfil"
        className="b1 text-nowrap font-semibold"
      >
        Mi perfil
      </Link>
      <Link
        href="/mis-favoritos"
        aria-label="Enlace a mi perfil"
        className="b1 text-nowrap font-semibold bottom-2"
      >
        Mis favoritos
      </Link>
      <Link
        href="/mis-favoritos"
        aria-label="Enlace a mi perfil"
        className="b1 text-nowrap font-semibold bottom-2 border-y border-y-blur py-2 text-[#225f3e]"
      >
        Vender
      </Link>
      {hasSession ? (
        <button className="b1 text-nowrap font-semibold bottom-2 text-[#ff0000]">
          Cerrar sesión
        </button>
      ) : (
        <Link
          href="/auth/login"
          aria-label="Enlace a mi perfil"
          className="b1 text-nowrap font-semibold bottom-2 text-[#0000ff]"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};

export default ProfileModal;
