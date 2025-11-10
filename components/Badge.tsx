'use client';

interface BadgeProps {
  count: number;
  className?: string;
}

export default function Badge({ count, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${className}`}
      style={{ backgroundColor: '#f778ba' }}
    >
      {count}
    </span>
  );
}


