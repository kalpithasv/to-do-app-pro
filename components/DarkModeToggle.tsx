'use client';

import { useStore } from '@/lib/store';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="text-gray-700" size={20} />
      ) : (
        <Moon className="text-gray-700" size={20} />
      )}
    </button>
  );
}

