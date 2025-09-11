import { AdminNavbar } from "./components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id, role_id, user_roles:role_id(name)")
    .eq("id", user.id)
    .single();

  const roleName = (profile as any)?.user_roles?.name as string | undefined;
  const isAdmin = roleName === "admin" || roleName === "super_admin";
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-wrapper pt-4 flex-col flex">
      <AdminNavbar isAuthenticated={user.aud === "authenticated"} />
      {children}
    </div>
  );
};

export default layout;
