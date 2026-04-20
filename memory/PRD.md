## What's Been Implemented — Session 3/3 TERMINÉE (Avr 2026)

### Intégration PayPal + SEO + Polish (branche feature/session-3-paypal)
- Backend FastAPI : 3 endpoints PayPal (`/api/paypal/create-order`, `/capture-order`, `/webhook`) avec validation serveur stricte, rate limit slowapi (5/IP/h), guard mandataire, kill-switch `DONATIONS_ENABLED`
- Webhook signature PayPal via `verify-webhook-signature` (fallback gracieux si `PAYPAL_WEBHOOK_ID` vide)
- Logs applicatifs dédiés (`donations` logger) : CREATE_ATTEMPT / CREATE_OK / CAPTURE_OK / BLOCKED_*
- MongoDB collection `donations` avec schéma CNCCFP : paypal_order_id, paypal_capture_id, donor{firstName,lastName,email,phone,address,city,postalCode,country}, 3 accepts CNCCFP, ip_address, user_agent
- Export CSV CNCCFP : `/api/admin/donations/export.csv` (auth requis, 19 colonnes)
- Route publique `/api/config/public` : donations_enabled, paypal_client_id, paypal_mode, mandataire info, limits, presets
- Frontend `/soutenir` refonte complète :
  - Toggle devise EUR/USD/ILS
  - 4 présets EUR (18/50/100/200) + montant libre
  - Formulaire identité CNCCFP complet
  - 3 cases légales obligatoires
  - `<PayPalScriptProvider>` + `<PayPalButtons>` (désactivés tant que formulaire invalide)
  - Bandeau rouge "Mandataire financier : à compléter" si env vide
- Frontend `/soutenir/merci` : page remerciement + ShareWhatsApp + retour accueil
- Admin tab "Dons" refactorée pour nouveau schéma : 4 stats cards + montants par devise + table 7 colonnes + bouton Export CSV
- SEO per page : `react-helmet-async` + `<HelmetProvider>` dans App.js + composant `<SEO>` sur 10 pages
- Plausible Analytics : snippet dans `public/index.html` avec `data-domain="patriotes-israel.com"`
- `<ScrollToTop />` (reset scroll sur navigation)
- `sitemap.xml` + `robots.txt` déjà présents dans `public/`
- Update Rosine Laloum (N°18) : `useSilhouette: true` + photo SVG silhouette
- Testing iteration 6 : 14/14 backend + 12/12 frontend PASS

## What's Been Implemented — Session 2/3 TERMINÉE (Avr 2026)

### Enrichissement des contenus (branche feature/session-2-contenus)
- `candidatesList` complète : 18 bios finales, zéro PLACEHOLDER, `useSilhouette` sur Katy Bisraor + Rosine Laloum
- Ayache : `ayacheEngagement` (7 champs : greeting, paragraphs[3], commitmentsIntro, commitments[4], closingParagraphs[3], signature, signatureRole)
- `CandidatePage.jsx` : rendu conditionnel 4 blocs pour Ayache vs `whitespace-pre-line` pour colistiers vs placeholder
- `faqItems` : 10 Q&R complètes (remplace 3 squelettes)
- `lexicon` : 9 définitions (AFE, AEFE, ASFE, CFE, LEC, Olim, PV, STAFE, USFE)
- Composant `ShareWhatsApp.jsx` : 3 variants (primary #25D366, outline, ghost), 3 tailles, messages hardcodés
- `CommentVoter.jsx` : section WhatsApp verte (bg-[#25D366]/10) avant CTA
- `CandidateModal.jsx` : footer 2 boutons (ShareWhatsApp + Fermer), photo aspect-square max-h+max-w [50vh]
- `EngagementsFAQ.jsx` : sous-titre FAQ mis à jour
- Testing iteration 4 : 100% (19/19 tests)

## What's Been Implemented — Session 1/3 TERMINÉE (Avr 2026)

### Refonte architecturale complète (branche feature/refonte-architecture)
- App.js mis à jour : 9 routes + Navigate redirects
- 6 nouvelles pages : PourquoiNous, ValeursProgramme, CommentVoter, Equipe, EngagementsFAQ, CandidatePage
- CandidateModal.jsx : Shadcn Dialog (Escape, focus trap, scroll lock natifs)
- Liste.jsx + Programme.jsx supprimés
- PROJECT_MEMORY.md à la racine, dossiers images, SVG silhouette Bisraor
- Testing iterations 1-3 : 100%

## Original Problem Statement
Site de campagne élections consulaires françaises 2026 — Deuxième circonscription d'Israël (Tel-Aviv / Haïfa). Candidate tête de liste : Professeur Michael Ayache. Liste N°6 "Avec les Patriotes d'Israël".

## Architecture
- Stack : React + Tailwind + Framer Motion + React Router v7 + Shadcn/UI + react-helmet-async + @paypal/react-paypal-js / FastAPI + MongoDB + httpx + slowapi / Railway
- Content centralisé : /src/config/content.js
- Routes : / | /pourquoi-nous | /valeurs-programme | /comment-voter | /equipe | /equipe/:slug | /engagements-faq | /soutenir | /soutenir/merci | /contact | /mentions-legales | /admin
- Redirections : /programme→/valeurs-programme, /liste→/equipe
- API PayPal : POST /api/paypal/create-order (rate limited 5/h), POST /api/paypal/capture-order, POST /api/paypal/webhook
- API publique : GET /api/config/public
- API admin : GET /api/admin/donations, /stats, /export.csv

## Design System (valeurs client validées)
- fr_blue : #27428F (HSL 224 42% 36%)
- republic_red : #E1000F
- Police principale : Oswald (font-accent + font-serif roles)
- Police corps : Plus Jakarta Sans
- Radius : rounded-sm (0.125rem)
- Animations : Framer Motion — fadeInUp + stagger + whileInView

## Sessions
- Session 1 (TERMINÉE ✅) : architecture + squelettes
- Session 2 (TERMINÉE ✅) : contenus + ShareWhatsApp
- Session 3 (TERMINÉE ✅) : PayPal + SEO + polish final

## Backlog P0/P1/P2
- P0 : Renseigner `MANDATAIRE_NOM` + `MANDATAIRE_ADRESSE` dans Railway .env (client à fournir) — BLOQUANT pour mise en ligne publique
- P0 : Renseigner `PAYPAL_CLIENT_SECRET` dans Railway .env (client à fournir via PayPal Developer)
- P1 : Créer le webhook PayPal et renseigner `PAYPAL_WEBHOOK_ID` dans Railway .env
- P1 : Upload des 15 photos candidats .webp 800×800 (client à fournir — le fichier Laloum SVG placeholder reste en attendant)
- P2 : Biographie Rosine Laloum (N°18) — client à fournir
- P2 : Merge branche `feature/session-3-paypal` dans `main` une fois tous les env Railway renseignés

## Credentials
- Admin : /admin — admin / patriotes2026
- PayPal Live Client ID (public) : Ac99ALPWRkBJWySH1oKK0FgYWjYq7E462T6h4kcSRuEi_rb93LK_hsDynfF3PfTxf5vYltzO7CS8q4g_
- PayPal Client Secret + Webhook ID : à renseigner dans Railway par le client
- Plausible : data-domain="patriotes-israel.com" configuré dans index.html
