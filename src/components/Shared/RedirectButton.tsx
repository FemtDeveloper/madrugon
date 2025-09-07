"use client";

import { useRouter } from "next/navigation";
import { EditIcon } from "../Icons";

interface Props {
  url: string;
}

const RedirectButton = ({ url }: Props) => {
  const { push } = useRouter();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        push(url);
      }}
      className="favorite_container text-xs flex gap-1 absolute  opacity-100 transition-opacity duration-500 text-white font-semibold bg-black rounded-full py-1 px-2"
    >
      Editar <EditIcon size={16} />
    </button>
  );
};

export default RedirectButton;
