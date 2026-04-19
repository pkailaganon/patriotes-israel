import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
import { Layout } from '../components/Layout';
import { CandidateModal } from '../components/CandidateModal';
import { candidatesList, assets } from '../config/content';
import { Button } from '../components/ui/button';

const Equipe = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headCandidate = candidatesList.find(c => c.isHead);
  const otherCandidates = candidatesList.filter(c => !c.isHead);

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="equipe-hero">
        <div className="container-campaign">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
                La Liste
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                18 candidats pour défendre les Français d'Israël
              </h1>
              <p className="text-xl text-slate-600">
                Liste N°6 — Avec les Patriotes d'Israël
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={assets.logoMain}
              alt="Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Tête de Liste */}
      {headCandidate && (
        <section className="py-16 md:py-24 bg-[#13244b] text-white" data-testid="tete-de-liste">
          <div className="container-campaign">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={assets.candidateMichel}
                    alt={headCandidate.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-republic-red text-white px-4 py-2 font-accent text-lg font-bold">
                  N°1 · Tête de Liste
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
                  {headCandidate.nom}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  {headCandidate.bioFull}
                </p>
                <Link to={`/equipe/${headCandidate.slug}`}>
                  <Button className="bg-white text-[#13244b] hover:bg-slate-100 font-bold uppercase tracking-wider">
                    Lire mon engagement complet
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Colistiers Grid */}
      <section className="section-spacing bg-white" data-testid="colistiers-grid">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Les 17 Colistiers
            </h2>
            <p className="text-slate-600">
              Une équipe diverse et engagée pour vous représenter
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.numero}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Photo */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  {candidate.photo && !candidate.useSilhouette ? (
                    <img
                      src={candidate.photo}
                      alt={candidate.nom}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-full h-full ${candidate.photo && !candidate.useSilhouette ? 'hidden' : 'flex'} items-center justify-center bg-slate-100 absolute inset-0`}
                  >
                    <User className="w-20 h-20 text-slate-300" />
                  </div>
                  
                  {/* Badge numéro */}
                  <div className="absolute top-3 left-3 bg-fr-blue text-white px-3 py-1 font-accent text-sm font-bold">
                    N°{String(candidate.numero).padStart(2, '0')}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    {candidate.nom}
                  </h3>
                  {candidate.accroche && candidate.accroche !== 'PLACEHOLDER' && (
                    <p className="text-slate-600 text-sm mb-4">
                      {candidate.accroche}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(candidate)}
                    className="w-full"
                    data-testid={`candidate-btn-${candidate.numero}`}
                  >
                    Lire le parcours
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-fr-blue text-white" data-testid="equipe-cta">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-accent text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              Votez Liste N°6
            </p>
            <p className="text-white/80 mb-8">
              21-27 mai en ligne · 31 mai à l'urne
            </p>
            <Link to="/comment-voter">
              <Button className="bg-white text-fr-blue hover:bg-slate-100 font-bold uppercase tracking-wider px-8 py-4">
                Découvrir comment voter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Layout>
  );
};

export default Equipe;
