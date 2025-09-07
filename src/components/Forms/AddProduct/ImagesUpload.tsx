"use client";

import { CloseIcon, PlusIcon } from "@/components/Icons";
import { ChangeEvent, useRef, useState } from "react";

import { CustomButton } from "@/components/Ui";
import { uploadProductImagesToFirebase } from "@/services/uploads";
import { useUserStore } from "@/stores";
import { useProductStore } from "@/stores/useProductStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  images?: string[];
}

const MAX_IMAGES = 3;

const ImagesUpload = ({ images = [] }: Props) => {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const setImages = useProductStore((state) => state.setImages);
  const storeImages = useProductStore((state) => state.images);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((s) => s.user);
  const [error, setError] = useState<string | null>(null);

  const handleImagesUpload = async () => {
    setError(null);
    if (!user?.id) {
      throw new Error("Debes iniciar sesión para subir imágenes");
    }
    // Enforce global max: existing + new <= MAX_IMAGES
    const remaining = Math.max(0, MAX_IMAGES - (storeImages?.length || 0));
    const files = imagesToUpload.slice(0, remaining);
    if (files.length === 0) {
      setError(
        `Ya tienes ${MAX_IMAGES} imágenes. Elimina alguna para subir nuevas.`
      );
      return;
    }
    const urls = await uploadProductImagesToFirebase(files, {
      userId: user.id,
      width: 1600,
      quality: 80,
    });
    const next = [...(storeImages || []), ...urls].slice(0, MAX_IMAGES);
    setImages(next);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleImagesUpload,
    onError: (e: any) =>
      setError(e?.message ?? "No se pudieron subir las imágenes"),
  });

  const onFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).filter((f) =>
        f.type.startsWith("image/")
      );
      const remaining = Math.max(0, MAX_IMAGES - (storeImages?.length || 0));
      if (filesArray.length > remaining) {
        setError(
          `Solo puedes seleccionar ${remaining} imagen(es) adicional(es)`
        );
        setImagesToUpload(filesArray.slice(0, remaining));
      } else {
        setError(null);
        setImagesToUpload(filesArray);
      }
    }
  };

  const handleRemoveImages = (index: number) => {
    setImagesToUpload((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExisting = (index: number) => {
    const next = (storeImages || []).filter((_, i) => i !== index);
    setImages(next);
  };

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
            {(storeImages && storeImages.length > 0
              ? storeImages
              : images
            )?.map((image, index) => (
              <figure key={index} className="relative">
                <button
                  className="absolute -top-2 -right-2 z-10 bg-blur rounded-full"
                  onClick={() => handleRemoveExisting(index)}
                  type="button"
                  title="Eliminar imagen"
                >
                  <CloseIcon size={24} color="white" />
                </button>
                <Image
                  src={image}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  className="object-cover h-40 w-32 rounded-md"
                />
              </figure>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="h3_bold">Nuevas imágenes</h2>
          <p className="b3 text-muted-foreground">
            Máximo 3 imágenes. Se comprimen automáticamente antes de subir.
          </p>
          {error && <p className="b3 text-red-500">{error}</p>}
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
        disabled={imagesToUpload.length === 0}
      />
    </div>
  );
};

export default ImagesUpload;
