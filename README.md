# EVInsights Hub — PostgreSQL Full-Stack Demo

EVInsights Hub is a Next.js full-stack EV catalog demo with a **real PostgreSQL database** and direct SQL access through `pg` (node-postgres). **Prisma is not used. Automation/discovery pipelines are not included.**

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- PostgreSQL
- `pg` / node-postgres
- Next.js Route Handlers for the backend API
- Custom i18n runtime with 11 languages
- Global currency conversion across price UI

## Demo data

The SQL seed contains:

- 5 EVs
- 5 brands
- 16 variants
- 16 pricing records
- battery/performance/dimensions/safety/features records
- charging records
- media/source records
- 5 articles
- 5 reviews
- 11 demo markets

## PostgreSQL setup

1. Create an empty PostgreSQL database.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL`.
4. Install packages:

```bash
npm install
```

5. Create the schema and seed the demo data:

```bash
npm run db:setup
```

6. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Database files

- `database/schema.sql` — relational PostgreSQL schema and indexes
- `database/seed.sql` — demo data inserts
- `scripts/db-init.mjs` — schema installer
- `scripts/db-seed.mjs` — seed runner
- `scripts/data-check.mjs` — SQL database integrity/count check

## Important

The app no longer reads vehicle data from JSON files. PostgreSQL is the runtime data store.

The vehicle detail page is a reusable template for every vehicle and includes gallery, price, range, battery, performance, variants, charging, safety, features, reviews, sources, markets and similar EVs.

The header language selector updates the visible site UI and supports:
English, Hindi, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese and Arabic (RTL).

The currency selector updates all price components across the site, including vehicle cards, vehicle detail pages, variants, comparison and the charging calculator.
