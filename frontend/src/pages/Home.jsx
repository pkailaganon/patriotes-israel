import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, Flag, Heart, Eye, Unlink,
  AlertCircle, FileText, Vote, Users
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { Countdown } from '../components/Countdown';
import { 
  hero, assets, siteConfig, keyFigures, fiveValues, 
  homeTeasers, homeQuote 
} from '../config/content';
import { Button } from '../components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const iconMap = {
  Star, Flag, Heart, Eye, Unlink,
  AlertCircle, FileText, Vote, Users
};

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50" data-testid="hero-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2327428F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-campaign relative z-10 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold">
                  Élections Consulaires {siteConfig.electionDateDisplay}
                </span>
              </motion.div>

              {/* Main Slogan */}
              <motion.h1
                variants={fadeInUp}
                className="slogan-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3"
                data-testid="hero-slogan"
              >
                {hero.slogan}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={fadeInUp}
                className="font-accent text-xl md:text-2xl text-fr-blue font-semibold uppercase tracking-wide mb-4"
              >
                {hero.tagline}
              </motion.p>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-slate-600 mb-3"
              >
                {hero.subtitle} — <span className="font-medium">{hero.regions}</span>
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 leading-relaxed mb-6 max-w-xl"
              >
                {hero.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
                <Link to={hero.ctaLink}>
                  <Button className="btn-accent w-full sm:w-auto" data-testid="hero-cta-primary">
                    {hero.cta}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to={hero.ctaSecondaryLink}>
                  <Button variant="outline" className="btn-secondary w-full sm:w-auto" data-testid="hero-cta-secondary">
                    {hero.ctaSecondary}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Candidate Image */}
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src={assets.candidateMichel}
                  alt="Professeur Michael Ayache"
                  className="w-full h-full object-cover"
                  data-testid="hero-image"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#13244b]/90 via-[#13244b]/40 to-transparent" />
                
                {/* Name Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white text-center">
                  <p className="font-accent text-base md:text-lg lg:text-xl font-semibold uppercase tracking-wide mb-1">
                    « AVEC LES PATRIOTES D'ISRAËL »
                  </p>
                  <p className="font-accent text-sm md:text-base uppercase tracking-wider text-white/90">
                    Tête de Liste
                  </p>
                  <p className="font-accent text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide mt-2">
                    Professeur Michael Ayache
                  </p>
                </div>
              </div>

              {/* French Flag Accent */}
              <div className="absolute -bottom-3 -left-3 w-20 h-2 flex">
                <div className="w-1/3 bg-[#002395]" />
                <div className="w-1/3 bg-white border-y border-slate-200" />
                <div className="w-1/3 bg-republic-red" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-200" data-testid="key-figures-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8"
          >
            {keyFigures.map((figure, index) => (
              <motion.div
                key={figure.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`text-center ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <p className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold text-fr-blue mb-2">
                  {figure.value}
                </p>
                <p className="text-xs md:text-sm uppercase tracking-wider text-slate-600">
                  {figure.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 md:py-16 bg-slate-50" data-testid="countdown-section">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Le Vote en Ligne Ouvre Dans
            </h2>
            <p className="text-slate-500 mb-8">
              {siteConfig.electionDateDisplay} — Tel-Aviv & Haïfa
            </p>
            <Countdown />
          </motion.div>
        </div>
      </section>

      {/* Five Values Section */}
      <section className="section-spacing bg-white" data-testid="values-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Nos 5 Valeurs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ce qui nous anime et nous différencie
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8">
            {fiveValues.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Star;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-slate-50 border border-slate-200 p-4 md:p-6 text-center hover:shadow-lg transition-shadow ${
                    index === 4 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-fr-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-fr-blue" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/valeurs-programme">
              <Button variant="outline" className="btn-secondary">
                Découvrir en détail
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Home Teasers Section */}
      <section className="section-spacing bg-slate-50" data-testid="teasers-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Explorez Notre Projet
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {homeTeasers.map((teaser, index) => {
              const IconComponent = iconMap[teaser.icon] || FileText;
              return (
                <motion.div
                  key={teaser.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={teaser.link}
                    className="group block bg-white border border-slate-200 p-6 hover:shadow-xl transition-all hover:border-fr-blue/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-fr-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-slate-900 mb-1 group-hover:text-fr-blue transition-colors">
                          {teaser.title}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {teaser.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-fr-blue group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24 bg-fr-blue text-white relative overflow-hidden" data-testid="quote-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[60px] border-white/20" />
        </div>

        <div className="container-campaign relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed max-w-4xl mx-auto mb-8">
              {homeQuote}
            </blockquote>
            <div className="w-16 h-1 bg-republic-red mx-auto mb-8" />
            <Link to="/contact">
              <Button className="bg-white text-fr-blue hover:bg-slate-100 font-bold uppercase tracking-wider px-8 py-4" data-testid="quote-cta">
                Rejoignez le Mouvement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
