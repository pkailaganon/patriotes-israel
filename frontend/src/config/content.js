// ============================================
// CONFIGURATION SITE DE CAMPAGNE
// Patriotes d'Israël - Élections Consulaires 2026
// ============================================

// 1. SITE CONFIG
export const siteConfig = {
  title: "Avec les Patriotes d'Israël — Élections Consulaires 2026",
  description: "Liste N°6 pour les élections consulaires 2026 - Tel-Aviv & Haïfa",
  electionDate: new Date("2026-05-21T07:00:00"), // Ouverture vote en ligne
  electionDateDisplay: "21-27 Mai & 31 Mai 2026",
  listNumber: "6",
  regions: ["Tel-Aviv", "Haïfa"],
};

// 2. ASSETS
export const assets = {
  candidateMichel: "https://customer-assets.emergentagent.com/job_2934571f-b89c-4ca8-a056-0a3b936c2d41/artifacts/c3bsf8tv_IMG_0404.jpeg",
  logoMain: "https://customer-assets.emergentagent.com/job_ayach-2026/artifacts/y4unrepu_Patriotes.png",
  logoDates: "https://customer-assets.emergentagent.com/job_ayach-2026/artifacts/n6zs7mi0_IMG_0569.jpeg",
};

// 3. NAVIGATION
export const navigation = [
  { name: "Accueil", path: "/" },
  { name: "Pourquoi nous", path: "/pourquoi-nous" },
  { name: "Valeurs & Programme", path: "/valeurs-programme" },
  { name: "Comment voter", path: "/comment-voter" },
  { name: "L'équipe", path: "/equipe" },
  { name: "Engagements & FAQ", path: "/engagements-faq" },
  { name: "Contact", path: "/contact" },
];

// 4. HERO (HOME)
export const hero = {
  slogan: "AVEC LES PATRIOTES D'ISRAËL",
  tagline: "Liste N°6 — Le renouveau pour vous défendre",
  subtitle: "Élections consulaires 2026",
  regions: "Deuxième circonscription d'Israël · Tel-Aviv & Haïfa",
  description: "Cette liste présente le renouveau pour vous défendre, avec nos valeurs juives, sionistes et patriotes. Votez et faites voter pour vos conseillers Patriotes d'Israël, à votre écoute et pour défendre vos intérêts franco-israéliens.",
  cta: "Découvrir comment voter",
  ctaLink: "/comment-voter",
  ctaSecondary: "Notre programme",
  ctaSecondaryLink: "/valeurs-programme",
};

// 5. KEY FIGURES (HOME)
export const keyFigures = [
  { value: "220 000", label: "Français estimés en Israël" },
  { value: "75 000", label: "Inscrits sur la liste électorale" },
  { value: "95,23 %", label: "D'abstention en 2021" },
  { value: "8", label: "Listes en compétition" },
  { value: "13", label: "Élus à élire (7 conseillers + 6 délégués)" },
];

// 6. FIVE VALUES (HOME TEASING)
export const fiveValues = [
  { title: "Juifs", icon: "Star", description: "Fiers de notre identité" },
  { title: "Sionistes", icon: "Flag", description: "Engagés pour Israël" },
  { title: "Patriotes", icon: "Heart", description: "Attachés à la France et à Israël" },
  { title: "Transparents", icon: "Eye", description: "Publication des PV et bilans" },
  { title: "Indépendants", icon: "Unlink", description: "Aucune affiliation partisane" },
];

// 7. HOME TEASERS (4 CARDS)
export const homeTeasers = [
  {
    title: "Pourquoi changer",
    description: "20 ans de gestion opaque, il est temps de tourner la page",
    link: "/pourquoi-nous",
    icon: "AlertCircle",
  },
  {
    title: "Notre programme",
    description: "5 fiches action concrètes pour les Franco-Israéliens",
    link: "/valeurs-programme",
    icon: "FileText",
  },
  {
    title: "Comment voter",
    description: "Inscription, vote en ligne, bureaux de vote — mode d'emploi",
    link: "/comment-voter",
    icon: "Vote",
  },
  {
    title: "L'équipe",
    description: "18 candidats engagés pour les Français d'Israël",
    link: "/equipe",
    icon: "Users",
  },
];

// 8. POURQUOI NOUS CARDS
export const pourquoiNousCards = [
  {
    icon: "EyeOff",
    title: "Zéro transparence",
    description: "Les PV des conseils consulaires n'ont jamais été publiés. Aucune réunion ouverte aux inscrits.",
  },
  {
    icon: "Coins",
    title: "Subventions orientées",
    description: "Les fonds STAFE ont été distribués aux associations liées aux sortants. Conflit d'intérêts.",
  },
  {
    icon: "ShieldOff",
    title: "Absents le 7 octobre",
    description: "Quand des Franco-Israéliens ont été massacrés ou pris en otage, où étaient les sortants ?",
  },
];

// 9. VALUES DETAILED
export const valuesDetailed = [
  {
    title: "Indépendance totale des partis",
    description: "Nous ne sommes affiliés à aucun parti politique, ni français ni israélien. Notre seule allégeance est à la communauté franco-israélienne.",
  },
  {
    title: "Fierté de Tsahal",
    description: "Nous sommes fiers d'Israël et de Tsahal. Les soldats franco-israéliens méritent d'être défendus par leurs représentants consulaires.",
  },
  {
    title: "Défense des binationaux",
    description: "Nous nous engageons sur les sujets qui comptent : équivalence de diplômes, état civil, passeports, soldats dans Tsahal, bourses AEFE.",
  },
  {
    title: "Transparence totale",
    description: "Publication des PV sous 15 jours, réunions publiques semestrielles, rapport d'activité, déclaration des conflits d'intérêts, zéro clientélisme.",
  },
  {
    title: "Proximité de terrain",
    description: "Des élus accessibles, présents sur le terrain, capables de dire non quand une décision va à l'encontre de nos intérêts.",
  },
];

// 10. ACTION SHEETS (5 FICHES)
export const actionSheets = [
  {
    number: "01",
    title: "Soldats de Tsahal binationaux",
    points: [
      "Créer un référent consulaire dédié",
      "Fonds d'urgence pour les familles",
      "Interpeller l'Ambassade de France",
      "Faciliter les démarches administratives",
    ],
  },
  {
    number: "02",
    title: "Bourses AEFE : transparence et équité",
    points: [
      "Publier les bourses attribuées chaque année",
      "Permanences d'info hors Tel-Aviv",
      "Recours transparent pour les familles lésées",
      "Ouvrir les aides aux établissements juifs",
    ],
  },
  {
    number: "03",
    title: "Intégration des olim français",
    points: [
      "Kit du nouvel olim français",
      "Procédure d'équivalence de diplôme simplifiée",
      "Journées d'accueil avec municipalités",
      "Permanences mensuelles dans 3 villes",
    ],
  },
  {
    number: "04",
    title: "Augmenter la participation électorale",
    points: [
      "Campagne d'inscription LEC",
      "Tutoriel vidéo vote internet",
      "Covoiturage le 31 mai",
      "Objectif : passer de 4,77% à 8-10%",
    ],
  },
  {
    number: "05",
    title: "Transparence et gouvernance",
    points: [
      "Publication PV sous 15 jours",
      "Détail des subventions STAFE",
      "Comité consultatif communautaire",
    ],
  },
];

// 11. COMMENT VOTER - KEY DATES
export const keyDates = [
  { date: "24 AVRIL 2026", label: "Date limite inscription LEC" },
  { date: "21-27 MAI 2026", label: "Vote par internet" },
  { date: "31 MAI 2026", label: "Vote à l'urne" },
  { date: "LISTE N°6", label: "Avec les Patriotes d'Israël" },
];

// LEC INSCRIPTION
export const lecInscription = {
  intro: "Avant de voter, il faut être inscrit sur la Liste Électorale Consulaire (LEC). Date limite : 24 avril 2026.",
  methods: [
    {
      title: "En ligne",
      steps: "service-public.fr → 'Français à l'étranger' → 'S'inscrire LEC'",
      delay: "2-5 jours",
    },
    {
      title: "Consulat Tel-Aviv",
      steps: "112 Herbert Samuel Promenade",
      delay: "5-10 jours",
    },
    {
      title: "Consulat Haïfa",
      steps: "Mêmes documents requis",
      delay: "5-10 jours",
    },
    {
      title: "Permanence Netanya",
      steps: "Se renseigner au Consulat",
      delay: "7-14 jours",
    },
  ],
  documents: "Passeport ou CNI française + justificatif de résidence en Israël.",
};

// VOTE INTERNET STEPS
export const voteInternetSteps = [
  { number: 1, title: "Vérifiez votre email", description: "Identifiants envoyés vers le 15 mai" },
  { number: 2, title: "Connectez-vous", description: "Au site officiel de vote" },
  { number: 3, title: "Changez votre mot de passe", description: "Première connexion obligatoire" },
  { number: 4, title: "Sélectionnez LISTE N°6", description: "Avec les Patriotes d'Israël" },
  { number: 5, title: "Confirmez et conservez", description: "L'accusé de réception" },
];

// POLLING STATIONS
export const pollingStations = [
  { city: "Tel-Aviv", address: "Hanguar 11 - Kof Guimel, Rue Yordei ha-Sira", hours: "8h-18h" },
  { city: "Haïfa", address: "Musée de la Marine, 198 Rue Allenby", hours: "8h-18h" },
  { city: "Ashdod", address: "Matnass Safra, IOUD BET", hours: "8h-18h" },
  { city: "Netanya", address: "Beit Kehilot Israel, 2 rue Yoel Salomon", hours: "8h-18h" },
  { city: "Jérusalem", address: "Ambassade de France (à confirmer)", hours: "8h-18h" },
];

// REGULATORY FRAME
export const regulatoryFrame = [
  { title: "Le mandat", content: "5 ans (2026-2031), bénévole, pas de rémunération." },
  { title: "Le scrutin", content: "Proportionnel de liste à un tour, plus forte moyenne. 7 conseillers + 6 délégués élus." },
  { title: "La circonscription", content: "Tel-Aviv, Haïfa, centre, nord et sud d'Israël (hors Jérusalem)." },
  { title: "Rôle des conseillers", content: "Conseil consulaire, STAFE, bourses AEFE, AFE, élection des sénateurs." },
];

// 12. CANDIDATES LIST
export const candidatesList = [
  { numero: 1, nom: "Professeur Michael Ayache", slug: "michael-ayache", photo: "/images/candidates/01-ayache.webp", accroche: "Tête de liste", bioFull: "Chers Français d'Israël, je suis le professeur Michael Ayache et j'ai accepté de conduire la liste 'Avec les Patriotes d'Israël'. Notre liste est indépendante des partis. Notre seule boussole, ce sont les Français qui vivent en Israël et leurs intérêts.", isHead: true },
  { numero: 2, nom: "Véronique Dahan", slug: "veronique-dahan", photo: "/images/candidates/02-dahan.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 3, nom: "Daniel Mashal", slug: "daniel-mashal", photo: "/images/candidates/03-mashal.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 4, nom: "Katy Bisraor", slug: "katy-bisraor", photo: "/images/candidates/04-bisraor.svg", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2", useSilhouette: true },
  { numero: 5, nom: "Gerard Weisz", slug: "gerard-weisz", photo: "/images/candidates/05-weisz.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 6, nom: "Dominique Konsens Kalifa", slug: "dominique-konsens-kalifa", photo: "/images/candidates/06-konsens.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 7, nom: "Serge Fitoussi", slug: "serge-fitoussi", photo: "/images/candidates/07-fitoussi.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 8, nom: "Brigitte Moatti", slug: "brigitte-moatti", photo: "/images/candidates/08-moatti.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 9, nom: "Serge Sultan", slug: "serge-sultan", photo: "/images/candidates/09-sultan.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 10, nom: "Sabrina Ohayon", slug: "sabrina-ohayon", photo: "/images/candidates/10-ohayon.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 11, nom: "Benjamin Parienti", slug: "benjamin-parienti", photo: "/images/candidates/11-parienti.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 12, nom: "Yakout Dahan", slug: "yakout-dahan", photo: "/images/candidates/12-yakout-dahan.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 13, nom: "Serge Sebban", slug: "serge-sebban", photo: "/images/candidates/13-serge-sebban.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 14, nom: "Rachel Hababou", slug: "rachel-hababou", photo: "/images/candidates/14-hababou.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 15, nom: "Denis Sebban", slug: "denis-sebban", photo: "/images/candidates/15-denis-sebban.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 16, nom: "Josiane Marcovici", slug: "josiane-marcovici", photo: "/images/candidates/16-marcovici.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 17, nom: "Claude Charles Kleczewski", slug: "claude-kleczewski", photo: "/images/candidates/17-kleczewski.webp", accroche: "PLACEHOLDER", bioFull: "PLACEHOLDER SESSION 2" },
  { numero: 18, nom: "Rosine Esther Laloum", slug: "rosine-laloum", photo: "/images/candidates/18-laloum.webp", accroche: "Biographie à venir", bioFull: "Biographie à venir" },
];

// 13. SOLEMN COMMITMENTS
export const solemnCommitments = [
  { number: "01", title: "Transparence totale", description: "Publication PV sous 15 jours" },
  { number: "02", title: "Indépendance des partis", description: "Zéro affiliation politique" },
  { number: "03", title: "Défense active", description: "Bouclier des droits des Franco-Israéliens" },
  { number: "04", title: "Zéro clientélisme", description: "Aucune subvention aux proches" },
  { number: "05", title: "Dialogue et accessibilité", description: "2 réunions publiques/an + rapport semestriel" },
];

// 14. FAQ ITEMS (SQUELETTE)
export const faqItems = [
  { question: "Qui peut voter ?", answer: "Contenu à compléter en session 2" },
  { question: "Comment s'inscrire ?", answer: "Contenu à compléter en session 2" },
  { question: "Contenu complet à venir", answer: "La FAQ complète sera intégrée prochainement." },
];

// LEXICON (SQUELETTE)
export const lexicon = [
  { term: "LEC", definition: "Liste Électorale Consulaire" },
  { term: "AFE", definition: "Assemblée des Français de l'Étranger" },
  { term: "STAFE", definition: "Soutien au Tissu Associatif des Français de l'Étranger" },
];

// 15. DONATION (CONSERVER)
export const donation = {
  title: "Soutenez Notre Combat",
  subtitle: "Chaque contribution compte",
  description: "Votre soutien nous permet de faire entendre la voix des Français d'Israël. Ensemble, tournons la page des conseillers silencieux et dociles. Envoyons à Paris un message clair.",
  emotionalCopy: "Les Français d'Israël ne sont ni des sujets, ni des supplétifs, mais des citoyens qui exigent respect, droits et considération.",
  presets: [
    { amount: 18, label: "18", special: true, meaning: "Chai (חי) - La Vie" },
    { amount: 50, label: "50" },
    { amount: 100, label: "100" },
    { amount: 200, label: "200" },
  ],
  currencies: {
    ILS: { symbol: "₪", rate: 1 },
    EUR: { symbol: "€", rate: 0.25 },
  },
  paymentMethods: ["CB", "Bit", "Apple Pay", "Google Pay"],
  successMessage: "Merci pour votre soutien ! Votre contribution fait la différence.",
  shareMessage: "Je soutiens la liste N°6 « Avec les Patriotes d'Israël » pour les élections consulaires 2026 à Tel-Aviv et Haïfa. Rejoignez le mouvement ! #PatriotesDIsrael #ElectionsConsulaires2026",
};

// 16. CONTACT (CONSERVER)
export const contact = {
  title: "Contactez-Nous",
  subtitle: "Rejoignez le mouvement",
  description: "Une question ? Vous souhaitez rejoindre la liste ou simplement nous soutenir ? Écrivez-nous.",
  form: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    message: "Votre message",
    joinList: "Je souhaite rejoindre la liste",
    submit: "Envoyer",
    successMessage: "Message envoyé avec succès ! Nous vous répondrons rapidement.",
  },
};

// 17. FOOTER
export const footer = {
  slogan: "Liste N°6 — Avec les Patriotes d'Israël · Élections consulaires 2026",
  tagline: "Fiers d'être juifs Israéliens en Israël",
  legal: "Mentions Légales",
  copyright: "© 2026 Avec les Patriotes d'Israël. Tous droits réservés.",
};

// QUOTE (HOME)
export const homeQuote = "« Nos réalités ici — sécurité, éducation, liens avec Israël, démarches — méritent des représentants qui les comprennent et les défendent. »";
