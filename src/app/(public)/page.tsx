import { BusinessTypes } from "@/components/public/business-types";
import { HomeHero } from "@/components/public/home-hero";
import { HowVizoWorks } from "@/components/public/how-vizo-works";
import { PricingSection } from "@/components/public/pricing-section";
import { VisibilityAudit } from "@/components/public/visibility-audit";
import { VizoSolutions } from "@/components/public/vizo-solutions";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <HomeHero />
      <HowVizoWorks />
      <VizoSolutions />
      <BusinessTypes />
      <VisibilityAudit />
      <PricingSection />
    </main>
  );
}
