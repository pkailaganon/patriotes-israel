import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Layout } from '../components/Layout';
import { candidatesList } from '../config/content';
import { Button } from '../components/ui/button';
import { ShareWhatsApp } from '../components/ShareWhatsApp';

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

  const pageUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://patriotes-israel.com/equipe/${candidate.slug}`;

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

      {/* Bio / Engagement */}
      <section className="section-spacing bg-white" data-testid="candidate-bio">
        <div className="container-campaign">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {candidate.ayacheEngagement ? (
                /* ── Tête de liste : 4 blocs structurés ── */
                <div className="space-y-8">

                  {/* Bloc 1 — Salutation + paragraphes intro */}
                  <div className="bg-slate-50 border border-slate-200 p-8 md:p-12">
                    <p className="font-serif text-xl md:text-2xl text-fr-blue italic mb-6">
                      {candidate.ayacheEngagement.greeting}
                    </p>
                    <div className="space-y-5">
                      {candidate.ayacheEngagement.paragraphs.map((p, i) => (
                        <p key={i} className="text-slate-700 leading-relaxed text-lg">{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Bloc 2 — Engagements numérotés */}
                  <div className="bg-fr-blue/5 border-l-4 border-fr-blue p-8 md:p-10">
                    <p className="font-serif text-lg md:text-xl font-bold text-slate-900 italic mb-8">
                      {candidate.ayacheEngagement.commitmentsIntro}
                    </p>
                    <div className="space-y-6">
                      {candidate.ayacheEngagement.commitments.map((commitment, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="font-accent text-4xl md:text-5xl font-bold text-fr-blue/25 flex-shrink-0 leading-none w-10">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-slate-700 leading-relaxed pt-1">{commitment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bloc 3 — Paragraphes de clôture */}
                  <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 space-y-5">
                    {candidate.ayacheEngagement.closingParagraphs.map((p, i) => (
                      <p key={i} className="text-slate-700 leading-relaxed text-lg">{p}</p>
                    ))}
                  </div>

                  {/* Bloc 4 — Signature */}
                  <div className="border-t-2 border-fr-blue pt-6">
                    <p className="font-serif text-xl font-bold text-slate-900 mb-1">
                      {candidate.ayacheEngagement.signature}
                    </p>
                    <p className="text-fr-blue font-medium">
                      {candidate.ayacheEngagement.signatureRole}
                    </p>
                  </div>

                </div>
              ) : candidate.bioFull && candidate.bioFull !== "Biographie à venir." ? (
                /* ── Colistiers : bio standard avec sauts de paragraphes ── */
                <div className="bg-slate-50 border border-slate-200 p-8 md:p-12">
                  <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                    {candidate.bioFull}
                  </div>
                </div>
              ) : (
                /* ── Placeholder ── */
                <div className="bg-slate-50 border border-slate-200 p-8 md:p-12">
                  <p className="text-slate-500 italic text-center">
                    Biographie complète à paraître. Revenez bientôt.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <ShareWhatsApp
                message={`👤 Je vous présente ${candidate.nom}, N°${String(candidate.numero).padStart(2, '0')} sur la liste « Avec les Patriotes d'Israël » (Liste N°6) pour les élections consulaires 2026.\n\n${candidate.accroche && candidate.accroche !== 'PLACEHOLDER' ? candidate.accroche + '\n\n' : ''}Découvrez son parcours complet :\n${pageUrl}\n\nVote en ligne 21-27 mai · Urne 31 mai. Faites passer ! 🗳️`}
                buttonText="Partager sur WhatsApp"
                testId={`candidate-page-whatsapp-${candidate.slug}`}
              />
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
