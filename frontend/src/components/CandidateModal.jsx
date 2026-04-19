import { User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';

export const CandidateModal = ({ candidate, isOpen, onClose }) => {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="p-0 max-w-2xl max-h-[90vh] flex flex-col gap-0 rounded-none sm:rounded-none overflow-hidden"
        data-testid="candidate-modal"
      >
        {/* Photo */}
        <div className="relative aspect-square md:aspect-[16/9] bg-slate-100 overflow-hidden flex-shrink-0">
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
            className={`w-full h-full absolute inset-0 items-center justify-center bg-slate-100 ${
              candidate.photo && !candidate.useSilhouette ? 'hidden' : 'flex'
            }`}
          >
            <User className="w-24 h-24 text-slate-300" />
          </div>
          {/* Badge numéro */}
          <div className="absolute bottom-4 left-4 bg-fr-blue text-white px-4 py-2 font-accent text-lg font-bold">
            N°{String(candidate.numero).padStart(2, '0')}
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          <DialogHeader className="text-left mb-2 space-y-1">
            <DialogTitle className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              {candidate.nom}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Fiche candidat — Liste N°6 Avec les Patriotes d'Israël
            </DialogDescription>
          </DialogHeader>

          {candidate.accroche && candidate.accroche !== 'PLACEHOLDER' && (
            <p className="text-fr-blue font-medium mb-4 mt-2">{candidate.accroche}</p>
          )}

          <p className="text-slate-600 leading-relaxed">
            {candidate.bioFull || 'Biographie à venir'}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex-shrink-0">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
            data-testid="modal-close-btn"
          >
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
