"use client";
// Already code-split via dynamic() on the page — bundle loads lazily (bundle-dynamic-imports)
// Note: @phosphor-icons/react requires React context so this must remain a Client Component
import { SiInstagram, SiX, SiYoutube, SiApple, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { BarbellIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

const socials = [
  { icon: SiInstagram, href: "#", label: "Instagram" },
  { icon: SiX, href: "#", label: "X" },
  { icon: SiYoutube, href: "#", label: "YouTube" },
];

const footerLinks = [
  { group: "App", links: ["Calculadora", "Benefícios", "Planos", "Comunidade"] },
  { group: "Legal", links: ["Privacidade", "Termos", "Cookies"] },
  { group: "Suporte", links: ["Central de Ajuda", "Contato", "Status"] },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#141e35] to-[#0d1525]">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4a7fb5] to-[#2a5090] flex items-center justify-center">
                <BarbellIcon size={14} weight="bold" color="white" />
              </div>
              <span className="font-pilcrow font-black text-xl text-white">Densify</span>
            </div>
            <p className="font-archivo text-sm text-white/40 leading-relaxed max-w-[240px] mb-6">
              Treinos de alta densidade para pessoas com pouco tempo e grandes objetivos.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-white/60 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <SiApple size={13} />
                <span className="font-archivo text-xs">App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-white/60 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <SiGoogleplay size={13} />
                <span className="font-archivo text-xs">Google Play</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 border border-white/12 text-white/45 hover:bg-white/18 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ group, links }) => (
            <div key={group}>
              <p className="font-archivo font-semibold text-xs text-white/35 uppercase tracking-widest mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 font-archivo text-sm text-white/45 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {l}
                      <ArrowUpRightIcon
                        size={10}
                        weight="bold"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        color="currentColor"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="font-archivo text-xs text-white/25">
            © {new Date().getFullYear()} Densify. Todos os direitos reservados.
          </p>
          <p className="font-archivo text-xs text-white/20">
            Feito para quem não tem tempo a perder.
          </p>
        </div>
      </div>
    </footer>
  );
}
