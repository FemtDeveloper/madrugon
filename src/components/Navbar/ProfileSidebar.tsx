"use client";
import clsx from "clsx";
import { useSidebarStore, useUserStore } from "@/stores";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { ChevronLeftIcon } from "../Icons";
import Image from "next/image";
import { logout } from "@/app/auth/actions";
import { CustomLink } from "../Ui";
import Link from "next/link";

const ProfileSidebar = () => {
  const { isProfileSidebarOpen, setIsProfileSidebarOpen } = useSidebarStore(
    useShallow((state) => ({
      isProfileSidebarOpen: state.isProfileSidebarOpen,
      setIsProfileSidebarOpen: state.setIsProfileSidebarOpen,
    }))
  );

  const { user, setUser } = useUserStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser }))
  );

  const handleLogout = async () => {
    console.log("logging out");

    try {
      await logout();
      setUser(null);
      setIsProfileSidebarOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className={clsx(
        "w-full absolute h-screen flex justify-end",
        !isProfileSidebarOpen && "hidden"
      )}
    >
      <div
        className={clsx(
          "sidebar h-dvh w-full fixed max-w-[500px] bg-white transition-transform  duration-300 top-0 z-30 p-6",
          isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative h-full w-full flex flex-col items-center gap-8">
          <button
            className="bg-title absolute top-0 left-0 rounded-full p-1"
            onClick={() => {
              console.log("logging");

              setIsProfileSidebarOpen(false);
            }}
          >
            <ChevronLeftIcon color="white" />
          </button>
          <Image
            src={user?.avatar ?? "/images/isoicon.png"}
            className="rounded-full w-20 h-20 object-cover border border-black "
            alt="avatar"
            width={80}
            height={80}
          />
          <div className="flex flex-col items-center gap-2">
            <p className="h3_bold">{user?.name}</p>
            <p className="b1">{user?.brand}</p>
            {user?.isSeller && (
              <div className="flex flex-col items-center gap-2">
                <p className="b3 bg-success py-1 px-2 rounded-xl text-white">
                  Soy vendedor
                </p>
                {user?.isSeller && (
                  <Link
                    href="/vender"
                    aria-label="boton a vender"
                    className="b1 underline font-semibold"
                    onClick={() => setIsProfileSidebarOpen(false)}
                  >
                    Vender
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col grow items-center pt-7 gap-4">
            {user?.isSeller && (
              <CustomLink
                btnTitle="Mis productos"
                path="/mis-productos"
                onClick={() => setIsProfileSidebarOpen(false)}
              />
            )}

            <CustomLink
              btnTitle="Mis favoritos"
              path="/mis-favoritos"
              variant="transparent"
              onClick={() => setIsProfileSidebarOpen(false)}
            />

            <Link
              href="/mi-perfil"
              aria-label="boton a mi perfil"
              className="b1 underline"
              onClick={() => setIsProfileSidebarOpen(false)}
            >
              Ir a mi perfil
            </Link>
          </div>
          <CustomLink
            btnType="button"
            onClick={handleLogout}
            btnTitle="Cerrar sessión"
          />
        </div>
      </div>
      <div
        className={clsx(
          "z-20 top-0 w-screen bg-blur h-screen transition-opacity duration-1000",
          isProfileSidebarOpen ? "opacity-70 absolute" : "opacity-0 hidden"
        )}
        onClick={() => setIsProfileSidebarOpen(false)}
      />
    </div>
  );
};

export default ProfileSidebar;
