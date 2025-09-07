"use client";

import {
  RHFCheckboxes,
  RHFCustomInput,
  RHFCustomNumericInput,
  RHFCustomSelect,
  RHFRadioButtons,
} from "@/components/Inputs";
import { addProduct, updateProduct } from "@/services/products";
import { getStoreById, getStoresByOwner } from "@/services/stores";
import { useModalStore, useUserStore } from "@/stores";
import { capitalize, getSizes } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import CreateBrandModal from "@/app/(main)/mi-perfil/components/CreateBrandModal";
import { CustomButton } from "@/components/Ui";
import { getBrandsByOwner } from "@/services/brands";
import { getAllCategories } from "@/services/categories";
import { useProductStore } from "@/stores/useProductStore";
import { GENDERS } from "@/utils/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import type { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { addProductSchema } from "./schema";

type FormData = z.infer<typeof addProductSchema>;

interface Props {
  product?: Product;
}

const AddProductForm = ({ product }: Props) => {
  const images = useProductStore((state) => state.images);
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      closeModal: state.closeModal,
      openModal: state.openModal,
    }))
  );
  const queryClient = useQueryClient();
  const pathName = usePathname();
  const user = useUserStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      description: product?.description ?? "",
      brand: (product?.brand as any) ?? "",
      name: product?.name ?? "",
      gender: (capitalize(product?.gender ?? "") ?? "Hombre") as Gender,
      sizes: (product?.sizes as any) ?? [],
      price: product?.price ?? 0,
      regular_price: product?.regular_price ?? 0,
      category_id: (product as any)?.category_id ?? "",
      store_id: (product as any)?.store_id ?? "",
    },
    resolver: zodResolver(addProductSchema),
  });
  const selectedGender = watch("gender");
  const selectedCategory = watch("category_id");
  const selectedStore = watch("store_id");

  const { data: brandsData = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      if (!user?.id) return [];
      return getBrandsByOwner(user.id);
    },
    enabled: !!user?.id,
  });

  const { data: categoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!user?.id) return [];
      return getAllCategories();
    },
    enabled: !!user?.id,
  });

  const { data: storesData = [] } = useQuery({
    queryKey: ["stores", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return getStoresByOwner(user.id);
    },
    enabled: !!user?.id,
  });

  const [showCreateBrandModal, setShowCreateBrandModal] = useState(false);
  const [missingStoreLabel, setMissingStoreLabel] = useState<string | null>(
    null
  );

  const selectedCategorySlug =
    categoriesData.find((c) => c.id === selectedCategory)?.slug ??
    selectedCategory;

  useEffect(() => {
    if (!selectedStore && storesData.length === 1) {
      setValue("store_id", storesData[0].id);
    }
  }, [selectedStore, storesData, setValue]);

  useEffect(() => {
    const prodStoreId = (product as any)?.store_id as string | undefined;
    if (!selectedStore && product && prodStoreId) {
      setValue("store_id", prodStoreId);
    } else {
      // preset skipped
    }
  }, [selectedStore, product, setValue, storesData.length]);

  useEffect(() => {
    const prodStoreId = (product as any)?.store_id as string | undefined;
    if (!prodStoreId) return;
    const exists = storesData.some((s) => s.id === prodStoreId);
    if (!exists) {
      (async () => {
        try {
          const s = await getStoreById(prodStoreId);
          setMissingStoreLabel(s?.name ?? "Tienda actual");
        } catch {
          setMissingStoreLabel("Tienda actual");
        }
      })();
    } else {
      setMissingStoreLabel(null);
    }
  }, [product, storesData]);

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    setIsLoading(true);

    e?.preventDefault();
    // Require at least one image before proceeding
    if (!images || images.length === 0) {
      setIsLoading(false);
      openModal({
        title: "Faltan imágenes",
        description:
          "Debes subir al menos una imagen del producto antes de guardar.",
        onConfirm: closeModal,
      });
      return;
    }
    const payload = {
      ...(data as unknown as Product),
      category_id: data.category_id,
      store_id: data.store_id,
    } as Product & { category_id: string; store_id: string };

    if (pathName.includes("edit")) {
      await updateProduct(
        payload,
        images,
        product?.id ? String(product.id) : undefined
      );
    } else {
      await addProduct(payload, images);
    }

    setIsLoading(false);
    openModal({
      title: "Actualización exitosa",
      description: "Tu producto ha sido actualizado exitosamente",
      onConfirm: closeModal,
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <RHFCustomInput
          control={control}
          name="name"
          placeholder="Ingresa el nombre de tu producto"
        />
        <RHFCustomInput
          control={control}
          name="description"
          placeholder="Ingresa la descripción de tu producto"
          inputHeight={300}
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <RHFCustomSelect
              control={control}
              name="brand"
              options={brandsData?.map((b) => ({ label: b.name, value: b.id }))}
              placeholder={user ? "Selecciona una marca" : "No tienes marcas"}
              label="Marca"
            />
          </div>
          <div className="flex-shrink-0 pt-6">
            <button
              type="button"
              className="text-sm text-primary underline"
              onClick={() => setShowCreateBrandModal(true)}
            >
              Crear marca
            </button>
          </div>
        </div>
        {/* Store select (controlled) */}
        <div>
          {(() => {
            const prodStoreId = (product as any)?.store_id as
              | string
              | undefined;
            const storeOptions = [
              ...(prodStoreId && !storesData.some((s) => s.id === prodStoreId)
                ? [
                    {
                      label: missingStoreLabel ?? "Tienda actual",
                      value: prodStoreId,
                    },
                  ]
                : []),
              ...storesData.map((s) => ({ label: s.name, value: s.id })),
            ];
            return (
              <RHFCustomSelect
                control={control}
                name="store_id"
                options={storeOptions}
                placeholder="Selecciona una tienda"
                label="Tienda"
              />
            );
          })()}
        </div>
        <div className="flex w-full justify-between gap-4">
          <RHFCustomNumericInput
            control={control}
            name="price"
            placeholder="Ingresa el precio final"
            type="currency"
          />
          <RHFCustomNumericInput
            control={control}
            name="regular_price"
            placeholder="Ingresa el precio original"
            type="currency"
          />
        </div>
        <RHFRadioButtons
          control={control}
          name="gender"
          options={GENDERS}
          label="Género"
        />
        <div>
          <RHFCustomSelect
            control={control}
            name="category_id"
            options={categoriesData.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
            placeholder="Selecciona una categoría"
            label="Categoría"
          />
        </div>
        <RHFCheckboxes
          control={control}
          name="sizes"
          options={getSizes(
            selectedGender as Gender,
            selectedCategorySlug as Category
          )}
          label="Tallas"
        />
        <CustomButton btnTitle="Guardar" btnType="submit" loading={isLoading} />
      </form>

      {showCreateBrandModal && (
        <CreateBrandModal
          onClose={() => setShowCreateBrandModal(false)}
          onSuccess={async () => {
            setShowCreateBrandModal(false);
            // refresh brands via query client
            await queryClient.invalidateQueries({
              queryKey: ["brands"],
              exact: false,
            });
            // also refresh local brands array
          }}
        />
      )}
    </>
  );
};

export default AddProductForm;
