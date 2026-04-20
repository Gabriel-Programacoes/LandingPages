"use client";

// ─── Liquid Glass — Side-by-side comparison ──────────────────────────────────
// Left  : Original open-source demo (static feTurbulence, photo bg, pure CSS)
// Right : Densify implementation  (animated feTurbulence, gradient orbs, .densify-lg)
// The #densify-lg filter is injected globally by (fitness)/layout.tsx.
// The #cmp-orig filter is defined locally in this page's hidden SVG.
// ─────────────────────────────────────────────────────────────────────────────

export default function ComparisonPage() {
  return (
    <main className="min-h-screen bg-[#0d1525] text-black py-20 px-6 font-archivo">

      {/* ── Local SVG: original demo filter (static, scale=77) ── */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id="cmp-orig" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blur"
              scale="77"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Scoped CSS for original demo (cannot use ::pseudo in JSX) ── */}
      <style>{`
        /* Animated flower background — exactly as in the original demo */
        .cmp-bg {
          background: url(https://raw.githubusercontent.com/lucasromerodb/liquid-glass-effect-macos/refs/heads/main/assets/flowers.jpg) center center;
          background-size: 400px;
          animation: cmp-move-bg 60s linear infinite;
        }
        @keyframes cmp-move-bg {
          from { background-position: 0% 0%;    }
          to   { background-position: 0% -1000%; }
        }

        /* glassContainer replica */
        .cmp-orig-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 260px;
          height: 170px;
          border-radius: 30px;
          isolation: isolate;
        }
        .cmp-orig-container::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: 30px;
          box-shadow:
            inset 2px 2px 0px -2px rgba(255,255,255,0.7),
            inset 0 0 3px 1px rgba(255,255,255,0.7);
        }
        .cmp-orig-container::after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: 30px;
          backdrop-filter: blur(0px);
          filter: url(#cmp-orig);
          overflow: hidden;
          isolation: isolate;
        }

        /* glassBtn replica */
        .cmp-orig-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 9999px;
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
          z-index: 1;
          isolation: isolate;
          color: white;
          font-size: 28px;
          font-weight: 300;
          line-height: 1;
        }
        .cmp-orig-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: 9999px;
          box-shadow:
            inset 2px 2px 0px -2px rgba(255,255,255,0.7),
            inset 0 0 3px 1px rgba(255,255,255,0.7);
          background-color: rgba(255,255,255,0.10);
        }
        .cmp-orig-btn::after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: 9999px;
          backdrop-filter: blur(0px);
          filter: url(#cmp-orig);
          overflow: hidden;
          isolation: isolate;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* ── Page header ─────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-4">
            Liquid Glass · Technique Comparison
          </p>
          <h1 className="font-pilcrow font-black text-5xl sm:text-6xl leading-none tracking-tight">
            Two Implementations,
            <br />
            <span className="text-[#6aabf0]">One Effect</span>
          </h1>
          <p className="text-white/45 mt-5 max-w-lg mx-auto text-sm leading-relaxed">
            The original open-source demo on the left; our adapted, animated,
            component-ready version for Densify on the right.
          </p>
        </div>

        {/* ── Two demo panels ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

          {/* ════ LEFT — Original Demo ════════════════════════════ */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">

            {/* Panel header */}
            <div className="px-6 py-4 bg-white/[0.04] border-b border-white/10 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.7)]" />
              <h2 className="font-bold text-sm tracking-wide">Original Demo</h2>
              <div className="ml-auto flex items-center gap-2 text-[10px] text-white/30 tracking-widest uppercase">
                <span className="px-2 py-0.5 rounded bg-orange-400/10 border border-orange-400/20 text-orange-400/70">HTML</span>
                <span className="px-2 py-0.5 rounded bg-orange-400/10 border border-orange-400/20 text-orange-400/70">CSS</span>
                <span className="px-2 py-0.5 rounded bg-orange-400/10 border border-orange-400/20 text-orange-400/70">SVG</span>
              </div>
            </div>

            {/* Live demo — flower bg */}
            <div className="cmp-bg h-80 flex items-center justify-center">
              <div className="cmp-orig-container">
                <button className="cmp-orig-btn">+</button>
              </div>
            </div>

            {/* Spec grid */}
            <div className="p-5 grid grid-cols-2 gap-2.5 bg-[#0d1525]">
              {[
                ["Noise type",         "fractalNoise (static)"],
                ["baseFrequency",      "0.008 · fixed"],
                ["Displacement scale", "77 px · aggressive"],
                ["Button filter",      "Baked PNG bump map"],
                ["White tint",         "::before bg rgba(255,255,255,.10)"],
                ["Background",         "Animated photo (60 s CSS)"],
                ["Shape target",       "Circle · 70 × 70 px"],
                ["Integration",        "Standalone CSS class"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-white/[0.04] px-3.5 py-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">{k}</p>
                  <p className="text-white/75 text-xs font-medium leading-snug">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT — Densify Implementation ════════════════ */}
          <div className="rounded-2xl border border-[#6aabf0]/25 overflow-hidden">

            {/* Panel header */}
            <div className="px-6 py-4 bg-[#6aabf0]/[0.06] border-b border-[#6aabf0]/20 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6aabf0] shadow-[0_0_8px_rgba(106,171,240,0.7)]" />
              <h2 className="font-bold text-sm tracking-wide">Densify Implementation</h2>
              <div className="ml-auto flex items-center gap-2 text-[10px] text-white/30 tracking-widest uppercase">
                <span className="px-2 py-0.5 rounded bg-[#6aabf0]/10 border border-[#6aabf0]/20 text-[#6aabf0]/70">React</span>
                <span className="px-2 py-0.5 rounded bg-[#6aabf0]/10 border border-[#6aabf0]/20 text-[#6aabf0]/70">Tailwind</span>
                <span className="px-2 py-0.5 rounded bg-[#6aabf0]/10 border border-[#6aabf0]/20 text-[#6aabf0]/70">SVG</span>
              </div>
            </div>

            {/* Live demo — Densify gradient hero */}
            <div
              className="h-80 relative overflow-hidden flex flex-col items-center justify-center gap-5"
              style={{ background: "linear-gradient(135deg, #d8e8f8 0%, #ede8f5 50%, #fae8e0 100%)" }}
            >
              {/* Gradient orbs — mirror of HeroSection */}
              <div className="absolute top-[-10%] left-[-5%] w-56 h-56 rounded-full bg-[#9dc4e8]/55 blur-[60px] pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-5%] w-52 h-52 rounded-full bg-[#f0a890]/50 blur-[70px] pointer-events-none" />
              <div className="absolute top-[20%] right-[15%] w-36 h-36 rounded-full bg-[#d4b8f0]/40 blur-[50px] pointer-events-none" />

              {/* Stat pills row */}
              <div className="relative z-10 flex gap-3">
                {[
                  { value: "40min", label: "Por treino",       color: "#f0b8a0" },
                  { value: "+4kg",  label: "Média em 3 meses", color: "#a8c8f0" },
                  { value: "3.9k",  label: "kcal/dia",         color: "#d0a0e0" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="densify-lg flex flex-col items-center px-4 py-3 rounded-2xl bg-white/18 border border-white/50 shadow-sm overflow-hidden"
                  >
                    <p className="font-pilcrow font-black text-sm text-[#1e3050] leading-none">{s.value}</p>
                    <p className="font-archivo text-[10px] text-[#3a5070]/60 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA pill */}
              <div className="relative z-10 densify-lg inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/18 border border-white/60 shadow-md text-[#1e3050] font-archivo font-bold text-sm overflow-hidden cursor-pointer">
                Calcular Meu Plano →
              </div>
            </div>

            {/* Spec grid */}
            <div className="p-5 grid grid-cols-2 gap-2.5 bg-[#0d1525]">
              {[
                ["Noise type",         "fractalNoise (animated)"],
                ["baseFrequency",      "0.006–0.011 · 18 s morph"],
                ["Displacement scale", "40 px · refined"],
                ["Button filter",      "Same fractalNoise, no PNG"],
                ["White tint",         "bg-white/18 on element"],
                ["Background",         "CSS gradient orbs"],
                ["Shape target",       "Pill · rounded-2xl / full"],
                ["Integration",        ".densify-lg Tailwind class"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[#6aabf0]/[0.05] border border-[#6aabf0]/10 px-3.5 py-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6aabf0]/40 mb-1">{k}</p>
                  <p className="text-white/75 text-xs font-medium leading-snug">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Technical breakdown table ─────────────────────────── */}
        <div className="rounded-2xl border border-white/10 overflow-hidden mb-8">
          <div className="px-6 py-4 bg-white/[0.03] border-b border-white/10 flex items-center gap-3">
            <h2 className="font-bold text-sm tracking-wide text-white/80">Technical Breakdown</h2>
            <p className="text-xs text-white/30 ml-1">Property-by-property diff</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-3 text-white/35 text-[10px] uppercase tracking-widest font-medium w-1/3">Property</th>
                  <th className="text-left px-6 py-3 text-orange-400/70 text-[10px] uppercase tracking-widest font-medium w-1/3">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                      Original
                    </span>
                  </th>
                  <th className="text-left px-6 py-3 text-[#6aabf0]/70 text-[10px] uppercase tracking-widest font-medium w-1/3">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6aabf0] inline-block" />
                      Densify
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Glass distortion noise",
                    "Static feTurbulence · seed 92",
                    "Animated feTurbulence · SVG <animate> breathes every 18 s",
                    true,
                  ],
                  [
                    "Displacement scale",
                    "77 px — highly visible warp",
                    "40 px — subtle, brand-appropriate",
                    false,
                  ],
                  [
                    "Button/pill filter",
                    "Separate baked PNG bump map (feImage)",
                    "Same fractalNoise filter — single source of truth",
                    true,
                  ],
                  [
                    "Background material",
                    "External photo via CSS background-image",
                    "Self-contained CSS gradient orbs (no network)",
                    false,
                  ],
                  [
                    "Background animation",
                    "CSS @keyframes moves photo 0 → -1000%",
                    "Framer Motion scroll parallax on the orbs",
                    true,
                  ],
                  [
                    "Shine ring",
                    "inset box-shadow on ::before (z:0)",
                    "inset box-shadow on ::before (z:2, above Framer Motion layers)",
                    false,
                  ],
                  [
                    "Reusability / DX",
                    "Copy-paste .glassContainer + .glassBtn per element",
                    "Add densify-lg class to any element — one line",
                    true,
                  ],
                  [
                    "Motion compatibility",
                    "No JS animation framework",
                    "Works alongside Framer Motion (float + scale + hover)",
                    false,
                  ],
                  [
                    "Isolation / stacking",
                    "isolation: isolate per element",
                    "isolation: isolate baked into .densify-lg",
                    true,
                  ],
                  [
                    "Browser support",
                    "Chrome · Safari · Edge (Firefox partial)",
                    "Same — identical CSS/SVG surface",
                    false,
                  ],
                ].map(([prop, orig, dens, highlight], i) => (
                  <tr
                    key={String(prop)}
                    className={`border-b border-white/[0.06] transition-colors ${
                      highlight ? "bg-white/[0.015]" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-white/55 font-medium text-xs">{prop}</td>
                    <td className="px-6 py-4 text-white/70 text-xs">{orig}</td>
                    <td className="px-6 py-4 text-white/70 text-xs">{dens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Key improvements callout ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            {
              icon: "✦",
              color: "text-violet-400",
              bg: "bg-violet-400/[0.07] border-violet-400/20",
              title: "Animated Texture",
              desc: "SVG <animate> on baseFrequency makes the glass slowly morph — the original demo never moves the noise, only the background.",
            },
            {
              icon: "◈",
              color: "text-blue-400",
              bg: "bg-blue-400/[0.07] border-blue-400/20",
              title: "Single CSS Class",
              desc: ".densify-lg encapsulates ::before, ::after, isolation, and z-index. Apply to any element in one className attribute.",
            },
            {
              icon: "⬡",
              color: "text-emerald-400",
              bg: "bg-emerald-400/[0.07] border-emerald-400/20",
              title: "Framer Motion Ready",
              desc: "Works with scale, rotate, y-translate, and AnimatePresence with no z-index conflicts — stacking fully resolved.",
            },
          ].map((c) => (
            <div key={c.title} className={`rounded-2xl border ${c.bg} p-6`}>
              <p className={`text-2xl mb-3 ${c.color}`}>{c.icon}</p>
              <h3 className={`font-bold text-sm mb-2 ${c.color}`}>{c.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Footer nav ───────────────────────────────────────── */}
        <div className="flex items-center justify-between text-xs text-white/25 border-t border-white/10 pt-6">
          <span>Densify · Liquid Glass Comparison</span>
          <a href="/Densify" className="hover:text-white/60 transition-colors">
            ← Back to Densify Landing Page
          </a>
        </div>
      </div>
    </main>
  );
}

