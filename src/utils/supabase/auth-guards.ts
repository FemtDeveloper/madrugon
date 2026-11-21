import { createClient } from "@/utils/supabase/server";

const ADMIN_ROLES = new Set(["admin", "super_admin", "moderator"]);

/** Returns the authenticated user (server-side), or null. */
export async function getServerUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return { supabase, user: null };
  return { supabase, user: data.user };
}

/** True when the current request belongs to an admin/moderator/super_admin. */
export async function isServerAdmin() {
  const { supabase, user } = await getServerUser();
  if (!user) return false;
  const { data: profile } = await supabase
    .from("users")
    .select("user_roles:role_id(name)")
    .eq("id", user.id)
    .single();
  const roleName = (profile as any)?.user_roles?.name as string | undefined;
  return roleName ? ADMIN_ROLES.has(roleName) : false;
}
