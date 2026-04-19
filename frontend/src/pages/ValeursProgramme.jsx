import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { valuesDetailed, actionSheets } from '../config/content';
import { Button } from '../components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const ValeursProgramme = () => {
  return (
    <Layout>
      <SEO
        title="Valeurs & Programme — Liste N°6 — Avec les Patriotes d'Israël"
        description="Nos 5 valeurs et 5 fiches action pour les Français d'Israël : défense, transparence, indépendance, représentativité, action terrain."
      />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="valeurs-hero">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
              Nos valeurs & Programme
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Juifs, Sionistes, Patriotes
            </h1>
            <p className="text-xl md:text-2xl text-fr-blue font-medium">
              5 valeurs, 5 fiches action
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Detailed */}
      <section className="section-spacing bg-white" data-testid="values-detailed">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Nos 5 Valeurs en Détail
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {valuesDetailed.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 border border-slate-200 p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-fr-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-accent text-lg font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Sheets */}
      <section className="section-spacing bg-slate-50" data-testid="action-sheets">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              5 Fiches Action
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Des engagements concrets pour les Franco-Israéliens
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {actionSheets.map((sheet, index) => (
              <motion.div
                key={sheet.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border border-slate-200 p-6 md:p-8 hover:shadow-xl transition-shadow ${
                  index === actionSheets.length - 1 && actionSheets.length % 2 === 1 
                    ? 'md:col-span-2 md:max-w-lg md:mx-auto' 
                    : ''
                }`}
                data-testid={`action-sheet-${sheet.number}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-accent text-5xl md:text-6xl font-bold text-fr-blue/20">
                    {sheet.number}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-900 pt-2">
                    {sheet.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {sheet.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-fr-blue flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-fr-blue text-white" data-testid="valeurs-cta">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              Qui porte ce projet ?
            </h2>
            <Link to="/equipe">
              <Button className="bg-white text-fr-blue hover:bg-slate-100 font-bold uppercase tracking-wider px-8 py-4">
                Découvrir l'équipe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ValeursProgramme;
