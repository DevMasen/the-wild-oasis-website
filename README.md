# The Wild Oasis

Luxury cabin booking website built with Next.js 14, React, and Supabase. Browse cabins, pick reservation dates, and manage your guest profile.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)](https://supabase.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.x-000000?logo=nextauth.js)](https://next-auth.js.org/)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Architecture](#project-architecture)
- [Usage Guide](#usage-guide)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Roadmap & Known Limitations](#roadmap--known-limitations)
- [Contributing](#contributing)

---

## About

The Wild Oasis is a hotel/cabin booking frontend for browsing luxury cabins in the Italian Dolomites, selecting reservation dates, and managing a guest account. It is built with the Next.js 14 App Router in plain JavaScript (no TypeScript) and uses Supabase as its backend database.

The project follows a server-first data-fetching model: pages are Server Components that query Supabase directly, keeping secrets server-side, while interactivity (date picking, filtering, form submission) is isolated to Client Components.

> **Status:** The latest commit (`f908eb4`, "E489: feat: creating a new reservation. project feature complete") marks the core feature set as complete. There is no test framework installed; verification is `lint` then `build`.

---

## Features

### Cabin browsing

- **Home page** (`/`) — hero image with blur placeholder and a call-to-action to explore cabins.
- **Cabins listing** (`/cabins`) — server-rendered cabin grid with ISR (`revalidate = 3600`), capacity filtering via the URL (`?capacity=all|small|medium|large`), and Suspense streaming with a spinner fallback.
- **Cabin detail** (`/cabins/[cabinId]`) — dynamic metadata title, SSG via `generateStaticParams()`, price with discount strike-through, guest capacity, and a `notFound()` 404 for invalid IDs.

### Booking flow

- **Date selection** (`DateSelector`) — `react-day-picker` range picker that disables past dates and already-booked dates, with min/max booking length from settings and a live price total.
- **Reservation form** (`ReservationForm`) — guest count and observations, submitted through a Server Action (`createBooking`) that creates the booking, revalidates the cabin page, and redirects to a thank-you page.
- **Thank-you page** (`/cabins/[cabinId]/thankyou`) — confirmation with a link to manage reservations.

### Guest account (protected by middleware)

- **Sign in** (`/login`) — Google OAuth via NextAuth; on first login a guest record is created automatically.
- **Account landing** (`/account`) — welcome message; route protected by NextAuth middleware.
- **Profile** (`/account/profile`) — update national ID, nationality, and country flag via a Server Action; country select is a Server Component passed as a child of a Client Component form.
- **Reservations** (`/account/reservations`) — list of a guest's bookings with past/upcoming badges, night counts, prices, and optimistic delete with confirmation.

### UI & performance

- Styling with Tailwind CSS using a custom `primary`/`accent` palette.
- `next/image` for all images (remote Supabase storage and Google profile images allow-listed in `next.config.mjs`).
- Self-hosted `Josefin_Sans` font via `next/font/google`.
- Loading UI (`loading.js`, `Spinner`), error boundary (`error.js`), and not-found UI (`not-found.js`).
- Client/server boundaries are explicit — only components that need browser APIs or hooks are marked `"use client"`.

---

## Technology Stack

| Category           | Technology                                        | Purpose                               |
| ------------------ | ------------------------------------------------- | ------------------------------------- |
| Framework          | Next.js 14.2.35 (App Router)                      | Routing, rendering, SSR/ISR/SSG       |
| UI language        | React 18, plain JavaScript                        | Component library                     |
| Styling            | Tailwind CSS 3.4                                  | Utility-first CSS with custom palette |
| Backend / database | Supabase (PostgreSQL) via `@supabase/supabase-js` | Data queries and mutations            |
| Authentication     | NextAuth.js 5 (Google provider)                   | Sign-in, sessions, route protection   |
| Date picking       | `react-day-picker` + `date-fns`                   | Reservation date range selection      |
| Icons              | `@heroicons/react`                                | UI icons                              |
| Images / fonts     | `next/image`, `next/font/google`                  | Optimized images, self-hosted font    |
| Package manager    | npm (`package-lock.json`)                         | Dependency management                 |

Architectural choices verified in source:

- **Server Components by default** — data fetching happens in Server Components so Supabase keys never reach the browser. Environment variables are not `NEXT_PUBLIC`.
- **`"use client"` only where needed** — `Filter`, `DateSelector`, `ReservationForm`, `ReservationList`, `DeleteReservation`, `SubmitButton`, `TextExpander`, `SideNavigation`, `ReservationContext`, and `error.js` are Client Components.
- **Server Actions** — `app/_lib/actions.js` (`"use server"`) handles sign in, sign out, create/update/delete bookings, and profile updates.
- **URL as shared state** — cabin capacity filter lives in `?capacity=` and is persisted via `router.replace`.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (the project uses `package-lock.json`)

### 1. Clone the repository

```bash
git clone <repository-url>
cd the-wild-oasis-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the repository root (it is gitignored and must not be committed):

```bash
SUPABASE_URL=your-supabase-project-url
SUPABASE_API_KEY=your-supabase-anon-key
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Production build and start

```bash
npm run build      # produces .next/ and out/
npm run start      # run the production server after building
# or both together
npm run prod
```

---

## Environment Variables

The following variables are read directly from `process.env` in the source and must be defined in `.env.local` (gitignored):

| Variable             | Source file              | Purpose                    | Required |
| -------------------- | ------------------------ | -------------------------- | -------- |
| `SUPABASE_URL`       | `app/_lib/supabase.js:3` | Supabase project URL       | Yes      |
| `SUPABASE_API_KEY`   | `app/_lib/supabase.js:4` | Supabase anon key          | Yes      |
| `AUTH_GOOGLE_ID`     | `app/_lib/auth.js:8`     | Google OAuth client ID     | Yes      |
| `AUTH_GOOGLE_SECRET` | `app/_lib/auth.js:9`     | Google OAuth client secret | Yes      |

All four are server-side only (they lack the `NEXT_PUBLIC_` prefix). Never commit `.env.local` or share actual values. Copy values from an existing local `.env.local` or ask the team.

---

## Project Architecture

### Routing (App Router, file-system based)

```
app/
  layout.js              Root layout: Josefin_Sans font, Header, ReservationProvider
  page.js                Home page
  loading.js             Global loading UI (Spinner)
  error.js               Client error boundary with "Try again"
  not-found.js           Root 404 UI
  login/
    page.js              Google sign-in page
  cabins/
    page.js              Cabin listing (ISR revalidate=3600, URL filter, Suspense)
    loading.js           Segment loading UI
    [cabinId]/
      page.js            Cabin detail + reservation (SSG params, dynamic metadata)
      thankyou/
        page.js          Booking confirmation page
  about/
    page.js              About page (ISR revalidate=86400, cabin count)
  account/
    layout.js            Sidebar layout (protected routes)
    page.js              Account landing ("Welcome, {name}")
    profile/
      page.js            Update guest profile (Server Action + SelectCountry child)
    reservations/
      page.js            Guest booking list (optimistic delete)
```

### Data flow

1. Server Components call Supabase through the centralized layer:
   - `app/_lib/supabase.js` — Supabase client singleton (reads `SUPABASE_URL` / `SUPABASE_API_KEY`)
   - `app/_lib/data-service.js` — all queries/mutations (`getCabins`, `getCabin`, `getBookings`, `createBooking`, `updateGuest`, `deleteBooking`, etc.)
2. Mutations go through Server Actions in `app/_lib/actions.js` (`signInAction`, `signOutAction`, `createBooking`, `updateBooking`, `deleteBooking`, `updateGuest`), which call `auth()` for authentication and revalidate/redirect as needed.
3. Authentication uses NextAuth with Google provider (`app/_lib/auth.js`); the `middleware.js` protects `/account` by reusing the NextAuth `auth` handler.
4. Client-side state (reservation date range) is shared via `ReservationContext` (`app/_components/ReservationContext.js`) mounted at the root layout.

---

## Usage Guide

### Browse and filter cabins

Visit `/cabins`. Choose a capacity filter (All, 2–3, 4–7, or 8–12 guests). The filter is stored in the URL (`?capacity=...`), so filtered results are linkable and survive refreshes. Click **Details & reservation →** on a cabin card to open its detail page.

### Reserve a cabin

1. On a cabin detail page, select check-in and check-out dates in the date picker. Past dates and already-booked dates are disabled.
2. Sign in with Google if prompted (required to create a booking).
3. Choose the number of guests and add optional observations.
4. Click **Reserve now**. On success you are redirected to a thank-you page with a link to manage your reservations.

### Manage your account

- Sign in at `/login` (Google). On first sign-in a guest profile is created automatically.
- Visit `/account/profile` to update your national ID, nationality, and country flag.
- Visit `/account/reservations` to view your bookings (past or upcoming) and edit or delete upcoming reservations.

---

## Scripts

All scripts are defined in `package.json`:

| Script  | Command                    | Description                                             |
| ------- | -------------------------- | ------------------------------------------------------- |
| `dev`   | `next dev`                 | Start dev server at `http://localhost:3000` (Turbopack) |
| `build` | `next build`               | Production build (outputs `.next/` and `out/`)          |
| `start` | `next start`               | Run production server (after `build`)                   |
| `lint`  | `next lint`                | ESLint with `next/core-web-vitals`                      |
| `prod`  | `next build && next start` | Build then start the production server                  |

There is **no test script** and no test framework installed. Verification is `npm run lint` followed by `npm run build`.

---

## Project Structure

```
the-wild-oasis-website/
├── app/
│   ├── _components/     Shared UI components (server + client)
│   ├── _lib/            supabase.js, data-service.js, auth.js, actions.js
│   ├── _styles/         globals.css (Tailwind)
│   ├── layout.js        Root layout (font, header, ReservationProvider)
│   ├── page.js          Home page
│   ├── loading.js       Global loading UI
│   ├── error.js         Error boundary
│   ├── not-found.js     Root 404 UI
│   ├── login/page.js    Google sign-in
│   ├── cabins/          Cabin listing + detail + thankyou
│   ├── about/           About page
│   └── account/         Guest account (profile, reservations)
├── public/              Local images (bg.png, logo.png, about-1.jpg, about-2.jpg)
├── next.config.mjs      Next.js config (image remote patterns)
├── tailwind.config.js   Tailwind config (primary/accent palette)
├── .prettierrc.json     Prettier + tailwind plugin config
├── jsconfig.json        Path alias "@/*" → repo root
├── package.json         Scripts and dependencies
├── package-lock.json    Locked dependency tree
├── middleware.js        NextAuth route protection for /account
├── .env.local           Environment variables (gitignored, not committed)
└── README.md
```

Generated directories `.next/` and `out/` are gitignored. The `starter/` folder is a leftover course starter and is not used by the active App Router.

---

## Roadmap & Known Limitations

Limitations observed in the source (not bugs, but scope boundaries):

- **No test suite** — no test framework or test script exists; verification is lint + build only.
- **Environment variables not committed** — `.env.local` is gitignored; you must supply your own Supabase and Google OAuth credentials before the app can connect to data or authenticate.
- **Image host allow-list** — remote images only work for hosts listed in `next.config.mjs` `images.remotePatterns` (Supabase storage and Google user images). Adding another image host requires a config change or builds will fail.
- **Course-project provenance** — commit subjects carry course-exercise labels (E422–E489); treat the project as a learning implementation rather than a production-ready SaaS.

No future roadmap or planned changes are documented in the repository, so none are listed here.

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Follow the existing commit style from history: `<exercise>: <type>: <description>` (e.g. `E467: feat: data fetching strategies`).
3. Keep `"use client"` limited to components that need browser APIs/hooks; fetch data in Server Components.
4. Add any new remote image host to `next.config.mjs` `images.remotePatterns`.
5. Run `npm run lint` and `npm run build` before opening a pull request (there is no test suite).

Do not commit `.env.local` or any secrets.
