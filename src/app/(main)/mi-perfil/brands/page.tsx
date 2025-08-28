"use client";

import { getBrandsByOwner, updateBrand } from "@/services/brands";
import { useCallback, useEffect, useState } from "react";

import RHFCustomCheckbox from "@/components/Inputs/RHFCustomCheckbox";
import RHFCustomInput from "@/components/Inputs/RHFCustomInput";
import { CustomButton } from "@/components/Ui";
import { useUserStore } from "@/stores";
import { useForm } from "react-hook-form";

export default function BrandsPage() {
  const user = useUserStore((s) => s.user);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const bs = await getBrandsByOwner(user.id);
      setBrands(bs || []);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="h2">Mis Marcas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="space-y-4 mt-4">
          {brands.map((b) => (
            <BrandRow key={b.id} brand={b} onSaved={load} />
          ))}
        </div>
      )}
    </div>
  );
}

function BrandRow({ brand, onSaved }: any) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: brand.name,
      slug: brand.slug,
      description: brand.description ?? "",
      logo_url: brand.logo_url ?? "",
      website_url: brand.website_url ?? "",
      is_active: !!brand.is_active,
    },
  });
  const [saving, setSaving] = useState(false);
  useEffect(
    () =>
      reset({
        name: brand.name,
        slug: brand.slug,
        description: brand.description ?? "",
        logo_url: brand.logo_url ?? "",
        website_url: brand.website_url ?? "",
        is_active: !!brand.is_active,
      }),
    [brand, reset]
  );

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      await updateBrand(brand.id, data);
      onSaved();
      alert("Guardado");
    } catch (e: any) {
      alert(e.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
        <RHFCustomInput name="name" control={control} label="Nombre" />
        <RHFCustomInput name="slug" control={control} label="Slug" />
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
      </div>
      <div className="flex items-center gap-2">
        <CustomButton
          btnType="submit"
          loading={saving}
          btnTitle={saving ? "Guardando..." : "Guardar"}
        />
      </div>
    </form>
  );
}
