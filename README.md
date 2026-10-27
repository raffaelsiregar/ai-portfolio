# Raffael — Portfolio

A dark, Apple-inspired portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. System fonts use SF Pro on supported Apple devices, with native sans-serif fallbacks elsewhere. All visuals are local screenshots, the supplied photo, SVG, and CSS; no external fonts or image services are required.

## Develop

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

Edit `src/lib/portfolio.ts` to update your name, role, email, social links, and project content. Empty social links stay hidden. Adding an email changes the contact form from a local text-file download to a prefilled draft in the visitor's email app. No messages are sent automatically and no visitor data is stored on a server.

The portfolio lists eleven real projects: five released, three in development, and three upcoming. Project cards filter by release status. All projects initially shows six entries, with an animated More/Less control for the full collection. Status badges sit below screenshots in their own high-contrast row. Released projects link to their live URLs; some require sign-in. Upcoming projects deliberately have no fabricated screenshots or demos. Interface copy is in `src/components/portfolio.tsx`; design tokens and responsive styles are in `src/app/globals.css`.

Images live in `public/projects/`. ezScan and the church site were captured from their local apps. MFD Usage Report and RNS Sales CRM use local sample-data captures. WorshipNow, Stock Research Copilot, and AGClub reuse existing screenshots from their project folders. PraiseNow was captured from its native macOS development build; its target platform is Windows. Each project dialog explains its screenshot source and status. The supplied profile photo is `public/profile.png`.

## Verify and build

```sh
npm run typecheck
node scripts/check-portfolio.mjs
npm run build
```

The production build uses Webpack and exports a static site to `out/`. Deploy that directory to any static host. `next start` does not serve a static export. `.openai/hosting.json` contains the associated private Sites project configuration.

```sh
npm run format
```

The site includes project filters, native accessible dialogs with keyboard focus management, reduced-motion support, responsive layouts, metadata, and an SVG favicon.

Sections and project cards reveal once as they enter the viewport. Project dialogs use a scale-and-fade entrance. Both respect reduced-motion preferences. WhatsApp, LinkedIn, and email links appear in the contact section and footer; the contact form opens a draft addressed to the configured email.

The hero doughnut rotates in 3D around a fixed center: drag horizontally to turn it and vertically to tilt it, or focus the sculpture and use arrow keys. Its SVG wireframe is projected from 3D vertices, while surrounding labels and tokens remain independent of the drag. A slow idle rotation pauses after interaction so the chosen angle stays put. Reset, Home, and Escape restore the starting view and idle motion. Reduced-motion preferences disable idle motion while retaining direct rotation controls. A slow headline highlight and pointer-only accents on headings, cards, buttons, and icons add emphasis.

The services section presents Website Creation, Application Development, and AI Workflow Automation. The contact headline is bold with a stationary color shimmer; the hero highlight sweeps more slowly on a six-second cycle.
