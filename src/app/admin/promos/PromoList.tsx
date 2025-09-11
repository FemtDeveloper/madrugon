import { deletePromoBanner, updatePromoBanner } from "@/services/cms";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomButton } from "@/components/Ui";

interface Props {
  promoBanners: PromoBanner[];
}

export const PromoList = ({ promoBanners }: Props) => {
  const qc = useQueryClient();

  const { mutate: deleteMut } = useMutation({
    mutationFn: (id: string) => deletePromoBanner(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["promo_banners"] }),
  });

  const { mutate: updateMut } = useMutation({
    mutationFn: (v: { id: string; is_active: boolean }) =>
      updatePromoBanner(v.id, { is_active: v.is_active }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["promo_banners"] }),
  });
  return (
    <ul className="flex flex-col gap-3">
      {promoBanners?.map((p) => (
        <li
          key={p.id}
          className="border rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex flex-col">
            <span className="b1 font-semibold">{p.title}</span>
            <span className="b2 text-neutral-500">
              {p.cta_label} · {p.cta_url}
            </span>
          </div>
          <div className="flex gap-2">
            <CustomButton
              btnTitle={p.is_active ? "Desactivar" : "Activar"}
              variant="transparent"
              size="small"
              onClick={() => updateMut({ id: p.id, is_active: !p.is_active })}
            />
            <CustomButton
              btnTitle="Eliminar"
              variant="transparent"
              size="small"
              onClick={() => deleteMut(p.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
