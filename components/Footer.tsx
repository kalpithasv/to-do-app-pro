'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <div className="w-full py-6 px-4 text-center border-t border-gray-100 mt-8">
      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
        <span>Made with</span>
        <Heart size={16} className="text-[#f778ba] fill-[#f778ba]" />
        <span>by</span>
        <a
          href="https://github.com/kalpithasv"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#5f33e1] hover:text-[#4d2ac0] transition-colors"
        >
          @kalpithasv
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-2">To-Do Pro v1.0.0</p>
    </div>
  );
}

