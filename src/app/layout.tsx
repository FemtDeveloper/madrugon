import "./globals.css";

import { ReactQueryProvider, UserBootstrapProvider } from "@/providers";

import Analytics from "@/components/Analytics/Analytics";
import { Inter } from "next/font/google";
import { Loader } from "@/components/Ui";
import type { Metadata } from "next";
import { Modal } from "@/components/Modal";
import PromotionModal from "@/components/Modal/PromotionModal/PromotionModal";
import { Suspense } from "react";

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
          <UserBootstrapProvider>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <Loader />
            {children}
            <Modal />
            <PromotionModal />
          </UserBootstrapProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
