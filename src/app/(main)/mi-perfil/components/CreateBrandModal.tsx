"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RHFCustomInput } from "@/components/Inputs";
import { CustomButton } from "@/components/Ui";
import { createBrand } from "@/services/brands";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

interface BrandFormData {
  name: string;
}

interface Props {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function CreateBrandModal({ onSuccess, onClose }: Props) {
  const queryClient = useQueryClient();

  const { handleSubmit, control } = useForm<BrandFormData>({
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    onClose?.();
  };

  const mutation = useMutation({
    mutationFn: async (data: BrandFormData) => {
      const slug = data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      return createBrand({
        name: data.name,
        slug,
        description: null,
        logo_url: null,
        website_url: null,
        is_active: true,
      });
    },
    onSuccess: async () => {
      // Invalidate brand queries so lists refresh
      await queryClient.invalidateQueries({
        queryKey: ["brands"],
        exact: false,
      });
      onSuccess?.();
    },
  });

  const onSubmit = async (data: BrandFormData) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Crear Nueva Marca</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <RHFCustomInput
            name="name"
            control={control}
            label="Nombre de la Marca"
          />

          <div className="flex gap-3 justify-end pt-4">
            <CustomButton
              btnTitle="Cancelar"
              onClick={handleClose}
              variant="transparent"
              size="small"
            />
            <CustomButton
              btnTitle="Crear Marca"
              btnType="submit"
              loading={mutation.isPending}
              size="small"
            />
            {mutation.isError ? (
              <p className="text-sm text-red-600 mt-2">
                {(mutation.error as any)?.message ?? "Error al crear la marca"}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
