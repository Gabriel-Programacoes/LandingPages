"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

interface DockIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

export function GlassEffect({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}: GlassEffectProps) {
  const glassStyle: React.CSSProperties = {
    boxShadow:
      "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex overflow-hidden font-semibold text-black transition-all duration-700 ${href ? "cursor-pointer" : ""} ${className}`}
      style={glassStyle}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      />
      <div
        className="absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

export function GlassDock({ icons, href }: { icons: DockIcon[]; href?: string }) {
  return (
    <GlassEffect href={href} className="rounded-3xl p-3 hover:p-4">
      <div className="flex items-center justify-center gap-2 overflow-hidden rounded-3xl px-0.5">
        {icons.map((icon) => (
          <img
            key={icon.alt}
            src={icon.src}
            alt={icon.alt}
            className="size-16 cursor-pointer transition-all duration-700 hover:scale-110"
            style={{
              transformOrigin: "center center",
              transitionTimingFunction:
                "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
            }}
            onClick={icon.onClick}
          />
        ))}
      </div>
    </GlassEffect>
  );
}

export function GlassButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <GlassEffect
      href={href}
      className="overflow-hidden rounded-3xl px-10 py-6 hover:px-11 hover:py-7"
    >
      <div
        className="transition-all duration-700 hover:scale-95"
        style={{
          transitionTimingFunction:
            "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        }}
      >
        {children}
      </div>
    </GlassEffect>
  );
}

export function GlassFilter() {
  return (
    <svg aria-hidden focusable="false" style={{ display: "none" }}>
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
    </svg>
  );
}

export function Component() {
  const dockIcons: DockIcon[] = [
    {
      src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=160&auto=format&fit=crop",
      alt: "Chat",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=160&auto=format&fit=crop",
      alt: "Finder",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=160&auto=format&fit=crop",
      alt: "Dashboard",
    },
    {
      src: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=160&auto=format&fit=crop",
      alt: "Maps",
    },
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=160&auto=format&fit=crop",
      alt: "Browser",
    },
  ];

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden font-light"
      style={{
        background:
          'url("https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=1480&auto=format&fit=crop") center center / cover',
        animation: "moveBackground 60s linear infinite",
      }}
    >
      <GlassFilter />
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <GlassDock icons={dockIcons} />
        <GlassButton>
          <div className="text-xl text-white">
            <p>How can I help you today?</p>
          </div>
        </GlassButton>
      </div>
    </div>
  );
}
