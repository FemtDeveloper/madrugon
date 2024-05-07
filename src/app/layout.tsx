import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Modal } from "@/components/Modal";
import { ReactQueryProvider } from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madrugón Mayorista",
  description:
    "Página donde encuentras todos tipo de prendas nacionales al mejor precio",
  openGraph: {
    title: "Madrugón Mayorista",
    description:
      "Página donde encuentras todos tipo de prendas nacionales al mejor precio",
    images: ["https://madrugon.vercel.app/immages/auth.jpg"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full flex justify-center min-h-screen`}
      >
        <ReactQueryProvider>
          {children}
          <Modal />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
