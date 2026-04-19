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
- Session 1 (TERMINÉE) : refonte architecture + pages squelettes
- Session 2 (À VENIR) : contenus détaillés — bios complètes 18 candidats, FAQ complète, textes longs, modals enrichies
- Session 3 (À VENIR) : intégration PayPal + polish final

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
