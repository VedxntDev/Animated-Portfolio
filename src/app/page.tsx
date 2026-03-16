import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import NanoBanana from "@/components/NanoBanana";

export default function Home() {
  return (
    <main className="relative bg-black w-full min-h-screen">
      <Hero />
      <Socials />
      <Projects />
      <NanoBanana />
    </main>
  );
}
