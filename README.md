# Jagadeesh Mandala — Professional Portfolio

A light, editorial single-page portfolio. The design is inspired by the original site on the `legacy-portfolio` branch (white paper, fine grid, black rules, one red accent). The content is professional only, and most of it is interactive so the page stays short: a before/after switch for the Go rewrite, working habits with proof, experience stories in tabs, a filterable toolkit and step-by-step project walkthroughs.

**Stack:** Vite · React 19 · TypeScript · plain CSS · lucide-react. There is no 3D or animation library; scroll reveals and count-ups use IntersectionObserver.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build → dist/
npm run deploy     # publish to GitHub Pages at /live/pro/
```

## Editing content

All text lives in `src/data/portfolio.ts`: hero pitches per audience, the rewrite numbers, working habits, experience stories, skills and projects. Components only render that data.

## Accessibility

- Semantic sections with headings, and a skip link.
- Every tab set (audience, habits, stories, project steps) works with arrow keys, Home and End.
- `prefers-reduced-motion` turns off all animation.
- Content is fully visible without JavaScript-driven reveals.

## Branches

| Branch | Site | Served at |
|---|---|---|
| `main` | Scroll-driven 3D portfolio | `/live/` |
| `legacy-portfolio` | Original portfolio | `/live/legacy/` |
| `professional-portfolio` | This site | `/live/pro/` (after `npm run deploy`) |
