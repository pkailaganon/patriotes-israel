import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigation, footer } from '../config/content';
import { LogoHorizontal, LogoCompact } from './Logo';

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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      } border-b border-slate-200`}
    >
      <div className="container-campaign">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity"
            data-testid="logo-link"
          >
            {/* Desktop logo */}
            <div className="hidden sm:block">
              <LogoHorizontal />
            </div>
            {/* Mobile logo */}
            <div className="sm:hidden">
              <LogoCompact />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`font-medium text-sm uppercase tracking-wide transition-colors relative group ${
                  location.pathname === item.path
                    ? 'text-fr-blue'
                    : 'text-slate-700 hover:text-fr-blue'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-fr-blue transition-all duration-300 ${
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/soutenir"
            className="hidden md:block btn-accent text-xs md:text-sm py-2 px-4 md:px-6"
            data-testid="header-cta"
          >
            Soutenir
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-fr-blue transition-colors"
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
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
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
                      ? 'bg-fr-blue/10 text-fr-blue'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/soutenir"
                className="btn-accent text-center mt-2"
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
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="48" fill="#002395" />
                    <rect x="10" y="20" width="80" height="8" fill="white" />
                    <rect x="10" y="72" width="80" height="8" fill="white" />
                    <g transform="translate(50, 50)" fill="none" stroke="white" strokeWidth="3">
                      <polygon points="0,-22 19,11 -19,11" />
                      <polygon points="0,22 19,-11 -19,-11" />
                    </g>
                  </svg>
                </div>
                <span className="font-serif font-bold text-xl">
                  Avec les Patriotes d'Israël
                </span>
              </div>
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
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
