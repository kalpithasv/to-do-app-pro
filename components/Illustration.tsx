'use client';

interface IllustrationProps {
  type: 'work' | 'shopping' | 'study' | 'cooking' | 'fitness';
  className?: string;
}

export default function Illustration({ type, className = '' }: IllustrationProps) {
  const illustrations = {
    work: (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Person with laptop */}
        <circle cx="100" cy="80" r="30" fill="#3b82f6" opacity="0.8" />
        <rect x="70" y="100" width="60" height="80" rx="10" fill="#3b82f6" opacity="0.8" />
        <rect x="50" y="140" width="100" height="8" rx="4" fill="#f778ba" />
        <rect x="60" y="155" width="80" height="6" rx="3" fill="#ffe5a4" />
      </svg>
    ),
    shopping: (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Shopping bag */}
        <path d="M60 60 L60 180 L140 180 L140 60 Z" fill="#f778ba" opacity="0.8" />
        <path d="M80 60 Q100 40 120 60" stroke="#5f33e1" strokeWidth="4" fill="none" />
        <circle cx="90" cy="120" r="8" fill="#ffe5a4" />
        <circle cx="110" cy="120" r="8" fill="#ffe5a4" />
      </svg>
    ),
    study: (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Book */}
        <rect x="70" y="60" width="60" height="100" rx="4" fill="#5f33e1" opacity="0.8" />
        <line x1="100" y1="60" x2="100" y2="160" stroke="#f778ba" strokeWidth="2" />
        <circle cx="85" cy="100" r="4" fill="#ffe5a4" />
        <circle cx="115" cy="100" r="4" fill="#ffe5a4" />
      </svg>
    ),
    cooking: (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Chef hat and utensils */}
        <ellipse cx="100" cy="70" rx="40" ry="20" fill="#f778ba" opacity="0.8" />
        <rect x="95" y="70" width="10" height="60" rx="5" fill="#5f33e1" />
        <circle cx="100" cy="140" r="20" fill="#ffe5a4" opacity="0.6" />
      </svg>
    ),
    fitness: (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Dumbbell */}
        <rect x="60" y="90" width="80" height="20" rx="10" fill="#5f33e1" opacity="0.8" />
        <rect x="50" y="85" width="20" height="30" rx="10" fill="#f778ba" />
        <rect x="130" y="85" width="20" height="30" rx="10" fill="#f778ba" />
      </svg>
    ),
  };

  return illustrations[type] || illustrations.work;
}

