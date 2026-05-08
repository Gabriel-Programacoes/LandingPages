<div align="center">

<br />

```
██╗      █████╗ ███╗   ██╗██████╗ ██╗███╗   ██╗ ██████╗     ██████╗  █████╗  ██████╗ ███████╗███████╗
██║     ██╔══██╗████╗  ██║██╔══██╗██║████╗  ██║██╔════╝     ██╔══██╗██╔══██╗██╔════╝ ██╔════╝██╔════╝
██║     ███████║██╔██╗ ██║██║  ██║██║██╔██╗ ██║██║  ███╗    ██████╔╝███████║██║  ███╗█████╗  ███████╗
██║     ██╔══██║██║╚██╗██║██║  ██║██║██║╚██╗██║██║   ██║    ██╔═══╝ ██╔══██║██║   ██║██╔══╝  ╚════██║
███████╗██║  ██║██║ ╚████║██████╔╝██║██║ ╚████║╚██████╔╝    ██║     ██║  ██║╚██████╔╝███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
```

### **Landing Pages Collection**
*A workspace of production-grade landing pages — each with isolated styles, fonts, and components.*

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://landingpages-hub.vercel.app)
[![Live](https://img.shields.io/badge/Live-landingpages--hub.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://landingpages-hub.vercel.app)
[![Projects](https://img.shields.io/badge/Projects-5-8B5CF6?style=for-the-badge)](https://landingpages-hub.vercel.app)

</div>

---

## ✨ Latest Updates

- HUB now indexes **5 live project entries** from `PROJECTS` in `src/app/page.tsx`.
- New domain route groups:
  - `(atelier)` → `/SculptedSilence`
  - `(engineering)` → `/DraftedObsidian`
  - `(books)` → `/CinematicInkConcrete`
- Added `MiniHubMenu` floating navigator for fast cross-project routing.
- Expanded HUB cards with accent palette metadata and optional per-project extra links.
- `LegisFlow` lead capture flow now runs with **Server Actions + Zod** validation.

---

## 🎯 Featured Projects

<div align="center">

[![ATELIER](https://img.shields.io/badge/Sculpted%20Silence-ATELIER-9a948c?style=for-the-badge)](https://landingpages-hub.vercel.app/SculptedSilence)
[![SYSTEMS](https://img.shields.io/badge/Drafted%20Obsidian-SYSTEMS-ff3b00?style=for-the-badge)](https://landingpages-hub.vercel.app/DraftedObsidian)
[![BOOKSTORE](https://img.shields.io/badge/Cinematic%20Ink-BOOKSTORE-d9531e?style=for-the-badge)](https://landingpages-hub.vercel.app/CinematicInkConcrete)
[![FITNESS](https://img.shields.io/badge/Densify-FITNESS-6aabf0?style=for-the-badge)](https://landingpages-hub.vercel.app/Densify)
[![COMPLIANCE](https://img.shields.io/badge/LegisFlow-COMPLIANCE-4ade80?style=for-the-badge)](https://landingpages-hub.vercel.app/LegisFlow)

</div>

---

## 📦 Monorepo Structure

```text
landing-page-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx                              ← HUB home (PROJECTS registry)
│   │   ├── layout.tsx                            ← Root layout (Geist fonts, metadata)
│   │   ├── globals.css
│   │   │
│   │   ├── (atelier)/SculptedSilence/page.tsx   ← Fashion / Editorial
│   │   ├── (engineering)/DraftedObsidian/page.tsx
│   │   ├── (books)/CinematicInkConcrete/page.tsx
│   │   ├── (fitness)/Densify/page.tsx
│   │   ├── (fitness)/comparison/page.tsx        ← Liquid Glass comparison
│   │   └── (compliance)/LegisFlow/
│   │       ├── page.tsx
│   │       └── actions.ts                        ← Server Action (lead form)
│   │
│   └── components/
│       ├── MiniHubMenu.tsx
│       ├── sculpted-silence/
│       ├── drafted-obsidian/
│       ├── cinematic-ink/
│       ├── densify/
│       └── legisflow/
│
├── public/                                       ← Static assets
├── next.config.ts
├── vercel.json
├── package.json
└── tsconfig.json
```

---

## 🗂️ Projects

| # | Project | Category | Route | Docs |
|---|---------|----------|-------|------|
| 01 | 🧵 **Sculpted Silence** ![ATELIER](https://img.shields.io/badge/ATELIER-9a948c?style=flat-square) | Fashion / Editorial | `/SculptedSilence` | - |
| 02 | 🧱 **Drafted Obsidian** ![SYSTEMS](https://img.shields.io/badge/SYSTEMS-ff3b00?style=flat-square) | Engineering / Portfolio | `/DraftedObsidian` | - |
| 03 | 📚 **Cinematic Ink & Concrete** ![BOOKSTORE](https://img.shields.io/badge/BOOKSTORE-d9531e?style=flat-square) | Bookstore / Editorial | `/CinematicInkConcrete` | - |
| 04 | 💪 **Densify** ![FITNESS](https://img.shields.io/badge/FITNESS-6aabf0?style=flat-square) | Fitness & Nutrition | `/Densify` | [README →](./src/app/(fitness)/Densify/README.md) |
| 05 | ⚖️ **LegisFlow** ![COMPLIANCE](https://img.shields.io/badge/COMPLIANCE-4ade80?style=flat-square) | Legal Compliance | `/LegisFlow` | [README →](./src/app/(compliance)/LegisFlow/README.md) |

> **Hub registration flow:** add your page route + components, then append a new object to `PROJECTS` in `src/app/page.tsx`.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `>= 20` |
| npm | `>= 10` |

### Installation

```bash
# 1 — Enter project
cd landing-page-hub

# 2 — Install dependencies
npm install

# 3 — Start dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to access the HUB.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🛠️ Tech Stack

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.3 | App Router + rendering |
| `react` / `react-dom` | 19.2.4 | UI runtime |
| `typescript` | ^5 | Type safety |

### Styling & Motion

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4 | Utility styling |
| `framer-motion` | ^12 | Motion and transitions |

### UI & Validation

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-slider` | ^1.3 | Slider primitives |
| `@radix-ui/react-progress` | ^1.1 | Progress primitives |
| `@phosphor-icons/react` | ^2.1 | Icons |
| `@icons-pack/react-simple-icons` | ^13 | Brand icons |
| `zod` | ^4 | Server-side schema validation |

---

## 🏗️ Architecture

### Route Group Isolation

Next.js route groups (`(atelier)`, `(books)`, `(compliance)`, `(engineering)`, `(fitness)`) isolate project layouts and styles without polluting URLs.

### HUB-Driven Registry

The HUB grid is rendered from the `PROJECTS` array in `src/app/page.tsx` (slug, category, visual accent, metadata, extras).

### Form Pipeline (LegisFlow)

`src/app/(compliance)/LegisFlow/actions.ts` validates lead submissions with `zod` and returns typed `FormState` for UI feedback.

### Runtime & Security

`next.config.ts` enables `output: "standalone"` and ships common security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, etc.).

---

## ☁️ Deployment

🌐 **Live:** [https://landingpages-hub.vercel.app](https://landingpages-hub.vercel.app)

The project is configured for **Vercel** via `vercel.json`:

- `framework`: `nextjs`
- `buildCommand`: `npm run build`
- `devCommand`: `npm run dev`
- `outputDirectory`: `.next`

---

## 📁 Adding a New Landing Page

```bash
# 1. Create a route folder
mkdir src/app/(your-category)/YourProject

# 2. Add page entry
touch src/app/(your-category)/YourProject/page.tsx

# 3. Add component scope
mkdir src/components/yourproject

# 4. Register in HUB
# Edit src/app/page.tsx and append to PROJECTS
```

Optional: add a direct shortcut to `src/components/MiniHubMenu.tsx`.

---

<div align="center">

Made by **Gabriel**

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>
