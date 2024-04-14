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
import { AVAILABLE_SIZES } from "../../../mocks/options";
import { getSizes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "./schema";

const AddProductForm = () => {
  const images = useProductStore((state) => state.images);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Product>({
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
  const selectedSizes = watch("sizes");
  const selectedCategory = watch("category");
  const price = watch("price");
  const regular_price = watch("regular_price");

  // console.log({
  //   selectedGender,
  //   selectedSizes,
  //   selectedCategory,
  //   price,
  //   regular_price,
  // });

  console.log({ errors });

  const onSubmit: SubmitHandler<Product> = async (data, e) => {
    console.log({ data, errors });

    // const supabase = createClient();
    // e?.preventDefault();
    // const { data: uploadDataResponse, error } = await supabase
    //   .from("products")
    //   .insert({ ...data, images });
    // if (error) {
    //   throw new Error(error.message);
    // }
    // console.log({ uploadDataResponse });
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
      <CustomLink btnTitle="Guardar" btnType="submit" type="button" />
    </form>
  );
};

export default AddProductForm;
