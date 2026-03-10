// Logo horizontal pour le header - inspiré du logo circulaire existant
export const LogoHorizontal = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Israeli Star of David icon */}
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Blue circle background */}
          <circle cx="50" cy="50" r="48" fill="#002395" />
          {/* White and blue stripes */}
          <rect x="10" y="20" width="80" height="8" fill="white" />
          <rect x="10" y="72" width="80" height="8" fill="white" />
          {/* Star of David */}
          <g transform="translate(50, 50)" fill="none" stroke="white" strokeWidth="3">
            <polygon points="0,-22 19,11 -19,11" />
            <polygon points="0,22 19,-11 -19,-11" />
          </g>
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="font-serif font-bold text-fr-blue text-sm md:text-base tracking-tight">
          AVEC LES PATRIOTES
        </span>
        <span className="font-serif font-bold text-il-blue text-sm md:text-base tracking-tight">
          D'ISRAËL
        </span>
      </div>
    </div>
  );
};

// Version compacte pour mobile
export const LogoCompact = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex-shrink-0">
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
      <span className="font-serif font-bold text-fr-blue text-xs leading-tight">
        PATRIOTES<br/>D'ISRAËL
      </span>
    </div>
  );
};
