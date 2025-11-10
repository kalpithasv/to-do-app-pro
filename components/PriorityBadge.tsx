'use client';

interface PriorityBadgeProps {
  priority?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
}

export default function PriorityBadge({ priority = 'medium', size = 'md' }: PriorityBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const colors = {
    low: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    high: 'bg-red-100 text-red-700 border-red-300',
  };

  const safePriority = priority || 'medium';

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border ${sizeClasses[size]} ${colors[safePriority]}`}
    >
      {safePriority.charAt(0).toUpperCase() + safePriority.slice(1)}
    </span>
  );
}

