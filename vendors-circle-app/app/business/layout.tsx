'use client';

import { AuthGuard } from '@/components/auth-guard';
import BusinessLayout from '@/components/business-layout';
import { BreadcrumbProvider } from '@/hooks/useBreadcrumbs';

export default function BusinessAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedAccountTypes={['business_admin']} requireAuth={true}>
      <BreadcrumbProvider>
        <BusinessLayout>{children}</BusinessLayout>
      </BreadcrumbProvider>
    </AuthGuard>
  );
}
