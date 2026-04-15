"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Animated stat counter ─────────────────────────────────
function AnimatedStat({
  target,
  label,
  format,
}: {
  target: number;
  label: string;
  format: (n: number) => string;
}) {
  const count = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const displayed = useTransform(count, (v) => format(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, count, target]);

  return (
    <div ref={ref} className="pr-6">
      <div className="font-headline text-4xl md:text-5xl text-ink leading-none">
        <motion.span>{displayed}</motion.span>
      </div>
      <div className="font-ui text-[10px] tracking-[0.22em] uppercase text-ink/50 mt-1">
        {label}
      </div>
    </div>
  );
}

// ─── Stats data ────────────────────────────────────────────
const stats = [
  {
    target: 2400,
    label: "CNPJs Monitorados",
    format: (n: number) => `+${Math.round(n).toLocaleString("pt-BR")}`,
  },
  {
    target: 98.7,
    label: "Conformidade Mantida",
    format: (n: number) => `${n.toFixed(1).replace(".", ",")}%`,
  },
  {
    target: 68,
    label: "Tempo de Análise",
    format: (n: number) => `−${Math.round(n)}%`,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] bg-off-white border-b-2 border-ink flex flex-col justify-between px-6 md:px-14 pt-10 pb-12 overflow-hidden">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="flex justify-between items-center">
        <span className="font-headline text-2xl tracking-widest text-ink">
          LEGISFLOW
        </span>
        <ul className="hidden md:flex gap-10 font-ui text-xs tracking-[0.18em] text-ink/60 uppercase">
          <li className="cursor-pointer hover:text-ink transition-colors">Produto</li>
          <li className="cursor-pointer hover:text-ink transition-colors">Módulos</li>
          <li className="cursor-pointer hover:text-ink transition-colors">Sobre</li>
          <li>
            <a
              href="#agendar"
              className="text-ink border border-ink px-5 py-2 hover:bg-ink hover:text-off-white transition-colors"
            >
              Agendar Demo
            </a>
          </li>
        </ul>
      </nav>

      {/* ── Headline ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center mt-8">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="font-ui text-xs tracking-[0.3em] text-verde uppercase mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-verde" />
            SaaS B2B · Compliance Paralegal &amp; Ambiental
          </div>

          <h1
            className="font-headline uppercase leading-[0.88] tracking-tight text-ink"
            style={{ fontSize: "clamp(3.5rem, 11.5vw, 11rem)" }}
          >
            AUTOMAÇÃO
            <br />
            E CONFORMIDADE
            <br />
            <span className="text-verde">PARALEGAL</span>
          </h1>
        </motion.div>

        <motion.p
          className="font-ui text-base md:text-lg text-ink/60 mt-8 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.18 }}
        >
          Gerencie certidões, alvarás e licenças ambientais de centenas de CNPJs
          em uma plataforma única. Robôs Python + Selenium coletam, monitoram e
          alertam antes de qualquer vencimento.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.32 }}
        >
          <a
            href="#agendar"
            className="
              font-ui font-bold text-xs tracking-[0.2em] uppercase
              bg-ink text-off-white px-10 py-5 border-2 border-ink
              shadow-[4px_4px_0px_0px_#2D6A4F]
              hover:shadow-[7px_7px_0px_0px_#2D6A4F]
              hover:-translate-x-0.5 hover:-translate-y-0.5
              transition-all duration-150
            "
          >
            Agendar Demonstração →
          </a>
          <span className="font-ui text-xs text-ink/40 tracking-wide">
            Ideal para escritórios com 5+ CNPJs sob gestão
          </span>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 right-14 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span
          className="font-ui text-[9px] tracking-[0.3em] uppercase text-ink/30"
          style={{ writingMode: "vertical-rl" }}
        >
          scroll
        </span>
        <motion.div
          className="w-px h-10 bg-linear-to-b from-ink/40 to-transparent"
          animate={{ y: [0, 7, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            repeatDelay: 0.4,
          }}
        />
      </motion.div>

      {/* ── Stats bar ──────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-3 border-t-2 border-ink pt-8 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.5 }}
      >
        {stats.map((s) => (
          <AnimatedStat key={s.label} {...s} />
        ))}
      </motion.div>
    </section>
  );
}
