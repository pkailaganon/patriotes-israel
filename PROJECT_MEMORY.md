# PROJECT MEMORY — Patriotes d'Israël

## Contexte
Site de campagne pour les élections consulaires françaises 2026.
Circonscription : 2e circo d'Israël (Tel-Aviv / Haïfa).
Tête de liste : Professeur Michael Ayache.
**Numéro de liste officiel : N°6**

## Dates clés
- Inscription LEC : 24 avril 2026
- Vote en ligne : 21-27 mai 2026
- Vote à l'urne : 31 mai 2026
- Mise en ligne site : 15 mai 2026 (deadline)

## Stack
Frontend : React + Tailwind + Framer Motion + React Router v6 + Shadcn/UI
Backend : FastAPI + MongoDB
Déploiement : Railway
Content centralisé : /src/config/content.js

## Architecture (6 pages contenu + 4 utilitaires)
- `/` — Home
- `/pourquoi-nous` — Diagnostic sortants
- `/valeurs-programme` — 5 valeurs + 5 fiches action
- `/comment-voter` — Mode d'emploi électeur
- `/equipe` — 18 candidats (modal pour colistiers, page dédiée /equipe/:slug)
- `/equipe/:slug` — Page individuelle candidat (squelette session 1, bios session 2)
- `/engagements-faq` — 5 engagements + FAQ + lexique
- `/soutenir` — Dons (PayPal en session 3)
- `/contact` — Formulaire
- `/mentions-legales`
- `/admin` — Backoffice (ne pas toucher)

## Redirections actives
- `/programme` → `/valeurs-programme` (Navigate replace)
- `/liste` → `/equipe` (Navigate replace)

## Règles de design (valeurs CLIENT VALIDÉES — ne pas modifier)
- **Couleur principale** : `fr_blue #27428F` (HSL 224 42% 36%) — NOTE : le prompt initial citait #002395 mais le client a validé #27428F comme couleur définitive
- **Couleur secondaire** : `republic_red #E1000F`
- **Police principale** : Oswald (remplace Playfair Display / Barlow Condensed du prompt initial — validé client)
- **Police corps** : Plus Jakarta Sans
- **Radius** : `rounded-sm` (0.125rem — institutionnel)
- **Container** : `.container-campaign` (max-w-7xl, px-4 md:px-6)
- **Sections** : `.section-spacing` (py-16 md:py-24 lg:py-32)
- **Animations** : Framer Motion — fadeInUp + stagger au scroll, whileInView + viewport once
- Fond hero pages internes : `bg-slate-50` avec `border-b border-slate-200`
- Cards : `border border-slate-200 hover:shadow-lg transition-shadow`

## Lexique validé client (ne pas modifier)
- LEC = Liste Électorale Consulaire
- AFE = Assemblée des Français de l'Étranger
- STAFE = Soutien au Tissu Associatif des Français de l'Étranger
(Item 3 conservé comme STAFE au lieu de "Contenu à venir" — meilleur contenu, validé)

## Règles uniformisation photos
- Colistiers : WebP 800×800 1:1, fond uniformisé, poids < 150 Ko
- Tête de liste Ayache : WebP 1200×1500 4:5 (photo existante en cdn)
- Silhouette SVG pour Katy Bisraor (candidate N°4, pas de photo fournie)
- Nommage : `{numero-sur-2-chiffres}-{nom-slug}.webp`
- Dossiers : `/frontend/public/images/candidates/`, `campaign/`, `logos/`

## Ton éditorial
- Home : institutionnel, communautaire, patriote (pas d'attaque)
- `/pourquoi-nous` : offensif, direct, factuel (attaque frontale des sortants assumée par le candidat)
- Autres pages : institutionnel, structuré

## Sessions
- Session 1 (TERMINÉE ✅) : refonte architecture + pages squelettes
- Session 2 (TERMINÉE ✅) : contenus détaillés — 17 bios colistiers, engagement complet Ayache (structure 7 champs `ayacheEngagement`), FAQ complète (10 Q&R), lexique (9 termes), composant ShareWhatsApp sur /comment-voter + modal candidat + page candidat, fix ratio photo modal (aspect-square + max-h-[50vh])
- Session 3 (TERMINÉE ✅) : intégration PayPal + SEO + polish final (voir checklist ci-dessous)

## Session 3/3 — Checklist (TERMINÉE)
### PayPal Live (paiement sécurisé)
- Backend `/api/paypal/create-order` avec validation stricte serveur (min/max par devise, preset=18/50/100/200 EUR uniquement, 3 mentions CNCCFP obligatoires)
- Backend `/api/paypal/capture-order` avec mise à jour MongoDB
- Backend `/api/paypal/webhook` avec validation signature PayPal `verify-webhook-signature` + fallback gracieux si `PAYPAL_WEBHOOK_ID` vide (log warning, pas de crash)
- Rate limiter slowapi : 5 req / IP / heure sur create-order
- Kill-switch `DONATIONS_ENABLED` (env backend) — bloque API 503 + masque formulaire frontend
- Guard mandataire : si `MANDATAIRE_NOM` / `MANDATAIRE_ADRESSE` vides, API retourne 503 + bandeau rouge visible sur /soutenir
- Logs applicatifs : tentative CREATE/CAPTURE loguée avec IP, email, montant, statut (pas dans MongoDB, logger dédié)
- Stockage dons en collection `donations` avec schéma CNCCFP complet (paypal_order_id, paypal_capture_id, donor{...}, acceptPhysicalPerson/PersonalFunds/DataCollection, ip_address, user_agent, created_at/completed_at)

### /soutenir refonte complète
- Toggle devise EUR / USD / ILS (présets visibles uniquement en EUR)
- Présets : 18 € (Chai חי), 50 € (20 flyers), 100 € (1h permanence), 200 € (200 SMS du 21 mai)
- Champ montant libre (min 1 / max 4600 EUR-USD, max 20000 ILS)
- Formulaire identité CNCCFP : prénom, nom, email, téléphone (opt), adresse, ville, code postal, pays
- 3 cases légales obligatoires :
  1. Personne physique majeure de nationalité française
  2. Fonds personnels + plafond 4600€/campagne
  3. Autorisation collecte CNCCFP
- Boutons PayPal Smart Buttons (@paypal/react-paypal-js) désactivés (opacity-40 + pointer-events-none + aria-disabled) tant que le formulaire n'est pas complet et validé
- Bandeau mandataire :
  - Si configuré : bloc gris en bas de page avec mention L52-4
  - Si vide : bandeau rouge visible en haut du formulaire avec message d'alerte
- Sidebar sticky : pourquoi nous soutenir, explication Chai 18, sécurité/conformité

### /soutenir/merci (page de remerciement)
- Confirmation don (montant, devise, captureID)
- Bouton ShareWhatsApp (message pré-rempli)
- Bouton retour accueil
- SEO dédié

### Admin Dons (refactor schéma)
- Lecture nouveau schéma (created_at, donor.firstName, impact_preset, paypal_order_id)
- 4 cartes stats : Total / Complétés / En attente / Échoués
- Bloc montants par devise (complétés uniquement)
- Tableau : Date / Donateur / Contact / Montant / Preset / Statut / PayPal
- Export CSV CNCCFP (`/api/admin/donations/export.csv`, auth requis, 19 colonnes)

### SEO + Analytics + UX
- `react-helmet-async` : `<HelmetProvider>` dans App.js + composant `<SEO>` réutilisable
- Titre + description + OG unique sur chaque page (8 pages publiques + /soutenir + /soutenir/merci + /equipe/:slug dynamique)
- Plausible Analytics : `<script defer data-domain="patriotes-israel.com" src="https://plausible.io/js/script.js">` dans `index.html`
- `<ScrollToTop />` dans App.js → reset scroll sur changement de route
- `sitemap.xml` + `robots.txt` dans `public/`
- Favicon + Apple touch icon conservés

### Points juridiques en attente de validation client
- **⚠️ MANDATAIRE FINANCIER** : `MANDATAIRE_NOM` et `MANDATAIRE_ADRESSE` doivent être renseignés dans `backend/.env` (Railway) avant mise en ligne publique. Le site affiche un bandeau rouge tant que ces valeurs sont vides et l'API `/api/paypal/create-order` retourne 503.
- **IMPORTANT** : L'Amouta israélienne n°580837276 ne peut PAS servir de mandataire au sens du Code électoral français. Le client doit désigner un mandataire financier (personne physique ou association de financement électoral) inscrit en France ou dans un État membre de l'UE.
- `PAYPAL_CLIENT_SECRET` à renseigner dans Railway par le client (jamais dans le code)
- `PAYPAL_WEBHOOK_ID` à configurer après création du webhook dans le PayPal Developer Dashboard (URL webhook : `https://patriotes-israel.com/api/paypal/webhook`)

### Tests Session 3
- iteration_6.json : 14/14 backend + 12/12 frontend PASS

## Composants réutilisables

### ShareWhatsApp (`/src/components/ShareWhatsApp.jsx`)
Bouton de partage WhatsApp universel. 3 variants (primary #25D366, outline, ghost), 3 tailles (sm, default, lg). Utilisé sur `/comment-voter` (mobilisation virale guide de vote), dans `CandidateModal` (partage fiche candidat) et sur `CandidatePage` (partage page candidat individuelle). Messages hardcodés dans chaque appel (pas de centralisation dans content.js).

## Photos candidates
Les fichiers `.webp` des candidats ne sont pas encore uploadés. Le fallback User icon de Lucide s'affiche en attendant. Quand les photos seront prêtes (format 800×800 WebP standardisé), elles seront simplement déposées dans `/frontend/public/images/candidates/` — aucune modification de code nécessaire. Conventions :
- `01-ayache.webp` (1200×1500, 4:5, seule exception)
- `02-dahan.webp` à `17-kleczewski.webp` (800×800, 1:1)
- `04-bisraor.svg` (silhouette, déjà en place)
- `18-laloum.webp` (si disponible un jour)

## Credentials admin
- URL : /admin
- Username : admin
- Password : patriotes2026

## Credentials Railway (placeholders — à renseigner dans Railway .env)
PAYPAL_CLIENT_ID=<à fournir>
PAYPAL_CLIENT_SECRET=<à fournir directement dans Railway, jamais dans le code>
PAYPAL_MODE=live

## Arbitrages pris
- Ton home : institutionnel (exit "Rupture avec la soumission")
- Countdown cible : 21 mai 2026 (ouverture vote en ligne)
- Attaque frontale sortants validée sur /pourquoi-nous
- Dates officielles : 21-27 mai (vote en ligne) + 31 mai (urne)
- Modal pour fiches colistiers (pas accordéon)
- Page dédiée `/equipe/:slug` pour tous les candidats (squelette session 1)
- Silhouette SVG pour Katy Bisraor (candidate N°4)
- Placeholder "Biographie à venir" pour Rosine Laloum (N°18)
- lexicon[2] = STAFE (meilleur que placeholder "Contenu à venir")
- fr_blue conservé à #27428F (pas #002395 du prompt initial)
- Police : Oswald (pas Playfair/Barlow Condensed du prompt initial)
