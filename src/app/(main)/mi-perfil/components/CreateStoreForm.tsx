"use client";

import RHFCustomInput from "@/components/Inputs/RHFCustomInput";
import { CustomButton } from "@/components/Ui";
import { createStore } from "@/services/stores";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateStoreForm({ _user, onCreated }: any) {
  const { handleSubmit, control, reset } = useForm<{
    name: string;
    slug?: string;
  }>({
    defaultValues: { name: "", slug: "" },
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: { name: string; slug?: string }) => {
    setLoading(true);
    try {
      await createStore({
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replaceAll(" ", "-"),
      });
      reset();
      if (onCreated) await onCreated();
      alert("Tienda creada");
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-2">
      <RHFCustomInput
        name="name"
        control={control}
        label="Nombre de la tienda"
      />
      <RHFCustomInput name="slug" control={control} label="Slug (opcional)" />
      <CustomButton
        loading={loading}
        btnTitle="Crear Tienda"
        btnType="submit"
        size="small"
      />
    </form>
  );
}
