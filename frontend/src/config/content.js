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
  {
    numero: 1,
    nom: "Professeur Michael Ayache",
    slug: "michael-ayache",
    photo: "/images/candidates/01-ayache.webp",
    accroche: "Tête de liste — Professeur, engagé pour une représentation consulaire fidèle aux Français d'Israël",
    bioFull: "Chers Français d'Israël, je suis le professeur Michael Ayache et j'ai accepté de conduire la liste « Avec les Patriotes d'Israël » pour les élections consulaires à Tel-Aviv / Haïfa. Notre liste est indépendante des partis : notre seule boussole, ce sont les Français qui vivent en Israël et leurs intérêts, dans le respect profond de l'État d'Israël et de sa souveraineté. Je vous invite à lire mon engagement complet.",
    isHead: true,
    ayacheEngagement: {
      greeting: "Chers Français d'Israël,",
      paragraphs: [
        "Je suis le professeur Michael Ayache et j'ai accepté de conduire la liste « Avec les Patriotes d'Israël » pour les élections consulaires à Tel-Aviv / Haïfa.",
        "Si je m'engage aujourd'hui, c'est parce que je refuse que les Français d'Israël soient traités comme une simple variable d'ajustement des appareils parisiens. Trop souvent, nos réalités ici — sécurité, éducation de nos enfants, liens avec Israël, questions administratives concrètes — sont instrumentalisées dans des jeux politiques qui n'ont rien à voir avec notre vie quotidienne. Je veux rompre avec cette logique.",
        "Notre liste est indépendante des partis. Cela signifie que nous ne recevons pas d'ordres d'une étiquette nationale, que nous ne courons pas après des investitures ni des postes, et que nous ne négocions pas nos convictions contre des arrangements. Notre seule boussole, ce sont les Français qui vivent en Israël et leurs intérêts, dans le respect profond de l'État d'Israël et de sa souveraineté.",
      ],
      commitmentsIntro: "Concrètement, que voulons-nous faire au conseil consulaire ?",
      commitments: [
        "Défendre les droits des Français d'Israël dans leurs démarches administratives (état civil, passeports, certificats, inscriptions, bourses) avec une exigence de clarté, de respect et de rapidité.",
        "Porter la voix d'une communauté attachée à Israël, à sa sécurité, à son identité juive, en refusant les doubles discours ou les condamnations systématiques qui fragilisent notre pays d'accueil.",
        "Soutenir les familles, l'éducation et la jeunesse : accompagner les parents dans leurs démarches scolaires et universitaires, encourager les échanges éducatifs et culturels de qualité entre la France et Israël, soutenir les plus fragiles.",
        "Exiger une représentation consulaire qui soit vraiment à l'écoute : des élus accessibles, présents sur le terrain, capables de dire non quand une décision va à l'encontre de nos intérêts.",
      ],
      closingParagraphs: [
        "Je n'ai pas choisi le confort du silence. J'ai choisi la responsabilité de la parole et de l'action. Dans mes engagements publics, j'ai toujours assumé une ligne claire : défendre Israël, dénoncer l'acharnement politico-médiatique lorsqu'il vise à affaiblir ses dirigeants, et préserver le lien vivant entre notre peuple et notre histoire. C'est avec cette même cohérence que je souhaite vous représenter.",
        "Les élections consulaires ne sont pas un simple détail administratif : elles déterminent qui parlera en votre nom dans les années à venir, qui sera autour de la table lorsque seront discutées les questions qui touchent directement les Français d'Israël.",
        "Je vous invite à faire entendre votre voix par le vote en ligne ou en venant voter à l'urne le jour du scrutin. Ne laissez pas d'autres décider à votre place.",
      ],
      signature: "Professeur Michael Ayache",
      signatureRole: "Tête de liste — « Avec les Patriotes d'Israël » — Liste N°6",
    },
  },
  {
    numero: 2,
    nom: "Véronique Dahan",
    slug: "veronique-dahan",
    photo: "/images/candidates/02-dahan.webp",
    accroche: "Architecte, administratrice de 30 groupes d'entraide (+11 000 membres)",
    bioFull: "Je m'appelle Véronique Dahan. Architecte de formation, j'ai travaillé dans le design et le textile à Marseille et à Paris avant de faire mon Alya il y a 16 ans avec mes six enfants. Comme beaucoup d'entre vous, j'ai dû affronter la langue, les démarches, les urgences médicales, les difficultés administratives… et j'ai souvent dû me battre seule pour comprendre et avancer. C'est de là qu'est née ma mission : que plus aucun Français en Israël ne traverse cela sans soutien.\n\nAujourd'hui, j'administre 30 groupes qui regroupent plus de 11 000 Français. Parmi eux, ISRAEL WOMEN et plusieurs groupes d'information où je partage chaque jour l'actualité, les événements, les spectacles, le théâtre et les cinémas dans toutes les villes d'Israël. Pour beaucoup, c'est une aide essentielle : l'hébreu est une barrière, et je veux que chacun puisse vivre pleinement ici.\n\nJ'ai aussi créé trois groupes médicaux — RÉPERTOIRE MÉDICAL, GROUPE MÉDICAL, MÉDECINES COMPLÉMENTAIRES — qui regroupent 3 000 personnes où le public pose ses questions directement à des médecins francophones, ainsi que VOS DROITS EN ISRAËL, un groupe de 500 personnes dédié aux démarches juridiques, fiscales, immobilières et administratives.\n\nJe suis fière d'Israël, fière de mes enfants dont deux ont été combattants, fière de notre communauté française qui se bat pour réussir ici. Et je suis fière d'être sur la liste des PATRIOTES D'ISRAËL, pour continuer ma mission avec encore plus de force : accompagner, informer, protéger et défendre chaque Français d'Israël, avec cœur, expérience et détermination.",
  },
  {
    numero: 3,
    nom: "Daniel Mashal",
    slug: "daniel-mashal",
    photo: "/images/candidates/03-mashal.webp",
    accroche: "17 ans dans l'hôtellerie Tel-Aviv · Père d'un combattant de Tsahal · Harish",
    bioFull: "Né le 14 juin 1983 à Chamonix-Mont-Blanc, Daniel vit à Harish avec sa femme Katya et leurs deux enfants, dont un engagé comme combattant dans Tsahal. Polyglotte — français, anglais, hébreu, russe, espagnol — il cumule 17 ans d'expérience dans l'hôtellerie de luxe à Tel-Aviv.\n\nAncien responsable syndical ayant représenté plus de 100 employés pendant 3 ans, il est aussi agent de sécurité au service de la protection des élèves de l'Éducation nationale à Harish, et entraîneur de football pour les jeunes de sa ville. Son engagement local, sa maîtrise des langues et sa connaissance du terrain font de lui un représentant naturel de la communauté franco-israélienne du nord.",
  },
  {
    numero: 4,
    nom: "Katy Bisraor",
    slug: "katy-bisraor",
    photo: "/images/candidates/04-bisraor.svg",
    accroche: "Avocate (Toenet Rabbanit) auprès des tribunaux rabbiniques",
    bioFull: "Katy Bisraor est avocate accréditée auprès des tribunaux rabbiniques israéliens en qualité de Toenet Rabbanit (טוענת רבנית) — un titre professionnel reconnu par l'État d'Israël après une formation de trois ans et un examen d'État, qui autorise à plaider devant les juridictions religieuses compétentes en matière de statut personnel.\n\nÀ ce titre, elle intervient aux côtés des Français d'Israël dans des contentieux souvent sensibles : mariage, divorce, pension alimentaire, succession, reconnaissance des actes d'état civil entre la France et Israël. Son expertise bilingue français-hébreu dans un domaine juridique complexe est un atout concret pour accompagner la communauté dans ses démarches les plus délicates.",
    useSilhouette: true,
  },
  {
    numero: 5,
    nom: "Gerard Weisz",
    slug: "gerard-weisz",
    photo: "/images/candidates/05-weisz.webp",
    accroche: "Consultant Ingénierie Documentaire · Expert AFNOR/ISO (25 ans)",
    bioFull: "Consultant en Ingénierie Documentaire avec 25 années d'expérience en Gestion Électronique des Documents (GED) et Archivage Électronique à valeur probatoire. Certifié CDIA+ par la Computing Technology Industry Association (USA). Auditeur et formateur de la norme AFNOR Z42-013, auditeur de la Marque NF 461 agréée par AFNOR Certification.\n\nAncien membre expert du comité TC171 de l'ISO et chef de la délégation française. Membre du groupe de travail Coffre numérique de la CN171. Éditeur du projet de révision de la norme NF Z42-013 (publication mars 2009) et de son guide d'application (publication juin 2010). Ancien secrétaire général fondateur de la FNTC (Fédération Nationale des Tiers de Confiance).\n\nCo-auteur d'études juridiques de référence sur l'archivage électronique (avec le cabinet Mascré-Héguy Avocats, aux Éditions Législatives) et sur le principe de précaution appliqué à l'écrit électronique (avec le cabinet Kahn & Associés). Son expertise normative et juridique est directement utile aux dossiers de transformation numérique du réseau consulaire.",
  },
  {
    numero: 6,
    nom: "Dominique Konsens Kalifa",
    slug: "dominique-konsens-kalifa",
    photo: "/images/candidates/06-konsens.webp",
    accroche: "Ancienne Directrice Administrative et Financière · Olah hadachah (sept. 2024), Ramat Aviv",
    bioFull: "Retraitée après une carrière de Directrice Administrative et Financière, Dominique a fait son Alya en septembre 2024 et réside à Ramat Aviv. Nouvelle olah, elle apporte à la liste une expérience de gestion rigoureuse et un regard récent sur les démarches concrètes d'installation en Israël.\n\nSon engagement au service des Français d'Israël est nourri par son propre parcours d'arrivée récente : elle connaît de l'intérieur les obstacles administratifs, les questions fiscales et les défis logistiques auxquels font face les olim français, et souhaite mettre son expertise financière et organisationnelle au service d'un conseil consulaire plus clair et plus accessible.",
  },
  {
    numero: 7,
    nom: "Serge Fitoussi",
    slug: "serge-fitoussi",
    photo: "/images/candidates/07-fitoussi.webp",
    accroche: "Officier parachutiste de Tsahal (réserve) · Sécurité · Arts martiaux",
    bioFull: "Ayant fait son Alya à 44 ans depuis Paris, Serge a commencé son engagement dès sa jeunesse dans les mouvements sionistes français — EIF (Éclaireurs Israélites de France) et OJD (Organisation Juive de Défense).\n\nOfficier supérieur des parachutistes de Tsahal (réserve), il est également ancien des services de sécurité. Il partage aujourd'hui son temps entre deux passions transmises : entraîneur de plongée PADI et entraîneur d'arts martiaux.\n\nSon parcours allie engagement militaire, culture de la sécurité et transmission aux plus jeunes. Un profil de terrain, directement utile sur les sujets de sécurité de la communauté française et de défense des droits des soldats binationaux.",
  },
  {
    numero: 8,
    nom: "Brigitte Moatti",
    slug: "brigitte-moatti",
    photo: "/images/candidates/08-moatti.webp",
    accroche: "Fondatrice Bridget Events · Engagée au FSJU & Libi France",
    bioFull: "Je suis Brigitte Moatti, fondatrice de Bridget Events, Wedding Planner reconnue, opérant entre Paris, la France, Israël et le Maroc. Mère de quatre enfants et grand-mère de onze petits-enfants, je porte en moi des valeurs profondes de transmission, d'engagement et de famille.\n\nIl y a près de dix ans, j'ai fait le choix de m'installer en Israël. Un choix de cœur, un choix de conviction. Les débuts ont été exigeants : une nouvelle langue, une culture différente, un état d'esprit à apprivoiser. Mais j'ai su transformer ces défis en force, m'adapter et m'ancrer pleinement dans cette société.\n\nMon engagement ne date pas d'hier. Très jeune déjà, j'étais animée par une forte conscience sioniste. Mon parcours m'a conduite à m'investir activement au Betar, puis en tant que monitrice au DEJJ. Mariée à 18 ans, j'ai construit ma famille tout en m'engageant durablement dans le tissu associatif.\n\nPendant plus de dix ans, j'ai œuvré au sein du FSJU dans des actions de Tsedaka, contribué à Libi France aux côtés de Gladys, et soutenu de nombreuses initiatives solidaires. L'engagement n'a jamais été une option, mais une ligne de vie.\n\nDepuis mon arrivée en Israël, je m'attache à créer du lien, à rassembler, à fédérer la communauté française à travers des événements porteurs de sens. Car je crois profondément que notre identité est une richesse, et que nos valeurs doivent être préservées, même loin de notre pays d'origine.\n\nC'est dans cette continuité que j'ai rejoint Les Patriotes d'Israël. Avec détermination et responsabilité, je m'engage à accompagner, informer, protéger et défendre les Français d'Israël, ainsi que leurs droits et leurs devoirs. Mon exigence, mon expérience et mon engagement seront pleinement dédiés à cette mission.",
  },
  {
    numero: 9,
    nom: "Serge Sultan",
    slug: "serge-sultan",
    photo: "/images/candidates/09-sultan.webp",
    accroche: "50 ans en Israël · Chauffeur de maître & conciergerie francophone",
    bioFull: "Installé en Israël depuis 50 ans, Serge exerce aujourd'hui comme chauffeur de maître et propose des services de conciergerie dédiés aux Français qui rencontrent des difficultés d'intégration.\n\nUne connaissance du terrain et du quotidien israélien acquise sur un demi-siècle, mise au service des arrivants : orientations administratives, trajets, repères culturels, démarches urgentes. Serge incarne la figure du relais communautaire de proximité, attentif aux besoins concrets de celles et ceux qui découvrent le pays et ses codes.",
  },
  {
    numero: 10,
    nom: "Sabrina Ohayon",
    slug: "sabrina-ohayon",
    photo: "/images/candidates/10-ohayon.webp",
    accroche: "Médecin · 25 ans dans Tsahal · 18 ans au chevet des blessés de guerre",
    bioFull: "Médecin de formation en France, Sabrina a fait son Alya il y a 30 ans par pur sionisme. Pendant 25 ans, elle a servi comme civile au sein de Tsahal, dont 18 années comme responsable des soins aux blessés de guerre.\n\nSon engagement médical et patriotique fait d'elle une voix particulièrement légitime pour défendre les soldats franco-israéliens et leurs familles, sur des sujets concrets : suivi médical, reconnaissance des blessures de guerre, coordination avec les autorités françaises, soutien aux familles. Un parcours de terrain, au plus près de celles et ceux qui payent le prix de la sécurité d'Israël.",
  },
  {
    numero: 11,
    nom: "Benjamin Parienti",
    slug: "benjamin-parienti",
    photo: "/images/candidates/11-parienti.webp",
    accroche: "Fondateur du Kangourou Club (32 ans) · Ashkelon",
    bioFull: "Créateur et gérant pendant plus de trois décennies (1990-2022) du Kangourou Club, club de vacances cachères, Benjamin a fait son Alya en 2002. Retraité, il réside aujourd'hui à Ashkelon.\n\nSon expérience dans l'accueil et l'organisation de séjours familiaux l'a rendu intimement familier des attentes et besoins des familles françaises tournées vers Israël : continuité éducative, vie casher, accompagnement des enfants et des parents. Un profil ancré dans le sud d'Israël qui renforce la diversité géographique de la liste.",
  },
  {
    numero: 12,
    nom: "Yakout Dahan",
    slug: "yakout-dahan",
    photo: "/images/candidates/12-yakout-dahan.webp",
    accroche: "Ex-directrice d'agence de voyage · Montage de voyages de groupe",
    bioFull: "Spécialiste du tourisme avec une expertise reconnue dans le montage de voyages de groupe, Yakout a dirigé une agence de voyage pendant plusieurs années.\n\nElle connaît les rouages de l'industrie touristique franco-israélienne et les besoins spécifiques des voyageurs binationaux : billetterie, formalités, assurances, coordination avec les prestataires locaux. Un profil opérationnel au service des échanges France-Israël et des familles qui font la navette entre les deux pays.",
  },
  {
    numero: 13,
    nom: "Serge Sebban",
    slug: "serge-sebban",
    photo: "/images/candidates/13-serge-sebban.webp",
    accroche: "Entrepreneur · Mode féminine puis complexes hôteliers",
    bioFull: "Entrepreneur et industriel au parcours pluriel. Après une carrière dans la conception et la production de collections de vêtements pour femmes, Serge s'est reconverti dans la création innovante de complexes hôteliers.\n\nSon esprit d'entreprise, sa capacité à se réinventer et son sens du risque calculé en font un ambassadeur concret du dynamisme économique franco-israélien. Un profil qui parle naturellement aux entrepreneurs, aux porteurs de projet et aux investisseurs de la communauté française en Israël.",
  },
  {
    numero: 14,
    nom: "Rachel Hababou",
    slug: "rachel-hababou",
    photo: "/images/candidates/14-hababou.webp",
    accroche: "Comptable/commerciale retraitée · Ancrée à Ashdod",
    bioFull: "Comptable et commerciale retraitée, Rachel a fait son Alya en 2014 et réside à Ashdod.\n\nSon expérience dans la gestion et le relationnel commercial, associée à son ancrage dans le sud d'Israël, renforce la représentation géographique de la liste et permet de relayer la voix des Français installés loin de l'axe Tel-Aviv / Haïfa — souvent moins écoutés par les représentations consulaires traditionnelles.",
  },
  {
    numero: 15,
    nom: "Denis Sebban",
    slug: "denis-sebban",
    photo: "/images/candidates/15-denis-sebban.webp",
    accroche: "Ancien industriel de la chaussure · Olé hadach, oulpan",
    bioFull: "Après une carrière d'industriel dans la chaussure en France, Denis est olé hadach — nouvel immigrant en Israël — et consacre aujourd'hui son temps à l'apprentissage de l'hébreu en oulpan.\n\nSon parcours illustre celui de nombreux Français qui reconstruisent leur vie en Israël à mi-chemin de leur carrière : une voix particulièrement représentative pour les nouveaux arrivants et leurs défis quotidiens — reconnaissance de l'expérience professionnelle, intégration linguistique, démarches administratives.",
  },
  {
    numero: 16,
    nom: "Josiane Marcovici",
    slug: "josiane-marcovici",
    photo: "/images/candidates/16-marcovici.webp",
    accroche: "Tour Manager · Spécialiste événementiel hôtelier",
    bioFull: "Après une formation en économie et gestion à l'Université de Nanterre, Josiane a exercé comme Tour Manager avant de se spécialiser dans le montage d'événementiel hôtelier.\n\nSon expertise en organisation, en logistique et en gestion d'équipes sur des projets complexes est un atout opérationnel pour la liste — et une compétence directement transposable au travail consulaire de terrain : coordination de permanences, organisation de réunions publiques, mobilisation d'équipes bénévoles.",
  },
  {
    numero: 17,
    nom: "Claude Charles Kleczewski",
    slug: "claude-kleczewski",
    photo: "/images/candidates/17-kleczewski.webp",
    accroche: "Entrepreneur (assurances) · Consultant, expert d'assurés",
    bioFull: "Entrepreneur précoce dès 25 ans, Claude a dirigé un important cabinet d'assurances familial dans le nord de la France — deuxième entreprise de sa ville — tout en assumant de lourdes responsabilités familiales.\n\nAprès son installation à Paris à 29 ans, il a occupé des postes de cadre de direction dans une mutuelle puis une compagnie d'assurance, avant de fonder son propre cabinet qu'il a revendu pour éviter la routine. Il s'est ensuite réinventé en gérant un grand magasin de vêtements en centre commercial, puis a terminé sa vie professionnelle comme consultant et expert d'assurés.\n\nAujourd'hui, il se positionne dans un rôle de réflexion, d'analyse, d'anticipation, et dans l'action militante de terrain. Son expertise en assurance et en gestion de litiges est directement utile aux Franco-Israéliens confrontés à des problématiques de couverture santé, de retraite, de succession transfrontalière.",
  },
  {
    numero: 18,
    nom: "Rosine Esther Laloum",
    slug: "rosine-laloum",
    photo: "/images/candidates/18-laloum.webp",
    accroche: "Biographie à venir",
    bioFull: "Biographie à venir.",
  },
];

// 13. SOLEMN COMMITMENTS
export const solemnCommitments = [
  { number: "01", title: "Transparence totale", description: "Publication PV sous 15 jours" },
  { number: "02", title: "Indépendance des partis", description: "Zéro affiliation politique" },
  { number: "03", title: "Défense active", description: "Bouclier des droits des Franco-Israéliens" },
  { number: "04", title: "Zéro clientélisme", description: "Aucune subvention aux proches" },
  { number: "05", title: "Dialogue et accessibilité", description: "2 réunions publiques/an + rapport semestriel" },
];

// 14. FAQ ITEMS (COMPLÈTE)
export const faqItems = [
  {
    question: "Qui peut voter aux élections consulaires 2026 ?",
    answer: "Tout Français majeur (18 ans révolus) inscrit sur la Liste Électorale Consulaire (LEC) de la 2e circonscription d'Israël à la date du 24 avril 2026. Vous pouvez vérifier votre inscription sur service-public.fr, rubrique « Français à l'étranger ». Si vous n'êtes pas encore inscrit, la date limite est le 24 avril 2026.",
  },
  {
    question: "Comment s'inscrire sur la Liste Électorale Consulaire ?",
    answer: "Quatre moyens sont possibles : en ligne sur service-public.fr (délai 2 à 5 jours), au Consulat général de France à Tel-Aviv (112 Herbert Samuel Promenade), au Consulat de Haïfa, ou à la permanence de Netanya. Documents requis : un passeport ou une CNI française en cours de validité, ainsi qu'un justificatif de résidence en Israël. Date limite impérative : 24 avril 2026.",
  },
  {
    question: "Je n'ai pas de carte d'électeur. Puis-je voter ?",
    answer: "Oui. La carte d'électeur n'est pas obligatoire pour voter aux élections consulaires. Pour voter à l'urne le 31 mai, il suffit de présenter un passeport français OU une carte nationale d'identité française en cours de validité. Attention : les documents israéliens seuls (teudat zehout) ne sont pas acceptés comme pièce d'identité pour ce scrutin.",
  },
  {
    question: "Je n'ai pas reçu mes identifiants pour le vote par internet, que faire ?",
    answer: "Les identifiants sont envoyés par e-mail par le ministère vers le 15 mai 2026. Vérifiez votre boîte de réception principale et votre dossier spam. Si, passé le 20 mai, vous ne les avez toujours pas reçus, contactez sans tarder le consulat de rattachement (Tel-Aviv ou Haïfa) qui pourra déclencher un renvoi. Vérifiez également que l'adresse e-mail associée à votre inscription LEC est à jour.",
  },
  {
    question: "Puis-je voter en ligne ET à l'urne ?",
    answer: "Non. Le choix est exclusif. Si vous votez par internet entre le 21 et le 27 mai 2026, votre vote à l'urne du 31 mai ne sera pas accepté par le bureau de vote. Il faut choisir un seul mode de scrutin. Une fois le vote en ligne validé, vous êtes enregistré comme ayant voté.",
  },
  {
    question: "Combien d'élus pour cette circonscription ?",
    answer: "13 élus au total : 7 conseillers des Français de l'étranger et 6 délégués consulaires. L'ensemble est élu au scrutin proportionnel de liste à un tour, à la règle de la plus forte moyenne. Le mandat est de 5 ans (2026-2031).",
  },
  {
    question: "Les conseillers sont-ils rémunérés ?",
    answer: "Non. Les conseillers des Français de l'étranger et les délégués consulaires exercent un mandat strictement bénévole. Aucune rémunération, aucun salaire, aucune indemnité mensuelle. Cela garantit l'indépendance des élus vis-à-vis de tout intérêt financier direct.",
  },
  {
    question: "Quelle différence entre un conseiller et un délégué consulaire ?",
    answer: "Les conseillers des Français de l'étranger (7 pour notre circonscription) siègent au Conseil consulaire local ET à l'Assemblée des Français de l'Étranger (AFE) à Paris. Ils participent à l'élection des sénateurs représentant les Français établis hors de France. Les délégués consulaires (6) siègent uniquement au Conseil consulaire local. Les deux rôles sont complémentaires et essentiels sur les dossiers qui comptent : bourses AEFE, STAFE, aide sociale, démarches administratives, éducation, sécurité.",
  },
  {
    question: "Le vote est-il vraiment secret et sécurisé ?",
    answer: "Oui. Le vote par internet utilise un système chiffré de bout en bout, audité par l'ANSSI (Agence nationale de la sécurité des systèmes d'information). Chaque électeur reçoit des identifiants personnels et confidentiels. Le vote à l'urne se fait avec isoloir, bulletins et passage devant un président de bureau, comme en France. Dans les deux cas, le secret du vote est garanti.",
  },
  {
    question: "Comment puis-je aider la liste « Avec les Patriotes d'Israël » ?",
    answer: "Le plus important : votez, et faites voter autour de vous — famille, amis, voisins, groupes WhatsApp. Partagez notre guide de vote depuis la page Comment voter (bouton WhatsApp intégré). Si vous souhaitez vous engager plus directement — tractage, permanences, relais sur les réseaux sociaux — utilisez notre formulaire de contact. Enfin, chaque don sur notre page Soutenir contribue aux frais de campagne : impression, communication, matériel électoral.",
  },
];

// LEXIQUE (COMPLET)
export const lexicon = [
  {
    term: "AFE",
    definition: "Assemblée des Français de l'Étranger. Instance composée de 90 conseillers élus indirectement par les 442 conseillers consulaires répartis dans le monde. Rôle consultatif sur les politiques publiques concernant les Français établis hors de France.",
  },
  {
    term: "AEFE",
    definition: "Agence pour l'Enseignement Français à l'Étranger. Opérateur public qui pilote le réseau mondial des lycées français et attribue les bourses scolaires aux familles françaises expatriées sous condition de ressources.",
  },
  {
    term: "ASFE",
    definition: "Alliance Solidaire des Français de l'Étranger. L'un des groupes politiques constitués au sein de l'AFE, regroupant des conseillers partageant une sensibilité commune.",
  },
  {
    term: "CFE",
    definition: "Caisse des Français de l'Étranger. Organisme de protection sociale volontaire pour les Français établis hors de France : couverture maladie-maternité, accidents du travail, retraite complémentaire.",
  },
  {
    term: "LEC",
    definition: "Liste Électorale Consulaire. Registre sur lequel doit être inscrit tout Français de l'étranger souhaitant voter aux élections consulaires, présidentielles, législatives (11e circonscription) ou européennes depuis son pays de résidence.",
  },
  {
    term: "Olim",
    definition: "Hébreu : « immigrants montés en Israël » (pluriel). Désigne ceux qui ont effectué leur Alya. Au singulier : olé hadach (masculin) ou olah hadachah (féminin).",
  },
  {
    term: "Olé hadach",
    definition: "Nouvel immigrant en Israël dans le cadre de l'Alya. Ce statut confère divers droits pendant les premières années : aide à l'intégration, allégements fiscaux, cours d'hébreu gratuits en Oulpan, accompagnement administratif.",
  },
  {
    term: "PV",
    definition: "Procès-verbal. Compte rendu officiel d'une réunion du Conseil consulaire. Sa publication systématique sous 15 jours est l'un de nos engagements solennels pour la transparence.",
  },
  {
    term: "STAFE",
    definition: "Soutien au Tissu Associatif des Français de l'Étranger. Dispositif de subventions accordées par le ministère via les consulats aux associations françaises locales porteuses de projets culturels, éducatifs ou de solidarité.",
  },
  {
    term: "USFE",
    definition: "Union des Français de l'Étranger. Association historique fondée en 1927 représentant les intérêts des Français établis hors de France auprès des pouvoirs publics.",
  },
  {
    term: "Tsahal",
    definition: "Forces de défense d'Israël (en hébreu : Tsva Hahaganah LeIsrael). Armée israélienne. De nombreux Franco-Israéliens y effectuent leur service ou s'y engagent comme combattants.",
  },
  {
    term: "Toenet Rabbinique",
    definition: "Avocate habilitée à plaider devant les tribunaux rabbiniques en Israël sur les affaires de statut personnel : mariage, divorce, conversion, succession dans le droit hébraïque. Équivalent féminin du Toen.",
  },
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
