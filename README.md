# Jagadeesh Mandala — Interactive Portfolio

A scroll-driven 3D portfolio: one continuous Three.js world that changes shape as you move through eight chapters of an engineering career.

**Stack:** Vite · React 19 · TypeScript · Three.js + React Three Fiber · GSAP ScrollTrigger · lucide-react. The design system is plain CSS in `src/styles/global.css`.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
npm run deploy     # publish dist/ to GitHub Pages
```

## How it works

| Chapter | DOM section | 3D formation (stop) |
|---|---|---|
| 01 Intro | `#intro` | 0 · core sphere, orbit ring, wireframe icosahedron |
| 02 Journey | `#journey` | 1 · rising path with six milestone nodes |
| 03 Skills | `#skills` | 2 · six linked clusters; camera travels to the one being read |
| 04 Experience | `#experience` | 3 · four architecture layers joined by service pipes |
| 05 Projects | `#project-latte`, `#project-nemo` | 4 · two-speaker waveform · 5 · gateway, six services, three LLM providers |
| 06 Principles | `#principles` | 6 · chaos settling into a lattice as you read |
| 07 Future | `#future` | 7 · wide horizon grid |
| 08 Contact | `#contact` | 8 · a single calm ring |

- **One canvas, one particle system.** `src/three/formations.ts` generates each formation procedurally, with a fixed seed so every run looks the same. The vertex shader in `ParticleField.tsx` morphs particles between formations with a per-particle stagger.
- **One scroll controller.** `src/lib/useStoryScroll.ts` creates every ScrollTrigger inside a `gsap.context`, and all of them are reverted on unmount. ScrollTrigger writes progress into a mutable store (`src/lib/story.ts`). The render loop (`CameraRig.tsx`) smooths that progress and works out the camera from it. This means no React re-renders while scrolling, and the same scroll position always gives the same frame in either direction.
- **No scroll hijacking and no pinning.** Scrolling is native, anchors are real links, and deep links such as `/#projects` are honoured after the app loads.
- **Origin and Skills sub-steps:** the camera rides the path to the waypoint being read (a beacon marks it), and travels the skills ring to the active cluster, whose signature tools light up.
- **Content lives in the DOM** (`src/data/portfolio.ts`). WebGL is decoration only and is code-split.

## Fallbacks and performance

- **Reduced motion:** the camera does not travel, drift and reveal animations are off, chapters snap between formations, and frames render only when something changes.
- **No WebGL, context loss or a render error:** a static CSS backdrop is shown and all content stays readable.
- **Particle budget** is set by device tier (16k desktop / 9k tablet / 5k mobile), and cut by 40% on CPUs with four or fewer cores. Pixel ratio is capped. There are no shadows, post-processing or textures.
- **Mobile** gets its own layout: a centred subject lifted above the text, a vertical readability veil, and no pointer parallax.

## Editing content

Everything shown on the site lives in `src/data/portfolio.ts`. The Resume link serves `public/Jagadeesh-Mandala-Resume.pdf`.

## Known limitations

- Tested only in headless Chromium with a software renderer (SwiftShader). Not yet tested on real phones or GPUs.
- `robots.txt` only takes effect at a domain root, so on `github.io/live/` it does nothing until you use a custom domain.
- The canonical, Open Graph and sitemap URLs assume `https://jagadeeshm007.github.io/live/`.
