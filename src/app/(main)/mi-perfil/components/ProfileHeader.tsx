"use client";

import { LogOut, Pencil } from "lucide-react";

interface Props {
  user: User | null;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  hovered: string | null;
  setHovered: (v: string | null) => void;
  onLogout: () => void;
}

export default function ProfileHeader({
  user,
  isEditing,
  setIsEditing,
  hovered,
  setHovered,
  onLogout,
}: Props) {
  console.log({ user });

  return (
    <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-8">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2 justify-center md:justify-start">
          {`${user?.first_name} ${user?.last_name}` || "Sin nombre"}
          {!isEditing && (
            <button
              className="ml-2 p-1 rounded-full hover:bg-gray-100 transition"
              onClick={() => setIsEditing(true)}
              title="Editar perfil"
              onMouseEnter={() => setHovered("edit")}
              onMouseLeave={() => setHovered(null)}
            >
              <Pencil
                className={
                  hovered === "edit" ? "text-primary" : "text-gray-500"
                }
                size={20}
              />
            </button>
          )}
        </h2>
        <p className="text-gray-500 text-sm mb-2">
          {user?.email || "Sin correo"}
        </p>
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-red-100 text-red-600 font-semibold transition"
        onClick={onLogout}
        title="Cerrar sesión"
        onMouseEnter={() => setHovered("logout")}
        onMouseLeave={() => setHovered(null)}
      >
        <LogOut
          className={hovered === "logout" ? "text-red-500" : "text-red-400"}
          size={18}
        />
        <span className="hidden md:inline">Cerrar sesión</span>
      </button>
    </div>
  );
}
