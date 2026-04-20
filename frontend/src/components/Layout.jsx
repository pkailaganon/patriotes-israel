import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigation, footer } from '../config/content';

// Announcement Bar Component
export const AnnouncementBar = () => {
  return (
    <div className="bg-[#13244b] text-white py-2 px-4" data-testid="announcement-bar">
      <p className="font-accent text-xs sm:text-sm md:text-base text-center uppercase tracking-wide font-semibold">
        <span className="hidden sm:inline">ÉLECTIONS CONSULAIRES 2026 | LISTE N°6 | 21-27 MAI : VOTE EN LIGNE · 31 MAI : VOTE À L'URNE</span>
        <span className="sm:hidden">LISTE N°6 · 21-27 MAI EN LIGNE · 31 MAI URNE</span>
      </p>
    </div>
  );
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      data-testid="main-header"
      className={`transition-all duration-300 bg-[#27428F] ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container-campaign">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-opacity"
            data-testid="logo-link"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_ayach-2026/artifacts/y4unrepu_Patriotes.png"
              alt="Avec les Patriotes d'Israël"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8" data-testid="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`font-medium text-sm uppercase tracking-wide transition-colors relative group ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/soutenir"
            className="hidden md:block bg-republic-red hover:bg-red-700 text-white text-xs md:text-sm font-bold uppercase tracking-wider py-2 px-4 md:px-6 transition-all"
            data-testid="header-cta"
          >
            Soutenir
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-white hover:text-white/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#27428F] border-t border-white/20 overflow-hidden"
            data-testid="mobile-menu"
          >
            <nav className="container-campaign py-4 flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`py-3 px-4 font-medium uppercase tracking-wide transition-colors rounded-sm ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/soutenir"
                className="bg-republic-red hover:bg-red-700 text-white text-center font-bold uppercase tracking-wider py-3 px-4 mt-2 transition-all"
                data-testid="mobile-cta"
              >
                Soutenir la Campagne
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white" data-testid="main-footer">
      <div className="container-campaign py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Slogan */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://customer-assets.emergentagent.com/job_ayach-2026/artifacts/y4unrepu_Patriotes.png"
                alt="Avec les Patriotes d'Israël"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
              {footer.slogan}
            </p>
            <p className="text-republic-red font-semibold mt-2 text-sm italic">
              {footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">{footer.copyright}</p>
          <Link
            to="/mentions-legales"
            className="text-slate-500 hover:text-white transition-colors text-xs"
          >
            {footer.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col selection-primary">
      {/* Fixed wrapper for both announcement bar and header - iOS compatible */}
      <div className="ios-fixed-header">
        <AnnouncementBar />
        <Header />
      </div>
      {/* Spacer to account for fixed header height */}
      <div className="h-[100px] sm:h-[108px] md:h-[116px] flex-shrink-0" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
