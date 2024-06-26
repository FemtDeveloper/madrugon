import Image from "next/image";
import { ReactNode } from "react";

import { GoBackButton } from "@/components/Ui";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-dvw h-screen p-6 md:p-0">
      <div className="w-full relative flex items-center justify-center md:w-2/5">
        <GoBackButton />
        {children}
      </div>

      <figure className="hidden md:flex bg-primaryOrange md:w-3/5">
        <Image
          src="/images/auth.jpg"
          alt="estante dejean"
          quality={100}
          width={1200}
          height={800}
          className="object-cover"
        />
      </figure>
    </div>
  );
};

export default layout;
