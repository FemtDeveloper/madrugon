"use client";

import { CustomButton, CustomLink } from "@/components/Ui";
import { useEffect, useMemo, useState } from "react";

import { listPromoBanners } from "@/services/cms";
import { recordPromotionEvent } from "@/services/promotions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const sessionKey = (id: string) => `promo_seen_${id}`;

const PromotionModal = () => {
  const { data } = useQuery({
    queryKey: ["promo_banners", { modalOnly: true, onlyActive: true }],
    queryFn: () => listPromoBanners({ modalOnly: true, onlyActive: true }),
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
      <div className="relative bg-white rounded-2xl w-[92vw] max-w-xl shadow-xl overflow-hidden">
        {first.image_url && (
          <Image
            src={first.image_url}
            alt={first.title || "Promoción"}
            width={800}
            height={600}
            className="w-full object-cover"
          />
        )}
        <div className="p-6 flex flex-col gap-3">
          {first.title && <h3 className="h3 text-primary">{first.title}</h3>}
          {first.description && (
            <p className="b1 text-primary/80">{first.description}</p>
          )}
          <div className="flex gap-3 mt-2">
            <CustomButton
              btnTitle="Cerrar"
              variant="transparent"
              size="small"
              onClick={onDismiss}
            />
            {first.cta_url && (
              <CustomLink
                btnTitle={first.cta_label || "Ver"}
                path={first.cta_url}
                size="small"
                onClick={onClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
