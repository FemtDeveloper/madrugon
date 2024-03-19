import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} w-full flex justify-center`}>
        {children}
      </body>
    </html>
  );
}
