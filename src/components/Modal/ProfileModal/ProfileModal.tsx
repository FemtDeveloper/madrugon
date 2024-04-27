import Link from "next/link";
import { Dispatch } from "react";
import { useShallow } from "zustand/react/shallow";

import { logout } from "@/app/auth/actions";
import { useUserStore } from "@/stores";

interface Props {
  setisModalOpen: Dispatch<boolean>;
}

const ProfileModal = ({ setisModalOpen }: Props) => {
  const { user, setUser } = useUserStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser }))
  );

  const handleLogout = async () => {
    try {
      await logout();
      setisModalOpen(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
            aria-label="Enlace a mis favoritos"
            className="b1 text-nowrap font-semibold bottom-2"
            onClick={() => setisModalOpen(false)}
          >
            Mis favoritos
          </Link>
          {user.isSeller && (
            <Link
              href="/mis-productos"
              aria-label="Enlace a mis productos"
              className="b1 text-nowrap font-semibold bottom-2"
              onClick={() => setisModalOpen(false)}
            >
              Mis productos
            </Link>
          )}
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
          className="b1 text-nowrap font-semibold bottom-2 text-error"
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
