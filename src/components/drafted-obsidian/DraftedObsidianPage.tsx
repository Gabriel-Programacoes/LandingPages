"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MiniHubMenu from "@/components/MiniHubMenu";

type ProjectSpec = {
  id: string;
  name: string;
  tag: string;
  metrics: Array<{ k: string; v: string }>;
};

const projects: ProjectSpec[] = [
  {
    id: "legisflow",
    name: "LegisFlow",
    tag: "01 // Spec Module",
    metrics: [
      { k: "Architecture", v: "Next.js + Workflow Modules" },
      { k: "Database", v: "PostgreSQL via Prisma" },
      { k: "Runtime", v: "Node.js Runtime" },
      { k: "Focus", v: "Legal Compliance Automation" },
    ],
  },
  {
    id: "cinematic-ink-concrete",
    name: "Cinematic Ink & Concrete",
    tag: "02 // Spec Module",
    metrics: [
      { k: "Architecture", v: "Next.js Landing Page" },
      { k: "Motion", v: "Framer Motion Interactions" },
      { k: "Data", v: "Open Library API Covers" },
      { k: "Style", v: "Editorial Brutalism System" },
    ],
  },
  {
    id: "densify",
    name: "Densify",
    tag: "03 // Spec Module",
    metrics: [
      { k: "Frontend", v: "React 19 + Motion" },
      { k: "Backend", v: "Node.js API Gateway" },
      { k: "Data", v: "PostgreSQL analytics schema" },
      { k: "Security", v: "JWT + signed webhooks" },
    ],
  },
];

const stackRows = [
  '{ "stack": ["Next.js", "React 19", "Node.js"] }',
  '{ "data": ["PostgreSQL", "Prisma", "Migrations"] }',
  '{ "system": ["Python", "C", "CLI Tooling"] }',
];

export default function DraftedObsidianPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [utc, setUtc] = useState("");
  const [openProject, setOpenProject] = useState("legisflow");
  const [terminalText, setTerminalText] = useState("mail --to your@email.com");

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const updateClock = () =>
      setUtc(
        new Date().toLocaleString("en-GB", {
          timeZone: "UTC",
          hour12: false,
        }) + " UTC"
      );
    window.addEventListener("mousemove", onMove);
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(timer);
    };
  }, []);

  const marquee = [...stackRows, ...stackRows];
  const ITEM_W = 390;
  const ITEM_GAP = 12;
  const TRACK_SET_W = (ITEM_W + ITEM_GAP) * stackRows.length;

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F3F3F0] font-[family-name:var(--font-chivo-mono)] relative overflow-hidden">
      <MiniHubMenu />
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2A2A2B 1px, transparent 1px), linear-gradient(to bottom, #2A2A2B 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2A2A2B 1px, transparent 1px), linear-gradient(to bottom, #2A2A2B 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      <section className="relative z-10 min-h-screen border-b border-[#2A2A2B]">
        <header className="h-10 md:h-12 border-b border-[#2A2A2B] px-4 md:px-8 flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#F3F3F0]/60">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF3B00] shadow-[0_0_10px_#FF3B00]" />
            <span>System_Online // V.26</span>
          </div>
          <div className="text-right">
            <p>{utc}</p>
            <p>LOC: -16.82, -49.25</p>
          </div>
        </header>

        <div className="grid md:grid-cols-12 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-3rem)]">
          <div className="md:col-span-8 border-r border-[#2A2A2B] p-6 md:p-10 lg:p-16 flex flex-col justify-end relative">
            <p className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] uppercase tracking-[0.2em] text-[#2A2A2B]">01 // Foundation</p>
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-[family-name:var(--font-space-grotesk)] uppercase tracking-tight leading-[0.88] text-5xl md:text-7xl lg:text-[7rem]"
            >
              Engineering
              <br />
              <span className="text-[#F3F3F0]/30">Robust</span>
              <br />
              Systems.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl mt-8 text-sm md:text-base leading-relaxed text-[#F3F3F0]/72"
            >
              Enterprise-grade delivery with grid-level precision: Next.js frontends, secure Node APIs, and relational PostgreSQL systems engineered for reliability and velocity.
            </motion.p>
          </div>
          <div className="md:col-span-4 grid grid-rows-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="border-b border-[#2A2A2B] p-6 md:p-8 flex flex-col justify-end hover:bg-[#121212] transition-none"
            >
              <p className="text-[#FF3B00] text-xs mb-4">[ CORE_STACK ]</p>
              <ul className="text-sm space-y-2 text-[#F3F3F0]/82">
                <li className="flex justify-between border-b border-[#2A2A2B] pb-1"><span>NEXT.JS</span><span>REACT_19</span></li>
                <li className="flex justify-between border-b border-[#2A2A2B] pb-1"><span>NODE.JS</span><span>POSTGRESQL</span></li>
                <li className="flex justify-between"><span>PYTHON</span><span>C</span></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
              className="group p-6 md:p-8 flex flex-col justify-end relative overflow-hidden border-b md:border-b-0 border-[#2A2A2B]"
            >
              <div className="absolute inset-0 bg-[#FF3B00] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-200" />
              <div className="relative z-10 group-hover:text-[#0C0C0C] transition-none">
                <p className="text-xs mb-4 opacity-60">[ ACTIVE_MODULES ]</p>
                <div className="font-[family-name:var(--font-space-grotesk)] uppercase text-2xl leading-tight">
                  <p>LegisFlow</p>
                  <p>Cinematic Ink & Concrete</p>
                  <p>Densify</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-[#2A2A2B]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
          <p className="text-[#FF3B00] uppercase tracking-[0.2em] text-xs mb-6">02 // Load-Bearing Modules</p>
          <div className="border border-[#2A2A2B]">
            {projects.map((project) => {
              const open = openProject === project.id;
              return (
                <div key={project.id} className="border-b border-[#2A2A2B] last:border-b-0">
                  <button
                    onClick={() => setOpenProject(open ? "" : project.id)}
                    className={`w-full h-20 px-5 md:px-8 text-left flex items-center justify-between uppercase tracking-[0.12em] ${open ? "bg-[#FF3B00] text-[#0C0C0C]" : "hover:translate-x-2 transition-transform duration-150"}`}
                  >
                    <span className="font-[family-name:var(--font-space-grotesk)] text-2xl">{project.name}</span>
                    <span className="text-xs">{project.tag}</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open ? "auto" : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-8 bg-[#101010]">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.metrics.map((m) => (
                          <div key={m.k} className="h-14 border border-[#2A2A2B] px-4 flex items-center justify-between text-xs uppercase tracking-[0.08em]">
                            <span className="text-[#F3F3F0]/55">{m.k}</span>
                            <span className="text-[#F3F3F0]">{m.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-[#2A2A2B] overflow-hidden">
        <style>{`
          @keyframes drafted-obsidian-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-${TRACK_SET_W}px); }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
          <p className="text-[#FF3B00] uppercase tracking-[0.2em] text-xs mb-6">03 // Structural Materials</p>
          <div
            className="flex w-max gap-3"
            style={{
              animation: "drafted-obsidian-marquee 20s linear infinite",
            }}
          >
            {marquee.map((row, idx) => (
              <pre key={`${row}-${idx}`} className="h-12 min-w-[390px] px-4 border border-[#2A2A2B] bg-[#111] flex items-center text-xs text-[#F3F3F0]/82">
                <code>
                  {row
                    .replace("Next.js", "NEXT.JS")
                    .replace("React 19", "REACT_19")
                    .replace("Node.js", "NODE.JS")
                    .replace("PostgreSQL", "POSTGRESQL")
                    .replace("Python", "PYTHON")}
                </code>
              </pre>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-[#2A2A2B]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid lg:grid-cols-2 gap-8">
          <div className="border border-[#2A2A2B] p-5 md:p-8">
            <p className="text-[#FF3B00] uppercase tracking-[0.2em] text-xs mb-6">04 // System Architecture</p>
            <svg viewBox="0 0 500 320" className="w-full h-auto">
              <motion.rect x="20" y="20" width="460" height="280" fill="none" stroke="#2A2A2B" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
              <motion.rect x="52" y="52" width="170" height="75" fill="none" stroke="#FF3B00" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} />
              <motion.rect x="278" y="52" width="170" height="75" fill="none" stroke="#F3F3F0" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }} />
              <motion.rect x="52" y="195" width="170" height="75" fill="none" stroke="#F3F3F0" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.35 }} />
              <motion.rect x="278" y="195" width="170" height="75" fill="none" stroke="#FF3B00" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }} />
              <motion.path d="M222 89 L278 89 M137 127 L137 195 M363 127 L363 195 M222 232 L278 232" stroke="#2A2A2B" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.55 }} />
              <text x="66" y="92" fill="#F3F3F0" fontSize="12">NEXT.JS API</text>
              <text x="290" y="92" fill="#F3F3F0" fontSize="12">AUTH GATEWAY</text>
              <text x="66" y="235" fill="#F3F3F0" fontSize="12">POSTGRESQL</text>
              <text x="290" y="235" fill="#F3F3F0" fontSize="12">OBSERVABILITY</text>
            </svg>
          </div>
          <div className="border border-[#2A2A2B] p-5 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#F3F3F0]/52 mb-5">Operational Ethos</p>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-4xl uppercase leading-[0.95] mb-6">
                Clean code.
                <br />
                Deterministic security.
              </h3>
              <p className="text-[#F3F3F0]/72 text-sm leading-relaxed max-w-xl">
                I design systems with explicit boundaries, predictable performance, and audit-ready security controls. Every module has a purpose, every dependency is justified, and every data path is observable.
              </p>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-3 text-xs uppercase tracking-[0.08em]">
              <div className="h-12 border border-[#2A2A2B] px-3 flex items-center justify-between"><span className="text-[#F3F3F0]/58">Threat Model</span><span>Active</span></div>
              <div className="h-12 border border-[#2A2A2B] px-3 flex items-center justify-between"><span className="text-[#F3F3F0]/58">Audit Trace</span><span>Enabled</span></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto border border-[#2A2A2B] h-16 flex items-center px-4 md:px-6 text-sm uppercase tracking-[0.12em]">
          <span className="text-[#F3F3F0]/52 mr-2">$</span>
          <input
            value={terminalText}
            onChange={(e) => setTerminalText(e.target.value)}
            className="bg-transparent outline-none flex-1 text-[#F3F3F0]"
            aria-label="Email command input"
          />
          <span className="text-[#FF3B00] animate-pulse">|</span>
        </div>
      </footer>
    </main>
  );
}
