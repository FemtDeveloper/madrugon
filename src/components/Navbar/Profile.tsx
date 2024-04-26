"use client";
import Link from "next/link";
import { ProfileFilledIcon, ProfileIcon } from "../Icons";
import { useSidebarStore, useUserStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

const Profile = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { setIsProfileSidebarOpen, setSidebarType } = useSidebarStore(
    useShallow((state) => ({
      setIsProfileSidebarOpen: state.setIsProfileSidebarOpen,
      setSidebarType: state.setSidebarType,
    }))
  );

  return (
    <div className="relative flex items-center">
      {isAuthenticated ? (
        <button
          aria-label="botón de perfil"
          className=""
          onClick={() => {
            setIsProfileSidebarOpen(true);
            setSidebarType("profile");
            console.log("opening");
          }}
        >
          <ProfileFilledIcon />
        </button>
      ) : (
        <Link aria-label="botón de perfil" href="/auth/login">
          <ProfileIcon />
        </Link>
      )}
    </div>
  );
};

export default Profile;
