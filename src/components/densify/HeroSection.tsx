"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BarbellIcon,
  ArrowRightIcon,
  LightningIcon,
  FlameIcon,
  ChartLineUpIcon,
  ClockCountdownIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";

const floatingStats = [
  { Icon: LightningIcon, value: "40min", label: "Por treino", color: "#f0b8a0" },
  { Icon: ChartLineUpIcon, value: "+4kg", label: "Média em 3 meses", color: "#a8c8f0" },
  { Icon: FlameIcon, value: "3.9k", label: "kcal/dia otimizadas", color: "#d0a0e0" },
];

const macros = [
  { label: "Proteína", val: "182g", w: "75%", color: "from-[#6090d0] to-[#a8c8f0]" },
  { label: "Carbs", val: "390g", w: "58%", color: "from-[#f0a880] to-[#f8c8a8]" },
  { label: "Gordura", val: "108g", w: "42%", color: "from-[#c0a0e0] to-[#d8c0f0]" },
];

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background orbs — different speeds for depth
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  // Content layers — slower than background = parallax depth
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    // No overflow-hidden — lets orbs bleed out and creates real parallax depth
    <section ref={ref} className="relative min-h-screen flex items-center">
      {/* Static base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d8e8f8] via-[#ede8f5] to-[#fae8e0]" />

      {/* Orb 1 — top left, fastest */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[-15%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#9dc4e8]/55 to-[#c0d8f8]/20 blur-[110px] pointer-events-none"
      />
      {/* Orb 2 — bottom right, medium */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute bottom-[-20%] right-[-5%] w-[65vw] h-[65vw] max-w-[760px] max-h-[760px] rounded-full bg-gradient-to-tl from-[#f0a890]/50 to-[#f8cfc0]/20 blur-[120px] pointer-events-none"
      />
      {/* Orb 3 — center right, slowest (appears closest) */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-[#d4b8f0]/40 to-[#e8c8f8]/15 blur-[90px] pointer-events-none"
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Bottom clip fade — keeps the transition to next section clean */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0ece8]/60 to-transparent pointer-events-none z-20" />

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">

        {/* Left — headline + CTA */}
        <motion.div style={{ y: contentY }} className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-archivo font-medium text-[#4a6fa0] bg-white/30 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
              <BarbellIcon size={14} weight="duotone" color="#4a6fa0" />
              App de Treino &amp; Nutrição · Alta Densidade
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-pilcrow font-black leading-none tracking-tight text-[#1e3050]">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[82px]">Resultados</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] text-[#3d72b4] mt-1">
                Reais
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] text-[#1e3050]/55 mt-2">
                para Rotinas
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] mt-0">
                Impossíveis.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="font-archivo text-lg text-[#3a5070]/75 max-w-md leading-relaxed"
          >
            Treinos de alta densidade em 40 minutos. Planos nutricionais inteligentes.
            Hipertrofia real mesmo com a agenda mais ocupada do mundo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {/* CTA button — liquid glass: raw gradient distortion + pearlescent ring */}
            <motion.a
              href="#calculator"
              whileHover={{ scale: 1.05, boxShadow: "0 24px 64px rgba(61,114,180,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="densify-lg group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/18 border border-white/60 shadow-[0_8px_40px_rgba(61,114,180,0.22)] text-[#1e3050] font-archivo font-bold text-base transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Calcular Meu Plano</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex items-center"
              >
                <ArrowRightIcon size={18} weight="bold" />
              </motion.span>
            </motion.a>

            <a
              href="#benefits"
              className="inline-flex items-center gap-2 font-archivo text-sm text-[#3a5070]/70 hover:text-[#1e3050] transition-colors duration-200 cursor-pointer"
            >
              <ClockCountdownIcon size={15} weight="duotone" />
              Ver como funciona
            </a>
          </motion.div>
        </motion.div>

        {/* Right — floating glass card composition */}
        <motion.div
          style={{ y: cardY }}
          className="hidden lg:flex flex-col gap-5 items-end"
        >
          {/* Main app preview card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 70, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="orig-lg relative w-[340px] rounded-[32px] bg-white/20 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.8)] p-6 overflow-hidden"
          >
            {/* Glass shines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            <div className="absolute top-[1px] left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-archivo text-[10px] text-[#3a5070]/55 uppercase tracking-widest mb-0.5">Plano Ativo</p>
                <motion.p
                  className="font-pilcrow font-black text-xl text-[#1e3050]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Hipertrofia
                </motion.p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#a8c8f0]/60 to-[#d0e8ff]/40 border border-white/50 flex items-center justify-center">
                <BarbellIcon size={20} weight="duotone" color="#3d72b4" />
              </div>
            </div>

            {/* Ring + macro bars */}
            <div className="flex items-center gap-5 mb-6">
              {/* Progress ring */}
              <div className="relative w-[88px] h-[88px] flex-shrink-0">
                <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
                  <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(61,114,180,0.10)" strokeWidth="8" />
                  <motion.circle
                    cx="44" cy="44" r="36"
                    fill="none"
                    stroke="url(#heroGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={226}
                    initial={{ strokeDashoffset: 226 }}
                    animate={cardInView ? { strokeDashoffset: 226 * 0.22 } : {}}
                    transition={{ duration: 2, delay: 0.7, ease: [0.34, 1.2, 0.64, 1] }}
                  />
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6090d0" />
                      <stop offset="100%" stopColor="#c07878" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="font-pilcrow font-black text-xl text-[#1e3050] leading-none"
                    initial={{ opacity: 0 }}
                    animate={cardInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2, duration: 0.4 }}
                  >
                    78%
                  </motion.span>
                  <span className="font-archivo text-[10px] text-[#3a5070]/50">meta</span>
                </div>
              </div>

              {/* Macro bars */}
              <div className="flex flex-col gap-2.5 flex-1">
                {macros.map((m, mi) => (
                  <div key={m.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-archivo text-[10px] text-[#3a5070]/60">{m.label}</span>
                      <motion.span
                        className="font-archivo font-semibold text-[10px] text-[#1e3050]"
                        initial={{ opacity: 0 }}
                        animate={cardInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.0 + mi * 0.15, duration: 0.4 }}
                      >
                        {m.val}
                      </motion.span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#3d72b4]/08 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                        initial={{ width: "0%" }}
                        animate={cardInView ? { width: m.w } : {}}
                        transition={{
                          duration: 1.4,
                          delay: 0.8 + mi * 0.15,
                          ease: [0.34, 1.1, 0.64, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Week grid */}
            <div className="grid grid-cols-5 gap-1.5">
              {weekDays.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.07, duration: 0.35, ease: "backOut" }}
                  className={`py-2 rounded-xl text-center ${
                    i < 3
                      ? "bg-gradient-to-b from-[#6090d0]/22 to-[#9abce0]/12 border border-[#6090d0]/22"
                      : "bg-white/15 border border-white/25"
                  }`}
                >
                  <p className="font-archivo text-[9px] text-[#3a5070]/55">{d}</p>
                  <div className="flex justify-center mt-1">
                    {i < 3 ? (
                      <CheckCircleIcon size={12} weight="fill" color="#4a7fb5" />
                    ) : (
                      <div className="w-3 h-px bg-[#1e3050]/20 mt-1" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating stat pills — liquid glass over the gradient orbs */}
          {floatingStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotate: i % 2 === 0 ? -1.5 : 1.2 }}
              className="self-end"
            >
              <motion.div
                animate={{ y: [0, i % 2 === 0 ? -6 : -4, 0] }}
                transition={{
                  duration: 3 + i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className="orig-lg flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/18 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}30`, border: `1px solid ${s.color}55` }}
                >
                  <s.Icon size={16} weight="duotone" color={s.color} />
                </div>
                <div>
                  <p className="font-pilcrow font-black text-base text-[#1e3050] leading-none">{s.value}</p>
                  <p className="font-archivo text-[10px] text-[#3a5070]/60 mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile stats — liquid glass */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6 z-10"
      >
        {floatingStats.map((s) => (
          <div
            key={s.label}
            className="orig-lg flex flex-col items-center px-3 py-2.5 rounded-2xl bg-white/18 border border-white/50 shadow-sm min-w-[76px] overflow-hidden"
          >
            <s.Icon size={16} weight="duotone" color={s.color} />
            <p className="font-pilcrow font-black text-sm text-[#1e3050] mt-1">{s.value}</p>
            <p className="font-archivo text-[9px] text-[#3a5070]/60 text-center leading-tight">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

