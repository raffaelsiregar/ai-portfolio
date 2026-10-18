# Raffael — Portfolio

A dark, Apple-inspired portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. System fonts use SF Pro on supported Apple devices, with native sans-serif fallbacks elsewhere. All visuals are local SVG and CSS; no external fonts or image services are required.

## Develop

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

Edit `src/lib/portfolio.ts` to update your name, role, email, social links, and project content. Empty social links stay hidden. Adding an email changes the contact form from a local text-file download to a prefilled draft in the visitor's email app. No messages are sent automatically and no visitor data is stored on a server.

The three projects are explicitly labeled concepts. Their previews are interactive demonstrations: run Flowstate, complete Orbit tasks, or search Clarity files. Replace these concepts with your actual work when ready. Interface copy and preview components are in `src/components/portfolio.tsx`; design tokens and responsive styles are in `src/app/globals.css`.

## Verify and build

```sh
npm run typecheck
npm run build
```

The production build uses Webpack and exports a static site to `out/`. Deploy that directory to any static host. `next start` does not serve a static export. `.openai/hosting.json` contains the associated private Sites project configuration.

```sh
npm run format
```

The site includes project filters, native accessible dialogs with keyboard focus management, reduced-motion support, responsive layouts, metadata, and an SVG favicon.
