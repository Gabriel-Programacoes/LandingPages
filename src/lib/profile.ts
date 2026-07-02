export type ProfileLink = {
  label: string;
  href: string;
  kind: "email" | "github" | "linkedin";
};

export type StackGroup = {
  label: string;
  items: string[];
};

export const PROFILE = {
  name: "Gabriel Henrique A. S. Barbosa",
  shortName: "Gabriel Henrique",
  title: "Full-Stack Developer",
  location: "Brazil",
  availability: ["Freelance", "Frontend roles", "Remote collaboration"],
  positioning:
    "Full-Stack Developer focused on premium frontend experiences, scalable web applications, and workflow automation.",
  hero: {
    eyebrow: "Portfolio / Full-Stack Developer",
    headline: "Gabriel Henrique",
    subheadline:
      "Full-Stack Developer building premium frontend experiences, scalable web apps, and workflow automation.",
    supporting:
      "TypeScript, Next.js, Node.js, Python, motion-rich interfaces, and production-minded UI systems.",
    primaryCta: "View selected work",
    secondaryCta: "Contact",
    tertiaryCta: "GitHub",
  },
  bio:
    "I am a Full-Stack Developer and Information Systems student driven by building scalable web applications and automating workflows. Specializing in the TypeScript ecosystem with Next.js and Node.js, plus Python for practical automation, I bridge complex business rules and seamless user experiences through clean, efficient code.",
  about:
    "I work across frontend, backend, and automation with a strong bias for interfaces that feel refined, useful, and production-ready. My projects combine visual direction, responsive UI, motion, validation flows, and technical systems that can support real business use.",
  specialties: [
    "Premium frontend interfaces",
    "Scalable web applications",
    "Workflow automation",
    "WebGL and motion experiments",
    "Business-rule translation into usable products",
  ],
  stack: [
    {
      label: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      label: "Backend",
      items: ["Node.js", "Server Actions", "Zod", "API workflows"],
    },
    {
      label: "Automation",
      items: ["Python", "Workflow optimization", "Operational scripts"],
    },
    {
      label: "Creative Tech",
      items: ["Three.js", "React Three Fiber", "WebGL", "Post-processing"],
    },
    {
      label: "Product",
      items: ["Forms", "Validation", "Conversion flows", "Responsive UI"],
    },
  ] satisfies StackGroup[],
  links: [
    {
      label: "Email",
      href: "mailto:bielg6055@gmail.com",
      kind: "email",
    },
    {
      label: "GitHub",
      href: "https://github.com/Gabriel-Programacoes",
      kind: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ghalvess/",
      kind: "linkedin",
    },
  ] satisfies ProfileLink[],
} as const;

export const CONTACT_EMAIL = "bielg6055@gmail.com";
