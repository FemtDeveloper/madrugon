"use client";

import { getMyProfile } from "@/utils/getMyProfile";
import { useEffect } from "react";

export default function UserBootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    getMyProfile();
  }, []);
  return <>{children}</>;
}
