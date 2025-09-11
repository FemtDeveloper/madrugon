"use client";

import { CustomButton } from "@/components/Ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePromoBanner, listPromoBanners, reorderPromoBanners, updatePromoBanner } from "@/services/cms";

export const BannersAdminList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["promo_banners"], queryFn: () => listPromoBanners() });

  const updateMut = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: any }) => updatePromoBanner(id, patch),
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: ["promo_banners"] });
      const prev = queryClient.getQueryData<any[]>(["promo_banners"]);
      queryClient.setQueryData<any[]>(["promo_banners"], (old) => (old ?? []).map((b) => (b.id === id ? { ...b, ...patch } : b)));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["promo_banners"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["promo_banners"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deletePromoBanner(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["promo_banners"] });
      const prev = queryClient.getQueryData<any[]>(["promo_banners"]);
      queryClient.setQueryData<any[]>(["promo_banners"], (old) => (old ?? []).filter((b) => b.id !== id));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["promo_banners"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["promo_banners"] }),
  });

  const reorderMut = useMutation({
    mutationFn: (order: { id: string; position: number }[]) => reorderPromoBanners(order),
    onMutate: async (order) => {
      await queryClient.cancelQueries({ queryKey: ["promo_banners"] });
      const prev = queryClient.getQueryData<any[]>(["promo_banners"]);
      const mapPos = new Map(order.map((o) => [o.id, o.position]));
      queryClient.setQueryData<any[]>(["promo_banners"], (old) => (old ?? []).map((b) => ({ ...b, position: mapPos.get(b.id) ?? b.position })));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["promo_banners"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["promo_banners"] }),
  });

  if (!data) return null;

  const onDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const onDrop = (e: React.DragEvent<HTMLLIElement>, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (!draggedId || draggedId === targetId) return;
    const items = [...data].sort((a: any, b: any) => a.position - b.position);
    const draggedIdx = items.findIndex((i) => i.id === draggedId);
    const targetIdx = items.findIndex((i) => i.id === targetId);
    if (draggedIdx < 0 || targetIdx < 0) return;
    const [dragged] = items.splice(draggedIdx, 1);
    items.splice(targetIdx, 0, dragged);
    const newOrder = items.map((i, idx) => ({ id: i.id, position: idx }));
    reorderMut.mutate(newOrder);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <ul className="flex flex-col gap-2" onDragOver={onDragOver}>
      {data
        .slice()
        .sort((a: any, b: any) => a.position - b.position)
        .map((b: any) => (
          <li key={b.id} className="border rounded p-3 flex items-center justify-between" draggable onDragStart={(e) => onDragStart(e, b.id)} onDrop={(e) => onDrop(e, b.id)}>
            <div className="flex gap-3 items-center">
              <span className="b2 cursor-grab">#{b.position}</span>
              <span className="b2 font-semibold">{b.title}</span>
            </div>
            <div className="flex gap-2">
              <CustomButton btnTitle={b.is_active ? "Desactivar" : "Activar"} variant="transparent" size="small" onClick={() => updateMut.mutate({ id: b.id, patch: { is_active: !b.is_active } })} />
              <CustomButton btnTitle="Eliminar" variant="transparent" size="small" onClick={() => deleteMut.mutate(b.id)} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default BannersAdminList;
