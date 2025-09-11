import { createClient } from "@/utils";

type ModerationAction = "ban_user" | "suspend_user" | "verify_user" | "remove_product" | "reinstate_product";

const logModeration = async (params: {
  target_type: "user" | "product" | "store" | "asset" | "slot";
  target_id: string;
  action: ModerationAction;
  reason?: string;
  metadata?: any;
}) => {
  const supabase = createClient();
  const { error } = await supabase.from("moderation_logs").insert(params);
  if (error) throw new Error(error.message);
};

// Users
export const banUser = async (user_id: string, reason?: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update({ is_active: false, banned_at: new Date().toISOString(), ban_reason: reason ?? null })
    .eq("id", user_id);
  if (error) throw new Error(error.message);
  await logModeration({ target_type: "user", target_id: user_id, action: "ban_user", reason });
  return { success: true } as const;
};

export const suspendUserUntil = async (user_id: string, untilISO: string, reason?: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update({ suspended_until: untilISO, suspension_reason: reason ?? null })
    .eq("id", user_id);
  if (error) throw new Error(error.message);
  await logModeration({ target_type: "user", target_id: user_id, action: "suspend_user", reason, metadata: { until: untilISO } });
  return { success: true } as const;
};

export const verifyUser = async (user_id: string, verified_by?: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update({ is_verified: true, verified_by: verified_by ?? null, verified_at: new Date().toISOString() })
    .eq("id", user_id);
  if (error) throw new Error(error.message);
  await logModeration({ target_type: "user", target_id: user_id, action: "verify_user" });
  return { success: true } as const;
};

// Products
export const removeProduct = async (product_id: string, reason?: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .update({ is_removed: true, moderation_status: "rejected", moderation_reason: reason ?? null, moderated_at: new Date().toISOString() })
    .eq("id", product_id);
  if (error) throw new Error(error.message);
  await logModeration({ target_type: "product", target_id: product_id, action: "remove_product", reason });
  return { success: true } as const;
};

export const reinstateProduct = async (product_id: string, note?: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .update({ is_removed: false, moderation_status: "published", moderation_reason: note ?? null, moderated_at: new Date().toISOString() })
    .eq("id", product_id);
  if (error) throw new Error(error.message);
  await logModeration({ target_type: "product", target_id: product_id, action: "reinstate_product", reason: note });
  return { success: true } as const;
};
