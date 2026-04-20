"use client";
import { motion } from "framer-motion";
import { SiApple, SiGoogleplay } from "@icons-pack/react-simple-icons";
import {
  LockSimpleIcon,
  StarIcon,
  ArrowCounterClockwiseIcon,
  DeviceMobileIcon,
  RocketLaunchIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

const perks = [
  { Icon: LockSimpleIcon, text: "Sem cartão de crédito" },
  { Icon: StarIcon, text: "4.9 na App Store" },
  { Icon: ArrowCounterClockwiseIcon, text: "Cancele quando quiser" },
];

const highlights = [
  { Icon: DeviceMobileIcon, label: "iOS & Android", sub: "Nativo nos dois" },
  { Icon: RocketLaunchIcon, label: "Onboarding em 2 min", sub: "Já começa hoje" },
  { Icon: UsersThreeIcon, label: "12.000+ usuários", sub: "Comunidade ativa" },
];

export default function CTASection() {
  return (
    <section id="download" className="relative overflow-hidden">
      {/* Two-tone split background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fceee6] via-[#f5e8f2] to-[#e6eef8]" />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#9dc4e8]/40 to-[#c0d8f8]/15 blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute bottom-[-10%] right-[5%] w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-[#f2b8a0]/40 to-[#f8d0c0]/15 blur-[110px] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28">
        {/* Top grid — highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {highlights.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/55 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#3d72b4]/12 border border-[#3d72b4]/20 flex items-center justify-center">
                <Icon size={18} weight="duotone" color="#3d72b4" />
              </div>
              <div>
                <p className="font-archivo font-semibold text-sm text-[#1e3050]">{label}</p>
                <p className="font-archivo text-[10px] text-[#3a5070]/55">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main CTA block */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-archivo font-semibold text-[#5a7fa0] bg-white/40 border border-white/60 rounded-full uppercase tracking-widest">
              Disponível agora
            </span>
            <h2 className="font-pilcrow font-black text-5xl sm:text-6xl lg:text-7xl text-[#1e3050] leading-[1.0] mb-6">
              Comece hoje.
              <br />
              <span className="text-[#3d72b4]">
                Mude em
              </span>
              <br />
              <span className="text-[#3d72b4]">
                30 dias.
              </span>
            </h2>
            <p className="font-archivo text-lg text-[#3a5070]/70 max-w-lg leading-relaxed mb-10">
              Junte-se a mais de 12.000 pessoas que transformaram corpo e rotina sem abrir mão de nada que importa.
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 56px rgba(30,48,80,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-4 px-7 py-4 rounded-full bg-[#1e3050] text-white font-archivo font-semibold text-base shadow-[0_8px_32px_rgba(30,48,80,0.25)] hover:bg-[#162540] transition-colors duration-300 cursor-pointer"
              >
                <SiApple size={20} color="white" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-white/55 font-normal">Disponível na</span>
                  <span>App Store</span>
                </div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 56px rgba(61,114,180,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-4 px-7 py-4 rounded-full bg-white/30 backdrop-blur-xl border border-white/55 text-[#1e3050] font-archivo font-semibold text-base shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] cursor-pointer hover:bg-white/50 transition-colors duration-300"
              >
                <SiGoogleplay size={20} color="#1e3050" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-[#3a5070]/55 font-normal">Disponível no</span>
                  <span>Google Play</span>
                </div>
              </motion.a>
            </div>

            {/* Perks row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {perks.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm font-archivo text-[#3a5070]/65">
                  <Icon size={13} weight="duotone" color="#5a7fa0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — large decorative glass card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block w-[280px] flex-shrink-0"
          >
            <div className="relative rounded-[32px] bg-white/25 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,0.8)] p-7 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

              <p className="font-archivo text-xs text-[#3a5070]/55 uppercase tracking-widest mb-2">Semana 12</p>
              <p className="font-pilcrow font-black text-3xl text-[#1e3050] mb-1">+4.2 kg</p>
              <p className="font-archivo text-sm text-[#3a5070]/60 mb-6">de massa magra adquirida</p>

              {/* Progress visualization */}
              <div className="space-y-3 mb-6">
                {[
                  { label: "Força", val: 82, color: "#4a7fb5" },
                  { label: "Resistência", val: 67, color: "#c07050" },
                  { label: "Recuperação", val: 90, color: "#3a8a5a" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-archivo text-xs text-[#3a5070]/60">{m.label}</span>
                      <span className="font-archivo font-bold text-xs text-[#1e3050]">{m.val}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/30 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: m.color }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${m.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#3d72b4]/15 to-[#8060c0]/10 border border-[#3d72b4]/20">
                <RocketLaunchIcon size={14} weight="duotone" color="#3d72b4" />
                <span className="font-archivo text-xs font-semibold text-[#3d72b4]">Meta atingida antes do prazo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
