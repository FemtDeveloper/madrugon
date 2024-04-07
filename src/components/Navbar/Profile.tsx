"use client";
import Link from "next/link";
import { ProfileIcon } from "../Icons";
import { ProfileModal } from "../Modal/ProfileModal";
import { useState } from "react";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative">
      <Link
        aria-label="botón de perfil"
        href="/auth/login"
        className="md:hidden"
      >
        <ProfileIcon />
      </Link>
      <button
        aria-label="botón de perfil"
        className="hidden md:flex"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <ProfileIcon />
      </button>
      {isModalOpen && <ProfileModal />}
    </div>
  );
};

export default Profile;
