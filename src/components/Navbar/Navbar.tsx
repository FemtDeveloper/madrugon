"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect } from "react";

import { useResponsive } from "@/hooks";
import { useUserStore } from "@/stores";

import { IsoIcon } from "../Icons";

import NavbarLinks from "./NavbarLinks";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import SidebarMenuButton from "./SidebarMenuButton";




interface Props {
  isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated }: Props) => {
  const { isMobile } = useResponsive();
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user) as User);
    }
  }, [setUser]);

  useEffect(() => {
    setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated, setIsAuthenticated]);

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
