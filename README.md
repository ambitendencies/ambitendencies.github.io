# Signal Through Noise

A six-chapter personal website for Ben, built with React 19, TypeScript 7, GSAP 3.15 and Motion 13.2. Dependency versions are pinned and the lockfile is committed to the project files.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. `npm run build` checks TypeScript and creates the static production site in `dist`. `npm run preview` serves that build locally.

## Edit

- `src/content.ts`: public contact address, work descriptions, draft writing.
- `src/styles.css`: design tokens, typography and responsive layouts.
- `src/components/Compression.tsx`: reversible six-stage SVG scroll sequence.
- `public/assets`: generated artwork, separate from native HTML text and controls.
- `design`: six generated concept references and implementation notes.

Contact uses contact@benjamintmetcalfe.com. Writing is explicitly labeled a concept draft; work categories are illustrative descriptions awaiting real project links. No backend is required. Fonts are self-hosted.

Motion respects the operating system preference and can be reduced with the page control. Reduced mode removes scroll pinning and shows the completed signal. The writing dialog and accordion use native semantic controls.
