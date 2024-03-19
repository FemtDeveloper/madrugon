import Link from "next/link";
import navbarLinks from "./links";

const NavbarLinks = () => {
  return (
    <div className=" gap-10 hidden lg:flex py-[26.5px]">
      {navbarLinks.map(({ name, path }, i) => (
        <Link href={path} key={i} className="b1">
          {name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
