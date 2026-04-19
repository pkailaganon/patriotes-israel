import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Layout } from '../components/Layout';
import { candidatesList } from '../config/content';
import { Button } from '../components/ui/button';

const CandidatePage = () => {
  const { slug } = useParams();
  const candidate = candidatesList.find(c => c.slug === slug);

  if (!candidate) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <div className="container-campaign">
            <p className="text-slate-600 mb-6">Candidat non trouvé.</p>
            <Link to="/equipe">
              <Button variant="outline">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour à l'équipe
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#13244b] text-white" data-testid="candidate-page-hero">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link
              to="/equipe"
              className="inline-flex items-center text-white/70 hover:text-white text-sm mb-8 transition-colors"
              data-testid="back-to-equipe"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour à l'équipe
            </Link>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Photo */}
              <div className="w-40 md:w-56 aspect-square flex-shrink-0 overflow-hidden bg-white/10 relative">
                {candidate.photo && !candidate.useSilhouette ? (
                  <img
                    src={candidate.photo}
                    alt={candidate.nom}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full ${candidate.photo && !candidate.useSilhouette ? 'hidden' : 'flex'} items-center justify-center bg-white/10 absolute inset-0`}
                >
                  <User className="w-16 h-16 text-white/40" />
                </div>
                <div className="absolute top-2 left-2 bg-republic-red text-white px-3 py-1 font-accent text-sm font-bold">
                  N°{String(candidate.numero).padStart(2, '0')}
                </div>
              </div>

              {/* Info */}
              <div>
                <span className="inline-block bg-white/10 text-white/80 px-3 py-1 text-xs uppercase tracking-widest font-bold mb-4">
                  {candidate.accroche && candidate.accroche !== 'PLACEHOLDER' ? candidate.accroche : 'Liste N°6'}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {candidate.nom}
                </h1>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="section-spacing bg-white" data-testid="candidate-bio">
        <div className="container-campaign">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200 p-8 md:p-12"
            >
              <p className="text-slate-600 leading-relaxed text-lg">
                {candidate.bioFull && !candidate.bioFull.startsWith('PLACEHOLDER')
                  ? candidate.bioFull
                  : 'Biographie complète à paraître. Revenez bientôt.'}
              </p>
            </motion.div>

            <div className="mt-8 text-center">
              <Link to="/equipe">
                <Button variant="outline" data-testid="back-btn">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Voir tous les candidats
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CandidatePage;
