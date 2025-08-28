import { useUserStore } from "@/stores";
import { createClient } from "@/utils/supabase/client";

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
    .select("*")
    .eq("id", authData.user.id)
    .single();
  if (userError || !userData) {
    setUser(null);
    return;
  }
  setUser(userData);
}
