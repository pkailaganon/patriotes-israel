// Configuration HYP Payment
// ============================================
// Pour activer les paiements, remplacez les valeurs TODO par vos identifiants HYP
// Documentation HYP: https://www.hyp.co.il/

export const paymentConfig = {
  // TODO: Remplacez par votre Terminal ID HYP
  terminalId: "TODO_TERMINAL_ID",
  
  // TODO: Remplacez par votre API Key HYP
  apiKey: "TODO_API_KEY",
  
  // TODO: Remplacez par votre URL de callback HYP
  callbackUrl: "TODO_CALLBACK_URL",
  
  // URL de base HYP (production)
  // En mode test, utilisez: https://pay.hyp.co.il/test
  baseUrl: "https://pay.hyp.co.il",
  
  // Configuration par défaut
  defaults: {
    currency: "ILS",
    language: "he", // Hebrew interface for Israeli users
    description: "Don - Avec les Patriotes d'Israël",
  },
  
  // Montants prédéfinis en ILS
  presetAmounts: [18, 50, 100, 200],
  
  // Taux de conversion approximatif EUR -> ILS
  // TODO: Utilisez un service de taux de change en temps réel en production
  eurToIlsRate: 4.0,
};

/**
 * Génère l'URL de paiement HYP
 * @param {number} amount - Montant en ILS
 * @param {string} email - Email du donateur (optionnel)
 * @returns {string} URL de paiement
 */
export const generatePaymentUrl = (amount, email = "") => {
  const { terminalId, baseUrl, defaults } = paymentConfig;
  
  // TODO: En production, générez cette URL côté serveur avec signature
  const params = new URLSearchParams({
    terminal: terminalId,
    amount: amount.toString(),
    currency: defaults.currency,
    description: defaults.description,
    lang: defaults.language,
    ...(email && { email }),
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Vérifie si la configuration HYP est complète
 * @returns {boolean}
 */
export const isPaymentConfigured = () => {
  return (
    paymentConfig.terminalId !== "TODO_TERMINAL_ID" &&
    paymentConfig.apiKey !== "TODO_API_KEY"
  );
};
