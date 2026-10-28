# The Wild Oasis — Pre-release v0.1.0

**Project:** the-wild-oasis-website  
**Version:** 0.1.0 (pre-release)  
**Status:** Course project in progress — functional browsing, partial booking/write flow  
**Released:** 2026-10-28  

---

## About

The Wild Oasis is a hotel/cabin booking frontend built with **Next.js 14 App Router** (plain JavaScript, no TypeScript) backed by **Supabase** (PostgreSQL). Guests can browse luxury cabins, view cabin details, pick reservation dates, and manage a guest account/profile.

> ⚠️ This is a pre-release / work-in-progress build. Reading/browsing features are complete; the write/booking flow is only partially wired (reservation form renders but has no submission handler; reservations page shows a hard-coded empty list; profile form inputs are disabled). Not yet a production app.

---

## What's included

### Core features
- **Home page** — hero image (`next/image`, blur placeholder) with CTA to cabins listing.
- **Cabins listing** (`/cabins`) — server-rendered list of cabins with ISR (`revalidate = 3600`), capacity filtering via URL (`?capacity=...`), streaming via `Suspense`, and client-side `Filter` with `router.replace`.
- **Cabin detail** (`/cabins/[cabinId]`) — dynamic metadata (`generateMetadata`), SSG via `generateStaticParams()`, `notFound()` for bad IDs, Suspense-streamed reservations section.
- **About page** (`/about`) — cabin count with ISR (`revalidate = 86400`).
- **Account shell** (`/account/*`) — nested layout with sidebar, landing page, profile page, reservations page.
- **Reservation UI** — date range picker (`DateSelector` + `react-day-picker`), reservation form (guest count, observations), reservation cards with status/past/upcoming badges (`date-fns`).
- **Images & fonts** — `next/image` everywhere (remote Supabase storage host allow-listed in `next.config.mjs`), self-hosted `Josefin_Sans` via `next/font/google`.
- **Loading & error UI** — root `loading.js`/`error.js`, segment `loading.js`, root/segment `not-found.js`.

### Data layer
- Supabase client singleton at `app/_lib/supabase.js` (server-side only; env vars are **not** `NEXT_PUBLIC`).
- Centralized queries/mutations in `app/_lib/data-service.js`: `getCabins`, `getCabin`, `getCabinPrice`, `getGuest`, `getBooking`, `getBookings`, `getBookedDatesByCabinId`, `getSettings`, `getCountries`, plus `createGuest`, `createBooking`, `updateGuest`, `updateBooking`, `deleteBooking`.

### Stack
| Layer | Tech |
|---|---|
| Framework | Next.js 14.2.35 (App Router) |
| UI | React 18, plain JavaScript |
| Styling | Tailwind CSS (custom `primary`/`accent` palette) |
| Backend | Supabase (`@supabase/supabase-js` ^2.117.3) |
| Date picking | `react-day-picker` ^8.10.2 |
| Date utils | `date-fns` ^3.6.0 |
| Icons | `@heroicons/react` ^2.2.0 |
| Auth | `next-auth` ^5.0.0-beta.32 (installed, not wired) |

### Scripts
- `npm run dev` — dev server at `http://localhost:3000` (Turbopack)
- `npm run build` — production build (`.next/`, `out/`)
- `npm run start` — production server (run after `build`)
- `npm run lint` — ESLint with `next/core-web-vitals`
- `npm run prod` — `next build && next start`

---

## Known limitations (pre-release)

- **Booking submission** — `ReservationForm` has a submit button but no handler; `createBooking`/`updateBooking`/`deleteBooking` exist in `data-service.js` but are not invoked from any UI.
- **Reservations list** — `account/reservations/page.js` hard-codes an empty bookings array.
- **Profile update** — `UpdateProfileForm` inputs are disabled; no submission.
- **Authentication** — no sign-in/sign-up/session flow; `SignOutButton` is static; `getGuest` looks up a guest by email but there is no auth UI.
- **No Server Actions / Route Handlers** — all data fetching is server-component direct Supabase calls; mutations are not wired to forms.
- **Working-tree changes** — `ReservationContext` wiring (layout, `DateSelector`) is uncommitted and not yet part of a release commit.

---

## Requirements

`.env.local` (gitignored, **do not commit**) must define:
- `SUPABASE_URL`
- `SUPABASE_API_KEY`

These stay server-side only (not `NEXT_PUBLIC`). Copy values from an existing local `.env.local` or ask the team — do not guess.

Any new remote image host must be added to `images.remotePatterns` in `next.config.mjs` or builds will fail.

There is **no test framework installed**; verification is `npm run lint` then `npm run build`.

---

## Roadmap (post-pre-release)

- Wire `ReservationForm`/delete booking to data-service mutations (Server Actions or route handlers).
- Connect `getGuest` to a real sign-in flow if auth is required.
- Populate the reservations list and enable profile updates.
- Decide static export (`output: "export"`) vs Node/server runtime — static export was tried and reverted (commit `94ba550`) because the app needs dynamic server data.

---

*Pre-release note generated from current source and `AGENTS.md`/`next_important_notes.txt`. See git history for per-commit details (E422–E467, HEAD `fb08b42`).*
