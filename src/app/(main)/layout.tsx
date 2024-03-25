import { Footer } from "@/components/Footer";
import { Navbar, PromoBanner } from "@/components/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col sticky top-0 z-50">
        <PromoBanner />
        <Navbar />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default layout;
