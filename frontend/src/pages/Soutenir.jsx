import { motion } from 'framer-motion';
import { Heart, Share2, Shield } from 'lucide-react';
import { Layout } from '../components/Layout';
import { DonationForm } from '../components/DonationForm';
import { donation, assets } from '../config/content';

const Soutenir = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-fr-blue to-il-blue text-white relative overflow-hidden" data-testid="soutenir-hero">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-campaign relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-republic-red" fill="currentColor" />
                <span className="text-white/80 uppercase tracking-wider text-sm font-bold">
                  Soutenez-nous
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {donation.title}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                {donation.description}
              </p>
              <blockquote className="border-l-4 border-republic-red pl-6 py-2 text-white/90 italic">
                {donation.emotionalCopy}
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={assets.logoDates}
                alt="Avec les Patriotes d'Israël - Élections 2026"
                className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-spacing bg-slate-50" data-testid="donation-section">
        <div className="container-campaign">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Faites un don
                </h2>
                <p className="text-slate-600 mb-8">
                  {donation.subtitle}
                </p>
                <DonationForm />
              </motion.div>
            </div>

            {/* Side Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 space-y-6"
              >
                {/* Why Support Card */}
                <div className="bg-white p-6 border border-slate-200" data-testid="why-support-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-fr-blue/10 rounded-sm flex items-center justify-center">
                      <Shield className="w-5 h-5 text-fr-blue" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Pourquoi nous soutenir ?
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-fr-blue rounded-full mt-2 flex-shrink-0" />
                      Financer notre campagne terrain à Tel-Aviv et Haïfa
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-fr-blue rounded-full mt-2 flex-shrink-0" />
                      Produire des supports de communication percutants
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-fr-blue rounded-full mt-2 flex-shrink-0" />
                      Organiser des rencontres avec les Français d'Israël
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-fr-blue rounded-full mt-2 flex-shrink-0" />
                      Envoyer un message fort à Paris
                    </li>
                  </ul>
                </div>

                {/* Share Card */}
                <div className="bg-slate-900 text-white p-6" data-testid="share-card">
                  <div className="flex items-center gap-3 mb-4">
                    <Share2 className="w-5 h-5" />
                    <h3 className="font-serif text-lg font-bold">
                      Partagez notre cause
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    Vous ne pouvez pas donner ? Partagez notre message avec vos proches. Chaque partage compte !
                  </p>
                  <div className="text-xs text-slate-400 bg-slate-800 p-3 rounded-sm">
                    {donation.shareMessage.substring(0, 100)}...
                  </div>
                </div>

                {/* Chai Explanation */}
                <div className="bg-campaign-gold/10 border border-campaign-gold/30 p-6" data-testid="chai-card">
                  <h4 className="font-serif font-bold text-slate-900 mb-2">
                    18₪ = Chai (חי) = La Vie
                  </h4>
                  <p className="text-sm text-slate-600">
                    Dans la tradition juive, le chiffre 18 symbolise la vie. Un don de 18₪ est un geste symbolique fort de soutien à notre combat.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-republic-red text-white" data-testid="soutenir-bottom-cta">
        <div className="container-campaign text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-accent text-2xl md:text-3xl font-bold uppercase tracking-tight"
          >
            Rupture avec la soumission – Défense de vos droits – Fierté d'être Français en Israël
          </motion.p>
        </div>
      </section>
    </Layout>
  );
};

export default Soutenir;
