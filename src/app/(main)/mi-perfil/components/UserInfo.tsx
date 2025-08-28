"use client";

import { useLoaderStore, useModalStore, useUserStore } from "@/stores";
import { useEffect, useState } from "react";

import { updateUser } from "@/app/auth/actions";
import { getBrandsByOwner } from "@/services/brands";
import { getStoresByOwner } from "@/services/stores";
import { getMyProfile } from "@/utils/getMyProfile";
import { useShallow } from "zustand/react/shallow";
import CreateSection from "./CreateSection";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";
import RelationsSection from "./RelationsSection";

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
  const onSubmit = async (data: userUpdateDTO, e: any): Promise<void> => {
    e.preventDefault();
    if (!user) return;
    openLoader({ size: "md", title: "Guardando perfil..." });
    try {
      await updateUser(data, user?.id);
      await getMyProfile();
      openModal({
        description: "Has Actualizado tus datos exitosamente",
        title: "Actualización exitosa",
        onConfirm: closeModal,
      });
      setIsEditing(false);
      setTimeout(() => closeModal(), 2000);
    } finally {
      closeLoader();
    }
  };
  useEffect(() => {
    if (user) {
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
  }, [user]);
  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProfileHeader
        user={user}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        hovered={hovered}
        setHovered={setHovered}
        onLogout={handleLogout}
      />
      <div className="border-b border-gray-200 mb-8" />
      <ProfileForm
        user={user}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSubmit={onSubmit}
      />
      <CreateSection user={user} />
      <RelationsSection
        stores={stores}
        brands={brands}
        loading={loadingRelations}
      />
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
