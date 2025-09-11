// Shared types for the promos admin UI

export type PromoFormValues = {
  title: string;
  description?: string;
  image_url: string;
  cta_label?: string;
  cta_url: string;
  discount_text?: string;
  is_active: "true" | "false";
  is_modal: "true" | "false";
};
