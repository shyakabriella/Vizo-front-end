import { BusinessTypes } from "@/components/public/business-types";
import { HomeHero } from "@/components/public/home-hero";
import { HowVizoWorks } from "@/components/public/how-vizo-works";
import { PricingSection } from "@/components/public/pricing-section";
import { PublicFooter } from "@/components/public/public-footer";
import { VisibilityAudit } from "@/components/public/visibility-audit";
import { VisibilityGap } from "@/components/public/visibility-gap";
import { VizoSolutions } from "@/components/public/vizo-solutions";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HomeHero />
      <VisibilityGap />
      <HowVizoWorks />
      <VizoSolutions />
      <BusinessTypes />
      <VisibilityAudit />
      <PricingSection />
      <PublicFooter />
    </main>
  );
}
