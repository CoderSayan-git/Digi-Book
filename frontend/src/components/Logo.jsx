import React from 'react'

export function Logo({ className = "w-10 h-10", variant = "default" }) {
  // Color variants
  const variants = {
    default: {
      bg: "url(#gradient1)",
      book: "#ffffff",
      lock: "#fbbf24",
      lockBody: "#f59e0b"
    },
    light: {
      bg: "#ffffff",
      book: "#7c3aed",
      lock: "#fbbf24",
      lockBody: "#f59e0b"
    },
    dark: {
      bg: "#1f2937",
      book: "#a78bfa",
      lock: "#fbbf24",
      lockBody: "#f59e0b"
    }
  }

  const colors = variants[variant] || variants.default

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill={colors.bg} filter="url(#shadow)"/>

      {/* Book Icon */}
      <g transform="translate(25, 30)">
        {/* Book Cover */}
        <rect x="0" y="0" width="35" height="45" rx="3" fill={colors.book} opacity="0.9"/>
        {/* Book Spine Shadow */}
        <rect x="0" y="0" width="6" height="45" rx="2" fill="#000000" opacity="0.15"/>
        {/* Book Pages */}
        <rect x="8" y="5" width="22" height="2" rx="1" fill="#e5e7eb" opacity="0.4"/>
        <rect x="8" y="10" width="22" height="2" rx="1" fill="#e5e7eb" opacity="0.4"/>
        <rect x="8" y="15" width="18" height="2" rx="1" fill="#e5e7eb" opacity="0.4"/>
        
        {/* Digital Binary Pattern */}
        <text x="10" y="27" fontFamily="monospace" fontSize="8" fill="#e5e7eb" opacity="0.3">01</text>
        <text x="10" y="35" fontFamily="monospace" fontSize="8" fill="#e5e7eb" opacity="0.3">10</text>
      </g>

      {/* Lock Icon (Overlapping) */}
      <g transform="translate(48, 48)">
        {/* Lock Shackle */}
        <path 
          d="M 8 0 Q 8 -6, 14 -6 Q 20 -6, 20 0 L 20 4 L 18 4 L 18 0 Q 18 -4, 14 -4 Q 10 -4, 10 0 L 10 4 L 8 4 Z" 
          fill={colors.lock}
          strokeWidth="1.5"
          stroke={colors.lockBody}
        />
        {/* Lock Body */}
        <rect x="6" y="3" width="16" height="12" rx="2" fill={colors.lockBody}/>
        {/* Keyhole */}
        <circle cx="14" cy="8" r="2" fill="#ffffff" opacity="0.9"/>
        <rect x="13" y="9" width="2" height="4" rx="1" fill="#ffffff" opacity="0.9"/>
      </g>

      {/* Decorative Shield Outline (Optional) */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#gradient2)" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}

// Alternative compact logo (just icon, no circle background)
export function LogoIcon({ className = "w-8 h-8" }) {
  return (
    <svg 
      viewBox="0 0 50 50" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="iconShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Book */}
      <g filter="url(#iconShadow)">
        <rect x="5" y="8" width="28" height="36" rx="2" fill="url(#bookGrad)"/>
        <rect x="5" y="8" width="5" height="36" rx="1" fill="#000000" opacity="0.15"/>
        <rect x="10" y="14" width="18" height="2" rx="1" fill="#ffffff" opacity="0.3"/>
        <rect x="10" y="19" width="18" height="2" rx="1" fill="#ffffff" opacity="0.3"/>
        <rect x="10" y="24" width="14" height="2" rx="1" fill="#ffffff" opacity="0.3"/>
      </g>

      {/* Lock */}
      <g transform="translate(26, 28)" filter="url(#iconShadow)">
        <path 
          d="M 6 0 Q 6 -4, 10 -4 Q 14 -4, 14 0 L 14 3 L 12 3 L 12 0 Q 12 -2, 10 -2 Q 8 -2, 8 0 L 8 3 L 6 3 Z" 
          fill="#fbbf24"
        />
        <rect x="4" y="2" width="12" height="10" rx="2" fill="#f59e0b"/>
        <circle cx="10" cy="6" r="1.5" fill="#ffffff"/>
        <rect x="9.2" y="7" width="1.6" height="3" rx="0.8" fill="#ffffff"/>
      </g>
    </svg>
  )
}
