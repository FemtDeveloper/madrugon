import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import Avatar from "./components/Avatar";
import UserInfo from "./components/UserInfo";

const ProfilePage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <section className="flex flex-col w-full p-6 md:px-0  gap-8 max-w-wrapper">
      <h1 className="h2_bold">Mi perfil</h1>
      <div className="w-full flex flex-col md:flex-row gap-9">
        <Avatar />
        <UserInfo />
      </div>
    </section>
  );
};

export default ProfilePage;
