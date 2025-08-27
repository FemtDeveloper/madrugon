import { createSupabaseClient } from "@/lib/supabase/client";

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error };
};
