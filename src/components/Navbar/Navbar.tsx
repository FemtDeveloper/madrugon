"use client";

import { IsoIcon } from "../Icons";
import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import SidebarMenuButton from "./SidebarMenuButton";
import { useResponsive } from "@/hooks";

const Navbar = () => {
  const { isMobile } = useResponsive();

  return (
    <header className="w-full relative flex justify-center px-4 bg-white shadow-xs z-50">
      <nav className="w-full flex gap-4 lg:gap-13  max-w-wrapper">
        <div className="w-full flex items-center justify-between gap-4">
          <Link href="/" aria-label="Link que te dirige al home">
            <IsoIcon width={isMobile ? 32 : 42} height={isMobile ? 24 : 32} />
          </Link>
          <NavbarLinks />
          <Searchbar />
          <Profile />
        </div>
        <SidebarMenuButton />
      </nav>
    </header>
  );
};

export default Navbar;
