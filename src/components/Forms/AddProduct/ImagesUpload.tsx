"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

import { CloseIcon, PlusIcon } from "@/components/Icons";
import { CustomButton } from "@/components/Ui";
import { deleteImages, uploadImages } from "@/services/images";
import { useProductStore } from "@/stores/useProductStore";

interface Props {
  images?: string[];
}

const ImagesUpload = ({ images = [] }: Props) => {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const setImages = useProductStore((state) => state.setImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log({ images });

  const handleImagesUpload = async () => {
    const imagesUrlArray = await uploadImages(imagesToUpload);
    setImages(imagesUrlArray);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleImagesUpload,
    onSuccess:
      images.length > 0 && imagesToUpload.length > 0
        ? () => deleteImages(images, "products")
        : () => null,
  });

  const onFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImagesToUpload(filesArray);
    }
  };

  const handleRemoveImages = (index: number) => {
    setImagesToUpload((prev) => prev.filter((_, i) => i !== index));
  };
  console.log({ imagesToUpload });

  return (
    <div className="flex-1 flex gap-8 flex-col justify-between w-full">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex justify-center items-center relative rounded-2xl border-2 p-2 max-w-52  leading-none font-semibold"
      >
        Cargar Imágenes
        <PlusIcon size={32} color="#fff" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/gif, image/jpeg"
        className="hidden"
        onChange={onFilesSelected}
      />
      <div className="images-container flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-3">
          <h2 className="h3_bold">Imagenes del producto</h2>
          <div className="image-preview flex flex-wrap gap-4 w-full">
            {images?.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Preview ${index}`}
                width={200}
                height={200}
                className="object-cover h-40 w-32 rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="h3_bold">Nuevas imágenes</h2>
          <div className="image-preview flex flex-wrap gap-4">
            {imagesToUpload.map((file, index) => (
              <figure key={index} className="relative">
                <button
                  className="absolute -top-2 -right-2 z-10 bg-blur rounded-full"
                  onClick={() => handleRemoveImages(index)}
                >
                  <CloseIcon size={24} color="white" />
                </button>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  className="object-cover h-40 w-32 rounded-md"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
      <CustomButton
        btnTitle="Guardar imágenes"
        size="xLarge"
        onClick={mutate}
        loading={isPending}
      />
    </div>
  );
};

export default ImagesUpload;
