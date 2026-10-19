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

The portfolio lists ten real projects: five released, two in development, and three upcoming. Project cards filter by release status. Released projects link to their live URLs; some require sign-in. Upcoming projects deliberately have no fabricated screenshots or demos. Interface copy is in `src/components/portfolio.tsx`; design tokens and responsive styles are in `src/app/globals.css`.

Images live in `public/projects/`. ezScan and the church site were captured from their local apps. MFD Usage Report and RNS Sales CRM use local sample-data captures. WorshipNow and Stock Research Copilot reuse existing screenshots from their project folders. PraiseNow was captured from its native macOS development build; its target platform is Windows. Each project dialog explains its screenshot source and status. The supplied profile photo is `public/profile.png`.

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
