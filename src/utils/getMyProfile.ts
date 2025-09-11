import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/stores";

export async function getMyProfile() {
  const setUser = useUserStore.getState().setUser;
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    setUser(null);
    return;
  }
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*, user_roles:role_id(name)")
    .eq("id", authData.user.id)
    .single();
  if (userError || !userData) {
    setUser(null);
    return;
  }
  const role_name = (userData as any)?.user_roles?.name ?? null;
  const normalized = { ...(userData as any), role_name } as User;
  setUser(normalized);
}
