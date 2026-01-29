"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorRootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard (NEW landing page!)
    router.replace("/vendor/dashboard");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}
