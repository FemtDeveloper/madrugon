"use client";

import { RHFCustomInput, RHFCustomSelect } from "@/components/Inputs";
import { createPromoBanner, listPromoBanners } from "@/services/cms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { CustomButton } from "@/components/Ui";
import { uploadPromoBannerImage } from "@/services/uploads";
import { useModalStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/shallow";
import { PromoList } from "./PromoList";

const schema = z.object({
  title: z.string().min(1, "Título requerido"),
  description: z.string().optional(),
  image_url: z.string().url(),
  cta_label: z.string().optional(),
  cta_url: z.string(),
  discount_text: z.string().optional(),
  is_active: z.enum(["true", "false"]),
  is_modal: z.enum(["true", "false"]),
});

type FormData = z.infer<typeof schema>;

export const PromosAdminPageClient = () => {
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );

  const queryClient = useQueryClient();
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

  const { data, isLoading } = useQuery({
    queryKey: ["promo_banners"],
    queryFn: () => listPromoBanners(),
  });

  // Local state for image upload + preview
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageUrl = watch("image_url");

  const pickImage = () => fileRef.current?.click();
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadPromoBannerImage(file, {
        width: 1600,
        quality: 80,
      });
      setValue("image_url", url, { shouldDirty: true, shouldValidate: true });
    } catch (err) {
      console.error("Upload failed", err);
      openModal({
        title: "Error",
        description: "Error al subir la imagen",
        onConfirm: () => {
          closeModal();
        },
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

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
      queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
      reset();
    },
  });

  // mutations for list are handled inside <PromoList/>

  const onSubmit = (values: FormData) => createMut.mutate(values);

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
        {/* Image uploader (with compression + Firebase upload) */}
        <div className="flex flex-col gap-2">
          <label className="b2 font-semibold">Imagen </label>
          <div className="flex items-center gap-3">
            <CustomButton
              btnTitle={uploading ? "Subiendo..." : "Elegir imagen"}
              size="small"
              onClick={pickImage}
              btnType="button"
            />
            {imageUrl && (
              <a
                className="text-primary underline b2"
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en pestaña nueva
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
          {imageUrl && (
            <div className="mt-2 border rounded-lg p-2 w-fit">
              <Image
                src={imageUrl}
                alt="Preview"
                width={300}
                height={180}
                className="object-cover rounded"
              />
            </div>
          )}
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
        <div className="col-span-1 md:col-span-2 flex items-center gap-3">
          <CustomButton
            btnTitle={createMut.isPending ? "Guardando..." : "Crear"}
            btnType="submit"
          />
          {/* Live modal preview */}
          {imageUrl && (
            <div className="ml-auto">
              <details>
                <summary className="cursor-pointer b2">
                  Previsualizar modal
                </summary>
                <div className="mt-3 bg-white rounded-2xl w-[360px] shadow-xl overflow-hidden border">
                  <Image
                    src={imageUrl}
                    alt="Modal Preview"
                    width={720}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <h4 className="b1 font-semibold">
                      {watch("title") || "Título"}
                    </h4>
                    {watch("description") && (
                      <p className="b3 text-neutral-700">
                        {watch("description")}
                      </p>
                    )}
                    <div className="flex gap-2 mt-1">
                      <CustomButton
                        btnTitle="Cerrar"
                        variant="transparent"
                        size="small"
                        btnType="button"
                      />
                      {watch("cta_url") && (
                        <CustomButton
                          btnTitle={watch("cta_label") || "Ver"}
                          size="small"
                          btnType="button"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </details>
            </div>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <h3 className="h3">Listado</h3>
        {isLoading && <p>Cargando...</p>}
        <PromoList promoBanners={data as PromoBanner[]} />
      </div>
    </div>
  );
};
