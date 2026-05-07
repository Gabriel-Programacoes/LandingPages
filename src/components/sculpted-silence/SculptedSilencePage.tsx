"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MiniHubMenu from "@/components/MiniHubMenu";

const luxuryEasing = [0.43, 0.13, 0.23, 0.96] as const;

const textReveal = {
  initial: { y: "120%" },
  animate: {
    y: 0,
    transition: { duration: 1.4, ease: luxuryEasing },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const looks = [
  {
    id: "A01",
    tone: "from-[#d7d2c5] to-[#b8b0a0]",
    image: "/sculpted-silence/Fashion_portrait_in_minimalist_concrete_202605071515.jpeg",
    caption: "Stone and silhouette, held in perfect balance.",
  },
  {
    id: "A02",
    tone: "from-[#c6c1b6] to-[#9f988a]",
    image: "/sculpted-silence/Editorial_scene_on_wide_staircase,_202605071517.jpeg",
    caption: "A staircase becomes a stage for restraint.",
  },
  {
    id: "A03",
    tone: "from-[#d8d1c4] to-[#a89f91]",
    image: "/sculpted-silence/Night_runway-inspired_street_shot,_model_202605071519.jpeg",
    caption: "Midnight rhythm, cut for movement.",
  },
  {
    id: "A04",
    tone: "from-[#d4cdc1] to-[#968f83]",
    image: "/sculpted-silence/Side-profile_motion_study,_model_turning_202605071521.jpeg",
    caption: "A turn of the head, and the room goes quiet.",
  },
];

const featureShots = [
  {
    image: "/sculpted-silence/Macro_couture_detail_shot,_hand-stitched_202605071505.jpeg",
    copy: "Every stitch carries intention.",
  },
  {
    image: "/sculpted-silence/Macro_textile_study,_black_satin_202605071506.jpeg",
    copy: "Satin shaped by light, not noise.",
  },
  {
    image: "/sculpted-silence/Macro_craftsmanship_portrait,_artisan_hands_202605071514.jpeg",
    copy: "Hands that build elegance in silence.",
  },
  {
    image: "/sculpted-silence/Beauty_+_detail_frame,_hands_202605071434.jpeg",
    copy: "Beauty is found in what we keep subtle.",
  },
];

const craftProofShots = [
  {
    image: "/sculpted-silence/Close_editorial_portrait,_sharp_cheekbone_202605071436.jpeg",
    note: "Light draws character, never excess.",
  },
  {
    image: "/sculpted-silence/Full-body_fashion_shot,_sculptural_black_202605071438.jpeg",
    note: "Structure with presence.",
  },
  {
    image: "/sculpted-silence/Model_in_ivory_wool_coat,_202605071435.jpeg",
    note: "Tonal layering with unmistakable calm.",
  },
  {
    image: "/sculpted-silence/Walking_shot_with_fluid_drape,_202605071432.jpeg",
    note: "A measured stride, a lasting impression.",
  },
];

const finalFrames = [
  "/sculpted-silence/Three-quarter_model_shot_in_tailored_202605071433.jpeg",
  "/sculpted-silence/Night_street_couture,_long_satin_202605071438.jpeg",
];

const houseCodes = [
  { title: "Cut", line: "Precision that follows movement before it follows trend." },
  { title: "Material", line: "Tactile surfaces tuned for light, shadow, and silence." },
  { title: "Silhouette", line: "Volume sculpted to feel deliberate from every angle." },
];

export default function SculptedSilencePage() {
  const [dragLimit, setDragLimit] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (!railRef.current) return;
      const max = railRef.current.scrollWidth - railRef.current.offsetWidth;
      setDragLimit(Math.max(max, 0));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main className="bg-[#F3F2EE] text-[#111111] min-h-screen overflow-x-hidden">
      <MiniHubMenu />

      <section className="relative min-h-screen flex items-center p-6 md:p-12">
        <motion.img
          src="/sculpted-silence/hero-opening.jpeg"
          alt="Cinematic opening frame"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1, filter: ["brightness(0.85)", "brightness(1)", "brightness(0.9)"] }}
          transition={{ duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(243,242,238,0.88)_55%,#F3F2EE_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[radial-gradient(circle_at_20%_20%,#111_0.7px,transparent_0.8px)] [background-size:4px_4px]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div className="md:col-span-3 pb-8 flex flex-col gap-12" variants={staggerContainer} initial="initial" animate="animate">
            <div className="overflow-hidden"><motion.p variants={textReveal} className="font-[family-name:var(--font-manrope-atelier)] text-[0.65rem] tracking-[0.2em] uppercase text-[#9A948C]">Season 04 / Vol. II</motion.p></div>
            <div className="overflow-hidden"><motion.p variants={textReveal} className="font-[family-name:var(--font-manrope-atelier)] text-[0.65rem] tracking-[0.2em] uppercase text-[#9A948C]">Paris, France</motion.p></div>
          </motion.div>

          <motion.div className="md:col-span-6 -mb-4 md:-mb-12 z-20" variants={staggerContainer} initial="initial" animate="animate">
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="font-[family-name:var(--font-bodoni-moda)] italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tight">
                Quiet
              </motion.h1>
            </div>
            <div className="overflow-hidden ml-12 md:ml-24">
              <motion.h1 variants={textReveal} className="font-[family-name:var(--font-bodoni-moda)] text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tight">
                Opulence.
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3 relative h-[60vh] md:h-[75vh] w-full mt-12 md:mt-0 overflow-hidden bg-[#E5E3DB]"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, ease: luxuryEasing, delay: 0.6 }}
          >
            <motion.img
              src="/sculpted-silence/hero_portrait.jpeg"
              alt="Hero editorial model portrait"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(17,17,17,0.22))]" />
          </motion.div>
        </div>
        <button
          type="button"
          onClick={() => setSoundOn((v) => !v)}
          className="absolute right-6 top-6 md:right-12 md:top-12 z-20 border border-[#9A948C]/50 px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase font-[family-name:var(--font-manrope-atelier)] text-[#4f4a43] hover:border-[#111111] hover:text-[#111111] transition-colors"
        >
          {soundOn ? "Sound On" : "Sound Off"}
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.7rem] tracking-[0.22em] uppercase text-[#9A948C] mb-8">House Codes</p>
        <div className="grid md:grid-cols-3 gap-8">
          {houseCodes.map((code, i) => (
            <motion.article
              key={code.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: luxuryEasing, delay: i * 0.08 }}
              className="border-t border-[#9A948C]/35 pt-4"
            >
              <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.65rem] tracking-[0.2em] uppercase text-[#9A948C]">{code.title}</p>
              <p className="mt-3 font-[family-name:var(--font-bodoni-moda)] text-xl leading-tight text-[#1d1c1a]">{code.line}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28 grid md:grid-cols-2 gap-12">
        <div className="hidden md:block" />
        <div className="space-y-24">
          <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.7rem] tracking-[0.22em] uppercase text-[#9A948C]">Atelier</p>
          {featureShots.map((feature, i) => (
            <motion.article
              key={feature.copy}
              initial={{ opacity: 0, y: 90 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: luxuryEasing, delay: i * 0.08 }}
              className="space-y-4"
            >
              <div className="h-[380px] w-full bg-[#dcd7cc] overflow-hidden">
                <img src={feature.image} alt={feature.copy} draggable={false} className="w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-manrope-atelier)] text-sm tracking-[0.05em] text-[#9A948C] uppercase">{feature.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.7rem] tracking-[0.22em] uppercase text-[#9A948C] mb-7">Nocturne / Collection Lookbook</p>
          <div ref={railRef} className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: -dragLimit, right: 0 }}
              className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {looks.map((look) => (
                <article key={look.id} className="w-[66vw] md:w-[44vw] lg:w-[34vw]">
                  <img src={look.image} alt={look.caption} draggable={false} className="h-[60vh] w-full object-cover" />
                  <p className="mt-4 font-[family-name:var(--font-manrope-atelier)] text-xs tracking-[0.12em] uppercase text-[#9A948C]">{look.id} / {look.caption}</p>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.7rem] tracking-[0.22em] uppercase text-[#9A948C] mb-8">Craft Proof</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftProofShots.map((shot, i) => (
            <motion.div
              key={shot.image}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: luxuryEasing, delay: i * 0.08 }}
              className="space-y-3"
            >
              <img src={shot.image} alt={shot.note} draggable={false} className="h-52 w-full object-cover" />
              <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.62rem] tracking-[0.18em] uppercase text-[#9A948C]">{shot.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <p className="font-[family-name:var(--font-manrope-atelier)] text-[0.7rem] tracking-[0.22em] uppercase text-[#9A948C] mb-6">Final Frames</p>
        <div className="grid md:grid-cols-2 gap-6">
          {finalFrames.map((image, i) => (
            <motion.img
              key={image}
              src={image}
              alt={`Final frame ${i + 1}`}
              draggable={false}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: luxuryEasing, delay: i * 0.08 }}
              className="h-[48vh] w-full object-cover"
            />
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-12 pb-16 pt-6">
        <div className="mb-12 border-t border-[#9A948C]/35 pt-8">
          <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#9A948C] font-[family-name:var(--font-manrope-atelier)] mb-3">Epilogue</p>
          <p className="font-[family-name:var(--font-bodoni-moda)] text-3xl md:text-5xl leading-[0.95] max-w-4xl">Enter the next chapter: private preview, house journal, and seasonal film release.</p>
        </div>
        <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-[#9A948C] font-[family-name:var(--font-manrope-atelier)] mb-6">Invitation</label>
        <input
          aria-label="Request Private Viewing"
          placeholder="Request Private Viewing."
          className="w-full bg-transparent border-0 border-b border-[#9A948C]/45 focus:border-[#111111] outline-none py-4 md:py-6 text-3xl md:text-6xl font-[family-name:var(--font-bodoni-moda)] italic placeholder:text-[#111111]"
        />
      </footer>
    </main>
  );
}
