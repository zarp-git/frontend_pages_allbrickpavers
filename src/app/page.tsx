import IntroSection from "@/components/sections/IntroSection";
import GalleryComparison from "@/components/sections/GalleryComparison";
import Hero from "@/components/sections/Hero";
import FeedbackSection from "@/components/sections/FeedbackSection";
import FaqSection from "@/components/sections/FaqSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <GalleryComparison />
      <FeedbackSection />
      <AboutSection />
      <FaqSection />
    </main>
  );
}
