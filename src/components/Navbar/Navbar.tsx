"use client";
import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { useResponsive } from "@/hooks";
import Searchbar from "./Searchbar";
import Profile from "./Profile";
import SidebarMenuButton from "./SidebarMenuButton";
import { IsoIcon } from "../Icons";
import { useUserStore } from "@/stores";
import { useEffect } from "react";
import { cookies } from "next/headers";

const Navbar = () => {
  const { isMobile } = useResponsive();

  return (
    <header className="w-full flex justify-center px-4 bg-white shadow-sm">
      <nav className="w-full flex gap-8  lg:gap-13  max-w-wrapper">
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
