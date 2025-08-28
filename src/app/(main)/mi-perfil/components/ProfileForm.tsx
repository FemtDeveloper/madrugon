"use client";

import { RHFCustomInput, RHFCustomSelect, RHFRadioButtons } from "@/components/Inputs";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";

interface Props {
  user: any;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  onSubmit: (data: any, e: any) => Promise<void>;
}

export default function ProfileForm({ user, isEditing, setIsEditing, onSubmit }: Props) {
  const { handleSubmit, control, reset } = useForm<any>({
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone: user?.phone ?? "",
      date_of_birth: user?.date_of_birth ?? "",
      gender: user?.gender ?? "",
      is_seller: user?.is_seller ?? false,
    },
  });

  React.useEffect(() => {
    reset({
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone: user?.phone ?? "",
      date_of_birth: user?.date_of_birth ?? "",
      gender: user?.gender ?? "",
      is_seller: user?.is_seller ?? false,
    });
  }, [user, reset]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative group">
        {isEditing ? <RHFCustomInput name="first_name" control={control} label="Nombre" /> : <p className="mt-6">{user?.first_name || 'No informa'}</p>}
      </div>
      <div className="relative group">
        {isEditing ? <RHFCustomInput name="last_name" control={control} label="Apellido" /> : <p className="mt-6">{user?.last_name || 'No informa'}</p>}
      </div>
      <div className="relative group">
        {isEditing ? <RHFCustomInput name="phone" control={control} label="Teléfono" /> : <p className="mt-6">{user?.phone || 'No informa'}</p>}
      </div>
      <div className="relative group">
        {isEditing ? <RHFCustomInput name="date_of_birth" control={control} label="Fecha de nacimiento" type="date" /> : <p className="mt-6">{user?.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'No informa'}</p>}
      </div>
      <div className="relative group">
        {isEditing ? (
          <RHFCustomSelect name="gender" control={control} label="Género" placeholder="Seleccionar género" options={[{label:'Masculino',value:'M'},{label:'Femenino',value:'F'},{label:'Otro',value:'O'},{label:'Prefiero no decirlo',value:''}]} />
        ) : (
          <p className="mt-6">{user?.gender || 'No informa'}</p>
        )}
      </div>
      <div className="relative group col-span-1 md:col-span-2">
        <label className="text-gray-600 text-xs font-semibold left-3 top-2 bg-white px-1">Tipo de usuario</label>
        {isEditing ? (
          <RHFRadioButtons control={control} name="is_seller" options={[{label:'Soy vendedor',value:true},{label:'No soy vendedor',value:false}]} label="" variant="small" />
        ) : (
          <p className="mt-6">{user?.is_seller ? 'Soy vendedor' : 'No soy vendedor'}</p>
        )}
      </div>
      <div className="col-span-1 md:col-span-2 flex gap-3 justify-end mt-4">
        {isEditing ? (
          <>
            <button type="button" className="btn-neutral" onClick={() => setIsEditing(false)}><X size={18}/> Cancelar</button>
            <button type="submit" className="btn-primary"><Check size={18}/> Guardar</button>
          </>
        ) : null}
      </div>
    </form>
  );
}
