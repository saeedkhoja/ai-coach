export default function AvatarSVG({ size = 60, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'avatar-pulse' : ''}
      style={{ borderRadius: '50%' }}
    >
      {/* Background gradient circle */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FDE8F0" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </radialGradient>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF5F7" />
          <stop offset="100%" stopColor="#FECDD3" />
        </radialGradient>
        <radialGradient id="hairGrad" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#9D174D" />
          <stop offset="100%" stopColor="#831843" />
        </radialGradient>
        <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="60" cy="60" r="60" fill="url(#bgGrad)" />

      {/* Dress / Body */}
      <ellipse cx="60" cy="105" rx="30" ry="22" fill="url(#dressGrad)" />
      <path d="M38 95 Q60 88 82 95 L88 120 H32 Z" fill="url(#dressGrad)" />

      {/* Neck */}
      <rect x="54" y="72" width="12" height="14" rx="4" fill="url(#faceGrad)" />

      {/* Face */}
      <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#faceGrad)" />

      {/* Hair - back */}
      <ellipse cx="60" cy="42" rx="23" ry="20" fill="url(#hairGrad)" />
      {/* Hair strands flowing */}
      <path d="M37 50 Q28 65 30 80 Q34 90 38 88" stroke="#9D174D" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M83 50 Q92 65 90 80 Q86 90 82 88" stroke="#9D174D" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Face features */}
      {/* Eyes */}
      <ellipse cx="51" cy="57" rx="4.5" ry="5" fill="#1F2937" />
      <ellipse cx="69" cy="57" rx="4.5" ry="5" fill="#1F2937" />
      {/* Eye shine */}
      <circle cx="53" cy="55" r="1.5" fill="white" />
      <circle cx="71" cy="55" r="1.5" fill="white" />
      {/* Eyelashes */}
      <path d="M46.5 53 Q49 50 51.5 52" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M64.5 52 Q67 50 69.5 53" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Eyebrows */}
      <path d="M46 50 Q51 47 56 49" stroke="#9D174D" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M64 49 Q69 47 74 50" stroke="#9D174D" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M58 62 Q60 65 62 62" stroke="#F9A8D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Smile */}
      <path d="M52 70 Q60 77 68 70" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Cheeks blush */}
      <ellipse cx="44" cy="65" rx="7" ry="4" fill="#FECDD3" opacity="0.6" />
      <ellipse cx="76" cy="65" rx="7" ry="4" fill="#FECDD3" opacity="0.6" />

      {/* Hair front strands */}
      <path d="M38 42 Q36 55 40 60" stroke="#BE185D" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Flower / hair accessory */}
      <circle cx="78" cy="36" r="6" fill="#FB7185" />
      <circle cx="78" cy="36" r="3" fill="#FEF3C7" />
      {/* Flower petals */}
      <circle cx="78" cy="30" r="3.5" fill="#FDA4AF" opacity="0.8" />
      <circle cx="84" cy="36" r="3.5" fill="#FDA4AF" opacity="0.8" />
      <circle cx="78" cy="42" r="3.5" fill="#FDA4AF" opacity="0.8" />
      <circle cx="72" cy="36" r="3.5" fill="#FDA4AF" opacity="0.8" />

      {/* Sparkle top right */}
      <path d="M100 15 L102 20 L107 18 L102 22 L104 27 L100 22 L95 27 L97 22 L92 18 L97 20 Z" fill="#F59E0B" opacity="0.9" />
    </svg>
  )
}
