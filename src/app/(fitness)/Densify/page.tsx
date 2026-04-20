import dynamic from "next/dynamic";
import Navbar from "@/components/densify/Navbar";
import HeroSection from "@/components/densify/HeroSection";

// Below-the-fold components — code-split to reduce initial JS bundle (bundle-dynamic-imports)
const BenefitsCarousel    = dynamic(() => import("@/components/densify/BenefitsCarousel"));
const CalculatorSection   = dynamic(() => import("@/components/densify/CalculatorSection"));
const TestimonialsSection = dynamic(() => import("@/components/densify/TestimonialsSection"));
const CTASection          = dynamic(() => import("@/components/densify/CTASection"));
const Footer              = dynamic(() => import("@/components/densify/Footer"));

export default function DensifyPage() {
  return (
    <main className="font-archivo overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BenefitsCarousel />
      <CalculatorSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
