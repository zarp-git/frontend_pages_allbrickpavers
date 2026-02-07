import IntroSection from "@/presentation/components/sections/IntroSection";
import GalleryComparison from "@/presentation/components/sections/GalleryComparison";
import Hero from "@/presentation/components/sections/Hero";
import FeedbackSection from "@/presentation/components/sections/FeedbackSection";
import FaqSection from "@/presentation/components/sections/FaqSection";
import AboutSection from "@/presentation/components/sections/AboutSection";
import Footer from "@/presentation/components/Footer";

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
