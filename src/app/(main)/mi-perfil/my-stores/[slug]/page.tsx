"use client";

import { RHFCustomCheckbox, RHFCustomInput } from "@/components/Inputs";
import { getStoresByOwner, updateStore } from "@/services/stores";
import { useLoaderStore, useModalStore } from "@/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CustomButton } from "@/components/Ui";
import { useUserStore } from "@/stores";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";

interface StoreFormData {
  name: string;
  description: string;
  logo_url: string;
  banner_url: string;
  phone: string;
  email: string;
  website_url: string;
  is_active: boolean;
}

export default function EditStorePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const user = useUserStore((state) => state.user);
  const { openLoader, closeLoader } = useLoaderStore();
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset, setValue, watch } =
    useForm<StoreFormData>({
      defaultValues: {
        name: "",
        description: "",
        logo_url: "",
        banner_url: "",
        phone: "",
        email: "",
        website_url: "",
        is_active: true,
      },
    });

  const { data: stores, isPending: isLoadingStores } = useQuery({
    queryKey: ["stores", user?.id],
    queryFn: () => getStoresByOwner(user!.id),
    enabled: !!user?.id,
  });

  const store = (stores || [])?.find((s: any) => s.slug === slug);
  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<"logo" | "banner" | null>(null);

  useEffect(() => {
    if (store) {
      reset({
        name: store.name || "",
        description: store.description || "",
        logo_url: store.logo_url || "",
        banner_url: store.banner_url || "",
        phone: store.phone || "",
        email: store.email || "",
        website_url: store.website_url || "",
        is_active: store.is_active ?? true,
      });
    }
  }, [store, reset]);

  const mutation = useMutation({
    mutationFn: async (data: StoreFormData) => {
      const updatedSlug = data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return updateStore(store.id, {
        name: data.name,
        slug: updatedSlug,
        description: data.description,
        logo_url: data.logo_url,
        banner_url: data.banner_url,
        phone: data.phone,
        email: data.email,
        website_url: data.website_url,
        is_active: data.is_active,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
        exact: false,
      });
      openModal({
        title: "Éxito",
        description: "Tienda actualizada exitosamente",
        onConfirm: () => {
          closeModal();
          router.push("/mi-perfil");
        },
      });
    },
    onSettled: () => {
      closeLoader();
    },
  });

  const onSubmit = async (data: StoreFormData) => {
    if (!store) return;
    openLoader({ size: "md", title: "Actualizando tienda..." });
    await mutation.mutateAsync(data);
  };

  if (isLoadingStores) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p>Cargando tienda...</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p>Tienda no encontrada</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push("/mi-perfil")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
          Volver al perfil
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Editar Tienda: {store.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <RHFCustomInput
              name="name"
              control={control}
              label="Nombre de la Tienda"
            />
          </div>

          <div className="md:col-span-2">
            <RHFCustomInput
              name="description"
              control={control}
              label="Descripción"
            />
          </div>

          <div className="flex items-end gap-3">
            <div className="shrink-0 mb-1">
              <Image
                src={watch("logo_url") || "/assets/images/isoicon.png"}
                alt="logo preview"
                width={64}
                height={64}
                className="rounded border object-cover w-16 h-16"
              />
            </div>
            <RHFCustomInput
              name="logo_url"
              control={control}
              label="URL del Logo"
            />
            <button
              type="button"
              className="px-3 py-2 text-xs border rounded mb-1"
              disabled={uploading === "logo"}
              onClick={() => logoRef.current?.click()}
            >
              {uploading === "logo" ? "Subiendo..." : "Subir"}
            </button>
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file || !store?.id) return;
                setUploading("logo");
                try {
                  const { uploadImageToFirebase } = await import(
                    "@/services/uploads"
                  );
                  const url = await uploadImageToFirebase(
                    file,
                    { kind: "store", storeId: String(store.id), type: "logo" },
                    { width: 800, quality: 80, format: "webp" }
                  );
                  setValue("logo_url", url, { shouldDirty: true });
                } catch (err) {
                  console.error(err);
                  alert("Error subiendo el logo");
                } finally {
                  setUploading(null);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>

          <div className="flex items-end gap-3">
            <div className="shrink-0 mb-1">
              <Image
                src={watch("banner_url") || "/assets/images/isoicon.png"}
                alt="banner preview"
                width={128}
                height={64}
                className="rounded border object-cover w-32 h-16"
              />
            </div>
            <RHFCustomInput
              name="banner_url"
              control={control}
              label="URL del Banner"
            />
            <button
              type="button"
              className="px-3 py-2 text-xs border rounded mb-1"
              disabled={uploading === "banner"}
              onClick={() => bannerRef.current?.click()}
            >
              {uploading === "banner" ? "Subiendo..." : "Subir"}
            </button>
            <input
              ref={bannerRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file || !store?.id) return;
                setUploading("banner");
                try {
                  const { uploadImageToFirebase } = await import(
                    "@/services/uploads"
                  );
                  const url = await uploadImageToFirebase(
                    file,
                    {
                      kind: "store",
                      storeId: String(store.id),
                      type: "banner",
                    },
                    { width: 1600, quality: 80, format: "webp" }
                  );
                  setValue("banner_url", url, { shouldDirty: true });
                } catch (err) {
                  console.error(err);
                  alert("Error subiendo el banner");
                } finally {
                  setUploading(null);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>

          <RHFCustomInput name="phone" control={control} label="Teléfono" />

          <RHFCustomInput name="email" control={control} label="Email" />

          <div className="md:col-span-2">
            <RHFCustomInput
              name="website_url"
              control={control}
              label="URL del Sitio Web"
            />
          </div>

          <div className="md:col-span-2">
            <RHFCustomCheckbox
              name="is_active"
              control={control}
              label="Tienda activa"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-6">
          <CustomButton
            btnTitle="Cancelar"
            onClick={() => router.push("/mi-perfil")}
            variant="transparent"
            size="medium"
          />
          <CustomButton
            btnTitle="Guardar Cambios"
            btnType="submit"
            loading={mutation.isPending}
            size="medium"
          />
        </div>
      </form>
    </div>
  );
}
