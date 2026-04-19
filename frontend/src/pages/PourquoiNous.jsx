import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EyeOff, Coins, ShieldOff, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { pourquoiNousCards } from '../config/content';
import { Button } from '../components/ui/button';

const iconMap = {
  EyeOff,
  Coins,
  ShieldOff,
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const PourquoiNous = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="pourquoi-hero">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-republic-red/10 text-republic-red px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
              Diagnostic
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              20 ans de gestion opaque
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium mb-6">
              Il est temps de tourner la page
            </p>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              Les conseillers sortants se sont maintenus sans opposition pendant plus de 20 ans, 
              grâce à une abstention de 95%. Il est temps de changer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 Cards */}
      <section className="section-spacing bg-white" data-testid="pourquoi-cards">
        <div className="container-campaign">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {pourquoiNousCards.map((card, index) => {
              const IconComponent = iconMap[card.icon] || EyeOff;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white border border-slate-200 p-8 hover:shadow-xl transition-shadow"
                  data-testid={`pourquoi-card-${index}`}
                >
                  <div className="w-14 h-14 bg-republic-red/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-republic-red" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conclusion Box */}
      <section className="py-12 md:py-16 bg-slate-50" data-testid="pourquoi-conclusion">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-fr-blue/5 border-l-4 border-fr-blue p-8 md:p-10">
              <p className="text-lg md:text-xl text-slate-800 leading-relaxed italic">
                "La division des sortants en 2026, conjuguée à la mobilisation d'une communauté 
                traumatisée par le 7 octobre, crée une opportunité historique de renouvellement."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-fr-blue text-white" data-testid="pourquoi-cta">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              Découvrez notre alternative
            </h2>
            <Link to="/valeurs-programme">
              <Button className="bg-white text-fr-blue hover:bg-slate-100 font-bold uppercase tracking-wider px-8 py-4">
                Découvrez notre programme
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PourquoiNous;
