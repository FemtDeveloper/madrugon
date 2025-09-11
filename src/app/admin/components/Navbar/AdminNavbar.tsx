"use client";

import Cookies from "js-cookie";
import { IsoIcon } from "@/components/Icons";
import Link from "next/link";
import { SidebarMenuButton } from "@/components/Navbar";
import { useEffect } from "react";
import { useResponsive } from "@/hooks";
import { useUserStore } from "@/stores";

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
          <div className="flex items-center gap-4">
            <Link className="b2 text-primary hover:underline" href="/admin">
              Admin
            </Link>
            <Link
              className="b2 text-primary hover:underline"
              href="/admin/banners"
            >
              Banners
            </Link>
            <Link
              className="b2 text-primary hover:underline"
              href="/admin/modals"
            >
              Modales
            </Link>
          </div>
        </div>
        <SidebarMenuButton />
      </nav>
    </header>
  );
};

export default Navbar;
