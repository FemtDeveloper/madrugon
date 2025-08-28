"use client";

import RHFCustomCheckbox from "@/components/Inputs/RHFCustomCheckbox";
import RHFCustomInput from "@/components/Inputs/RHFCustomInput";
import { CustomButton } from "@/components/Ui";
import { createBrand } from "@/services/brands";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateBrandForm({ _user, onCreated }: any) {
  const { handleSubmit, control, reset } = useForm<{
    name: string;
    slug?: string;
    description?: string | null;
    logo_url?: string | null;
    website_url?: string | null;
    is_active?: boolean;
  }>({
    defaultValues: { name: "", slug: "" },
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: { name: string; slug?: string }) => {
    setLoading(true);
    try {
      await createBrand({
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replaceAll(" ", "-"),
        description: (data as any).description ?? null,
        logo_url: (data as any).logo_url ?? null,
        website_url: (data as any).website_url ?? null,
        is_active: (data as any).is_active ?? true,
      });
      reset();
      if (onCreated) await onCreated();
      alert("Marca creada");
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
        label="Nombre de la marca"
      />
      <RHFCustomInput name="slug" control={control} label="Slug (opcional)" />
      <RHFCustomInput name="logo_url" control={control} label="Logo URL" />
      <RHFCustomInput
        name="website_url"
        control={control}
        label="Website URL"
      />
      <RHFCustomInput
        name="description"
        control={control}
        label="Descripción"
      />
      <RHFCustomCheckbox control={control} name="is_active" label="Activa" />
      <CustomButton
        loading={loading}
        btnTitle="Crear Marca"
        btnType="submit"
        size="small"
      />
    </form>
  );
}
