"use client";
import { useUserStore } from "@/stores";

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Nombre
        </label>
        <p className="b1_bold">{user?.name}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Marca
        </label>
        <p className="b1_bold">{user?.brand}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Edad
        </label>
        <p className="b1_bold">{user?.age ? user.age : "No informa"}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="l2">
          Ciudad
        </label>
        <p className="b1_bold">{user?.city ? user.city : "No informa"}</p>
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
    </div>
  );
};

export default UserInfo;
