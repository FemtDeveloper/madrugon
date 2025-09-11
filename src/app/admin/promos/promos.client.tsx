"use client";

import { RHFCustomInput, RHFCustomSelect } from "@/components/Inputs";
import {
  createPromoBanner,
  deletePromoBanner,
  listPromoBanners,
  updatePromoBanner,
} from "@/services/cms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { CustomButton } from "@/components/Ui";
import { uploadFileAndGetUrl } from "@/lib/firebase/storage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Título requerido"),
  description: z.string().optional(),
  image_url: z.string().url(),
  cta_label: z.string().optional(),
  cta_url: z.string().url().optional(),
  discount_text: z.string().optional(),
  is_active: z.enum(["true", "false"]),
  is_modal: z.enum(["true", "false"]),
});

type FormData = z.infer<typeof schema>;

export const PromosAdminPageClient = () => {
  const qc = useQueryClient();
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      cta_label: "",
      cta_url: "",
      discount_text: "",
      is_active: "true",
      is_modal: "false",
    },
  });
  const imageUrl = watch("image_url");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["promo_banners"],
    queryFn: () => listPromoBanners(),
  });

  const createMut = useMutation({
    mutationFn: (input: FormData) =>
      createPromoBanner({
        title: input.title,
        description: input.description,
        image_url: input.image_url,
        cta_label: input.cta_label,
        cta_url: input.cta_url,
        discount_text: input.discount_text,
        is_active: input.is_active === "true",
        is_modal: input.is_modal === "true",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promo_banners"] });
      reset();
    },
  });

  const updateMut = useMutation({
    mutationFn: (v: { id: string; patch: Partial<FormData> }) =>
      updatePromoBanner(v.id, {
        ...v.patch,
        is_active:
          v.patch.is_active !== undefined
            ? v.patch.is_active === "true"
            : undefined,
        is_modal:
          v.patch.is_modal !== undefined
            ? v.patch.is_modal === "true"
            : undefined,
      } as any),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["promo_banners"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deletePromoBanner(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["promo_banners"] }),
  });

  const onSubmit = (values: FormData) => createMut.mutate(values);
  const pickImage = () => fileRef.current?.click();
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const ts = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const path = `promo_banners/${ts}_${safeName}`;
      const url = await uploadFileAndGetUrl(path, file);
      setValue("image_url", url, { shouldDirty: true, shouldValidate: true });
    } catch (err) {
      console.error("Upload failed", err);
      alert("No se pudo subir la imagen. Revisa la consola.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <h2 className="h2">Promociones (Promo Banners)</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <RHFCustomInput
          name="title"
          control={control}
          label="Título"
          placeholder="Título"
        />
        <RHFCustomInput
          name="description"
          control={control}
          label="Descripción"
          placeholder="Descripción"
        />
        <div className="flex flex-col gap-2">
          <RHFCustomInput
            name="image_url"
            control={control}
            label="URL de imagen"
            placeholder="https://..."
          />
          <div className="flex items-center gap-3">
            <CustomButton
              btnTitle={uploading ? "Subiendo..." : "Subir imagen"}
              size="small"
              onClick={pickImage}
            />
            {imageUrl && (
              <a
                className="text-primary underline b2"
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver imagen
              </a>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
        <RHFCustomInput
          name="cta_label"
          control={control}
          label="Texto del botón"
          placeholder="Ver más"
        />
        <RHFCustomInput
          name="cta_url"
          control={control}
          label="URL del CTA"
          placeholder="/promos"
        />
        <RHFCustomInput
          name="discount_text"
          control={control}
          label="Texto de descuento"
          placeholder="30% OFF"
        />
        <RHFCustomSelect
          name="is_active"
          control={control}
          label="Activa"
          options={[
            { label: "Sí", value: "true" },
            { label: "No", value: "false" },
          ]}
        />
        <RHFCustomSelect
          name="is_modal"
          control={control}
          label="Es Modal"
          options={[
            { label: "No", value: "false" },
            { label: "Sí", value: "true" },
          ]}
        />
        <div className="col-span-1 md:col-span-2">
          <CustomButton
            btnTitle={createMut.isPending ? "Guardando..." : "Crear"}
            btnType="submit"
          />
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <h3 className="h3">Listado</h3>
        {isLoading && <p>Cargando...</p>}
        <ul className="flex flex-col gap-3">
          {(data as any[])?.map((p) => (
            <li
              key={p.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="b1 font-semibold">{p.title}</span>
                <span className="b2 text-neutral-500">
                  {p.cta_label} · {p.cta_url}
                </span>
              </div>
              <div className="flex gap-2">
                <CustomButton
                  btnTitle={p.is_active ? "Desactivar" : "Activar"}
                  variant="transparent"
                  size="small"
                  onClick={() =>
                    updateMut.mutate({
                      id: p.id,
                      patch: { is_active: (!p.is_active).toString() } as any,
                    })
                  }
                />
                <CustomButton
                  btnTitle="Eliminar"
                  variant="transparent"
                  size="small"
                  onClick={() => deleteMut.mutate(p.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
