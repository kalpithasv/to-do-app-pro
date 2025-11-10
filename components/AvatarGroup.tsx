'use client';

import { User } from '@/types';
import Avatar from './Avatar';

interface AvatarGroupProps {
  users: User[];
  max?: number;
  size?: number;
}

export default function AvatarGroup({ users, max = 3, size = 32 }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex gap-1.5">
      {displayUsers.map((user) => (
        <Avatar
          key={user.id}
          name={user.name}
          size={size}
          className="border-2 border-white"
        />
      ))}
      {remaining > 0 && (
        <div
          className="rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 bg-gray-200 border-2 border-white"
          style={{ width: size, height: size }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}


