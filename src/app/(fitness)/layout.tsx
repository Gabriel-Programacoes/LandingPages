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
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.001 0.005"
              numOctaves="1"
              seed="17"
              result="turbulence"
            />
            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
              <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
              <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
            </feComponentTransfer>
            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
            <feSpecularLighting
              in="softMap"
              surfaceScale="5"
              specularConstant="1"
              specularExponent="100"
              lightingColor="white"
              result="specLight"
            >
              <fePointLight x="-200" y="-200" z="300" />
            </feSpecularLighting>
            <feComposite
              in="specLight"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litImage"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

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
