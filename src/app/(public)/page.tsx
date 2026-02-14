import IntroSection from "@/presentation/components/organisms/home-page-sections/IntroSection";
import DifferentialsSection from "@/presentation/components/organisms/home-page-sections/DifferentialsSection";
import GalleryComparison from "@/presentation/components/organisms/home-page-sections/GalleryComparison";
import Hero from "@/presentation/components/organisms/home-page-sections/Hero";
import FeedbackSection from "@/presentation/components/organisms/home-page-sections/FeedbackSection";
import FaqSection from "@/presentation/components/organisms/home-page-sections/FaqSection";
import AboutSection from "@/presentation/components/organisms/home-page-sections/AboutSection";
import { PaversVsConcreteSection } from "@/presentation/components/organisms/home-page-sections/PaversVsConcreteSection";
import { InstallationTrustSection } from "@/presentation/components/organisms/home-page-sections/InstallationTrustSection";
import { PaverServicesSection } from "@/presentation/components/organisms/home-page-sections/PaverServicesSection";
import { CtaSection } from "@/presentation/components/organisms/home-page-sections/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <AboutSection />
      <DifferentialsSection />
      <PaverServicesSection />
      <FeedbackSection />
      <PaversVsConcreteSection />
      <InstallationTrustSection />
      <CtaSection />
      <FaqSection />
    </main>
  );
}
