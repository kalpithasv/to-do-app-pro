'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}

