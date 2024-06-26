import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { AdminNavbar } from "./components/Navbar";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  const { data: isAdmin, error: errorUserData } = await supabase
    .from("users")
    .select("isAdmin")
    .eq("id", user?.id);

  if (errorUserData || !isAdmin) {
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
