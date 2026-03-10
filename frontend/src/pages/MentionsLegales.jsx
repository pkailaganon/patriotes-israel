import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';

const MentionsLegales = () => {
  return (
    <Layout>
      <section className="section-spacing bg-slate-50" data-testid="mentions-legales">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              Mentions Légales
            </h1>

            <div className="prose prose-slate max-w-none space-y-8">
              {/* Éditeur */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Éditeur du site
                </h2>
                <div className="bg-white p-6 border border-slate-200">
                  <p className="text-slate-600 mb-2">
                    <strong>Liste :</strong> Avec les Patriotes d'Israël
                  </p>
                  <p className="text-slate-600 mb-2">
                    <strong>Tête de liste :</strong> Michel (Michael) Ayach
                  </p>
                  <p className="text-slate-600 mb-2">
                    <strong>Circonscription :</strong> Tel-Aviv & Haïfa
                  </p>
                  <p className="text-slate-600 mb-2">
                    <strong>Adresse :</strong> [À COMPLÉTER]
                  </p>
                  <p className="text-slate-600 mb-2">
                    <strong>Email :</strong> [À COMPLÉTER]
                  </p>
                  <p className="text-slate-600">
                    <strong>Téléphone :</strong> [À COMPLÉTER]
                  </p>
                </div>
              </section>

              {/* Directeur de publication */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Directeur de la publication
                </h2>
                <p className="text-slate-600">
                  Michel (Michael) Ayach, en qualité de tête de liste "Avec les Patriotes d'Israël" pour les élections consulaires 2026.
                </p>
              </section>

              {/* Hébergeur */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Hébergement
                </h2>
                <div className="bg-white p-6 border border-slate-200">
                  <p className="text-slate-600 mb-2">
                    <strong>Hébergeur :</strong> [À COMPLÉTER]
                  </p>
                  <p className="text-slate-600 mb-2">
                    <strong>Adresse :</strong> [À COMPLÉTER]
                  </p>
                  <p className="text-slate-600">
                    <strong>Site web :</strong> [À COMPLÉTER]
                  </p>
                </div>
              </section>

              {/* Financement */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Financement de la campagne
                </h2>
                <p className="text-slate-600 mb-4">
                  Conformément à la législation en vigueur relative au financement des campagnes électorales pour les élections des conseillers des Français de l'étranger :
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>Les dons des personnes physiques sont plafonnés à 4 600 € par donateur.</li>
                  <li>Les dons des personnes morales (entreprises, associations) sont interdits.</li>
                  <li>Tout don supérieur à 150 € doit être effectué par chèque, virement ou carte bancaire.</li>
                  <li>Un reçu fiscal sera délivré pour chaque don, permettant une réduction d'impôt de 66% du montant du don dans la limite de 20% du revenu imposable.</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  <strong>Mandataire financier :</strong> [À COMPLÉTER]
                </p>
              </section>

              {/* Propriété intellectuelle */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Propriété intellectuelle
                </h2>
                <p className="text-slate-600 mb-4">
                  L'ensemble du contenu de ce site (textes, images, logos, vidéos, graphismes) est la propriété exclusive de la liste "Avec les Patriotes d'Israël" ou fait l'objet d'une autorisation d'utilisation.
                </p>
                <p className="text-slate-600">
                  Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans l'autorisation écrite préalable de l'éditeur.
                </p>
              </section>

              {/* Données personnelles */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Protection des données personnelles
                </h2>
                <p className="text-slate-600 mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles.
                </p>
                <p className="text-slate-600 mb-4">
                  Les données collectées via les formulaires de ce site (contact, dons) sont utilisées exclusivement dans le cadre de la campagne électorale et ne seront pas cédées à des tiers.
                </p>
                <p className="text-slate-600">
                  Pour exercer vos droits ou pour toute question relative à vos données personnelles, contactez-nous à : <strong>[EMAIL À COMPLÉTER]</strong>
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Cookies
                </h2>
                <p className="text-slate-600 mb-4">
                  Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent pas de données personnelles à des fins commerciales.
                </p>
                <p className="text-slate-600">
                  Vous pouvez paramétrer votre navigateur pour refuser les cookies. Cela pourrait cependant affecter certaines fonctionnalités du site.
                </p>
              </section>

              {/* Responsabilité */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Limitation de responsabilité
                </h2>
                <p className="text-slate-600 mb-4">
                  L'éditeur s'efforce de fournir des informations exactes et à jour sur ce site. Toutefois, il ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
                </p>
                <p className="text-slate-600">
                  L'éditeur décline toute responsabilité pour tout dommage direct ou indirect résultant de l'accès ou de l'utilisation de ce site.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Contact
                </h2>
                <p className="text-slate-600">
                  Pour toute question concernant ces mentions légales ou le fonctionnement du site, vous pouvez nous contacter via le <a href="/contact" className="text-fr-blue hover:underline">formulaire de contact</a>.
                </p>
              </section>

              {/* Date */}
              <section className="pt-8 border-t border-slate-200">
                <p className="text-slate-500 text-sm">
                  Dernière mise à jour : Janvier 2026
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
