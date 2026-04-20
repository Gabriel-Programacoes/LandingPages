<div align="center">

<br />

# ⚖️ LegisFlow

### *Automated Compliance & Paralegal Management · B2B SaaS*

<br />

[![Category](https://img.shields.io/badge/Category-Legal_Compliance-4ade80?style=for-the-badge&logo=scaleway&logoColor=white)](#)
[![Route](https://img.shields.io/badge/Route-%2FLegisFlow-4ade80?style=for-the-badge&logo=next.js&logoColor=white)](https://landingpages-hub.vercel.app/LegisFlow)
[![Design](https://img.shields.io/badge/Design-Corporate_Brutalism-1a2a1a?style=for-the-badge)](#)
[![Target](https://img.shields.io/badge/Target-B2B_Lead_Gen-4ade80?style=for-the-badge&logo=briefcase&logoColor=white)](#)

<br />

> **"Automation and Paralegal Compliance"**
> A high-conversion B2B landing page targeting accounting firms and paralegal departments.

</div>

---

## 🎯 Overview

| | |
|---|---|
| **Product** | LegisFlow — Paralegal & Environmental Compliance SaaS |
| **Audience** | Accounting offices & paralegal departments |
| **Goal** | High-quality B2B lead generation → demo scheduling |
| **Route** | `/LegisFlow` |
| **Route Group** | `(compliance)` |
| **Form Backend** | Next.js Server Actions + Zod (Edge validation) |

---

## 🎨 Design Direction — Corporate Brutalism

LegisFlow **rejects** the "friendly cloud software" cliché. The aesthetic is **Moderate Corporate Brutalism** — clear structure, visible grid lines, hard shadows, precision typography. It communicates that bureaucratic chaos is now *framed and under absolute control.*

### The Balance Point

To avoid oppressive brutalism, **generous negative space** is used in breathing areas — giving the feeling that previously chaotic compliance processes are now organized and calm.

### Colour Palette

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ⬜ | Off-White | `#F5F2ED` | Background (official document feel) |
| ⬛ | Pure Black / Charcoal | `#0F0F0F` | Structural lines, typography, hard shadows |
| 🟢 | Utility Green | `#4ade80` | Interactive elements, IBAMA module accent |
| 🩶 | Mid-Grey | `#6B7280` | Body text, secondary labels |

### Hard Shadow System

```css
/* Brutalist hard shadow — no blur, no softness */
box-shadow: 4px 4px 0px 0px #0F0F0F;

/* Hover state: element lifts, shadow fills the gap */
transform: translateY(-4px);
box-shadow: 8px 8px 0px 0px #0F0F0F;
```

> **Zero glassmorphism.** No blur, no frosted glass, no translucency. Every surface is solid.

---

## 🔤 Typography

| Role | Font Options | Scale | Notes |
|------|-------------|-------|-------|
| **Display / Headlines** | Tanker · Druk · Bebas Neue Pro · Tungsten | Massive (clamp 64px→120px) | Justified to container edges, tight tracking, forms solid text blocks |
| **Body / UI / Data** | Archivo · Space Grotesk · Switzer | 14–16px | Geometric grotesque; data-loyal, high legibility |

> The display font **is** the design element — used at monumental scale as the central visual anchor.

---

## 🧩 Components

```
src/components/legisflow/
├── 📄 HeroSection.tsx          ← 85vh · monumental typography · solid CTA
├── 📄 MarqueeSection.tsx       ← Continuous client logo ticker (black borders)
├── 📄 BentoSection.tsx         ← Asymmetric feature bento box
└── 📄 LeadFormSection.tsx      ← Terminal-style demo scheduling form
```

### Component Responsibilities

#### `HeroSection`
- Occupies the first `85vh`
- Headline text **breaks the screen** in Tanker/Druk, justified left, touching container edges
- CTA: flat solid button — **sharp corners**, no border-radius, hard border
- Animation: text blocks enter with rapid-decelerate easing `cubic-bezier(0.22, 1, 0.36, 1)`

#### `MarqueeSection`
- Full-width horizontal ticker, no gaps
- Delimited by **1–2px solid black** borders top and bottom
- Client logos in **monochrome, high contrast** — mathematical precision scroll speed

#### `BentoSection`

The asymmetric bento grid — the design's *lightness break*:

| Block | Size | Content |
|-------|------|---------|
| **Bloco 1** | Wide (2-col) | Data Integration — terminal/code snippet showing API data ingestion |
| **Bloco 2** | Square | Auto-Monitoring — stacked deadline alert UI components |
| **Bloco 3** | Tall (2-row) | Visual Mockup — dashboard showing "Em dia / Pendente" CNPJ status |
| **Bloco 4** | Square · **Green** | IBAMA Environmental Module — Utility Green accent + heavy typography |

Hover behaviour — no glow, no blur. Instead: **lifts 4px** + hard black shadow fills the gap below. Feels like pressing a mechanical panel button.

#### `LeadFormSection`
- Terminal/data-entry aesthetic
- Large fields, **monospaced placeholder text**
- Strict validation feedback — instant, no fake loading
- Backed by **Next.js Server Actions** + **Zod** Edge validation

---

## 🎬 Motion & Animation

| Effect | Easing | Notes |
|--------|--------|-------|
| Bento reveal on scroll | `cubic-bezier(0.22, 1, 0.36, 1)` | Fast start, controlled deceleration |
| Staggered bento items | `staggerChildren: 0.08` | Elements enter bottom→top sequentially |
| Bento hover lift | `translateY(-4px)` + hard shadow shift | Zero elasticity — mechanical feel |
| Marquee scroll | Linear, constant velocity | No easing — mathematical precision |
| Form error feedback | Instant (0ms delay) | No fake loaders; builds B2B trust |

> **Philosophy:** Fluid but precise. The rhythm of a well-calibrated machine — no elastic or jelly-like delays.

---

## ⚙️ Engineering Specs

### Stack

| Technology | Version | Usage |
|-----------|---------|-------|
| Next.js | 16.2 | App Router, Server Actions |
| React | 19 | Client + Server components |
| Tailwind CSS | 4 | Extended with CSS custom properties for brutalist palette |
| Framer Motion | 12 | Stagger orchestration, bezier animations |
| Zod | ^4 | Server-side schema validation (Edge runtime) |

### Custom Tailwind Extensions

```css
/* globals.css / layout.css */
:root {
  --color-off-white: #F5F2ED;
  --color-charcoal: #0F0F0F;
  --color-utility-green: #4ade80;
  --shadow-hard: 4px 4px 0px 0px #0F0F0F;
  --shadow-hard-hover: 8px 8px 0px 0px #0F0F0F;
}
```

### Server Action (Lead Form)

```typescript
// actions.ts — runs on the Edge
"use server";

import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2),
});

export async function submitLead(formData: FormData) {
  const result = LeadSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  // → Send to CRM / email
  return { success: true };
}
```

### Performance & Security

- Server Actions eliminate client-side fetch — **no API route exposure**
- Zod validation runs at the **Edge** before any business logic
- Zero fake loading states — instant success/error feedback builds B2B trust
- Forms work with **JavaScript disabled** (progressive enhancement)

---

## 📐 Page Structure

```
/ LegisFlow
├── 🔝 Hero Section         (85vh · monumental type · solid CTA)
├── 📜 Marquee Section      (client logos · continuous ticker)
├── 🧱 Bento Section        (asymmetric feature grid · 4 blocks)
└── 📋 Lead Form Section    (terminal-style · Server Action)
```

---

## 🔗 Related

- [Monorepo README](../../../../../README.md)
- [Densify](../../(fitness)/Densify/README.md)

---

<div align="center">

**LegisFlow** · Part of the [Landing Pages HUB](../../../../../README.md)

[![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev)
[![Framer Motion](https://img.shields.io/badge/-Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

