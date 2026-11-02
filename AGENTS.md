<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-space-client

Next.js 16 (App Router) client for a studio-booking app. The API server lives in the sibling directory `../studio-space-server` (Express 5 + MongoDB); it is **not** part of this repo.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint 9 flat config, lints the whole cwd (no args needed)
- `npm run build` — production build
- There is **no test or typecheck step**. Verification = `npm run lint`, plus `npm run build` when unsure.
- `npm run lint` currently fails with 2 pre-existing errors (`react-hooks/set-state-in-effect` in `src/components/ui/carousel.jsx` and `src/hooks/use-mobile.js`) — not yours. `no-img-element` warnings are accepted convention: studio images are arbitrary DB URLs, so pages use plain `<img>` (switching to `next/image` would require `remotePatterns` config).

## Stack quirks (would break a naive agent)

- **JavaScript only** — `.js`/`.jsx`, `jsconfig.json`. No TypeScript, no `tsx`.
- Next.js 16 is newer than your training data; consult `node_modules/next/dist/docs/` for Next-specific APIs.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.mjs`). Avoid patterns it forbids (e.g. mutating refs/props during render).
- **Tailwind v4, CSS-first**: no `tailwind.config`, no PostCSS config. CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.mjs`; theme tokens live in `src/app/globals.css` (`@theme inline`). Don't add config files for Tailwind.
- **shadcn UI uses style `base-nova`** (`components.json`): primitives are `@base-ui/react`, **not Radix**. Components import `cn` from the `cn` package (re-exported at `src/lib/utils.js`), not from a local clsx/tailwind-merge helper. Add new UI components with `npx shadcn add <name>` (keeps `.jsx` because `tsx: false`).
- Path alias: `@/*` → `./src/*`.

## Backend dependency

- All data fetching calls `http://localhost:5000` **hardcoded** (no env var; `.env*` is gitignored and currently unused). To see real data, run `node index.js` in `../studio-space-server` (needs its `.env` with `MONGODB_URL`).
- Server pages fetch with `{ cache: "no-store" }` in try/catch and fall back to empty arrays/empty states when the API is down — preserve that pattern.

## Structure & conventions

- Routes: `/`, `/studios`, `/studios/[id]`, and `/dashboard` (Sidebar layout + sonner `Toaster`) with `add-studio`, `my-listings`, `my-bookings` underneath.
- Most pages are server components; only interactive leaves get `"use client"` (e.g. `dashboard/add-studio/page.jsx`).
- Shared Navbar and Sidebar live in `src/components/ui/shared/` (not a separate `shared/` root).
- Pages use a hardcoded brand palette (lime `#C2F800` / `#91B900` accents, `#F8F9F6` page background) instead of the shadcn theme tokens — match it when adding pages.
