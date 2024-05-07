"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import navbarLinks from "./links";

const NavbarLinks = () => {
  const pathname = usePathname();
  return (
    <div className="gap-6 hidden lg:flex py-[26.5px]">
      {navbarLinks.map(({ name, path }, i) => (
        <Link
          href={path}
          key={i}
          className={clsx(
            "b1 hover:-translate-y-[2px] transition py-2 px-5 rounded-2xl duration-300 hover:scale-110",
            pathname.includes(path) ? "bg-black text-white" : undefined
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
