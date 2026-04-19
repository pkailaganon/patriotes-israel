import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { Button } from './ui/button';

export const CandidateModal = ({ candidate, isOpen, onClose }) => {
  if (!candidate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100]"
            data-testid="modal-backdrop"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:max-w-2xl md:w-full md:max-h-[85vh] 
                       bg-white z-[101] overflow-hidden flex flex-col"
            data-testid="candidate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              aria-label="Fermer"
              data-testid="modal-close"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              {/* Photo */}
              <div className="relative aspect-square md:aspect-[16/9] bg-slate-100">
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
                  className={`w-full h-full ${candidate.photo && !candidate.useSilhouette ? 'hidden' : 'flex'} items-center justify-center bg-slate-100`}
                >
                  <User className="w-24 h-24 text-slate-300" />
                </div>
                
                {/* Badge numéro */}
                <div className="absolute bottom-4 left-4 bg-fr-blue text-white px-4 py-2 font-accent text-lg font-bold">
                  N°{String(candidate.numero).padStart(2, '0')}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <h2 
                  id="modal-title" 
                  className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-2"
                >
                  {candidate.nom}
                </h2>
                
                {candidate.accroche && candidate.accroche !== 'PLACEHOLDER' && (
                  <p className="text-fr-blue font-medium mb-4">{candidate.accroche}</p>
                )}

                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {candidate.bioFull || "Biographie à venir"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
                data-testid="modal-close-btn"
              >
                Fermer
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CandidateModal;
