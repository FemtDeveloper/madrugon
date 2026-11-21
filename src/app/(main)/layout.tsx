import { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Navbar, ProfileSidebar, PromoBanner } from "@/components/Navbar";
import Sidebar from "@/components/Navbar/Sidebar";

// No cookies/auth here on purpose: reading the session in this layout would
// force every public page (home, catalog, product detail) to render
// dynamically. Auth state is resolved on the client by UserBootstrapProvider,
// and protected routes are guarded by src/proxy.ts and their own pages.
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-between">
      <div className="w-full flex flex-col sticky top-0 z-20">
        <PromoBanner />
        <Navbar />
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
