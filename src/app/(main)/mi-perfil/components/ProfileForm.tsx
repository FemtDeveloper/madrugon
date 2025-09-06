"use client";

import {
  RHFCustomInput,
  RHFCustomSelect,
  RHFRadioButtons,
} from "@/components/Inputs";
import { useEffect } from "react";

import { CustomButton } from "@/components/Ui";
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
  const { handleSubmit, control, reset } = useForm<any>({
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
          Imagen de Perfil (URL)
        </label>
        {isEditing ? (
          <RHFCustomInput
            name="profile_image_url"
            control={control}
            label="URL de imagen de perfil"
          />
        ) : (
          <p className="mt-2 text-gray-800">
            {user?.profile_image_url || "No informa"}
          </p>
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
