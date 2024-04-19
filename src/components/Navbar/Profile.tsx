"use client";
import { useState } from "react";
import Link from "next/link";
import { ProfileIcon } from "../Icons";
import { ProfileModal } from "../Modal/ProfileModal";
import { useSidebarStore, useUserStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          className="md:hidden"
          onClick={() => {
            setIsProfileSidebarOpen(true);
            setSidebarType("profile");
          }}
        >
          <ProfileIcon />
        </button>
      ) : (
        <Link
          aria-label="botón de perfil"
          href="/auth/login"
          className="md:hidden"
        >
          <ProfileIcon />
        </Link>
      )}

      <button
        aria-label="botón de perfil"
        className="hidden md:flex"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <ProfileIcon />
      </button>
      {isModalOpen && <ProfileModal setisModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Profile;
