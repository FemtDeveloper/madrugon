"use client";

import { uploadImages } from "@/app/actions";
import { PlusIcon } from "@/components/Icons";
import { CustomButton } from "@/components/Ui";
import { useProductStore } from "@/stores/useProductStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const ImagesUpload = () => {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const setImages = useProductStore((state) => state.setImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImagesUpload = async () => {
    const imagesUrlArray = await uploadImages(imagesToUpload);
    setImages(imagesUrlArray);
  };

  const { mutate, isPending } = useMutation({ mutationFn: handleImagesUpload });

  const onFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImagesToUpload(filesArray);
    }
  };

  return (
    <div className="flex-1 flex gap-8 flex-col">
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
      <div className="image-preview flex flex-wrap gap-4">
        {imagesToUpload.map((file, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            width={200}
            height={200}
            className="object-cover"
          />
        ))}
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
