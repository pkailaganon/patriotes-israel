import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Heart } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { ShareWhatsApp } from '../components/ShareWhatsApp';
import { Button } from '../components/ui/button';

const SoutenirMerci = () => {
  const location = useLocation();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Pull donation info from navigation state (if any)
    if (location.state) setInfo(location.state);
  }, [location.state]);

  const shareMessage =
    "Je viens de soutenir la liste N°6 \"Avec les Patriotes d'Israël\" pour les élections consulaires 2026 (Tel-Aviv / Haïfa). Rejoignez-nous sur https://patriotes-israel.com/soutenir 🇫🇷🇮🇱";

  return (
    <Layout>
      <SEO
        title="Merci — Avec les Patriotes d'Israël"
        description="Merci pour votre soutien à la liste N°6. Votre don contribue directement à la campagne des Français d'Israël."
      />

      <section className="py-20 md:py-28 bg-gradient-to-br from-fr-blue to-il-blue text-white relative overflow-hidden" data-testid="merci-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-campaign relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.7 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-8"
            data-testid="merci-icon"
          >
            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Merci pour votre soutien
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/90 leading-relaxed mb-4"
          >
            Votre don contribue directement à la campagne de la liste N°6.
          </motion.p>

          {info?.amount && info?.currency && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-4"
              data-testid="merci-amount"
            >
              Don confirmé : <strong>{info.amount} {info.currency}</strong>
              {info.captureID && (
                <span className="block text-sm text-white/60 mt-1">
                  Référence : {info.captureID}
                </span>
              )}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 italic mb-10"
          >
            Un reçu par email vous sera transmis par PayPal. Les dons ≥ 150 € peuvent donner lieu à un reçu fiscal sur demande.
          </motion.p>
        </div>
      </section>

      <section className="section-spacing bg-slate-50">
        <div className="container-campaign max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 p-8 md:p-10 text-center"
            data-testid="merci-share-card"
          >
            <Heart className="w-10 h-10 text-republic-red mx-auto mb-4" fill="currentColor" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Multipliez l'impact de votre don
            </h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Invitez vos proches à soutenir la campagne. Un message WhatsApp peut convaincre dix autres électeurs de s'inscrire à temps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ShareWhatsApp
                message={shareMessage}
                variant="primary"
                size="lg"
                testId="merci-share-whatsapp"
              />
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-fr-blue text-fr-blue hover:bg-fr-blue hover:text-white"
                  data-testid="merci-home-btn"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SoutenirMerci;
