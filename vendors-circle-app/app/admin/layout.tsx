"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SideNav from "@/components/side-nav";
import TopHeader from "@/components/top-header";
import { getAdminNavItems } from "@/components/navigation/nav-items";

const mockAdminUser = {
  name: "Sarah Chen",
  email: "sarah@realwired.com",
  role: "Admin",
  avatar: "/avatars/Admin-Sara-Cheng.png",
};

// Map routes to page titles or breadcrumbs
const getPageConfig = (pathname: string): { pageTitle?: string; breadcrumbs?: Array<{ label: string; href?: string }> } => {
  if (pathname === "/admin" || pathname === "/admin/vendors-list") return { pageTitle: "Vendors" };
  if (pathname === "/admin/specialties") return { pageTitle: "Specialties" };
  if (pathname === "/admin/scorecards") return { pageTitle: "Scorecards" };
  if (pathname === "/admin/profile") return { pageTitle: "Profile" };
  if (pathname.startsWith("/admin/vendors/")) {
    return {
      breadcrumbs: [
        { label: "Vendors", href: "/admin/vendors-list" },
        { label: "Vendor Details" }
      ]
    };
  }
  return {};
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const { pageTitle, breadcrumbs } = getPageConfig(pathname);
  
  // Get admin navigation items
  const { main: mainItems, settings: settingsItems } = getAdminNavItems();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideNav 
        role="admin" 
        mainItems={mainItems}
        settingsItems={settingsItems}
        collapsed={sidebarCollapsed} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader 
          user={mockAdminUser} 
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

