"use client";

import { useEffect, useMemo, useState } from "react";

import { CustomLink } from "@/components/Ui";
import { listPromoModals } from "@/services/cms";
import { recordPromotionEvent } from "@/services/promotions";
import { useQuery } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import Image from "next/image";

const sessionKey = (id: string) => `promo_seen_${id}`;

const PromotionModal = () => {
  const { data } = useQuery({
    queryKey: ["promo_modals", { onlyActive: true }],
    queryFn: () => listPromoModals({ onlyActive: true }),
  });
  const first = useMemo(() => (data as any[])?.[0], [data]);
  const [visible, setVisible] = useState(false);

  // Decide visibility based on session storage and banner config
  useEffect(() => {
    if (!first) return;
    try {
      if (first.show_once_per_session) {
        const key = sessionKey(first.id);
        const seen = sessionStorage.getItem(key);
        if (seen) {
          setVisible(false);
          return;
        }
        sessionStorage.setItem(key, "1");
      }
    } catch {}
    setVisible(true);
  }, [first]);

  // Log view when it becomes visible
  useEffect(() => {
    if (visible && first?.id) {
      recordPromotionEvent(first.id as string, "view");
    }
  }, [visible, first]);

  if (!first || !visible) return null;

  const onClick = () => {
    recordPromotionEvent(first.id as string, "click");
    setVisible(false);
  };
  const onDismiss = () => {
    recordPromotionEvent(first.id as string, "dismiss");
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-2xl w-3/4 h-3/4 max-w-xl shadow-xl overflow-hidden">
        {first.image_url && (
          <Image
            src={first.image_url}
            alt={"Promoción"}
            fill
            className="w-full object-cover"
          />
        )}
        <div className="flex gap-3 mt-2 place-content-center place-items-center h-full w-full">
          {first.cta_url && (
            <CustomLink
              btnTitle={"Ver"}
              path={first.cta_url}
              size="small"
              className="py-2"
              onClick={onClick}
            />
          )}
        </div>
        <button
          onClick={onDismiss}
          className="absolute top-1 right-1 text-gray-100 hover:text-red-500/50 transition-colors duration-300"
          aria-label="Close promo modal"
        >
          <XCircle size={32} />
        </button>
      </div>
    </div>
  );
};

export default PromotionModal;
