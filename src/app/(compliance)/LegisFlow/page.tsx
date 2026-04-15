import HeroSection from "@/components/legisflow/HeroSection";
import MarqueeSection from "@/components/legisflow/MarqueeSection";
import BentoSection from "@/components/legisflow/BentoSection";
import LeadFormSection from "@/components/legisflow/LeadFormSection";

export default function LegisFlowPage() {
  return (
    <main className="bg-off-white min-h-screen overflow-x-hidden">
      <HeroSection />
      <MarqueeSection />
      <BentoSection />
      <LeadFormSection />

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-ink border-t-2 border-off-white/10 px-6 md:px-14 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-headline text-xl tracking-widest text-off-white/80">
            LEGISFLOW
          </span>
          <p className="font-ui text-xs text-off-white/30 tracking-wide">
            © 2026 LegisFlow · SaaS de Gestão e Compliance Paralegal e Ambiental
          </p>
          <div className="flex gap-8 font-ui text-xs text-off-white/40 tracking-wide">
            <span className="cursor-pointer hover:text-off-white/80 transition-colors">
              Privacidade
            </span>
            <span className="cursor-pointer hover:text-off-white/80 transition-colors">
              Termos
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

