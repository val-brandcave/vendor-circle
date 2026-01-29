'use client';

import { AuthGuard } from '@/components/auth-guard';
import { LayoutDashboard, Users, BadgeCheck, Building2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/m/business', icon: LayoutDashboard },
    { name: 'Team', href: '/m/business/team', icon: Users },
    { name: 'Profiles', href: '/m/business/profiles', icon: BadgeCheck },
    { name: 'Settings', href: '/m/business/settings', icon: Building2 },
  ];

  return (
    <AuthGuard allowedAccountTypes={['business_admin']} requireAuth={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom z-50">
          <nav className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center flex-1 py-2 px-3 rounded-lg transition-all ${
                    isActive
                      ? 'text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </AuthGuard>
  );
}
