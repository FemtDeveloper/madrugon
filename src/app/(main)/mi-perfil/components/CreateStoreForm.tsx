"use client";

import RHFCustomCheckbox from "@/components/Inputs/RHFCustomCheckbox";
import RHFCustomInput from "@/components/Inputs/RHFCustomInput";
import { CustomButton } from "@/components/Ui";
import { createStore } from "@/services/stores";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateStoreForm({ _user, onCreated }: any) {
  const { handleSubmit, control, reset } = useForm<CreateStoreParams>({
    defaultValues: { name: "", slug: "" },
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: CreateStoreParams) => {
    setLoading(true);
    try {
      await createStore({
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replaceAll(" ", "-"),
        description: data.description ?? "",
        logo_url: data.logo_url ?? "",
        banner_url: data.banner_url ?? "",
        phone: data.phone ?? "",
        email: data.email ?? "",
        website_url: data.website_url ?? "",
        is_active: data.is_active ?? true,
        is_verified: data.is_verified ?? false,
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
      <RHFCustomInput name="logo_url" control={control} label="Logo URL" />
      <RHFCustomInput name="banner_url" control={control} label="Banner URL" />
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
      <RHFCustomInput name="phone" control={control} label="Teléfono" />
      <RHFCustomInput name="email" control={control} label="Email" />
      <RHFCustomCheckbox control={control} name="is_active" label="Activa" />
      <RHFCustomCheckbox
        control={control}
        name="is_verified"
        label="Verificada"
      />
      <CustomButton
        loading={loading}
        btnTitle="Crear Tienda"
        btnType="submit"
        size="small"
      />
    </form>
  );
}
