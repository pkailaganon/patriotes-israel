# PRD — Avec les Patriotes d'Israël (Liste N°6)

## Original problem statement
Build a complete campaign website for a French-Israeli consular election list
"Avec les Patriotes d'Israël" (Tel-Aviv/Haïfa, May 2026).

## Core requirements
- Public marketing pages (Home, Pourquoi, Programme, Voter, Équipe, FAQ, Contact)
- Donation flow (PayPal Smart Buttons) with CNCCFP legal compliance
- Admin dashboard (contacts + donations)
- SEO + Plausible analytics
- Deploy on Railway (Frontend + Backend + MongoDB services)

## User personas
- **Voters (Français d'Israël)**: Need clear info on how/when to vote + program
- **Donors**: Need compliant, secure PayPal flow (EUR/USD/ILS)
- **Campaign team**: Need admin to track contacts and donations

## Tech stack
- Frontend: React 18 + React Router v6 + Tailwind + Framer Motion + Shadcn UI
- Backend: FastAPI + Motor (MongoDB) + Slowapi + Httpx
- Payments: PayPal Smart Buttons server-side capture
- SEO: react-helmet-async + sitemap.xml + robots.txt
- Analytics: Plausible
- Deploy: Railway (3 services)

## What's been implemented
- ✅ **2026-02** — Sessions 1 & 2 (Architecture refactor + full content integration)
- ✅ **2026-02** — Session 3 (PayPal backend + frontend CNCCFP forms, SEO, Plausible, ScrollToTop)
- ✅ **2026-02** — Responsive header hotfix (shortened labels + xl breakpoint)
- ✅ **2026-02** — Railway deployment unblocked (merged `feature/session-3-paypal` into `main`, yarn.lock sync fix)
- ✅ **2026-02** — PayPal Sandbox/Live mode config resolved (PAYPAL_MODE=sandbox)
- ✅ **2026-02** — Logo circle refresh across 4 pages (Contact, Équipe, Programme, Soutenir) — transparent background
- ✅ **2026-02** — Mentions Légales fully populated (éditeur address, Railway host info, WorkitDoit credits, RGPD email)
- ✅ **2026-02** — Anti-scraping email technique (CSS bidi-override) for non-clickable emails

## Key files
- `/app/backend/server.py` — FastAPI app (PayPal, contact, admin)
- `/app/frontend/src/pages/*.jsx` — 12 pages
- `/app/frontend/src/config/content.js` — centralized content
- `/app/frontend/src/pages/MentionsLegales.jsx` — includes `ObfuscatedEmail` component

## Credentials
- Admin: `admin` / `patriotes2026` (see `/app/memory/test_credentials.md`)

## Prioritized backlog (future)
- **P2** — Social proof block on `/soutenir` ("X donateurs, objectif Y€")
- **P2** — Email notification to team on new contact/donation
- **P2** — Reçu fiscal PDF auto-generation post-donation
- **P3** — Multi-language (Hebrew, English)

## Known operational notes
- Railway branch = `main` (always push merged code there)
- PayPal: sandbox credentials currently configured; switch to live before campaign
- `PAYPAL_MODE` must match the type of `PAYPAL_CLIENT_ID`/`PAYPAL_CLIENT_SECRET` (sandbox or live)
- Mandataire financier fields (`MANDATAIRE_NOM`, `MANDATAIRE_ADRESSE`) still TBD on Railway backend
