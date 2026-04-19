import { MessageCircle } from 'lucide-react';

/**
 * Bouton de partage WhatsApp.
 * Sur mobile, ouvre l'app WhatsApp. Sur desktop, ouvre WhatsApp Web.
 *
 * @param {string} message     - Message pré-rempli (URL-encodé automatiquement).
 * @param {string} buttonText  - Libellé du bouton.
 * @param {string} variant     - "primary" (vert #25D366), "outline", "ghost".
 * @param {string} size        - "sm", "default", "lg".
 * @param {string} className   - Classes Tailwind supplémentaires.
 * @param {string} testId      - data-testid pour les tests.
 */
export const ShareWhatsApp = ({
  message,
  buttonText = "Partager sur WhatsApp",
  variant = "primary",
  size = "default",
  className = "",
  testId = "share-whatsapp",
}) => {
  const handleShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const variantClasses = {
    primary: "bg-[#25D366] hover:bg-[#1DA851] text-white",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white",
    ghost: "text-[#25D366] hover:bg-[#25D366]/10",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      data-testid={testId}
      aria-label={buttonText}
      type="button"
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      {buttonText}
    </button>
  );
};

export default ShareWhatsApp;
