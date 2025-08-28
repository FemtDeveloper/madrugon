"use client";

import { getStoresByOwner, updateStore } from "@/services/stores";
import { useCallback, useEffect, useState } from "react";

import RHFCustomCheckbox from "@/components/Inputs/RHFCustomCheckbox";
import RHFCustomInput from "@/components/Inputs/RHFCustomInput";
import { CustomButton } from "@/components/Ui";
import { useUserStore } from "@/stores";
import { useForm } from "react-hook-form";

export default function StoresPage() {
  const user = useUserStore((s) => s.user);
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const ss = await getStoresByOwner(user.id);
      setStores(ss || []);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="h2">Mis Tiendas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="space-y-4 mt-4">
          {stores.map((s) => (
            <StoreRow key={s.id} store={s} onSaved={load} />
          ))}
        </div>
      )}
    </div>
  );
}

function StoreRow({ store, onSaved }: any) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: store.name,
      slug: store.slug,
      description: store.description ?? "",
      logo_url: store.logo_url ?? "",
      banner_url: store.banner_url ?? "",
      phone: store.phone ?? "",
      email: store.email ?? "",
      website_url: store.website_url ?? "",
      is_active: !!store.is_active,
      is_verified: !!store.is_verified,
    },
  });
  const [saving, setSaving] = useState(false);
  useEffect(
    () =>
      reset({
        name: store.name,
        slug: store.slug,
        description: store.description ?? "",
        logo_url: store.logo_url ?? "",
        banner_url: store.banner_url ?? "",
        phone: store.phone ?? "",
        email: store.email ?? "",
        website_url: store.website_url ?? "",
        is_active: !!store.is_active,
        is_verified: !!store.is_verified,
      }),
    [store, reset]
  );

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      await updateStore(store.id, data);
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
          name="banner_url"
          control={control}
          label="Banner URL"
        />
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
