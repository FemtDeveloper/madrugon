import { Footer } from "@/components/Footer";
import { Navbar, PromoBanner } from "@/components/Navbar";
import Sidebar from "@/components/Navbar/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col sticky top-0 z-20">
        <PromoBanner />
        <Navbar />
      </div>
      {children}
      <Footer />
      <Sidebar />
    </div>
  );
};

export default layout;
