"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { RHFCustomInput, RHFRadioButtons } from "@/components/Inputs";
import { useModalStore, useUserStore } from "@/stores";
import { CustomButton } from "@/components/Ui";
import { updateUser } from "@/app/auth/actions";


const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const { openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );

  // user state available for form; avoid logging in production
  // ...existing code...

  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, control, reset } = useForm<userUpdateDTO>({
    defaultValues: {
      name: user?.name ?? "",
      phone_number: user?.phone_number ?? "",
      brand: user?.brand ?? "",
      age: user?.age ?? "",
      city: user?.city ?? "",
      isSeller: user?.isSeller ?? false,
    },
  });

  const onSubmit = async (data: userUpdateDTO, e: any) => {
    e.preventDefault();
    console.log({ data });

    if (!user) return null;
    await updateUser(data, user?.id);

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

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        phone_number: user.phone_number ?? "",
        brand: user.brand ?? "",
        age: user.age ?? "",
        city: user.city ?? "",
        isSeller: user.isSeller ?? false,
      });
    }
  }, [user, reset]);
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
      <div className="flex flex-col rounded-xl">
        {isEditing ? (
          <RHFRadioButtons
            control={control}
            name="isSeller"
            options={["Soy vendedor", "No soy vendedor"]}
            label="Soy vendedor"
            variant="small"
          />
        ) : (
          <p className="b1_bold ">
            {user?.isSeller ? "Soy vendedor" : "No soy vendedor"}{" "}
          </p>
        )}
      </div>

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
