'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Sparkles } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);

    // Generate unique ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const user = {
      id: userId,
      name: name.trim(),
      loginTime: new Date().toISOString(),
    };

    // Check if this is a new user (no existing user data)
    const existingUser = localStorage.getItem('user');
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // If this is a new user (no existing user), clear all data for fresh start
    if (!existingUser) {
      localStorage.removeItem('tasks');
      localStorage.removeItem('projects');
      localStorage.removeItem('groceryLists');
      localStorage.removeItem('tags');
      localStorage.removeItem('templates');
    }
    
    // Small delay for UX
    setTimeout(() => {
      router.push('/');
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #ebe4ff 0%, #ffe5a4 100%)' }}>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="relative">
              <img
                src="/icon-512x512(1).png"
                alt="To-Do Pro Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/icon-512x512.png';
                  target.onerror = () => {
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-20 h-20 bg-gradient-to-br from-[#5f33e1] to-[#f778ba] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">✓</div>';
                  };
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to To-Do Pro</h1>
          <p className="text-gray-600">Enter your name to get started</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] focus:border-transparent text-lg"
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              A unique ID will be generated automatically
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="w-full bg-gradient-to-r from-[#5f33e1] to-[#f778ba] text-white rounded-xl py-4 px-6 font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Getting Started...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your data will be stored locally on this device
          </p>
        </div>
      </div>
    </div>
  );
}

