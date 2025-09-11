"use client";

import { RHFCustomInput } from "@/components/Inputs";
import { CustomButton } from "@/components/Ui";
import { createPromoBanner, type PromoBannerInput } from "@/services/cms";
import { uploadPromoBannerImage } from "@/services/uploads";
import { listUsersAdmin } from "@/services/users/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Requerido"),
  description: z.string().optional(),
  image_url: z.string().url(),
  cta_label: z.string().optional(),
  cta_url: z.string().optional(),
  position: z.coerce.number().int().min(0),
  is_active: z.enum(["true", "false"]),
  user_id: z.string().uuid().optional().nullable(),
});

type FormData = z.infer<typeof schema>;

export const BannersAdminForm = () => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      cta_label: "",
      cta_url: "",
      position: 0,
      is_active: "true",
      user_id: undefined,
    },
  });
  console.log({ errors });

  const { data: users } = useQuery({
    queryKey: ["admin_users"],
    queryFn: () => listUsersAdmin(),
  });

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const pickImage = () => fileRef.current?.click();
  const imageUrl = watch("image_url");

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
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const { mutate: createMut, isPending } = useMutation({
    mutationFn: (v: FormData) =>
      createPromoBanner({
        title: v.title,
        description: v.description,
        image_url: v.image_url,
        cta_label: v.cta_label,
        cta_url: v.cta_url,
        position: v.position,
        is_active: v.is_active === "true",
        user_id: v.user_id ?? null,
      } as PromoBannerInput),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    console.log({ data });

    createMut(data);
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RHFCustomInput
        control={control}
        name="title"
        label="Título"
        placeholder="Título del banner"
      />
      <RHFCustomInput
        control={control}
        name="description"
        label="Descripción"
        placeholder="Descripción"
      />

      <div className="flex flex-col gap-2">
        <label className="b2 font-semibold">Imagen</label>
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
              Ver
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
        control={control}
        name="cta_label"
        label="Texto del botón"
        placeholder="Ver"
      />
      <RHFCustomInput
        control={control}
        name="cta_url"
        label="URL del CTA"
        placeholder="/promos"
      />
      <RHFCustomInput
        control={control}
        name="position"
        label="Posición"
        placeholder="0"
      />

      <Controller
        control={control}
        name="is_active"
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <label className="b2 font-semibold">Activa</label>
            <select
              className="input"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
        )}
      />

      <Controller
        control={control}
        name="user_id"
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <label className="b2 font-semibold">Usuario (pagando)</label>
            <select
              className="input"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value || undefined)}
            >
              <option value="">Ninguno</option>
              {users?.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.first_name || u.email} ({u.user_roles?.name || ""})
                </option>
              ))}
            </select>
          </div>
        )}
      />

      <div className="col-span-1 md:col-span-2">
        <CustomButton
          btnTitle="Crear banner"
          loading={isPending}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default BannersAdminForm;
