"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CodeIcon,
  CpuIcon,
  EnvelopeSimpleIcon,
  GlobeHemisphereWestIcon,
  LightningIcon,
  MapPinIcon,
  MonitorIcon,
  RocketLaunchIcon,
  SparkleIcon,
  StackIcon,
  UserFocusIcon,
} from "@phosphor-icons/react";
import {
  SiFramer,
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { CAPABILITY_FILTERS, PROJECTS, Project, ProjectCapability } from "@/lib/projects";
import { CONTACT_EMAIL, PROFILE } from "@/lib/profile";
import ProjectLivePreview from "@/components/hub/ProjectLivePreview";

const TOTAL = PROJECTS.length;
const EMAIL_LINK = PROFILE.links.find((link) => link.kind === "email")?.href ?? "mailto:bielg6055@gmail.com";
const GMAIL_COMPOSE_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;
const GITHUB_LINK = PROFILE.links.find((link) => link.kind === "github")?.href ?? "https://github.com/Gabriel-Programacoes";
const LINKEDIN_LINK = PROFILE.links.find((link) => link.kind === "linkedin")?.href ?? "https://www.linkedin.com/in/ghalvess/";
const HERO_STATS = [
  ["Projects", String(TOTAL).padStart(2, "0")],
  ["Focus", "Frontend"],
  ["Mode", "Remote"],
] as const;
const proofSignals = [
  { label: "Premium UI", Icon: SparkleIcon },
  { label: "Full-stack flow", Icon: CodeIcon },
  { label: "Creative tech", Icon: CpuIcon },
] as const;

function StackBrandIcon({ item }: { item: string }) {
  const className = "size-4 text-white/46";

  if (item === "Next.js") return <SiNextdotjs aria-hidden className={className} />;
  if (item === "React") return <SiReact aria-hidden className={className} />;
  if (item === "TypeScript") return <SiTypescript aria-hidden className={className} />;
  if (item === "Tailwind CSS") return <SiTailwindcss aria-hidden className={className} />;
  if (item === "Framer Motion") return <SiFramer aria-hidden className={className} />;
  if (item === "Node.js") return <SiNodedotjs aria-hidden className={className} />;
  if (item === "Python") return <SiPython aria-hidden className={className} />;
  if (item === "Three.js") return <SiThreedotjs aria-hidden className={className} />;

  return <CodeIcon aria-hidden className={className} weight="duotone" />;
}

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
  const caseNotes = [
    ["Challenge", project.caseStudy.challenge],
    ["Design", project.caseStudy.design],
    ["Technical", project.caseStudy.technical],
  ] as const;

  return (
    <div
      className={`overflow-y-auto border bg-black/35 p-5 backdrop-blur-xl ${className}`}
      style={{
        borderColor: project.accentBorder,
        boxShadow: `0 28px 90px ${project.accentGlow}`,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-white/28">
          <BriefcaseIcon aria-hidden className="size-4" weight="duotone" />
          Selected Case
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
        <p className="mt-4 text-sm leading-7 text-white/48">{project.outcome}</p>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-3 inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          <UserFocusIcon aria-hidden className="size-4" weight="duotone" />
          Role
        </h3>
        <p className="text-sm leading-7 text-white/46">{project.role}</p>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-3 inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          <LightningIcon aria-hidden className="size-4" weight="duotone" />
          Strength
        </h3>
        <p className="text-sm font-semibold leading-7" style={{ color: project.accent }}>
          {project.strength}
        </p>
        <p className="mt-2 text-sm leading-7 text-white/42">{project.proof}</p>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-3 inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          <StackIcon aria-hidden className="size-4" weight="duotone" />
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
        <h3 className="mb-4 inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          <CodeIcon aria-hidden className="size-4" weight="duotone" />
          Case Notes
        </h3>
        <div className="grid gap-3">
          {caseNotes.map(([label, value]) => (
            <div key={label} className="border-l border-white/[0.08] pl-3">
              <p className="mb-1 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.18em] text-white/24">
                {label}
              </p>
              <p className="text-xs leading-5 text-white/42">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-7 border-t border-white/[0.08] pt-5">
        <h3 className="mb-4 inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30">
          <CpuIcon aria-hidden className="size-4" weight="duotone" />
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
        View selected work
        <ArrowRightIcon aria-hidden className="size-3.5" weight="bold" />
      </Link>
    </div>
  );
}

function FloatingActiveCase({ project }: { project: Project }) {
  const trackRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let currentY = 0;
    let targetY = 0;

    const measure = () => {
      const track = trackRef.current;
      const panel = panelRef.current;

      if (!track || !panel) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const panelHeight = panel.offsetHeight;
      const topOffset = 16;
      const sectionTop = window.scrollY + trackRect.top;
      const maxY = Math.max(0, track.offsetHeight - panelHeight);

      targetY = Math.min(Math.max(window.scrollY - sectionTop + topOffset, 0), maxY);
    };

    const animate = () => {
      frame = 0;

      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      currentY += (targetY - currentY) * 0.085;
      panel.style.transform = `translate3d(0, ${currentY}px, 0)`;

      if (Math.abs(targetY - currentY) > 0.25) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const requestUpdate = () => {
      measure();

      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(animate);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <aside ref={trackRef} className="relative hidden lg:block lg:self-stretch">
      <div ref={panelRef} className="will-change-transform">
        <ActiveCasePanel project={project} className="max-h-[calc(100svh-2rem)]" />
      </div>
    </aside>
  );
}

export default function InteractiveHubGallery() {
  const [activeFilter, setActiveFilter] = useState<ProjectCapability | "All">("All");
  const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug);
  const [emailCopied, setEmailCopied] = useState(false);

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080c12] text-white font-[family-name:var(--font-geist-sans)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(215,255,63,0.09),transparent_24%),linear-gradient(180deg,#080c12_0%,#05070a_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <header className="relative z-20 flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.25em] text-white/25">
            {PROFILE.shortName}
          </span>
        </div>
        <div className="flex items-center gap-4 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.16em]">
          <span className="hidden text-white/20 sm:inline">
            {TOTAL}&nbsp;selected&nbsp;work{TOTAL !== 1 ? "s" : ""}
          </span>
          <a href="#contact" className="inline-flex items-center gap-1.5 text-white/42 transition hover:text-white">
            <EnvelopeSimpleIcon aria-hidden className="size-3.5" weight="duotone" />
            Contact
          </a>
        </div>
      </header>

      <section className="relative z-10 px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="grid min-h-[calc(100svh-5.25rem)] gap-8 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
          <div className="max-w-6xl">
            <p className="mb-6 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.35em] text-white/28">
              {PROFILE.hero.eyebrow}
            </p>
            <h1 className="max-w-6xl text-[clamp(3.4rem,11vw,9.5rem)] font-black leading-[0.82] tracking-normal text-white">
              {PROFILE.hero.headline}
            </h1>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-8 text-white/72 sm:text-2xl sm:leading-9">
              {PROFILE.hero.subheadline}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/44 sm:text-[15px]">
              {PROFILE.hero.supporting}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 border border-white bg-white px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.18em] text-[#080c12] transition hover:bg-[#d7ff3f]"
              >
                {PROFILE.hero.primaryCta}
                <ArrowRightIcon aria-hidden className="size-3.5" weight="bold" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/[0.14] bg-white/[0.03] px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.18em] text-white/58 transition hover:border-white/40 hover:text-white"
              >
                <EnvelopeSimpleIcon aria-hidden className="size-3.5" weight="duotone" />
                {PROFILE.hero.secondaryCta}
              </a>
              <a
                href={GITHUB_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/[0.1] px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.18em] text-white/36 transition hover:border-white/30 hover:text-white"
              >
                <SiGithub aria-hidden className="size-3.5" />
                {PROFILE.hero.tertiaryCta}
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-3 border-y border-white/[0.08]">
              {HERO_STATS.map(([label, value], index) => {
                const Icon = index === 0 ? BriefcaseIcon : index === 1 ? MonitorIcon : GlobeHemisphereWestIcon;

                return (
                <div key={label} className="border-r border-white/[0.08] px-3 py-4 last:border-r-0 sm:px-5">
                  <div className="flex items-center gap-2">
                    <Icon aria-hidden className="size-4 text-white/34" weight="duotone" />
                    <p className="font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.18em] text-white/24">
                      {label}
                    </p>
                  </div>
                  <p className="mt-2 text-xl font-black leading-none text-white/78 sm:text-2xl">{value}</p>
                </div>
                );
              })}
            </div>
          </div>

          <div className="grid content-stretch border border-white/[0.08] bg-white/[0.02]">
            <div className="grid border-b border-white/[0.08] p-5">
              <div className="flex items-center gap-2">
                <UserFocusIcon aria-hidden className="size-4 text-white/34" weight="duotone" />
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.24em] text-white/24">
                  Profile Signal
                </p>
              </div>
              <p className="mt-4 text-2xl font-black leading-none text-white">{PROFILE.title}</p>
              <p className="mt-4 text-sm leading-7 text-white/46">{PROFILE.positioning}</p>
            </div>

            <div className="grid grid-cols-3 border-b border-white/[0.08]">
              {PROFILE.availability.map((item) => (
                <div key={item} className="border-r border-white/[0.08] p-4 last:border-r-0">
                  <RocketLaunchIcon aria-hidden className="mb-2 size-4 text-white/34" weight="duotone" />
                  <p className="mt-2 text-sm font-semibold leading-5 text-white/62">{item}</p>
                </div>
              ))}
            </div>

            <div className="grid content-between gap-6 p-5">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <StackIcon aria-hidden className="size-4 text-white/34" weight="duotone" />
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.24em] text-white/24">
                    Core Stack
                  </p>
                </div>
                <div className="grid gap-3">
                  {PROFILE.stack.slice(0, 4).map((group) => (
                    <div key={group.label} className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] pb-3 last:border-b-0">
                      <span className="font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-white/24">
                        {group.label}
                      </span>
                      <span className="text-xs leading-5 text-white/50">{group.items.slice(0, 3).join(" / ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <SparkleIcon aria-hidden className="size-4 text-white/34" weight="duotone" />
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.24em] text-white/24">
                    Priority Work
                  </p>
                </div>
                <div className="grid gap-2">
                  {PROJECTS.slice(0, 3).map((project, index) => (
                    <Link
                      key={project.slug}
                      href={project.slug}
                      className="flex items-center justify-between border border-white/[0.07] bg-black/20 px-3 py-2.5 transition hover:border-white/20"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-white/64">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: project.accent, boxShadow: `0 0 10px ${project.accent}` }}
                        />
                        {project.name}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-[10px]" style={{ color: project.accent }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        className="relative z-10 grid scroll-mt-6 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 lg:py-10 xl:grid-cols-[minmax(0,1fr)_420px]"
      >
        <div className="min-w-0">
          <div className="mb-8 grid gap-6 border-y border-white/[0.08] py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
            <p className="mb-5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.35em] text-white/24">
              Selected Work Observatory
            </p>
            <h2 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-normal sm:text-[76px] lg:text-[92px]">
              Selected
              <br />
              <span className="text-white/20">Work</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/42 sm:text-[15px]">
              A focused selection of frontend, full-stack, product UI, and creative technology work built to show visual range, business judgment, and production execution.
            </p>
            </div>
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              {proofSignals.map(({ label, Icon }) => (
                <div key={label} className="border border-white/[0.07] bg-white/[0.02] p-3">
                  <Icon aria-hidden className="mb-3 size-5 text-white/34" weight="duotone" />
                  <p className="text-sm font-semibold leading-5 text-white/62">{label}</p>
                </div>
              ))}
            </div>
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

          <div className="sticky top-3 z-30 mb-6 max-h-[calc(100svh-1.5rem)] lg:hidden">
            <ActiveCasePanel project={activeProject} className="max-h-[calc(100svh-1.5rem)]" />
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
                    className="relative flex min-h-[480px] flex-col justify-between overflow-hidden border p-5 transition duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
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

                    <div className="relative z-10 mt-48">
                      <h2 className="mb-3 text-[34px] font-black leading-none tracking-normal text-white sm:text-[40px]">
                        {project.name}
                      </h2>
                      <p className="max-w-[34rem] text-[13px] leading-6 text-white/42">
                        {project.proof}
                      </p>
                    </div>

                    <div className="relative z-10">
                      <div className="mb-5 grid gap-3 border-y border-white/[0.07] py-4 sm:grid-cols-[0.78fr_1fr]">
                        <div>
                          <p className="mb-1 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.18em] text-white/22">
                            <LightningIcon aria-hidden className="mr-1 inline size-3" weight="duotone" />
                            Strength
                          </p>
                          <p className="text-sm font-semibold leading-5" style={{ color: project.accent }}>
                            {project.strength}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.18em] text-white/22">
                            <UserFocusIcon aria-hidden className="mr-1 inline size-3" weight="duotone" />
                            Role
                          </p>
                          <p className="text-xs leading-5 text-white/42">{project.role}</p>
                        </div>
                      </div>

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
                          View work
                          <ArrowRightIcon aria-hidden className="size-3.5" weight="bold" />
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

        <FloatingActiveCase project={activeProject} />
      </section>

      <section
        id="about"
        className="relative z-10 border-t border-white/[0.06] px-5 py-14 sm:px-8 lg:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          <div className="grid content-between gap-8 border border-white/[0.08] bg-white/[0.02] p-5">
            <div>
            <p className="mb-5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.35em] text-white/24">
              About / Stack
            </p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.92] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Interface craft,
              <br />
              <span className="text-white/20">systems logic.</span>
            </h2>
            </div>

            <div className="grid gap-3">
              <div className="border-t border-white/[0.08] pt-4">
                <p className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-white/24">
                  <MapPinIcon aria-hidden className="size-4" weight="duotone" />
                  Based in
                </p>
                <p className="mt-2 text-lg font-black text-white/76">{PROFILE.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={GITHUB_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/[0.08] px-3 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-white/42 transition hover:border-white/30 hover:text-white"
                >
                  <SiGithub aria-hidden className="size-4" />
                  GitHub
                </a>
                <a
                  href={LINKEDIN_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/[0.08] px-3 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-white/42 transition hover:border-white/30 hover:text-white"
                >
                  <GlobeHemisphereWestIcon aria-hidden className="size-4" weight="duotone" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="border-y border-white/[0.08] py-6">
              <p className="max-w-4xl text-xl font-semibold leading-9 text-white/74 sm:text-2xl sm:leading-10">
                {PROFILE.about}
              </p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/42 sm:text-[15px]">
                {PROFILE.bio}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PROFILE.specialties.map((specialty, index) => (
                <div
                  key={specialty}
                  className="flex min-h-20 items-end justify-between border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <SparkleIcon aria-hidden className="mr-3 size-5 shrink-0 self-start text-white/28" weight="duotone" />
                  <span className="max-w-[13rem] text-sm font-semibold leading-5 text-white/68">
                    {specialty}
                  </span>
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white/18">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-0 border-t border-white/[0.08]">
              {PROFILE.stack.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 border-b border-white/[0.08] py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-start"
                >
                  <h3 className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-white/28">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 border border-white/[0.08] bg-black/20 px-2.5 py-1.5 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.12em] text-white/42"
                      >
                        <StackBrandIcon item={item} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 scroll-mt-6 border-t border-white/[0.06] px-5 py-14 sm:px-8 lg:py-18"
      >
        <div className="grid gap-6 border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.35em] text-white/24">
              <EnvelopeSimpleIcon aria-hidden className="size-4" weight="duotone" />
              Contact
            </p>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Available for
              <br />
              <span className="text-white/20">frontend work.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/44 sm:text-[15px]">
              Freelance projects, frontend roles, premium landing pages, product interfaces, and full-stack workflows.
            </p>
          </div>

          <div className="grid gap-2">
            <a
              href={EMAIL_LINK}
              className="flex items-center justify-between border border-white bg-white px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.16em] text-[#080c12] transition hover:bg-[#d7ff3f]"
            >
              <span className="inline-flex items-center gap-2">
                <EnvelopeSimpleIcon aria-hidden className="size-4" weight="bold" />
                Email
              </span>
              <span className="hidden text-[9px] tracking-[0.1em] sm:inline">{CONTACT_EMAIL}</span>
            </a>

            <a
              href={GMAIL_COMPOSE_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border border-white/[0.1] bg-black/20 px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.16em] text-white/48 transition hover:border-white/30 hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <GlobeHemisphereWestIcon aria-hidden className="size-4" weight="duotone" />
                Gmail compose
              </span>
              <ArrowRightIcon aria-hidden className="size-3.5" weight="bold" />
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center justify-between border border-white/[0.1] bg-black/20 px-4 py-3 text-left font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.16em] text-white/48 transition hover:border-white/30 hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <CodeIcon aria-hidden className="size-4" weight="duotone" />
                {emailCopied ? "Copied" : "Copy email"}
              </span>
              <span className="hidden text-[9px] tracking-[0.1em] sm:inline">{CONTACT_EMAIL}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={GITHUB_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between border border-white/[0.1] bg-black/20 px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.16em] text-white/42 transition hover:border-white/30 hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <SiGithub aria-hidden className="size-4" />
                  GitHub
                </span>
                <ArrowRightIcon aria-hidden className="size-3.5" weight="bold" />
              </a>
              <a
                href={LINKEDIN_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between border border-white/[0.1] bg-black/20 px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.16em] text-white/42 transition hover:border-white/30 hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <GlobeHemisphereWestIcon aria-hidden className="size-4" weight="duotone" />
                  LinkedIn
                </span>
                <ArrowRightIcon aria-hidden className="size-3.5" weight="bold" />
              </a>
            </div>
          </div>
        </div>
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
