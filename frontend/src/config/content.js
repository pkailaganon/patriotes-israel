// Configuration du contenu - Modifiez ce fichier pour mettre à jour le texte du site
// All text content for the campaign website

export const siteConfig = {
  title: "Avec les Patriotes d'Israël — Élections Consulaires 2026",
  description: "Site de campagne pour les élections consulaires 2026 - Tel-Aviv & Haïfa",
  electionDate: new Date("2026-05-30T00:00:00"),
  electionDateDisplay: "30-31 Mai 2026",
  regions: ["Tel-Aviv", "Haïfa"],
};

export const assets = {
  candidateMichel: "https://customer-assets.emergentagent.com/job_2934571f-b89c-4ca8-a056-0a3b936c2d41/artifacts/c3bsf8tv_IMG_0404.jpeg",
  logoMain: "https://customer-assets.emergentagent.com/job_2934571f-b89c-4ca8-a056-0a3b936c2d41/artifacts/c9wf62f0_8372dad5-63f1-4d83-bb31-848b152d3148.jpeg",
  logoDates: "https://customer-assets.emergentagent.com/job_2934571f-b89c-4ca8-a056-0a3b936c2d41/artifacts/t2hm7oyx_9e9d3282-2d86-4326-919a-46b7f8ff196b.jpeg",
};

export const navigation = [
  { name: "Accueil", path: "/" },
  { name: "Programme", path: "/programme" },
  { name: "La Liste", path: "/liste" },
  { name: "Soutenir", path: "/soutenir" },
  { name: "Contact", path: "/contact" },
];

export const hero = {
  slogan: "RUPTURE AVEC LA SOUMISSION",
  subtitle: "Élections Consulaires 2026",
  regions: "Tel-Aviv & Haïfa",
  description: "Les élections consulaires désignent vos représentants au Conseil des Français de l'Étranger (CFE). Ces conseillers défendent vos droits auprès des autorités françaises. Votez pour des représentants qui osent parler.",
  cta: "Soutenir la Campagne",
  ctaSecondary: "Découvrir le Programme",
};

export const values = [
  {
    title: "Défense des Droits",
    description: "Nous défendrons les droits des binationaux franco-israéliens face à la fiscalité, la bureaucratie et les injustices administratives.",
  },
  {
    title: "Fierté & Dignité",
    description: "Nous parlerons au nom de Français pleinement Israéliens, fiers de leur alyah et de leur engagement ici.",
  },
  {
    title: "Refus de la Soumission",
    description: "Nous refuserons toute forme de « dhimitude politique » : respect oui, soumission non.",
  },
];

export const programme = {
  title: "Nos Engagements",
  subtitle: "Face à l'Élysée et au Quai d'Orsay : La fermeté, tête haute",
  commitments: [
    {
      id: 1,
      title: "Défense des Binationaux",
      description: "Nous défendrons les droits des binationaux franco-israéliens face à la fiscalité, à la bureaucratie et aux injustices administratives. Des milliers ont fait leur alyah, travaillent, paient des impôts, envoient leurs enfants à l'armée. Ils méritent des représentants à leur image.",
      icon: "Shield",
    },
    {
      id: 2,
      title: "Contre les Décisions Méprisantes",
      description: "Dire NON aux pratiques méprisantes, aux décisions prises sans vous et contre vos intérêts. Assez des interlocuteurs dociles, obsédés par les décorations et les avantages personnels.",
      icon: "Flag",
    },
    {
      id: 3,
      title: "Légitimité d'Israël",
      description: "Défendre la légitimité d'Israël à se protéger et à combattre le terrorisme. La France doit respecter les choix de vie des Français établis en Israël.",
      icon: "Vote",
    },
    {
      id: 4,
      title: "Respect, Pas Variable d'Ajustement",
      description: "Exiger que la France cesse de traiter les Français d'Israël comme une variable d'ajustement diplomatique. Les Français d'Israël ne sont ni des sujets, ni des supplétifs, mais des citoyens.",
      icon: "Users",
    },
  ],
};

export const candidates = {
  title: "La Liste",
  subtitle: "Avec les Patriotes d'Israël",
  teteDeListeTitle: "Tête de Liste",
  teteDeListe: {
    name: "Michel (Michael) Ayach",
    role: "Tête de Liste - Tel-Aviv & Haïfa",
    bio: "Engagé pour les Français d'Israël, Michel Ayach porte la voix de ceux qui refusent la soumission. Fier d'être Français, fier d'être Israélien.",
    image: assets.candidateMichel,
  },
  telAviv: {
    title: "Circonscription Tel-Aviv",
    candidates: [
      { name: "Sarah Cohen", role: "Candidate", image: null },
      { name: "David Levy", role: "Candidate", image: null },
      { name: "Rachel Mizrahi", role: "Candidate", image: null },
    ],
  },
  haifa: {
    title: "Circonscription Haïfa",
    candidates: [
      { name: "Jonathan Ben-David", role: "Candidate", image: null },
      { name: "Miriam Shapiro", role: "Candidate", image: null },
      { name: "Elie Toledano", role: "Candidate", image: null },
    ],
  },
};

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
    EUR: { symbol: "€", rate: 0.25 }, // Approximate conversion
  },
  paymentMethods: ["CB", "Bit", "Apple Pay", "Google Pay"],
  successMessage: "Merci pour votre soutien ! Votre contribution fait la différence.",
  shareMessage: "Je soutiens la liste « Avec les Patriotes d'Israël » pour les élections consulaires 2026 à Tel-Aviv et Haïfa. Rejoignez le mouvement ! #PatriotesDIsrael #ElectionsConsulaires2026",
};

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

export const footer = {
  slogan: "Rupture avec la soumission – Défense de vos droits – Fierté d'être Français en Israël",
  tagline: "Fiers d'être juifs Israéliens en Israël",
  legal: "Mentions Légales",
  copyright: "© 2026 Avec les Patriotes d'Israël. Tous droits réservés.",
};
