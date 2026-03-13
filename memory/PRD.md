# PRD - Avec les Patriotes d'Israël

## Problem Statement
Site de campagne pour les élections consulaires françaises 2026 à Tel-Aviv et Haïfa. Liste "Avec les Patriotes d'Israël" menée par Michel (Michael) Ayach.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + MongoDB
- **Routing**: React Router v6
- **Components**: Shadcn/UI + Custom components
- **Content**: Centralized in `/src/config/content.js`
- **Payment**: HYP integration ready in `/src/config/payment.js`
- **Admin**: Backoffice sécurisé à `/admin`

## User Personas
1. **Français d'Israël (Tel-Aviv/Haïfa)**: Binationaux souhaitant des représentants engagés au CFE
2. **Sympathisants**: Personnes souhaitant soutenir financièrement la campagne
3. **Bénévoles potentiels**: Via le formulaire de contact
4. **Administrateurs**: Gestion des contacts et dons via backoffice

## Core Requirements (Static)
- [x] 5 pages publiques: Accueil, Programme, Liste, Soutenir, Contact
- [x] Page Mentions Légales
- [x] Backoffice admin (/admin)
- [x] Compte à rebours vers le 30 mai 2026
- [x] Formulaire de dons avec toggle ILS/EUR
- [x] Montants prédéfinis: 18₪ (Chai), 50₪, 100₪, 200₪
- [x] Formulaire de contact avec validation + enregistrement DB
- [x] Design institutionnel avec logo circulaire officiel
- [x] Mobile-first, responsive

## What's Been Implemented (Jan 2026)
1. **Homepage**: Hero "RUPTURE AVEC LA SOUMISSION", countdown, valeurs
2. **Programme**: 4 engagements avec design Bento grid
3. **Liste**: Candidats Tel-Aviv & Haïfa, Michel Ayach en vedette
4. **Soutenir**: Formulaire de dons complet avec toggle devise
5. **Contact**: Formulaire avec validation, enregistrement en base
6. **Mentions Légales**: Page complète avec placeholders
7. **Backoffice Admin** (/admin):
   - Connexion sécurisée (admin / patriotes2026)
   - Onglet Contacts: liste, stats, marquer lu, supprimer
   - Onglet Dons: liste avec coordonnées, stats, filtres
8. **Backend APIs**:
   - POST /api/contact - Enregistrer demande de contact
   - POST /api/donations - Enregistrer un don
   - GET /api/admin/contacts - Liste des contacts (auth)
   - GET /api/admin/donations - Liste des dons (auth)

## Prioritized Backlog

### P0 (Bloquant pour lancement)
- [DONE] Toutes les pages créées et fonctionnelles
- [DONE] Backoffice admin opérationnel

### P1 (Avant campagne active)
- [ ] Intégration HYP réelle (identifiants à fournir)
- [ ] Ajout des vrais noms/photos des candidats
- [ ] Compléter les placeholders Mentions Légales

### P2 (Améliorations)
- [ ] Export CSV des contacts/dons
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Newsletter signup

## Credentials Admin
- **URL**: /admin
- **Username**: admin
- **Password**: patriotes2026

## Next Tasks
1. Obtenir identifiants HYP Payment et les configurer
2. Remplacer candidats placeholder par les vrais candidats
3. Compléter les placeholders dans Mentions Légales
