"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to vendors list page
    router.replace("/admin/vendors-list");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}
