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

  useEffect(() => {
    document.body.style.overflow = isProfileSidebarOpen ? "hidden" : "auto";
  }, [isProfileSidebarOpen]);

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
        "w-screen h-screen fixed flex justify-end z-30  transition-transform  duration-300",
        isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div
        className={clsx(
          "sidebar h-dvh w-full max-w-[400px] bg-white  top-0 z-30 p-6"
        )}
      >
        <div className="relative h-full w-full   flex flex-col items-center gap-8">
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
              <p className="b3 bg-success py-1 px-2 rounded-xl text-white">
                Soy vendedor
              </p>
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
        className="-z-10 absolute top-0 bg-blur w-screen h-screen opacity-50"
        onClick={() => setIsProfileSidebarOpen(false)}
      />
    </div>
  );
};

export default ProfileSidebar;
