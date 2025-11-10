'use client';

import { Tag } from '@/types';
import { X } from 'lucide-react';

interface TagBadgeProps {
  tag: Tag;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

export default function TagBadge({ tag, onRemove, size = 'md' }: TagBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${sizeClasses[size]}`}
      style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
    >
      {tag.name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-70 transition-opacity"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}

