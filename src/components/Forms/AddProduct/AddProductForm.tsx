"use client";
import { RHFCustomInput, RHFRadioButtons } from "@/components/Inputs";
import { CustomLink } from "@/components/Ui";
import { useImageStore } from "@/stores/useImageStore";
import { GENDERS } from "@/utils/menu";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddProductForm = () => {
  const images = useImageStore((state) => state.images);
  const { control, handleSubmit, watch } = useForm<Product>({
    defaultValues: { description: "", brand: "", name: "", gender: "Hombre" },
  });
  const selectedGender = watch("gender");

  console.log({ selectedGender });
  useEffect(() => {
    console.log({ selectedGender });
  }, [selectedGender]);

  const onSubmit: SubmitHandler<Product> = async (data, e) => {
    const supabase = createClient();
    e?.preventDefault();
    const { data: uploadDataResponse, error } = await supabase
      .from("products")
      .insert({ ...data, images });
    if (error) {
      throw new Error(error.message);
    }
    console.log({ uploadDataResponse });
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
      <RHFRadioButtons
        control={control}
        name="gender"
        options={GENDERS}
        label="Género"
      />
      <CustomLink btnTitle="Guardar" btnType="submit" type="button" />
    </form>
  );
};

export default AddProductForm;
