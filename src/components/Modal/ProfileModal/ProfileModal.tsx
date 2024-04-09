import { Dispatch, useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores";
import { logout } from "@/app/auth/actions";

interface Props {
  setisModalOpen: Dispatch<boolean>;
}

const ProfileModal = ({ setisModalOpen }: Props) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const handleLogout = async () => {
    try {
      await logout();
      setisModalOpen(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user) as User);
    }
  }, [setUser]);

  return (
    <div className="md:flex flex-col gap-3 rounded-2xl p-3 bg-white absolute top-15 md:-left-52 2xl:-left-full shadow-2xl w-56">
      {user && (
        <>
          <p className="b1 font-bold border-y py-1">{user?.name}</p>
          <Link
            href="/mi-perfil"
            aria-label="Enlace a mi perfil"
            className="b1 text-nowrap font-semibold"
            onClick={() => setisModalOpen(false)}
          >
            Mi perfil
          </Link>
          <Link
            href="/mis-favoritos"
            aria-label="Enlace a mi perfil"
            className="b1 text-nowrap font-semibold bottom-2"
            onClick={() => setisModalOpen(false)}
          >
            Mis favoritos
          </Link>
          <Link
            href="/vender"
            aria-label="Enlace a mi perfil"
            className="b1 text-nowrap font-semibold bottom-2 border-y border-y-blur py-2 text-[#225f3e]"
            onClick={() => setisModalOpen(false)}
          >
            Vender
          </Link>
        </>
      )}
      {user ? (
        <button
          className="b1 text-nowrap font-semibold bottom-2 text-[#ff0000]"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      ) : (
        <Link
          href="/auth/login"
          aria-label="Enlace a mi perfil"
          className="b1 text-nowrap font-semibold bottom-2"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};

export default ProfileModal;
