"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Terminal Block — linhas aparecem sequencialmente ──────

const terminalLines = [
  { color: "text-ink/40",    text: "$ legisflow-collector --mode=auto --env=prod" },
  { color: "text-verde",     text: "▶ Autenticando no portal SINTEGRA..." },
  { color: "text-off-white", text: "✓ CNPJ 12.345.678/0001-99 — Certidão OK" },
  { color: "text-off-white", text: "✓ CNPJ 98.765.432/0001-11 — Certidão OK" },
  { color: "text-yellow-400",text: "⚠ CNPJ 11.222.333/0001-44 — CND vence em 12 dias" },
  { color: "text-off-white", text: "✓ CNPJ 55.666.777/0001-88 — Certidão OK" },
  { color: "text-ink/40",    text: "▶ Consultando IBAMA LO/LAO/CTF..." },
  { color: "text-verde",     text: "✓ 3 licenças verificadas e em dia" },
  { color: "text-red-400",   text: "✗ 1 licença VENCIDA — notificação disparada" },
  { color: "text-ink/40",    text: "▶ Gerando relatório_04-2026.pdf..." },
  { color: "text-verde",     text: "✓ Ciclo completo em 2m 14s · 24 CNPJs" },
];

function TerminalBlock({ inView }: { inView: boolean }) {
  return (
    <div className="bg-ink rounded-none p-5 h-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <span className="w-3 h-3 rounded-full bg-verde/70" />
        <span className="ml-4 font-terminal text-[10px] text-off-white/30 tracking-widest">
          legisflow — collector.sh
        </span>
      </div>
      <div className="flex flex-col gap-0.75">
        {terminalLines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.3,
              delay: 0.35 + i * 0.1,
              ease: "easeOut",
            }}
            className={`font-terminal text-[11px] leading-relaxed ${l.color}`}
          >
            {l.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

// ─── Alert Block ───────────────────────────────────────────

const alerts = [
  { status: "VENCE EM 7D",  doc: "Alvará de Funcionamento",  company: "EMPRESA A LTDA",   variant: "warning" },
  { status: "VENCE EM 22D", doc: "CND Federal",              company: "EMPRESA B S/A",    variant: "normal"  },
  { status: "VENCIDA",      doc: "Licença Ambiental — LO",   company: "EMPRESA C EIRELI", variant: "danger"  },
];

const alertStyles = {
  warning: "border-yellow-500 bg-yellow-50 text-yellow-700",
  normal:  "border-ink bg-white text-ink",
  danger:  "border-red-600 bg-red-50 text-red-600",
};

function AlertBlock() {
  return (
    <div className="h-full flex flex-col gap-3 justify-center">
      {alerts.map((a) => (
        <div key={a.doc} className={`border-2 p-3 ${alertStyles[a.variant as keyof typeof alertStyles]}`}>
          <p className="font-terminal text-[10px] tracking-widest font-bold">{a.status}</p>
          <p className="font-ui text-sm font-semibold text-ink mt-1">{a.doc}</p>
          <p className="font-ui text-xs text-ink/50 mt-0.5">{a.company}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard Mockup ──────────────────────────────────────

const cnpjList = [
  { cnpj: "12.345.678/0001-99", status: "EM DIA",   ok: true  },
  { cnpj: "98.765.432/0001-11", status: "EM DIA",   ok: true  },
  { cnpj: "11.222.333/0001-44", status: "PENDENTE", pending: true },
  { cnpj: "55.666.777/0001-88", status: "EM DIA",   ok: true  },
  { cnpj: "33.444.555/0001-22", status: "EM DIA",   ok: true  },
  { cnpj: "77.888.999/0001-00", status: "VENCIDO",  expired: true },
];

function badge(item: (typeof cnpjList)[0]) {
  if (item.ok)      return "bg-verde text-white";
  if (item.pending) return "bg-yellow-500 text-ink";
  return "bg-red-600 text-white";
}

function DashboardMockup() {
  return (
    <div className="h-full flex flex-col">
      <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-ink/40 mb-3">
        Painel de Status — CNPJs
      </p>
      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        {cnpjList.map((item) => (
          <div key={item.cnpj} className="flex items-center justify-between border border-ink/15 px-3 py-2">
            <span className="font-terminal text-[11px] text-ink">{item.cnpj}</span>
            <span className={`font-ui text-[9px] font-bold tracking-widest px-2 py-1 ${badge(item)}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t-2 border-ink pt-3 grid grid-cols-3 text-center">
        {[
          { n: "4", label: "Em Dia",   color: "text-verde"      },
          { n: "1", label: "Pendente", color: "text-yellow-500" },
          { n: "1", label: "Vencido",  color: "text-red-600"    },
        ].map((s) => (
          <div key={s.label}>
            <div className={`font-headline text-3xl leading-none ${s.color}`}>{s.n}</div>
            <div className="font-ui text-[9px] tracking-widest uppercase text-ink/50 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bento Card — whileHover com hard shadow Framer Motion ─

interface BentoCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  accent?: boolean;
  gridArea: string;
  delay?: number;
  inView: boolean;
}

function BentoCard({ title, subtitle, children, accent = false, gridArea, delay = 0, inView }: BentoCardProps) {
  return (
    <motion.div
      style={{ gridArea }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileHover={{
        y: -4,
        boxShadow: accent ? "-5px 5px 0px 0px #0A0A0A" : "5px 5px 0px 0px #0A0A0A",
        transition: { duration: 0.12, ease: "easeOut" },
      }}
      transition={{ duration: 0.65, ease, delay }}
      className={`
        min-h-65 border-2 border-ink p-6 flex flex-col cursor-default
        ${accent ? "bg-verde" : "bg-off-white"}
      `}
    >
      <div className="mb-4 shrink-0">
        <h3 className={`font-headline text-xl tracking-wide uppercase leading-none ${accent ? "text-off-white" : "text-ink"}`}>
          {title}
        </h3>
        <p className={`font-ui text-xs mt-1 leading-relaxed ${accent ? "text-off-white/65" : "text-ink/55"}`}>
          {subtitle}
        </p>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────

export default function BentoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-off-white border-b-2 border-ink px-6 md:px-14 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className="mb-14"
      >
        <h2
          className="font-headline uppercase leading-none text-ink"
          style={{ fontSize: "clamp(2.4rem, 7vw, 7rem)" }}
        >
          TUDO QUE VOCÊ
          <br />
          PRECISA, INTEGRADO
        </h2>
        <p className="font-ui text-sm text-ink/55 mt-4 max-w-lg leading-relaxed">
          Da coleta automatizada em portais governamentais ao relatório final —
          o processo completo sem intervenção manual.
        </p>
      </motion.div>

      {/* Bento grid — layout definido pelo CSS .legis-bento */}
      <div className="grid grid-cols-1 legis-bento border-2 border-ink" style={{ gap: 0 }}>

        {/* Block 1 — Integração de Dados (wide) */}
        <BentoCard
          title="Integração de Dados"
          subtitle="Robôs Python + Selenium consultam portais governamentais 24/7 em ciclos automáticos"
          gridArea="b1" delay={0} inView={inView}
        >
          <TerminalBlock inView={inView} />
        </BentoCard>

        {/* Block 2 — Monitoramento (square) */}
        <BentoCard
          title="Monitoramento Automático"
          subtitle="Alertas antes do vencimento. Zero surpresas para o cliente."
          gridArea="b2" delay={0.1} inView={inView}
        >
          <AlertBlock />
        </BentoCard>

        {/* Block 3 — Dashboard (tall vertical) */}
        <BentoCard
          title="Dashboard de Status"
          subtitle="Visão consolidada de todos os CNPJs sob gestão em tempo real"
          gridArea="b3" delay={0.15} inView={inView}
        >
          <DashboardMockup />
        </BentoCard>

        {/* Block 4 — IBAMA (accent green) */}
        <BentoCard
          title="Módulo Ambiental IBAMA"
          subtitle="LO, LAO, CTF e SINAFLOR monitorados em tempo real"
          gridArea="b4" delay={0.2} inView={inView}
          accent
        >
          <div className="grid grid-cols-2 gap-3 mt-2">
            {["LO", "LAO", "CTF/IBAMA", "SINAFLOR"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease }}
                className="border border-off-white/30 p-3 hover:bg-off-white/10 transition-colors"
              >
                <div className="font-headline text-2xl text-off-white leading-none">{item}</div>
                <div className="font-ui text-[9px] tracking-widest uppercase text-off-white/55 mt-1">
                  Monitorado
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
