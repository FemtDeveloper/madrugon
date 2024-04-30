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
      onClick={() => push(url)}
      className="favorite_container text-xs flex gap-1 absolute z-10 top-2 left-2 opacity-100 transition-opacity duration-500 text-white font-semibold bg-black rounded-full py-1 px-2"
    >
      Editar <EditIcon size={16} />
    </button>
  );
};

export default RedirectButton;
