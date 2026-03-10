# PRD - Avec les Patriotes d'Israël

## Problem Statement
Site de campagne pour les élections consulaires françaises 2026 à Tel-Aviv et Haïfa. Liste "Avec les Patriotes d'Israël" menée par Michel (Michael) Ayach.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Routing**: React Router v6
- **Components**: Shadcn/UI + Custom components
- **Content**: Centralized in `/src/config/content.js`
- **Payment**: HYP integration ready in `/src/config/payment.js`

## User Personas
1. **Français d'Israël (Tel-Aviv/Haïfa)**: Binationaux souhaitant des représentants engagés au CFE
2. **Sympathisants**: Personnes souhaitant soutenir financièrement la campagne
3. **Bénévoles potentiels**: Via le formulaire de contact

## Core Requirements (Static)
- [x] 5 pages: Accueil, Programme, Liste, Soutenir, Contact
- [x] Compte à rebours vers le 30 mai 2026
- [x] Formulaire de dons avec toggle ILS/EUR
- [x] Montants prédéfinis: 18₪ (Chai), 50₪, 100₪, 200₪
- [x] Formulaire de contact avec validation
- [x] Design institutionnel mais mémorable
- [x] Mobile-first, responsive

## What's Been Implemented (Jan 2026)
1. **Homepage**: Hero avec slogan "RUPTURE AVEC LA SOUMISSION", countdown, valeurs
2. **Programme**: 4 engagements avec design Bento grid
3. **Liste**: Candidats Tel-Aviv & Haïfa, Michel Ayach en vedette
4. **Soutenir**: Formulaire de dons complet avec toggle devise
5. **Contact**: Formulaire avec validation, option rejoindre liste
6. **Layout**: Header/Footer responsive, navigation complète
7. **Config**: content.js et payment.js pour faciliter les modifications

## Prioritized Backlog

### P0 (Bloquant pour lancement)
- [DONE] Toutes les pages créées et fonctionnelles

### P1 (Avant campagne active)
- [ ] Intégration HYP réelle (identifiants à fournir)
- [ ] Ajout des vrais noms/photos des candidats
- [ ] Page Mentions Légales complète

### P2 (Améliorations)
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Newsletter signup
- [ ] Galerie photos de campagne

## Next Tasks
1. Obtenir identifiants HYP Payment et les configurer
2. Remplacer candidats placeholder par les vrais candidats
3. Ajouter page Mentions Légales conforme à la réglementation électorale
