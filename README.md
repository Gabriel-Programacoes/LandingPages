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

</div>

---

## 📦 Monorepo Structure

```
landing-page-hub/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 page.tsx               ← HUB home — lists all projects
│   │   ├── 📄 layout.tsx             ← Root layout (Geist fonts, metadata)
│   │   ├── 📄 globals.css
│   │   │
│   │   ├── 📁 (fitness)/             ← Route group · Fitness projects
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📁 Densify/           ← 💪 Densify landing page
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 comparison/        ← Liquid Glass CSS comparison
│   │   │       └── 📄 page.tsx
│   │   │
│   │   └── 📁 (compliance)/          ← Route group · Compliance projects
│   │       ├── 📄 layout.tsx
│   │       └── 📁 LegisFlow/         ← ⚖️ LegisFlow landing page
│   │           ├── 📄 page.tsx
│   │           └── 📄 actions.ts     ← Server Actions (lead form)
│   │
│   └── 📁 components/
│       ├── 📁 densify/               ← Densify-specific components
│       ├── 📁 legisflow/             ← LegisFlow-specific components
│       └── 📁 ui/                    ← Shared primitives
│
├── 📁 public/
├── 📄 next.config.ts
├── 📄 vercel.json
├── 📄 package.json
└── 📄 tsconfig.json
```

---

## 🗂️ Projects

| # | Project | Category | Route | Docs |
|---|---------|----------|-------|------|
| 01 | 💪 **Densify** | Fitness & Nutrition | `/Densify` | [README →](./src/app/(fitness)/Densify/README.md) |
| 02 | ⚖️ **LegisFlow** | Legal Compliance | `/LegisFlow` | [README →](./src/app/(compliance)/LegisFlow/README.md) |

> **Add a new project:** create a route group + folder under `src/app/`, then add an entry to the `PROJECTS` array in `src/app/page.tsx` — the hub grid renders automatically.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `≥ 20` |
| npm | `≥ 10` |

### Installation

```bash
# 1 — Clone the repository
git clone <your-repo-url>
cd landing-page-hub

# 2 — Install dependencies
npm install

# 3 — Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — you'll land on the HUB home page.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🛠️ Tech Stack

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.3 | Framework & routing (App Router) |
| `react` / `react-dom` | 19.2.4 | UI runtime |
| `typescript` | ^5 | Type safety |

### Styling & Animation

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4 | Utility-first CSS |
| `framer-motion` | ^12 | Animations & transitions |

### UI Primitives

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-slider` | ^1.3 | Accessible sliders |
| `@radix-ui/react-progress` | ^1.1 | Progress bars |
| `@phosphor-icons/react` | ^2.1 | Icon system |
| `@icons-pack/react-simple-icons` | ^13 | Brand logos |

### Validation

| Package | Version | Purpose |
|---------|---------|---------|
| `zod` | ^4 | Schema validation (Server Actions) |

---

## 🏗️ Architecture

### Route Groups

Next.js [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) (`(fitness)`, `(compliance)`) keep projects **fully isolated** — each group has its own `layout.tsx` with independent fonts, CSS variables, and metadata. Routes remain clean (e.g. `/Densify`, not `/fitness/Densify`).

### Server Actions

Lead forms use **Next.js Server Actions** (`actions.ts`) validated on the Edge with **Zod**. Zero client-side fetch boilerplate, instant error feedback, no fake loading states.

### Component Isolation

Every project owns its components under `src/components/<project>/`. Shared primitives live in `src/components/ui/`.

---

## ☁️ Deployment

🌐 **Live:** [https://landingpages-hub.vercel.app](https://landingpages-hub.vercel.app)

The project is configured for **[Vercel](https://vercel.com)** via `vercel.json` and `output: "standalone"` in `next.config.ts`.

### Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### Deploy via GitHub Integration

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import repository
3. Set **Root Directory** to `landing-page-hub`
4. Click **Deploy** — Vercel auto-detects Next.js ✅

> ⚠️ Add any environment variables in **Vercel → Project → Settings → Environment Variables** before deploying.

---

## 📁 Adding a New Landing Page

```bash
# 1. Create a route group (if new category)
mkdir src/app/(your-category)
touch src/app/(your-category)/layout.tsx

# 2. Create the page
mkdir src/app/(your-category)/YourProject
touch src/app/(your-category)/YourProject/page.tsx

# 3. Create components folder
mkdir src/components/yourproject

# 4. Register in the HUB
# → Edit src/app/page.tsx → add entry to PROJECTS array
```

---

<div align="center">

Made by **Gabriel**

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>
