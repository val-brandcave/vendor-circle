'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect to business dashboard
export default function BusinessRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/business/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
