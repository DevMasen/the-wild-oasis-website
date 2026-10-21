# Graph Report - the-wild-oasis-website  (2026-10-20)

## Corpus Check
- 52 files · ~321,090 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 209 nodes · 276 edges · 35 communities (14 shown, 21 thin omitted)
- Extraction: 93% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Package Config & Dependencies
- Cabins Data Service
- Shell Layout & Navigation
- Account Reservations UI
- Reservation Form & Dates
- Cabins Listing Page
- Cabin Detail Page
- Account Profile Page
- Home Page & Backgrounds
- Dev Dependencies
- Next.js App Router Docs
- Data Layer Notes
- Images & Fonts Notes
- About Hero Image
- Account Page
- ESLint Config
- JSConfig
- Next Config
- Booking Domain Notes
- PostCSS Config
- Forms & Mutations Notes
- Prettier Config
- Reservation Provider Notes
- App Icon Logo
- Auth Notes
- About Cabin Group Photo
- Logo Image

## God Nodes (most connected - your core abstractions)
1. `next` - 14 edges
2. `Spinner()` - 9 edges
3. `Reservations()` - 7 edges
4. `getCabins()` - 7 edges
5. `@heroicons/react` - 7 edges
6. `react` - 7 edges
7. `scripts` - 6 edges
8. `Background image - mountain cabin lodge (public/bg.png)` - 6 edges
9. `CabinList()` - 5 edges
10. `Filter()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Inter font` --conceptually_related_to--> `next/image and fonts`  [AMBIGUOUS]
  README.md → next_important_notes.txt
- `Page()` --calls--> `CabinList()`  [EXTRACTED]
  app/cabins/page.js → app/_components/CabinList.js
- `Page()` --calls--> `ReservationCard()`  [EXTRACTED]
  app/account/reservations/page.js → app/_components/ReservationCard.js
- `Page()` --calls--> `Reservations()`  [EXTRACTED]
  app/cabins/[cabinId]/page.js → app/_components/Reservations.js
- `Page()` --calls--> `Spinner()`  [EXTRACTED]
  app/cabins/[cabinId]/page.js → app/_components/Spinner.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Server/Client component boundary** — agents_server_components, agents_client_components, agents_reservation_provider [INFERRED 0.85]
- **Rendering strategies SSR/ISR/SSG** — agents_isr, agents_ssg, next_important_notes_rendering_strategies [INFERRED 0.85]
- **Server data layer** — agents_data_service, agents_supabase_client, next_important_notes_data_layer [INFERRED 0.90]
- **Winter retreat scene composition** — public_about_1_cabin, public_about_1_campfire, public_about_1_winter_retreat [INFERRED 0.85]
- **Mountain lodge retreat scene** — public_bg_cabin, public_bg_lake_reflection, public_bg_mountains, public_bg_pine_forest [INFERRED 0.85]

## Communities (35 total, 21 thin omitted)

### Community 0 - "Package Config & Dependencies"
Cohesion: 0.08
Nodes (24): dependencies, date-fns, @heroicons/react, next, react, react-day-picker, react-dom, @supabase/supabase-js (+16 more)

### Community 1 - "Cabins Data Service"
Cohesion: 0.11
Nodes (9): metadata, Page(), revalidate, generateStaticParams(), CabinCard(), CabinList(), getCabins(), supabase (+1 more)

### Community 2 - "Shell Layout & Navigation"
Cohesion: 0.17
Nodes (8): Header(), Logo(), Navigation(), ReservationProvider(), josefin, metadata, RootLayout(), next

### Community 3 - "Account Reservations UI"
Cohesion: 0.22
Nodes (10): Layout(), metadata, Page(), DeleteReservation(), formatDistanceFromNow(), ReservationCard(), navLinks, SideNavigation() (+2 more)

### Community 4 - "Reservation Form & Dates"
Cohesion: 0.21
Nodes (10): DateSelector(), initialState, ReservationContext, useReservation(), ReservationForm(), Reservations(), getBookedDatesByCabinId(), getSettings() (+2 more)

### Community 5 - "Cabins Listing Page"
Cohesion: 0.25
Nodes (9): Loading(), metadata, Page(), revalidate, Button(), Filter(), handleFilter(), Spinner() (+1 more)

### Community 6 - "Cabin Detail Page"
Cohesion: 0.31
Nodes (6): generateMetadata(), Page(), Cabin(), TextExpander(), getCabin(), react

### Community 7 - "Account Profile Page"
Cohesion: 0.43
Nodes (5): metadata, Page(), SelectCountry(), UpdateProfileForm(), getCountries()

### Community 8 - "Home Page & Backgrounds"
Cohesion: 0.25
Nodes (6): Background image - mountain cabin lodge (public/bg.png), Modern wooden cabin lodge on lake deck, Calm lake with cabin reflection, Contemporary glass-and-wood architecture, Misty mountain peaks in background, Pine forest surrounding the cabin

### Community 9 - "Dev Dependencies"
Cohesion: 0.29
Nodes (7): devDependencies, eslint, eslint-config-next, postcss, prettier, prettier-plugin-tailwindcss, tailwindcss

### Community 10 - "Next.js App Router Docs"
Cohesion: 0.40
Nodes (3): create-next-app, Next.js framework, Vercel deployment

### Community 13 - "Images & Fonts Notes"
Cohesion: 0.50
Nodes (3): next/image optimization, next/image and fonts, Inter font

### Community 14 - "About Hero Image"
Cohesion: 0.83
Nodes (4): About page hero image, Cozy A-frame cabin, Campfire gathering, Winter mountain retreat

### Community 20 - "Booking Domain Notes"
Cohesion: 0.67
Nodes (3): cabin/hotel booking domain, Jonas Schmedtmann Ultimate React course, git development history (24 commits)

## Ambiguous Edges - Review These
- `Inter font` → `next/image and fonts`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `next/core-web-vitals`, `react-dom`, `eslint`, `eslint-config-next`, `postcss` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 105 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Shell Layout & Navigation` to `Package Config & Dependencies`, `Cabins Data Service`, `Account Reservations UI`, `Cabins Listing Page`, `Cabin Detail Page`, `Home Page & Backgrounds`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `react-dom`, `eslint` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Config & Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Cabin Detail Page` to `Package Config & Dependencies`, `Reservation Form & Dates`, `Cabins Listing Page`, `Account Profile Page`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Cabins Data Service` be split into smaller, more focused modules?**
  _Cohesion score 0.10869565217391304 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font` and `next/image and fonts`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._