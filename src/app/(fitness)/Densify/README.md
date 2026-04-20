<div align="center">

<br />

# 💪 Densify

### *High-Density Fitness Planning · Hypertrophy Results for Impossible Schedules*

<br />

[![Category](https://img.shields.io/badge/Category-Fitness_%26_Nutrition-6aabf0?style=for-the-badge&logo=apple&logoColor=white)](#)
[![Route](https://img.shields.io/badge/Route-%2FDensify-6aabf0?style=for-the-badge&logo=next.js&logoColor=white)](https://landingpages-hub.vercel.app/Densify)
[![Design](https://img.shields.io/badge/Design-Liquid_Glass_%C2%B7_Pastel-b8d4f5?style=for-the-badge)](#)
[![Mobile First](https://img.shields.io/badge/Mobile-First-6aabf0?style=for-the-badge&logo=ios&logoColor=white)](#)

<br />

> **"Real Results for Impossible Routines"**
> A landing page for time-poor professionals who want hypertrophy gains from 40-minute sessions.

</div>

---

## 🎯 Overview

| | |
|---|---|
| **Product** | Densify — High-Density Fitness Planning App |
| **Audience** | Professionals with scarce time, focused on hypertrophy |
| **Goal** | Immediate user retention via interactive calculator → download conversion |
| **Route** | `/Densify` |
| **Route Group** | `(fitness)` |

---

## 🎨 Design Direction — Liquid Glass Minimalism

Densify **breaks completely** from the dark/aggressive gym-app archetype. The aesthetic is **Luxury Minimalism**: mental lightness for users with already heavy routines.

### Colour Palette

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| 🔵 | Pale Sky | `#6aabf0` | Primary accent, backgrounds |
| 🍑 | Pastel Petal / Peach | `#f7c5b0` | Hero highlights |
| 🟠 | Apricot Cream | `#f4b98e` | Secondary CTAs, warnings |
| ⬜ | Glass White | `rgba(255,255,255,0.10)` | Card backgrounds |

### Liquid Glass Effect

The signature material — applied to all cards, modals, and CTAs:

```css
/* Core liquid glass recipe */
backdrop-filter: blur(20px) saturate(150%);
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.20);
box-shadow:
  0 4px 24px rgba(106, 171, 240, 0.12),
  inset 0 1px 0 rgba(255, 255, 255, 0.25);
border-radius: 24px;
```

> Cards have **no solid colours** — they blur, refract, and reflect the background in real time as the user scrolls.

---

## 🔤 Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| **Display / Headlines** | Pilcrow Rounded | Bold / Black | Friendly, tac­tile feel; extreme corner radius synergy |
| **Body / UI / Data** | Archivo | Regular / Medium | Geometric, technical; perfect for calorie/macro readouts |

---

## 🧩 Components

```
src/components/densify/
├── 📄 Navbar.tsx               ← Sticky translucent nav
├── 📄 HeroSection.tsx          ← Full-bleed gradient + glass CTA pill
├── 📄 CalculatorSection.tsx    ← Multi-step interactive macro calculator
├── 📄 BenefitsCarousel.tsx     ← Horizontal image carousel + glass tags
├── 📄 TestimonialsSection.tsx  ← Masonry grid of glass testimonial cards
├── 📄 CTASection.tsx           ← Download conversion CTA
└── 📄 Footer.tsx
```

### Component Responsibilities

#### `HeroSection`
- Animated soft-gradient background (Peach × Pale Sky)
- Headline in Pilcrow Rounded with subtle inner glow
- Glass-pill CTA button with hover refraction animation

#### `CalculatorSection`
- Step-by-step goal/restriction selector
- Smooth slide+fade transitions between steps via `AnimatePresence`
- Output card: circular macro charts on translucent glass
- Calorie counter rolls like an **odometer** (no instant jumps)

#### `BenefitsCarousel`
- High-res editorial fitness photography
- Floating glass tags overlay each image (`"Prep in 15 min"`, `"40-min sessions"`)

#### `TestimonialsSection`
- Masonry layout — testimonials **float** in overlapping glass cards, creating scroll depth

---

## 🎬 Motion & Animation

| Effect | Implementation | Notes |
|--------|---------------|-------|
| Scroll Parallax | `useScroll` + `useTransform` (Framer Motion) | Background orbs move at different speed from cards |
| Calculator Steps | `AnimatePresence` | Slide + simultaneous fade mask |
| Calorie Odometer | Custom `useSpring` counter | Weighted roll feel, not instant |
| Tap Confirmation | `whileTap: { scale: 1.04 }` | Tactile press feedback before advancing step |
| Glass Hover | CSS `transition` + `backdrop-filter` | Refraction deepens on hover |

---

## ⚙️ Engineering Specs

### Stack

| Technology | Version | Usage |
|-----------|---------|-------|
| Next.js | 16.2 | App Router, SSR |
| React | 19 | `useOptimistic` for zero-lag calculator transitions |
| Tailwind CSS | 4 | Utility classes + `backdrop-filter` composition |
| Framer Motion | 12 | Parallax, `AnimatePresence`, spring physics |
| Radix UI Slider | ^1.3 | Accessible slider inputs in calculator |
| Radix UI Progress | ^1.1 | Step progress indicator |
| Phosphor Icons | ^2.1 | UI icon set |

### Key Tailwind Utilities for the Glass Effect

```html
<!-- Glass card template -->
<div class="
  backdrop-blur-2xl
  bg-white/[0.08]
  border border-white/20
  rounded-3xl
  shadow-[0_4px_24px_rgba(106,171,240,0.12),inset_0_1px_0_rgba(255,255,255,0.25)]
">
```

### Performance

- **Mobile-first** layout — all interactions designed for touch
- `useOptimistic` ensures calculator state changes have **zero perceived latency**
- Framer Motion animations are GPU-composited (transform/opacity only) — no layout thrashing
- Images use `next/image` with priority loading for above-the-fold content

### Accessibility

- All sliders and carousels backed by **Radix UI** primitives
- Full keyboard navigation supported
- Semantic HTML maintained beneath custom visual layers

---

## 📐 Page Structure

```
/ Densify
├── 🔝 Navbar              (sticky · glass)
├── 🌅 Hero Section        (85vh · gradient bg · glass CTA)
├── 🧮 Calculator Section  (step-by-step · macro output)
├── 🖼️ Benefits Carousel   (horizontal scroll · glass tags)
├── 💬 Testimonials        (masonry · glass cards)
├── 📲 CTA Section         (download conversion)
└── 🔻 Footer
```

---

## 🔗 Related

- [Liquid Glass Comparison](/comparison) — CSS vs WebGL side-by-side demo
- [Monorepo README](../../../../../README.md)
- [LegisFlow](../../(compliance)/LegisFlow/README.md)

---

<div align="center">

**Densify** · Part of the [Landing Pages HUB](../../../../../README.md)

[![Framer Motion](https://img.shields.io/badge/-Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Radix UI](https://img.shields.io/badge/-Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white)](https://www.radix-ui.com)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

