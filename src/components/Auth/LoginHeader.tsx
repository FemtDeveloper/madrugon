"use client";
import { useResponsive } from "@/hooks";

import { IsoIcon } from "../Icons";

interface Props {
  title: string;
}
const LoginHeader = ({ title }: Props) => {
  const { isMobile } = useResponsive();
  return (
    <div className="flex flex-col items-center gap-4">
      <IsoIcon width={isMobile ? 32 : 42} height={isMobile ? 24 : 32} />
      <h2 className="h2 text-center font-medium">{title}</h2>
    </div>
  );
};

export default LoginHeader;
