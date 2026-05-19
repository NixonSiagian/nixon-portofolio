# Nixon Siagian — Portfolio

Premium developer portfolio with a modern DevOps engineer aesthetic.

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS, glassmorphism, custom dark theme
- **Animations:** Framer Motion (scroll-triggered, micro-interactions)
- **3D:** Three.js — animated particle + wireframe icosahedron background, lazy-loaded and mobile-optimized
- **Data:** Live GitHub stats and top repositories pulled from the GitHub REST API

## Sections

1. Hero — name, title, tagline, CTAs, interactive 3D background
2. About — DevOps mindset, infrastructure focus, automation
3. Featured Projects — top public repos from GitHub, sorted by stars
4. Tech Stack — Node.js, Docker, Linux, TypeScript, GitHub Actions, etc.
5. GitHub Activity — profile stats, contribution graph, language breakdown
6. Contact — GitHub, LinkedIn, Email

## Performance & Mobile

- 3D background lazy-loaded with `next/dynamic` (`ssr: false`)
- Reduced particle count and DPR on mobile
- `requestAnimationFrame` loop pauses when tab is hidden or hero is offscreen
- `prefers-reduced-motion` respected globally
- Mouse-glow effect disabled on touch devices
- Images optimized via `next/image`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Optimized for Vercel — zero config required.

```bash
npm run build
npm start
```
