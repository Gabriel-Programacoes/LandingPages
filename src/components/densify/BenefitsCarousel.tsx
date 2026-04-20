"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import {
  ForkKnifeIcon,
  BarbellIcon,
  ChartLineUpIcon,
  HouseSimpleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

const benefits = [
  {
    num: "01",
    tag: "Nutrição",
    title: "Refeições de\nAlta Densidade",
    desc: "Receitas criadas para maximizar proteínas e calorias com o menor tempo de preparo possível. 15 minutos, resultado máximo.",
    Icon: ForkKnifeIcon,
    accent: "#4a7fb5",
    glow: "from-[#a8d8ea]/50 via-[#a8c8f0]/25 to-transparent",
    pill: "bg-[#4a7fb5]/15 border-[#4a7fb5]/30 text-[#3060a0]",
    stat: "15 min",
    statLabel: "de preparo",
    shadow: "0 12px 48px rgba(74,127,181,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
    shadowHover: "0 28px 72px rgba(74,127,181,0.32), inset 0 1px 0 rgba(255,255,255,0.85)",
  },
  {
    num: "02",
    tag: "Treino",
    title: "Alta Densidade\nMuscular",
    desc: "Protocolos científicos que comprimem o volume ideal em janelas curtas de treino. Sem desculpa, sem perda de resultado.",
    Icon: BarbellIcon,
    accent: "#c07050",
    glow: "from-[#f0b8a0]/50 via-[#e8d0c0]/25 to-transparent",
    pill: "bg-[#c07050]/15 border-[#c07050]/30 text-[#a05030]",
    stat: "40 min",
    statLabel: "por sessão",
    shadow: "0 12px 48px rgba(192,112,80,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
    shadowHover: "0 28px 72px rgba(192,112,80,0.32), inset 0 1px 0 rgba(255,255,255,0.85)",
  },
  {
    num: "03",
    tag: "IA Adaptativa",
    title: "Plano que\nEvolui com Você",
    desc: "O app aprende seu progresso e recalibra intensidade, volume e macros semanalmente. Nunca estagna, sempre avança.",
    Icon: ChartLineUpIcon,
    accent: "#8060c0",
    glow: "from-[#c8b8e8]/50 via-[#d8c8f0]/25 to-transparent",
    pill: "bg-[#8060c0]/15 border-[#8060c0]/30 text-[#6040a0]",
    stat: "12k+",
    statLabel: "usuários ativos",
    shadow: "0 12px 48px rgba(128,96,192,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
    shadowHover: "0 28px 72px rgba(128,96,192,0.32), inset 0 1px 0 rgba(255,255,255,0.85)",
  },
  {
    num: "04",
    tag: "Flexibilidade",
    title: "Treinos em\nQualquer Lugar",
    desc: "Home, academia ou hotel — os treinos se adaptam ao espaço e equipamentos disponíveis. Sua rotina não para por nada.",
    Icon: HouseSimpleIcon,
    accent: "#3a8a5a",
    glow: "from-[#b8e8c8]/50 via-[#a8d8b8]/25 to-transparent",
    pill: "bg-[#3a8a5a]/15 border-[#3a8a5a]/30 text-[#1a6a3a]",
    stat: "3+",
    statLabel: "ambientes",
    shadow: "0 12px 48px rgba(58,138,90,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
    shadowHover: "0 28px 72px rgba(58,138,90,0.32), inset 0 1px 0 rgba(255,255,255,0.85)",
  },
  {
    num: "05",
    tag: "Comunidade",
    title: "Rede de\nSuporte Ativa",
    desc: "Conecte-se com pessoas com rotinas semelhantes. Desafios semanais, conquistas compartilhadas e motivação real.",
    Icon: UsersThreeIcon,
    accent: "#b07820",
    glow: "from-[#f8d8a0]/50 via-[#f0c890]/25 to-transparent",
    pill: "bg-[#b07820]/15 border-[#b07820]/30 text-[#906010]",
    stat: "94%",
    statLabel: "retenção",
    shadow: "0 12px 48px rgba(176,120,32,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
    shadowHover: "0 28px 72px rgba(176,120,32,0.32), inset 0 1px 0 rgba(255,255,255,0.85)",
  },
];

// Duplicate for seamless loop
const CARD_W = 340;
const GAP = 20;
const TOTAL_W = (CARD_W + GAP) * benefits.length; // width of one full set
const doubled = [...benefits, ...benefits];

export default function BenefitsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  // Pause / resume animation directly on the track element — no re-render needed
  // (rerender-use-ref-transient-values)
  const pauseTrack  = useCallback(() => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  }, []);
  const resumeTrack = useCallback(() => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="benefits" ref={sectionRef} className="relative py-24">
      {/* Marquee keyframe */}
      <style>{`
        @keyframes densify-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TOTAL_W}px); }
        }
      `}</style>

      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-br from-[#fceee6] via-[#f5eaf0] to-[#e8f0fc] -z-10" />
      <motion.div style={{ y: orb1Y }} className="absolute top-0 right-[-8%] w-[500px] h-[500px] rounded-full bg-[#f0b8a0]/28 blur-[90px] pointer-events-none -z-10" />
      <motion.div style={{ y: orb2Y }} className="absolute bottom-0 left-[-8%] w-[450px] h-[450px] rounded-full bg-[#a8c8f0]/28 blur-[90px] pointer-events-none -z-10" />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-archivo font-semibold text-[#5a7fa0] bg-white/40 border border-white/60 rounded-full uppercase tracking-widest">
                Por que Densify
              </span>
              <h2 className="font-pilcrow font-black text-4xl sm:text-5xl text-[#1e3050] leading-[1.1]">
                Cada detalhe pensado
                <br />
                <span className="text-[#3d72b4]">
                  para quem não tem tempo
                </span>
              </h2>
            </div>
            <p className="font-archivo text-sm text-[#3a5070]/60 max-w-[280px] leading-relaxed sm:text-right">
              5 pilares que transformam cada minuto disponível em resultado real.
            </p>
          </div>
        </motion.div>

        {/* Marquee viewport — overflow-x hidden (marquee) + overflow-y visible (hover) */}
        <div
          onMouseEnter={pauseTrack}
          onMouseLeave={resumeTrack}
          onTouchStart={pauseTrack}
          onTouchEnd={resumeTrack}
          style={{
            overflowX: "hidden",
            overflowY: "visible",
            paddingTop: 12,
            paddingBottom: 20,
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* Animated track */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              width: (CARD_W + GAP) * doubled.length,
              animation: `densify-marquee ${benefits.length * 4}s linear infinite`,
            }}
          >
            {doubled.map((b, i) => (
              <div
                key={i}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = b.shadowHover;
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = b.shadow;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
                className="group relative flex-shrink-0 rounded-[28px] bg-white/30 backdrop-blur-xl border border-white/55 p-7 overflow-hidden cursor-default"
                style={{
                  width: CARD_W,
                  marginRight: GAP,
                  boxShadow: b.shadow,
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  transform: "translateY(0) scale(1)",
                }}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${b.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Top edge shine */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                <div className="relative z-10 flex flex-col h-full min-h-[320px]">
                  {/* Number + icon */}
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="font-pilcrow font-black text-6xl leading-none select-none"
                      style={{ color: `${b.accent}20` }}
                    >
                      {b.num}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm"
                      style={{ background: `${b.accent}18`, borderColor: `${b.accent}30` }}
                    >
                      <b.Icon size={24} weight="duotone" color={b.accent} />
                    </div>
                  </div>

                  {/* Tag */}
                  <span className={`self-start inline-block px-3 py-1 mb-4 text-xs font-archivo font-bold rounded-full border uppercase tracking-wider ${b.pill}`}>
                    {b.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-pilcrow font-black text-2xl text-[#1e3050] mb-3 leading-[1.15] whitespace-pre-line">
                    {b.title}
                  </h3>

                  <p className="font-archivo text-sm text-[#3a5070]/75 leading-relaxed flex-1">
                    {b.desc}
                  </p>

                  {/* Bottom stat */}
                  <div className="mt-6 pt-5 border-t border-white/40 flex items-baseline gap-2">
                    <span className="font-pilcrow font-black text-3xl" style={{ color: b.accent }}>
                      {b.stat}
                    </span>
                    <span className="font-archivo text-xs text-[#3a5070]/60">{b.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
