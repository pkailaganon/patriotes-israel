import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { solemnCommitments, faqItems, lexicon } from '../config/content';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const EngagementsFAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" data-testid="engagements-hero">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
              Engagements & Questions
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              5 engagements solennels
            </h1>
            <p className="text-xl md:text-2xl text-slate-600">
              Notre parole d'honneur aux Franco-Israéliens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solemn Commitments */}
      <section className="section-spacing bg-white" data-testid="solemn-commitments">
        <div className="container-campaign">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {solemnCommitments.map((commitment, index) => (
                <motion.div
                  key={commitment.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-slate-50 border border-slate-200 p-6 md:p-8 ${
                    index === solemnCommitments.length - 1 && solemnCommitments.length % 2 === 1 
                      ? 'md:col-span-2 md:max-w-md md:mx-auto' 
                      : ''
                  }`}
                  data-testid={`commitment-${commitment.number}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-accent text-4xl md:text-5xl font-bold text-fr-blue/30">
                      {commitment.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                        {commitment.title}
                      </h3>
                      <p className="text-slate-600">
                        {commitment.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-slate-50" data-testid="faq-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Questions Fréquentes
            </h2>
            <p className="text-slate-600">
              Les questions les plus fréquentes sur le vote, l'inscription et notre engagement.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white border border-slate-200"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50">
                    <span className="font-serif text-lg font-bold text-slate-900 text-left">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-slate-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lexicon */}
      <section className="section-spacing bg-white" data-testid="lexicon-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Lexique
            </h2>
            <p className="text-slate-600">
              Les termes à connaître
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {lexicon.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-200 p-5"
                >
                  <dt className="font-serif text-lg font-bold text-fr-blue mb-1">
                    {item.term}
                  </dt>
                  <dd className="text-slate-600">
                    {item.definition}
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-fr-blue text-white" data-testid="engagements-cta">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              Qui porte ces engagements ?
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

export default EngagementsFAQ;
