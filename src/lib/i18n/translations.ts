import { Dictionary, Locale, ProfileData, ProjectCapability, ProjectData } from "./types";
import { CONTACT_EMAIL } from "@/lib/profile";

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

export const DICTIONARIES: Record<Locale, Dictionary> = {
  en: {
    common: {
      worksCount: (count: number) => `${count} selected work${count !== 1 ? "s" : ""}`,
      contact: "Contact",
      close: "Close",
      language: "Language",
    },
    hero: {
      stats: {
        projects: "Projects",
        focus: "Focus",
        focusVal: "Frontend",
        mode: "Mode",
        modeVal: "Remote",
      },
    },
    profileSignal: {
      label: "Profile Signal",
      coreStack: "Core Stack",
      priorityWork: "Priority Work",
    },
    observatory: {
      eyebrow: "Selected Work Observatory",
      titleFirst: "Selected",
      titleSecond: "Work",
      description:
        "A focused selection of frontend, full-stack, product UI, and creative technology work built to show visual range, business judgment, and production execution.",
      proofSignals: {
        premiumUi: "Premium UI",
        fullstack: "Full-stack flow",
        creativeTech: "Creative tech",
      },
      allFilter: "All",
      capabilityLabels: {
        "3D": "3D",
        WebGL: "WebGL",
        Motion: "Motion",
        "Product UI": "Product UI",
        Editorial: "Editorial",
        "Glass UI": "Glass UI",
        Forms: "Forms",
        "Server Actions": "Server Actions",
        Compliance: "Compliance",
      },
      card: {
        strength: "Strength",
        role: "Role",
        viewWork: "View work",
      },
      casePanel: {
        selectedCase: "Selected Case",
        role: "Role",
        strength: "Strength",
        stack: "Stack",
        caseNotes: "Case Notes",
        challenge: "Challenge",
        design: "Design",
        technical: "Technical",
        complexity: "Complexity",
        complexityLabels: {
          ui: "UI",
          motion: "Motion",
          threeD: "3D",
          backend: "Back",
        },
        viewSelectedWork: "View selected work",
      },
    },
    about: {
      eyebrow: "About / Stack",
      titleFirst: "Interface craft,",
      titleSecond: "systems logic.",
      basedIn: "Based in",
    },
    contact: {
      eyebrow: "Contact",
      titleFirst: "Available for",
      titleSecond: "frontend work.",
      description:
        "Freelance projects, frontend roles, premium landing pages, product interfaces, and full-stack workflows.",
      emailLabel: "Email",
      gmailCompose: "Gmail compose",
      copyEmail: "Copy email",
      copied: "Copied",
    },
    footer: {
      builtWith: "Next.js · Tailwind CSS · Framer Motion · WebGL-ready metadata",
    },
  },
  "pt-BR": {
    common: {
      worksCount: (count: number) => `${count} projeto${count !== 1 ? "s" : ""} selecionado${count !== 1 ? "s" : ""}`,
      contact: "Contato",
      close: "Fechar",
      language: "Idioma",
    },
    hero: {
      stats: {
        projects: "Projetos",
        focus: "Foco",
        focusVal: "Frontend",
        mode: "Modo",
        modeVal: "Remoto",
      },
    },
    profileSignal: {
      label: "Sinal do Perfil",
      coreStack: "Stack Principal",
      priorityWork: "Trabalhos em Destaque",
    },
    observatory: {
      eyebrow: "Observatório de Projetos",
      titleFirst: "Projetos",
      titleSecond: "Selecionados",
      description:
        "Uma seleção cuidadosa de trabalhos em frontend, full-stack, product UI e tecnologia criativa, construídos para demonstrar amplitude visual, visão de negócios e execução em nível de produção.",
      proofSignals: {
        premiumUi: "UI Premium",
        fullstack: "Fluxo Full-stack",
        creativeTech: "Tecnologia Criativa",
      },
      allFilter: "Todos",
      capabilityLabels: {
        "3D": "3D",
        WebGL: "WebGL",
        Motion: "Motion",
        "Product UI": "UI de Produto",
        Editorial: "Editorial",
        "Glass UI": "Liquid Glass",
        Forms: "Formulários",
        "Server Actions": "Server Actions",
        Compliance: "Compliance",
      },
      card: {
        strength: "Diferencial",
        role: "Papel",
        viewWork: "Ver projeto",
      },
      casePanel: {
        selectedCase: "Estudo de Caso",
        role: "Papel",
        strength: "Diferencial",
        stack: "Stack",
        caseNotes: "Notas do Projeto",
        challenge: "Desafio",
        design: "Design",
        technical: "Técnica",
        complexity: "Complexidade",
        complexityLabels: {
          ui: "UI",
          motion: "Motion",
          threeD: "3D",
          backend: "Backend",
        },
        viewSelectedWork: "Abrir projeto selecionado",
      },
    },
    about: {
      eyebrow: "Sobre / Stack",
      titleFirst: "Refino de interface,",
      titleSecond: "lógica de sistemas.",
      basedIn: "Localização",
    },
    contact: {
      eyebrow: "Contato",
      titleFirst: "Disponível para",
      titleSecond: "novos projetos.",
      description:
        "Projetos freelance, vagas frontend, landing pages de alto padrão, interfaces de produto e fluxos full-stack.",
      emailLabel: "E-mail",
      gmailCompose: "Escrever no Gmail",
      copyEmail: "Copiar e-mail",
      copied: "Copiado!",
    },
    footer: {
      builtWith: "Next.js · Tailwind CSS · Framer Motion · Metadados prontos para WebGL",
    },
  },
};

export const LOCALIZED_PROFILES: Record<Locale, ProfileData> = {
  en: {
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
    bio: "I am a Full-Stack Developer and Information Systems student driven by building scalable web applications and automating workflows. Specializing in the TypeScript ecosystem with Next.js and Node.js, plus Python for practical automation, I bridge complex business rules and seamless user experiences through clean, efficient code.",
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
    ],
    links: [
      {
        label: "Email",
        href: `mailto:${CONTACT_EMAIL}`,
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
    ],
  },
  "pt-BR": {
    name: "Gabriel Henrique A. S. Barbosa",
    shortName: "Gabriel Henrique",
    title: "Desenvolvedor Full-Stack",
    location: "Brasil",
    availability: ["Projetos Freelance", "Vagas Frontend", "Trabalho Remoto"],
    positioning:
      "Desenvolvedor Full-Stack focado em experiências frontend premium, aplicações web escaláveis e automação de processos.",
    hero: {
      eyebrow: "Portfólio / Desenvolvedor Full-Stack",
      headline: "Gabriel Henrique",
      subheadline:
        "Desenvolvedor Full-Stack focado em experiências frontend premium, aplicações web escaláveis e automação de fluxos.",
      supporting:
        "TypeScript, Next.js, Node.js, Python, interfaces com motion refinado e sistemas de UI pensados para produção.",
      primaryCta: "Ver projetos selecionados",
      secondaryCta: "Contato",
      tertiaryCta: "GitHub",
    },
    bio: "Sou Desenvolvedor Full-Stack e estudante de Sistemas de Informação, motivado pela construção de aplicações web escaláveis e automação de processos. Especializado no ecossistema TypeScript com Next.js e Node.js, somado ao Python para automações práticas, conecto regras de negócio complexas a experiências fluidas por meio de código limpo e eficiente.",
    about:
      "Atuo em frontend, backend e automação com forte compromisso com interfaces refinadas, intuitivas e prontas para ambiente de produção. Meus projetos combinam direção visual, UI responsiva, motion, fluxos de validação e arquitetura técnica preparada para resolver problemas reais de negócio.",
    specialties: [
      "Interfaces frontend de alto padrão",
      "Aplicações web escaláveis",
      "Automação de fluxos e rotinas",
      "Experiências com WebGL e motion",
      "Tradução de regras de negócio em produtos",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Server Actions", "Zod", "Workflows de API"],
      },
      {
        label: "Automação",
        items: ["Python", "Otimização de fluxos", "Scripts operacionais"],
      },
      {
        label: "Tech Criativa",
        items: ["Three.js", "React Three Fiber", "WebGL", "Pós-processamento"],
      },
      {
        label: "Produto",
        items: ["Formulários", "Validação", "Fluxos de conversão", "UI responsiva"],
      },
    ],
    links: [
      {
        label: "E-mail",
        href: `mailto:${CONTACT_EMAIL}`,
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
    ],
  },
};

export const LOCALIZED_PROJECTS: Record<Locale, ProjectData[]> = {
  en: [
    {
      slug: "/Nexa",
      category: "B2B SaaS / Operations",
      name: "Nexa",
      description:
        "A conversion-focused SaaS platform with Aceternity-inspired light effects, product storytelling, pricing, FAQ, and WhatsApp lead flow.",
      accent: "#c7ff48",
      accentDim: "rgba(199,255,72,0.07)",
      accentBorder: "rgba(199,255,72,0.24)",
      accentGlow: "rgba(199,255,72,0.20)",
      tag: "SAAS",
      dot: "#c7ff48",
      extras: [{ label: "Contact flow", href: "/Nexa/contato" }],
      technologies: ["Next.js", "Tailwind CSS", "Aceternity UI", "WhatsApp"],
      capabilities: ["Motion", "Forms", "Product UI"],
      preview: "compliance",
      objective:
        "Deliver a complete B2B conversion journey from product positioning to qualified WhatsApp contact.",
      interaction:
        "Spotlight surfaces, luminous cards, logo marquee, accordion FAQ, responsive navigation, and pre-filled WhatsApp handoff.",
      role: "Frontend development, SaaS art direction, conversion architecture",
      proof:
        "Complete multi-page SaaS funnel with responsive product modules, pricing, social proof, FAQ, and contact flow.",
      strength: "Conversion-focused SaaS system",
      outcome:
        "Shows Gabriel can structure, design, and implement a complete commercial landing page with strong performance fundamentals.",
      caseStudy: {
        challenge: "Fit a broad B2B product story into a clear, credible, and conversion-oriented journey.",
        design: "Combined an editorial grid with lime system signals and restrained Aceternity-inspired light effects.",
        technical:
          "Built as server-rendered Next.js routes with isolated client interactions, responsive CSS, metadata, and WhatsApp integration.",
        proves:
          "End-to-end landing page execution across brand, product narrative, responsive UI, SEO, and lead conversion.",
      },
      complexity: { ui: 5, motion: 3, threeD: 0, backend: 1 },
    },
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
      role: "Frontend development, visual direction, responsive composition",
      proof: "Premium editorial interface with restrained animation and image-led storytelling.",
      strength: "Luxury-grade UI composition",
      outcome:
        "Demonstrates that Gabriel can craft refined brand experiences with precise spacing, pacing, and visual hierarchy.",
      caseStudy: {
        challenge:
          "Translate a fashion/editorial mood into a landing page that feels quiet, premium, and intentional.",
        design:
          "Used asymmetry, muted contrast, slow reveals, and spacious editorial rhythm to keep the experience elegant.",
        technical:
          "Built with Next.js, Tailwind CSS, isolated route styling, responsive sections, and motion-aware composition.",
        proves:
          "Strong visual judgment, art direction, and production frontend execution for premium brands.",
      },
      complexity: { ui: 5, motion: 3, threeD: 0, backend: 0 },
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
      role: "Creative frontend engineering, WebGL scene design, interaction logic",
      proof: "Interactive Three.js scene with camera controls, reactive material states, and post-processing.",
      strength: "Creative technology and 3D interaction",
      outcome:
        "Shows Gabriel can build beyond conventional UI and deliver immersive browser experiences with production tooling.",
      caseStudy: {
        challenge:
          "Create a project that proves technical range through an interactive WebGL scene without losing landing-page clarity.",
        design:
          "Centered the composition around a neon core with cinematic lighting, orbital inspection, and high-contrast atmosphere.",
        technical:
          "Implemented with React Three Fiber, Drei, Three.js materials, OrbitControls, and post-processing bloom.",
        proves:
          "Capability with 3D rendering, interaction design, animation timing, and advanced frontend stacks.",
      },
      complexity: { ui: 3, motion: 4, threeD: 5, backend: 0 },
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
      role: "Frontend development, technical UI direction, motion system",
      proof: "Dense engineering portfolio with coordinate-grid behavior and system-style content modules.",
      strength: "Technical storytelling and interface systems",
      outcome:
        "Positions Gabriel as a developer who can present complex technical work with structure, rhythm, and confidence.",
      caseStudy: {
        challenge:
          "Make engineering work feel precise and memorable instead of relying on a generic portfolio layout.",
        design:
          "Used brutalist contrast, spec-sheet sections, active panels, and scan-like states to express system thinking.",
        technical:
          "Built as a responsive Next.js route with Tailwind CSS, motion states, and componentized interface modules.",
        proves:
          "Ability to design dense technical interfaces while preserving hierarchy and usability.",
      },
      complexity: { ui: 5, motion: 4, threeD: 0, backend: 0 },
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
      role: "Full-stack implementation, validation flow, B2B product UI",
      proof: "Server Action lead pipeline with Zod validation and credible compliance-oriented product copy.",
      strength: "Business workflows and conversion-focused product UI",
      outcome:
        "Shows Gabriel can connect frontend polish with backend validation and real business process requirements.",
      caseStudy: {
        challenge:
          "Present a compliance product in a way that feels credible, operational, and conversion-ready.",
        design:
          "Used clear obligation cards, audit-ready language, and restrained B2B styling to keep trust high.",
        technical:
          "Implemented form handling with Next.js Server Actions, Zod validation, typed states, and responsive UI.",
        proves:
          "Full-stack product thinking, validation discipline, and the ability to translate business rules into usable flows.",
      },
      complexity: { ui: 4, motion: 2, threeD: 0, backend: 4 },
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
      role: "Frontend development, editorial UI, atmospheric art direction",
      proof: "Cultural storefront concept with tactile typography, mechanical motion, and archival visual language.",
      strength: "Editorial atmosphere and brand storytelling",
      outcome:
        "Demonstrates Gabriel's ability to adapt UI direction to a specific brand world and audience.",
      caseStudy: {
        challenge:
          "Turn a bookstore concept into a digital storefront with atmosphere, tactility, and strong editorial identity.",
        design:
          "Combined heavy typography, concrete-inspired texture, book-spine rhythm, and warm image composition.",
        technical:
          "Built with Next.js, Tailwind CSS, responsive editorial sections, and motion-led interaction details.",
        proves:
          "Ability to create differentiated brand experiences rather than template-like landing pages.",
      },
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
      role: "Frontend development, product UI, interactive controls",
      proof: "Fitness product interface with app-like density, calculator controls, and liquid glass visual system.",
      strength: "Product polish and interactive utility",
      outcome:
        "Shows Gabriel can build commercial product pages that feel usable, modern, and conversion-oriented.",
      caseStudy: {
        challenge:
          "Present a fitness product for busy users while making the interface feel immediate, polished, and practical.",
        design:
          "Used compact product sections, soft glass surfaces, dense controls, and benefit-led content hierarchy.",
        technical:
          "Implemented interactive calculator flows, Radix Slider controls, Tailwind styling, and isolated route assets.",
        proves:
          "Skill with product UI, responsive controls, interaction states, and visual polish for commercial pages.",
      },
      complexity: { ui: 5, motion: 3, threeD: 0, backend: 0 },
    },
  ],
  "pt-BR": [
    {
      slug: "/Nexa",
      category: "SaaS B2B / Operações",
      name: "Nexa",
      description:
        "Plataforma SaaS orientada à conversão com efeitos luminosos estilo Aceternity, narrativa de produto, preços, FAQ e fluxo de leads via WhatsApp.",
      accent: "#c7ff48",
      accentDim: "rgba(199,255,72,0.07)",
      accentBorder: "rgba(199,255,72,0.24)",
      accentGlow: "rgba(199,255,72,0.20)",
      tag: "SAAS",
      dot: "#c7ff48",
      extras: [{ label: "Fluxo de contato", href: "/Nexa/contato" }],
      technologies: ["Next.js", "Tailwind CSS", "Aceternity UI", "WhatsApp"],
      capabilities: ["Motion", "Forms", "Product UI"],
      preview: "compliance",
      objective:
        "Entregar uma jornada completa de conversão B2B, do posicionamento do produto ao contato qualificado pelo WhatsApp.",
      interaction:
        "Superfícies spotlight, cartões luminosos, marquee de logos, FAQ em acordeão, navegação responsiva e transição pré-preenchida para o WhatsApp.",
      role: "Desenvolvimento frontend, direção de arte SaaS e arquitetura de conversão",
      proof:
        "Funil SaaS multipágina completo com módulos responsivos de produto, tabela de preços, prova social, FAQ e fluxo de contato.",
      strength: "Sistema SaaS orientado à conversão",
      outcome:
        "Demonstra que Gabriel consegue estruturar, desenhar e implementar uma landing page comercial completa com sólidos fundamentos de performance.",
      caseStudy: {
        challenge: "Estruturar uma narrativa ampla de produto B2B em uma jornada clara, confiável e orientada à conversão.",
        design: "Combinou um grid editorial com destaques em tom lima e efeitos de iluminação contidos inspirados na Aceternity.",
        technical:
          "Construído em rotas Next.js renderizadas no servidor com interações isoladas no cliente, CSS responsivo, metadados e integração com WhatsApp.",
        proves:
          "Execução ponta a ponta de landing pages abrangendo marca, narrativa de produto, UI responsiva, SEO e conversão de leads.",
      },
      complexity: { ui: 5, motion: 3, threeD: 0, backend: 1 },
    },
    {
      slug: "/SculptedSilence",
      category: "Moda / Editorial",
      name: "Sculpted Silence",
      description:
        "Estética de atelier digital com luxo silencioso, assimetria arquitetônica e linguagem de motion editorial desacelerada.",
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
        "Apresentar composição refinada, motion contido e direção de arte padrão alta-costura em formato de landing page.",
      interaction:
        "Revelações lentas, seções guiadas por fotografia, estados de hover sutis e ritmo cinematográfico editorial.",
      role: "Desenvolvimento frontend, direção visual e composição responsiva",
      proof: "Interface editorial de alto nível com animação refinada e narrativa guiada por imagens.",
      strength: "Composição de UI padrão luxo",
      outcome:
        "Demonstra que Gabriel sabe criar experiências de marca sofisticadas com espaçamento milimétrico, ritmo e hierarquia visual impecável.",
      caseStudy: {
        challenge:
          "Traduzir uma atmosfera editorial de moda em uma landing page que transmita exclusividade, calma e intencionalidade.",
        design:
          "Utilizou assimetria, contraste sóbrio, transições pausadas e ritmo editorial espaçoso para preservar a elegância.",
        technical:
          "Desenvolvido com Next.js, Tailwind CSS, estilização isolada de rota, seções responsivas e composição sensível ao motion.",
        proves:
          "Forte discernimento estético, direção de arte e execução frontend em padrão de produção para marcas premium.",
      },
      complexity: { ui: 5, motion: 3, threeD: 0, backend: 0 },
    },
    {
      slug: "/SpectralCore",
      category: "Interativo / 3D",
      name: "Spectral Core",
      description:
        "Landing page em WebGL com núcleo neon reativo, controles de inspeção orbital, iluminação cinematográfica e pós-processamento com bloom.",
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
        "Comprovar capacidade técnica em WebGL imersivo com materiais reativos, controles de câmera e renderização cinematográfica.",
      interaction:
        "Hover altera o material, clique sobrecarrega a camada externa, OrbitControls permite inspecionar em 360° e bloom finaliza a cena.",
      role: "Engenharia frontend criativa, design de cena WebGL e lógica de interação",
      proof: "Cena interativa com Three.js, controles de câmera, estados dinâmicos de materiais e pós-processamento.",
      strength: "Tecnologia criativa e interação 3D",
      outcome:
        "Evidencia que Gabriel vai além de interfaces convencionais, criando experiências imersivas no navegador com ferramental profissional.",
      caseStudy: {
        challenge:
          "Criar um projeto que evidencie amplitude técnica através de WebGL interativo sem sacrificar a clareza de uma landing page.",
        design:
          "Centralizou a composição em torno de um núcleo neon com luz cinematográfica, inspeção orbital e atmosfera de alto contraste.",
        technical:
          "Implementado com React Three Fiber, Drei, shaders e materiais Three.js, OrbitControls e efeito de pós-processamento bloom.",
        proves:
          "Domínio de renderização 3D, design de interação, timing de animação e stacks avançadas de frontend.",
      },
      complexity: { ui: 3, motion: 4, threeD: 5, backend: 0 },
    },
    {
      slug: "/DraftedObsidian",
      category: "Engenharia / Portfólio",
      name: "Drafted Obsidian",
      description:
        "Portfólio espacial brutalista com malha de coordenadas reativa, módulos em formato de ficha técnica e narrativa de sistema padrão terminal.",
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
        "Apresentar trabalho de engenharia como um sistema de precisão, com estrutura técnica minuciosa e ritmo brutalista.",
      interaction:
        "Grade de coordenadas reativa ao cursor, painéis de sistema ativos, módulos densos e estados de varredura em alto contraste.",
      role: "Desenvolvimento frontend, direção de UI técnica e sistema de motion",
      proof: "Portfólio técnico denso com malha dinâmica de coordenadas e módulos de conteúdo no estilo de sistemas.",
      strength: "Narrativa técnica e sistemas de interface",
      outcome:
        "Posiciona Gabriel como desenvolvedor capaz de comunicar trabalhos técnicos complexos com solidez, ritmo e maturidade.",
      caseStudy: {
        challenge:
          "Tornar o trabalho de engenharia palpável e memorável sem recorrer a layouts genéricos de portfólio.",
        design:
          "Empregou contraste brutalista, seções de ficha técnica, painéis ativos e estados de leitura técnica para expressar pensamento sistêmico.",
        technical:
          "Desenvolvido como rota responsiva em Next.js com Tailwind CSS, estados de motion e módulos de interface componentizados.",
        proves:
          "Habilidade de projetar interfaces técnicas densas mantendo hierarquia impecável e facilidade de navegação.",
      },
      complexity: { ui: 5, motion: 4, threeD: 0, backend: 0 },
    },
    {
      slug: "/LegisFlow",
      category: "Compliance Jurídico",
      name: "LegisFlow",
      description:
        "Monitoramento automatizado de compliance para times jurídicos. Acompanhe mudanças regulatórias, gerencie obrigações e mantenha-se pronto para auditorias.",
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
        "Demonstrar um fluxo B2B confiável de compliance com validações robustas, redação corporativa precisa e funil de conversão claro.",
      interaction:
        "Pipeline de formulário de leads, validação no servidor, cartões de obrigações e narrativa de produto orientada a auditoria.",
      role: "Implementação full-stack, fluxo de validação e UI de produto B2B",
      proof: "Pipeline de leads com Server Actions, validação via Zod e copy de produto crível voltada a compliance.",
      strength: "Fluxos de negócio e UI de produto focada em conversão",
      outcome:
        "Mostra a capacidade de Gabriel em conectar o refino de frontend à validação de backend e regras reais de negócio.",
      caseStudy: {
        challenge:
          "Apresentar uma solução de compliance de forma confiável, funcional e preparada para conversão corporativa.",
        design:
          "Adotou cartões de obrigações claros, linguagem corporativa auditável e estética B2B contida para transmitir alta credibilidade.",
        technical:
          "Tratamento de formulários com Next.js Server Actions, validação rigorosa com Zod, estados tipados e UI responsiva.",
        proves:
          "Visão full-stack de produto, disciplina em validação de dados e habilidade para traduzir regras complexas em fluxos intuitivos.",
      },
      complexity: { ui: 4, motion: 2, threeD: 0, backend: 4 },
    },
    {
      slug: "/CinematicInkConcrete",
      category: "Livraria / Editorial",
      name: "Cinematic Ink & Concrete",
      description:
        "Landing page de livraria com tipografia editorial marcante, lombadas interativas com arraste mecânico e motion no padrão de arquivo histórico.",
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
        "Criar uma vitrine cultural táctil com tipografia pesada, textura de concreto e atmosfera de acervo histórico.",
      interaction:
        "Interação de lombadas de livros, recortes fotográficos, painéis sobrepostos e transições editoriais acolhedoras.",
      role: "Desenvolvimento frontend, UI editorial e direção de arte atmosférica",
      proof: "Conceito de catálogo cultural com tipografia táctil, motion mecânico e linguagem visual de curadoria.",
      strength: "Atmosfera editorial e storytelling de marca",
      outcome:
        "Evidencia a capacidade de Gabriel de adaptar a direção de UI ao universo particular e ao público de cada marca.",
      caseStudy: {
        challenge:
          "Transformar o conceito de livraria em uma experiência digital com atmosfera, sensação táctil e forte identidade editorial.",
        design:
          "Combinou tipografia marcante, texturas inspiradas em concreto, ritmo de lombadas e composição fotográfica quente.",
        technical:
          "Construído em Next.js, Tailwind CSS, seções editoriais responsivas e detalhes de interação orientados a motion.",
        proves:
          "Habilidade de conceber experiências de marca autorais e autênticas, fugindo de templates padronizados.",
      },
      complexity: { ui: 5, motion: 4, threeD: 0, backend: 0 },
    },
    {
      slug: "/Densify",
      category: "Fitness & Nutrição",
      name: "Densify",
      description:
        "Aplicativo de alta densidade para treinos e nutrição. Resultados de hipertrofia em sessões de 40 minutos mesmo para agendas desafiadoras.",
      accent: "#6aabf0",
      accentDim: "rgba(106,171,240,0.07)",
      accentBorder: "rgba(106,171,240,0.18)",
      accentGlow: "rgba(106,171,240,0.28)",
      tag: "FITNESS",
      dot: "#6aabf0",
      extras: [{ label: "Comparativo Liquid Glass", href: "/comparison" }],
      technologies: ["Next.js", "Tailwind CSS", "Radix Slider", "Liquid Glass"],
      capabilities: ["Glass UI", "Product UI", "Motion"],
      preview: "glass",
      objective:
        "Apresentar um produto fitness dinâmico com utilidade rápida, controles refinados e densidade visual de aplicativo.",
      interaction:
        "Controles interativos de calculadora, superfícies em liquid glass, rota de comparativo e seções de dashboard de produto.",
      role: "Desenvolvimento frontend, UI de produto e controles interativos",
      proof: "Interface de produto fitness com densidade de app, controles de calculadora e sistema visual em liquid glass.",
      strength: "Refino de produto e utilidade interativa",
      outcome:
        "Demonstra que Gabriel sabe construir páginas comerciais de produto altamente utilizáveis, modernas e com foco em conversão.",
      caseStudy: {
        challenge:
          "Apresentar um produto fitness para pessoas ocupadas mantendo a interface imediata, sofisticada e prática.",
        design:
          "Adotou seções compactas, superfícies suaves de vidro, controles densos e hierarquia focada em benefícios.",
        technical:
          "Implementou fluxos de calculadora interativa com controles Radix Slider, estilização Tailwind e assets isolados.",
        proves:
          "Competência técnica em UI de produto, controles responsivos, estados de interação e acabamento visual de alto padrão.",
      },
      complexity: { ui: 5, motion: 3, threeD: 0, backend: 0 },
    },
  ],
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.en;
}

export function getLocalizedProfile(locale: Locale): ProfileData {
  return LOCALIZED_PROFILES[locale] ?? LOCALIZED_PROFILES.en;
}

export function getLocalizedProjects(locale: Locale): ProjectData[] {
  return LOCALIZED_PROJECTS[locale] ?? LOCALIZED_PROJECTS.en;
}
