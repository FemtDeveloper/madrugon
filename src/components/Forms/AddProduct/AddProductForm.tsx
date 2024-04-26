"use client";
import {
  RHFCheckboxes,
  RHFCustomInput,
  RHFCustomNumericInput,
  RHFRadioButtons,
} from "@/components/Inputs";
import { CustomLink } from "@/components/Ui";
import { useProductStore } from "@/stores/useProductStore";
import { CATEGORIES, GENDERS } from "@/utils/menu";
import { createClient } from "@/utils/supabase/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { getSizes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "./schema";
import { useState } from "react";

const AddProductForm = () => {
  const images = useProductStore((state) => state.images);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm<Product>({
    defaultValues: {
      description: "",
      brand: "",
      name: "",
      gender: "Hombre",
      sizes: [],
      price: null,
      regular_price: null,
      category: "Jeans",
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
      images,
      slug: data.name!.trim().toLowerCase().replaceAll(" ", "-"),
    });
    if (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  };
  console.log({ selectedGender });

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
        options={getSizes(
          selectedGender as Gender,
          selectedCategory as Category
        )}
        label="Tallas"
      />
      <CustomLink
        btnTitle="Guardar"
        btnType="submit"
        type="button"
        loading={isLoading}
      />
    </form>
  );
};

export default AddProductForm;
