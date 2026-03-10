import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Flag, Users } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Countdown } from '../components/Countdown';
import { hero, values, assets, siteConfig } from '../config/content';
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

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50" data-testid="hero-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002395' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-campaign relative z-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold">
                  Élections Consulaires {siteConfig.electionDateDisplay}
                </span>
              </motion.div>

              {/* Main Slogan */}
              <motion.h1
                variants={fadeInUp}
                className="slogan-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6"
                data-testid="hero-slogan"
              >
                {hero.slogan}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-600 mb-4 font-medium"
              >
                {hero.subtitle} — <span className="text-il-blue font-bold">{hero.regions}</span>
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 leading-relaxed mb-8 max-w-xl"
              >
                {hero.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link to="/soutenir">
                  <Button className="btn-accent w-full sm:w-auto" data-testid="hero-cta-primary">
                    {hero.cta}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/programme">
                  <Button variant="outline" className="btn-secondary w-full sm:w-auto" data-testid="hero-cta-secondary">
                    {hero.ctaSecondary}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image & Countdown */}
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
                  alt="Michel Ayach"
                  className="w-full h-full object-cover"
                  data-testid="hero-image"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-fr-blue/60 via-transparent to-transparent" />
                
                {/* Name Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="font-serif text-2xl md:text-3xl font-bold">Michel (Michael) Ayach</p>
                  <p className="text-white/80 text-sm uppercase tracking-wider mt-1">Tête de Liste</p>
                </div>
              </div>

              {/* French Flag Accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-2 flex">
                <div className="w-1/3 bg-fr-blue" />
                <div className="w-1/3 bg-white border-y border-slate-200" />
                <div className="w-1/3 bg-republic-red" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200" data-testid="countdown-section">
        <div className="container-campaign text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Le Vote Approche
            </h2>
            <p className="text-slate-500 mb-8">
              {siteConfig.electionDateDisplay} — Tel-Aviv & Haïfa
            </p>
            <Countdown />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-slate-50" data-testid="values-section">
        <div className="container-campaign">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ce qui nous anime et nous différencie des conseillers sortants
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border-l-4 border-fr-blue hover:shadow-lg transition-shadow"
                data-testid={`value-card-${index}`}
              >
                <div className="w-12 h-12 bg-fr-blue/10 rounded-sm flex items-center justify-center mb-4">
                  {index === 0 && <Shield className="w-6 h-6 text-fr-blue" />}
                  {index === 1 && <Flag className="w-6 h-6 text-fr-blue" />}
                  {index === 2 && <Users className="w-6 h-6 text-fr-blue" />}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Call to Action */}
      <section className="py-20 md:py-28 bg-fr-blue text-white relative overflow-hidden" data-testid="quote-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[60px] border-white/20" />
        </div>

        <div className="container-campaign relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed max-w-4xl mx-auto mb-8">
              « Les Français d'Israël ne sont ni des sujets, ni des supplétifs, mais des citoyens qui exigent respect, droits et considération. »
            </blockquote>
            <div className="w-16 h-1 bg-republic-red mx-auto mb-8" />
            <Link to="/soutenir">
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
