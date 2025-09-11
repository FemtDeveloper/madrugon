import { BagIcon, UsersIcon } from "@/components/Icons";

import { SectionProps } from "@/interfaces/general";

export const sections: SectionProps[] = [
  { title: "Usuarios", icon: <UsersIcon size={50} />, url: "/admin/usuarios" },
  {
    title: "Productos",
    icon: <BagIcon size={50} />,
    url: "/admin/productos",
  },
];
