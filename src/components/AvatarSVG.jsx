export default function AvatarSVG({ size = 60, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'avatar-pulse' : ''}
      style={{ borderRadius: '50%', display: 'block' }}
    >
      <defs>
        <radialGradient id="bg" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FF80B0" />
          <stop offset="55%" stopColor="#B040E0" />
          <stop offset="100%" stopColor="#5B21B6" />
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id="topShine" cx="36%" cy="26%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="heartG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFD6E8" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="heartG2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,200,230,0.35)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <clipPath id="c">
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      <g clipPath="url(#c)">
        {/* ── BASE SPHERE ── */}
        <circle cx="100" cy="100" r="100" fill="url(#bg)" />

        {/* Ambient light blobs */}
        <circle cx="58" cy="52" r="56" fill="rgba(255,180,220,0.2)" filter="url(#softBlur)" />
        <circle cx="148" cy="158" r="44" fill="rgba(120,40,200,0.25)" filter="url(#softBlur)" />

        {/* ── OUTER RING ── */}
        <circle cx="100" cy="100" r="72" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

        {/* ── MAIN HEART (glowing) ── */}
        {/* Heart glow layer */}
        <path
          d="M100 132 C100 132 62 110 62 84 C62 70 72 62 84 62 C91 62 97 66 100 70 C103 66 109 62 116 62 C128 62 138 70 138 84 C138 110 100 132 100 132Z"
          fill="rgba(255,255,255,0.25)"
          filter="url(#softBlur)"
          transform="scale(1.15) translate(-13,-13)"
        />
        {/* Heart main */}
        <path
          d="M100 130 C100 130 64 109 64 84 C64 71 73 63 84 63 C91 63 97 67 100 72 C103 67 109 63 116 63 C127 63 136 71 136 84 C136 109 100 130 100 130Z"
          fill="url(#heartG)"
          filter="url(#glow)"
        />
        {/* Heart inner shadow for depth */}
        <path
          d="M100 122 C100 122 70 104 70 83 C70 73 77 67 84 67 C90 67 96 71 100 76 C104 71 110 67 116 67 C123 67 130 73 130 83 C130 104 100 122 100 122Z"
          fill="url(#heartG2)"
        />
        {/* Heart highlight */}
        <ellipse cx="88" cy="78" rx="9" ry="6" fill="rgba(255,255,255,0.55)" transform="rotate(-30 88 78)" />

        {/* ── SPARKLE STAR center-top ── */}
        <g transform="translate(100 54)">
          <path d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2Z" fill="rgba(255,255,255,0.9)" />
          <path d="M0,-6 L1.4,-1.4 L6,0 L1.4,1.4 L0,6 L-1.4,1.4 L-6,0 L-1.4,-1.4Z" fill="white" />
        </g>

        {/* ── ORBITING DOTS ── */}
        <circle cx="140" cy="66" r="5" fill="rgba(255,255,255,0.7)" />
        <circle cx="60" cy="66" r="3.5" fill="rgba(255,255,255,0.5)" />
        <circle cx="152" cy="108" r="3" fill="rgba(255,200,230,0.6)" />
        <circle cx="48" cy="118" r="2.5" fill="rgba(255,200,230,0.55)" />
        <circle cx="108" cy="156" r="3.5" fill="rgba(255,255,255,0.45)" />
        <circle cx="82" cy="160" r="2" fill="rgba(255,255,255,0.38)" />

        {/* ── SPARKLES ── */}
        {/* Top right */}
        <g transform="translate(162,28)">
          <path d="M0,-7 L1.65,-1.65 L7,0 L1.65,1.65 L0,7 L-1.65,1.65 L-7,0 L-1.65,-1.65Z" fill="rgba(255,255,255,0.92)" />
        </g>
        {/* Left */}
        <g transform="translate(30,82)">
          <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2Z" fill="rgba(255,220,240,0.8)" />
        </g>
        {/* Bottom right */}
        <g transform="translate(168,148)">
          <path d="M0,-4.5 L1.05,-1.05 L4.5,0 L1.05,1.05 L0,4.5 L-1.05,1.05 L-4.5,0 L-1.05,-1.05Z" fill="rgba(255,255,255,0.7)" />
        </g>
        {/* Tiny dots */}
        <circle cx="172" cy="74" r="2" fill="rgba(255,255,255,0.5)" />
        <circle cx="36" cy="130" r="1.5" fill="rgba(255,255,255,0.4)" />

        {/* ── GLASS SHINE ── */}
        <ellipse cx="78" cy="58" rx="28" ry="18" fill="rgba(255,255,255,0.18)" filter="url(#softBlur)" transform="rotate(-20 78 58)" />
        <circle cx="100" cy="100" r="100" fill="url(#topShine)" />
      </g>
    </svg>
  )
}
