"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  RHFCheckboxes,
  RHFCustomInput,
  RHFCustomNumericInput,
  RHFRadioButtons,
} from "@/components/Inputs";
import { CustomButton } from "@/components/Ui";
import { useProductStore } from "@/stores/useProductStore";
import { capitalize, getSizes } from "@/utils";
import { CATEGORIES, GENDERS } from "@/utils/menu";
import { createClient } from "@/utils/supabase/client";

import { addProductSchema } from "./schema";

interface Props {
  product?: Product;
}

const AddProductForm = ({ product }: Props) => {
  const images = useProductStore((state) => state.images);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm<Product>({
    defaultValues: {
      description: product?.description ?? "",
      brand: product?.brand ?? "",
      name: product?.name ?? "",
      gender: (capitalize(product?.gender ?? "") ?? "Hombre") as Gender,
      sizes: product?.sizes ?? [],
      price: product?.price ?? null,
      regular_price: product?.regular_price ?? null,
      category: (capitalize(product?.category ?? "") ?? "Jeans") as Category,
    },
    resolver: zodResolver(addProductSchema),
  });
  const selectedGender = watch("gender");
  const selectedCategory = watch("category");

  const onSubmit: SubmitHandler<Product> = async (data, e) => {
    setIsLoading(true);
    const supabase = createClient();
    e?.preventDefault();
    const { error } = await supabase.from("products").insert({
      ...data,
      category: data.category?.toLowerCase(),
      images,
      slug: data.name!.trim().toLowerCase().replaceAll(" ", "-"),
    });
    if (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  };
  console.log({ selectedGender, product });

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
      <RHFRadioButtons
        control={control}
        name="category"
        options={CATEGORIES}
        label="Categorías"
      />
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
