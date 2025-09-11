import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";

    const supabase = await createClient();
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Ensure the caller is admin/moderator/super_admin
    const { data: profile, error: profileErr } = await supabase
      .from("users")
      .select("id, role_id, user_roles:role_id(name)")
      .eq("id", authData.user.id)
      .single();
    if (profileErr || !profile) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const roleName = (profile as any)?.user_roles?.name as string | undefined;
    if (!(roleName === "admin" || roleName === "super_admin" || roleName === "moderator")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Build query
    let query = supabase
      .from("users")
      .select("id, email, first_name, last_name, phone, is_active, is_verified, banned_at, ban_reason, suspended_until, suspension_reason, user_roles:role_id(name)")
      .order("created_at", { ascending: false })
      .limit(200);

    if (search && search.trim()) {
      const s = search.trim();
      query = query.or(`email.ilike.%${s}%,first_name.ilike.%${s}%,last_name.ilike.%${s}%`);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ users: data ?? [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}
