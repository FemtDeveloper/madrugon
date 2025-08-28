"use client";

import {
  RHFCheckboxes,
  RHFCustomInput,
  RHFCustomNumericInput,
  RHFRadioButtons,
} from "@/components/Inputs";
import { addProduct, updateProduct } from "@/services/products";
import { capitalize, getSizes } from "@/utils";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { CustomButton } from "@/components/Ui";
import { getAllCategories } from "@/services/categories";
import { getStoresByOwner } from "@/services/stores";
import { useModalStore, useUserStore } from "@/stores";
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
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      description: product?.description ?? "",
      brand: product?.brand ?? "",
      name: product?.name ?? "",
      gender: (capitalize(product?.gender ?? "") ?? "Hombre") as Gender,
      sizes: product?.sizes ?? [],
      price: product?.price ?? 0,
      regular_price: product?.regular_price ?? 0,
      category_id: product?.category_id ?? "",
      store_id: product?.store_id ?? "",
    },
    resolver: zodResolver(addProductSchema),
  });
  const selectedGender = watch("gender");
  const selectedCategory = watch("category_id");

  const user = useUserStore((s) => s.user);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [stores, setStores] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats ?? []);
        if (user?.id) {
          const myStores = await getStoresByOwner(user.id);
          setStores(myStores ?? []);
        }
      } catch (err) {
        console.error("Failed to load categories/stores:", err);
      }
    })();
  }, [user]);

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    setIsLoading(true);

    e?.preventDefault();
    const payload = {
      ...(data as unknown as Product),
      category_id: data.category_id,
      store_id: data.store_id,
    } as Product & { category_id: string; store_id: string };

    if (pathName.includes("edit")) {
      await updateProduct(payload, images, product?.id);
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
      <RHFCustomInput
        control={control}
        name="brand"
        placeholder="Ingresa tu marca"
      />
      {/* Store select */}
      <div>
        <label className="b1">Tienda</label>
        <select
          {...(control as any).register("store_id")}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona una tienda</option>
          {stores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
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
        <label className="b1">Categoría</label>
        <select
          {...(control as any).register("category_id")}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <RHFCheckboxes
        control={control}
        name="sizes"
        options={
          product?.sizes ??
          getSizes(selectedGender as Gender, selectedCategory as Category)
        }
        label="Tallas"
      />
      <CustomButton btnTitle="Guardar" btnType="submit" loading={isLoading} />
    </form>
  );
};

export default AddProductForm;
