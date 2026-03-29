import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, User } from 'lucide-react';
import { Layout } from '../components/Layout';
import { candidates, assets } from '../config/content';
import { Button } from '../components/ui/button';

const CandidateCard = ({ candidate, isTeteDeListe = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white overflow-hidden group ${
        isTeteDeListe 
          ? 'border-2 border-fr-blue shadow-xl' 
          : 'border border-slate-200 hover:shadow-lg transition-shadow'
      }`}
      data-testid={`candidate-${candidate.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isTeteDeListe ? 'aspect-[4/5]' : 'aspect-square'}`}>
        {candidate.image ? (
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <User className="w-16 h-16 text-slate-300" />
          </div>
        )}
        
        {/* Overlay for Tete de Liste */}
        {isTeteDeListe && (
          <div className="absolute inset-0 bg-gradient-to-t from-fr-blue/70 via-transparent to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${isTeteDeListe ? 'bg-fr-blue text-white' : ''}`}>
        {isTeteDeListe && (
          <span className="inline-block bg-republic-red text-white text-xs uppercase tracking-wider font-bold px-3 py-1 mb-3">
            {candidates.teteDeListeTitle}
          </span>
        )}
        <h3 className={`font-serif text-xl md:text-2xl font-bold mb-1 ${
          isTeteDeListe ? 'text-white' : 'text-slate-900'
        }`}>
          {candidate.name}
        </h3>
        <p className={`text-sm ${isTeteDeListe ? 'text-white/80' : 'text-slate-500'}`}>
          {candidate.role}
        </p>
        {candidate.bio && (
          <p className={`mt-4 text-sm leading-relaxed ${
            isTeteDeListe ? 'text-white/90' : 'text-slate-600'
          }`}>
            {candidate.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const Liste = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="liste-hero">
        <div className="container-campaign">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
                Nos Candidats
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                {candidates.title}
              </h1>
              <p className="text-xl text-slate-600">
                {candidates.subtitle}
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={assets.logoMain}
              alt="Logo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Tête de Liste */}
      <section className="section-spacing bg-white" data-testid="tete-de-liste-section">
        <div className="container-campaign">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <CandidateCard candidate={candidates.teteDeListe} isTeteDeListe />
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                Un Leader pour les Français d'Israël
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Le Professeur Michael Ayache incarne la rupture avec la soumission. Engagé, déterminé, il porte la voix de ceux qui refusent d'être traités comme des figurants par l'administration française.
              </p>
              <blockquote className="border-l-4 border-fr-blue pl-6 py-2 italic text-slate-700">
                « Nous ne sommes ni des sujets, ni des supplétifs. Nous sommes des citoyens français fiers d'être Israéliens. »
              </blockquote>
              <Link to="/soutenir">
                <Button className="btn-primary mt-4" data-testid="liste-cta">
                  Soutenir le Professeur Michael Ayache
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tel-Aviv Candidates */}
      <section className="section-spacing bg-slate-50" data-testid="telaviv-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <MapPin className="w-6 h-6 text-il-blue" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              {candidates.telAviv.title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.telAviv.candidates.map((candidate, index) => (
              <motion.div
                key={candidate.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CandidateCard candidate={candidate} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Haïfa Candidates */}
      <section className="section-spacing bg-white" data-testid="haifa-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <MapPin className="w-6 h-6 text-il-blue" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              {candidates.haifa.title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.haifa.candidates.map((candidate, index) => (
              <motion.div
                key={candidate.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CandidateCard candidate={candidate} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-fr-blue text-white" data-testid="liste-cta-banner">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-accent text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              Votez « Avec les Patriotes d'Israël »
            </p>
            <p className="text-white/80 mb-6">
              Tel-Aviv & Haïfa — 30-31 Mai 2026
            </p>
            <Link to="/soutenir">
              <Button className="bg-white text-fr-blue hover:bg-slate-100 font-bold uppercase tracking-wider px-8 py-4">
                Soutenir la Campagne
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Liste;
