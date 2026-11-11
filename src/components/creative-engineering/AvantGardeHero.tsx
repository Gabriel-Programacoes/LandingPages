"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import MiniHubMenu from "@/components/MiniHubMenu";

// Register GSAP plugins in browser runtime
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================================
   1. GLSL SHADER: DISPLACED MONOCHROMATIC TERRAIN / NOISE FABRIC
   ========================================================================= */

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uVelocity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElevation;

  // Simplex 3D Noise implementation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;

    vec3 pos = position;
    // Dynamic organic wave calculation influenced by cursor and time
    float noise1 = snoise(vec3(pos.xy * 0.75 + uMouse * 0.35, uTime * 0.18));
    float mouseDistance = length(uv - (uMouse * 0.5 + 0.5));
    float mouseWave = smoothstep(0.7, 0.0, mouseDistance) * 0.6;
    
    // Height displacement
    float elevation = (noise1 * 0.45 + mouseWave) * (1.0 + clamp(abs(uVelocity) * 0.06, 0.0, 1.2));
    pos.z += elevation * 0.9;
    
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElevation;

  void main() {
    // Exact palette mapping: Brutal Charcoal (#141210) & Raw Bone Paper (#ece8df)
    vec3 darkInk = vec3(0.078, 0.071, 0.063);
    vec3 bonePaper = vec3(0.925, 0.910, 0.875);
    vec3 vermilion = vec3(1.0, 0.290, 0.110); // #ff4a1c (Signal Accent)

    // Topographic isoline generation
    float topo = sin(vElevation * 32.0 + uTime * 0.4);
    topo = smoothstep(0.82, 0.88, topo);

    // Fresnel rim grazing calculation
    float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);

    // Depth blending
    vec3 color = mix(darkInk, bonePaper * 0.28, vElevation * 0.5 + 0.5);
    color = mix(color, vermilion, topo * 0.75);
    color += fresnel * bonePaper * 0.4;

    gl_FragColor = vec4(color, 0.95);
  }
`;

function DistortedMesh({
  mouse,
  velocity,
}: {
  mouse: React.MutableRefObject<[number, number]>;
  velocity: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    
    // Dampen mouse coords into uniform for fluid lag
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.current[0], 0.05);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.current[1], 0.05);
    materialRef.current.uniforms.uMouse.value.copy(smoothMouse.current);
    
    // Smooth scroll velocity damping
    materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uVelocity.value,
      velocity.current,
      0.08
    );
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4.2, 0, Math.PI / 7]}>
      <planeGeometry args={[7.5, 6, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* =========================================================================
   2. MAIN COMPONENT: AVANT-GARDE BRUTALIST HERO & TRANSITION
   ========================================================================= */

export default function AvantGardeHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const kineticPinRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLParagraphElement>(null);
  const chaoticSerifRef = useRef<HTMLHeadingElement>(null);
  const chaoticGroteskRef = useRef<HTMLHeadingElement>(null);
  const projectGridRef = useRef<HTMLDivElement>(null);

  // Cursor state refs (zero React re-render lag)
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorHaloRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef<[number, number]>([0, 0]);
  const mouseNormCoords = useRef<[number, number]>([0, 0]);
  const scrollVelocity = useRef<number>(0);

  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  // KINETIC TEXT SOURCE: Speaks in first-person narrator voice (drawn constraint)
  const kineticText =
    "I craft brutalist digital machines where computational mathematics, uncompromised typography, and raw physics obliterate standard interface templates.";
  const words = useMemo(() => kineticText.split(" "), [kineticText]);

  /* -----------------------------------------------------------------------
     A. LENIS SMOOTH SCROLL & GSAP TICKER INTEGRATION
     ----------------------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", (e: { velocity: number }) => {
      scrollVelocity.current = e.velocity;
      ScrollTrigger.update();
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* -----------------------------------------------------------------------
     B. ELASTIC CURSOR WITH MIX-BLEND-MODE DIFFERENCE & VELOCITY SKEW
     ----------------------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let haloX = targetX;
    let haloY = targetY;
    let prevX = targetX;
    let prevY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      mouseCoords.current = [targetX, targetY];
      
      // Normalized coordinates (-1 to 1) for 3D Shader
      mouseNormCoords.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId: number;
    const renderCursorLoop = () => {
      // Elastic spring interpolation for trailing halo
      haloX += (targetX - haloX) * 0.16;
      haloY += (targetY - haloY) * 0.16;

      const deltaX = targetX - prevX;
      const deltaY = targetY - prevY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      prevX = targetX;
      prevY = targetY;

      if (cursorHaloRef.current) {
        // Dynamic squish & directional elongation along velocity vector
        const stretch = Math.min(speed * 0.035, 1.4);
        const scaleX = 1 + stretch;
        const scaleY = 1 / (1 + stretch * 0.7);

        cursorHaloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
      }

      rafId = requestAnimationFrame(renderCursorLoop);
    };

    rafId = requestAnimationFrame(renderCursorLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* -----------------------------------------------------------------------
     C. GSAP SCROLLTRIGGER CHOREOGRAPHY: CHAOS TO ARCHITECTURAL ALIGNMENT
     ----------------------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined" || !kineticPinRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Kinetic Word Reveal Scrubbed on Scroll
      const wordSpans = wordsContainerRef.current?.querySelectorAll(".kinetic-word");
      if (wordSpans && wordSpans.length > 0) {
        gsap.fromTo(
          wordSpans,
          {
            opacity: 0.12,
            y: 40,
            skewX: -12,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            filter: "blur(0px)",
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: kineticPinRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1.1,
            },
          }
        );
      }

      // 2. Chaotic Layer Alignment: Elements snap into grid order
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });

      // Collapse chaotic offset angles and divergent coordinates into monolithic lockup
      tl.to(
        chaoticSerifRef.current,
        {
          x: "0vw",
          y: "0vh",
          rotation: 0,
          letterSpacing: "-0.04em",
          ease: "expo.out",
        },
        0
      )
        .to(
          chaoticGroteskRef.current,
          {
            x: "0vw",
            y: "0vh",
            rotation: 0,
            scaleY: 1,
            letterSpacing: "-0.02em",
            ease: "expo.out",
          },
          0
        )
        .to(
          ".hero-meta-marker",
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.3
        );

      // 3. Project transition entry with non-standard asymmetric offsets
      if (projectGridRef.current) {
        gsap.from(projectGridRef.current.children, {
          y: 120,
          opacity: 0,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: projectGridRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 1,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <div
      ref={rootRef}
      className="relative w-full min-h-screen bg-[#ece8df] text-[#141210] selection:bg-[#ff4a1c] selection:text-[#ece8df] overflow-x-hidden font-mono"
    >
      <MiniHubMenu />
      {/* ===================================================================
          CUSTOM ELASTIC CURSOR (mix-blend-mode difference + physics)
          =================================================================== */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -ml-[3px] -mt-[3px] z-[999] w-[6px] h-[6px] rounded-none bg-[#ff4a1c] mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorHaloRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -ml-6 -mt-6 z-[998] rounded-none border border-[#141210] mix-blend-difference transition-size duration-200 ease-out hidden md:flex items-center justify-center ${
          hoveredTarget ? "w-28 h-28 bg-[#ece8df]" : "w-12 h-12 bg-transparent"
        }`}
      >
        {hoveredTarget && (
          <span className="text-[9px] tracking-widest text-[#141210] uppercase font-bold font-mono">
            {hoveredTarget}
          </span>
        )}
      </div>

      {/* ===================================================================
          BACKGROUND 3D CANVAS (React Three Fiber + Displaced Noise Mesh)
          =================================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-45 mix-blend-multiply">
        <Canvas
          dpr={[1, 1.8]}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <DistortedMesh mouse={mouseNormCoords} velocity={scrollVelocity} />
        </Canvas>
      </div>

      {/* ===================================================================
          BRUTALIST ARCHITECTURAL FRAMEWORK & TELEMETRY
          =================================================================== */}
      <header className="fixed top-0 left-0 w-full z-40 border-b border-[#141210]/15 px-6 py-4 flex justify-between items-center bg-[#ece8df]/85 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#ff4a1c] animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold">
            GABRIEL HENRIQUE // CORE.04
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-wider text-[#5c574e]">
          <span>INDEX: 23°33'S / 46°38'W</span>
          <span>STATUS: HEAVY MOTION READY</span>
          <span>ENGINE: LENIS + R3F + GSAP</span>
        </div>
        <button
          onMouseEnter={() => setHoveredTarget("EXECUTE")}
          onMouseLeave={() => setHoveredTarget(null)}
          className="border border-[#141210] px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-[#141210] hover:text-[#ece8df] transition-colors"
        >
          [ CONTACT_GRID ]
        </button>
      </header>

      {/* ===================================================================
          1. HERO SECTION: INTENTIONALLY BROKEN OVERLAPPING TYPOGRAPHY
          =================================================================== */}
      <section
        ref={heroSectionRef}
        className="relative z-10 w-full h-screen flex flex-col justify-center px-6 md:px-16 pt-20"
      >
        {/* Asymmetric Technical Grid Lines */}
        <div className="absolute inset-x-6 top-1/4 h-[1px] bg-[#141210]/10 pointer-events-none" />
        <div className="absolute left-[38vw] inset-y-0 w-[1px] bg-[#141210]/10 pointer-events-none" />

        {/* Hero Masthead Colliding Centuries */}
        <div className="relative w-full max-w-[120vw] select-none">
          {/* Classical Renaissance Serif (Floating with negative rotation & offset) */}
          <h1
            ref={chaoticSerifRef}
            style={{
              fontFamily: "var(--font-serif, 'Times New Roman', serif)",
              transform: "translate3d(-4vw, -2vh, 0) rotate(-2.8deg)",
            }}
            className="text-[12vw] md:text-[14.5vw] italic font-normal leading-[0.78] tracking-[-0.05em] text-[#141210] whitespace-nowrap will-change-transform"
          >
            Monumental
          </h1>

          {/* Industrial Grotesque Sans (Hard colliding overlap) */}
          <h2
            ref={chaoticGroteskRef}
            style={{
              fontFamily: "var(--font-space-grotesk, 'Arial Black', sans-serif)",
              transform: "translate3d(14vw, -4vh, 0) rotate(1.4deg) scaleY(1.1)",
            }}
            className="text-[11vw] md:text-[13vw] font-black uppercase leading-[0.80] tracking-[-0.04em] text-[#ff4a1c] whitespace-nowrap will-change-transform mix-blend-darken"
          >
            Synthesis.
          </h2>
        </div>

        {/* Floating Peripheral Coordinates and Metadata */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-[#141210]/20 pt-6">
          <div className="hero-meta-marker opacity-0 translate-y-4 max-w-sm text-xs leading-relaxed text-[#5c574e]">
            [01.MANIFESTO]
            <br />
            Rejecting the frictionless vanilla web. Every layout is calibrated under
            deliberate shear strain, physical friction, and typographic violence.
          </div>

          <div className="hero-meta-marker opacity-0 translate-y-4 mt-6 md:mt-0 flex items-center gap-6 text-xs uppercase tracking-widest">
            <span className="text-[#ff4a1c]">[001] EXPERIMENTAL</span>
            <span>[002] SHADER WEAPONRY</span>
            <span>[003] ZERO COMPROMISE</span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. KINETIC WORD-BY-WORD SCROLL-DRIVEN REVEAL
          =================================================================== */}
      <section
        ref={kineticPinRef}
        className="relative z-10 w-full min-h-[90vh] flex items-center px-6 md:px-20 py-32 bg-[#141210] text-[#ece8df]"
      >
        <div className="max-w-6xl mx-auto">
          <span className="text-[#ff4a1c] text-xs uppercase tracking-[0.25em] block mb-8 font-bold">
            // PHILOSOPHY_STREAM
          </span>
          <p
            ref={wordsContainerRef}
            className="text-3xl md:text-6xl font-light leading-[1.12] tracking-tight flex flex-wrap gap-x-4 gap-y-3"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="kinetic-word inline-block will-change-transform font-serif italic text-[#ece8df]"
                style={{
                  fontFamily: i % 3 === 0 ? "var(--font-serif, serif)" : "var(--font-space-grotesk, sans-serif)",
                  fontStyle: i % 3 === 0 ? "italic" : "normal",
                  fontWeight: i % 3 === 0 ? 300 : 700,
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ===================================================================
          3. ASYMMETRIC PROJECT LEDGER (Broken overlapping editorial cards)
          =================================================================== */}
      <section className="relative z-10 w-full px-6 md:px-16 py-32">
        <div className="flex justify-between items-end border-b border-[#141210] pb-6 mb-20">
          <h3 className="text-4xl md:text-7xl uppercase font-black tracking-tighter">
            Selected Artefacts
          </h3>
          <span className="text-xs tracking-widest text-[#5c574e]">
            [ 01 // 03 ARCHIVE ]
          </span>
        </div>

        {/* Intentionally fractured staggered grid (non-symmetrical) */}
        <div ref={projectGridRef} className="relative flex flex-col gap-32">
          {/* Project 1: Wide left offset */}
          <article
            onMouseEnter={() => setHoveredTarget("VIEW // 01")}
            onMouseLeave={() => setHoveredTarget(null)}
            className="w-full md:w-[65%] self-start border-l-2 border-[#141210] pl-6 md:pl-10 group cursor-none"
          >
            <div className="text-xs uppercase tracking-widest text-[#ff4a1c] mb-2 font-bold">
              [SYSTEM_01] // WEBGL VOLUMETRIC ENGINE
            </div>
            <h4 className="text-4xl md:text-6xl uppercase font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-300">
              Spectral Core
            </h4>
            <p className="mt-4 text-sm text-[#5c574e] max-w-md leading-relaxed">
              Autonomous particle dispersion lattice compiled in Three.js and custom GLSL compute shaders.
            </p>
            <div className="mt-6 flex gap-4 text-xs font-bold uppercase">
              <span className="border border-[#141210] px-3 py-1">[TSL]</span>
              <span className="border border-[#141210] px-3 py-1">[THREE.JS]</span>
              <span className="border border-[#141210] px-3 py-1">[POSTPROCESSING]</span>
            </div>
          </article>

          {/* Project 2: Compressed right offset overlapping vertical baseline */}
          <article
            onMouseEnter={() => setHoveredTarget("VIEW // 02")}
            onMouseLeave={() => setHoveredTarget(null)}
            className="w-full md:w-[50%] self-end border-r-2 border-[#ff4a1c] pr-6 md:pr-10 text-right group cursor-none -mt-16 md:-mt-24"
          >
            <div className="text-xs uppercase tracking-widest text-[#5c574e] mb-2 font-bold">
              [SYSTEM_02] // BRUTALIST RUNWAY DIRECTORY
            </div>
            <h4
              style={{ fontFamily: "var(--font-serif, serif)" }}
              className="text-4xl md:text-6xl italic font-normal tracking-tight group-hover:-translate-x-4 transition-transform duration-300"
            >
              Sculpted Silence
            </h4>
            <p className="mt-4 text-sm text-[#5c574e] max-w-sm ml-auto leading-relaxed">
              Quiet editorial haute-couture platform built on asymmetric kinetic pacing and sub-millimeter layout discipline.
            </p>
            <div className="mt-6 flex justify-end gap-4 text-xs font-bold uppercase">
              <span className="border border-[#141210] px-3 py-1">[EDITORIAL]</span>
              <span className="border border-[#141210] px-3 py-1">[LENIS]</span>
              <span className="border border-[#141210] px-3 py-1">[GSAP SCROLL]</span>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================================
          FOOTER MONOLITH
          =================================================================== */}
      <footer className="relative z-10 w-full border-t border-[#141210] px-6 md:px-16 py-16 flex flex-col md:flex-row justify-between items-center bg-[#141210] text-[#ece8df]">
        <div className="text-xs tracking-widest uppercase">
          © 2026 GABRIEL HENRIQUE — AVANT-GARDE ARCHITECTURE
        </div>
        <div className="text-xs tracking-widest uppercase text-[#ff4a1c] mt-4 md:mt-0 font-bold">
          TERMINAL READY // TRANSMISSION CLOSED
        </div>
      </footer>
    </div>
  );
}
