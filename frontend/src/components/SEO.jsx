import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = "Avec les Patriotes d'Israël — Liste N°6 — Élections Consulaires 2026";
const DEFAULT_DESC = "Liste N°6 pour les élections consulaires françaises 2026 — 2e circonscription Tel-Aviv / Haïfa. Avec les Patriotes d'Israël — le renouveau pour vous défendre.";
const DEFAULT_IMAGE = "https://patriotes-israel.com/images/og-default.jpg";

export const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) => {
  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "https://patriotes-israel.com");
  const fullImage = image.startsWith("http") ? image : `https://patriotes-israel.com${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Avec les Patriotes d'Israël" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
