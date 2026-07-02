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
      {/* ── Liquid Glass SVG filters ─────────────────────────────────────────── */}
      <svg
        aria-hidden
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="glass-distortion"
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.009"
              numOctaves="3"
              seed="17"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.006 0.009;0.007 0.006;0.004 0.010;0.008 0.007;0.006 0.009"
                dur="31s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feOffset in="noise" dx="0" dy="0" result="drift">
              <animate
                attributeName="dx"
                values="0;8;-5;3;0"
                dur="37s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="dy"
                values="0;-4;7;-6;0"
                dur="43s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feOffset>
            <feGaussianBlur in="drift" stdDeviation="1.15" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="14;18;12;17;14"
                dur="29s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>

          {/* ── Original-style filter: static noise, aggressive scale=77 ── */}
          <filter id="orig-lg" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="0.8" result="blur" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blur"
              scale="42"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* ── Densify filter: animated refraction, refined for UI surfaces ── */}
          <filter
            id="densify-lg"
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.009"
              numOctaves="3"
              seed="92"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.006 0.009;0.007 0.006;0.004 0.010;0.008 0.007;0.006 0.009"
                dur="31s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feOffset in="noise" dx="0" dy="0" result="drift">
              <animate
                attributeName="dx"
                values="0;8;-5;3;0"
                dur="37s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="dy"
                values="0;-4;7;-6;0"
                dur="43s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feOffset>
            <feGaussianBlur in="drift" stdDeviation="1.15" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="14;18;12;17;14"
                dur="29s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>

          {/* Small text controls need a quieter lens so glyphs stay crisp. */}
          <filter
            id="densify-control"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005 0.008"
              numOctaves="2"
              seed="41"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.005 0.008;0.006 0.006;0.004 0.009;0.005 0.008"
                dur="34s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feGaussianBlur in="noise" stdDeviation="1.4" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="4;6;3;5;4"
                dur="27s"
                calcMode="spline"
                keySplines=".42 0 .58 1;.37 0 .63 1;.42 0 .58 1;.37 0 .63 1"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}
