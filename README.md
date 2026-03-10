# Avec les Patriotes d'Israël — Site de Campagne

Site de campagne pour les élections consulaires 2026 à Tel-Aviv et Haïfa.

## Structure du projet

```
frontend/
├── src/
│   ├── config/
│   │   ├── content.js      # Tout le contenu textuel du site
│   │   └── payment.js      # Configuration HYP Payment
│   ├── components/
│   │   ├── Layout.jsx      # Header, Footer, Layout principal
│   │   ├── Countdown.jsx   # Compte à rebours vers les élections
│   │   └── DonationForm.jsx # Formulaire de dons
│   ├── pages/
│   │   ├── Home.jsx        # Page d'accueil
│   │   ├── Programme.jsx   # Les 4 engagements
│   │   ├── Liste.jsx       # Les candidats
│   │   ├── Soutenir.jsx    # Page de dons (prioritaire)
│   │   └── Contact.jsx     # Formulaire de contact
│   └── App.js              # Routes principales
└── public/
    └── index.html          # Meta tags et favicon
```

## Comment modifier le contenu

### Textes et contenus

Tous les textes sont centralisés dans `src/config/content.js`. Modifiez ce fichier pour changer :

- **`siteConfig`** : Titre du site, date des élections
- **`hero`** : Slogan principal et texte d'introduction
- **`values`** : Les 3 valeurs clés affichées en accueil
- **`programme`** : Les 4 engagements du programme
- **`candidates`** : Liste des candidats (Tel-Aviv et Haïfa)
- **`donation`** : Textes et montants de la page de dons
- **`contact`** : Labels du formulaire de contact
- **`footer`** : Mentions légales et slogan de pied de page

### Images

Les images des candidats sont configurées dans `content.js` sous `assets` et `candidates`. Pour ajouter une photo de candidat :

1. Uploadez l'image quelque part (CDN, serveur, etc.)
2. Modifiez l'objet candidat correspondant avec l'URL de l'image

```javascript
{
  name: "Nom du Candidat",
  role: "Candidate",
  image: "https://url-de-votre-image.jpg"
}
```

## Configuration des paiements HYP

Le fichier `src/config/payment.js` contient la configuration pour l'intégration HYP.

### Étapes pour activer les paiements :

1. Obtenez vos identifiants HYP (Terminal ID et API Key)
2. Modifiez `payment.js` :

```javascript
export const paymentConfig = {
  terminalId: "VOTRE_TERMINAL_ID",  // Remplacez TODO_TERMINAL_ID
  apiKey: "VOTRE_API_KEY",           // Remplacez TODO_API_KEY
  callbackUrl: "VOTRE_URL_CALLBACK", // URL de retour après paiement
  // ...
};
```

3. Redémarrez l'application

### Mode Test vs Production

- **Test** : Utilisez `https://pay.hyp.co.il/test` comme `baseUrl`
- **Production** : Utilisez `https://pay.hyp.co.il`

## Développement local

```bash
# Installation des dépendances
cd frontend
yarn install

# Lancement en développement
yarn start
```

## Technologies utilisées

- **React** + React Router v6
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **Shadcn/UI** pour les composants de base
- **Sonner** pour les notifications toast

## Personnalisation du design

### Couleurs

Les couleurs principales sont définies dans `tailwind.config.js` et `index.css` :

- `fr-blue` (#002395) : Bleu France
- `il-blue` (#005EB8) : Bleu Israël
- `republic-red` (#E1000F) : Rouge République
- `campaign-gold` (#C5A065) : Or accent

### Typographies

- **Playfair Display** : Titres (serif, élégant)
- **Plus Jakarta Sans** : Corps de texte (moderne, lisible)
- **Barlow Condensed** : Slogans et chiffres (impact)

## Contact

Pour toute question technique, contactez l'équipe de développement.

---

*Votez « Avec les Patriotes d'Israël » — 30-31 Mai 2026*
