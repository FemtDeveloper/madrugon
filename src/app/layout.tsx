import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers";
import { Modal } from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madrugón Mayorista",
  description:
    "Página donde encuentras todos tipo de prendas nacionales al mejor precio",
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
