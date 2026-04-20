import { Nunito, Archivo } from "next/font/google";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo-base",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function FitnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${nunito.variable} ${archivo.variable}`}>
      {/* ── Liquid Glass SVG filter ─────────────────────────────────────────────
          feTurbulence generates organic fractalNoise. The <animate> slowly morphs
          baseFrequency so the glass "breathes" like real liquid (~18s cycle).
          feDisplacementMap warps the backdrop-captured content using that noise.
          scale="40" → displacement amplitude in px. Tune up/down for drama.   */}
      <svg
        aria-hidden
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          {/* ── Original-style filter: static noise, aggressive scale=77 ── */}
          <filter id="orig-lg" x="-5%" y="-5%" width="110%" height="110%">
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

          {/* ── Densify filter: animated noise, refined scale=40 ── */}
          <filter id="densify-lg" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.006 0.008; 0.010 0.009; 0.007 0.011; 0.006 0.008"
                dur="18s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blur"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}
