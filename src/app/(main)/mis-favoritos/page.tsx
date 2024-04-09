import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const FavoritosPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  return <div></div>;
};

export default FavoritosPage;
