import { createClient } from "@/utils";

export const getUserInfo = async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select("*, user_roles:role_id(name)")
        .eq("id", userId)
        .single();
    if (error) throw new Error(error.message);
    return data;
};

// Admin list of users with optional search (email/name)
export const listUsersAdmin = async (search?: string) => {
    const supabase = createClient();
    let query = supabase
        .from("users")
        .select("id, email, first_name, last_name, phone, is_active, is_verified, banned_at, ban_reason, suspended_until, suspension_reason, user_roles:role_id(name)")
        .order("created_at", { ascending: false })
        .limit(200);
    if (search && search.trim()) {
        const s = search.trim();
        query = query.or(
            `email.ilike.%${s}%,first_name.ilike.%${s}%,last_name.ilike.%${s}%`
        );
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data ?? [];
};

export const updateUserProfile = async (user_id: string, patch: Partial<User>) => {
    const supabase = createClient();
    // Whitelist fields to update
    const allowed: Partial<User> = {
        first_name: patch.first_name ?? undefined,
        last_name: patch.last_name ?? undefined,
        phone: patch.phone ?? undefined,
        profile_image_url: patch.profile_image_url ?? undefined,
        is_seller: patch.is_seller ?? undefined,
    } as any;
    const { data, error } = await supabase
        .from("users")
        .update(allowed)
        .eq("id", user_id)
        .select("*")
        .single();
    if (error) throw new Error(error.message);
    return data;
};

export const deactivateUser = async (user_id: string) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("users")
        .update({ is_active: false })
        .eq("id", user_id);
    if (error) throw new Error(error.message);
    return { success: true } as const;
};

export const reactivateUser = async (user_id: string) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("users")
        .update({ is_active: true, banned_at: null, ban_reason: null })
        .eq("id", user_id);
    if (error) throw new Error(error.message);
    return { success: true } as const;
};

// Change user role by role_name; server allows only super_admin to elevate via RLS/trigger functions
export const changeUserRole = async (user_id: string, role_name: string) => {
    const supabase = createClient();
    const { data: role, error: roleErr } = await supabase
        .from("user_roles")
        .select("id, name")
        .eq("name", role_name)
        .single();
    if (roleErr) throw new Error(roleErr.message);
    const { error } = await supabase
        .from("users")
        .update({ role_id: role!.id })
        .eq("id", user_id);
    if (error) throw new Error(error.message);
    return { success: true } as const;
};

