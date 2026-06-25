"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CAPABILITY_FILTERS, PROJECTS, Project, ProjectCapability } from "@/lib/projects";
import ProjectLivePreview from "@/components/hub/ProjectLivePreview";

const TOTAL = PROJECTS.length;

function ComplexityBars({ project }: { project: Project }) {
  const entries = [
    ["UI", project.complexity.ui],
    ["Motion", project.complexity.motion],
    ["3D", project.complexity.threeD],
    ["Back", project.complexity.backend],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3">
      {entries.map(([label, value]) => (
        <div key={label}>
          <div className="mb-1 flex items-center justify-between font-[family-name:var(--font-geist-mono)] text-[9px] uppercase text-white/30">
            <span>{label}</span>
            <span>{value}/5</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${value * 20}%`, backgroundColor: project.accent }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActiveCasePanel({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div
      className={`overflow-y-auto border bg-black/35 p-5 backdrop-blur-xl ${className}`}
      style={{
        borderColor: project.accentBorder,
        boxShadow: `0 28px 90px ${project.accentGlow}`,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-white/28">
          Active Case
        </span>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: project.accent, boxShadow: `0 0 16px ${project.accent}` }}
        />
      </div>

      <div className="mb-8">
        <p
          className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.26em]"
          style={{ color: project.accent }}
        >
          {project.tag}
        </p>
        <h2 className="text-4xl font-black leading-none tracking-normal">{project.name}</h2>
        <p className="mt-4 text-sm leading-7 text-white/48">{project.objective}</p>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          Interaction
        </h3>
        <p className="text-sm leading-7 text-white/46">{project.interaction}</p>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border px-2.5 py-1.5 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.12em]"
              style={{
                borderColor: project.accentBorder,
                background: project.accentDim,
                color: "rgba(255,255,255,0.58)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-4 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          Complexity
        </h3>
        <ComplexityBars project={project} />
      </div>

      <Link
        href={project.slug}
        className="flex items-center justify-between border px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.18em] transition hover:bg-white"
        style={{
          borderColor: project.accent,
          background: project.accent,
          color: "#05070a",
        }}
      >
        Open selected project
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

export default function InteractiveHubGallery() {
  const [activeFilter, setActiveFilter] = useState<ProjectCapability | "All">("All");
  const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return PROJECTS;
    }

    return PROJECTS.filter((project) =>
      (project.capabilities as readonly ProjectCapability[]).includes(activeFilter)
    );
  }, [activeFilter]);

  const activeProject =
    PROJECTS.find((project) => project.slug === activeSlug) ?? filteredProjects[0] ?? PROJECTS[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080c12] text-white font-[family-name:var(--font-geist-sans)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(215,255,63,0.09),transparent_24%),linear-gradient(180deg,#080c12_0%,#05070a_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <header className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.25em] text-white/25">
            landing-page-hub
          </span>
        </div>
        <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-white/20">
          {TOTAL}&nbsp;project{TOTAL !== 1 ? "s" : ""}
        </span>
      </header>

      <section className="relative z-10 grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 lg:py-10 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0">
          <div className="mb-8 max-w-4xl">
            <p className="mb-5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.35em] text-white/24">
              Interactive Portfolio Gallery
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-normal sm:text-[76px] lg:text-[92px]">
              Project
              <br />
              <span className="text-white/20">Observatory</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/42 sm:text-[15px]">
              A technical gallery for production-grade landing pages, built to expose the craft behind
              each route before the Hub evolves into a full 3D navigation system.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {(["All", ...CAPABILITY_FILTERS] as const).map((filter) => {
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className="border px-3 py-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] transition"
                  style={{
                    borderColor: active ? activeProject.accent : "rgba(255,255,255,0.09)",
                    background: active ? activeProject.accentDim : "rgba(255,255,255,0.025)",
                    color: active ? activeProject.accent : "rgba(255,255,255,0.42)",
                    boxShadow: active ? `0 0 24px ${activeProject.accentGlow}` : "none",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="sticky top-3 z-20 mb-6 max-h-[62vh] lg:hidden">
            <ActiveCasePanel project={activeProject} className="max-h-[62vh]" />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {filteredProjects.map((project, index) => {
              const active = project.slug === activeProject.slug;

              return (
                <div key={project.slug} className="group flex min-w-0 flex-col gap-2">
                  <Link
                    href={project.slug}
                    onMouseEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                    className="relative flex min-h-[430px] flex-col justify-between overflow-hidden border p-5 transition duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
                    style={{
                      background: active ? project.accentDim : "rgba(255,255,255,0.025)",
                      borderColor: active ? project.accentBorder : "rgba(255,255,255,0.08)",
                      boxShadow: active ? `0 24px 80px ${project.accentGlow}` : "none",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${project.accentGlow} 0%, transparent 70%)`,
                      }}
                    />
                    <ProjectLivePreview project={project} active={active} />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: project.dot, boxShadow: `0 0 8px ${project.dot}` }}
                        />
                        <span
                          className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.3em]"
                          style={{ color: project.accent, opacity: 0.7 }}
                        >
                          {project.tag}
                        </span>
                      </div>
                      <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-white/14">
                        {String(index + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative z-10 mt-44">
                      <h2 className="mb-3 text-[34px] font-black leading-none tracking-normal text-white sm:text-[40px]">
                        {project.name}
                      </h2>
                      <p className="max-w-[34rem] text-[13px] leading-6 text-white/42">
                        {project.description}
                      </p>
                    </div>

                    <div className="relative z-10">
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {project.capabilities.slice(0, 4).map((capability) => (
                          <span
                            key={capability}
                            className="border border-white/[0.08] bg-black/20 px-2 py-1 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-white/36"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
                        <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-white/22">
                          {project.category}
                        </span>
                        <span
                          className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-3"
                          style={{ color: project.accent }}
                        >
                          Open
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>

                  {project.extras.length > 0 && (
                    <div className="flex gap-2">
                      {project.extras.map((extra) => (
                        <Link
                          key={extra.href}
                          href={extra.href}
                          className="flex flex-1 items-center justify-between border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 font-[family-name:var(--font-geist-mono)] text-[11px] text-white/32 transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white/60"
                        >
                          <span>{extra.label}</span>
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start">
          <ActiveCasePanel project={activeProject} className="max-h-[calc(100vh-3rem)]" />
        </aside>
      </section>

      <footer className="relative z-10 flex items-center justify-between border-t border-white/[0.06] px-5 py-5 sm:px-8">
        <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-white/15">
          LandingPagesHub · {new Date().getFullYear()}
        </span>
        <span className="hidden font-[family-name:var(--font-geist-mono)] text-[11px] text-white/12 sm:inline">
          Next.js · Tailwind CSS · Framer Motion · WebGL-ready metadata
        </span>
      </footer>
    </main>
  );
}
