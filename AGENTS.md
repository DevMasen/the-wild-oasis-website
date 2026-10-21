# the-wild-oasis-website

Next.js 14 App Router (plain JavaScript, no TypeScript) hotel-booking site backed by Supabase.

## Commands

- `npm run dev` — dev server at `http://localhost:3000` (Turbopack)
- `npm run build` — production build (`.next/`, `out/`)
- `npm run start` — production server (run after `build`)
- `npm run lint` — ESLint with `next/core-web-vitals`
- `npm run prod` — `next build && next start`

There is **no test script** and no test framework installed, so there are no tests to run. Verification = `lint` then `build`.

## Environment

`.env.local` (gitignored, not committed) must define:
- `SUPABASE_URL`
- `SUPABASE_API_KEY`

These power the Supabase client singleton at `app/_lib/supabase.js:6`. Vars are **not** `NEXT_PUBLIC`, so they stay server-side only. Copy values from an existing local `.env.local` or ask the team — do not guess or commit them.

## Structure

- `app/layout.js` — root layout, `next/font` Josefin_Sans, `ReservationProvider` wrapper
- `app/page.js` — home page
- `app/_components/` — UI components (`ReservationContext`, forms, cards, navigation)
- `app/_lib/` — `supabase.js` client, `data-service.js` Supabase queries/mutations
- `app/_styles/globals.css` — global styles
- `app/cabins/[cabinId]/`, `app/account/*` — dynamic and nested routes
- `@/*` alias → repo root (see `jsconfig.json`), e.g. `import supabase from "@/app/_lib/supabase"`

Styling is Tailwind with a custom `primary`/`accent` palette (`tailwind.config.js`) and `prettier-plugin-tailwindcss` (`.prettierrc.json`).

Images use `next/image`. Local assets live in `public/`; remote cabin images come from the Supabase storage host allow-listed in `next.config.mjs`. Add any new image host to `next.config.mjs` `images.remotePatterns` or builds will fail.

## Conventions

- Data fetching: server components call Supabase via `app/_lib/data-service.js`; missing records use `notFound()` from `next/navigation`.
- Client components (`"use client"`) wrap interactivity; page/server boundaries are mixed intentionally — follow the existing pattern per route rather than making everything a client component.
- Commit style from history: `<exercise>: <type>: <description>`, e.g. `E467: feat: data fetching strategies`.
- `starter/` is a leftover course starter (`pages/`, `components/`, `others/`) and is **not** used by the active App Router — do not add features there.

No CI workflows, pre-commit config, `.kilo`, or other instruction files exist in the repo.