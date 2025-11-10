'use client';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Avatar({ name, size = 32, className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ['#5f33e1', '#f778ba', '#ffe5a4', '#4ade80', '#f59e0b'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-semibold text-xs ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}


