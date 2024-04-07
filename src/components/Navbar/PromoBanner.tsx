import Link from "next/link";
import React from "react";

const PromoBanner = () => {
  return (
    <Link
      href="/promos"
      className=" l2 lg:b1 w-full bg-black text-white flex justify-center p-3 lg:p-4"
    >
      <p>¡Extendemos la PROMO MADRUGÓN! - 🔥 60% OFF </p>
    </Link>
  );
};

export default PromoBanner;
