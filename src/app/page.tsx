import { Hero } from "@/components/Hero";
import { Navbar, PromoBanner } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <PromoBanner />
      <Navbar />
      <Hero />
    </main>
  );
}
