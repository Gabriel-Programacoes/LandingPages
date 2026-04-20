"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  LayoutGroup,
} from "framer-motion";
import { useState, useCallback } from "react";
import {
  BarbellIcon,
  CalculatorIcon,
  SparkleIcon,
  UsersThreeIcon,
  DeviceMobileIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";

const navLinks = [
  { id: "calc", label: "Calcular", href: "#calculator", Icon: CalculatorIcon },
  { id: "benef", label: "Benefícios", href: "#benefits", Icon: SparkleIcon },
  { id: "dep", label: "Depoimentos", href: "#testimonials", Icon: UsersThreeIcon },
];

const spring     = { type: "spring" as const, stiffness: 320, damping: 32, mass: 1.0 };
const softSpring = { type: "spring" as const, stiffness: 180, damping: 24, mass: 0.9 };
const fadeEase   = { duration: 0.28, ease: [0.4, 0, 0.2, 1] } as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled,     setScrolled]     = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [hovered,      setHovered]      = useState<string | null>(null);
  const [navHovered,   setNavHovered]   = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
    setHeroScrolled(v > 480);
  });

  const isCollapsed = heroScrolled && !navHovered;

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const offset = 80; // altura da navbar + respiro
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <LayoutGroup>
        <motion.nav
          layout
          transition={softSpring}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
          className="pointer-events-auto relative flex flex-col items-stretch overflow-hidden"
          style={{
            borderRadius: mobileOpen ? 28 : 100,
            background: scrolled ? "rgba(12,20,38,0.92)" : "rgba(18,28,50,0.72)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: scrolled
              ? "0 12px 48px rgba(0,0,0,0.35), inset 0 1.5px 0 rgba(255,255,255,0.07)"
              : "0 8px 32px rgba(0,0,0,0.20), inset 0 1.5px 0 rgba(255,255,255,0.09)",
          }}
        >
          {/* ── Top bar ─────────────────────────────────── */}
          <div className="flex items-center gap-1 px-3 py-2.5">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer">
              <motion.div
                key={`barbell-${heroScrolled}`}
                whileHover={{ scale: 1.15, rotate: -12 }}
                initial={heroScrolled ? { rotate: -180, scale: 0.4 } : false}
                animate={{ rotate: 0, scale: 1 }}
                transition={spring}
                className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4a7fb5] to-[#2a5090] flex items-center justify-center shadow-sm shrink-0"
              >
                <BarbellIcon size={12} weight="bold" color="white" />
              </motion.div>
              {/* Text: always in DOM, slides/fades via transform only */}
              <motion.span
                animate={isCollapsed
                  ? { opacity: 0, x: -6, scaleX: 0.6 }
                  : { opacity: 1, x: 0,  scaleX: 1   }}
                transition={fadeEase}
                style={{ transformOrigin: "left", display: "inline-block" }}
                className="font-pilcrow font-black text-sm text-white leading-none whitespace-nowrap"
              >
                Densify
              </motion.span>
            </a>

            {/* Divider */}
            <motion.div
              animate={isCollapsed ? { opacity: 0, scaleY: 0 } : { opacity: 1, scaleY: 1 }}
              transition={fadeEase}
              style={{ transformOrigin: "center" }}
              className="hidden sm:block w-px h-4 bg-white/12 mx-2"
            />

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-0.5">
              {navLinks.map((link, i) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-archivo font-medium text-white/55 hover:text-white transition-colors duration-150 z-10 cursor-pointer"
                >
                  {hovered === link.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                      transition={spring}
                    />
                  )}
                  {/* Icon: spins in when heroScrolled changes */}
                  <motion.span
                    key={`${link.id}-${heroScrolled}`}
                    initial={heroScrolled
                      ? { rotate: -270, scale: 0.2, opacity: 0 }
                      : false}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ ...spring, delay: i * 0.07 }}
                    whileHover={isCollapsed ? { scale: 1.3, rotate: -15 } : { scale: 1.1 }}
                    className="relative z-10 shrink-0 flex"
                  >
                    <link.Icon size={13} weight="duotone" />
                  </motion.span>
                  {/* Label: GPU-only fade+slide, no width animation */}
                  <motion.span
                    animate={isCollapsed
                      ? { opacity: 0, x: -4, scaleX: 0.5 }
                      : { opacity: 1, x: 0,  scaleX: 1   }}
                    transition={{ ...fadeEase, delay: isCollapsed ? 0 : i * 0.03 }}
                    style={{ transformOrigin: "left", display: "inline-block" }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              animate={isCollapsed ? { opacity: 0 } : { opacity: 1 }}
              transition={fadeEase}
              className="hidden sm:block w-px h-4 bg-white/12 mx-2"
            />

            {/* CTA — text fades out, icon shrinks to circle */}
            <AnimatePresence mode="popLayout" initial={false}>
              {!isCollapsed ? (
                <motion.a
                  key="cta-full"
                  href="#download"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={spring}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3d72b4]/80 border border-[#6090c8]/30 text-white text-xs font-archivo font-semibold cursor-pointer shadow-[0_2px_12px_rgba(61,114,180,0.35)]"
                >
                  <DeviceMobileIcon size={13} weight="duotone" />
                  Baixar App
                </motion.a>
              ) : (
                <motion.a
                  key="cta-icon"
                  href="#download"
                  initial={{ opacity: 0, scale: 0.3, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.3, rotate: -90 }}
                  whileHover={{ scale: 1.25, rotate: -12 }}
                  transition={spring}
                  className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-[#3d72b4]/50 border border-[#6090c8]/30 text-white cursor-pointer"
                >
                  <DeviceMobileIcon size={13} weight="duotone" />
                </motion.a>
              )}
            </AnimatePresence>

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.88 }}
              className="sm:hidden ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-white/8 border border-white/10 text-white/60 cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <XIcon size={14} weight="bold" />
                  </motion.span>
                ) : (
                  <motion.span key="list"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <ListIcon size={14} weight="bold" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── Mobile menu ─────────────────────────────── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={spring}
                className="sm:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-1 px-3 pt-1 pb-3 border-t border-white/8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => { scrollTo(e, link.href); setMobileOpen(false); }}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, ...spring }}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-archivo text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
                    >
                      <link.Icon size={16} weight="duotone" />
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#download"
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.17, ...spring }}
                    className="flex items-center justify-center gap-2 mt-1 px-4 py-2.5 rounded-2xl bg-[#3d72b4]/70 border border-[#6090c8]/25 text-white font-archivo font-semibold text-sm cursor-pointer"
                  >
                    <DeviceMobileIcon size={16} weight="duotone" />
                    Baixar App
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </LayoutGroup>
    </div>
  );
}
