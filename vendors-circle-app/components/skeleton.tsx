import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

// Specific skeleton components for common patterns

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4", className)}>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Table header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-5 w-full" />
        ))}
      </div>
      
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid gap-4 py-4 border-t border-gray-200 dark:border-gray-700"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24"
  };
  
  return <Skeleton className={cn("rounded-full", sizeClasses[size])} />;
}

export function SkeletonBadge({ className }: { className?: string }) {
  return <Skeleton className={cn("h-6 w-16 rounded-full", className)} />;
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-24 rounded-md", className)} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-4/5" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

// Page-specific skeleton layouts

export function SkeletonInviteCard() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-2">
              <SkeletonBadge />
              <SkeletonButton />
              <SkeletonButton />
            </div>
          </div>
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDocumentCard() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <SkeletonButton className="w-20" />
          <SkeletonButton className="w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonLicenseRow() {
  return (
    <div className="flex items-center gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <SkeletonBadge />
      <Skeleton className="h-4 w-20" />
      <div className="flex gap-2 ml-auto">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
}

export function SkeletonProfileSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <SkeletonAvatar size="xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCoverageArea() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBadge key={i} className="w-20" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonDesignationCard() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function SkeletonBankCard() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
      <div className="flex gap-2">
        <SkeletonBadge className="w-28" />
        <SkeletonBadge className="w-24" />
      </div>
    </div>
  );
}

export function SkeletonVendorDetailHeader() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <SkeletonAvatar size="xl" />
        <div className="space-y-3 flex-1">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48" />
          <div className="flex gap-2">
            <SkeletonBadge className="w-16" />
            <SkeletonBadge className="w-20" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
}
