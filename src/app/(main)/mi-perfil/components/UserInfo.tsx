"use client";

import { logoutClient, updateUserClient } from "@/services/user";
import { useLoaderStore, useModalStore, useUserStore } from "@/stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBrandsByOwner } from "@/services/brands";
import { getStoresByOwner } from "@/services/stores";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import CreateBrandModal from "./CreateBrandModal";
import CreateStoreModal from "./CreateStoreModal";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";
import RelationsSection from "./RelationsSection";

export function UserInfo() {
  const user = useUserStore((state) => state.user);
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );

  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { openLoader, closeLoader } = useLoaderStore();
  const queryClient = useQueryClient();
  const userId = user?.id;

  const { data: stores = [], isPending: storesPending } = useQuery({
    queryKey: ["stores", userId],
    queryFn: () => getStoresByOwner(userId as string),
    enabled: !!userId,
  });

  const { data: brands = [], isPending: brandsPending } = useQuery({
    queryKey: ["brands", userId],
    queryFn: () => getBrandsByOwner(userId as string),
    enabled: !!userId,
  });

  const loadingRelations = storesPending || brandsPending;
  const [showCreateBrandModal, setShowCreateBrandModal] = useState(false);
  const [showCreateStoreModal, setShowCreateStoreModal] = useState(false);

  const router = useRouter();
  const setUser = useUserStore.getState().setUser;

  const handleLogout = async () => {
    try {
      await logoutClient();
    } catch (e) {
      console.error("Logout error:", e);
    }
    router.push("/");
  };

  const mutation = useMutation({
    mutationFn: async (payload: userUpdateDTO) => {
      return await updateUserClient(payload, user!.id);
    },
    onSuccess: async (updatedUser) => {
      // Update local store and show modal
      setUser(updatedUser as any);
      openModal({
        description: "Has Actualizado tus datos exitosamente",
        title: "Actualización exitosa",
        onConfirm: closeModal,
      });
      setIsEditing(false);
      setTimeout(() => closeModal(), 2000);
      // refresh relations in case seller flag changed
      await queryClient.invalidateQueries({
        queryKey: ["brands"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
        exact: false,
      });
    },
  });

  const onSubmit = async (data: userUpdateDTO, e: any) => {
    e.preventDefault();
    if (!user) return;
    openLoader({ size: "md", title: "Guardando perfil..." });
    try {
      await mutation.mutateAsync(data);
    } catch (err) {
      console.error("Update user failed", err);
      alert("Error actualizando perfil. Intenta nuevamente.");
    } finally {
      closeLoader();
    }
  };

  const handleCreateBrand = () => {
    setShowCreateBrandModal(true);
  };

  const handleCreateStore = () => {
    setShowCreateStoreModal(true);
  };

  const handleBrandCreated = async () => {
    setShowCreateBrandModal(false);
    // Invalidate all brand queries (any user-specific keys)
    await queryClient.invalidateQueries({ queryKey: ["brands"], exact: false });
  };

  const handleStoreCreated = async () => {
    setShowCreateStoreModal(false);
    await queryClient.invalidateQueries({ queryKey: ["stores"], exact: false });
  };

  return (
    <>
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

        {/* Show RelationsSection if user is seller OR has existing brands/stores */}
        {(user?.is_seller ||
          (stores?.length ?? 0) > 0 ||
          (brands?.length ?? 0) > 0) && (
          <RelationsSection
            stores={stores}
            brands={brands}
            loading={loadingRelations}
            onCreateBrand={handleCreateBrand}
            onCreateStore={handleCreateStore}
            showCreateButtons={!!user?.is_seller} // Always show create buttons if user is seller
          />
        )}

        {/* Account Info */}
        <div className="mt-10 text-xs text-gray-400 text-center md:text-right">
          <span>
            Cuenta creada:{" "}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "-"}
          </span>
        </div>
      </div>

      {/* Modals */}
      {showCreateBrandModal && (
        <CreateBrandModal
          onSuccess={handleBrandCreated}
          onClose={() => setShowCreateBrandModal(false)}
        />
      )}

      {showCreateStoreModal && (
        <CreateStoreModal
          onSuccess={handleStoreCreated}
          onClose={() => setShowCreateStoreModal(false)}
        />
      )}
    </>
  );
}
