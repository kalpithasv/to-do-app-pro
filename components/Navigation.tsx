'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Clock, User, ShoppingBag } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/projects', icon: FileText, label: 'Projects' },
    { href: '/grocery', icon: ShoppingBag, label: 'Grocery' },
    { href: '/history', icon: Clock, label: 'History' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  // Don't show navigation on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#ebe4ff] rounded-t-3xl px-2 sm:px-4 py-2 sm:py-3 shadow-lg z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all min-w-[44px] ${
                isActive
                  ? 'bg-[#5f33e1] text-white'
                  : 'text-[#5f33e1] opacity-60 hover:opacity-100 active:opacity-100'
              }`}
            >
              <Icon size={22} className="sm:w-6 sm:h-6" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


