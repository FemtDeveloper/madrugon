import { ReactNode } from "react";

type Languages = "ES" | "EN";

export interface SectionProps {
  icon: ReactNode;
  url: string;
  title: string;
}
