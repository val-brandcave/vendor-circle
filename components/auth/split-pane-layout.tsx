'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface SplitPaneLayoutProps {
  children: ReactNode;
  heroImage?: string;
  heroContent?: ReactNode;
}

export function SplitPaneLayout({ 
  children, 
  heroImage = '/images/placeholders/auth-hero.jpg',
  heroContent 
}: SplitPaneLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Pane - Auth Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right Pane - Hero Visual (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Background Image - Full, no overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/others/realwired-stock-image.png)' }}
        />
      </div>
    </div>
  );
}
