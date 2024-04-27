import { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Navbar, ProfileSidebar, PromoBanner } from "@/components/Navbar";
import Sidebar from "@/components/Navbar/Sidebar";
import { createClient } from "@/utils/supabase/server";

const layout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-between">
      <div className="w-full flex flex-col sticky top-0 z-20">
        <PromoBanner />
        <Navbar isAuthenticated={user.data.user?.aud === "authenticated"} />
      </div>
      {children}
      <Footer />
      <Sidebar />
      <ProfileSidebar />
      {/* <Modal /> */}
    </div>
  );
};

export default layout;
