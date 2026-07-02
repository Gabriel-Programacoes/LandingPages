"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight";
import { BarbellIcon } from "@phosphor-icons/react/Barbell";
import { ChartLineUpIcon } from "@phosphor-icons/react/ChartLineUp";
import { ClockCountdownIcon } from "@phosphor-icons/react/ClockCountdown";

const metrics = [
  { label: "Treino médio", value: "40 min" },
  { label: "Ganho em 12 semanas", value: "+4.1 kg" },
  { label: "Aderência semanal", value: "93%" },
];

const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const orbA = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const orbB = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f1fb] via-[#eef1f7] to-[#f7eee9]" />
      <motion.div style={{ y: orbA }} className="absolute -top-40 -left-24 w-[38rem] h-[38rem] rounded-full bg-[#9bc3ea]/30 blur-[120px]" />
      <motion.div style={{ y: orbB }} className="absolute -bottom-48 -right-20 w-[34rem] h-[34rem] rounded-full bg-[#f0b197]/35 blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-30 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
        <motion.div style={{ y: leftY }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/65 bg-white/45 text-[#3f678e] font-archivo text-xs uppercase tracking-[0.15em]"
          >
            <BarbellIcon size={13} weight="duotone" />
            Densify Protocol
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-pilcrow font-black leading-[0.94] text-[#1e3050]"
          >
            <span className="block text-5xl sm:text-6xl lg:text-[88px]">Desenvolvido</span>
            <span className="block text-5xl sm:text-6xl lg:text-[88px] text-[#3d72b4]">para Pessoas Ocupadas</span>
            <span className="block text-4xl sm:text-5xl lg:text-[62px] text-[#1e3050]/58 mt-2">hipertrofia, nutrição e consistência</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-xl text-[#3d5472]/78 font-archivo text-lg leading-relaxed"
          >
            A rotina muda toda semana. Seu plano não quebra por isso. Treino de alta densidade e nutrição adaptativa em blocos curtos, com progressão real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#calculator"
              className="densify-lg densify-control inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/70 bg-white/25 text-[#1e3050] font-archivo font-bold"
            >
              <span className="densify-control-content">Calcular Meu Plano</span>
              <ArrowRightIcon size={16} weight="bold" />
            </a>
            <a href="#benefits" className="inline-flex items-center gap-2 px-5 py-3 text-[#3a5070]/80 hover:text-[#1e3050] font-archivo text-sm">
              <ClockCountdownIcon size={14} weight="duotone" />
              Ver metodologia
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: rightY }}
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="orig-lg relative rounded-[26px] p-5 md:p-6 border border-white/65 bg-white/20 shadow-[0_18px_50px_rgba(30,48,80,0.16)]"
        >
          <div className="flex items-center justify-between border-b border-[#3d72b4]/18 pb-4 mb-5">
            <div>
              <p className="font-archivo text-[10px] tracking-[0.18em] uppercase text-[#3a5070]/60">Plano ativo</p>
              <p className="font-pilcrow text-3xl font-black text-[#1e3050] leading-none">Plano de Hipertrofia</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#3d72b4]/14 border border-[#3d72b4]/28 flex items-center justify-center">
              <ChartLineUpIcon size={21} weight="duotone" color="#3d72b4" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/70 bg-white/35 px-3 py-3">
                <p className="font-archivo text-[10px] uppercase tracking-[0.14em] text-[#3a5070]/62">{m.label}</p>
                <p className="font-pilcrow font-black text-2xl text-[#1e3050] mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/35 p-4">
            <div className="flex justify-between mb-3">
              <p className="font-archivo text-xs text-[#3a5070]/65">Status de ciclos</p>
              <p className="font-archivo text-xs text-[#3d72b4]">Semana 08 / 12</p>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {days.map((d, i) => (
                <div key={d} className={`rounded-xl py-2 text-center border ${i < 4 ? "bg-[#3d72b4]/12 border-[#3d72b4]/20" : "bg-white/35 border-white/60"}`}>
                  <p className="font-archivo text-[10px] text-[#3a5070]/65">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
