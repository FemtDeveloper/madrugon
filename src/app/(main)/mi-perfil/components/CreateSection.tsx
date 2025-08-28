"use client";

import CreateBrandForm from "./CreateBrandForm";
import CreateStoreForm from "./CreateStoreForm";
import { getMyProfile } from "@/utils/getMyProfile";

export default function CreateSection({ user }: any) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Crear Marca</h3>
        <CreateBrandForm user={user} onCreated={async () => await getMyProfile()} />
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Crear Tienda</h3>
        <CreateStoreForm user={user} onCreated={async () => await getMyProfile()} />
      </div>
    </div>
  );
}
