import IntroSection from "@/presentation/components/organisms/home-page-sections/IntroSection";
import DifferentialsSection from "@/presentation/components/organisms/home-page-sections/DifferentialsSection";
import GalleryComparison from "@/presentation/components/organisms/home-page-sections/GalleryComparison";
import Hero from "@/presentation/components/organisms/home-page-sections/Hero";
import FeedbackSection from "@/presentation/components/organisms/home-page-sections/FeedbackSection";
import FaqSection from "@/presentation/components/organisms/home-page-sections/FaqSection";
import AboutSection from "@/presentation/components/organisms/home-page-sections/AboutSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <DifferentialsSection />
      <GalleryComparison />
      <FeedbackSection />
      <AboutSection />
      <FaqSection />
    </main>
  );
}
