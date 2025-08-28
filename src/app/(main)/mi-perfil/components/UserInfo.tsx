"use client";

import { RHFCustomInput, RHFRadioButtons } from "@/components/Inputs";
import { useLoaderStore, useModalStore, useUserStore } from "@/stores";
import { Check, LogOut, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

import { updateUser } from "@/app/auth/actions";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

export function UserInfo() {
  const user = useUserStore((state) => state.user);
  // Placeholder for logout functionality
  const handleLogout = () => {
    // TODO: Implement logout logic
    alert("Cerrar sesión (logout) no implementado");
  };
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  console.log({ user });

  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { openLoader, closeLoader } = useLoaderStore();
  const { handleSubmit, control, reset } = useForm<userUpdateDTO>({
    defaultValues: {
      name: user?.name ?? "",
      phone_number: user?.phone ?? "",
      brand: user?.brand ?? "",
      age: user?.age ?? "",
      city: user?.city ?? "",
      isSeller: user?.isSeller ?? false,
    },
  });
  const onSubmit = async (data: userUpdateDTO, e: any) => {
    console.log({ data, user });

    e.preventDefault();
    if (!user) return null;
    console.log({ data, user });

    openLoader({ size: "md", title: "Guardando perfil..." });
    try {
      await updateUser(data, user?.id);
      openModal({
        description: "Has Actualizado tus datos exitosamente",
        title: "Actualización exitosa",
        onConfirm: closeModal,
      });
      setIsEditing(false);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } finally {
      closeLoader();
    }
  };
  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        phone_number: user.phone ?? "",
        brand: user.brand ?? "",
        age: user.age ?? "",
        city: user.city ?? "",
        isSeller: user.isSeller ?? false,
      });
    }
  }, [user, reset]);
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2 justify-center md:justify-start">
            {user?.name || "Sin nombre"}
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
          onClick={handleLogout}
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
      {/* Divider */}
      <div className="border-b border-gray-200 mb-8" />
      {/* Profile Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput name="name" control={control} label="Nombre" />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.name || "No informa"}
            </p>
          )}
        </div>
        {/* Phone */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput
              name="phone_number"
              control={control}
              label="Teléfono"
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.phone || "No informa"}
            </p>
          )}
        </div>
        {/* Brand */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput name="brand" control={control} label="Marca" />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.brand || "No informa"}
            </p>
          )}
        </div>
        {/* Age */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput name="age" control={control} label="Edad" />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.age ? `${user.age} años` : "No informa"}
            </p>
          )}
        </div>
        {/* City */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput name="city" control={control} label="Ciudad" />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.city || "No informa"}
            </p>
          )}
        </div>
        {/* Seller Status */}
        <div className="relative group col-span-1 md:col-span-2">
          <label className="text-gray-600 text-xs font-semibold  left-3 top-2 bg-white px-1 group-focus-within:text-primary transition-all pointer-events-none">
            Tipo de usuario
          </label>
          {isEditing ? (
            <RHFRadioButtons
              control={control}
              name="isSeller"
              options={["Soy vendedor", "No soy vendedor"]}
              label=""
              variant="small"
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.isSeller ? "Soy vendedor" : "No soy vendedor"}
            </p>
          )}
        </div>
        {/* Action Buttons */}
        <div className="col-span-1 md:col-span-2 flex gap-3 justify-end mt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition shadow-sm"
                onClick={() => setIsEditing(false)}
              >
                <X size={18} /> Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition shadow-sm"
              >
                <Check size={18} /> Guardar
              </button>
            </>
          ) : null}
        </div>
      </form>
      {/* Account Info */}
      <div className="mt-10 text-xs text-gray-400 text-center md:text-right">
        <span>
          Cuenta creada:{" "}
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "-"}
        </span>
        {/* Optionally add last login if available */}
      </div>
    </div>
  );
}
// Removed duplicate/erroneous JSX after main return
