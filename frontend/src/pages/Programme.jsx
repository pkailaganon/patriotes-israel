import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Flag, Vote, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { programme } from '../config/content';
import { Button } from '../components/ui/button';

const iconMap = {
  Shield: Shield,
  Flag: Flag,
  Vote: Vote,
  Users: Users,
};

const Programme = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="programme-hero">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
              Notre Programme
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              {programme.title}
            </h1>
            <p className="text-xl md:text-2xl text-il-blue font-medium">
              {programme.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitments Grid */}
      <section className="section-spacing" data-testid="commitments-section">
        <div className="container-campaign">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {programme.commitments.map((commitment, index) => {
              const IconComponent = iconMap[commitment.icon] || Shield;
              const isLarge = index === 0 || index === 3;
              
              return (
                <motion.div
                  key={commitment.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white p-8 md:p-10 border border-slate-200 hover:shadow-xl transition-all duration-300 group ${
                    isLarge ? 'md:row-span-1' : ''
                  }`}
                  data-testid={`commitment-${commitment.id}`}
                >
                  {/* Number Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-fr-blue flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-accent text-6xl font-bold text-slate-100 group-hover:text-fr-blue/20 transition-colors">
                      0{commitment.id}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {commitment.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {commitment.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center text-fr-blue font-medium text-sm">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Engagement ferme
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Message */}
      <section className="py-16 md:py-24 bg-slate-900 text-white" data-testid="key-message">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Assez de la « politesse » soumise
            </h2>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Assez des interlocuteurs dociles, obsédés par les décorations, les invitations et les avantages personnels, qui ne contestent jamais les décisions de l'Élysée ou du Quai d'Orsay, même quand elles ignorent la réalité des Français d'Israël.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/soutenir">
                <Button className="btn-accent" data-testid="programme-cta-donate">
                  Soutenir la Campagne
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/liste">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900" data-testid="programme-cta-list">
                  Découvrir la Liste
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-16 md:py-20 bg-republic-red text-white" data-testid="final-call">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-accent text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Le 30 et 31 Mai 2026
            </p>
            <p className="text-xl md:text-2xl font-medium">
              À Tel-Aviv et Haïfa — <span className="font-bold">Votez pour la Rupture</span>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Programme;
