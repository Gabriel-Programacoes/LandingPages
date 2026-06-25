# Hub 3D Roadmap

## Intent

Transform the landing page Hub from a project directory into a portfolio experience: a navigable interactive gallery where each project feels like an exhibit with its own material, motion language, technical tags, and visual preview.

The goal is not just to add 3D decoration. The Hub should communicate range: UI craft, interaction design, WebGL, forms, motion, editorial layouts, product thinking, and technical execution.

## Recommended Flow

The best path is:

1. Build an interactive 2D gallery layer.
2. Add live project previews and technical filters.
3. Introduce a 3D navigation layer as the main visual system.
4. Keep the 2D gallery as fallback, metadata surface, and accessibility layer.

This is more reliable than jumping directly into a full 3D Hub. A pure 3D first pass can look impressive, but it can also make navigation, responsiveness, text readability, accessibility, and project metadata harder to get right. A gallery-first approach gives the portfolio a stronger information architecture before the 3D scene becomes the signature interaction.

## Phase 1: Interactive Gallery Foundation

Upgrade the current Hub cards into a more expressive project gallery.

### Features

- Project filters:
  - `3D`
  - `Motion`
  - `Forms`
  - `Server Actions`
  - `Editorial`
  - `WebGL`
  - `Glass UI`
  - `Compliance`
- Technical badges per project.
- Stronger project summaries focused on what each page demonstrates.
- Hover states that reveal stack, interaction type, and visual direction.
- A compact "case study" affordance for each project.

### Why This Comes First

This phase improves the portfolio immediately without adding much rendering risk. It also gives the future 3D scene a clean data model to consume.

## Phase 2: Live Project Previews

Each project card should include a small animated preview that hints at the page's identity.

### Preview Ideas

- `Densify`: compact liquid glass panel with refracted gradient movement.
- `LegisFlow`: compliance timeline or connected regulatory nodes.
- `Cinematic Ink & Concrete`: moving book spines, page strips, or archive shelves.
- `Drafted Obsidian`: coordinate grid, blueprint markers, and spec-line animation.
- `Sculpted Silence`: slow editorial image crop, fabric-like mask, or atelier typography.
- `Spectral Core`: mini WebGL core, simplified shader, or CSS fallback glow object.

### Implementation Note

Previews do not all need full canvases. Use CSS and Framer Motion where possible, and reserve WebGL for moments where it adds real value.

## Phase 3: 3D Hub Navigation

Turn the Hub into a spatial gallery using React Three Fiber.

### Concept

A dark exhibition space or orbital archive where each project is represented as an object:

- `Spectral Core`: neon reactive polyhedron.
- `Densify`: translucent glass slab or refractive capsule.
- `LegisFlow`: structured legal monolith with connected nodes.
- `Drafted Obsidian`: black technical prism with orange measurement lines.
- `Cinematic Ink`: concrete/book-like block with warm edge light.
- `Sculpted Silence`: soft stone/fabric form with restrained atelier material.

### Interactions

- Hover an object:
  - object brightens
  - material shifts
  - metadata panel updates
  - matching 2D card becomes active
- Click an object:
  - camera eases toward the project
  - route transition begins
- Drag/orbit:
  - inspect the collection spatially
- Keyboard navigation:
  - cycle through projects
  - open selected project

### Technical Stack

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`
- `postprocessing`
- `framer-motion`

## Phase 4: Case Study Mode

Add a technical layer that makes the portfolio stronger for clients and recruiters.

### Per Project

- Objective
- Visual direction
- Interaction highlights
- Stack used
- Notable implementation details
- Links to route and internal docs

This can be displayed as a side panel in the Hub and optionally as a footer or drawer inside each landing page.

## Phase 5: Page Transitions

Connect the Hub and project pages with project-colored transitions.

### Ideas

- Color wipe based on project accent.
- WebGL-like scan transition.
- Camera zoom into selected object before navigation.
- Minimal fallback transition for reduced-motion users.

## Architecture Direction

Use the current `PROJECTS` array as the single source of truth, then expand it with fields that both the 2D gallery and 3D scene can consume.

Suggested future fields:

```ts
{
  slug: "/SpectralCore",
  category: "Interactive / 3D",
  name: "Spectral Core",
  description: "...",
  tag: "WEBGL",
  accent: "#d7ff3f",
  technologies: ["Three.js", "React Three Fiber", "Drei", "Postprocessing"],
  capabilities: ["3D", "WebGL", "Motion", "Interaction"],
  visualModel: "polyhedron",
  complexity: {
    ui: 3,
    motion: 4,
    threeD: 5,
    backend: 1,
  },
}
```

This avoids duplicating metadata between cards, filters, previews, and 3D objects.

## Risk Notes

- Full 3D navigation can hurt usability if text and routing are secondary.
- Multiple canvases can get expensive fast. Prefer one main canvas and lightweight CSS previews.
- Mobile needs a simpler interaction model. Tap selection should be clear, and the 2D list must remain usable.
- Reduced-motion users need a non-orbital path through the same content.
- The Hub should still load fast. Heavy 3D assets should be lazy-loaded or procedural.

## Best Next Step

Start with Phase 1 and Phase 2 together:

- Add project tags and filters.
- Add a richer active-project detail panel.
- Add lightweight animated previews to the existing cards.
- Refactor project metadata so it can later drive the 3D scene.

After that, build the 3D Hub as a focused layer on top of a stronger gallery, not as a replacement for the entire information structure.

