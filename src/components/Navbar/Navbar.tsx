"use client";
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { useResponsive } from "@/hooks";
import Searchbar from "./Searchbar";
import Profile from "./Profile";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const { isMobile } = useResponsive();
  const getData = async () => {
    const count = await supabase
      .from("products")
      .select("*")
      .filter("brand", "eq", "este");
    console.log({ count });
  };

  // getData();
  return (
    <header className="w-full flex justify-center px-4 bg-white shadow-sm">
      <nav className="w-full flex gap-4 lg:gap-13 items-center justify-between max-w-wrapper">
        <Link href="/" aria-label="Link que te dirige al home">
          <Image
            src="/images/isoicon.png"
            alt="Iso icon"
            width={isMobile ? 32 : 42}
            height={isMobile ? 24 : 32}
          />
        </Link>
        <NavbarLinks />
        <Searchbar />
        <Profile />
      </nav>
    </header>
  );
};

export default Navbar;
