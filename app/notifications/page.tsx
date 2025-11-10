'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()}>
            <ArrowLeft className="text-gray-700" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        </div>

        <div className="text-center py-12">
          <Bell className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      </div>
    </div>
  );
}

