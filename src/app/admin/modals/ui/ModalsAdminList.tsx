"use client";

import { CustomButton } from "@/components/Ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePromoModal,
  listPromoModals,
  reorderPromoModals,
  updatePromoModal,
} from "@/services/cms";

export const ModalsAdminList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["promo_modals"], queryFn: () => listPromoModals() });

  const updateMut = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: any }) => updatePromoModal(id, patch),
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: ["promo_modals"] });
      const prev = queryClient.getQueryData<any[]>(["promo_modals"]);
      queryClient.setQueryData<any[]>(["promo_modals"], (old) => (old ?? []).map((m) => (m.id === id ? { ...m, ...patch } : m)));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["promo_modals"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["promo_modals"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deletePromoModal(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["promo_modals"] });
      const prev = queryClient.getQueryData<any[]>(["promo_modals"]);
      queryClient.setQueryData<any[]>(["promo_modals"], (old) => (old ?? []).filter((m) => m.id !== id));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["promo_modals"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["promo_modals"] }),
  });

  const reorderMut = useMutation({
    mutationFn: (order: { id: string; position: number }[]) => reorderPromoModals(order),
    onMutate: async (order) => {
      await queryClient.cancelQueries({ queryKey: ["promo_modals"] });
      const prev = queryClient.getQueryData<any[]>(["promo_modals"]);
      const mapPos = new Map(order.map((o) => [o.id, o.position]));
      queryClient.setQueryData<any[]>(["promo_modals"], (old) => (old ?? []).map((m) => ({ ...m, position: mapPos.get(m.id) ?? m.position })));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["promo_modals"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["promo_modals"] }),
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
        .map((m: any) => (
          <li key={m.id} className="border rounded p-3 flex items-center justify-between" draggable onDragStart={(e) => onDragStart(e, m.id)} onDrop={(e) => onDrop(e, m.id)}>
            <div className="flex gap-3 items-center">
              <span className="b2 cursor-grab">#{m.position}</span>
              <span className="b2">{m.cta_url || "(sin CTA)"}</span>
            </div>
            <div className="flex gap-2">
              <CustomButton btnTitle={m.is_active ? "Desactivar" : "Activar"} variant="transparent" size="small" onClick={() => updateMut.mutate({ id: m.id, patch: { is_active: !m.is_active } })} />
              <CustomButton btnTitle="Eliminar" variant="transparent" size="small" onClick={() => deleteMut.mutate(m.id)} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ModalsAdminList;
