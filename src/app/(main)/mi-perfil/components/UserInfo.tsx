"use client";

import {
  RHFCustomInput,
  RHFCustomSelect,
  RHFRadioButtons,
} from "@/components/Inputs";
import { useLoaderStore, useModalStore, useUserStore } from "@/stores";
import { Check, LogOut, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

import { updateUser } from "@/app/auth/actions";
import { getBrandsByOwner } from "@/services/brands";
import { getStoresByOwner } from "@/services/stores";
import { getMyProfile } from "@/utils/getMyProfile";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import CreateBrandForm from "./CreateBrandForm";
import CreateStoreForm from "./CreateStoreForm";

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
  const [stores, setStores] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loadingRelations, setLoadingRelations] = useState(false);
  const { handleSubmit, control, reset } = useForm<userUpdateDTO>({
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone: user?.phone ?? "",
      date_of_birth: user?.date_of_birth ?? "",
      gender: user?.gender ?? "",
      is_seller: user?.is_seller ?? false,
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
      // Refresh profile after update
      await getMyProfile();
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
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        phone: user.phone ?? "",
        date_of_birth: user.date_of_birth ?? "",
        gender: user.gender ?? "",
        is_seller: user.is_seller ?? false,
      });
      // fetch user's stores and brands
      (async () => {
        setLoadingRelations(true);
        try {
          const [fetchedStores, fetchedBrands] = await Promise.all([
            getStoresByOwner(user.id),
            getBrandsByOwner(user.id),
          ]);
          setStores(fetchedStores || []);
          setBrands(fetchedBrands || []);
        } catch (e) {
          console.error("UserInfo: error loading relations", e);
        } finally {
          setLoadingRelations(false);
        }
      })();
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
        {/* First Name */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput
              name="first_name"
              control={control}
              label="Nombre"
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.first_name || "No informa"}
            </p>
          )}
        </div>
        {/* Last Name */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput
              name="last_name"
              control={control}
              label="Apellido"
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.last_name || "No informa"}
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

        {/* Date of birth */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomInput
              name="date_of_birth"
              control={control}
              label="Fecha de nacimiento"
              type="date"
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.date_of_birth
                ? new Date(user.date_of_birth).toLocaleDateString()
                : "No informa"}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="relative group">
          {isEditing ? (
            <RHFCustomSelect
              name="gender"
              control={control}
              label="Género"
              placeholder="Seleccionar género"
              options={[
                { label: "Masculino", value: "M" },
                { label: "Femenino", value: "F" },
                { label: "Otro", value: "O" },
                { label: "Prefiero no decirlo", value: "" },
              ]}
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.gender || "No informa"}
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
              name="is_seller"
              options={[
                { label: "Soy vendedor", value: true },
                { label: "No soy vendedor", value: false },
              ]}
              label=""
              variant="small"
            />
          ) : (
            <p className="mt-6 text-base font-medium text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {user?.is_seller ? "Soy vendedor" : "No soy vendedor"}
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
      {/* Create Brand / Store quick actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Crear Marca</h3>
          <CreateBrandForm
            user={user}
            onCreated={async () => await getMyProfile()}
          />
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Crear Tienda</h3>
          <CreateStoreForm
            user={user}
            onCreated={async () => await getMyProfile()}
          />
        </div>
      </div>
      {/* Owned stores & brands */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Mis Tiendas</h3>
          {loadingRelations ? (
            <p>Cargando...</p>
          ) : stores.length ? (
            <ul className="space-y-2">
              {stores.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <div className="flex gap-2">
                    <a
                      href={`/store/${s.slug}`}
                      className="text-sm text-primary"
                    >
                      Ver
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tienes tiendas</p>
          )}
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Mis Marcas</h3>
          {loadingRelations ? (
            <p>Cargando...</p>
          ) : brands.length ? (
            <ul className="space-y-2">
              {brands.map((b) => (
                <li key={b.id} className="flex items-center justify-between">
                  <span>{b.name}</span>
                  <div className="flex gap-2">
                    <a
                      href={`/brand/${b.slug}`}
                      className="text-sm text-primary"
                    >
                      Ver
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tienes marcas</p>
          )}
        </div>
      </div>
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
