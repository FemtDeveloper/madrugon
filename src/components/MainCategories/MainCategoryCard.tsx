import Image from "next/image";
import React from "react";

import { ImageCard } from "@/interfaces/cards";

import { CustomLink } from "../Ui";

interface Props {
  content: ImageCard;
}

const MainCategoryCard = ({ content }: Props) => {
  const { btnTitle, img, path } = content;
  return (
    <article className="w-full relative min-h-52 lg:min-h-96 flex justify-center items-end max-w-96">
      <Image
        src={img}
        alt="Imágen de referencia"
        width={380}
        height={380}
        className="w-full object-cover rounded-xl lg:rounded-3xl h-full absolute -z-10 "
      />
      <div className="mb-6 lg:mb-10">
        <CustomLink path={`/categorias/${path}`} btnTitle={btnTitle} />
      </div>
    </article>
  );
};

export default MainCategoryCard;
