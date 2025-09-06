"use client";

import { RHFCustomCheckbox, RHFCustomInput } from "@/components/Inputs";
import { getBrandsByOwner, updateBrand } from "@/services/brands";
import { useLoaderStore, useModalStore } from "@/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { CustomButton } from "@/components/Ui";
import { useUserStore } from "@/stores";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface BrandFormData {
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  is_active: boolean;
}

export default function EditBrandPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const user = useUserStore((state) => state.user);
  const { openLoader, closeLoader } = useLoaderStore();
  const { openModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset } = useForm<BrandFormData>({
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
      website_url: "",
      is_active: true,
    },
  });

  const { data: brands, isPending: isLoadingBrands } = useQuery({
    queryKey: ["brands", user?.id],
    queryFn: () => getBrandsByOwner(user!.id),
    enabled: !!user?.id,
  });

  const brand = (brands || [])?.find((b: any) => b.slug === slug);

  useEffect(() => {
    if (brand) {
      reset({
        name: brand.name || "",
        description: brand.description || "",
        logo_url: brand.logo_url || "",
        website_url: brand.website_url || "",
        is_active: brand.is_active ?? true,
      });
    }
  }, [brand, reset]);

  const mutation = useMutation({
    mutationFn: async (data: BrandFormData) => {
      const updatedSlug = data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return updateBrand(brand.id, {
        name: data.name,
        slug: updatedSlug,
        description: data.description,
        logo_url: data.logo_url,
        website_url: data.website_url,
        is_active: data.is_active,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["brands"],
        exact: false,
      });
      openModal({
        title: "Éxito",
        description: "Marca actualizada exitosamente",
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

  const onSubmit = async (data: BrandFormData) => {
    if (!brand) return;
    openLoader({ size: "md", title: "Actualizando marca..." });
    await mutation.mutateAsync(data);
  };

  if (isLoadingBrands) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p>Cargando marca...</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p>Marca no encontrada</p>
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

      <h1 className="text-2xl font-bold mb-6">Editar Marca: {brand.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <RHFCustomInput
              name="name"
              control={control}
              label="Nombre de la Marca"
            />
          </div>

          <div className="md:col-span-2">
            <RHFCustomInput
              name="description"
              control={control}
              label="Descripción"
            />
          </div>

          <RHFCustomInput
            name="logo_url"
            control={control}
            label="URL del Logo"
          />

          <RHFCustomInput
            name="website_url"
            control={control}
            label="URL del Sitio Web"
          />

          <div className="md:col-span-2">
            <RHFCustomCheckbox
              name="is_active"
              control={control}
              label="Marca activa"
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
