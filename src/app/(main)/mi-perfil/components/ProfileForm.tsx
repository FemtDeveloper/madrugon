"use client";

import {
  RHFCustomInput,
  RHFCustomSelect,
  RHFRadioButtons,
} from "@/components/Inputs";
import { useEffect, useRef, useState } from "react";

import { CustomButton } from "@/components/Ui";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  user: any;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  onSubmit: (data: any, e: any) => Promise<void>;
}

export default function ProfileForm({
  user,
  isEditing,
  setIsEditing,
  onSubmit,
}: Props) {
  const { handleSubmit, control, reset, setValue, watch } = useForm<any>({
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone: user?.phone ?? "",
      date_of_birth: user?.date_of_birth ?? "",
      gender: user?.gender ?? "",
      profile_image_url: user?.profile_image_url ?? "",
      is_seller: user?.is_seller ?? false,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const profileUrl = watch("profile_image_url") as string | undefined;

  useEffect(() => {
    reset({
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone: user?.phone ?? "",
      date_of_birth: user?.date_of_birth ?? "",
      gender: user?.gender ?? "",
      profile_image_url: user?.profile_image_url ?? "",
      is_seller: user?.is_seller ?? false,
    });
  }, [user, reset]);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative group">
        <label className="text-gray-600 text-xs font-semibold">Nombre</label>
        {isEditing ? (
          <RHFCustomInput name="first_name" control={control} label="Nombre" />
        ) : (
          <p className="mt-2 text-gray-800">
            {user?.first_name || "No informa"}
          </p>
        )}
      </div>
      <div className="relative group">
        <label className="text-gray-600 text-xs font-semibold">Apellido</label>
        {isEditing ? (
          <RHFCustomInput name="last_name" control={control} label="Apellido" />
        ) : (
          <p className="mt-2 text-gray-800">
            {user?.last_name || "No informa"}
          </p>
        )}
      </div>
      <div className="relative group">
        <label className="text-gray-600 text-xs font-semibold">Teléfono</label>
        {isEditing ? (
          <RHFCustomInput name="phone" control={control} label="Teléfono" />
        ) : (
          <p className="mt-2 text-gray-800">{user?.phone || "No informa"}</p>
        )}
      </div>
      <div className="relative group">
        <label className="text-gray-600 text-xs font-semibold">
          Fecha de nacimiento
        </label>
        {isEditing ? (
          <RHFCustomInput
            name="date_of_birth"
            control={control}
            label="Fecha de nacimiento"
            type="date"
          />
        ) : (
          <p className="mt-2 text-gray-800">
            {user?.date_of_birth
              ? new Date(user.date_of_birth).toLocaleDateString()
              : "No informa"}
          </p>
        )}
      </div>
      <div className="relative group">
        <label className="text-gray-600 text-xs font-semibold">Género</label>
        {isEditing ? (
          <RHFCustomSelect
            name="gender"
            control={control}
            label="Género"
            placeholder="Seleccionar género"
            options={[
              { label: "Masculino", value: "M" },
              { label: "Femenino", value: "F" },
              { label: "Otro", value: "O" },
              { label: "Prefiero no decirlo", value: "" },
            ]}
          />
        ) : (
          <p className="mt-2 text-gray-800">
            {user?.gender === "M"
              ? "Masculino"
              : user?.gender === "F"
              ? "Femenino"
              : user?.gender === "O"
              ? "Otro"
              : "No informa"}
          </p>
        )}
      </div>
      <div className="relative group">
        <label className="text-gray-600 text-xs font-semibold">
          Imagen de Perfil
        </label>
        {isEditing ? (
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <Image
                src={profileUrl || "/assets/images/isoicon.png"}
                alt="avatar preview"
                width={64}
                height={64}
                className="rounded-full border object-cover w-16 h-16"
              />
            </div>
            <div className="flex items-center gap-2">
              <RHFCustomInput
                name="profile_image_url"
                control={control}
                label="URL de imagen de perfil"
              />
              <button
                type="button"
                className="px-3 py-2 text-xs border rounded"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Subiendo..." : "Subir"}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file || !user?.id) return;
                setUploading(true);
                try {
                  const { uploadImageToFirebase } = await import(
                    "@/services/uploads"
                  );
                  const url = await uploadImageToFirebase(
                    file,
                    { kind: "profile", userId: user.id },
                    { width: 800, quality: 80, format: "webp" }
                  );
                  setValue("profile_image_url", url, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                } catch (err) {
                  console.error(err);
                  alert("Error subiendo la imagen de perfil");
                } finally {
                  setUploading(false);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        ) : (
          <div className="mt-2">
            <Image
              src={user?.profile_image_url || "/assets/images/isoicon.png"}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full border object-cover w-20 h-20"
            />
          </div>
        )}
      </div>
      <div className="relative group col-span-1 md:col-span-2">
        <label className="text-gray-600 text-xs font-semibold">
          Tipo de usuario
        </label>
        {isEditing ? (
          <RHFRadioButtons
            control={control}
            name="is_seller"
            options={[
              { label: "Soy vendedor", value: true },
              { label: "No soy vendedor", value: false },
            ]}
            label=""
            variant="small"
          />
        ) : (
          <p className="mt-2 text-gray-800">
            {user?.is_seller ? "Soy vendedor" : "No soy vendedor"}
          </p>
        )}
      </div>
      <div className="col-span-1 md:col-span-2 flex gap-3 justify-end mt-4">
        {isEditing ? (
          <>
            <CustomButton
              btnTitle="Cancelar"
              onClick={() => setIsEditing(false)}
              variant="transparent"
              size="small"
            />
            <CustomButton btnTitle="Guardar" btnType="submit" size="small" />
          </>
        ) : null}
      </div>
    </form>
  );
}
