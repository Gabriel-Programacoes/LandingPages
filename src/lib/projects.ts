export type ProjectCapability =
  | "3D"
  | "Motion"
  | "Forms"
  | "Server Actions"
  | "Editorial"
  | "WebGL"
  | "Glass UI"
  | "Compliance"
  | "Product UI";

export type ProjectPreview =
  | "atelier"
  | "blueprint"
  | "books"
  | "glass"
  | "compliance"
  | "spectral";

export type Project = {
  slug: string;
  category: string;
  name: string;
  description: string;
  accent: string;
  accentDim: string;
  accentBorder: string;
  accentGlow: string;
  tag: string;
  dot: string;
  extras: { label: string; href: string }[];
  technologies: string[];
  capabilities: ProjectCapability[];
  preview: ProjectPreview;
  objective: string;
  interaction: string;
  complexity: {
    ui: number;
    motion: number;
    threeD: number;
    backend: number;
  };
};

export const PROJECTS = [
  {
    slug: "/SculptedSilence",
    category: "Fashion / Editorial",
    name: "Sculpted Silence",
    description:
      "A digital atelier aesthetic with hushed opulence, architectural asymmetry, and slow editorial motion language.",
    accent: "#9a948c",
    accentDim: "rgba(154,148,140,0.10)",
    accentBorder: "rgba(154,148,140,0.30)",
    accentGlow: "rgba(154,148,140,0.22)",
    tag: "ATELIER",
    dot: "#9a948c",
    extras: [],
    technologies: ["Next.js", "Tailwind CSS", "Editorial Layout", "Motion"],
    capabilities: ["Editorial", "Motion"],
    preview: "atelier",
    objective:
      "Show refined composition, restrained motion, and fashion-grade art direction in a landing page format.",
    interaction:
      "Slow reveals, image-led sections, quiet hover states, and cinematic editorial pacing.",
    complexity: { ui: 5, motion: 3, threeD: 0, backend: 0 },
  },
  {
    slug: "/DraftedObsidian",
    category: "Engineering / Portfolio",
    name: "Drafted Obsidian",
    description:
      "Spatial brutalist portfolio with a reactive coordinate lattice, spec-sheet modules, and terminal-grade system storytelling.",
    accent: "#ff3b00",
    accentDim: "rgba(255,59,0,0.09)",
    accentBorder: "rgba(255,59,0,0.3)",
    accentGlow: "rgba(255,59,0,0.25)",
    tag: "SYSTEMS",
    dot: "#ff3b00",
    extras: [],
    technologies: ["Next.js", "Tailwind CSS", "Technical UI", "Motion"],
    capabilities: ["Motion", "Product UI"],
    preview: "blueprint",
    objective:
      "Frame engineering work as a precise system, with spec-sheet structure and brutalist visual rhythm.",
    interaction:
      "Coordinate-grid effects, active system panels, dense modules, and high-contrast scan states.",
    complexity: { ui: 5, motion: 4, threeD: 0, backend: 0 },
  },
  {
    slug: "/CinematicInkConcrete",
    category: "Bookstore / Editorial",
    name: "Cinematic Ink & Concrete",
    description:
      "An atmospheric bookstore landing page with brutalist editorial typography, mechanical drag spines, and archive-grade motion.",
    accent: "#d9531e",
    accentDim: "rgba(217,83,30,0.08)",
    accentBorder: "rgba(217,83,30,0.25)",
    accentGlow: "rgba(217,83,30,0.25)",
    tag: "BOOKSTORE",
    dot: "#d9531e",
    extras: [],
    technologies: ["Next.js", "Tailwind CSS", "Editorial UI", "Image Composition"],
    capabilities: ["Editorial", "Motion"],
    preview: "books",
    objective:
      "Build a tactile cultural storefront with heavy typography, concrete texture, and archival atmosphere.",
    interaction:
      "Book-spine motion, image crops, layered panels, and warm editorial transitions.",
    complexity: { ui: 5, motion: 4, threeD: 0, backend: 0 },
  },
  {
    slug: "/Densify",
    category: "Fitness & Nutrition",
    name: "Densify",
    description:
      "High-density workout and nutrition app. Hypertrophy results in 40-minute sessions even for impossible schedules.",
    accent: "#6aabf0",
    accentDim: "rgba(106,171,240,0.07)",
    accentBorder: "rgba(106,171,240,0.18)",
    accentGlow: "rgba(106,171,240,0.28)",
    tag: "FITNESS",
    dot: "#6aabf0",
    extras: [{ label: "Liquid Glass Comparison", href: "/comparison" }],
    technologies: ["Next.js", "Tailwind CSS", "Radix Slider", "Liquid Glass"],
    capabilities: ["Glass UI", "Product UI", "Motion"],
    preview: "glass",
    objective:
      "Present a compact fitness product with fast utility, polished controls, and a dense app-like interface.",
    interaction:
      "Calculator controls, liquid glass surfaces, comparison route, and product dashboard sections.",
    complexity: { ui: 5, motion: 3, threeD: 0, backend: 0 },
  },
  {
    slug: "/LegisFlow",
    category: "Legal Compliance",
    name: "LegisFlow",
    description:
      "Automated compliance monitoring for legal teams. Track regulatory changes, manage obligations, and stay audit-ready.",
    accent: "#4ade80",
    accentDim: "rgba(45,106,79,0.07)",
    accentBorder: "rgba(45,106,79,0.22)",
    accentGlow: "rgba(74,222,128,0.20)",
    tag: "COMPLIANCE",
    dot: "#4ade80",
    extras: [],
    technologies: ["Next.js", "Server Actions", "Zod", "Tailwind CSS"],
    capabilities: ["Forms", "Server Actions", "Compliance", "Product UI"],
    preview: "compliance",
    objective:
      "Demonstrate a credible B2B compliance workflow with validation, operational copy, and clear conversion flow.",
    interaction:
      "Lead form pipeline, server-side validation, obligation cards, and audit-ready product storytelling.",
    complexity: { ui: 4, motion: 2, threeD: 0, backend: 4 },
  },
  {
    slug: "/SpectralCore",
    category: "Interactive / 3D",
    name: "Spectral Core",
    description:
      "A WebGL landing page with a reactive neon core, orbital inspection controls, cinematic light, and post-processing bloom.",
    accent: "#d7ff3f",
    accentDim: "rgba(215,255,63,0.06)",
    accentBorder: "rgba(215,255,63,0.22)",
    accentGlow: "rgba(215,255,63,0.28)",
    tag: "WEBGL",
    dot: "#d7ff3f",
    extras: [],
    technologies: ["Three.js", "React Three Fiber", "Drei", "Postprocessing"],
    capabilities: ["3D", "WebGL", "Motion"],
    preview: "spectral",
    objective:
      "Prove the Hub can host immersive WebGL work with reactive materials, camera controls, and cinematic rendering.",
    interaction:
      "Hover shifts material, click charges the shell, OrbitControls inspect the object, and bloom finishes the scene.",
    complexity: { ui: 3, motion: 4, threeD: 5, backend: 0 },
  },
] satisfies Project[];

export const CAPABILITY_FILTERS: ProjectCapability[] = [
  "3D",
  "WebGL",
  "Motion",
  "Product UI",
  "Editorial",
  "Glass UI",
  "Forms",
  "Server Actions",
  "Compliance",
];
