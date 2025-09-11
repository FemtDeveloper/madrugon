import { CustomButton } from "@/components/Ui";
import Image from "next/image";

interface Props {
  imageUrl: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export const LiveModalPreview = ({
  imageUrl,
  title,
  description,
  ctaLabel,
  ctaUrl,
}: Props) => {
  return (
    <div className="ml-auto">
      <details>
        <summary className="cursor-pointer b2">Previsualizar modal</summary>
        <div className="mt-3 bg-white rounded-2xl w-[360px] shadow-xl overflow-hidden border">
          <Image
            src={imageUrl}
            alt="Modal Preview"
            width={720}
            height={400}
            className="w-full object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h4 className="b1 font-semibold">{title || "Título"}</h4>
            {description && (
              <p className="b3 text-neutral-700">{description}</p>
            )}
            <div className="flex gap-2 mt-1">
              <CustomButton
                btnTitle="Cerrar"
                variant="transparent"
                size="small"
                btnType="button"
              />
              {ctaUrl && (
                <CustomButton
                  btnTitle={ctaLabel || "Ver"}
                  size="small"
                  btnType="button"
                />
              )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
