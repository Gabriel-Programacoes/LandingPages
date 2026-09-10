export type Locale = "en" | "pt-BR";

export type ProfileLink = {
  label: string;
  href: string;
  kind: "email" | "github" | "linkedin";
};

export type StackGroup = {
  label: string;
  items: string[];
};

export type ProfileData = {
  name: string;
  shortName: string;
  title: string;
  location: string;
  availability: string[];
  positioning: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
  };
  bio: string;
  about: string;
  specialties: string[];
  stack: StackGroup[];
  links: ProfileLink[];
};

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

export type ProjectData = {
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
  role: string;
  proof: string;
  strength: string;
  outcome: string;
  caseStudy: {
    challenge: string;
    design: string;
    technical: string;
    proves: string;
  };
  complexity: {
    ui: number;
    motion: number;
    threeD: number;
    backend: number;
  };
};

export type Dictionary = {
  common: {
    worksCount: (count: number) => string;
    contact: string;
    close: string;
    language: string;
  };
  hero: {
    stats: {
      projects: string;
      focus: string;
      focusVal: string;
      mode: string;
      modeVal: string;
    };
  };
  profileSignal: {
    label: string;
    coreStack: string;
    priorityWork: string;
  };
  observatory: {
    eyebrow: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
    proofSignals: {
      premiumUi: string;
      fullstack: string;
      creativeTech: string;
    };
    allFilter: string;
    capabilityLabels: Record<ProjectCapability, string>;
    card: {
      strength: string;
      role: string;
      viewWork: string;
    };
    casePanel: {
      selectedCase: string;
      role: string;
      strength: string;
      stack: string;
      caseNotes: string;
      challenge: string;
      design: string;
      technical: string;
      complexity: string;
      complexityLabels: {
        ui: string;
        motion: string;
        threeD: string;
        backend: string;
      };
      viewSelectedWork: string;
    };
  };
  about: {
    eyebrow: string;
    titleFirst: string;
    titleSecond: string;
    basedIn: string;
  };
  contact: {
    eyebrow: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
    emailLabel: string;
    gmailCompose: string;
    copyEmail: string;
    copied: string;
  };
  footer: {
    builtWith: string;
  };
};
