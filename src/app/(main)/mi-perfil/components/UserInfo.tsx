"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { RHFCustomInput } from "@/components/Inputs";
import { CustomButton } from "@/components/Ui";
import { supabase } from "@/lib/supabase/client";
import { useModalStore, useUserStore } from "@/stores";

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      phone_number: user?.phone_number ?? "",
      brand: user?.brand ?? "",
      age: user?.age ?? "",
      city: user?.city ?? "",
      isSeller: user?.isSeller,
    },
  });

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    await supabase
      .from("users")
      .update({
        name: `${data.name.trim()}`,
        phone_number: data.phone_number,
        brand: data.brand ?? "",
        age: Number(data.age),
        city: data.city ?? "",
      })
      .eq("id", user!.id);
    console.log("actualización exitosa");

    openModal({
      description: "Has Actualizado tus datos exitosamente",
      title: "Actualización exitosa",
      onConfirm: closeModal,
    });
    setIsEditing(false);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };
  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Nombre
        </label>
        {isEditing ? (
          <RHFCustomInput name="name" control={control} />
        ) : (
          <p className="b1_bold">{user?.name ? user.name : "No informa"}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Teléfono
        </label>
        {isEditing ? (
          <RHFCustomInput name="phone_number" control={control} />
        ) : (
          <p className="b1_bold">
            {user?.phone_number ? user.phone_number : "No informa"}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Marca
        </label>
        {isEditing ? (
          <RHFCustomInput name="brand" control={control} />
        ) : (
          <p className="b1_bold">{user?.brand ? user.brand : "No informa"}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Edad
        </label>
        {isEditing ? (
          <RHFCustomInput name="age" control={control} />
        ) : (
          <p className="b1_bold">
            {user?.age ? `${user.age} años` : "No informa"}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Ciudad
        </label>
        {isEditing ? (
          <RHFCustomInput name="city" control={control} />
        ) : (
          <p className="b1_bold">{user?.city ? user.city : "No informa"}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Correo
        </label>
        <p className="b1_bold">{user?.email ? user.email : "No informa"}</p>
      </div>
      {user?.isSeller && (
        <div className="flex flex-col rounded-xl">
          <p className="b1_bold "> Soy vendedor </p>
        </div>
      )}

      <div className="flex w-full gap-4 my-10">
        {isEditing ? (
          <>
            <CustomButton
              onClick={() => setIsEditing(false)}
              btnTitle="Cancelar"
              variant="transparent"
            />
            <CustomButton btnTitle="Guardar" btnType="submit" />
          </>
        ) : (
          <CustomButton onClick={() => setIsEditing(true)} btnTitle="Editar" />
        )}
      </div>
    </form>
  );
};

export default UserInfo;
