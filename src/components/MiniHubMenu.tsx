"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Hub" },
  { href: "/Nexa", label: "Nexa" },
  { href: "/Densify", label: "Densify" },
  { href: "/LegisFlow", label: "LegisFlow" },
  { href: "/CinematicInkConcrete", label: "Cinematic Ink" },
  { href: "/DraftedObsidian", label: "Drafted Obsidian" },
  { href: "/SculptedSilence", label: "Sculpted Silence" },
  { href: "/SpectralCore", label: "Spectral Core" },
];

export default function MiniHubMenu({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className={`fixed left-3 top-1/2 -translate-y-1/2 z-[120] ${className ?? ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`h-24 w-8 rounded-xl border border-white/[0.12] bg-[#080c12]/86 backdrop-blur-xl text-white/65 hover:text-white transition-colors font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.22em] [writing-mode:vertical-rl] ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        HUB
      </button>

      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[168px] rounded-2xl border border-white/[0.10] bg-[#080c12]/88 backdrop-blur-xl transition-all duration-200 ${
          open ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-3 pointer-events-none"
        }`}
      >
        <div className="p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex gap-1.5 ml-1">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-7 px-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/8 text-[10px] uppercase tracking-[0.18em] font-[family-name:var(--font-geist-mono)]"
            >
              Close
            </button>
          </div>

          <span className="block text-center mb-2 text-[9px] tracking-[0.2em] uppercase text-white/30 font-[family-name:var(--font-geist-mono)]">
            landing-page-hub
          </span>

          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-2.5 py-2 rounded-lg text-[10px] font-[family-name:var(--font-geist-mono)] transition-colors whitespace-nowrap ${
                    active
                      ? "bg-white/12 text-white"
                      : "text-white/45 hover:text-white/75 hover:bg-white/8"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
