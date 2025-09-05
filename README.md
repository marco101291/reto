# Form Builder — Technical Challenge (Fork)

This is my implementation of a **Form Builder** built on **Next.js (App Router) + TypeScript + Prisma + PostgreSQL**, styled with **Tailwind** and **shadcn/ui**. It includes a ready‑to‑run local setup (Docker for Postgres optional), an environment template, and a clean folder structure so reviewers can run and evaluate quickly.

> **Purpose**: this fork is used exclusively for the assigned challenge. Please avoid sharing credentials or sensitive data.

---

## What I Implemented

- **Form Builder foundation** (core UI, state, and persistence).
- **Field types** including **multiple‑option** fields.
- **Templates & “My Forms” tabs**, with template usage (background image + theme) and a **cover image** when creating forms.
- **Autosave** while editing and a **Reset preview** action.
- **Delete** action in the Forms tab, route updates, and styles/bug fixes.
- **TypeScript fixes** for metadata (e.g., `FormMeta`) to make sorting and updates type‑safe.

This yields an end‑to‑end flow: create from a template → customize fields → preview/reset → autosave while editing → list/open/delete in **My Forms**.

---

## Tech Stack & Why

- **Next.js (App Router) + TypeScript** — Server Components, nested layouts, and server actions speed up full‑stack iteration with type safety.
- **Tailwind + shadcn/ui** — Accessible primitives and consistent design tokens for fast, clean UI.
- **Prisma + PostgreSQL** — Type‑safe ORM and a solid relational DB; the repo ships with Docker Compose for local Postgres.
- **Optional Email/Stripe hooks** — Present in the template for auth/billing use cases; not required to run locally.

This selection prioritizes **speed**, **type safety**, and **DX** so the challenge focuses on product/problem‑solving rather than boilerplate.

---

## Prerequisites

- **Node.js 18+**
- **npm** or **pnpm** (both lockfiles exist; use one)
- **Docker** (optional, recommended for Postgres)

---

## Quickstart

```bash
# Clone
git clone https://github.com/marco101291/reto
cd reto

# Install deps (choose ONE)
npm install
# or
pnpm install

# Env file
cp .env.example .env
```

### Database (choose A or B)

**A) Docker (recommended)**
```bash
docker compose up -d
npx prisma migrate dev
# (fallback during local prototyping)
# npx prisma db push --accept-data-loss
```

**B) Local Postgres**
Install Postgres, create a superuser, and set `DATABASE_URL` accordingly; check Prisma docs or your OS package manager. Then run migrations:

```bash
npx prisma migrate dev
```

### Run the app

```bash
npm run dev
# or
pnpm dev
```

Open **http://localhost:3000**.

---

## Environment Variables

Copy `.env.example` to `.env` and fill as needed. The template documents DB + optional Email/Stripe variables (Email can use NodeMailer SMTP or Resend; Stripe can be left blank for local dev). If unconfigured, OTP/reset links are printed to the server console in dev.

---

## How to Use

1. **Create a form**
   - Use **Templates** to start with theme + background cover automatically applied, or start from **My Forms**.
2. **Edit fields**
   - Add/edit fields, including **multiple‑option** types; preview updates as you go.
3. **Autosave**
   - Changes are **autosaved**.
4. **Manage forms**
   - Open the **My Forms** tab to list, open, and **delete** forms.

---

## Project Structure (high‑level)

```
.
├─ app/                 # Next.js App Router (routes/layouts/server actions)
├─ components/          # UI components (shadcn/ui + custom)
├─ hooks/               # React hooks
├─ lib/                 # DB/auth/utils
├─ prisma/              # Prisma schema & migrations
├─ public/              # Static assets (images, covers)
├─ schemas/             # Runtime validation
├─ types/               # Shared TS types
├─ docker-compose.yml   # Local Postgres
├─ middleware.ts        # Edge middleware
├─ tailwind.config.cjs  # Tailwind config
├─ components.json      # shadcn/ui registry
└─ .env.example         # Env template
```

(See the repo root for the full file list and configs.)

---

## Scripts

- `dev` — Start the Next.js dev server
- `build` — Build production bundle
- `start` — Run the production server

(Standard for this template; see `package.json` if needed.)

---

## Rationale (Why these choices)

- **DX & Speed**: App Router + TypeScript + shadcn enable rapid, type‑safe full‑stack iteration under time constraints.
- **Operational simplicity**: Docker for Postgres + `.env.example` keeps setup minimal for reviewers; optional Email/Stripe are non‑blocking for local dev.

---

## License

See **LICENSE** in the repository.
