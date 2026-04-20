import Link from "next/link";

// ─── Landing Pages HUB ────────────────────────────────────────────────────────
// Index of every landing page built in this monorepo.
// Add new entries to the PROJECTS array — the grid renders automatically.
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    slug: "/Densify",
    category: "Fitness & Nutrition",
    name: "Densify",
    description:
      "High-density workout & nutrition app. Hypertrophy results in 40-minute sessions — even for impossible schedules.",
    accent: "#6aabf0",
    accentDim: "rgba(106,171,240,0.07)",
    accentBorder: "rgba(106,171,240,0.18)",
    accentGlow: "rgba(106,171,240,0.28)",
    tag: "FITNESS",
    dot: "#6aabf0",
    extras: [
      { label: "Liquid Glass Comparison", href: "/comparison" },
    ],
  },
  {
    slug: "/LegisFlow",
    category: "Legal Compliance",
    name: "LegisFlow",
    description:
      "Automated compliance monitoring for legal teams. Track regulatory changes, manage obligations, and stay audit-ready.",
    accent: "#4ade80",
    accentDim: "rgba(45,106,79,0.07)",
    accentBorder: "rgba(45,106,79,0.22)",
    accentGlow: "rgba(74,222,128,0.20)",
    tag: "COMPLIANCE",
    dot: "#4ade80",
    extras: [],
  },
] as const;

const TOTAL: number = PROJECTS.length;

export default function HubPage() {
  return (
    <main className="min-h-screen bg-[#080c12] text-white font-[family-name:var(--font-geist-sans)] flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="border-b border-white/[0.06] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-[family-name:var(--font-geist-mono)] ml-2">
            landing-page-hub
          </span>
        </div>
        <span className="text-[11px] font-[family-name:var(--font-geist-mono)] text-white/20">
          {TOTAL}&nbsp;project{TOTAL !== 1 ? "s" : ""}
        </span>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="px-8 pt-20 pb-14 max-w-5xl">
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/20 font-[family-name:var(--font-geist-mono)] mb-6">
          Quinquilharias · Design System
        </p>
        <h1 className="text-5xl sm:text-[64px] font-bold leading-none tracking-tight mb-5">
          Landing Pages
          <br />
          <span className="text-white/20">Collection</span>
        </h1>
        <p className="text-white/35 text-[15px] max-w-sm leading-relaxed">
          A workspace of production-grade landing pages — each project in its
          own route group with isolated styles, fonts, and components.
        </p>
      </section>

      {/* ── Rule ────────────────────────────────────────────────── */}
      <div className="mx-8 h-px bg-white/[0.06]" />

      {/* ── Project grid ────────────────────────────────────────── */}
      <section className="px-8 py-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl">

          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="group flex flex-col gap-2">

              {/* ── Main card ── */}
              <Link
                href={p.slug}
                className="relative flex flex-col justify-between rounded-2xl border p-7 min-h-[280px] transition-all duration-300 hover:scale-[1.015] overflow-hidden cursor-pointer"
                style={{ background: p.accentDim, borderColor: p.accentBorder }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${p.accentGlow} 0%, transparent 70%)`,
                  }}
                />

                {/* Top row */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: p.dot, boxShadow: `0 0 6px ${p.dot}` }}
                    />
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-geist-mono)]"
                      style={{ color: p.accent, opacity: 0.65 }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-[family-name:var(--font-geist-mono)] text-white/12">
                    {String(i + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                  </span>
                </div>

                {/* Name + description */}
                <div className="relative z-10">
                  <h2 className="text-[38px] font-bold leading-none tracking-tight text-white mb-3">
                    {p.name}
                  </h2>
                  <p className="text-white/35 text-[13px] leading-relaxed max-w-[280px]">
                    {p.description}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] text-white/20 font-[family-name:var(--font-geist-mono)]">
                    {p.category}
                  </span>
                  <span
                    className="text-[13px] font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200"
                    style={{ color: p.accent }}
                  >
                    Open
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>

              {/* ── Sub-links ── */}
              {p.extras.length > 0 && (
                <div className="flex gap-2">
                  {p.extras.map((e) => (
                    <Link
                      key={e.href}
                      href={e.href}
                      className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 text-white/30 hover:text-white/55 text-[11px] font-[family-name:var(--font-geist-mono)]"
                    >
                      <span>{e.label}</span>
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* ── New project slot ── */}
          <div className="rounded-2xl border border-dashed border-white/[0.07] p-7 flex flex-col items-center justify-center gap-3 text-center min-h-[280px] opacity-30 hover:opacity-50 transition-opacity duration-300 cursor-default">
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-white/40 text-[11px] font-[family-name:var(--font-geist-mono)] leading-relaxed">
              Next landing page
              <br />
              <span className="text-white/20">Add entry to PROJECTS</span>
            </p>
          </div>

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-8 py-5 flex items-center justify-between">
        <span className="text-[11px] text-white/15 font-[family-name:var(--font-geist-mono)]">
          Quinquilharias · {new Date().getFullYear()}
        </span>
        <span className="text-[11px] text-white/10 font-[family-name:var(--font-geist-mono)]">
          Next.js · Tailwind CSS · Framer Motion
        </span>
      </footer>

    </main>
  );
}
