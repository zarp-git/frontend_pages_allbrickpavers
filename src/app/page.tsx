import IntroSection from "@/components/sections/IntroSection";
import GalleryComparison from "@/components/sections/GalleryComparison";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <GalleryComparison />
    </main>
  );
}
