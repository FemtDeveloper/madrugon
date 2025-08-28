import "./globals.css";

import { Modal } from "@/components/Modal";
import { Loader } from "@/components/Ui";
import { ReactQueryProvider } from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
          <Loader />
          {children}
          <Modal />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
