# Jagadeesh Mandala — Professional Portfolio

A light, editorial single-page portfolio. The design is inspired by the original site on the `legacy-portfolio` branch (white paper, fine grid, monospaced type, black rules, one red accent). The content is professional only: experience, skills, projects and contact.

**Stack:** Vite · React 19 · TypeScript · plain CSS · lucide-react. There is no 3D or animation library; the cube is pure CSS 3D, and scroll reveals use IntersectionObserver.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build → dist/
npm run deploy     # publish to GitHub Pages at /live/pro/
```

## Editing content

All text lives in `src/data/portfolio.ts`: hero pitches per audience, availability, impact numbers, experience highlights, skills, projects and working principles. Components only render that data.

## Accessibility

- Semantic sections with headings, and a skip link.
- Keyboard-accessible audience tabs (arrow keys) and a mobile menu.
- Experience details use native `<details>`.
- `prefers-reduced-motion` turns off all animation, including the cube spin.
- Content is fully visible without JavaScript-driven reveals.

## Branches

| Branch | Site | Served at |
|---|---|---|
| `main` | Scroll-driven 3D portfolio | `/live/` |
| `legacy-portfolio` | Original portfolio | `/live/legacy/` |
| `professional-portfolio` | This site | `/live/pro/` (after `npm run deploy`) |
