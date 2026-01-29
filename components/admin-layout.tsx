"use client";

import { useState } from "react";
import SideNav from "./side-nav";
import TopHeader from "./top-header";
import { getAdminNavItems } from "./navigation/nav-items";

const mockAdminUser = {
  name: "Nicole Walsh",
  email: "admin@demo.com",
  role: "Admin",
  avatar: "/avatars/Admin-Sara-Cheng.png",
};

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function AdminLayout({ children, pageTitle, breadcrumbs }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
