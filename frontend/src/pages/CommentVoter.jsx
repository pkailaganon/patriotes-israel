import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, MapPin, Clock, FileText } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { 
  keyDates, lecInscription, voteInternetSteps, 
  pollingStations, regulatoryFrame 
} from '../config/content';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { ShareWhatsApp } from '../components/ShareWhatsApp';

const CommentVoter = () => {
  return (
    <Layout>
      <SEO
        title="Comment voter — Élections Consulaires 2026 — Liste N°6"
        description="Mode d'emploi complet : inscription LEC (24 avril), vote en ligne (21-27 mai), vote à l'urne (31 mai). Votez Liste N°6 « Avec les Patriotes d'Israël »."
      />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="voter-hero">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
              Mode d'emploi
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Comment voter ?
            </h1>
            <p className="text-xl md:text-2xl text-slate-600">
              Inscription, vote en ligne, bureau de vote — tout ce qu'il faut savoir
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Dates Banner */}
      <section className="py-8 bg-fr-blue text-white" data-testid="key-dates">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {keyDates.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-white/10 border border-white/20"
              >
                <p className="font-accent text-xl md:text-2xl font-bold mb-1">
                  {item.date}
                </p>
                <p className="text-sm text-white/80 uppercase tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEC Inscription */}
      <section className="section-spacing bg-white" data-testid="lec-inscription">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              S'inscrire sur la LEC
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              {lecInscription.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {lecInscription.methods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-200 p-6"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">{method.steps}</p>
                  <p className="text-fr-blue text-sm font-medium">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Délai : {method.delay}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-100 p-6 text-center">
              <FileText className="w-8 h-8 text-fr-blue mx-auto mb-3" />
              <p className="text-slate-700 font-medium">
                <strong>Documents requis :</strong> {lecInscription.documents}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vote Internet Steps */}
      <section className="section-spacing bg-slate-50" data-testid="vote-internet">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Vote Internet en 5 Étapes
            </h2>
            <p className="text-slate-600">Du 21 au 27 mai 2026</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {voteInternetSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-fr-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-accent text-xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-amber-50 border border-amber-400 p-6 flex items-start gap-4"
            >
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 font-medium">
                <strong>IMPORTANT :</strong> Si vous votez en ligne, vous NE POUVEZ PAS voter à l'urne.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Polling Stations */}
      <section className="section-spacing bg-white" data-testid="polling-stations">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Bureaux de Vote — 31 Mai 2026
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-fr-blue text-white">
                  <tr>
                    <th className="p-4 text-left font-serif font-bold">Ville</th>
                    <th className="p-4 text-left font-serif font-bold">Adresse</th>
                    <th className="p-4 text-left font-serif font-bold">Horaires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pollingStations.map((station, index) => (
                    <motion.tr
                      key={station.city}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50"
                    >
                      <td className="p-4 font-medium text-slate-900">
                        <MapPin className="w-4 h-4 inline mr-2 text-fr-blue" />
                        {station.city}
                      </td>
                      <td className="p-4 text-slate-600">{station.address}</td>
                      <td className="p-4 text-slate-600">{station.hours}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ID Alert */}
            <div className="mt-6 bg-slate-100 p-6">
              <p className="text-slate-700">
                <strong>Pièces d'identité acceptées :</strong> Passeport français OU CNI française en cours de validité. 
                Les documents israéliens seuls (teudat zehout) ne sont PAS acceptés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Frame Accordion */}
      <section className="section-spacing bg-slate-50" data-testid="regulatory-frame">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Cadre Réglementaire
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {regulatoryFrame.map((item, index) => (
                <AccordionItem 
                  key={item.title} 
                  value={`item-${index}`}
                  className="bg-white border border-slate-200"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50">
                    <span className="font-serif text-lg font-bold text-slate-900 text-left">
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-slate-600">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* WhatsApp Share */}
      <section className="py-12 md:py-16 bg-[#25D366]/10 border-y border-[#25D366]/20" data-testid="whatsapp-share-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Aidez-nous à mobiliser la communauté
            </h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              Partagez ce guide de vote avec votre famille, vos voisins, vos groupes WhatsApp.
              Chaque Français informé est une voix qui compte.
            </p>
            <ShareWhatsApp
              message={`🗳️ Liste N°6 — Avec les Patriotes d'Israël 🇫🇷🇮🇱\n\nConsulaires 2026 · 2e circonscription Israël (Tel-Aviv & Haïfa)\n\n📅 Vote en ligne : 21-27 mai\n📅 Vote à l'urne : 31 mai\n\nVoici le guide de vote complet, pour toi et tes proches :\nhttps://patriotes-israel.com/comment-voter\n\n#ElectionsConsulaires2026 #PatriotesDIsrael`}
              buttonText="Partager ce guide sur WhatsApp"
              size="lg"
              testId="whatsapp-share-comment-voter"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-fr-blue text-white" data-testid="voter-cta">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              Découvrez l'équipe que vous élirez
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

export default CommentVoter;
