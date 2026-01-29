"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileRootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to requests page
    router.replace("/m/requests");
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
