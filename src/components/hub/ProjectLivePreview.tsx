"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Project } from "@/lib/projects";

type ProjectLivePreviewProps = {
  project: Project;
  active: boolean;
};

const loop = {
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-x-4 top-16 h-32 overflow-hidden border border-white/[0.06] bg-black/30 shadow-[inset_0_0_28px_rgba(0,0,0,0.55)]">
      {children}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.36),transparent_18%,transparent_82%,rgba(0,0,0,0.36))]" />
    </div>
  );
}

function SpectralPreview({ project, active }: ProjectLivePreviewProps) {
  return (
    <PreviewShell>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.1),transparent)] opacity-30" />
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full border border-dashed"
          style={{
            width: 82 + index * 26,
            height: 82 + index * 26,
            marginLeft: -(41 + index * 13),
            marginTop: -(41 + index * 13),
            borderColor: index === 1 ? "rgba(255,255,255,0.42)" : project.accent,
            opacity: active ? 0.68 : 0.34,
          }}
          animate={{ rotate: index % 2 === 0 ? 360 : -360, scale: active ? [1, 1.06] : [1, 1.02] }}
          transition={{ duration: 10 + index * 2, ...loop }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 border"
        style={{
          borderColor: project.accent,
          background: `radial-gradient(circle, ${project.accentGlow}, rgba(0,0,0,0.04) 68%)`,
          boxShadow: `0 0 36px ${project.accentGlow}`,
        }}
        animate={{ rotate: [45, 135], scale: active ? [1, 1.16] : [0.96, 1.04] }}
        transition={{ duration: 3.8, ...loop }}
      />
      <motion.div
        className="absolute inset-y-0 w-16 bg-white/15 blur-xl"
        animate={{ x: [-110, 310], opacity: [0.08, 0.42] }}
        transition={{ duration: 6.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </PreviewShell>
  );
}

function GlassPreview({ project, active }: ProjectLivePreviewProps) {
  return (
    <PreviewShell>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 25%, rgba(106,171,240,0.7), transparent 30%), radial-gradient(circle at 82% 68%, rgba(255,255,255,0.3), transparent 34%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "18% 12%"] }}
        transition={{ duration: 5.5, ...loop }}
      />
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-md border border-white/25 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-sm"
          style={{
            left: 22 + index * 42,
            top: 22 + index * 14,
            width: 112 - index * 10,
            height: 54,
          }}
          animate={{
            x: active ? [0, 18 - index * 6] : [0, 8 - index * 3],
            y: [0, index % 2 === 0 ? -6 : 5],
          }}
          transition={{ duration: 3.4 + index * 0.3, ...loop }}
        />
      ))}
      <div className="absolute bottom-5 left-6 right-6 h-2 rounded-full bg-white/20">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: project.accent }}
          animate={{ width: active ? ["42%", "76%"] : ["34%", "58%"] }}
          transition={{ duration: 2.8, ...loop }}
        />
      </div>
    </PreviewShell>
  );
}

function CompliancePreview({ project, active }: ProjectLivePreviewProps) {
  return (
    <PreviewShell>
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="absolute left-5 right-5 h-px bg-white/12"
          style={{ top: 22 + index * 25 }}
          animate={{ opacity: active ? [0.2, 0.65] : [0.16, 0.34] }}
          transition={{ duration: 2.4, delay: index * 0.25, ...loop }}
        />
      ))}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.span
          key={index}
          className="absolute h-3 w-3 rounded-full border bg-[#080c12]"
          style={{
            left: `${14 + index * 18}%`,
            top: `${25 + (index % 2) * 34}%`,
            borderColor: project.accent,
            boxShadow: `0 0 16px ${project.accentGlow}`,
          }}
          animate={{ scale: active ? [1, 1.45] : [0.9, 1.18], opacity: [0.58, 1] }}
          transition={{ duration: 2.2, delay: index * 0.18, ...loop }}
        />
      ))}
      <motion.div
        className="absolute h-px"
        style={{ left: "16%", right: "16%", top: "50%", backgroundColor: project.accent, transformOrigin: "left" }}
        animate={{ scaleX: [0.2, 1], opacity: [0.2, 0.75] }}
        transition={{ duration: 3.2, ...loop }}
      />
    </PreviewShell>
  );
}

function BooksPreview({ project, active }: ProjectLivePreviewProps) {
  const heights = [44, 66, 84, 54, 92, 72, 48];

  return (
    <PreviewShell>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_48%)]" />
      <div className="absolute inset-x-5 bottom-5 flex items-end gap-2">
        {heights.map((height, index) => (
          <motion.span
            key={index}
            className="w-6 border border-white/10 bg-white/[0.05]"
            style={{
              height,
              background:
                index % 2 === 0
                  ? `linear-gradient(180deg, ${project.accentGlow}, rgba(255,255,255,0.04))`
                  : "rgba(255,255,255,0.08)",
            }}
            animate={{
              y: active ? [0, -10 - (index % 3) * 3] : [0, -5],
              rotate: index % 2 === 0 ? [0, -2] : [0, 2],
            }}
            transition={{ duration: 2.6 + index * 0.12, delay: index * 0.08, ...loop }}
          />
        ))}
      </div>
      <motion.div
        className="absolute left-4 right-4 top-5 h-px"
        style={{ backgroundColor: project.accent, transformOrigin: "left" }}
        animate={{ scaleX: [0.35, 1], opacity: [0.24, 0.8] }}
        transition={{ duration: 3.4, ...loop }}
      />
    </PreviewShell>
  );
}

function BlueprintPreview({ project, active }: ProjectLivePreviewProps) {
  return (
    <PreviewShell>
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:18px_18px]"
        animate={{ backgroundPosition: ["0px 0px", "18px 18px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {[0, 1].map((index) => (
        <motion.div
          key={index}
          className="absolute border"
          style={{
            left: 34 + index * 48,
            top: 26 + index * 15,
            width: 106 - index * 18,
            height: 58 - index * 8,
            borderColor: index === 0 ? project.accent : "rgba(255,255,255,0.26)",
            boxShadow: index === 0 ? `0 0 22px ${project.accentGlow}` : "none",
          }}
          animate={{ x: active ? [0, 14] : [0, 6], opacity: [0.55, 1] }}
          transition={{ duration: 3, delay: index * 0.3, ...loop }}
        />
      ))}
      <motion.div
        className="absolute bottom-5 right-6 h-px w-28"
        style={{ backgroundColor: project.accent, transformOrigin: "right" }}
        animate={{ x: [-22, 0], scaleX: [0.42, 1] }}
        transition={{ duration: 2.8, ...loop }}
      />
    </PreviewShell>
  );
}

function AtelierPreview({ project, active }: ProjectLivePreviewProps) {
  return (
    <PreviewShell>
      <motion.div
        className="absolute -left-8 top-8 h-20 w-44 rotate-[-12deg] bg-white/[0.055]"
        animate={{ x: active ? [0, 26] : [0, 12], opacity: [0.28, 0.72] }}
        transition={{ duration: 4.2, ...loop }}
      />
      <motion.div
        className="absolute right-7 top-5 h-24 w-24 border border-white/10"
        style={{ background: project.accentDim }}
        animate={{ y: [0, -8], rotate: [0, 2] }}
        transition={{ duration: 3.6, ...loop }}
      />
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute left-6 h-px"
          style={{
            top: 46 + index * 18,
            width: 120 - index * 18,
            backgroundColor: index === 0 ? project.accent : "rgba(255,255,255,0.22)",
          }}
          animate={{ scaleX: active ? [0.35, 1] : [0.45, 0.8], opacity: [0.24, 0.72] }}
          transition={{ duration: 2.8 + index * 0.4, delay: index * 0.18, ...loop }}
        />
      ))}
    </PreviewShell>
  );
}

export default function ProjectLivePreview({ project, active }: ProjectLivePreviewProps) {
  if (project.preview === "spectral") {
    return <SpectralPreview project={project} active={active} />;
  }

  if (project.preview === "glass") {
    return <GlassPreview project={project} active={active} />;
  }

  if (project.preview === "compliance") {
    return <CompliancePreview project={project} active={active} />;
  }

  if (project.preview === "books") {
    return <BooksPreview project={project} active={active} />;
  }

  if (project.preview === "blueprint") {
    return <BlueprintPreview project={project} active={active} />;
  }

  return <AtelierPreview project={project} active={active} />;
}
